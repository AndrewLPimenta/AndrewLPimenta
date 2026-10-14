"use client";

import { useEffect, useRef, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copiado, setCopiado] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Sem permissão de área de transferência: o e-mail continua visível na página.
    }
    setCopiado(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopiado(false), 2400);
  }

  return (
    <>
      <button type="button" className="pill pill-blue" onClick={copiar}>
        {copiado ? "E-mail copiado" : "Copiar e-mail"}
      </button>
      <p role="status" aria-live="polite" className="sr-only">
        {copiado ? "E-mail copiado para a área de transferência." : ""}
      </p>
    </>
  );
}
