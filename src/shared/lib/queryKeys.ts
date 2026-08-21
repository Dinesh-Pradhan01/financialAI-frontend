export const queryKeys = {
  auth: {
    me: () => ["auth", "me"] as const,
    invites: () => ["auth", "invites"] as const,
    inviteVerify: (token: string) => ["auth", "invite", "verify", token] as const,
  },
  business: {
    invites: () => ["business", "invites"] as const,
  },
  company: {
    all: () => ["company"] as const,
    profile: () => ["company", "profile"] as const,
    industryLeaders: () => ["company", "industry-leaders"] as const,
    rating: () => ["company", "rating"] as const,
    news: () => ["company", "news"] as const,
    aiView: () => ["company", "ai-view"] as const,
    documents: () => ["company", "documents"] as const,
  },
  statements: {
    all: () => ["statements"] as const,
    byId: (id: string) => ["statements", id] as const,
  },
} as const;
