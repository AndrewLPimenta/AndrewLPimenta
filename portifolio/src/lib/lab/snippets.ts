import type { Operacao } from "./tipos";

/**
 * Código exibido no laboratório. Cada arquivo é dividido em blocos;
 * o bloco ligado à última operação feita no CRUD acende no visualizador.
 */
export type Bloco = { ops?: Operacao[]; codigo: string };
export type Arquivo = { nome: string; lang: "csharp" | "ts"; descricao: string; blocos: Bloco[] };

const endpoints: Arquivo = {
  nome: "CobrancasEndpoints.cs",
  lang: "csharp",
  descricao: "Minimal API com resultados tipados: cada rota declara todas as respostas possíveis.",
  blocos: [
    {
      codigo: `using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace Cobrancas.Api;

public static class CobrancasEndpoints
{
    public static void MapCobrancas(this IEndpointRouteBuilder app)
    {
        var grupo = app.MapGroup("/api/cobrancas").WithTags("Cobranças");

        grupo.MapGet("/", Listar);
        grupo.MapGet("/{id:guid}", Obter);
        grupo.MapPost("/", Criar);
        grupo.MapPut("/{id:guid}", Atualizar);
        grupo.MapPost("/{id:guid}/pagar", Pagar);
        grupo.MapDelete("/{id:guid}", Excluir);
    }
`,
    },
    {
      ops: ["listar"],
      codigo: `
    // GET /api/cobrancas?status=Pendente&busca=academia
    static async Task<Ok<List<CobrancaResponse>>> Listar(
        AppDbContext db, StatusCobranca? status, string? busca, CancellationToken ct)
    {
        var consulta = db.Cobrancas.AsNoTracking();

        if (status is not null)
            consulta = consulta.Where(c => c.Status == status);
        if (!string.IsNullOrWhiteSpace(busca))
            consulta = consulta.Where(c => EF.Functions.ILike(c.Cliente, $"%{busca.Trim()}%"));

        var itens = await consulta
            .OrderBy(c => c.Vencimento)
            .Select(CobrancaResponse.Projecao)
            .ToListAsync(ct);

        return TypedResults.Ok(itens);
    }
`,
    },
    {
      codigo: `
    // GET /api/cobrancas/{id}
    static async Task<Results<Ok<CobrancaResponse>, NotFound>> Obter(
        Guid id, AppDbContext db, CancellationToken ct)
    {
        var cobranca = await db.Cobrancas.AsNoTracking()
            .Where(c => c.Id == id)
            .Select(CobrancaResponse.Projecao)
            .FirstOrDefaultAsync(ct);

        if (cobranca is null)
            return TypedResults.NotFound();

        return TypedResults.Ok(cobranca);
    }
`,
    },
    {
      ops: ["criar"],
      codigo: `
    // POST /api/cobrancas
    static async Task<Results<Created<CobrancaResponse>, ValidationProblem>> Criar(
        CobrancaRequest req, AppDbContext db, TimeProvider relogio, CancellationToken ct)
    {
        var erros = req.Validar(Hoje(relogio));
        if (erros.Count > 0)
            return TypedResults.ValidationProblem(erros);

        var cobranca = Cobranca.Criar(req.Cliente, req.Documento, req.Valor, req.Vencimento, relogio.GetUtcNow());
        db.Cobrancas.Add(cobranca);
        await db.SaveChangesAsync(ct);

        return TypedResults.Created($"/api/cobrancas/{cobranca.Id}", CobrancaResponse.De(cobranca));
    }
`,
    },
    {
      ops: ["atualizar"],
      codigo: `
    // PUT /api/cobrancas/{id}
    static async Task<Results<Ok<CobrancaResponse>, ValidationProblem, NotFound, ProblemHttpResult>> Atualizar(
        Guid id, CobrancaRequest req, AppDbContext db, TimeProvider relogio, CancellationToken ct)
    {
        var erros = req.Validar(Hoje(relogio));
        if (erros.Count > 0)
            return TypedResults.ValidationProblem(erros);

        var cobranca = await db.Cobrancas.FindAsync([id], ct);
        if (cobranca is null)
            return TypedResults.NotFound();

        var resultado = cobranca.Atualizar(req.Cliente, req.Documento, req.Valor, req.Vencimento);
        if (resultado.Falhou)
            return Conflito(resultado.Erro);

        await db.SaveChangesAsync(ct);
        return TypedResults.Ok(CobrancaResponse.De(cobranca));
    }
`,
    },
    {
      ops: ["pagar"],
      codigo: `
    // POST /api/cobrancas/{id}/pagar
    static async Task<Results<Ok<CobrancaResponse>, NotFound, ProblemHttpResult>> Pagar(
        Guid id, AppDbContext db, TimeProvider relogio, CancellationToken ct)
    {
        var cobranca = await db.Cobrancas.FindAsync([id], ct);
        if (cobranca is null)
            return TypedResults.NotFound();

        var resultado = cobranca.MarcarComoPaga(relogio.GetUtcNow());
        if (resultado.Falhou)
            return Conflito(resultado.Erro);

        await db.SaveChangesAsync(ct);
        return TypedResults.Ok(CobrancaResponse.De(cobranca));
    }
`,
    },
    {
      ops: ["excluir"],
      codigo: `
    // DELETE /api/cobrancas/{id}
    static async Task<Results<NoContent, NotFound, ProblemHttpResult>> Excluir(
        Guid id, AppDbContext db, CancellationToken ct)
    {
        var cobranca = await db.Cobrancas.FindAsync([id], ct);
        if (cobranca is null)
            return TypedResults.NotFound();

        if (cobranca.Status == StatusCobranca.Paga)
            return Conflito("Cobrança paga não pode ser excluída. Ela faz parte do histórico financeiro.");

        db.Cobrancas.Remove(cobranca);
        await db.SaveChangesAsync(ct);
        return TypedResults.NoContent();
    }
`,
    },
    {
      ops: ["atualizar", "pagar", "excluir"],
      codigo: `
    // 409 no padrão ProblemDetails (RFC 9457), com application/problem+json
    static ProblemHttpResult Conflito(string detalhe) =>
        TypedResults.Problem(
            title: "Regra de negócio violada",
            detail: detalhe,
            statusCode: StatusCodes.Status409Conflict);
`,
    },
    {
      codigo: `
    static DateOnly Hoje(TimeProvider relogio) => DateOnly.FromDateTime(relogio.GetLocalNow().DateTime);
}`,
    },
  ],
};

