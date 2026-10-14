"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CodeBlock } from "./code-block";

type TecId = "rest" | "socket" | "fila" | "webhook";

const tecnologias: Record<TecId, { nome: string; resumo: string; usar: string; evitar: string; arquivo: string; codigo: string }> = {
  rest: {
    nome: "REST",
    resumo: "Pergunta e resposta na hora.",
    usar: "Consultas e comandos curtos, em que quem chama precisa da resposta para continuar.",
    evitar: "Trabalho demorado ou que depende de outro sistema estar de pé.",
    arquivo: "Pedidos/Endpoints.cs",
    codigo: `app.MapGet("/api/pedidos/{id:guid}", async (Guid id, AppDb db, CancellationToken ct) =>
    await db.Pedidos.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id, ct)
        is { } pedido
            ? Results.Ok(PedidoDto.De(pedido))
            : Results.NotFound())
   .RequireAuthorization("pedidos:ler")
   .CacheOutput(c => c.Expire(TimeSpan.FromSeconds(30)));`,
  },
  socket: {
    nome: "WebSocket",
    resumo: "O servidor avisa sem ninguém perguntar.",
    usar: "Telas que mudam sozinhas: painel de pedidos, chat, status de entrega.",
    evitar: "Dados que mudam pouco. Uma conexão aberta por usuário tem custo.",
    arquivo: "Pedidos/PedidosHub.cs",
    codigo: `// SignalR usa WebSocket e cai para outro transporte se a rede bloquear.
public sealed class PedidosHub : Hub
{
    public Task Acompanhar(Guid lojaId) =>
        Groups.AddToGroupAsync(Context.ConnectionId, $"loja:{lojaId}");
}

// Quem altera o pedido avisa só quem acompanha aquela loja.
await hub.Clients.Group($"loja:{pedido.LojaId}")
    .SendAsync("PedidoAtualizado", PedidoDto.De(pedido), ct);`,
  },
  fila: {
    nome: "Fila",
    resumo: "Guarda o trabalho até alguém processar.",
    usar: "Trabalho que pode esperar segundos e não pode se perder: notas fiscais, e-mails, integrações.",
    evitar: "Quando o usuário precisa da resposta na mesma tela.",
    arquivo: "Fiscal/EmitirNotaConsumer.cs",
    codigo: `public sealed class EmitirNotaConsumer(IEmissorDeNotas emissor, AppDb db)
    : IConsumer<VendaConfirmada>
{
    public async Task Consume(ConsumeContext<VendaConfirmada> ctx)
    {
        // Idempotência: a mesma venda pode chegar duas vezes. A nota, nunca.
        if (await db.Notas.AnyAsync(n => n.VendaId == ctx.Message.VendaId))
            return;

        await emissor.EmitirAsync(ctx.Message, ctx.CancellationToken);
    }
}
// Retry com espera crescente e fila de mensagens mortas ficam na configuração.`,
  },
  webhook: {
    nome: "Webhook",
    resumo: "Outro sistema chama você quando algo acontece.",
    usar: "Receber eventos de parceiros: Pix confirmado, assinatura cancelada, pedido no marketplace.",
    evitar: "Confiar no conteúdo sem validar a assinatura de quem enviou.",
    arquivo: "Pagamentos/PixWebhook.cs",
    codigo: `app.MapPost("/webhooks/pix", async (HttpRequest req, IFila fila) =>
{
    // Só aceita o que veio assinado pelo provedor.
    if (!await Assinatura.EhValidaAsync(req, segredo))
        return Results.Unauthorized();

    // Responde rápido e processa depois: o provedor não espera.
    await fila.PublicarAsync(await req.ReadFromJsonAsync<PixRecebido>());
    return Results.Accepted();
});`,
  },
};

const cenarios: { texto: string; tec: TecId; porque: string }[] = [
  { texto: "Abrir os detalhes de um pedido", tec: "rest", porque: "A tela precisa da resposta agora, e a consulta é rápida." },
  { texto: "Painel da cozinha recebendo pedidos novos", tec: "socket", porque: "O servidor empurra o pedido assim que ele entra." },
  { texto: "Emitir a nota depois do pagamento", tec: "fila", porque: "Pode levar segundos e não pode se perder se o governo oscilar." },
  { texto: "Saber que o Pix do cliente caiu", tec: "webhook", porque: "Quem sabe primeiro é o banco, e ele avisa o sistema." },
];

