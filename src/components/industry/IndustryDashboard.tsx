import { useState, useRef, useMemo } from "react";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { sectorQueryOptions, top5StocksQueryOptions, basicIndustriesQueryOptions } from "@/shared/hooks/useIndustryAPI";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import {
  Treemap,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  LineChart,
  Line,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { TrendingUp, TrendingDown, Building2, Users, ArrowUpRight, Download, SlidersHorizontal } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { formatINR } from "@/shared/lib/format";

const TREEMAP_COLORS = ["#1E2A7A", "#6D28D9", "#8B5CF6", "#A78BFA", "#EC4899", "#F43F5E", "#0EA5E9", "#10B981"];
const STOCK_COLORS = ["#1E2A7A", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"];

// Custom Treemap Cell Renderer
const CustomTreemapContent = (props: any) => {
  const { x, y, width, height, index, name, market_cap_cr } = props;
  if (width <= 0 || height <= 0) return null;
  const color = TREEMAP_COLORS[(index || 0) % TREEMAP_COLORS.length];
  const textColor = "#FFFFFF";
  
  // Dynamically calculate font size and name truncation based on cell width
  const nameFontSize = Math.min(13, Math.max(9, Math.floor(width / 10)));
  const capFontSize = nameFontSize - 1.5;
  const maxChars = Math.max(5, Math.floor(width / (nameFontSize * 0.6)));
  
  const safeName = name || "";
  const displayName = safeName.length > maxChars ? `${safeName.substring(0, maxChars - 2)}..` : safeName;
  const capVal = market_cap_cr || 0;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: color,
          stroke: "#fff",
          strokeWidth: 2,
          strokeOpacity: 1,
        }}
        rx={4}
      />
      {width > 60 && height > 40 && (
        <text
          x={x + width / 2}
          y={y + height / 2 - 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={textColor}
          fontSize={nameFontSize}
          fontWeight={600}
          stroke="none"
          style={{
            fontFamily: "Inter, sans-serif",
            pointerEvents: "none"
          }}
        >
          {displayName}
          <tspan 
            x={x + width / 2} 
            dy={nameFontSize + 2} 
            fontSize={capFontSize} 
            fontWeight="500"
            fill="rgba(255,255,255,0.9)"
            stroke="none"
          >
            ₹{capVal >= 1000 ? `${(capVal / 1000).toFixed(1)}K` : capVal}Cr
          </tspan>
        </text>
      )}
    </g>
  );
};

// Custom Scatter/Bubble Tooltip
const BubbleTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border border-border/80 p-3 rounded-lg shadow-lg text-xs space-y-1 font-sans">
        <p className="font-bold text-text-primary">{data.name}</p>
        <p><span className="text-text-secondary font-medium">Total Revenue:</span> ₹{data.revenue.toFixed(1)}Cr</p>
        <p><span className="text-text-secondary font-medium">Employees:</span> {data.employeeCount.toLocaleString()}</p>
        <p><span className="text-text-secondary font-medium">Rev / Employee:</span> {formatINR(data.revenuePerEmployee, { compact: true })}</p>
        {data.expRatio !== undefined && (
          <p><span className="text-text-secondary font-medium">Exp / Rev Ratio:</span> {data.expRatio.toFixed(1)}%</p>
        )}
        {data.profitMargin !== undefined && (
          <p><span className="text-text-secondary font-medium">Profit Margin:</span> {data.profitMargin.toFixed(1)}%</p>
        )}
      </div>
    );
  }
  return null;
};

