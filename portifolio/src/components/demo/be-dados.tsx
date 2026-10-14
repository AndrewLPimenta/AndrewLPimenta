"use client";

import { useMemo, useState } from "react";
import { CodeBlock } from "./code-block";

/* ---------- Trie: autocompletar ---------- */

const nomes = [
  "Academia Força Total", "Açaí da Praça", "Agência Norte", "Auto Center Rocha", "Barbearia Navalha", "Bistrô Aurora",
  "Café Central", "Casa do Pão", "Centro Médico Vida", "Clínica Bem Estar", "Clínica Sorriso", "Colégio Horizonte",
  "Construtora Pilar", "Doceria Mel", "Escola de Inglês Bridge", "Espaço Zen", "Estúdio Aurora", "Farmácia Saúde",
  "Floricultura Jardim", "Hamburgueria Brasa", "Hotel Mirante", "Imobiliária Lar", "Lavanderia Bolha", "Loja Bella",
  "Mercado Bom Preço", "Oficina Duas Rodas", "Ótica Visão", "Padaria Trigo", "Pet Shop Amigo", "Pizzaria Forno",
  "Restaurante Sabor", "Salão Glamour", "Sorveteria Gelato", "Studio Pilates Core", "Clube Atlético", "Clube Náutico",
];

type No = { filhos: Map<string, No>; fim: string[] };

function novoNo(): No {
  return { filhos: new Map(), fim: [] };
}

