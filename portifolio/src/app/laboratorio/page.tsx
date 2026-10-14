import { redirect } from "next/navigation";

/** O Laboratório virou a página Dev. Links antigos continuam funcionando. */
export default function LaboratorioPage() {
  redirect("/dev");
}
