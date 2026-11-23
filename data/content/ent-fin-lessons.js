// ent-fin lessons: small-business financing, credit, statements, profit, budgeting, taxes, insurance and risk.

const funding = {
  id: `ent-fi-funding`,
  area: `FI`,
  title: `Funding a start-up: needs, stages, debt and equity`,
  pis: [`FI:043`, `FI:339`, `FI:340`, `FI:031`],
  minutes: 8,
  sections: [
    {
      pi: `FI:043`,
      heading: `How much money does the business actually need?`,
      html: `<p>Before you ask anyone for money, work out the number. Financing needs have three parts: <strong>start-up costs</strong> (one-time spending to open), <strong>working capital</strong> (cash to cover bills until sales catch up) and a <strong>cushion</strong> for surprises. Owners who skip the working-capital piece often run out of cash in month three, even with a good product.</p>
<div class="example"><h4>Example: a food truck</h4><p>Maya needs a truck ($38,000), kitchen equipment and permits ($7,000) and opening inventory ($3,000). She also wants three months of operating costs at $4,000 a month ($12,000). That adds up to $60,000. She adds a 10 percent contingency ($6,000), so the total need is $66,000. She has $16,000 of her own savings, so she must raise $50,000 from outside sources.</p></div>
<div class="formula">Total need - owner's own funds = Outside financing required</div>
<p>Match the money to the purpose. Long-lived assets such as a truck or oven suit long-term financing (a term loan). Short-term needs such as seasonal inventory suit short-term tools such as a line of credit.</p>
<div class="tip"><p>Think "open, operate, oops": start-up costs, working capital, contingency.</p></div>`
    },
    {
      pi: `FI:339`,
      heading: `Financial needs change as the business grows`,
      html: `<p>A business has different money needs at different stages of its life.</p>
<ul>
<li><strong>Idea or seed stage.</strong> Little or no revenue. Money goes to research, a prototype and testing the idea. It usually comes from the founder's savings, family and friends, or a small grant.</li>
<li><strong>Start-up stage.</strong> The owner buys equipment, inventory and a lease, and pays for launch marketing. Sales are small and cash is tight, so working capital matters most.</li>
<li><strong>Growth stage.</strong> Sales rise, which means more inventory, more staff and often a second location. Growth uses cash before it produces cash, so owners use bank loans, lines of credit or outside investors.</li>
<li><strong>Maturity.</strong> Cash flow is steadier. The business funds much of itself from retained earnings and can refinance older debt at better terms.</li>
<li><strong>Decline or renewal.</strong> The owner either reinvests to reinvent the business, or plans an exit such as a sale.</li>
</ul>
<p>Example: a 3D-printing start-up needs printers and materials in year one, a bigger work space and a part-time hire in year two, and only a modest line of credit once it is established.</p>
<div class="tip"><p>Early stage: survive on owner money and patience. Growth stage: borrow or raise money to expand. Mature stage: fund from profits.</p></div>`
    },
    {
      pi: `FI:340`,
      heading: `Choosing between debt and equity`,
      html: `<p><strong>Debt capital</strong> is borrowed money you must repay with interest. <strong>Equity capital</strong> is money from owners or investors in exchange for a share of the business. Neither is always better. Weigh these factors:</p>
<table><thead><tr><th>Factor</th><th>Debt</th><th>Equity</th></tr></thead><tbody>
<tr><td>Ownership and control</td><td>Owner keeps full ownership</td><td>Owner gives up a share and some say</td></tr>
<tr><td>Repayment</td><td>Required on a schedule, win or lose</td><td>No required repayment; investors share profits</td></tr>
<tr><td>Cash flow</td><td>Payments strain a new business</td><td>No monthly payments</td></tr>
<tr><td>Cost</td><td>Interest, often tax deductible</td><td>Share of all future profits and sale value</td></tr>
<tr><td>Qualifying</td><td>Needs credit, collateral, history</td><td>Needs a convincing plan and growth potential</td></tr>
</tbody></table>
<div class="example"><h4>Example: valuation basics</h4><p>An investor offers $50,000 for a 20 percent share of a 3D-printing start-up. That implies a post-money value of $50,000 divided by 0.20, or $250,000. The pre-money value is $250,000 minus $50,000, or $200,000. The owner now owns 80 percent of a business that has $50,000 more cash.</p></div>
<p>A steady business such as a laundromat with predictable cash flow can support loan payments, so debt fits. A high-risk, fast-growth idea with little collateral often fits equity better.</p>`
    },
    {
      pi: `FI:031`,
      heading: `Sources of financial assistance`,
      html: `<p>Money comes from <strong>internal</strong> sources (the owner's savings and profits kept in the business) and <strong>external</strong> sources.</p>
<ul>
<li><strong>Bootstrapping:</strong> funding growth from personal savings and sales revenue, with no outside money.</li>
<li><strong>Friends and family:</strong> easy to reach, but put the terms in writing to protect relationships.</li>
<li><strong>Commercial banks and credit unions:</strong> term loans and lines of credit. They want proof of repayment ability.</li>
<li><strong>SBA-backed loans:</strong> the Small Business Administration generally does not lend directly. It guarantees part of a loan made by an approved lender, which makes lenders more willing to say yes. Programs include 7(a), 504 and microloans.</li>
<li><strong>Angel investors and venture capital:</strong> equity investors. Angels invest their own money in early businesses; venture capital firms invest pooled funds in businesses with high growth potential.</li>
<li><strong>Crowdfunding:</strong> many small contributions online, either rewards-based or equity-based.</li>
<li><strong>Grants:</strong> money that does not need to be repaid, usually competitive and tied to a purpose.</li>
<li><strong>Trade credit and leasing:</strong> suppliers let you pay in 30 days; leasing spreads the cost of equipment.</li>
</ul>
<div class="tip"><p>Grants and owner savings do not have to be repaid. Loans must be repaid. Equity is paid back through ownership share.</p></div>`
    }
  ],
  keyTerms: [
    { term: `Working capital`, def: `Current assets minus current liabilities; the cash cushion that pays day-to-day bills until sales arrive.` },
    { term: `Bootstrapping`, def: `Funding a business from the owner's own savings and the revenue it earns, without outside investors or loans.` },
    { term: `Debt capital`, def: `Borrowed money that must be repaid with interest; the owner keeps full ownership.` },
    { term: `Equity capital`, def: `Money invested in return for an ownership share; no repayment is required.` },
    { term: `Angel investor`, def: `A wealthy individual who invests personal money in an early-stage business in exchange for equity.` },
    { term: `Venture capital`, def: `Pooled investor money placed in young businesses with high growth potential, in exchange for equity.` },
    { term: `SBA guarantee`, def: `A promise by the Small Business Administration to repay part of a lender's loan if the borrower defaults.` }
  ],
  traps: [
    `Saying the SBA lends the money; it usually guarantees a loan made by a bank or other approved lender.`,
    `Forgetting working capital when totaling start-up needs. Opening costs are not enough; the business also needs cash to operate until sales catch up.`,
    `Assuming equity is "free" money. It costs ownership and a share of every future profit.`
  ],
  explainer: null,
  video: `v-enf-funding`,
  caseFrequent: false
};

