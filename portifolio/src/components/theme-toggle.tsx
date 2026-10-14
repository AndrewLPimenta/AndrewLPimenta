"use client";

import { useSyncExternalStore } from "react";

type Tema = "light" | "dark";

function lerTema(): Tema {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function assinar(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  const tema = useSyncExternalStore(assinar, lerTema, () => "light" as Tema);
  const proximo: Tema = tema === "dark" ? "light" : "dark";

  function alternar() {
    document.documentElement.dataset.theme = proximo;
    try {
      localStorage.setItem("tema", proximo);
    } catch {
      // Sem armazenamento local: o tema vale só para esta visita.
    }
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={proximo === "dark" ? "Usar tema escuro" : "Usar tema claro"}
      title={proximo === "dark" ? "Tema escuro" : "Tema claro"}
      className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-mist hover:text-ink active:scale-95"
    >
      {tema === "dark" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20 14.6A8.5 8.5 0 0 1 9.4 4a8.5 8.5 0 1 0 10.6 10.6Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
