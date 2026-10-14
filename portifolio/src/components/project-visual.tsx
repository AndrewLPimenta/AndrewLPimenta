import Image from "next/image";
import type { Mock } from "@/data/projects";
import { BrowserFrame, PhoneFrame } from "./frames";
import { AlbumMock, PraxisMock } from "./mocks";

/** A tela de cada projeto, já na moldura certa. Troque o mock por uma captura real quando tiver. */
/** `inteira`: mostra a captura real sem recorte (estudo de caso). Sem ela, a captura preenche a moldura (cards). */
export function ProjectVisual({ mock, className = "", inteira = false }: { mock?: Mock; className?: string; inteira?: boolean }) {
  if (mock === "praxis") {
    return (
      <PhoneFrame className={`mx-auto ${className}`}>
        <PraxisMock />
      </PhoneFrame>
    );
  }
  if (mock === "album") {
    return (
      <BrowserFrame className={className}>
        <AlbumMock />
      </BrowserFrame>
    );
  }
  if (mock === "dashboard") {
    // Capturas reais do Dashboard Tático: a tela clara no tema claro e a escura no tema escuro.
    return (
      <BrowserFrame className={className} aspecto={inteira ? "aspect-[16/10]" : undefined}>
        <div className="relative h-full w-full bg-surface">
          <Image
            src="/conceitos/tatico-claro.webp"
            alt="Dashboard Tático, tela de consumo: receita, número de vendas, receita mensal e receita por loja"
            fill
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover object-left-top dark:hidden"
          />
          <Image
            src="/conceitos/tatico-escuro.webp"
            alt="Dashboard Tático, tela de ingressos: receita, ingressos vendidos, ticket médio e taxa de utilização"
            fill
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="hidden object-cover object-left-top dark:block"
          />
        </div>
      </BrowserFrame>
    );
  }
  return null;
}