const credit = {
  id: `ent-fi-credit`,
  area: `FI`,
  title: `Business credit, bank relationships and bank cards`,
  pis: [`FI:023`, `FI:041`, `FI:039`, `FI:040`],
  minutes: 7,
  sections: [
    {
      pi: `FI:023`,
      heading: `Why business credit matters`,
      html: `<p><strong>Business credit</strong> is the ability of the business itself, not the owner personally, to borrow or buy now and pay later. Building it early pays off.</p>
<ul>
<li><strong>Access to financing.</strong> Lenders and suppliers check a business's credit history before offering loans or lines of credit.</li>
<li><strong>Trade credit.</strong> Suppliers who see a good record will let a café buy beans on "net 30" terms, meaning payment is due in 30 days. That frees cash for other bills.</li>
<li><strong>Better terms.</strong> A strong history can mean lower interest rates, higher limits and fewer deposits.</li>
<li><strong>Separation of personal and business.</strong> A business credit profile helps keep the owner's personal finances and liability apart from the company.</li>
<li><strong>Credibility and cash-flow smoothing.</strong> Credit lets you bridge the gap between paying costs and getting paid.</li>
</ul>
<p>To build it, register the business properly, get an employer identification number (EIN), open a business bank account, keep business and personal expenses separate and pay every bill on time. Credit-reporting firms such as Dun &amp; Bradstreet score businesses; its PAYDEX score runs from 0 to 100, and 80 or higher indicates prompt payment.</p>
<div class="tip"><p>Pay on time, every time. Payment history is the biggest driver of a business credit profile.</p></div>`
    },
    {
      pi: `FI:041`,
      heading: `Risks of using business credit`,
      html: `<p>Credit is a tool that can help or hurt. The main risks are:</p>
<ul>
<li><strong>Overborrowing.</strong> Debt payments are due even in a slow month. Too much debt can drain cash flow and lead to default.</li>
<li><strong>Personal guarantees.</strong> Lenders to small businesses often require the owner to promise to repay personally. If the business fails, the owner's savings or home may be at risk.</li>
<li><strong>Loss of collateral.</strong> If the loan is secured by equipment or property, the lender can seize it after default.</li>
<li><strong>Interest-rate risk.</strong> Variable-rate loans can become more expensive when rates rise. Credit cards often carry high rates.</li>
<li><strong>Damaged credit.</strong> Late or missed payments lower credit scores and make future financing harder and more expensive.</li>
<li><strong>Restrictions.</strong> Loan agreements may include covenants, such as keeping certain ratios or limits on taking on more debt.</li>
</ul>
<div class="example"><h4>Example</h4><p>A daycare owner borrows $40,000 to double capacity, but enrollment grows more slowly than planned. The loan payments now take most of the monthly income. The fix is to borrow only an amount the conservative forecast can repay, and to keep a cash reserve.</p></div>`
    },
    {
      pi: `FI:039`,
      heading: `Analyzing critical banking relationships`,
      html: `<p>A bank is more than a place to keep cash. It can be a long-term partner. A good <strong>banking relationship</strong> can lead to a line of credit, quicker loan decisions, advice and merchant services. Owners should analyze the relationship, not just pick the bank closest to the shop.</p>
<p>Questions to ask when choosing and reviewing a bank:</p>
<ul>
<li>Does the bank lend to businesses of my size and industry?</li>
<li>Will I have a named contact, such as a business banker or loan officer, who knows my business?</li>
<li>What are the fees, minimum balances, interest rates and card-processing costs?</li>
<li>Does it offer the services I need: business checking, a line of credit, payroll, online banking, merchant services?</li>
<li>Is the bank insured? In the United States, the FDIC insures deposits up to $250,000 per depositor, per insured bank, per ownership category.</li>
</ul>
<p>Strengthen the relationship by sharing financial statements regularly, meeting your banker before you need money, keeping accounts in good standing and delivering bad news early. Lenders prefer no surprises. Large balances above insured limits may call for spreading deposits across institutions.</p>
<div class="tip"><p>Build the relationship before you need the loan. A banker who already knows your numbers can say yes faster.</p></div>`
    },
    {
      pi: `FI:040`,
      heading: `Deciding whether to accept bank cards`,
      html: `<p>Accepting credit and debit cards means opening a <strong>merchant account</strong> with a payment processor. The decision weighs benefits against costs.</p>
<p><strong>Benefits:</strong> more sales (customers spend more when they are not limited to cash), convenience, faster checkout, fewer cash-handling risks and theft, and an easy way to sell online.</p>
<p><strong>Costs and risks:</strong> processing fees (typically a percentage of each sale plus a small flat fee), equipment or software, monthly or statement fees, <strong>chargebacks</strong> (a customer disputes a charge and the funds are pulled back), fraud risk and the duty to protect card data under the Payment Card Industry Data Security Standard (PCI DSS).</p>
<div class="example"><h4>Example (illustrative rates)</h4><p>A café sells an $8.00 drink and food order. If the processor charges 2.9 percent plus $0.30: 8.00 x 0.029 = $0.232, plus $0.30 = $0.532, about 53 cents. That is 0.532 divided by 8.00, or about 6.65 percent of that sale. Small tickets feel the flat fee most. The owner can compare this cost against sales lost from turning away card customers, set a small minimum purchase where the law allows, or compare processors.</p></div>
<p>Most retail and service businesses today accept cards because customers expect it. The critical decision is which processor and pricing model fit the business.</p>`
    }
  ],
  keyTerms: [
    { term: `Trade credit`, def: `Credit extended by a supplier that lets a business buy now and pay later, such as net 30.` },
    { term: `Personal guarantee`, def: `An owner's promise to repay a business loan from personal assets if the business cannot.` },
    { term: `Collateral`, def: `An asset pledged to secure a loan that the lender can seize if the borrower defaults.` },
    { term: `Merchant account`, def: `A special bank account that lets a business accept card payments.` },
    { term: `Chargeback`, def: `A reversal of a card payment after a customer disputes the charge.` },
    { term: `Line of credit`, def: `A flexible borrowing limit that a business can draw on and repay as needed.` },
    { term: `FDIC`, def: `The Federal Deposit Insurance Corporation, which insures bank deposits up to $250,000 per depositor, per bank, per ownership category.` }
  ],
  traps: [
    `Mixing personal and business credit. Building business credit means keeping the two separate.`,
    `Forgetting the flat fee when pricing card acceptance; small sales cost a larger percentage.`,
    `Assuming a limited liability company shields the owner from every debt; a personal guarantee overrides that for the guaranteed loan.`
  ],
  explainer: null,
  video: null,
  caseFrequent: false
};