function normalizar(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function construir(palavras: string[]) {
  const raiz = novoNo();
  for (const p of palavras) {
    let no = raiz;
    for (const c of normalizar(p)) {
      if (!no.filhos.has(c)) no.filhos.set(c, novoNo());
      no = no.filhos.get(c)!;
    }
    no.fim.push(p);
  }
  return raiz;
}

/** Desce pelo prefixo (um passo por letra) e coleta até `limite` palavras abaixo dele. */
function buscar(raiz: No, prefixo: string, limite = 6) {
  let no: No | undefined = raiz;
  let visitados = 0;
  for (const c of normalizar(prefixo)) {
    no = no.filhos.get(c);
    visitados++;
    if (!no) return { resultados: [], visitados };
  }
  const resultados: string[] = [];
  const pilha: No[] = [no];
  while (pilha.length && resultados.length < limite) {
    const atual = pilha.pop()!;
    resultados.push(...atual.fim);
    pilha.push(...[...atual.filhos.values()].reverse());
  }
  return { resultados: resultados.slice(0, limite), visitados };
}

function Autocompletar() {
  const raiz = useMemo(() => construir(nomes), []);
  const [busca, setBusca] = useState("cl");
  const { resultados, visitados } = useMemo(() => buscar(raiz, busca), [raiz, busca]);
  const letras = normalizar(busca).split("");

  return (
    <div className="glass flex flex-col gap-5 rounded-[28px] p-6 sm:p-8">
      <div className="flex flex-col gap-1.5">
        <p className="m-0 text-[13px] font-semibold tracking-[0.08em] text-azul uppercase">Árvore de prefixos (trie)</p>
        <h4 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">Autocompletar que não varre a lista inteira.</h4>
        <p className="m-0 text-[15px] text-muted">
          Cada letra é um passo na árvore. O custo depende do tamanho do que foi digitado, e não de quantos clientes existem.
        </p>
      </div>
      <input
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        aria-label="Buscar cliente"
        placeholder="Digite o nome de um cliente"
        className="h-12 rounded-2xl bg-surface px-4 text-[16px] text-ink shadow-[inset_0_0_0_1px_var(--line)] outline-none focus:shadow-[inset_0_0_0_2px_var(--azul)]"
      />
      <div className="flex flex-wrap items-center gap-1.5" aria-hidden="true">
        <span className="rounded-lg bg-ink px-2 py-1 font-mono text-[12px] text-paper">raiz</span>
        {letras.map((l, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className="text-muted">→</span>
            <span className="rounded-lg bg-azul/15 px-2 py-1 font-mono text-[12px] text-azul">{l === " " ? "␣" : l}</span>
          </span>
        ))}
      </div>
      <ul className="m-0 flex min-h-[132px] list-none flex-col gap-1 p-0" aria-live="polite" aria-label="Sugestões">
        {resultados.length === 0 && <li className="text-[15px] text-muted">Nenhum cliente com esse começo.</li>}
        {resultados.map((r) => (
          <li key={r} className="text-[15px]">
            <strong className="font-semibold">{r.slice(0, busca.length)}</strong>
            {r.slice(busca.length)}
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="rounded-2xl bg-surface-2 p-3">
          <p className="m-0 font-mono text-[24px] font-semibold text-azul">{visitados}</p>
          <p className="m-0 text-[12.5px] text-muted">passos na árvore</p>
        </div>
        <div className="rounded-2xl bg-surface-2 p-3">
          <p className="m-0 font-mono text-[24px] font-semibold">{nomes.length}</p>
          <p className="m-0 text-[12.5px] text-muted">comparações numa lista simples</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Árvore B: índice do banco ---------- */

const escalas = [1_000, 10_000, 100_000, 1_000_000, 10_000_000, 100_000_000];
const FANOUT = 400; // chaves por página de índice, aproximado

function fmt(n: number) {
  return n.toLocaleString("pt-BR");
}

function IndiceBanco() {
  const [i, setI] = useState(3);
  const linhas = escalas[i];
  const leiturasIndice = Math.max(1, Math.ceil(Math.log(linhas) / Math.log(FANOUT))) + 1;
  const larguraIndice = Math.max(2, (Math.log10(leiturasIndice) / Math.log10(linhas)) * 100);

  return (
    <div className="glass flex flex-col gap-5 rounded-[28px] p-6 sm:p-8">
      <div className="flex flex-col gap-1.5">
        <p className="m-0 text-[13px] font-semibold tracking-[0.08em] text-azul uppercase">Árvore B (índice)</p>
        <h4 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">Por que um índice muda tudo quando a tabela cresce.</h4>
        <p className="m-0 text-[15px] text-muted">
          Sem índice, o banco lê linha por linha. Com índice, ele desce uma árvore B de poucos níveis até a linha certa.
        </p>
      </div>
      <label className="flex flex-col gap-2">
        <span className="flex justify-between text-[14px]">
          <span>Linhas na tabela de cobranças</span>
          <span className="font-mono font-semibold">{fmt(linhas)}</span>
        </span>
        <input type="range" min={0} max={escalas.length - 1} value={i} onChange={(e) => setI(+e.target.value)} className="accent-[var(--azul)]" />
      </label>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[14px]">
            <span>Sem índice (varredura)</span>
            <span className="font-mono text-muted">{fmt(linhas)} linhas lidas</span>
          </div>
          <div className="h-3 rounded-full bg-[#e5484d]/70" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[14px]">
            <span>Com índice (árvore B)</span>
            <span className="font-mono text-muted">≈ {leiturasIndice} páginas lidas</span>
          </div>
          <div className="h-3 rounded-full bg-track">
            <div className="h-full rounded-full bg-azul transition-all duration-500" style={{ width: `${larguraIndice}%` }} />
          </div>
        </div>
        <p className="m-0 text-[12.5px] text-muted">Barras em escala logarítmica. Valores aproximados, com cerca de {FANOUT} chaves por página.</p>
      </div>
      <CodeBlock
        lang="ts"
        arquivo="migracao.sql"
        codigo={`-- A consulta mais comum da tela de cobranças:
-- SELECT ... WHERE cliente_id = @id AND status = 'Aberta' ORDER BY vencimento

CREATE INDEX ix_cobrancas_cliente_status_venc
    ON cobrancas (cliente_id, status, vencimento)
    INCLUDE (valor);  -- cobre a consulta sem voltar à tabela

-- Índice também tem custo: cada INSERT e UPDATE atualiza a árvore.
-- Por isso crio a partir do plano de execução, e não por palpite.`}
      />
    </div>
  );
}

/** Estruturas de dados aplicadas a problemas reais de sistema. */
export function BeDados() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <Autocompletar />
      <IndiceBanco />
    </div>
  );
}
