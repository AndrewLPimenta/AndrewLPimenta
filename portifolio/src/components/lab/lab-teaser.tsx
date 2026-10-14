import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/fx/reveal";
import { corToken, realcar } from "@/lib/lab/highlight";

const trecho = `var erros = req.Validar(Hoje(relogio));
if (erros.Count > 0)
    return TypedResults.ValidationProblem(erros);

var cobranca = Cobranca.Criar(req.Cliente, req.Documento, ...);
db.Cobrancas.Add(cobranca);
await db.SaveChangesAsync(ct);

return TypedResults.Created($"/api/cobrancas/{cobranca.Id}", ...);`;

const pontos = [
  "Regras que o sistema não deixa quebrar",
  "Mensagens de erro que dizem o que fazer",
  "CPF e o novo CNPJ alfanumérico validados",
  "Um teste automático para cada regra",
];

/** Chamada para a página Dev na página inicial. */
export function LabTeaser() {
  return (
    <section aria-labelledby="t-lab" className="pb-32">
      <div className="wrap max-w-[1200px]">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-x-16 gap-y-12 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-5">
            <p className="m-0 text-[15px] font-semibold tracking-[0.14em] text-muted uppercase">Na prática</p>
            <h2 id="t-lab" className="display-2">
              Teste antes de conversar comigo.
            </h2>
            <p className="lead">
              Um pequeno sistema de cobranças, funcionando. Cadastre, edite, tente quebrar as regras e, se quiser, veja a API e o
              código C# por trás de cada clique.
            </p>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[17px]">
              {pontos.map((p) => (
                <li key={p} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[9px] size-1.5 shrink-0 rounded-full bg-azul" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <Link href="/dev#back-end" className="pill pill-blue gap-2">
                Testar o sistema <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[22px] bg-[#0b1220] shadow-[0_40px_90px_-40px_rgba(15,30,54,.7)] ring-1 ring-white/10">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 font-mono text-[12.5px]">
                <span className="font-semibold text-[#e2c27a]">POST</span>
                <span className="flex-1 truncate text-[#dbe2ec]">/api/cobrancas</span>
                <span className="rounded-md bg-[#3fb27f]/15 px-1.5 py-0.5 font-semibold text-[#8fe0b5]">201 Created</span>
              </div>
              <pre className="m-0 overflow-x-auto p-5 font-mono text-[12.5px] leading-[1.75]">
                {trecho.split("\n").map((linha, i) => (
                  <div key={i}>
                    <code>
                      {realcar(linha, "csharp").map((t, k) => (
                        <span key={k} className={corToken[t.k]}>
                          {t.t}
                        </span>
                      ))}
                      {linha === "" ? " " : null}
                    </code>
                  </div>
                ))}
              </pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
