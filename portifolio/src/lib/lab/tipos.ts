export type StatusCobranca = "Pendente" | "Paga";

export type Cobranca = {
  id: string;
  cliente: string;
  documento: string;
  valor: number;
  /** Data no formato AAAA-MM-DD, como o DateOnly do .NET serializa. */
  vencimento: string;
  status: StatusCobranca;
  criadaEm: string;
  pagaEm: string | null;
};

export type CobrancaInput = Pick<Cobranca, "cliente" | "documento" | "valor" | "vencimento">;

/** Formato de erro da RFC 9457, o mesmo que o ASP.NET Core devolve. */
export type ProblemDetails = {
  type?: string;
  title: string;
  status: number;
  detail?: string;
  errors?: Record<string, string[]>;
};

export type Operacao = "listar" | "criar" | "atualizar" | "pagar" | "excluir";

export type Metodo = "GET" | "POST" | "PUT" | "DELETE";

export type RespostaHttp = {
  status: number;
  headers: Record<string, string>;
  body: unknown;
};

export type Registro = {
  id: number;
  op: Operacao;
  metodo: Metodo;
  url: string;
  requisicao?: unknown;
  status: number;
  headers: Record<string, string>;
  resposta: unknown;
  ms: number;
};
