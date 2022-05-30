/* eslint-disable @typescript-eslint/no-explicit-any */
export function isNullOrUndefined(value?: any | null): value is null | undefined {
  return value === undefined || value === null;
}

export function isNullOrEmptyOrUndefined(value?: any | null): value is null | undefined {
  return value === undefined || value === null || value === "" || value.toString().trim() === "";
}
