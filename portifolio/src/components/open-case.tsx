"use client";

import { useCallback, useState } from "react";
import type { Project } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { ProjectSheet } from "./project-sheet";

/** Botão que abre o estudo de caso numa folha estilo iOS, sem sair da página. */
export function OpenCase({
  project,
  label = "Ver detalhes",
  variant = "default",
}: {
  project: Project;
  label?: string;
  variant?: "default" | "outline" | "secondary";
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <Button size="lg" variant={variant} onClick={() => setOpen(true)}>
        {label}
      </Button>
      <ProjectSheet project={open ? project : null} onClose={close} />
    </>
  );
}
