import { corToken, realcar } from "@/lib/lab/highlight";
import { cn } from "@/lib/utils";

/** Bloco de código somente leitura, com título de arquivo e realce de sintaxe. */
export function CodeBlock({
  codigo,
  arquivo,
  lang = "csharp",
  className,
}: {
  codigo: string;
  arquivo?: string;
  lang?: "csharp" | "ts";
  className?: string;
}) {
  const linhas = codigo.replace(/\n$/, "").split("\n");
  return (
    <div className={cn("overflow-hidden rounded-[20px] bg-[#0b1220] text-[#dbe2ec] ring-1 ring-white/10", className)}>
      {arquivo && (
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </span>
          <span className="ml-2 font-mono text-[12.5px] text-[#a9b6c9]">{arquivo}</span>
        </div>
      )}
      <pre className="m-0 overflow-x-auto py-4 font-mono text-[12.5px] leading-[1.7]">
        {linhas.map((l, n) => (
          <div key={n} className="flex pr-6">
            <span aria-hidden="true" className="w-10 shrink-0 pr-4 text-right text-[#4b5870] select-none">
              {n + 1}
            </span>
            <code>
              {realcar(l, lang).map((t, k) => (
                <span key={k} className={corToken[t.k]}>
                  {t.t}
                </span>
              ))}
              {l === "" ? " " : null}
            </code>
          </div>
        ))}
      </pre>
    </div>
  );
}