const dominio: Arquivo = {
  nome: "Cobranca.cs",
  lang: "csharp",
  descricao: "A regra mora na entidade: nenhum endpoint consegue pagar duas vezes ou editar o que já foi pago.",
  blocos: [
    {
      codigo: `namespace Cobrancas.Dominio;

public enum StatusCobranca { Pendente, Paga }

public sealed class Cobranca
{
    public Guid Id { get; private set; }
    public string Cliente { get; private set; } = "";
    public string Documento { get; private set; } = "";
    public decimal Valor { get; private set; }
    public DateOnly Vencimento { get; private set; }
    public StatusCobranca Status { get; private set; }
    public DateTimeOffset CriadaEm { get; private set; }
    public DateTimeOffset? PagaEm { get; private set; }

    private Cobranca() { } // usado pelo EF Core
`,
    },
    {
      ops: ["criar"],
      codigo: `
    public static Cobranca Criar(
        string cliente, string documento, decimal valor, DateOnly vencimento, DateTimeOffset agora) => new()
    {
        Id = Guid.CreateVersion7(agora), // ordenável pelo tempo: índice mais eficiente
        Cliente = cliente.Trim(),
        Documento = DocumentoFiscal.Normalizar(documento),
        Valor = valor,
        Vencimento = vencimento,
        Status = StatusCobranca.Pendente,
        CriadaEm = agora,
    };
`,
    },
    {
      ops: ["atualizar"],
      codigo: `
    public Resultado Atualizar(string cliente, string documento, decimal valor, DateOnly vencimento)
    {
        if (Status != StatusCobranca.Pendente)
            return Resultado.Falha("Só cobranças pendentes podem ser editadas.");

        Cliente = cliente.Trim();
        Documento = DocumentoFiscal.Normalizar(documento);
        Valor = valor;
        Vencimento = vencimento;
        return Resultado.Ok();
    }
`,
    },
    {
      ops: ["pagar"],
      codigo: `
    public Resultado MarcarComoPaga(DateTimeOffset agora)
    {
        if (Status == StatusCobranca.Paga)
            return Resultado.Falha("Esta cobrança já foi paga.");

        Status = StatusCobranca.Paga;
        PagaEm = agora;
        return Resultado.Ok();
    }
}
`,
    },
    {
      codigo: `
// Resultado de uma regra de negócio: erro esperado não é exceção.
public readonly record struct Resultado(bool Falhou, string Erro)
{
    public static Resultado Ok() => new(false, "");
    public static Resultado Falha(string erro) => new(true, erro);
}`,
    },
  ],
};