const loan = {
  id: `ent-fi-loan-package`,
  area: `FI`,
  title: `How lenders decide and how to apply`,
  pis: [`FI:034`, `FI:033`],
  minutes: 6,
  sections: [
    {
      pi: `FI:034`,
      heading: `Loan evaluation criteria`,
      html: `<p>Lenders ask one main question: <em>Will this borrower repay us?</em> They answer it with the <strong>five Cs of credit</strong>.</p>
<ul>
<li><strong>Character:</strong> the borrower's reputation, credit history and experience.</li>
<li><strong>Capacity:</strong> cash flow available to make the payments.</li>
<li><strong>Capital:</strong> how much of the owner's own money is invested. Skin in the game matters.</li>
<li><strong>Collateral:</strong> assets pledged as a backup source of repayment.</li>
<li><strong>Conditions:</strong> the loan's purpose, the economy and the industry outlook.</li>
</ul>
<p>Capacity is often measured with the <strong>debt service coverage ratio (DSCR)</strong>, which compares cash available for debt payments with the payments due. Many lenders look for at least 1.25.</p>
<div class="formula">Net operating income ÷ Annual debt payments = DSCR</div>
<div class="example"><h4>Example</h4><p>A laundromat earns $36,000 a year in net operating income and the new loan payments total $24,000 a year. DSCR = 36,000 / 24,000 = 1.5. The business earns $1.50 for every $1.00 owed, so it clears a 1.25 test.</p></div>
<p>Lenders also look at the loan-to-value ratio. If a $100,000 oven line will secure an $80,000 loan, loan-to-value is 80,000 / 100,000 = 80 percent, which means the owner puts in the remaining 20 percent.</p>`
    },
    {
      pi: `FI:033`,
      heading: `Completing the loan application package`,
      html: `<p>A strong application is complete, accurate and organized. Lenders usually ask for:</p>
<ul>
<li><strong>Loan request:</strong> the amount, the purpose, the term and how you plan to repay.</li>
<li><strong>Business plan and executive summary:</strong> what the business does, the market, management team and projections.</li>
<li><strong>Financial statements:</strong> income statements, balance sheets and cash flow statements for recent years, plus projections for new businesses.</li>
<li><strong>Tax returns:</strong> business and personal returns, often for the last three years.</li>
<li><strong>Personal financial statement:</strong> the owner's assets and debts, because owners often guarantee the loan.</li>
<li><strong>Collateral list:</strong> assets offered as security, with estimated values.</li>
<li><strong>Legal documents:</strong> business licenses, articles of organization, leases, contracts and resumes of owners.</li>
</ul>
<p>Check every number twice. Figures must agree across documents. A missing page or inconsistent statements can sink a good application.</p>
<div class="tip"><p>Tell the story in the numbers: what you need, what you will do with it and how you will pay it back.</p></div>
<p>Be ready for questions at the bank meeting, and respond quickly if the lender asks for more information.</p>`
    }
  ],
  keyTerms: [
    { term: `Five Cs of credit`, def: `Character, capacity, capital, collateral and conditions: the standard factors lenders weigh.` },
    { term: `Debt service coverage ratio`, def: `Net operating income divided by annual debt payments; shows ability to make loan payments.` },
    { term: `Collateral`, def: `An asset pledged to secure a loan.` },
    { term: `Loan-to-value ratio`, def: `The loan amount divided by the value of the asset that secures it.` },
    { term: `Personal financial statement`, def: `A summary of an owner's personal assets and liabilities, supplied to lenders.` },
    { term: `Term`, def: `The length of time over which a loan is repaid.` }
  ],
  traps: [
    `Confusing capital (the owner's own investment) with capacity (cash flow to pay the loan).`,
    `Submitting statements whose numbers do not match the tax returns or each other.`
  ],
  explainer: `loan`,
  video: null,
  caseFrequent: false
};

