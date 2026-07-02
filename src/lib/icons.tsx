// Central icon registry — replaces inconsistent emoji with a consistent
// lucide icon set, each paired with a colour token so icons read as
// branded "chips" rather than OS-dependent glyphs.

import {
  Plane,
  Fuel,
  UtensilsCrossed,
  ShoppingCart,
  ShoppingBag,
  Clapperboard,
  TrainFront,
  Landmark,
  CreditCard,
  Home,
  TrendingUp,
  Receipt,
  ShieldPlus,
  Banknote,
  PartyPopper,
  Luggage,
  MessageCircle,
  Bell,
  Mail,
  MessageSquare,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface IconDef {
  icon: LucideIcon;
  color: string; // css var
}

const REG: Record<string, IconDef> = {
  // categories (keyed by category id)
  airlines: { icon: Plane, color: "var(--severity-low)" },
  fuel: { icon: Fuel, color: "var(--severity-moderate)" },
  restaurant: { icon: UtensilsCrossed, color: "var(--severity-high)" },
  grocery: { icon: ShoppingCart, color: "var(--success)" },
  lifestyle: { icon: ShoppingBag, color: "var(--brand-secondary)" },
  movies: { icon: Clapperboard, color: "var(--brand-primary)" },
  rail: { icon: TrainFront, color: "var(--brand-primary-hi)" },

  // products / triggers
  fd: { icon: Landmark, color: "var(--brand-primary)" },
  card: { icon: CreditCard, color: "var(--brand-secondary)" },
  "travel-card": { icon: CreditCard, color: "var(--brand-secondary)" },
  home: { icon: Home, color: "var(--severity-low)" },
  "home-loan": { icon: Home, color: "var(--severity-low)" },
  sip: { icon: TrendingUp, color: "var(--success)" },
  tax: { icon: Receipt, color: "var(--severity-moderate)" },
  insurance: { icon: ShieldPlus, color: "var(--severity-low)" },
  ploan: { icon: Banknote, color: "var(--text-secondary)" },
  promotion: { icon: PartyPopper, color: "var(--brand-secondary)" },
  travel: { icon: Plane, color: "var(--severity-low)" },

  // channels
  whatsapp: { icon: MessageCircle, color: "var(--success)" },
  app: { icon: Bell, color: "var(--brand-primary)" },
  email: { icon: Mail, color: "var(--severity-low)" },
  sms: { icon: MessageSquare, color: "var(--brand-secondary)" },

  // personas
  spender: { icon: ShoppingBag, color: "var(--brand-secondary)" },
  traveller: { icon: Luggage, color: "var(--severity-low)" },
  movie: { icon: Clapperboard, color: "var(--brand-primary)" },
  investor: { icon: TrendingUp, color: "var(--success)" },
};

const FALLBACK: IconDef = { icon: Sparkles, color: "var(--brand-primary)" };

export function iconFor(key: string): IconDef {
  return REG[key] ?? FALLBACK;
}

export function channelKey(label: string): string {
  const l = label.toLowerCase();
  if (l.includes("whats")) return "whatsapp";
  if (l.includes("mail")) return "email";
  if (l.includes("sms")) return "sms";
  return "app";
}

type ChipSize = "sm" | "md" | "lg";
const sizeMap: Record<ChipSize, { box: string; icon: number }> = {
  sm: { box: "h-7 w-7 rounded-lg", icon: 15 },
  md: { box: "h-9 w-9 rounded-xl", icon: 18 },
  lg: { box: "h-12 w-12 rounded-2xl", icon: 22 },
};

/** A tinted rounded square containing the registry icon for `keyName`. */
export function IconChip({
  keyName,
  size = "md",
  className,
}: {
  keyName: string;
  size?: ChipSize;
  className?: string;
}) {
  const { icon: Icon, color } = iconFor(keyName);
  const s = sizeMap[size];
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center", s.box, className)}
      style={{ backgroundColor: `color-mix(in oklch, ${color} 14%, transparent)`, color }}
    >
      <Icon width={s.icon} height={s.icon} strokeWidth={2.1} />
    </span>
  );
}

/** Bare icon (no chip background) in the registry colour. */
export function PlainIcon({
  keyName,
  size = 18,
  className,
}: {
  keyName: string;
  size?: number;
  className?: string;
}) {
  const { icon: Icon, color } = iconFor(keyName);
  return (
    <Icon width={size} height={size} strokeWidth={2.1} className={className} style={{ color }} />
  );
}
