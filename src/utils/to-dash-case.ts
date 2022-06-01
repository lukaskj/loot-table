export function toDashCase(str: string): string {
  if (str === null || str === undefined) return "";
  const dashed = str
    .replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())
    .replace(/^-/g, "")
    .replace(/\s+/g, "-");

  return dashed;
}
