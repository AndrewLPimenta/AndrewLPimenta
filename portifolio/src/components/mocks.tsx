/**
 * Interfaces desenhadas que ocupam as molduras até entrarem as capturas reais.
 * São só formas (sem dados inventados) e seguem o tema claro e escuro.
 */

const panel = "rounded-xl bg-[var(--mock-panel)] shadow-[0_1px_0_var(--mock-line)]";
const line = "block rounded-full bg-[var(--mock-line)]";

export function DashboardMock() {
  const kpis = [0.78, 0.6, 0.88, 0.52];
  const bars = [0.45, 0.7, 0.55, 0.9, 0.62, 0.8, 0.5, 0.72];
  const nav = [70, 55, 64, 48, 60, 42];
  return (
    <div aria-hidden="true" className="flex h-full w-full gap-3 bg-[var(--mock-bg)] p-3 sm:gap-4 sm:p-5">
      <div className={`${panel} hidden w-[17%] flex-col gap-3 p-4 sm:flex`}>
        <span className="mb-3 block h-3.5 w-3/4 rounded-full bg-gradient-to-r from-azul to-[#8fb3ff]" />
        {nav.map((w, i) => (
          <span key={i} className={`${line} h-2.5 ${i === 1 ? "bg-azul/35" : ""}`} style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4">
        <div className="flex items-center justify-between">
          <span className={`${line} h-3 w-1/4`} />
          <div className="flex gap-2">
            <span className={`${line} h-6 w-16`} />
            <span className="block h-6 w-6 rounded-full bg-azul/70" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {kpis.map((v, i) => (
            <div key={i} className={`${panel} p-3 sm:p-4`}>
              <span className={`${line} h-2 w-1/2`} />
              <span
                className="mt-3 block h-4 rounded-md bg-gradient-to-r from-azul to-[#8fb3ff] sm:h-5"
                style={{ width: `${v * 100}%`, opacity: 0.55 + v * 0.45 }}
              />
            </div>
          ))}
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-3 sm:gap-4">
          <div className={`${panel} col-span-2 flex flex-col p-3 sm:p-4`}>
            <span className={`${line} h-2 w-1/3`} />
            <svg viewBox="0 0 300 110" preserveAspectRatio="none" className="mt-3 min-h-0 w-full flex-1">
              <defs>
                <linearGradient id="mock-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2f6be0" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#2f6be0" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 86 C30 80 45 62 75 64 S120 40 150 46 S200 22 230 30 S275 12 300 16 L300 110 L0 110 Z"
                fill="url(#mock-area)"
              />
              <path
                d="M0 86 C30 80 45 62 75 64 S120 40 150 46 S200 22 230 30 S275 12 300 16"
                fill="none"
                stroke="#2f6be0"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M0 96 C40 92 60 84 90 86 S140 70 170 74 S220 58 250 62 S285 50 300 52"
                fill="none"
                stroke="#d8b867"
                strokeWidth="2"
                strokeDasharray="5 5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
          <div className={`${panel} flex flex-col p-3 sm:p-4`}>
            <span className={`${line} h-2 w-1/2`} />
            <div className="mt-3 flex min-h-0 flex-1 items-end gap-1 sm:gap-1.5">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className={`block flex-1 rounded-t-[4px] ${i === 3 ? "bg-[#d8b867]" : "bg-azul/60"}`}
                  style={{ height: `${h * 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PraxisMock() {
  return (
    <div aria-hidden="true" className="relative flex h-full w-full flex-col gap-3 bg-[var(--mock-bg)] px-4 pt-10 pb-20">
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 44 44" className="size-11 flex-none -rotate-90">
          <circle cx="22" cy="22" r="18" fill="none" stroke="var(--mock-line)" strokeWidth="4" />
          <circle
            cx="22"
            cy="22"
            r="18"
            fill="none"
            stroke="#2f6be0"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="113"
            strokeDashoffset="38"
          />
        </svg>
        <div className="flex flex-1 flex-col gap-1.5">
          <span className={`${line} h-2.5 w-3/4`} />
          <span className={`${line} h-2 w-1/2`} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[0.7, 0.5, 0.85, 0.4].map((v, i) => (
          <div key={i} className={`${panel} p-2.5`}>
            <span className={`${line} h-1.5 w-1/2`} />
            <span
              className={`mt-2 block h-3 rounded ${i === 2 ? "bg-[#d8b867]" : "bg-azul/60"}`}
              style={{ width: `${v * 100}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <span className="ml-auto block h-7 w-3/5 rounded-2xl rounded-br-md bg-azul" />
        <span className={`${panel} block h-10 w-4/5 rounded-2xl rounded-bl-md`} />
        <span className="ml-auto block h-7 w-1/2 rounded-2xl rounded-br-md bg-azul" />
        <span className={`${panel} block h-7 w-2/3 rounded-2xl rounded-bl-md`} />
      </div>
      <div className="glass absolute inset-x-4 bottom-4 flex h-12 items-center justify-around rounded-full">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`block size-5 rounded-lg ${i === 1 ? "bg-azul" : "bg-[var(--mock-line)]"}`} />
        ))}
      </div>
    </div>
  );
}

export function AlbumMock() {
  const left = ["col-span-2 row-span-2", "", ""];
  const right = ["", "", "col-span-2", "", ""];
  const tones = ["var(--photo-1)", "var(--photo-2)", "var(--photo-3)", "var(--photo-4)"];
  return (
    <div aria-hidden="true" className="flex h-full w-full flex-col gap-4 bg-[var(--mock-bg)] p-4 sm:p-6">
      <div className="flex flex-1 gap-1 rounded-xl bg-[var(--mock-panel)] p-3 shadow-[0_18px_40px_-24px_rgb(15_30_54/0.5)] sm:p-4">
        <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-1.5">
          {left.map((span, i) => (
            <span key={i} className={`block rounded-md ${span}`} style={{ background: `linear-gradient(140deg, ${tones[i]}, ${tones[(i + 1) % 4]})` }} />
          ))}
        </div>
        <span className="mx-1 w-px bg-[var(--mock-line)]" />
        <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-1.5">
          {right.map((span, i) => (
            <span key={i} className={`block rounded-md ${span}`} style={{ background: `linear-gradient(160deg, ${tones[(i + 2) % 4]}, ${tones[(i + 3) % 4]})` }} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-8 gap-1.5">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className={`relative block aspect-[4/3] rounded ${i === 5 ? "ring-2 ring-[#d8b867]" : ""}`}
            style={{ background: tones[i % 4], opacity: i === 5 ? 1 : 0.85 }}
          />
        ))}
      </div>
    </div>
  );
}
