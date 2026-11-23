// ent-fin cards.
const c = (n, area, pi, front, back, formula) => {
  const o = { id: `c-enf-${String(n).padStart(3, `0`)}`, area, pi, front, back };
  if (formula) o.formula = formula;
  return o;
};

export default [
  c(1, `FI`, `FI:043`, `Financing needed`, `Start-up costs plus working capital plus a contingency cushion, minus the owner's own funds.`, `Total need - Owner funds = Outside financing`),
  c(2, `FI`, `FI:339`, `Financial needs by stage`, `Seed: owner and family money. Start-up: equipment and working capital. Growth: loans and investors. Maturity: retained earnings.`),
  c(3, `FI`, `FI:340`, `Debt vs. equity`, `Debt must be repaid with interest but keeps ownership. Equity needs no repayment but gives up ownership and a share of profits.`),
  c(4, `FI`, `FI:340`, `Post-money valuation`, `The value of a business right after an investment.`, `Investment ÷ Ownership share = Post-money value`),
  c(5, `FI`, `FI:031`, `SBA-backed loan`, `A loan from an approved lender in which the Small Business Administration guarantees part of the amount.`),
  c(6, `FI`, `FI:023`, `Trade credit`, `Supplier credit that lets a business buy now and pay later, such as net 30.`),
  c(7, `FI`, `FI:041`, `Personal guarantee`, `An owner's promise to repay a business loan from personal assets if the business cannot.`),
  c(8, `FI`, `FI:039`, `FDIC insurance`, `Insures deposits up to $250,000 per depositor, per insured bank, per ownership category.`),
  c(9, `FI`, `FI:040`, `Chargeback`, `A reversal of a card payment after a customer disputes the charge; a cost of accepting cards.`),
  c(10, `FI`, `FI:034`, `Five Cs of credit`, `Character, capacity, capital, collateral and conditions.`),
  c(11, `FI`, `FI:034`, `Debt service coverage ratio`, `Shows whether operating income covers loan payments. Many lenders want at least 1.25.`, `Net operating income ÷ Annual debt payments`),
  c(12, `FI`, `FI:033`, `Loan application package`, `Loan request, business plan, financial statements, tax returns, personal financial statement, collateral list and legal documents.`),
  c(13, `FI`, `FI:092`, `Cash flow statement`, `Reports cash in and out in three sections: operating, investing and financing.`, `Beginning cash + Net change = Ending cash`),
  c(14, `FI`, `FI:102`, `Balance sheet`, `A snapshot of assets, liabilities and owner's equity on one date.`, `Assets = Liabilities + Owner's equity`),
  c(15, `FI`, `FI:335`, `Red flag: profit without cash`, `Receivables or inventory growing faster than sales can leave a profitable business short of cash.`),
  c(16, `FI`, `FI:097`, `Current ratio`, `Measures short-term liquidity.`, `Current assets ÷ Current liabilities`),
  c(17, `FI`, `FI:097`, `Net profit margin`, `The share of each sales dollar left as profit after all costs.`, `Net income ÷ Revenue`),
  c(18, `FI`, `FI:334`, `Trend vs. common-size analysis`, `Trend compares the same line across periods. Common-size shows each line as a percent of a base such as revenue.`),
  c(19, `FI`, `FI:655`, `Limits of financial statements`, `They look backward, depend on accounting estimates, use original cost values and omit non-financial strengths.`),
  c(20, `FI`, `FI:542`, `Gross profit margin`, `Share of revenue left after the direct cost of the product.`, `(Revenue - COGS) ÷ Revenue`),
  c(21, `FI`, `FI:357`, `Cost-benefit analysis`, `Compares total expected benefits with total expected costs; proceed if benefits exceed costs.`, `Total benefits - Total costs = Net benefit`),
  c(22, `FI`, `FI:358`, `Marginal revenue`, `Extra revenue from selling one more unit. Profit is highest where marginal revenue equals marginal cost.`, `Change in revenue ÷ Change in quantity`),
  c(23, `FI`, `FI:358`, `Break-even point`, `The sales level at which revenue equals total cost and profit is zero.`, `Fixed costs ÷ (Price - Variable cost per unit)`),
  c(24, `FI`, `FI:099`, `Budget variance`, `The difference between budgeted and actual results; investigate the large ones.`),
  c(25, `FI`, `FI:652`, `Tax forms by structure`, `Sole proprietor: Schedule C. Partnership: Form 1065. S corporation: 1120-S. C corporation: 1120.`),
  c(26, `FI`, `FI:653`, `Bank reconciliation`, `Monthly comparison of the books with the bank statement to find and explain differences.`),
  c(27, `FI`, `FI:082`, `Core small business insurance`, `Property, general liability, workers' compensation, commercial auto and business interruption.`),
  c(28, `RM`, `RM:056`, `Pure vs. speculative risk`, `Pure risk means loss or no loss and is insurable. Speculative risk offers gain or loss and is not.`),
  c(29, `RM`, `RM:094`, `Risk priority score`, `Rank risks by how likely and how costly they are.`, `Likelihood x Impact`),
  c(30, `RM`, `RM:059`, `Ways to assess risk`, `Risk matrix, historical data, SWOT, scenario analysis, ratio review, inspections and expert advice.`),
  c(31, `RM`, `RM:044`, `Risk and objectives`, `Higher potential return comes with higher risk; an owner's risk appetite should fit the business objectives.`),
  c(32, `RM`, `RM:045`, `Four risk responses`, `Avoid, reduce, transfer (insurance) or accept.`)
];
