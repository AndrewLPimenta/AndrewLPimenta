import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-40 text-center">
      <div className="wrap flex flex-col items-center gap-5">
        <h1 className="display-2">Esta página não existe.</h1>
        <p className="lead max-w-[520px]">O endereço pode ter mudado. Os projetos e o contato continuam no mesmo lugar.</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link className="pill pill-blue" href="/projetos">
            Ver projetos
          </Link>
          <Link className="pill pill-line" href="/">
            Voltar ao início
          </Link>
        </div>
      </div>
    </section>
  );
}
