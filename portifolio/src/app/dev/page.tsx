import type { Metadata } from "next";
import { DemoShell } from "@/components/demo/demo-shell";

export const metadata: Metadata = {
  title: "Dev",
  description:
    "Como eu desenvolvo: componentes de interface interativos e um back-end explicado na prática, com arquitetura, filas, contêineres, testes, pipeline e decisões registradas.",
};

export default function DevPage() {
  return <DemoShell />;
}
