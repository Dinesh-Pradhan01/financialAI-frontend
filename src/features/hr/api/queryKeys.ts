export const hrKeys = {
  dashboard: {
    employee: () => ["hr", "dashboard", "employee"] as const,
    vendor: () => ["hr", "dashboard", "vendor"] as const,
    history: () => ["hr", "dashboard", "history"] as const,
    preview: (id: string) => ["hr", "dashboard", "history", id] as const,
  },
  employees: {
    all: (params?: object) => ["hr", "employees", params] as const,
    byId: (id: string) => ["hr", "employees", id] as const,
  },
  vendors: {
    all: (params?: object) => ["hr", "vendors", params] as const,
  },
};