const contratos: Arquivo = {
  nome: "Contratos.cs",
  lang: "csharp",
  descricao: "Entrada validada campo a campo e saída projetada direto no SQL.",
  blocos: [
    {
      ops: ["criar", "atualizar"],
      codigo: `using System.Linq.Expressions;
using Cobrancas.Dominio;

namespace Cobrancas.Api;

public sealed record CobrancaRequest(string Cliente, string Documento, decimal Valor, DateOnly Vencimento)
{
    // Os erros voltam como 400 ValidationProblem, um por campo, prontos para o formulário.
    public Dictionary<string, string[]> Validar(DateOnly hoje)
    {
        var erros = new Dictionary<string, string[]>();

        if (string.IsNullOrWhiteSpace(Cliente) || Cliente.Trim().Length is < 3 or > 120)
            erros[nameof(Cliente)] = ["Informe o nome do cliente (3 a 120 caracteres)."];

        if (!DocumentoFiscal.EhValido(Documento))
            erros[nameof(Documento)] = ["CPF ou CNPJ inválido."];

        if (Valor is <= 0m or > 1_000_000m)
            erros[nameof(Valor)] = ["O valor deve ser maior que zero e até R$ 1.000.000,00."];

        if (Vencimento == default)
            erros[nameof(Vencimento)] = ["Informe o vencimento."];
        else if (Vencimento < hoje)
            erros[nameof(Vencimento)] = ["O vencimento não pode estar no passado."];

        return erros;
    }
}
`,
    },
    {
      ops: ["listar"],
      codigo: `
public sealed record CobrancaResponse(
    Guid Id, string Cliente, string Documento, decimal Valor,
    DateOnly Vencimento, StatusCobranca Status, DateTimeOffset CriadaEm, DateTimeOffset? PagaEm)
{
    // Traduzida para SQL pelo EF Core: só as colunas necessárias saem do banco.
    public static readonly Expression<Func<Cobranca, CobrancaResponse>> Projecao = c =>
        new CobrancaResponse(c.Id, c.Cliente, c.Documento, c.Valor, c.Vencimento, c.Status, c.CriadaEm, c.PagaEm);

    private static readonly Func<Cobranca, CobrancaResponse> Mapear = Projecao.Compile();

    public static CobrancaResponse De(Cobranca c) => Mapear(c);
}`,
    },
  ],
};

const documento: Arquivo = {
  nome: "DocumentoFiscal.cs",
  lang: "csharp",
  descricao: "CPF e CNPJ, já com o CNPJ alfanumérico da Receita Federal.",
  blocos: [
    {
      ops: ["criar", "atualizar"],
      codigo: `namespace Cobrancas.Dominio;

// CPF e CNPJ, incluindo o CNPJ alfanumérico da Receita Federal.
// No cálculo, cada caractere vale (código ASCII - 48): '0'..'9' = 0..9, 'A' = 17, 'B' = 18...
public static class DocumentoFiscal
{
    static readonly int[] PesosCpf1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    static readonly int[] PesosCpf2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    static readonly int[] PesosCnpj1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    static readonly int[] PesosCnpj2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    public static string Normalizar(string? valor) =>
        new((valor ?? "").ToUpperInvariant().Where(char.IsAsciiLetterOrDigit).ToArray());

    public static bool EhValido(string? valor)
    {
        var d = Normalizar(valor);
        if (d.Distinct().Count() <= 1)
            return false;

        return d.Length switch
        {
            11 => d.All(char.IsAsciiDigit) && Confere(d, PesosCpf1) && Confere(d, PesosCpf2),
            14 => char.IsAsciiDigit(d[12]) && char.IsAsciiDigit(d[13])
                  && Confere(d, PesosCnpj1) && Confere(d, PesosCnpj2),
            _ => false,
        };
    }

    // Compara o dígito verificador na posição pesos.Length com o calculado.
    static bool Confere(string d, int[] pesos)
    {
        var soma = 0;
        for (var i = 0; i < pesos.Length; i++)
            soma += (d[i] - '0') * pesos[i];

        var resto = soma % 11;
        var digito = resto < 2 ? 0 : 11 - resto;
        return d[pesos.Length] - '0' == digito;
    }
}`,
    },
  ],
};

