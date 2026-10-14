"use client";

import { useState } from "react";
import { CodeBlock } from "./code-block";

const arquivos = [
  {
    aba: "Regra no domínio",
    arquivo: "Cobrancas/Cobranca.cs",
    nota: "A regra mora na entidade. Nenhuma tela, endpoint ou job consegue pagar a mesma cobrança duas vezes.",
    codigo: `public sealed class Cobranca
{
    public CobrancaId Id { get; private set; }
    public Dinheiro Valor { get; private set; }
    public StatusCobranca Status { get; private set; } = StatusCobranca.Aberta;
    public DateTimeOffset? PagaEm { get; private set; }

    // Pagar é uma decisão do domínio, e não um "set" de status solto pelo código.
    public Resultado Pagar(DateTimeOffset quando)
    {
        if (Status == StatusCobranca.Paga)
            return Erros.Cobranca.JaPaga(Id);

        if (Status == StatusCobranca.Cancelada)
            return Erros.Cobranca.Cancelada(Id);

        Status = StatusCobranca.Paga;
        PagaEm = quando;
        AdicionarEvento(new CobrancaPaga(Id, Valor, quando));
        return Resultado.Ok();
    }
}`,
  },
  {
    aba: "Endpoint enxuto",
    arquivo: "Cobrancas/PagarCobranca.cs",
    nota: "O endpoint só traduz HTTP para o domínio e o domínio para HTTP. Cada erro vira uma resposta que explica o motivo.",
    codigo: `public static class PagarCobranca
{
    public static void Mapear(IEndpointRouteBuilder app) =>
        app.MapPost("/api/cobrancas/{id:guid}/pagamento", Executar)
           .RequireAuthorization("cobrancas:pagar")
           .WithSummary("Registra o pagamento de uma cobrança");

    private static async Task<IResult> Executar(
        Guid id, AppDb db, TimeProvider relogio, CancellationToken ct)
    {
        var cobranca = await db.Cobrancas.FindAsync([new CobrancaId(id)], ct);
        if (cobranca is null)
            return TypedResults.NotFound();

        var resultado = cobranca.Pagar(relogio.GetUtcNow());

        // SaveChanges grava a cobrança e o evento na mesma transação (outbox).
        await db.SaveChangesAsync(ct);

        return resultado.Match(
            ok: () => TypedResults.NoContent(),
            erro: e => e.ParaProblemDetails());
    }
}`,
  },
  {
    aba: "Outbox",
    arquivo: "Infra/OutboxInterceptor.cs",
    nota: "Gravar no banco e publicar na fila não é atômico. O outbox resolve: o evento entra na mesma transação e um worker publica depois.",
    codigo: `internal sealed class OutboxInterceptor : SaveChangesInterceptor
{
    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
        DbContextEventData dados, InterceptionResult<int> resultado, CancellationToken ct = default)
    {
        var db = dados.Context!;

        var mensagens = db.ChangeTracker.Entries<IAgregado>()
            .SelectMany(e => e.Entity.RetirarEventos())
            .Select(MensagemOutbox.De);

        // Mesmo SaveChanges, mesma transação: ou grava tudo, ou nada.
        db.Set<MensagemOutbox>().AddRange(mensagens);

        return base.SavingChangesAsync(dados, resultado, ct);
    }
}`,
  },
  {
    aba: "Teste",
    arquivo: "Cobrancas.Testes/PagarCobrancaTests.cs",
    nota: "O nome do teste descreve a regra. Quem lê a lista de testes entende o que o sistema garante.",
    codigo: `public class PagarCobrancaTests
{
    [Fact]
    public void Nao_permite_pagar_uma_cobranca_ja_paga()
    {
        var cobranca = CobrancaFake.Aberta(valor: 250m);
        cobranca.Pagar(Hoje);

        var resultado = cobranca.Pagar(Hoje);

        resultado.Erro.Should().Be(Erros.Cobranca.JaPaga(cobranca.Id));
        cobranca.Eventos.OfType<CobrancaPaga>().Should().ContainSingle();
    }
}`,
  },
  {
    aba: "Resiliência",
    arquivo: "Program.cs",
    nota: "Serviço de terceiro cai. O sistema tenta de novo com espera crescente e, se continuar falhando, para de insistir por um tempo.",
    codigo: `builder.Services.AddHttpClient<IAmbienteNacional, AmbienteNacionalClient>()
    .AddResilienceHandler("sefaz", p =>
    {
        p.AddRetry(new() { MaxRetryAttempts = 3, BackoffType = DelayBackoffType.Exponential, UseJitter = true });
        p.AddCircuitBreaker(new() { FailureRatio = 0.5, BreakDuration = TimeSpan.FromSeconds(30) });
        p.AddTimeout(TimeSpan.FromSeconds(10));
    });

// Logs, métricas e rastreamento distribuído com OpenTelemetry.
builder.Services.AddOpenTelemetry()
    .WithTracing(t => t.AddAspNetCoreInstrumentation().AddHttpClientInstrumentation())
    .WithMetrics(m => m.AddAspNetCoreInstrumentation());`,
  },
];

const padroes = [
  "Clean Architecture",
  "DDD tático",
  "SOLID",
  "Result pattern",
  "CQRS quando faz sentido",
  "Outbox",
  "Idempotência",
  "Retry e circuit breaker",
  "Cache distribuído (Redis)",
  "OpenTelemetry",
  "Testes de integração com Testcontainers",
  "CI/CD no Azure DevOps",
];

/** Trechos de código comentados: o comentário explica o porquê, e não o quê. */
export function BeCodigo() {
  const [aba, setAba] = useState(0);
  const a = arquivos[aba];
  return (
    <div className="flex flex-col gap-4">
      <div role="tablist" aria-label="Exemplos de código" className="flex flex-wrap gap-2">
        {arquivos.map((x, i) => (
          <button
            key={x.aba}
            type="button"
            role="tab"
            aria-selected={aba === i}
            onClick={() => setAba(i)}
            className={`rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
              aba === i ? "bg-ink text-paper" : "bg-surface-2 text-ink hover:bg-mist-2"
            }`}
          >
            {x.aba}
          </button>
        ))}
      </div>
      <p className="m-0 max-w-[820px] text-[16px] leading-[1.5] text-ink-2" aria-live="polite">
        {a.nota}
      </p>
      <CodeBlock key={a.arquivo} arquivo={a.arquivo} codigo={a.codigo} />
      <ul className="m-0 mt-2 flex list-none flex-wrap gap-1.5 p-0" aria-label="Padrões e práticas que uso">
        {padroes.map((p) => (
          <li key={p} className="rounded-full bg-surface-2 px-3 py-1 text-[13.5px] text-chip-ink">
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
