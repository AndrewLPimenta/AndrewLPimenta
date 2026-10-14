import { Wallpaper } from "./fx/wallpaper";

/** Cabeçalho das páginas internas, com wallpaper de luz. */
export function PageHeader({ title, lead, children }: { title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-28 pb-24 text-center sm:pt-36 sm:pb-28">
      <Wallpaper variant="hero" fade="bottom" />
      <div className="wrap relative z-10 flex flex-col items-center gap-6">
        <h1 className="display-1 max-w-[900px]">{title}</h1>
        {lead && <p className="lead max-w-[660px]">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
