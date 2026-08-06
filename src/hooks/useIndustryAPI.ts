import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface SectorCompany {
  s_no: number;
  name: string;
  url: string;
  cmp_rs: number;
  pe: number;
  market_cap_cr: number;
  div_yield_pct: number;
  net_profit_qtr_cr: number;
  qtr_profit_var_pct: number;
  sales_qtr_cr: number;
  qtr_sales_var_pct: number;
  roce_pct: number;
  full_name: string;
  nse_symbol: string;
  bse_code: string;
  employee_count: number;
  revenue_per_employee: number;
  quarterly_financials: {
    quarter: string;
    revenue: number;
    expenditure: number;
    profit: number;
    operating_profit: number;
  }[];
  bse_url: string;
}

export interface MSMEQuarterlyFinancial {
  quarter: string;
  revenue: number;
  expenditure: number;
  profit: number;
}

export interface MSMEData {
  company_name: string;
  employee_count: number;
  revenue_per_employee: number;
  quarterly_financials: MSMEQuarterlyFinancial[];
}

export interface SectorAverageFinancial {
  quarter: string;
  revenue: number;
  expenditure: number;
  profit: number;
}

export interface GrowthTrendPoint {
  quarter_label: string;
  quarter_name: string;
  revenue_growth: number;
  profit_growth: number;
  expenditure_growth: number;
}

export interface SectorDataResponse {
  sector_name: string;
  companies: SectorCompany[];
  msme_data: MSMEData;
  top_5_avg_financials: SectorAverageFinancial[];
  peer_growth_trends: GrowthTrendPoint[];
  msme_growth_trends: GrowthTrendPoint[];
}

export type StockPriceData = Record<string, Record<string, number>>;

export const sectorQueryOptions = (sectorName: string) =>
  queryOptions({
    queryKey: ["industry", "sector", sectorName],
    queryFn: () => api.get<SectorDataResponse>(`/api/v1/sectors/${sectorName}`),
    staleTime: 5 * 60 * 1000,
  });

export const top5StocksQueryOptions = () =>
  queryOptions({
    queryKey: ["industry", "stocks", "top5"],
    queryFn: () => api.get<StockPriceData>("/api/v1/stocks/top5"),
    staleTime: 5 * 60 * 1000,
  });