const testes: Arquivo = {
  nome: "CobrancasTests.cs",
  lang: "csharp",
  descricao: "xUnit: a API sobe em memória e as regras são provadas, não prometidas.",
  blocos: [
    {
      codigo: `using System.Net;
using System.Net.Http.Json;
using Cobrancas.Dominio;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;

public class CobrancasTests(WebApplicationFactory<Program> api) : IClassFixture<WebApplicationFactory<Program>>
{
    [Fact]
    public async Task Criar_com_cpf_invalido_responde_400_apontando_o_campo()
    {
        var http = api.CreateClient();

        var resposta = await http.PostAsJsonAsync("/api/cobrancas", new
        {
            cliente = "Padaria Central",
            documento = "123.456.789-00",
            valor = 150m,
            vencimento = new DateOnly(2030, 1, 10),
        });

        Assert.Equal(HttpStatusCode.BadRequest, resposta.StatusCode);
        var problema = await resposta.Content.ReadFromJsonAsync<HttpValidationProblemDetails>();
        Assert.Contains("Documento", problema!.Errors.Keys);
    }

    [Fact]
    public void Cobranca_paga_nao_pode_ser_paga_de_novo()
    {
        var agora = DateTimeOffset.UtcNow;
        var cobranca = Cobranca.Criar("Academia Ritmo", "45.821.376/0001-03", 1890m, new DateOnly(2030, 1, 10), agora);
        cobranca.MarcarComoPaga(agora);

        var resultado = cobranca.MarcarComoPaga(agora);

        Assert.True(resultado.Falhou);
        Assert.Equal(StatusCobranca.Paga, cobranca.Status);
    }

    [Theory]
    [InlineData("529.982.247-25", true)]
    [InlineData("11.222.333/0001-81", true)]
    [InlineData("12.ABC.345/01DE-35", true)] // CNPJ alfanumérico
    [InlineData("123.456.789-00", false)]
    [InlineData("111.111.111-11", false)]
    public void Valida_cpf_e_cnpj(string documento, bool esperado) =>
        Assert.Equal(esperado, DocumentoFiscal.EhValido(documento));
}`,
    },
  ],
};

const program: Arquivo = {
  nome: "Program.cs",
  lang: "csharp",
  descricao: "Composição da API: banco, ProblemDetails, OpenAPI e relógio injetável para testes.",
  blocos: [
    {
      codigo: `using System.Text.Json.Serialization;
using Cobrancas.Api;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(o =>
    o.UseNpgsql(builder.Configuration.GetConnectionString("Cobrancas")));

builder.Services.AddProblemDetails();               // erros no padrão RFC 9457
builder.Services.AddOpenApi();                      // contrato em /openapi/v1.json
builder.Services.AddSingleton(TimeProvider.System); // relógio substituível nos testes
builder.Services.ConfigureHttpJsonOptions(o =>
    o.SerializerOptions.Converters.Add(new JsonStringEnumConverter()));

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages(); // 404 vazio também vira ProblemDetails
app.MapOpenApi();
app.MapCobrancas();

app.Run();

public partial class Program { } // expõe o Program para o WebApplicationFactory`,
    },
  ],
};

const cliente: Arquivo = {
  nome: "api-client.ts",
  lang: "ts",
  descricao: "No front, o erro da API vira mensagem por campo, sem adivinhação.",
  blocos: [
    {
      ops: ["criar"],
      codigo: `export async function criarCobranca(input: CobrancaInput): Promise<Cobranca> {
  const resposta = await fetch("/api/cobrancas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!resposta.ok) throw await ErroDaApi.de(resposta);
  return resposta.json();
}
`,
    },
    {
      codigo: `
export class ErroDaApi extends Error {
  constructor(public readonly problema: ProblemDetails) {
    super(problema.detail ?? problema.title);
  }

  static async de(resposta: Response) {
    const problema = (await resposta.json().catch(() => null)) as ProblemDetails | null;
    return new ErroDaApi(problema ?? { title: resposta.statusText, status: resposta.status });
  }

  /** Primeiro erro de cada campo, pronto para o formulário. */
  get campos(): Record<string, string> {
    return Object.fromEntries(
      Object.entries(this.problema.errors ?? {}).map(([campo, msgs]) => [campo.toLowerCase(), msgs[0]]),
    );
  }
}`,
    },
  ],
};

export const arquivos: Arquivo[] = [endpoints, dominio, contratos, documento, testes, program, cliente];
