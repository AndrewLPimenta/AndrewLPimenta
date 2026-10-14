/**
 * Molduras de navegador e de celular.
 * Coloque uma captura real como `children` (por exemplo, um <Image> do next/image).
 */

type FrameProps = {
  children?: React.ReactNode;
  className?: string;
  /** Altura fixa da área de conteúdo. Sem ela, a área usa proporção 16:10. */
  height?: number;
  rounded?: "all" | "top";
  shadow?: boolean;
  /** Classe de proporção da área de conteúdo, para capturas reais (ex.: "aspect-[2/1]"). */
  aspecto?: string;
};

export function BrowserFrame({ children, className = "", height, rounded = "all", shadow = true, aspecto }: FrameProps) {
  const radius = rounded === "all" ? "rounded-[16px]" : "rounded-t-[16px]";
  return (
    <div
      className={`overflow-hidden bg-surface ring-1 ring-black/5 dark:ring-white/10 ${radius} ${
        shadow ? "shadow-[0_40px_90px_-40px_rgba(15,30,54,.55)]" : ""
      } ${className}`}
    >
      <div aria-hidden="true" className="flex h-9 items-center gap-[7px] bg-frame-bar px-4">
        <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        <span className="mx-auto h-4 w-1/3 max-w-[260px] rounded-md bg-frame-dot/50" />
      </div>
      <div className={height ? "" : (aspecto ?? "aspect-[4/3] sm:aspect-[16/10]")} style={height ? { height } : undefined}>
        {children}
      </div>
    </div>
  );
}

export function PhoneFrame({ children, className = "" }: FrameProps) {
  return (
    <div
      className={`relative w-[250px] rounded-[48px] bg-[#0b0e13] p-[9px] shadow-[0_40px_80px_-30px_rgba(15,30,54,.6),inset_0_0_0_1.5px_rgba(255,255,255,.12)] ${className}`}
    >
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[40px]">
        <span
          aria-hidden="true"
          className="absolute top-2.5 left-1/2 z-10 h-6 w-[84px] -translate-x-1/2 rounded-full bg-[#0b0e13]"
        />
        {children}
      </div>
    </div>
  );
}
