/**
 * Realce de sintaxe mínimo para C# e TypeScript, linha a linha.
 * Suficiente para os trechos do laboratório, sem dependência extra.
 */
export type Token = { t: string; k: "kw" | "type" | "fn" | "str" | "num" | "com" | "plain" };

const KW_CS = new Set(
  "public private protected internal static readonly sealed class record struct enum var new return if else is not and or null true false async await using namespace this get set init void string int decimal bool object switch case default throw foreach for in out ref params where select from".split(
    " ",
  ),
);
const KW_TS = new Set(
  "export import from const let function return if else async await new class extends public readonly static get type interface throw try catch typeof as null undefined true false of in await".split(" "),
);
const TIPOS_TS = new Set(["Promise", "Record", "Response", "Error", "Object", "JSON", "string", "number", "boolean", "unknown"]);

const RE = /(\/\/.*$|\/\*.*?\*\/)|(\$?"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d[\d_]*(?:\.\d+)?m?\b)|([A-Za-z_]\w*)|(\s+|.)/g;

export function realcar(linha: string, lang: "csharp" | "ts"): Token[] {
  const kw = lang === "csharp" ? KW_CS : KW_TS;
  const out: Token[] = [];
  for (const m of linha.matchAll(RE)) {
    const [txt, com, str, num, id] = m;
    if (com) out.push({ t: txt, k: "com" });
    else if (str) out.push({ t: txt, k: "str" });
    else if (num) out.push({ t: txt, k: "num" });
    else if (id) {
      const depois = linha.slice((m.index ?? 0) + txt.length);
      if (kw.has(id)) out.push({ t: txt, k: "kw" });
      else if (/^[A-Z]/.test(id) || TIPOS_TS.has(id)) out.push({ t: txt, k: /^\s*\(/.test(depois) && lang === "ts" ? "fn" : "type" });
      else if (/^\s*[(<]/.test(depois)) out.push({ t: txt, k: "fn" });
      else out.push({ t: txt, k: "plain" });
    } else out.push({ t: txt, k: "plain" });
  }
  return out;
}

export const corToken: Record<Token["k"], string> = {
  kw: "text-[#8fb3ff]",
  type: "text-[#e2c27a]",
  fn: "text-[#c9d6ff]",
  str: "text-[#a6d99c]",
  num: "text-[#f2a77b]",
  com: "text-[#6f7d92] italic",
  plain: "text-[#dbe2ec]",
};
