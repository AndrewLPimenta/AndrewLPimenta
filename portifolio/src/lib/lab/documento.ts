/**
 * Validação de CPF e CNPJ, a mesma regra do DocumentoFiscal.cs.
 * Aceita o CNPJ alfanumérico: letras valem (código ASCII - 48) no cálculo,
 * e os dois dígitos verificadores continuam numéricos.
 */
const PESOS_CPF_1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
const PESOS_CPF_2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
const PESOS_CNPJ_1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const PESOS_CNPJ_2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

export function normalizarDocumento(valor: string): string {
  return valor.toUpperCase().replace(/[^0-9A-Z]/g, "");
}

function confere(d: string, pesos: number[]): boolean {
  let soma = 0;
  for (let i = 0; i < pesos.length; i++) soma += (d.charCodeAt(i) - 48) * pesos[i];
  const resto = soma % 11;
  const digito = resto < 2 ? 0 : 11 - resto;
  return d.charCodeAt(pesos.length) - 48 === digito;
}

const ehDigito = (c: string) => c >= "0" && c <= "9";

export function documentoValido(valor: string): boolean {
  const d = normalizarDocumento(valor);
  if (new Set(d).size <= 1) return false;
  if (d.length === 11) return /^\d{11}$/.test(d) && confere(d, PESOS_CPF_1) && confere(d, PESOS_CPF_2);
  if (d.length === 14) {
    return ehDigito(d[12]) && ehDigito(d[13]) && confere(d, PESOS_CNPJ_1) && confere(d, PESOS_CNPJ_2);
  }
  return false;
}

export function formatarDocumento(valor: string): string {
  const d = normalizarDocumento(valor);
  if (d.length === 11) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  if (d.length === 14) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
  return valor;
}
