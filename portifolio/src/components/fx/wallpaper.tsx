/**
 * Wallpaper de luz: três manchas desfocadas que se movem devagar, com granulação.
 * - "hero": acompanha o tema (claro ou escuro).
 * - "navy": para blocos azul-marinho.
 * - "soft": versão mais suave para seções.
 * `fade` dissolve as bordas para o wallpaper não terminar numa linha seca.
 */
const fades = {
  none: "",
  bottom: "[mask-image:linear-gradient(to_bottom,black_55%,transparent)]",
  both: "[mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)]",
};

export function Wallpaper({
  variant = "hero",
  fade = "none",
  className = "",
}: {
  variant?: "hero" | "navy" | "soft";
  fade?: keyof typeof fades;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`wallpaper wallpaper-${variant} ${fades[fade]} ${className}`}>
      <span className="blob b1" />
      <span className="blob b2" />
      <span className="blob b3" />
      <span className="grain" />
    </div>
  );
}