/** Qual forma de comunicação usar em cada situação, com um simulador de fila. */
export function BeComunicacao() {
  const [cenario, setCenario] = useState(2);
  const tec = tecnologias[cenarios[cenario].tec];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass flex flex-col gap-3 rounded-[28px] p-6 sm:p-8">
          <p className="m-0 text-[13px] font-semibold tracking-[0.08em] text-azul uppercase">Escolha uma situação</p>
          <div role="radiogroup" aria-label="Situação" className="flex flex-col gap-2">
            {cenarios.map((c, i) => {
              const ativo = i === cenario;
              return (
                <button
                  key={c.texto}
                  type="button"
                  role="radio"
                  aria-checked={ativo}
                  onClick={() => setCenario(i)}
                  className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-3.5 text-left text-[15.5px] transition-colors ${
                    ativo ? "bg-ink text-paper" : "bg-surface-2 text-ink hover:bg-mist-2"
                  }`}
                >
                  {c.texto}
                  <span
                    className={`flex-none rounded-full px-2.5 py-0.5 text-[12.5px] font-semibold ${
                      ativo ? "bg-paper/15 text-paper" : "bg-surface text-muted"
                    }`}
                  >
                    {tecnologias[c.tec].nome}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="glass flex flex-col gap-4 rounded-[28px] p-6 sm:p-8" aria-live="polite">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h4 className="m-0 text-[28px] font-semibold tracking-[-0.03em]">{tec.nome}</h4>
            <span className="text-[15px] text-muted">{tec.resumo}</span>
          </div>
          <p className="m-0 rounded-2xl bg-azul/10 p-4 text-[15px] leading-[1.5]">
            <strong className="font-semibold">Por que aqui:</strong> {cenarios[cenario].porque}
          </p>
          <dl className="m-0 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-[13px] font-semibold text-azul">Uso quando</dt>
              <dd className="m-0 mt-1 text-[15px] leading-[1.45]">{tec.usar}</dd>
            </div>
            <div>
              <dt className="text-[13px] font-semibold text-muted">Evito quando</dt>
              <dd className="m-0 mt-1 text-[15px] leading-[1.45] text-muted">{tec.evitar}</dd>
            </div>
          </dl>
        </div>
      </div>

      <CodeBlock key={tec.arquivo} arquivo={tec.arquivo} codigo={tec.codigo} />

      <SimuladorFila />
    </div>
  );
}

/* ---------- Simulador de fila ---------- */

type Msg = { id: number; venda: number; tentativas: number; proximaEm: number };
type Log = { id: number; texto: string; tipo: "ok" | "erro" | "info" };

const MAX_TENTATIVAS = 3;

function SimuladorFila() {
  const [fila, setFila] = useState<Msg[]>([]);
  const [processando, setProcessando] = useState<Msg | null>(null);
  const [concluidas, setConcluidas] = useState(0);
  const [mortas, setMortas] = useState<Msg[]>([]);
  const [fiscalFora, setFiscalFora] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const seq = useRef({ msg: 0, venda: 0, log: 0 });
  const emitidas = useRef(new Set<number>());
  const estado = useRef({ fila, processando, fiscalFora });
  estado.current = { fila, processando, fiscalFora };

  function registrar(texto: string, tipo: Log["tipo"]) {
    setLogs((l) => [{ id: seq.current.log++, texto, tipo }, ...l].slice(0, 5));
  }

  function publicar(vendaRepetida?: number) {
    const venda = vendaRepetida ?? ++seq.current.venda;
    setFila((f) => [...f, { id: seq.current.msg++, venda, tentativas: 0, proximaEm: 0 }]);
    registrar(`Publicada: VendaConfirmada #${venda}${vendaRepetida ? " (repetida)" : ""}`, "info");
  }

  useEffect(() => {
    const t = setInterval(() => {
      const { fila, processando, fiscalFora } = estado.current;
      const agora = Date.now();

      if (processando) {
        // Termina o processamento da mensagem atual.
        const m = processando;
        setProcessando(null);
        if (fiscalFora) {
          const tentativas = m.tentativas + 1;
          if (tentativas >= MAX_TENTATIVAS) {
            setMortas((d) => [...d, { ...m, tentativas }]);
            registrar(`Venda #${m.venda}: ${tentativas} falhas, foi para a fila de mortas`, "erro");
          } else {
            const espera = 2 ** tentativas;
            setFila((f) => [...f, { ...m, tentativas, proximaEm: agora + espera * 1000 }]);
            registrar(`Venda #${m.venda}: falhou, nova tentativa em ${espera}s`, "erro");
          }
        } else if (emitidas.current.has(m.venda)) {
          registrar(`Venda #${m.venda}: já tinha nota, ignorada (idempotência)`, "info");
        } else {
          emitidas.current.add(m.venda);
          setConcluidas((c) => c + 1);
          registrar(`Venda #${m.venda}: nota emitida`, "ok");
        }
        return;
      }

      const pronta = fila.find((m) => m.proximaEm <= agora);
      if (pronta) {
        setFila((f) => f.filter((m) => m.id !== pronta.id));
        setProcessando(pronta);
      }
    }, 800);
    return () => clearInterval(t);
  }, []);

  function reprocessarMortas() {
    if (!mortas.length) return;
    setFila((f) => [...f, ...mortas.map((m) => ({ ...m, tentativas: 0, proximaEm: 0 }))]);
    registrar(`${mortas.length} mensagem(ns) devolvida(s) para a fila`, "info");
    setMortas([]);
  }

  return (
    <div className="overflow-hidden rounded-[28px] bg-marinho text-white">
      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <div className="flex flex-col gap-1.5">
          <p className="m-0 text-[13px] font-semibold tracking-[0.08em] text-ouro uppercase">Simulador</p>
          <h4 className="m-0 text-[24px] font-semibold tracking-[-0.025em]">Uma fila de notas fiscais, com falhas de verdade.</h4>
          <p className="m-0 max-w-[720px] text-[15px] text-dark-text">
            Publique vendas, derrube o serviço fiscal e veja a mensagem esperar, tentar de novo com espera crescente e, depois de
            três falhas, ir para a fila de mortas sem travar as outras. Reenvie a mesma venda para ver a idempotência.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => publicar()} className="rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-marinho">
            Publicar venda
          </button>
          <button
            type="button"
            onClick={() => seq.current.venda > 0 && publicar(seq.current.venda)}
            className="glass-dark rounded-full px-4 py-2 text-[14px] font-medium"
          >
            Reenviar a mesma venda
          </button>
          <button
            type="button"
            aria-pressed={fiscalFora}
            onClick={() => setFiscalFora((v) => !v)}
            className={`rounded-full px-4 py-2 text-[14px] font-medium ${
              fiscalFora ? "bg-[#e5484d] text-white" : "glass-dark"
            }`}
          >
            {fiscalFora ? "Serviço fiscal fora do ar" : "Derrubar serviço fiscal"}
          </button>
          <button
            type="button"
            onClick={reprocessarMortas}
            disabled={!mortas.length}
            className="glass-dark rounded-full px-4 py-2 text-[14px] font-medium disabled:opacity-40"
          >
            Reprocessar mortas
          </button>
        </div>

        <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <Raia titulo="Fila" contagem={fila.length}>
            <AnimatePresence initial={false}>
              {fila.map((m) => (
                <motion.span
                  key={m.id}
                  layout
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  className={`rounded-lg px-2 py-1 font-mono text-[12px] ${
                    m.tentativas ? "bg-[#e5484d]/20 text-[#ffb4b6]" : "bg-white/10"
                  }`}
                >
                  #{m.venda}
                  {m.tentativas > 0 && ` ↻${m.tentativas}`}
                </motion.span>
              ))}
            </AnimatePresence>
          </Raia>
          <Raia titulo="Processando" contagem={processando ? 1 : 0}>
            {processando && (
              <motion.span
                key={processando.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-lg bg-azul/40 px-2 py-1 font-mono text-[12px]"
              >
                #{processando.venda}
              </motion.span>
            )}
          </Raia>
          <Raia titulo="Notas emitidas" contagem={concluidas}>
            <span className="font-mono text-[28px] font-semibold text-[#8fe0b5]">{concluidas}</span>
          </Raia>
          <Raia titulo="Fila de mortas" contagem={mortas.length}>
            {mortas.map((m) => (
              <span key={m.id} className="rounded-lg bg-[#e5484d]/30 px-2 py-1 font-mono text-[12px]">
                #{m.venda}
              </span>
            ))}
          </Raia>
        </div>

        <ol className="m-0 flex min-h-[150px] list-none flex-col gap-1 rounded-2xl bg-black/25 p-4 font-mono text-[12.5px]" aria-live="polite" aria-label="Registro do simulador">
          {logs.length === 0 && <li className="text-dark-soft">Clique em “Publicar venda” para começar.</li>}
          {logs.map((l) => (
            <li key={l.id} className={l.tipo === "ok" ? "text-[#8fe0b5]" : l.tipo === "erro" ? "text-[#ffb4b6]" : "text-dark-text"}>
              {l.texto}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Raia({ titulo, contagem, children }: { titulo: string; contagem: number; children: React.ReactNode }) {
  return (
    <div className="glass-dark flex min-h-[110px] flex-col gap-2.5 rounded-2xl p-3.5">
      <div className="flex items-center justify-between text-[13px]">
        <span className="font-semibold">{titulo}</span>
        <span className="text-dark-soft">{contagem}</span>
      </div>
      <div className="flex flex-wrap content-start gap-1.5">{children}</div>
    </div>
  );
}