const statements = {
  id: `ent-fi-statements`,
  area: `FI`,
  title: `Financial statements and cash flow`,
  pis: [`FI:092`, `FI:102`, `FI:335`],
  minutes: 7,
  sections: [
    {
      pi: `FI:092`,
      heading: `Preparing a cash flow statement`,
      html: `<p>Profit is not the same as cash. A bakery can show a profit on paper while waiting for catering customers to pay. The <strong>cash flow statement</strong> tracks actual cash coming in and going out over a period, in three sections.</p>
<ul>
<li><strong>Operating activities:</strong> cash from running the business (customer receipts, paying suppliers, wages).</li>
<li><strong>Investing activities:</strong> buying or selling long-term assets such as equipment.</li>
<li><strong>Financing activities:</strong> loans, repayments, owner investment and owner withdrawals.</li>
</ul>
<div class="formula">Beginning cash + Net change in cash = Ending cash</div>
<div class="example"><h4>Example</h4><p>A print shop has net income of $8,000, depreciation of $2,000 (a non-cash expense added back) and accounts receivable that rose by $3,000 (sales not yet collected, so subtract). Operating cash flow = 8,000 + 2,000 - 3,000 = $7,000. It buys equipment for $10,000 (investing: -$10,000) and takes a $12,000 loan (financing: +$12,000). Net change = 7,000 - 10,000 + 12,000 = +$9,000. With $5,000 of beginning cash, ending cash is $14,000.</p></div>
<p>Rules of thumb: an increase in receivables or inventory uses cash; an increase in payables supplies cash; depreciation is added back because no cash left the business.</p>`
    },
    {
      pi: `FI:102`,
      heading: `Interpreting the three statements`,
      html: `<p>Each statement answers a different question. Read them together.</p>
<table><thead><tr><th>Statement</th><th>Question it answers</th><th>Time frame</th></tr></thead><tbody>
<tr><td>Income statement</td><td>Did the business earn a profit?</td><td>A period (month, quarter, year)</td></tr>
<tr><td>Balance sheet</td><td>What does the business own and owe?</td><td>A single date</td></tr>
<tr><td>Cash flow statement</td><td>Where did cash come from and go?</td><td>A period</td></tr>
</tbody></table>
<div class="formula">Assets = Liabilities + Owner's equity</div>
<p>On the income statement, start at revenue, subtract cost of goods sold to get gross profit, subtract operating expenses to get operating income, then account for interest and taxes to reach net income. On the balance sheet, current assets (cash, receivables, inventory) show liquidity, while liabilities and equity show how the business is financed.</p>
<div class="example"><h4>Example</h4><p>A cleaning service shows $90,000 in revenue and $9,000 in net income, so the net profit margin is 10 percent. Its balance sheet shows $30,000 in assets and $12,000 in liabilities. Equity = 30,000 - 12,000 = $18,000. The numbers connect: net income increases equity, and cash flow shows where the cash went.</p></div>`
    },
    {
      pi: `FI:335`,
      heading: `Spotting problems in financial statements`,
      html: `<p>Statements can hide trouble. Look for red flags.</p>
<ul>
<li><strong>Profit but falling cash.</strong> Often caused by slow-paying customers, growing inventory or heavy loan payments.</li>
<li><strong>Receivables growing faster than sales.</strong> Customers may be paying late or may never pay.</li>
<li><strong>Inventory piling up.</strong> Unsold items tie up cash and may become obsolete.</li>
<li><strong>Rising debt and falling equity.</strong> The business may be relying too much on borrowing.</li>
<li><strong>Current liabilities larger than current assets.</strong> Negative working capital means trouble paying near-term bills.</li>
<li><strong>Shrinking margins.</strong> Costs may be growing faster than prices.</li>
<li><strong>Numbers that do not agree.</strong> A balance sheet that does not balance, or a cash figure that does not match the bank, signals errors or worse.</li>
<li><strong>Unusual or one-time items</strong> that make a single year look better or worse than normal.</li>
</ul>
<div class="example"><h4>Example</h4><p>A food truck's sales grew 10 percent, but accounts receivable from catering clients grew 60 percent and cash fell. The statements say the owner is selling more but getting paid slowly. The fix could be to require deposits and shorten payment terms.</p></div>`
    }
  ],
  keyTerms: [
    { term: `Cash flow statement`, def: `Report showing cash received and paid out during a period, split into operating, investing and financing activities.` },
    { term: `Income statement`, def: `Report of revenues, expenses and profit over a period of time.` },
    { term: `Balance sheet`, def: `Snapshot of assets, liabilities and owner's equity on one date.` },
    { term: `Depreciation`, def: `The spreading of an asset's cost over its useful life; a non-cash expense.` },
    { term: `Accounts receivable`, def: `Money owed to the business by customers who bought on credit.` },
    { term: `Working capital`, def: `Current assets minus current liabilities.` }
  ],
  traps: [
    `Treating net income as cash in the bank. Receivables, inventory and loan payments cause the two to differ.`,
    `Forgetting that the balance sheet is a single date while the income and cash flow statements cover a period.`,
    `Adding back an increase in receivables; it should be subtracted because the sale did not bring in cash yet.`
  ],
  explainer: null,
  video: null,
  caseFrequent: false
};

const ratios = {
  id: `ent-fi-ratios`,
  area: `FI`,
  title: `Ratios, trends and the limits of financial statements`,
  pis: [`FI:097`, `FI:334`, `FI:655`],
  minutes: 8,
  sections: [
    {
      pi: `FI:097`,
      heading: `Calculating key financial ratios`,
      html: `<p>A ratio turns raw numbers into something you can compare. The main groups are liquidity, profitability, efficiency and leverage.</p>
<div class="formula">Current assets ÷ Current liabilities = Current ratio</div>
<div class="formula">(Current assets - Inventory) ÷ Current liabilities = Quick ratio</div>
<div class="formula">Net income ÷ Revenue = Net profit margin</div>
<div class="formula">Cost of goods sold ÷ Average inventory = Inventory turnover</div>
<div class="formula">Total liabilities ÷ Owner's equity = Debt-to-equity</div>
<div class="example"><h4>Example: a small gift shop</h4><p>Current assets $30,000 (of which inventory $12,000); current liabilities $20,000; revenue $120,000; net income $9,000; total liabilities $60,000; owner's equity $40,000.</p><ul><li>Current ratio = 30,000 / 20,000 = 1.5</li><li>Quick ratio = (30,000 - 12,000) / 20,000 = 0.9</li><li>Net profit margin = 9,000 / 120,000 = 7.5 percent</li><li>Debt-to-equity = 60,000 / 40,000 = 1.5</li></ul></div>
<p>Gross margin = (revenue - cost of goods sold) / revenue. If revenue is $80,000 and cost of goods sold is $48,000, gross profit is $32,000 and gross margin is 32,000 / 80,000 = 40 percent. Inventory turnover with cost of goods sold of $48,000 and average inventory of $8,000 is 6 times a year.</p>`
    },
    {
      pi: `FI:334`,
      heading: `Types of financial statement analysis`,
      html: `<p>Ratios are only one tool. Analysts use several approaches.</p>
<ul>
<li><strong>Ratio analysis:</strong> calculating and comparing ratios to goals, past results or industry standards.</li>
<li><strong>Trend (horizontal) analysis:</strong> comparing the same line over several periods, often as a percent change.</li>
<li><strong>Common-size (vertical) analysis:</strong> expressing each line as a percent of a base, such as revenue on the income statement or total assets on the balance sheet.</li>
<li><strong>Benchmarking (industry comparison):</strong> comparing the business with similar businesses or industry averages.</li>
<li><strong>Break-even analysis:</strong> finding the sales level at which profit is zero.</li>
</ul>
<div class="formula">(Current year - Base year) ÷ Base year = Percent change</div>
<div class="example"><h4>Example</h4><p>A laundromat's revenue was $150,000 last year and $168,000 this year. Percent change = (168,000 - 150,000) / 150,000 = 12 percent growth. In a common-size view, if utilities were $21,000 of $168,000 revenue, utilities are 12.5 percent of revenue. Comparing that percentage with last year's shows whether utility costs are creeping up.</p></div>
<div class="tip"><p>Horizontal = across time. Vertical = down one statement as percentages of a base.</p></div>`
    },
    {
      pi: `FI:655`,
      heading: `Limits of financial statements`,
      html: `<p>Statements are useful, but they do not tell the whole story. Owners and lenders should know the limits.</p>
<ul>
<li><strong>They look backward.</strong> They report what happened, not what will happen.</li>
<li><strong>Accounting choices and estimates.</strong> Depreciation methods, inventory methods and bad-debt estimates can change reported profit.</li>
<li><strong>Cost-based values.</strong> Many assets are recorded at original cost, which may differ from today's market value.</li>
<li><strong>Missing non-financial factors.</strong> Customer loyalty, employee skill, brand reputation and location do not appear as line items.</li>
<li><strong>Timing.</strong> A balance sheet is a snapshot; seasonal businesses can look very different a month later.</li>
<li><strong>Comparability.</strong> Different businesses use different methods and sizes, so ratio comparisons can mislead.</li>
<li><strong>Possible manipulation.</strong> Statements can be arranged to look better, such as delaying bills at year end.</li>
<li><strong>Inflation</strong> distorts comparisons across years.</li>
</ul>
<p>Use statements with other information: the market, management quality, forecasts and trends over several periods. A single ratio from one date is never enough to judge a business.</p>`
    }
  ],
  keyTerms: [
    { term: `Current ratio`, def: `Current assets divided by current liabilities; a basic measure of short-term liquidity.` },
    { term: `Quick ratio`, def: `Current assets minus inventory, divided by current liabilities; a stricter liquidity test.` },
    { term: `Net profit margin`, def: `Net income divided by revenue.` },
    { term: `Trend analysis`, def: `Comparing the same financial figure across several periods.` },
    { term: `Common-size analysis`, def: `Expressing each statement line as a percent of a base such as revenue or total assets.` },
    { term: `Benchmarking`, def: `Comparing a business's results with similar businesses or industry averages.` },
    { term: `Debt-to-equity ratio`, def: `Total liabilities divided by owner's equity; shows reliance on borrowing.` }
  ],
  traps: [
    `Dividing by the wrong base. Percent change divides by the earlier (base) period, not the later one.`,
    `Comparing a ratio with no benchmark. A 1.5 current ratio is only good or bad relative to industry and history.`,
    `Using one year of statements to judge a business; trends need several periods.`
  ],
  explainer: `ratios`,
  video: null,
  caseFrequent: false
};

