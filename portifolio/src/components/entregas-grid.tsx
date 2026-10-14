import {
  AppWindow,
  Boxes,
  Cable,
  Gauge,
  LayoutTemplate,
  Layers,
  Rocket,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { entregas, type IconeEntrega } from "@/data/entregas";
import { SpotlightCard } from "./fx/spotlight-card";

const icones: Record<IconeEntrega, LucideIcon> = {
  landing: Rocket,
  site: LayoutTemplate,
  sistema: AppWindow,
  saas: Layers,
  api: Cable,
  automacao: Workflow,
  app: Smartphone,
  dashboard: Gauge,
  erp: Boxes,
};

/** Grade com tudo o que já foi entregue além dos destaques. */
export function EntregasGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {entregas.map((e) => {
        const Icone = icones[e.icone];
        return (
          <SpotlightCard key={e.titulo} className="flex flex-col gap-4 rounded-[24px] p-7">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-azul/15 to-ouro/20 text-azul">
              <Icone className="size-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1.5">
              <h3 className="m-0 text-[20px] font-semibold tracking-[-0.015em]">{e.titulo}</h3>
              <p className="m-0 text-base text-muted">{e.texto}</p>
            </div>
          </SpotlightCard>
        );
      })}
    </div>
  );
}
