export const getVideoSrc = (value?: string | null) => {
  if (!value) return null;
  if (value.startsWith("http")) return value;
  return `https://www.youtube.com/embed/${value}`;
};