const profit = {
  id: `ent-fi-profit`,
  area: `FI`,
  title: `Profitability, cost-benefit and break-even`,
  pis: [`FI:542`, `FI:357`, `FI:358`],
  minutes: 8,
  sections: [
    {
      pi: `FI:542`,
      heading: `Monitoring the business's profitability`,
      html: `<p>Making sales is not enough. Owners must track whether sales produce profit, and watch it monthly rather than once a year.</p>
<ul>
<li><strong>Gross profit margin</strong> shows what is left after the direct cost of the product.</li>
<li><strong>Operating margin</strong> shows profit after operating expenses such as rent and wages.</li>
<li><strong>Net profit margin</strong> shows what remains after every cost, interest and taxes.</li>
<li><strong>Product or service profitability:</strong> which items earn the most per sale.</li>
<li><strong>Budget variance:</strong> the difference between planned and actual results.</li>
</ul>
<div class="formula">(Revenue - Cost of goods sold) ÷ Revenue = Gross profit margin</div>
<div class="example"><h4>Example</h4><p>A café sells a latte for $5.00 that costs $1.50 in ingredients and cup. Gross profit = $3.50, and gross margin = 3.50 / 5.00 = 70 percent. A pastry sells for $3.00 and costs $1.80, so gross profit is $1.20 and gross margin is 40 percent. Selling more lattes boosts profit faster than selling more pastries.</p></div>
<p>If margins fall, ask why: Did supplier prices rise? Are discounts too deep? Is waste increasing? Then act: adjust prices, renegotiate costs or cut waste.</p>`
    },
    {
      pi: `FI:357`,
      heading: `The nature of cost-benefit analysis`,
      html: `<p><strong>Cost-benefit analysis</strong> compares the total expected costs of a decision with the total expected benefits. If benefits exceed costs, the choice is worth considering. It is used for equipment purchases, new hires, marketing campaigns and expansion.</p>
<ol>
<li>Define the decision and the alternatives, including doing nothing.</li>
<li>List all costs, both direct (price, installation) and indirect (training, maintenance).</li>
<li>List all benefits and put dollar values on them: added sales, saved labor, lower costs.</li>
<li>Compare totals over the same time period.</li>
<li>Consider risk and benefits that are hard to measure, such as customer satisfaction.</li>
</ol>
<div class="formula">Total benefits - Total costs = Net benefit</div>
<div class="example"><h4>Example</h4><p>A bakery can buy a $12,000 oven. It expects $5,000 a year in extra profit for 3 years, which is $15,000. Net benefit = 15,000 - 12,000 = $3,000 (before accounting for the time value of money). The oven looks worthwhile, but a more careful analysis would discount future benefits and check what happens if sales are lower.</p></div>
<p>A good analysis also counts opportunity cost: the value of the next-best use of the money.</p>`
    },
    {
      pi: `FI:358`,
      heading: `Revenue, output, profit and break-even`,
      html: `<p><strong>Total revenue</strong> is price times quantity sold. <strong>Marginal revenue</strong> is the extra revenue from selling one more unit. <strong>Profit</strong> is total revenue minus total cost.</p>
<div class="formula">Price x Quantity = Total revenue</div>
<div class="formula">Change in total revenue ÷ Change in quantity = Marginal revenue</div>
<p>Example: selling 10 units brings $100 and selling 11 brings $108, so marginal revenue is $8. A business maximizes profit by producing until marginal revenue equals marginal cost; beyond that point, each extra unit costs more than it earns. For a business that sells at a constant price, marginal revenue equals the price.</p>
<p><strong>Break-even</strong> is the output where total revenue equals total cost, so profit is zero.</p>
<div class="formula">Fixed costs ÷ (Price - Variable cost per unit) = Break-even units</div>
<div class="example"><h4>Example: food truck</h4><p>Monthly fixed costs are $4,200, the price per meal is $12 and the variable cost is $5. The contribution margin is 12 - 5 = $7 per meal. Break-even = 4,200 / 7 = 600 meals, or $7,200 in sales. To earn a $1,400 profit, sell (4,200 + 1,400) / 7 = 800 meals. At 800 meals, revenue is $9,600, total cost is 4,200 + 4,000 = $8,200, and profit is $1,400.</p></div>
<div class="tip"><p>Fixed costs stay the same however many you sell (rent). Variable costs rise with each unit (ingredients).</p></div>`
    }
  ],
  keyTerms: [
    { term: `Gross profit margin`, def: `Gross profit divided by revenue; the share of each sales dollar left after direct costs.` },
    { term: `Cost-benefit analysis`, def: `Comparing total expected costs and benefits of a decision to see if it is worthwhile.` },
    { term: `Marginal revenue`, def: `The extra revenue earned by selling one more unit.` },
    { term: `Contribution margin`, def: `Price minus variable cost per unit; the amount each sale adds toward fixed costs and profit.` },
    { term: `Break-even point`, def: `The sales level at which total revenue equals total costs and profit is zero.` },
    { term: `Fixed cost`, def: `A cost that does not change with output, such as rent.` },
    { term: `Variable cost`, def: `A cost that changes with output, such as ingredients.` }
  ],
  traps: [
    `Dividing fixed costs by the price instead of by the contribution margin.`,
    `Counting only benefits in a cost-benefit analysis, or forgetting indirect costs and opportunity cost.`,
    `Confusing total revenue with profit; revenue ignores costs.`
  ],
  explainer: `breakeven`,
  video: `v-enf-breakeven`,
  caseFrequent: false
};

