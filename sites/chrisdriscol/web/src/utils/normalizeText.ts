export const normalizeText = (value?: string | null) =>
  value
    ?.replaceAll("â€“", "-")
    .replaceAll("â€”", "-")
    .replaceAll("â€™", "'")
    .replaceAll("â€œ", "\"")
    .replaceAll("â€�", "\"")
    .replaceAll("Â", "") ?? "";
