// @ts-nocheck
import { describe, it, expect } from "bun:test";
import {
  isExpense,
  computeTotalSpend,
  aggregateByCategory,
  aggregateByMerchant,
  aggregateMonthlyTrend,
  getDateRangeForTimeframe,
  cleanMerchantName,
} from "./aggregate";
import type { Transaction } from "../types/transaction";

const mockTransactions: Transaction[] = [
  {
    id: "1",
    document_id: "doc1",
    account_id: "acc1",
    business_id: "biz1",
    merchant_id: null,
    category_id: 1,
    transaction_date: "2026-01-15",
    value_date: "2026-01-15",
    narration: "UPI/12345/AIRLINES TICKET BOOKING",
    debit_amount: 50000,
    credit_amount: 0,
    running_balance: 100000,
    reference_number: "REF1",
    utr_upi_ref: null,
    cheque_number: null,
    category: "Airlines",
    raw_category: "Airlines",
    classification: "expense",
    type: "DEBIT",
  },
  {
    id: "2",
    document_id: "doc1",
    account_id: "acc1",
    business_id: "biz1",
    merchant_id: null,
    category_id: 2,
    transaction_date: "2026-02-10",
    value_date: "2026-02-10",
    narration: "POS/SHELL FUEL STATION",
    debit_amount: 30000,
    credit_amount: 0,
    running_balance: 70000,
    reference_number: "REF2",
    utr_upi_ref: null,
    cheque_number: null,
    category: "Fuel",
    raw_category: "Fuel",
    classification: "expense",
    type: "DEBIT",
  },
  {
    id: "3",
    document_id: "doc1",
    account_id: "acc1",
    business_id: "biz1",
    merchant_id: null,
    category_id: 1,
    transaction_date: "2026-03-05",
    value_date: "2026-03-05",
    narration: "AIRLINES TICKET BOOKING",
    debit_amount: 20000,
    credit_amount: 0,
    running_balance: 50000,
    reference_number: "REF3",
    utr_upi_ref: null,
    cheque_number: null,
    category: "Airlines",
    raw_category: "Airlines",
    classification: "expense",
    type: "DEBIT",
  },
  {
    id: "4",
    document_id: "doc1",
    account_id: "acc1",
    business_id: "biz1",
    merchant_id: null,
    category_id: 99,
    transaction_date: "2026-03-10",
    value_date: "2026-03-10",
    narration: "CLIENT INVOICE SETTLEMENT",
    debit_amount: 0,
    credit_amount: 150000,
    running_balance: 200000,
    reference_number: "REF4",
    utr_upi_ref: null,
    cheque_number: null,
    category: "Revenue",
    raw_category: "Revenue",
    classification: "income",
    type: "CREDIT",
  },
];

describe("Spending Aggregation Library", () => {
  it("filters expenses correctly and ignores income/credits", () => {
    expect(isExpense(mockTransactions[0])).toBe(true);
    expect(isExpense(mockTransactions[1])).toBe(true);
    expect(isExpense(mockTransactions[2])).toBe(true);
    expect(isExpense(mockTransactions[3])).toBe(false);
  });

  it("computes total spend correctly", () => {
    // 50,000 + 30,000 + 20,000 = 100,000
    const total = computeTotalSpend(mockTransactions);
    expect(total).toBe(100000);
  });

  it("returns 0 total spend for empty array", () => {
    expect(computeTotalSpend([])).toBe(0);
  });

  it("aggregates by category with correct totals, shares, and ordering", () => {
    const categories = aggregateByCategory(mockTransactions);
    expect(categories.length).toBe(2);

    // Airlines: 70,000 (70%)
    expect(categories[0].label).toBe("Airlines");
    expect(categories[0].id).toBe("airlines");
    expect(categories[0].amount).toBe(70000);
    expect(categories[0].share).toBe(70);
    expect(categories[0].count).toBe(2);

    // Fuel: 30,000 (30%)
    expect(categories[1].label).toBe("Fuel");
    expect(categories[1].id).toBe("fuel");
    expect(categories[1].amount).toBe(30000);
    expect(categories[1].share).toBe(30);
    expect(categories[1].count).toBe(1);
  });

  it("normalizes merchant names and ranks them descending", () => {
    expect(cleanMerchantName("UPI/12345/AIRLINES TICKET")).toBe("AIRLINES TICKET");
    expect(cleanMerchantName("POS/SHELL FUEL STATION")).toBe("SHELL FUEL STATION");

    const merchants = aggregateByMerchant(mockTransactions);
    expect(merchants.length).toBe(2);

    // Rank 1: AIRLINES TICKET (70,000)
    expect(merchants[0].rank).toBe(1);
    expect(merchants[0].amount).toBe(70000);

    // Rank 2: SHELL FUEL STATION (30,000)
    expect(merchants[1].rank).toBe(2);
    expect(merchants[1].amount).toBe(30000);
  });

  it("aggregates monthly trend chronologically", () => {
    const trend = aggregateMonthlyTrend(mockTransactions);
    expect(trend.length).toBe(3);

    expect(trend[0].month).toBe("Jan 2026");
    expect(trend[0].total).toBe(50000);

    expect(trend[1].month).toBe("Feb 2026");
    expect(trend[1].total).toBe(30000);

    expect(trend[2].month).toBe("Mar 2026");
    expect(trend[2].total).toBe(20000);
  });

  it("computes date range correctly for 3M, 6M, 12M", () => {
    const ref = new Date("2026-06-30T00:00:00.000Z");
    const r3m = getDateRangeForTimeframe("3M", ref);
    expect(r3m.date_to).toBe("2026-06-30");
    expect(r3m.date_from).toBe("2026-03-30");

    const r6m = getDateRangeForTimeframe("6M", ref);
    expect(r6m.date_from).toBe("2025-12-30");

    const r12m = getDateRangeForTimeframe("12M", ref);
    expect(r12m.date_from).toBe("2025-06-30");
  });
});
