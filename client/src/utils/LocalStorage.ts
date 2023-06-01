export const SaveToLs = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const GetFromLs = <T>(key: string): T | null => {
  const value = localStorage.getItem(key);
  if (!value) {
    return null;
  }
  return JSON.parse(value);
};