export function IndustryDashboard() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/_app/industry" });
  const sectorName = search?.sector_name || "Diversified FMCG";

  const { data: basicIndustries = [] } = useQuery(basicIndustriesQueryOptions());
  const { data: sectorData } = useQuery(sectorQueryOptions(sectorName));
  const { data: stockData } = useQuery(top5StocksQueryOptions(sectorName));

  const handleSectorChange = (value: string) => {
    navigate({
      search: { sector_name: value },
    });
  };

  // Safe destructuring of API response data
  const companies = sectorData?.companies || [];
  const msme = sectorData?.msme_data;
  const quartersData = sectorData?.top_5_avg_financials || [];
  const peerGrowth = sectorData?.peer_growth_trends || [];
  const msmeGrowth = sectorData?.msme_growth_trends || [];

  // Dynamic metrics calculation for KPIs (Your MSME vs. Peer Average)
  const msme_fin = msme?.quarterly_financials || [];
  
  // 1. Revenue Growth QoQ average
  const avgMsmeRevGrowth = msmeGrowth && msmeGrowth.length > 0
    ? msmeGrowth.reduce((sum, item) => sum + item.revenue_growth, 0) / msmeGrowth.length
    : 0;
  const avgPeerRevGrowth = peerGrowth && peerGrowth.length > 0
    ? peerGrowth.reduce((sum, item) => sum + item.revenue_growth, 0) / peerGrowth.length
    : 0;

  // 2. Profit Growth QoQ average
  const avgMsmeProfitGrowth = msmeGrowth && msmeGrowth.length > 0
    ? msmeGrowth.reduce((sum, item) => sum + item.profit_growth, 0) / msmeGrowth.length
    : 0;
  const avgPeerProfitGrowth = peerGrowth && peerGrowth.length > 0
    ? peerGrowth.reduce((sum, item) => sum + item.profit_growth, 0) / peerGrowth.length
    : 0;

  // 3. Expenditure Growth QoQ average
  const avgMsmeExpGrowth = msmeGrowth && msmeGrowth.length > 0
    ? msmeGrowth.reduce((sum, item) => sum + item.expenditure_growth, 0) / msmeGrowth.length
    : 0;
  const avgPeerExpGrowth = peerGrowth && peerGrowth.length > 0
    ? peerGrowth.reduce((sum, item) => sum + item.expenditure_growth, 0) / peerGrowth.length
    : 0;

  // 4. Revenue per Employee
  const msmeRevPerEmp = msme?.revenue_per_employee || 0;
  const peerRevPerEmpList = companies.map(c => c.revenue_per_employee).filter(v => v > 0);
  const avgPeerRevPerEmp = peerRevPerEmpList.length > 0
    ? peerRevPerEmpList.reduce((sum, v) => sum + v, 0) / peerRevPerEmpList.length
    : 0;

  // 5. Exp/Rev Ratio
  const msmeTotalRev = msme_fin.reduce((sum, q) => sum + q.revenue, 0);
  const msmeTotalExp = msme_fin.reduce((sum, q) => sum + q.expenditure, 0);
  const msmeExpRevRatio = msmeTotalRev > 0 ? (msmeTotalExp / msmeTotalRev) * 100 : 0;

  const peerExpRevRatioList = companies.map(c => {
    const q_fin = c.quarterly_financials || [];
    const rev = q_fin.reduce((sum, q) => sum + q.revenue, 0);
    const exp = q_fin.reduce((sum, q) => sum + q.expenditure, 0);
    return rev > 0 ? (exp / rev) * 100 : 0;
  }).filter(v => v > 0);
  const avgPeerExpRevRatio = peerExpRevRatioList.length > 0
    ? peerExpRevRatioList.reduce((sum, v) => sum + v, 0) / peerExpRevRatioList.length
    : 0;

  // 6. Profit Margin %
  const msmeTotalProf = msme_fin.reduce((sum, q) => sum + q.profit, 0);
  const msmeProfitMargin = msmeTotalRev > 0 ? (msmeTotalProf / msmeTotalRev) * 100 : 0;

  const peerProfitMarginList = companies.map(c => {
    const q_fin = c.quarterly_financials || [];
    const rev = q_fin.reduce((sum, q) => sum + q.revenue, 0);
    const prof = q_fin.reduce((sum, q) => sum + q.profit, 0);
    return rev > 0 ? (prof / rev) * 100 : 0;
  }).filter(v => v > 0);
  const avgPeerProfitMargin = peerProfitMarginList.length > 0
    ? peerProfitMarginList.reduce((sum, v) => sum + v, 0) / peerProfitMarginList.length
    : 0;

  // Sort companies by market cap for listing
  const sortedCompanies = useMemo(() => {
    return [...companies].sort((a, b) => (b.market_cap_cr || 0) - (a.market_cap_cr || 0));
  }, [companies]);

  // Combine trend data for chart
  const lineChartData = useMemo(() => {
    return peerGrowth.map((peerItem, idx) => {
      const msmeItem = msmeGrowth[idx] || {};
      return {
        quarter: peerItem.quarter_label,
        quarterName: peerItem.quarter_name,
        peerRevenue: peerItem.revenue_growth,
        msmeRevenue: msmeItem.revenue_growth || 0,
        peerProfit: peerItem.profit_growth,
        msmeProfit: msmeItem.profit_growth || 0,
        peerExpenditure: peerItem.expenditure_growth,
        msmeExpenditure: msmeItem.expenditure_growth || 0,
      };
    });
  }, [peerGrowth, msmeGrowth]);

  // Bubble chart dataset mapping
  const bubbleChartData = useMemo(() => {
    const peers = companies.map(c => {
      const q_fin = c.quarterly_financials || [];
      const totalRev = q_fin.reduce((sum, q) => sum + q.revenue, 0);
      const totalExp = q_fin.reduce((sum, q) => sum + q.expenditure, 0);
      const totalProf = q_fin.reduce((sum, q) => sum + q.profit, 0);
      const expRatio = totalRev > 0 ? (totalExp / totalRev) * 100 : 0;
      const profitMargin = totalRev > 0 ? (totalProf / totalRev) * 100 : 0;
      return {
        name: c.name,
        marketCap: c.market_cap_cr || 0,
        employeeCount: c.employee_count || 10000,
        revenuePerEmployee: c.revenue_per_employee || 0,
        revenue: totalRev,
        expRatio,
        profitMargin,
        isMsme: false,
      };
    });

    const msmeObj = {
      name: "Your MSME",
      marketCap: 200, // Small positive cap weight so bubble renders distinct
      employeeCount: msme?.employee_count || 10000,
      revenuePerEmployee: msme?.revenue_per_employee || 0,
      revenue: msmeTotalRev,
      expRatio: msmeExpRevRatio,
      profitMargin: msmeProfitMargin,
      isMsme: true,
    };

    return { peers, msme: [msmeObj] };
  }, [companies, msme, msmeTotalRev, msmeExpRevRatio, msmeProfitMargin]);

  // Market cap Treemap dataset mapping
  const treemapData = useMemo(() => {
    return sortedCompanies.slice(0, 10).map(c => {
      const rawCap = c.market_cap_cr || 0;
      // Apply power scaling (power of 0.35) so that smaller companies remain
      // visible and are not squeezed, while preserving the visual ranking hierarchy.
      const scaledSize = rawCap > 0 ? Math.pow(rawCap, 0.35) : 0.1;
      return {
        name: c.name,
        size: scaledSize,
        market_cap_cr: rawCap,
      };
    });
  }, [sortedCompanies]);

  // Historical Stock trend dataset mapping
  const stockChartData = useMemo(() => {
    if (!stockData) return [];
    const dates = Object.keys(stockData).sort();
    if (dates.length === 0) return [];
    
    // Sample ~10 dates evenly to prevent label clutter
    const step = Math.max(1, Math.floor(dates.length / 10));
    const sampledDates = dates.filter((_, idx) => idx % step === 0);

    return sampledDates.map(date => {
      const prices = stockData[date] || {};
      return {
        date,
        ...prices,
      };
    });
  }, [stockData]);

  // Extract stock tickers for line rendering
  const stockTickers = useMemo(() => {
    if (!stockData) return [];
    const dates = Object.keys(stockData);
    if (dates.length === 0) return [];
    return Object.keys(stockData[dates[0]] || {});
  }, [stockData]);

  return (
    <div className="px-5 py-6 md:px-10 space-y-8 pb-16">
      {/* Header section with Select Dropdown & Action Buttons */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary flex items-center gap-2">
            <Building2 className="h-6 w-6 text-brand" /> Industry Analysis & Benchmarking
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Compare your financial performance metrics with the top 10 market cap peer leaders.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select value={sectorName} onValueChange={handleSectorChange}>
            <SelectTrigger className="w-[280px] bg-surface border-border shadow-sm rounded-lg text-sm font-medium">
              <SelectValue placeholder="Select Sector" />
            </SelectTrigger>
            <SelectContent>
              {basicIndustries.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="shadow-sm bg-surface rounded-lg">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" className="shadow-sm bg-surface rounded-lg">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* KPI Cards Layout (Tailwind Grid) */}
      <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-5">
        {/* KPI 1: Revenue Growth */}
        <Card className="border-border/60 shadow-sm bg-surface rounded-2xl">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div>
              <p className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                Avg. Revenue Growth %
              </p>
              <h3 className="text-2xl font-extrabold font-num text-[#0F172A] mt-1.5">
                {avgPeerRevGrowth >= 0 ? "+" : ""}{avgPeerRevGrowth.toFixed(1)}%
              </h3>
            </div>
            <div className={cn(
              "flex items-center gap-1 mt-2.5 text-xs font-semibold",
              avgMsmeRevGrowth >= avgPeerRevGrowth ? "text-success" : "text-amber-500"
            )}>
              {avgMsmeRevGrowth >= avgPeerRevGrowth ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              vs. {avgMsmeRevGrowth >= 0 ? "+" : ""}{avgMsmeRevGrowth.toFixed(1)}% MSME
            </div>
          </CardContent>
        </Card>

        {/* KPI 2: Profit Growth */}
        <Card className="border-border/60 shadow-sm bg-surface rounded-2xl">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div>
              <p className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                Avg. Profit Growth %
              </p>
              <h3 className="text-2xl font-extrabold font-num text-[#0F172A] mt-1.5">
                {avgPeerProfitGrowth >= 0 ? "+" : ""}{avgPeerProfitGrowth.toFixed(1)}%
              </h3>
            </div>
            <div className={cn(
              "flex items-center gap-1 mt-2.5 text-xs font-semibold",
              avgMsmeProfitGrowth >= avgPeerProfitGrowth ? "text-success" : "text-amber-500"
            )}>
              {avgMsmeProfitGrowth >= avgPeerProfitGrowth ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              vs. {avgMsmeProfitGrowth >= 0 ? "+" : ""}{avgMsmeProfitGrowth.toFixed(1)}% MSME
            </div>
          </CardContent>
        </Card>

        {/* KPI 3: Expenditure Growth */}
        <Card className="border-border/60 shadow-sm bg-surface rounded-2xl">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div>
              <p className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                Avg. Expenditure Growth %
              </p>
              <h3 className="text-2xl font-extrabold font-num text-[#0F172A] mt-1.5">
                {avgPeerExpGrowth >= 0 ? "+" : ""}{avgPeerExpGrowth.toFixed(1)}%
              </h3>
            </div>
            <div className={cn(
              "flex items-center gap-1 mt-2.5 text-xs font-semibold",
              avgMsmeExpGrowth <= avgPeerExpGrowth ? "text-success" : "text-amber-500"
            )}>
              {avgMsmeExpGrowth <= avgPeerExpGrowth ? (
                <TrendingDown className="h-3 w-3" />
              ) : (
                <TrendingUp className="h-3 w-3" />
              )}
              vs. {avgMsmeExpGrowth >= 0 ? "+" : ""}{avgMsmeExpGrowth.toFixed(1)}% MSME
            </div>
          </CardContent>
        </Card>

        {/* KPI 4: Rev Per Employee */}
        <Card className="border-border/60 shadow-sm bg-surface rounded-2xl">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div>
              <p className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                Avg. Rev Per Employee
              </p>
              <h3 className="text-2xl font-extrabold font-num text-[#0F172A] mt-1.5">
                ₹{avgPeerRevPerEmp >= 10000000 ? `${(avgPeerRevPerEmp / 10000000).toFixed(1)}Cr` : `${(avgPeerRevPerEmp / 100000).toFixed(1)}L`}
              </h3>
            </div>
            <div className={cn(
              "flex items-center gap-1 mt-2.5 text-xs font-semibold",
              msmeRevPerEmp >= avgPeerRevPerEmp ? "text-success" : "text-amber-500"
            )}>
              {msmeRevPerEmp >= avgPeerRevPerEmp ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              vs. ₹{msmeRevPerEmp >= 100000 ? `${(msmeRevPerEmp / 100000).toFixed(1)}L` : `${(msmeRevPerEmp / 1000).toFixed(0)}K`} MSME
            </div>
          </CardContent>
        </Card>

        {/* KPI 5: Exp/Rev Ratio */}
        <Card className="border-border/60 shadow-sm bg-surface rounded-2xl">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div>
              <p className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                Avg. Exp/Rev Ratio
              </p>
              <h3 className="text-2xl font-extrabold font-num text-[#0F172A] mt-1.5">
                {avgPeerExpRevRatio.toFixed(1)}%
              </h3>
            </div>
            <div className={cn(
              "flex items-center gap-1 mt-2.5 text-xs font-semibold",
              msmeExpRevRatio <= avgPeerExpRevRatio ? "text-success" : "text-amber-500"
            )}>
              {msmeExpRevRatio <= avgPeerExpRevRatio ? (
                <TrendingDown className="h-3 w-3" />
              ) : (
                <TrendingUp className="h-3 w-3" />
              )}
              vs. {msmeExpRevRatio.toFixed(1)}% MSME
            </div>
          </CardContent>
        </Card>

        {/* KPI 6: Profit Margin */}
        <Card className="border-border/60 shadow-sm bg-surface rounded-2xl">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div>
              <p className="text-[10px] font-bold tracking-wider text-text-secondary uppercase">
                Avg. Profit Margin %
              </p>
              <h3 className="text-2xl font-extrabold font-num text-[#0F172A] mt-1.5">
                {avgPeerProfitMargin.toFixed(1)}%
              </h3>
            </div>
            <div className={cn(
              "flex items-center gap-1 mt-2.5 text-xs font-semibold",
              msmeProfitMargin >= avgPeerProfitMargin ? "text-success" : "text-amber-500"
            )}>
              {msmeProfitMargin >= avgPeerProfitMargin ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              vs. {msmeProfitMargin.toFixed(1)}% MSME
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Row 1 Charts: Treemap (Full Width) */}
      <Card className="border-border/60 shadow-sm bg-surface rounded-2xl p-5">
        <div className="mb-4">
          <h2 className="text-sm font-bold text-text-primary">Market Concentration</h2>
          <p className="text-xs text-text-secondary mt-0.5">Top competitors' market share distribution by market cap (₹ Cr).</p>
        </div>
        <div className="h-[390px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={treemapData}
              dataKey="size"
              stroke="#fff"
              fill="#1E2A7A"
              content={<CustomTreemapContent />}
            />
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Row 2 Charts: QoQ Growth trends (Three side-by-side charts) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Growth line chart */}
        <Card className="border-border/60 shadow-sm bg-surface rounded-2xl p-5">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-text-primary">Revenue Growth QoQ Trend</h2>
            <p className="text-xs text-text-secondary mt-0.5">Your MSME vs. Top 5 Average.</p>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ left: 5, right: 5, top: 10, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/40" />
                <XAxis
                  dataKey="quarter"
                  line={false}
                  tickLine={false}
                  tickMargin={8}
                  className="fill-text-secondary text-[10px]"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  unit="%"
                  className="fill-text-secondary text-[10px]"
                />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                <Line
                  type="monotone"
                  dataKey="msmeRevenue"
                  name="Your MSME"
                  stroke="#1E2A7A"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="peerRevenue"
                  name="Top 5 Average"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Profit Growth line chart */}
        <Card className="border-border/60 shadow-sm bg-surface rounded-2xl p-5">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-text-primary">Profit Growth QoQ Trend</h2>
            <p className="text-xs text-text-secondary mt-0.5">Your MSME vs. Top 5 Average.</p>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ left: 5, right: 5, top: 10, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/40" />
                <XAxis
                  dataKey="quarter"
                  line={false}
                  tickLine={false}
                  tickMargin={8}
                  className="fill-text-secondary text-[10px]"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  unit="%"
                  className="fill-text-secondary text-[10px]"
                />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                <Line
                  type="monotone"
                  dataKey="msmeProfit"
                  name="Your MSME"
                  stroke="#1E2A7A"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="peerProfit"
                  name="Top 5 Average"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Expenditure Growth line chart */}
        <Card className="border-border/60 shadow-sm bg-surface rounded-2xl p-5">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-text-primary">Expenditure Growth QoQ Trend</h2>
            <p className="text-xs text-text-secondary mt-0.5">Your MSME vs. Top 5 Average.</p>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ left: 5, right: 5, top: 10, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/40" />
                <XAxis
                  dataKey="quarter"
                  line={false}
                  tickLine={false}
                  tickMargin={8}
                  className="fill-text-secondary text-[10px]"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  unit="%"
                  className="fill-text-secondary text-[10px]"
                />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                <Line
                  type="monotone"
                  dataKey="msmeExpenditure"
                  name="Your MSME"
                  stroke="#1E2A7A"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="peerExpenditure"
                  name="Top 5 Average"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      {/* Row 3 Charts: Efficiency Bubble charts (Three side-by-side Scatter/Bubble charts) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue per Employee bubble chart */}
        <Card className="border-border/60 shadow-sm bg-surface rounded-2xl p-5">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-text-primary">Revenue Per Employee</h2>
            <p className="text-xs text-text-secondary mt-0.5">X: Employees | Y: Rev/Employee | Size: Market Cap</p>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ left: 5, right: 5, top: 10, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/40" />
                <XAxis
                  type="number"
                  dataKey="employeeCount"
                  name="Employees"
                  domain={[0, 15000]}
                  line={false}
                  tickLine={false}
                  tickMargin={8}
                  className="fill-text-secondary text-[10px]"
                />
                <YAxis
                  type="number"
                  dataKey="revenuePerEmployee"
                  name="Rev/Employee"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="fill-text-secondary text-[10px]"
                  tickFormatter={(v) => v >= 100000 ? `₹${(v / 100000).toFixed(0)}L` : `₹${(v / 1000).toFixed(0)}K`}
                />
                <ZAxis dataKey="marketCap" range={[100, 800]} />
                <Tooltip content={<BubbleTooltip />} cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Peers" data={bubbleChartData.peers} fill="#A78BFA" opacity={0.7} />
                <Scatter name="Your MSME" data={bubbleChartData.msme} fill="#1E2A7A" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Exp/Rev ratio bubble chart */}
        <Card className="border-border/60 shadow-sm bg-surface rounded-2xl p-5">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-text-primary">Expenditure / Revenue Ratio</h2>
            <p className="text-xs text-text-secondary mt-0.5">X: Total Revenue | Y: Ratio | Size: Market Cap</p>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ left: 5, right: 5, top: 10, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/40" />
                <XAxis
                  type="number"
                  dataKey="revenue"
                  name="Revenue"
                  line={false}
                  tickLine={false}
                  tickMargin={8}
                  className="fill-text-secondary text-[10px]"
                  tickFormatter={(v) => `₹${v.toFixed(0)}Cr`}
                />
                <YAxis
                  type="number"
                  dataKey="expRatio"
                  name="Exp/Rev Ratio"
                  domain={[0, 100]}
                  unit="%"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="fill-text-secondary text-[10px]"
                />
                <ZAxis dataKey="marketCap" range={[100, 800]} />
                <Tooltip content={<BubbleTooltip />} cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Peers" data={bubbleChartData.peers} fill="#EF4444" opacity={0.7} />
                <Scatter name="Your MSME" data={bubbleChartData.msme} fill="#1E2A7A" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Profit Margin bubble chart */}
        <Card className="border-border/60 shadow-sm bg-surface rounded-2xl p-5">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-text-primary">Profit / Revenue Margin</h2>
            <p className="text-xs text-text-secondary mt-0.5">X: Total Revenue | Y: Margin | Size: Market Cap</p>
          </div>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ left: 5, right: 5, top: 10, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/40" />
                <XAxis
                  type="number"
                  dataKey="revenue"
                  name="Revenue"
                  line={false}
                  tickLine={false}
                  tickMargin={8}
                  className="fill-text-secondary text-[10px]"
                  tickFormatter={(v) => `₹${v.toFixed(0)}Cr`}
                />
                <YAxis
                  type="number"
                  dataKey="profitMargin"
                  name="Profit Margin"
                  domain={[0, 50]}
                  unit="%"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="fill-text-secondary text-[10px]"
                />
                <ZAxis dataKey="marketCap" range={[100, 800]} />
                <Tooltip content={<BubbleTooltip />} cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Peers" data={bubbleChartData.peers} fill="#8B5CF6" opacity={0.7} />
                <Scatter name="Your MSME" data={bubbleChartData.msme} fill="#1E2A7A" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      {/* Row 4 Charts: Sector Trend Analysis & Top 5 Stock Price Trends (Side-by-Side) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Trend Analysis */}
        <Card className="border-border/60 shadow-sm bg-surface rounded-2xl p-6">
          <div className="mb-6">
            <h2 className="text-base font-bold text-text-primary">Sector Trend Analysis</h2>
            <p className="text-xs text-text-secondary mt-0.5">Aggregated peer performance growth trends tracking over the quarters.</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/40" />
                <XAxis
                  dataKey="quarter"
                  line={false}
                  tickLine={false}
                  tickMargin={10}
                  className="fill-text-secondary text-[11px]"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  unit="%"
                  className="fill-text-secondary text-[11px]"
                />
                <Tooltip />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Line
                  type="monotone"
                  dataKey="peerRevenue"
                  name="Revenue Growth"
                  stroke="#1E2A7A"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="peerProfit"
                  name="Profit Growth"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="peerExpenditure"
                  name="Expenditure Growth"
                  stroke="#EF4444"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top 5 Stock Price Trends */}
        <Card className="border-border/60 shadow-sm bg-surface rounded-2xl p-6">
          <div className="mb-6">
            <h2 className="text-base font-bold text-text-primary">Top 5 Companies Share Value Trend</h2>
            <p className="text-xs text-text-secondary mt-0.5">Historical stock price index over time.</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stockChartData} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/40" />
                <XAxis
                  dataKey="date"
                  line={false}
                  tickLine={false}
                  tickMargin={10}
                  className="fill-text-secondary text-[10px]"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  className="fill-text-secondary text-[10px]"
                />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                {stockTickers.map((ticker, idx) => (
                  <Line
                    key={ticker}
                    type="monotone"
                    dataKey={ticker}
                    stroke={STOCK_COLORS[idx % STOCK_COLORS.length]}
                    dot={false}
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      {/* Peer Directory Section */}
      <Card className="border-border/60 shadow-sm bg-surface rounded-2xl">
        <CardHeader className="px-6 py-5 flex flex-row items-center justify-between gap-4 border-b border-border/40">
          <div>
            <CardTitle className="text-base font-bold text-text-primary">Sector Peer Directory</CardTitle>
            <p className="text-xs text-text-secondary mt-0.5">
              Comprehensive list of peer companies in the {sectorName} sector.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-alt border border-border/80 text-text-secondary flex items-center gap-1">
            <Users className="h-3 w-3" /> {sortedCompanies.length} peers listed
          </span>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-surface-alt/40">
                <TableRow>
                  <TableHead className="w-[80px] pl-6">Rank</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead className="text-right">Market Cap (₹ Cr)</TableHead>
                  <TableHead className="text-right">Quarterly Sales (₹ Cr)</TableHead>
                  <TableHead className="text-right pr-6">Rev. Per Employee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCompanies.map((c, index) => (
                  <TableRow key={c.nse_symbol || index} className="hover:bg-surface-alt/20 transition-colors">
                    <TableCell className="pl-6 font-semibold text-text-secondary">#{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-text-primary">{c.full_name || c.name}</span>
                          {c.url && (
                            <a
                              href={c.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-text-secondary hover:text-brand transition-colors"
                            >
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-text-secondary mt-0.5">{c.nse_symbol || c.bse_code || "N/A"}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-num text-sm text-text-primary">
                      {c.market_cap_cr ? c.market_cap_cr.toLocaleString("en-IN") : "0"}
                    </TableCell>
                    <TableCell className="text-right font-num text-sm text-text-primary">
                      {c.sales_qtr_cr ? c.sales_qtr_cr.toLocaleString("en-IN") : "0"}
                    </TableCell>
                    <TableCell className="text-right font-num text-sm text-text-primary pr-6">
                      {c.revenue_per_employee ? formatINR(c.revenue_per_employee, { compact: true }) : "0"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
