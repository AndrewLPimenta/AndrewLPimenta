import type { Project } from "@/data/projects";
import { CheckList } from "./check-list";

/** Conteúdo do estudo de caso, usado na folha e na página de cada projeto. */
export function CaseStudyBody({ project }: { project: Project }) {
  const entregue = project.fase === "entregue";
  return (
    <div className="flex flex-col gap-12">
      {project.contexto && <p className="m-0 max-w-[680px] text-[19px] leading-[1.55]">{project.contexto}</p>}

      {project.clientes && (
        <section className="flex flex-col gap-3">
          <h3 className="m-0 text-[15px] font-semibold text-muted">Clientes</h3>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {project.clientes.map((c) => (
              <li key={c} className="glass rounded-full px-4 py-2 text-[15px] font-medium">
                {c}
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.numeros && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {project.numeros.map((n) => (
            <div key={n.rotulo} className="glass flex flex-col gap-1 rounded-[20px] p-6">
              <span className="text-shine text-[44px] leading-none font-semibold tracking-[-0.04em]">
                {n.valor.toLocaleString("pt-BR")}
                {n.sufixo}
              </span>
              <span className="text-[15px] text-muted">{n.rotulo}</span>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
        <Section titulo={entregue ? "O desafio" : "O problema"}>
          <p className="m-0">{project.desafio}</p>
        </Section>
        <Section titulo={entregue ? "A solução e a minha participação" : "A solução"}>
          <p className="m-0">{project.solucao}</p>
        </Section>
      </div>

      <section className="flex flex-col gap-4 rounded-[24px] bg-surface-2 px-7 py-7 sm:px-8">
        <h3 className="m-0 text-[15px] font-semibold text-muted">{entregue ? "Conquistas" : "Destaques técnicos"}</h3>
        <CheckList items={project.conquistas} />
      </section>

      {project.decisoes && (
        <Section titulo="Decisões técnicas">
          <CheckList items={project.decisoes} />
        </Section>
      )}

      <Section titulo="Stack">
        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {project.stack.map((s) => (
            <li key={s} className="inline-flex min-h-[30px] items-center rounded-full bg-surface-2 px-3 text-sm text-chip-ink">
              {s}
            </li>
          ))}
        </ul>
      </Section>

      {project.privado && (
        <p className="m-0 border-t border-hairline pt-7 text-[15px] text-muted">
          Código privado. Mostro a arquitetura com prazer numa conversa.
        </p>
      )}
    </div>
  );
}

function Section({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="m-0 text-[15px] font-semibold text-muted">{titulo}</h3>
      {children}
    </section>
  );
}
