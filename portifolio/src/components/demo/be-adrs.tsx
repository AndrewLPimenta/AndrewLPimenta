"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const adrs = [
  {
    id: "ADR-001",
    titulo: "Monolito modular antes de microsserviços",
    contexto: "Produto novo, um time pequeno e regras que ainda mudam toda semana.",
    decisao: "Uma aplicação com módulos isolados (Vendas, Financeiro, Fiscal), cada um com contrato público e esquema próprio no banco.",
    consequencia: "Um deploy só e transações simples. Quando o Fiscal precisar escalar sozinho, a fronteira já existe para extraí-lo.",
  },
  {
    id: "ADR-002",
    titulo: "Outbox para publicar eventos",
    contexto: "Gravar o pagamento e publicar na fila são duas operações. Se a segunda falhar, a nota nunca é emitida.",
    decisao: "O evento é gravado na mesma transação do pagamento e um processo publica na fila depois.",
    consequencia: "Nenhum pagamento confirmado fica sem nota. Em troca, a emissão é eventual: leva alguns segundos.",
  },
  {
    id: "ADR-003",
    titulo: "Idempotência por chave de venda",
    contexto: "Filas entregam a mesma mensagem mais de uma vez em caso de falha.",
    decisao: "Cada nota guarda o id da venda com índice único. O consumidor ignora o que já foi processado.",
    consequencia: "Reprocessar é seguro. Dá para devolver a fila de mortas inteira sem medo de nota duplicada.",
  },
  {
    id: "ADR-004",
    titulo: "Limite de requisições no gateway",
    contexto: "Integrações de clientes mal configuradas já derrubaram APIs parecidas com chamadas em loop.",
    decisao: "Balde de fichas por cliente no gateway, com resposta 429 e cabeçalho Retry-After.",
    consequencia: "Um cliente com problema não afeta os outros. Clientes grandes ganham limite próprio por contrato.",
  },
];

/** Registros de decisão de arquitetura (ADRs): o porquê de cada escolha, como um time documenta de verdade. */
export function BeAdrs() {
  const [aberto, setAberto] = useState<string | null>("ADR-001");
  return (
    <div className="overflow-hidden rounded-[24px] bg-surface shadow-[inset_0_0_0_1px_var(--line)]">
      <div className="grid grid-cols-[96px_1fr_auto] gap-4 border-b border-hairline px-5 py-3 font-mono text-[12px] text-muted sm:px-6">
        <span>id</span>
        <span>decisão</span>
        <span>status</span>
      </div>
      {adrs.map((a) => {
        const sel = aberto === a.id;
        return (
          <div key={a.id} className="border-b border-hairline last:border-0">
            <button
              type="button"
              onClick={() => setAberto(sel ? null : a.id)}
              aria-expanded={sel}
              className="grid w-full grid-cols-[96px_1fr_auto] items-center gap-4 px-5 py-4 text-left hover:bg-surface-2/60 sm:px-6"
            >
              <span className="font-mono text-[13px] text-muted">{a.id}</span>
              <span className="text-[16px] font-semibold tracking-[-0.01em]">{a.titulo}</span>
              <span className="flex items-center gap-3">
                <span className="hidden rounded-full bg-[#30a46c]/12 px-2.5 py-0.5 text-[12px] font-semibold text-[#1f7a4f] sm:inline dark:text-[#8fe0b5]">
                  Aceita
                </span>
                <ChevronDown className={`size-4 text-muted transition-transform ${sel ? "rotate-180" : ""}`} aria-hidden="true" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {sel && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <dl className="m-0 grid gap-4 px-5 pb-5 sm:grid-cols-3 sm:pl-[136px] sm:pr-6">
                    {[
                      ["Contexto", a.contexto],
                      ["Decisão", a.decisao],
                      ["Consequência", a.consequencia],
                    ].map(([t, v]) => (
                      <div key={t}>
                        <dt className="font-mono text-[11.5px] font-semibold tracking-wide text-muted uppercase">{t}</dt>
                        <dd className="m-0 mt-1 text-[14.5px] leading-[1.5]">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
