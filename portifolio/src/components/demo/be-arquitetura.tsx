"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CodeBlock } from "./code-block";

type Modelo = "monolito" | "microsservicos";

const modulos = ["Vendas", "Financeiro", "Fiscal", "Clientes"];

const comparativo: Record<Modelo, { quando: string[]; custo: string[] }> = {
  monolito: {
    quando: [
      "Produto novo, regras ainda mudando toda semana",
      "Um time só, ou poucos times, no mesmo código",
      "Transações que precisam ser consistentes na hora",
    ],
    custo: ["Um deploy leva tudo junto", "Escala o sistema inteiro, mesmo quando só um módulo precisa"],
  },
  microsservicos: {
    quando: [
      "Módulos com carga muito diferente, como emissão de notas no fim do mês",
      "Times independentes com ciclos de deploy próprios",
      "Partes que precisam continuar de pé quando outra cai",
    ],
    custo: [
      "Rede no meio: latência, falhas parciais e consistência eventual",
      "Observabilidade obrigatória: logs, métricas e rastreamento distribuído",
    ],
  },
};

const codigoModulo = `// Cada módulo expõe só um contrato público.
// O resto é internal: outro módulo não consegue depender dele.
namespace Loja.Fiscal;

public interface IEmissorDeNotas
{
    Task<Resultado<NotaId>> EmitirAsync(VendaConfirmada venda, CancellationToken ct);
}

internal sealed class EmissorDeNotas(FiscalDbContext db, IAmbienteNacional sefaz)
    : IEmissorDeNotas
{
    // ...
}

// Quando o Fiscal virar um serviço separado, só a implementação muda:
// o contrato vira uma mensagem na fila, e Vendas nem percebe.`;

/** Monolito modular e microsserviços, lado a lado, com o critério de quando usar cada um. */
export function BeArquitetura() {
  const [modelo, setModelo] = useState<Modelo>("monolito");
  const c = comparativo[modelo];

  return (
    <div className="flex flex-col gap-6">
      <div role="radiogroup" aria-label="Modelo de arquitetura" className="relative flex self-center rounded-full bg-track p-1">
        {(
          [
            ["monolito", "Monolito modular"],
            ["microsservicos", "Microsserviços"],
          ] as const
        ).map(([id, rotulo]) => (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={modelo === id}
            onClick={() => setModelo(id)}
            className="relative z-10 rounded-full px-5 py-2 text-[15px] font-medium"
          >
            {modelo === id && (
              <motion.span
                layoutId="modelo-ativo"
                className="absolute inset-0 -z-10 rounded-full bg-seg-on shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            {rotulo}
          </button>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.15fr_1fr]">
        <div className="glass flex min-h-[340px] flex-col justify-center gap-4 rounded-[28px] p-6 sm:p-8" aria-live="polite">
          <Cliente />
          {modelo === "monolito" ? <DiagramaMonolito /> : <DiagramaMicro />}
        </div>

        <div className="glass flex flex-col gap-6 rounded-[28px] p-6 sm:p-8">
          <div className="flex flex-col gap-2.5">
            <p className="m-0 text-[13px] font-semibold tracking-[0.08em] text-azul uppercase">Quando usar</p>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {c.quando.map((q) => (
                <li key={q} className="flex gap-2.5 text-[15.5px] leading-[1.45]">
                  <span aria-hidden="true" className="mt-[8px] size-1.5 flex-none rounded-full bg-azul" />
                  {q}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="m-0 text-[13px] font-semibold tracking-[0.08em] text-muted uppercase">O preço</p>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {c.custo.map((q) => (
                <li key={q} className="flex gap-2.5 text-[15.5px] leading-[1.45] text-muted">
                  <span aria-hidden="true" className="mt-[8px] size-1.5 flex-none rounded-full bg-line" />
                  {q}
                </li>
              ))}
            </ul>
          </div>
          <p className="m-0 mt-auto rounded-2xl bg-surface-2 p-4 text-[15px] leading-[1.5]">
            <strong className="font-semibold">Como eu decido:</strong> começo com um monolito modular, com fronteiras claras entre
            os módulos. Um módulo vira serviço quando ganha carga, time ou ritmo de deploy próprios, e a fronteira já pronta torna
            essa extração barata.
          </p>
        </div>
      </div>

      <CodeBlock arquivo="Fiscal/IEmissorDeNotas.cs" codigo={codigoModulo} />
    </div>
  );
}

function Cliente() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="rounded-full bg-ink px-4 py-1.5 text-[13px] font-semibold text-paper">Web, app e integrações</span>
      <span aria-hidden="true" className="h-5 w-px bg-line" />
    </div>
  );
}

function Caixa({ titulo, sub, destaque }: { titulo: string; sub?: string; destaque?: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center rounded-2xl px-3 py-3 text-center ${
        destaque ? "bg-azul/12 shadow-[inset_0_0_0_1px_var(--spot-border)]" : "bg-surface shadow-[inset_0_0_0_1px_var(--line)]"
      }`}
    >
      <span className="text-[14px] font-semibold">{titulo}</span>
      {sub && <span className="text-[12px] text-muted">{sub}</span>}
    </motion.div>
  );
}

function DiagramaMonolito() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-full rounded-[22px] border-2 border-dashed border-azul/40 p-3">
        <p className="m-0 mb-2.5 text-center text-[12.5px] font-semibold text-azul">Uma aplicação, um deploy</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {modulos.map((m) => (
            <Caixa key={m} titulo={m} sub="módulo" />
          ))}
        </div>
        <p className="m-0 mt-2.5 text-center text-[12.5px] text-muted">Chamadas em memória, uma transação só</p>
      </div>
      <span aria-hidden="true" className="h-5 w-px bg-line" />
      <Caixa titulo="Banco de dados" sub="esquemas separados por módulo" destaque />
    </div>
  );
}

function DiagramaMicro() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Caixa titulo="API Gateway" sub="autenticação e roteamento" destaque />
      <span aria-hidden="true" className="h-4 w-px bg-line" />
      <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
        {modulos.map((m) => (
          <div key={m} className="flex flex-col items-center gap-1.5">
            <Caixa titulo={m} sub="serviço" />
            <span aria-hidden="true" className="h-3 w-px bg-line" />
            <span className="rounded-lg bg-surface-2 px-2 py-1 text-[11.5px] text-muted">banco próprio</span>
          </div>
        ))}
      </div>
      <div className="flex w-full items-center gap-2 rounded-2xl bg-[#d8b867]/15 px-4 py-2.5 text-[13px] shadow-[inset_0_0_0_1px_rgb(216_184_103/0.5)]">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#d8b867] opacity-70" />
          <span className="relative inline-flex size-2 rounded-full bg-[#d8b867]" />
        </span>
        <span>
          <strong className="font-semibold">RabbitMQ:</strong> eventos como <code className="font-mono text-[12px]">VendaConfirmada</code>{" "}
          ligam os serviços sem que um espere o outro
        </span>
      </div>
    </div>
  );
}
