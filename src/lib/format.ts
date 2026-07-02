// Indian number formatting helpers — ₹1,23,456 grouping.

export function formatINR(value: number, opts: { compact?: boolean; sign?: boolean } = {}): string {
  const { compact = false, sign = false } = opts;
  const abs = Math.abs(value);
  let body: string;
  if (compact) {
    if (abs >= 1_00_00_000)
      body = `${(abs / 1_00_00_000).toFixed(abs >= 1_00_00_00_000 ? 0 : 2).replace(/\.00$/, "")} Cr`;
    else if (abs >= 1_00_000)
      body = `${(abs / 1_00_000).toFixed(abs >= 10_00_000 ? 0 : 1).replace(/\.0$/, "")} L`;
    else if (abs >= 1_000) body = `${(abs / 1_000).toFixed(0)}k`;
    else body = `${abs}`;
  } else {
    body = new Intl.NumberFormat("en-IN").format(Math.round(abs));
  }
  const prefix = value < 0 ? "-₹" : sign ? "+₹" : "₹";
  return `${prefix}${body}`;
}

export function formatPct(value: number, digits = 0): string {
  return `${value.toFixed(digits)}%`;
}
