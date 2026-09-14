export const cfoKeys = {
  dashboard: {
    vendor: () => ["cfo", "dashboard", "vendor"] as const,
    client: () => ["cfo", "dashboard", "client"] as const,
    history: () => ["cfo", "dashboard", "history"] as const,
    preview: (id: string) => ["cfo", "dashboard", "history", id] as const,
  },
  vendors: {
    all: (params?: object) => ["cfo", "vendors", params] as const,
    byId: (id: string) => ["cfo", "vendors", id] as const,
  },
  clients: {
    all: (params?: object) => ["cfo", "clients", params] as const,
    byId: (id: string, category?: string) => ["cfo", "clients", id, category] as const,
    history: () => ["cfo", "clients", "history"] as const,
    historyPreview: (id: string) => ["cfo", "clients", "history", id] as const,
  },
};
