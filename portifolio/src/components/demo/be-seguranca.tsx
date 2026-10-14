"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CodeBlock } from "./code-block";

const CAPACIDADE = 5;

/** Limite de requisições por "balde de fichas": cada chamada gasta uma ficha, e o balde recarrega uma por segundo. */
function LimiteRequisicoes() {
  const [fichas, setFichas] = useState(CAPACIDADE);
  const [respostas, setRespostas] = useState<{ id: number; ok: boolean }[]>([]);
  const fichasRef = useRef(fichas);
  fichasRef.current = fichas;
  const seq = useRef(0);

  useEffect(() => {
    const t = setInterval(() => setFichas((f) => Math.min(CAPACIDADE, f + 1)), 1000);
    return () => clearInterval(t);
  }, []);

  function enviar(qtd: number) {
    let disponivel = fichasRef.current;
    const novas: { id: number; ok: boolean }[] = [];
    for (let i = 0; i < qtd; i++) {
      const ok = disponivel >= 1;
      if (ok) disponivel--;
      novas.push({ id: seq.current++, ok });
    }
    fichasRef.current = disponivel;
    setFichas(disponivel);
    setRespostas((r) => [...novas.reverse(), ...r].slice(0, 12));
  }

  return (
    <div className="glass flex flex-col gap-5 rounded-[28px] p-6 sm:p-8">
      <div className="flex flex-col gap-1.5">
        <p className="m-0 text-[13px] font-semibold tracking-[0.08em] text-azul uppercase">Limite de requisições</p>
        <h4 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">Um robô não derruba a API de todo mundo.</h4>
        <p className="m-0 text-[15px] text-muted">
          Cada cliente tem um balde com {CAPACIDADE} fichas que recarrega uma por segundo. Sem ficha, a API responde 429 e diz
          quando tentar de novo.
        </p>
      </div>
      <div className="flex items-center gap-2" role="img" aria-label={`${fichas} de ${CAPACIDADE} fichas disponíveis`}>
        {Array.from({ length: CAPACIDADE }, (_, i) => (
          <motion.span
            key={i}
            animate={{ scale: i < fichas ? 1 : 0.7, opacity: i < fichas ? 1 : 0.25 }}
            className="size-7 rounded-full bg-azul"
          />
        ))}
        <span className="ml-2 font-mono text-[14px] text-muted">
          {fichas}/{CAPACIDADE}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => enviar(1)} className="rounded-full bg-ink px-4 py-2 text-[14px] font-semibold text-paper">
          Enviar 1 requisição
        </button>
        <button type="button" onClick={() => enviar(10)} className="rounded-full bg-surface-2 px-4 py-2 text-[14px] font-medium hover:bg-mist-2">
          Simular robô (10 de uma vez)
        </button>
      </div>
      <ul className="m-0 flex min-h-[64px] list-none flex-wrap content-start gap-1.5 p-0" aria-live="polite" aria-label="Respostas">
        <AnimatePresence initial={false}>
          {respostas.map((r) => (
            <motion.li
              key={r.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-lg px-2 py-1 font-mono text-[12px] font-semibold ${
                r.ok ? "bg-[#30a46c]/15 text-[#1f7a4f] dark:text-[#8fe0b5]" : "bg-[#e5484d]/15 text-[#b4232a] dark:text-[#ffb4b6]"
              }`}
            >
              {r.ok ? "200 OK" : "429"}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

const praticas = [
  { titulo: "Autenticação e permissões", texto: "Tokens de curta duração, renovação rotativa e permissões por ação, como pedidos:ler." },
  { titulo: "Entrada sempre validada", texto: "O servidor revalida tudo. Erros voltam no padrão ProblemDetails, com o campo e o motivo." },
  { titulo: "Consultas parametrizadas", texto: "Nenhum texto do usuário vira SQL. EF Core e Dapper parametrizam cada valor." },
  { titulo: "Segredos fora do código", texto: "Senhas e chaves ficam no Azure Key Vault, acessadas por identidade gerenciada." },
  { titulo: "Mínimo privilégio", texto: "A aplicação usa um usuário de banco que lê e grava só o que precisa." },
  { titulo: "LGPD nos logs", texto: "CPF, cartão e token nunca vão para o log sem máscara. Cada acesso a dado pessoal fica auditado." },
];

const exemplos = [
  {
    aba: "SQL injection",
    arquivo: "Clientes/Busca.cs",
    codigo: `// Errado: o texto do usuário vira parte do comando SQL.
// Um nome como  '; DROP TABLE clientes; --  apaga a tabela.
var sql = $"SELECT * FROM clientes WHERE nome = '{nome}'";

// Certo: o valor vai separado do comando, como parâmetro.
var clientes = await db.Clientes
    .Where(c => c.Nome == nome)        // EF Core gera @p0
    .ToListAsync(ct);

// Com Dapper, o mesmo cuidado:
await conexao.QueryAsync<Cliente>(
    "SELECT id, nome FROM clientes WHERE nome = @nome", new { nome });`,
  },
  {
    aba: "Limite de requisições",
    arquivo: "Program.cs",
    codigo: `builder.Services.AddRateLimiter(o =>
{
    // Um balde por cliente autenticado (ou por IP, se anônimo).
    o.AddPolicy("por-cliente", ctx => RateLimitPartition.GetTokenBucketLimiter(
        ctx.User.Identity?.Name ?? ctx.Connection.RemoteIpAddress?.ToString() ?? "anon",
        _ => new TokenBucketRateLimiterOptions
        {
            TokenLimit = 5,
            TokensPerPeriod = 1,
            ReplenishmentPeriod = TimeSpan.FromSeconds(1),
            QueueLimit = 0,
        }));
    o.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
});`,
  },
  {
    aba: "Autorização",
    arquivo: "Program.cs",
    codigo: `builder.Services.AddAuthentication().AddJwtBearer(o =>
{
    o.TokenValidationParameters = new()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.FromSeconds(30), // token vencido é recusado
    };
});

// Permissão por ação, e não só "está logado".
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("cobrancas:excluir", p => p.RequireClaim("permissao", "cobrancas:excluir"));`,
  },
];

/** Segurança em camadas: limite de requisições ao vivo, práticas e código. */
export function BeSeguranca() {
  const [aba, setAba] = useState(0);
  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 lg:grid-cols-[1fr_1.1fr]">
        <LimiteRequisicoes />
        <div className="grid gap-3 sm:grid-cols-2">
          {praticas.map((p) => (
            <div key={p.titulo} className="glass flex flex-col gap-1.5 rounded-[22px] p-5">
              <h4 className="m-0 text-[16px] font-semibold">{p.titulo}</h4>
              <p className="m-0 text-[14.5px] leading-[1.5] text-muted">{p.texto}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div role="tablist" aria-label="Exemplos de segurança" className="flex flex-wrap gap-2">
          {exemplos.map((e, i) => (
            <button
              key={e.aba}
              type="button"
              role="tab"
              aria-selected={aba === i}
              onClick={() => setAba(i)}
              className={`rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
                aba === i ? "bg-ink text-paper" : "bg-surface-2 text-ink hover:bg-mist-2"
              }`}
            >
              {e.aba}
            </button>
          ))}
        </div>
        <CodeBlock key={exemplos[aba].aba} arquivo={exemplos[aba].arquivo} codigo={exemplos[aba].codigo} />
      </div>
    </div>
  );
}
