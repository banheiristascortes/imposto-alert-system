const PREFIX = "saf_";

export const storage = {
  get: (key: string) => {
    const item = localStorage.getItem(`${PREFIX}${key}`);
    return item ? JSON.parse(item) : null;
  },

  set: (key: string, value: any) => {
    localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
  },

  remove: (key: string) => {
    localStorage.removeItem(`${PREFIX}${key}`);
  },

  clear: () => {
    localStorage.clear();
  },
};