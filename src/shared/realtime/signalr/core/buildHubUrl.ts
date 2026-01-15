export const buildHubUrl = (
  hubUrl: string,
  query?: Record<string, string | number | boolean | undefined>,
): string => {
  if (!query) return hubUrl;

  const url = new URL(hubUrl, window.location.origin);

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined) return;
    url.searchParams.set(key, String(value));
  });

  return url.toString();
};
