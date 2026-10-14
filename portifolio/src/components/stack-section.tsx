import Image from "next/image";
import { stackGrupos } from "@/data/stack";

/** Stack em formato de ficha técnica: uma linha por camada, ícone pequeno + nome. */
export function StackSection({ id = "stack" }: { id?: string }) {
  return (
    <section id={id} aria-labelledby={`t-${id}`} className="scroll-mt-16 py-20 sm:py-28">
      <div className="wrap max-w-[1200px]">
        <div className="mb-10 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end">
          <h2 id={`t-${id}`} className="m-0 text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.1] font-semibold tracking-[-0.03em]">
            Stack de produção.
          </h2>
          <p className="m-0 max-w-[460px] text-[17px] text-muted md:justify-self-end">
            As tecnologias que uso no trabalho e nos meus projetos, da infraestrutura à interface.
          </p>
        </div>

        <dl className="m-0 border-b border-line">
          {stackGrupos.map((g) => (
            <div key={g.grupo} className="grid gap-x-10 gap-y-4 border-t border-line py-6 md:grid-cols-[220px_minmax(0,1fr)]">
              <dt className="flex flex-col gap-0.5">
                <span className="text-[16px] font-semibold">{g.grupo}</span>
                <span className="text-[14px] text-muted">{g.descricao}</span>
              </dt>
              <dd className="m-0">
                <ul className="m-0 flex list-none flex-wrap gap-x-7 gap-y-3 p-0">
                  {g.itens.map((t) => (
                    <li key={t.nome} className="flex items-center gap-2.5 text-[15px]">
                      <Image
                        src={`/stack/${t.icone}.svg`}
                        alt=""
                        width={20}
                        height={20}
                        unoptimized
                        className={`size-5 ${t.inverter ? "dark:invert" : ""}`}
                      />
                      {t.nome}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
