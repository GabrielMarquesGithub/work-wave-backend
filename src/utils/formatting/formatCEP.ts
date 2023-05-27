export function formatCEP(cep: string): string {
  // Caso o cep não possua hífen ele recebe
  return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}