const budget = {
  id: `ent-fi-budget`,
  area: `FI`,
  title: `Budgets and sales forecasts`,
  pis: [`FI:099`, `FI:096`],
  minutes: 5,
  sections: [
    {
      pi: `FI:099`,
      heading: `Developing a company or department budget`,
      html: `<p>A <strong>budget</strong> is a plan, in dollars, for the revenue and expenses of a future period. It guides spending, sets targets and gives owners a yardstick to measure results.</p>
<p>Common types:</p>
<ul>
<li><strong>Operating budget:</strong> expected revenue and expenses.</li>
<li><strong>Cash budget:</strong> expected cash in and out by month, so the owner can see shortfalls ahead of time.</li>
<li><strong>Capital budget:</strong> planned purchases of long-term assets such as equipment.</li>
</ul>
<p>Steps: (1) review past results, (2) forecast sales, (3) estimate fixed and variable expenses, (4) set profit goals, (5) get input from the people who manage each area, (6) approve the budget, and (7) compare actual results with the budget and investigate <strong>variances</strong>. A <strong>zero-based</strong> budget makes every expense justify itself from scratch; an <strong>incremental</strong> budget adjusts last year's numbers.</p>
<div class="example"><h4>Example: a daycare</h4><p>Projected annual revenue is $240,000. Budgeted expenses: wages $150,000, rent $36,000, supplies $24,000, insurance and other $15,000, a total of $225,000. Budgeted profit = 240,000 - 225,000 = $15,000. If actual wages come in at $158,000, the variance is $8,000 over budget (unfavorable) and calls for a look at overtime.</p></div>`
    },
    {
      pi: `FI:096`,
      heading: `Forecasting sales`,
      html: `<p>A <strong>sales forecast</strong> estimates future sales in units or dollars. It is the starting point of the budget, because costs, staffing and inventory all depend on it.</p>
<ul>
<li><strong>Historical trend:</strong> project from past sales, adjusting for growth.</li>
<li><strong>Moving average:</strong> average recent periods to smooth out noise.</li>
<li><strong>Market research and surveys:</strong> estimate demand when the business is new.</li>
<li><strong>Sales-team or expert opinion:</strong> people close to customers give estimates.</li>
<li><strong>Test marketing:</strong> sell in a small area first.</li>
</ul>
<p>Adjust for seasonality, competitors, economic conditions, price changes and planned marketing.</p>
<div class="example"><h4>Example</h4><p>An online shop had $240,000 in sales last year and expects 5 percent growth. Forecast = 240,000 x 1.05 = $252,000. Using a three-month moving average, if monthly sales were $10,000, $12,000 and $14,000, the forecast for next month is (10,000 + 12,000 + 14,000) / 3 = $12,000.</p></div>
<p>Forecasts are estimates. Prepare a best case, expected case and worst case, and revise as actual results arrive. A new business with no history should rely on market research and conservative assumptions.</p>`
    }
  ],
  keyTerms: [
    { term: `Budget`, def: `A financial plan for expected revenue and expenses over a future period.` },
    { term: `Cash budget`, def: `A forecast of cash receipts and payments by period.` },
    { term: `Variance`, def: `The difference between budgeted and actual results.` },
    { term: `Sales forecast`, def: `An estimate of future sales in units or dollars.` },
    { term: `Moving average`, def: `An average of the most recent periods used to smooth data.` },
    { term: `Zero-based budgeting`, def: `Building a budget from zero, with each expense justified.` }
  ],
  traps: [
    `Building the expense budget before forecasting sales; sales drive the rest.`,
    `Treating a forecast as a guarantee instead of an estimate to review regularly.`
  ],
  explainer: null,
  video: null,
  caseFrequent: false
};

