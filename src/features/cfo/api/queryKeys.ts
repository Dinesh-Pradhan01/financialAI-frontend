export const cfoKeys = {
  dashboard: {
    vendor: () => ["cfo", "dashboard", "vendor"] as const,
    history: () => ["cfo", "dashboard", "history"] as const,
    preview: (id: string) => ["cfo", "dashboard", "history", id] as const,
  },
  vendors: {
    all: (params?: object) => ["cfo", "vendors", params] as const,
    byId: (id: string) => ["cfo", "vendors", id] as const,
  },
};
