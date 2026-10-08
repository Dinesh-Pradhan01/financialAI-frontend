/**
 * Mapper: Competitors List DTO -> CompetitorsListViewModel
 */

import type {
  CompetitorsResponseDTO,
  CompetitorsListViewModel,
  CompetitorRowViewModel,
  AnchorViewModel,
} from "../types/industry";
import { getReasonDisplayCopy } from "../presentation/industryPresentation";
import { getIndustryDataSource } from "../api/industryApi";

export function mapCompetitorRow(
  dto: CompetitorsResponseDTO["competitors"][number],
): CompetitorRowViewModel {
  return {
    companyId: dto.company_id,
    companyName: dto.company_name,
    ticker: dto.ticker,
    overlapLevel: dto.overlap_level,
    overlapRank: dto.overlap_rank,
    overlapSummary: dto.overlap_summary,
    overlapSource: dto.overlap_source,
    hasFinancials: dto.has_financials,
    latestPeriod: dto.latest_period,
    href: `/industry/${encodeURIComponent(dto.company_id)}`,
  };
}

export function mapAnchorCompany(dto: CompetitorsResponseDTO["anchor"]): AnchorViewModel {
  return {
    companyName: dto.company_name,
    cin: dto.cin,
    industry: dto.industry,
    description: dto.description,
    listingStatus: dto.listing_status,
    financialStatus: dto.financial_status,
    reason: dto.reason,
    reasonDisplay: getReasonDisplayCopy(dto.reason),
  };
}

export function mapCompetitorsResponse(
  dto: CompetitorsResponseDTO,
  options?: { isFixture?: boolean },
): CompetitorsListViewModel {
  const isFixture = options?.isFixture ?? getIndustryDataSource() === "fixtures";

  return {
    status: dto.status,
    generatedAt: dto.generated_at,
    isFixture,
    anchor: mapAnchorCompany(dto.anchor),
    competitors: dto.competitors.map(mapCompetitorRow),
  };
}
