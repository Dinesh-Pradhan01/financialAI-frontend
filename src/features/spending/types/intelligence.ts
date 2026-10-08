/**
 * Financial Intelligence Types & Contracts
 * Mirrors backend models from financialAI-backend/app/api/spending/schemas.py
 */

export interface ExecutiveScorecardItem {
  analytical_module: string;
  key_indicator: string;
  current_value: string;
  assessment: string;
}

export interface HeaderMetadataResponse {
  bank_name: string;
  account_holder_name: string;
  account_number: string;
  account_type: string;
  ifsc_code_branch: string;
  statement_coverage_period: string;
  opening_balance: number;
  closing_balance: number;
}

export interface MonthlyCashFlowRow {
  month: string;
  inflow_credits: number;
  outflow_debits: number;
  net_cash_flow: number;
  ending_balance: number;
  outflow_burn_rate: number;
}

export interface LiquidityDiagnostics {
  avg_monthly_outflow_burn: number;
  cash_runway_months: number;
  liquidity_buffer_ratio: number;
  safety_reserve_3_month: number;
  idle_cash_available: number;
  cash_conversion_retention_pct: number;
}

export interface MacroCashFlowResponse {
  monthly_cash_flow_trajectory: MonthlyCashFlowRow[];
  liquidity_diagnostics: LiquidityDiagnostics;
}

export interface DayRangeDistribution {
  day_range: string;
  cumulative_inflows: number;
  cumulative_outflows: number;
  dominant_activity: string;
}

export interface MonthEndLiquidityDip {
  month: string;
  disbursement_day: string;
  pre_payout_balance: number;
  post_payout_balance: number;
  instant_liquidity_dip: number;
}

export interface DayOfWeekSpend {
  day_of_week: string;
  spend_volume: number;
  outflow_share_pct: number;
}

export interface TemporalPatternsResponse {
  day_of_month_distribution: DayRangeDistribution[];
  month_end_liquidity_dips: MonthEndLiquidityDip[];
  day_of_week_spend: DayOfWeekSpend[];
}

export interface ChannelDistributionItem {
  payment_channel: string;
  description: string;
  transaction_count: number;
  total_volume: number;
  share_of_outflows_pct: number;
}

export interface ChannelDistributionResponse {
  channels: ChannelDistributionItem[];
  total_transactions: number;
  total_volume: number;
}

export interface StatisticalOutlierItem {
  transaction_date: string;
  domain_category: string;
  narration_snippet: string;
  amount: number;
  category_average_spend: number;
  z_score: string;
  assessment: string;
}

export interface DuplicateTransactionItem {
  transaction_date: string;
  amount: number;
  narration: string;
  reference_number?: string | null;
  duplicate_count: number;
}

export interface AnomalyRiskResponse {
  statistical_outliers: StatisticalOutlierItem[];
  duplicate_transactions: DuplicateTransactionItem[];
  total_outliers_found: number;
  total_duplicates_found: number;
}

export interface OperationalEfficiencyRatios {
  inflow_to_outflow_ratio: number;
  cost_to_income_ratio_pct: number;
  net_cash_margin_proxy_pct: number;
}

export interface ProjectionsAndRunRates {
  annualized_inflow_run_rate: number;
  annualized_outflow_run_rate: number;
  projected_next_month_ending_balance: number;
}

export interface EfficiencyProjectionsResponse {
  operational_efficiency: OperationalEfficiencyRatios;
  projections: ProjectionsAndRunRates;
}

export interface SpendingFullReport {
  company_name: string;
  period: string;
  total_transactions_analyzed: number;
  executive_summary: ExecutiveScorecardItem[];
  section_1_header_metadata: HeaderMetadataResponse;
  section_2_macro_cash_flow: MacroCashFlowResponse;
  section_3_temporal_patterns: TemporalPatternsResponse;
  section_4_channel_distribution: ChannelDistributionResponse;
  section_5_anomaly_risk: AnomalyRiskResponse;
  section_6_efficiency_projections: EfficiencyProjectionsResponse;
}