const compliance = {
  id: `ent-fi-taxes-insurance`,
  area: `FI`,
  title: `Taxes, accurate records and insurance`,
  pis: [`FI:652`, `FI:653`, `FI:082`],
  minutes: 6,
  sections: [
    {
      pi: `FI:652`,
      heading: `Filing business tax returns`,
      html: `<p>The tax forms a business files depend on its legal structure.</p>
<table><thead><tr><th>Structure</th><th>How income is reported</th></tr></thead><tbody>
<tr><td>Sole proprietorship</td><td>Schedule C attached to the owner's personal Form 1040</td></tr>
<tr><td>Partnership</td><td>Form 1065 information return; partners get a Schedule K-1 and report their share</td></tr>
<tr><td>S corporation</td><td>Form 1120-S; profits pass through to owners</td></tr>
<tr><td>C corporation</td><td>Form 1120; the corporation pays its own income tax</td></tr>
</tbody></table>
<p>Other tax duties: owners who expect to owe tax must usually make <strong>estimated tax payments</strong> each quarter; employers withhold and deposit payroll taxes and file quarterly (Form 941) and year-end wage forms; sellers collect and remit state sales tax. Missing deadlines leads to penalties and interest.</p>
<p>Good practice: keep business and personal accounts separate, track deductible expenses all year, set aside money for taxes from each sale and use a qualified tax professional for questions. Deadlines and rates change, so check the current IRS rules each year.</p>
<div class="tip"><p>Sole proprietor: Schedule C. Pass-through entities send profit to owners' returns. A C corporation is taxed itself.</p></div>`
    },
    {
      pi: `FI:653`,
      heading: `Verifying the accuracy of financial records`,
      html: `<p>Statements, taxes and loan applications all depend on accurate records. Verification catches mistakes and fraud early.</p>
<ul>
<li><strong>Bank reconciliation:</strong> every month, compare the books with the bank statement and explain differences such as outstanding checks and deposits in transit.</li>
<li><strong>Trial balance:</strong> total debits must equal total credits.</li>
<li><strong>Source documents:</strong> match entries to receipts, invoices and deposit slips.</li>
<li><strong>Cash counts and inventory counts:</strong> compare physical counts with the records.</li>
<li><strong>Separation of duties:</strong> the person who handles cash should not also keep the books or reconcile the account.</li>
<li><strong>Review and audit:</strong> an outside accountant can review records periodically.</li>
</ul>
<div class="example"><h4>Example</h4><p>A café's books show $6,240 in cash, but the bank statement shows $6,000. A check for $300 is still outstanding and a $60 deposit has not yet cleared. Adjusted bank balance = 6,000 - 300 + 60 = $5,760, which still does not match $6,240. A $480 difference signals an error to investigate, such as a missed expense or double-entered sale.</p></div>
<p>Keep records for as long as they may be needed; the IRS generally advises at least three years for most returns, and longer in some situations.</p>`
    },
    {
      pi: `FI:082`,
      heading: `Obtaining insurance coverage`,
      html: `<p><strong>Insurance</strong> transfers risk to an insurance company. The owner pays a <strong>premium</strong>; the insurer pays covered losses above the <strong>deductible</strong> (the part the owner pays first). Common coverages for small businesses:</p>
<ul>
<li><strong>Property:</strong> buildings, equipment and inventory damaged by fire, theft or storms.</li>
<li><strong>General liability:</strong> injuries or damage to others, such as a customer slipping in a laundromat.</li>
<li><strong>Workers' compensation:</strong> medical costs and lost wages for injured employees; required in most states once you have employees.</li>
<li><strong>Commercial auto:</strong> vehicles used for business, like a food truck.</li>
<li><strong>Business interruption:</strong> lost income while the business is closed after a covered loss.</li>
<li><strong>Product liability, professional liability and cyber coverage</strong> for specific exposures.</li>
</ul>
<p>To obtain coverage, list your risks, work with an independent agent or broker, get several quotes, compare coverage limits, exclusions and deductibles (not only price), and review the policy every year as the business grows. A higher deductible lowers the premium but raises what you pay after a loss. Keep records of assets and inventory to support claims.</p>
<div class="tip"><p>Insure what could close the business, not what you can easily afford to lose.</p></div>`
    }
  ],
  keyTerms: [
    { term: `Schedule C`, def: `The form where a sole proprietor reports business profit or loss on a personal tax return.` },
    { term: `Estimated taxes`, def: `Quarterly tax payments made by owners whose income is not subject to withholding.` },
    { term: `Bank reconciliation`, def: `Comparing the business's records to the bank statement and explaining differences.` },
    { term: `Separation of duties`, def: `Dividing cash handling and record keeping among different people to prevent errors and theft.` },
    { term: `Premium`, def: `The price paid for an insurance policy.` },
    { term: `Deductible`, def: `The amount the policyholder pays before the insurer pays a covered loss.` },
    { term: `Workers' compensation`, def: `Insurance paying medical costs and lost wages for employees hurt on the job.` }
  ],
  traps: [
    `Thinking a sole proprietor files a separate business income tax return; the profit goes on Schedule C of the personal return.`,
    `Choosing insurance on price alone and ignoring limits and exclusions.`,
    `Assuming general liability covers employee injuries; that is workers' compensation.`
  ],
  explainer: null,
  video: null,
  caseFrequent: false
};

const riskAssess = {
  id: `ent-rm-risk-assess`,
  area: `RM`,
  title: `Identifying and assessing business risks`,
  pis: [`RM:056`, `RM:094`, `RM:059`],
  minutes: 6,
  sections: [
    {
      pi: `RM:056`,
      heading: `Identifying business risks`,
      html: `<p><strong>Risk</strong> is the chance of loss or of results different from what was expected. Every business faces risk, so the first step is to find it. Risks fall into groups:</p>
<ul>
<li><strong>Pure risk</strong> offers only loss or no loss, such as fire, theft or injury. It is usually insurable.</li>
<li><strong>Speculative risk</strong> offers a chance of gain or loss, such as launching a new product. It is generally not insurable.</li>
</ul>
<p>Common categories for a small business:</p>
<ul>
<li><strong>Financial:</strong> running out of cash, customers not paying, high debt.</li>
<li><strong>Operational:</strong> equipment breakdown, supplier delays, employee error.</li>
<li><strong>Market and strategic:</strong> new competitors, changing customer tastes, a poor location.</li>
<li><strong>Legal and compliance:</strong> lawsuits, licensing, health and safety rules.</li>
<li><strong>Human:</strong> losing a key employee, accidents, theft.</li>
<li><strong>Natural and technology:</strong> storms, floods, data breaches.</li>
</ul>
<div class="example"><h4>Example: a food truck</h4><p>Risks include engine failure (operational), a food-borne illness complaint (legal and reputation), a rainy season that cuts sales (market), a permit denial (compliance) and a stolen cash box (human). Walking through each part of the business, from sourcing to selling, is a practical way to find them.</p></div>`
    },
    {
      pi: `RM:094`,
      heading: `Assessing business risks`,
      html: `<p>After risks are listed, owners judge how serious each is. The common method scores two things: <strong>likelihood</strong> (how probable) and <strong>impact</strong> (how costly).</p>
<div class="formula">Likelihood x Impact = Risk priority</div>
<table><thead><tr><th>Risk</th><th>Likelihood (1-5)</th><th>Impact (1-5)</th><th>Score</th></tr></thead><tbody>
<tr><td>Oven breakdown</td><td>3</td><td>4</td><td>12</td></tr>
<tr><td>Fire at the shop</td><td>1</td><td>5</td><td>5</td></tr>
<tr><td>Key supplier closes</td><td>2</td><td>4</td><td>8</td></tr>
</tbody></table>
<p>The highest scores get attention first. A risk with high likelihood and high impact needs action now. A low-likelihood, high-impact risk such as fire is often handled with insurance. Low-likelihood, low-impact risks may simply be accepted.</p>
<p>Assessment also looks at the business's <strong>risk tolerance</strong>, meaning how much loss it can absorb, and at its ability to recover. A business with a cash reserve can handle more risk than one living week to week. Expected loss can be estimated as probability times loss: a 10 percent chance of a $5,000 loss is $500 in expected loss.</p>`
    },
    {
      pi: `RM:059`,
      heading: `Ways to assess risk`,
      html: `<p>Owners have several tools for estimating risk:</p>
<ul>
<li><strong>Risk matrix:</strong> plotting likelihood against impact on a grid.</li>
<li><strong>Historical data:</strong> past accidents, claims, returns and breakdowns show what tends to happen.</li>
<li><strong>SWOT analysis:</strong> strengths, weaknesses, opportunities and threats highlight internal and external risk.</li>
<li><strong>Scenario and sensitivity analysis:</strong> asking "what if sales fall 20 percent or costs rise 10 percent?" and recalculating profit and break-even.</li>
<li><strong>Financial ratio review:</strong> low liquidity or high debt signals financial risk.</li>
<li><strong>Inspections and audits:</strong> safety walk-throughs, accounting reviews and insurance surveys.</li>
<li><strong>Expert advice:</strong> insurance agents, accountants and attorneys.</li>
<li><strong>Customer and employee feedback:</strong> complaints, near misses and incident reports.</li>
</ul>
<div class="example"><h4>Example</h4><p>A cleaning service has fixed costs of $3,600 a month, a price of $60 a job and variable costs of $24. Break-even is 3,600 / 36 = 100 jobs. If a slow winter cuts jobs to 90, the owner knows she would lose 10 x $36 = $360. Running this scenario beforehand shows the risk and its size.</p></div>
<p>Combine tools. No single method captures everything, and assessments should be repeated as the business changes.</p>`
    }
  ],
  keyTerms: [
    { term: `Risk`, def: `The chance of loss or of results differing from expectations.` },
    { term: `Pure risk`, def: `A risk with only a chance of loss or no loss; usually insurable.` },
    { term: `Speculative risk`, def: `A risk with a chance of gain or loss; generally not insurable.` },
    { term: `Risk matrix`, def: `A grid that rates each risk by likelihood and impact.` },
    { term: `Risk tolerance`, def: `The amount of loss a business can absorb and still meet its goals.` },
    { term: `Sensitivity analysis`, def: `Testing how results change when key assumptions, such as sales or costs, change.` }
  ],
  traps: [
    `Calling a speculative risk, such as a new product launch, insurable; insurance covers pure risks.`,
    `Ranking risks by impact alone; likelihood also matters.`
  ],
  explainer: null,
  video: null,
  caseFrequent: false
};

