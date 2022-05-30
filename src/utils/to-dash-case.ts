export function toDashCase(str: string): string {
  if (str === null || str === undefined) return "";
  const dashed = str.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

  return dashed;
}
