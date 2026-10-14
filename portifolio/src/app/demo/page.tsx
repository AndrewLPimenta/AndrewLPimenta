import { redirect } from "next/navigation";

/** A página Demo virou a página Dev. Links antigos continuam funcionando. */
export default function DemoPage() {
  redirect("/dev");
}
