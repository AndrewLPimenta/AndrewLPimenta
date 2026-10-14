"use client";

import type { Registro } from "@/lib/lab/tipos";

const corMetodo: Record<Registro["metodo"], string> = {
  GET: "text-[#8fd3a5]",
  POST: "text-[#e2c27a]",
  PUT: "text-[#8fb3ff]",
  DELETE: "text-[#ff9b8f]",
};

const textoStatus: Record<number, string> = {
  200: "OK",
  201: "Created",
  204: "No Content",
  400: "Bad Request",
  404: "Not Found",
  409: "Conflict",
};

function Json({ valor }: { valor: unknown }) {
  return (
    <pre className="m-0 max-h-56 overflow-auto rounded-lg bg-black/30 p-3 font-mono text-[12px] leading-[1.55] whitespace-pre-wrap text-[#dbe2ec]">
      {JSON.stringify(valor, null, 2)}
    </pre>
  );
}

/** Painel estilo DevTools com as requisições feitas à API, da mais nova para a mais antiga. */
export function RequestLog({ registros, onLimpar }: { registros: Registro[]; onLimpar: () => void }) {
  const ultimo = registros[0];
  return (
    <div className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-[22px] bg-[#0b1220] text-[#dbe2ec] ring-1 ring-white/10">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
          <h3 className="m-0 text-[14px] font-semibold tracking-[0.02em]">Rede</h3>
          <span className="text-[12px] text-[#8a97ab]">{registros.length} {registros.length === 1 ? "requisição" : "requisições"}</span>
        </div>
        <button
          type="button"
          onClick={onLimpar}
          className="rounded-full px-3 py-1 text-[12px] font-medium text-[#a9b6c9] hover:bg-white/10 hover:text-white"
        >
          Limpar
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {ultimo ? `${ultimo.metodo} ${ultimo.url} respondeu ${ultimo.status} ${textoStatus[ultimo.status] ?? ""}` : ""}
      </p>

      {registros.length === 0 ? (
        <div className="flex flex-1 items-center justify-center px-8 text-center text-[14px] text-[#8a97ab]">
          Nenhuma requisição ainda. Crie, edite, pague ou exclua uma cobrança.
        </div>
      ) : (
        <ol className="m-0 flex max-h-[560px] flex-1 list-none flex-col overflow-y-auto p-2">
          {registros.map((r, i) => {
            const erro = r.status >= 400;
            return (
              <li key={r.id}>
                <details open={i === 0} className="group rounded-xl open:bg-white/[0.04]">
                  <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl px-3 py-2.5 font-mono text-[12.5px] hover:bg-white/[0.06] [&::-webkit-details-marker]:hidden">
                    <span className={`w-12 shrink-0 font-semibold ${corMetodo[r.metodo]}`}>{r.metodo}</span>
                    <span className="min-w-0 flex-1 truncate">{r.url}</span>
                    <span
                      className={`shrink-0 rounded-md px-1.5 py-0.5 font-semibold ${
                        erro ? "bg-[#ff6b5b]/15 text-[#ffab9f]" : "bg-[#3fb27f]/15 text-[#8fe0b5]"
                      }`}
                    >
                      {r.status} {textoStatus[r.status]}
                    </span>
                    <span className="w-12 shrink-0 text-right text-[#8a97ab] tabular-nums">{r.ms} ms</span>
                  </summary>
                  <div className="flex flex-col gap-3 px-3 pt-1 pb-3">
                    {r.requisicao !== undefined && (
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] font-semibold tracking-[0.12em] text-[#8a97ab] uppercase">Corpo da requisição</span>
                        <Json valor={r.requisicao} />
                      </div>
                    )}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[11px] font-semibold tracking-[0.12em] text-[#8a97ab] uppercase">
                        Resposta · {r.headers["content-type"] ?? "sem corpo"}
                        {r.headers.location ? ` · Location: ${r.headers.location}` : ""}
                      </span>
                      {r.resposta === null ? (
                        <span className="text-[12px] text-[#8a97ab]">(vazio)</span>
                      ) : (
                        <Json valor={r.resposta} />
                      )}
                    </div>
                  </div>
                </details>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
