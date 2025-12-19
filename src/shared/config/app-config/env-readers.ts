export const readEnvString = (key: string, fallback?: string): string => {
  const value = import.meta.env[key] as string | undefined;
  if (value === undefined || value.trim() === '') {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const readEnvNumber = (key: string, fallback?: number): number => {
  const raw = import.meta.env[key] as string | undefined;
  if (raw === undefined || raw.trim() === '') {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing environment variable: ${key}`);
  }
  const value = Number(raw);
  if (Number.isNaN(value)) throw new Error(`Environment variable ${key} must be a number`);
  return value;
};

export const readEnvStringArray = (key: string, separator = ',', fallback?: string[]): string[] => {
  const raw = import.meta.env[key] as string | undefined;
  if (raw === undefined || raw.trim() === '') {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing environment variable: ${key}`);
  }
  return raw
    .split(separator)
    .map((x) => x.trim())
    .filter(Boolean);
};