const riskProgram = {
  id: `ent-rm-risk-program`,
  area: `RM`,
  title: `Risk, objectives and a risk management program`,
  pis: [`RM:044`, `RM:045`],
  minutes: 6,
  sections: [
    {
      pi: `RM:044`,
      heading: `How risk relates to business objectives`,
      html: `<p>Entrepreneurship means taking risks. A business with no risk-taking has few chances for reward. In general, <strong>higher potential return comes with higher risk</strong>. The task is to take the right risks, not to avoid all of them.</p>
<ul>
<li>Risk can <strong>threaten</strong> objectives. A fire could end a plan to expand.</li>
<li>Risk can <strong>create</strong> opportunity. Opening a second location risks capital but could double sales.</li>
<li>Objectives set the <strong>risk appetite</strong>, the amount of risk the owner is willing to take to reach goals. A lifestyle business may seek stability; a high-growth tech start-up accepts more.</li>
</ul>
<div class="example"><h4>Example</h4><p>Two owners each have $40,000. One opens a small pop-up shop with a low chance of loss and modest profit. The other signs a long lease on a large store with higher possible profit but much bigger fixed costs. If the objective is steady income, the first fits better. If the objective is fast growth and the owner can absorb a possible loss, the second may fit.</p></div>
<p>Good decisions tie risk to objectives: identify what could stop each goal, judge whether the possible reward justifies the exposure, and put controls in place so the business can survive a bad outcome.</p>
<div class="tip"><p>Do not ask "Is it risky?" Ask "Is the risk worth the reward, and can we survive the downside?"</p></div>`
    },
    {
      pi: `RM:045`,
      heading: `Developing a risk management program`,
      html: `<p>A <strong>risk management program</strong> is an organized, written plan to find risks, decide what to do about them and keep checking. Steps:</p>
<ol>
<li><strong>Set objectives and scope.</strong> What are we protecting: people, property, income, reputation?</li>
<li><strong>Identify risks</strong> across operations, finances, people and legal duties.</li>
<li><strong>Assess and rank</strong> them by likelihood and impact.</li>
<li><strong>Choose a response</strong> for each risk (see below).</li>
<li><strong>Implement</strong> with assigned owners, budgets and deadlines.</li>
<li><strong>Monitor and review</strong> regularly and update when the business changes.</li>
</ol>
<table><thead><tr><th>Response</th><th>Meaning</th><th>Example</th></tr></thead><tbody>
<tr><td>Avoid</td><td>Stop the risky activity</td><td>Do not sell a product with high liability exposure</td></tr>
<tr><td>Reduce</td><td>Lower likelihood or impact</td><td>Safety training, sprinklers, backing up data</td></tr>
<tr><td>Transfer</td><td>Shift the loss to another party</td><td>Buy insurance, use contracts</td></tr>
<tr><td>Accept (retain)</td><td>Bear the risk knowingly</td><td>Set aside a reserve for small repairs</td></tr>
</tbody></table>
<p>Include contingency plans, such as a backup supplier or an emergency cash fund, and train employees. A program that sits in a drawer does not help; review it at least yearly.</p>`
    }
  ],
  keyTerms: [
    { term: `Risk appetite`, def: `The amount of risk an owner is willing to take to pursue objectives.` },
    { term: `Risk avoidance`, def: `Eliminating a risk by not doing the activity.` },
    { term: `Risk reduction`, def: `Lowering the likelihood or impact of a risk through controls.` },
    { term: `Risk transfer`, def: `Shifting the financial effect of a risk to another party, such as an insurer.` },
    { term: `Risk acceptance`, def: `Deciding to bear a risk and its possible loss.` },
    { term: `Contingency plan`, def: `A prepared response for use if a risk event occurs.` }
  ],
  traps: [
    `Treating insurance as the whole program; it is only the transfer option.`,
    `Thinking the goal is zero risk. The goal is to manage risk in line with objectives.`
  ],
  explainer: null,
  video: null,
  caseFrequent: false
};

export default [funding, credit, loan, statements, ratios, profit, budget, compliance, riskAssess, riskProgram];
