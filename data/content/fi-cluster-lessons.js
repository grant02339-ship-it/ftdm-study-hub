// fi-cluster lessons: FI tier-2, FM, RM and SM performance indicators.
export const lessons = [
  // ---------------------------------------------------------------- FI 1
  {
    id: 'fi-institutions-markets',
    area: 'FI',
    title: 'Financial institutions, markets and industry convergence',
    pis: ['FI:336', 'FI:337', 'FI:573'],
    minutes: 11,
    sections: [
      {
        pi: 'FI:336',
        heading: 'What financial institutions actually do',
        html: `<p>A <strong>financial institution</strong> is a business whose main product is money itself: holding it, moving it, lending it or investing it. Their big job in the economy is to act as a <strong>financial intermediary</strong>. Savers have extra money they don't need right now. Borrowers, such as a family buying a house or a company building a factory, need money they don't have yet. Institutions connect the two groups, so savers earn a return and borrowers get funding.</p>
<p>Institutions fall into two broad groups:</p>
<ul>
<li><strong>Depository institutions</strong> take deposits and make loans. <strong>Commercial banks</strong> are for-profit and owned by shareholders, and their deposits are insured by the FDIC. <strong>Credit unions</strong> are not-for-profit cooperatives owned by their members, and their deposits are insured by the NCUA, not the FDIC. <strong>Savings and loans (thrifts)</strong> historically focused on savings accounts and home mortgages.</li>
<li><strong>Non-depository institutions</strong> don't take deposits. They include insurance companies, brokerage firms, mutual fund companies, pension funds and finance companies. <strong>Investment banks</strong> help companies and governments issue new stocks and bonds and advise on mergers, but they do not take everyday deposits.</li>
</ul>
<p>Beyond matching savers and borrowers, institutions provide <strong>payment services</strong> (checks, cards, transfers), <strong>safekeeping</strong>, <strong>risk transfer</strong> (insurance) and <strong>financial advice</strong>. They also create <strong>liquidity</strong>: you can pull money out of a savings account today even though the bank has lent it out for a 30-year mortgage.</p>
<p>As of 2026, standard deposit insurance is <strong>$250,000 per depositor, per insured bank, per ownership category</strong>. Deposit insurance does not cover stocks, bonds, mutual funds, annuities or life insurance, even if you buy them at a bank.</p>
<div class="tip"><p>Credit union = members own it, NCUA insures it. Bank = shareholders own it, FDIC insures it.</p></div>`
      },
      {
        pi: 'FI:337',
        heading: 'Types of financial markets',
        html: `<p>A <strong>financial market</strong> is any place, physical or electronic, where people buy and sell financial assets. The exam expects you to sort markets by <em>what</em> is traded and <em>how long</em> the money is tied up.</p>
<table>
<thead><tr><th>Market</th><th>What trades there</th><th>Typical example</th></tr></thead>
<tbody>
<tr><td>Money market</td><td>Short-term debt, maturing in one year or less</td><td>Treasury bills, commercial paper, short-term CDs</td></tr>
<tr><td>Capital market</td><td>Long-term debt and equity, longer than one year</td><td>Stocks, corporate bonds, 10-year Treasury notes</td></tr>
<tr><td>Insurance market</td><td>Risk transfer: people pay premiums to shift possible losses</td><td>Life, health, auto, business liability policies</td></tr>
<tr><td>Commodities market</td><td>Raw goods and contracts on them</td><td>Wheat, oil, gold, and futures on those goods</td></tr>
<tr><td>Foreign exchange market</td><td>Currencies</td><td>Swapping dollars for euros</td></tr>
<tr><td>Derivatives market</td><td>Contracts whose value comes from another asset</td><td>Options and futures</td></tr>
</tbody>
</table>
<p>The <strong>money market</strong> is about safety and liquidity. Businesses park spare cash there for weeks or months, and governments borrow short term. Returns are low because risk is low. The <strong>capital market</strong> is where businesses raise money for long-term growth, like building a plant, and where investors seek higher long-run returns in exchange for more risk.</p>
<p>The <strong>insurance market</strong> lets people and businesses trade an uncertain large loss for a certain small cost, the premium. The <strong>commodities market</strong> lets producers and users lock in prices. A cereal maker might buy wheat futures so a bad harvest doesn't wreck its budget. That use is called <strong>hedging</strong>.</p>
<div class="tip"><p>Money market = "money soon" (one year or less). Capital market = "capital to build" (long term).</p></div>`
      },
      {
        pi: 'FI:337',
        heading: 'Primary vs. secondary markets, and using markets in a case',
        html: `<p>Markets are also sorted by <strong>who receives the money</strong>.</p>
<ul>
<li>In the <strong>primary market</strong>, the issuer sells brand-new securities and gets the cash. An <strong>initial public offering (IPO)</strong> is a company's first sale of stock to the public, usually arranged by an investment bank. A city selling new bonds to build a school is also a primary-market deal.</li>
<li>In the <strong>secondary market</strong>, investors trade existing securities with each other on exchanges such as the NYSE or Nasdaq. The company that first issued the shares gets <em>nothing</em> from these trades. The secondary market still matters to issuers: it gives investors liquidity, which makes them willing to buy in the primary market in the first place.</li>
</ul>
<div class="example"><h4>Example</h4><p>Riverbend Outfitters sells 1 million new shares in its IPO at $20 each and raises $20 million, less fees. That's the primary market. A month later, Jada buys 50 Riverbend shares from another investor on an exchange for $23 each. Riverbend receives none of Jada's money. That's the secondary market.</p></div>
<p>FI:337 shows up often in FTDM cases, usually when a client needs to choose where to put money. Match the market to the client's <strong>time horizon</strong> and <strong>risk tolerance</strong>:</p>
<ul>
<li>Money needed within a year, such as an emergency fund or a down payment: money-market products and insured deposits, valued for safety and liquidity.</li>
<li>Money for goals many years away, such as retirement or a newborn's college fund: capital-market investments like diversified stock and bond funds, valued for growth.</li>
<li>Protection against a large loss, such as a parent's death or a lawsuit: the insurance market.</li>
</ul>
<p>In a presentation, name the market, say why it fits the goal, and mention the trade-off you are accepting. Judges reward that kind of reasoning more than a list of definitions.</p>`
      },
      {
        pi: 'FI:573',
        heading: 'Convergence and consolidation in the finance industry',
        html: `<p><strong>Convergence</strong> means banking, investing and insurance, once separate businesses, now blending together, so one company may offer checking accounts, brokerage accounts and insurance. <strong>Consolidation</strong> means fewer, larger firms, usually through mergers and acquisitions.</p>
<p>The history explains how this happened:</p>
<ul>
<li>The <strong>Glass-Steagall Act (Banking Act of 1933)</strong>, passed after the bank failures of the Great Depression, separated commercial banking from investment banking. It also created the <strong>FDIC</strong>.</li>
<li>The <strong>Gramm-Leach-Bliley Act (1999)</strong> repealed Glass-Steagall's limits on affiliations. It allowed <strong>financial holding companies</strong> that combine banking, securities and insurance under one roof. GLBA also requires institutions to give customers privacy notices.</li>
<li>After the 2008 financial crisis, the <strong>Dodd-Frank Act (2010)</strong> added oversight of very large firms. It created the Financial Stability Oversight Council and the Consumer Financial Protection Bureau, and included the Volcker Rule limiting banks' own speculative trading.</li>
</ul>
<p><strong>Why firms converge and consolidate:</strong> economies of scale (spreading technology and compliance costs over more customers), "one-stop shopping" convenience, cross-selling more products to existing customers, wider geographic reach, and diversified income.</p>
<p><strong>Concerns:</strong> less competition and possibly higher fees, fewer choices for small communities, conflicts of interest when one firm sells many products, and <strong>"too big to fail"</strong> risk, where one giant firm's failure could threaten the whole financial system.</p>
<p>Technology adds another kind of convergence. <strong>Fintech</strong> firms, such as payment apps and robo-advisors, offer services banks used to own, and many partner with chartered banks.</p>
<div class="tip"><p>Glass-Steagall split them up (1933). Gramm-Leach-Bliley let them back together (1999).</p></div>`
      }
    ],
    keyTerms: [
      { term: 'Financial intermediary', def: 'An institution that channels money from savers to borrowers, such as a bank lending out deposits.' },
      { term: 'Depository institution', def: 'An institution that accepts deposits and makes loans: commercial banks, credit unions and thrifts.' },
      { term: 'Money market', def: 'The market for short-term debt that matures in one year or less, such as Treasury bills.' },
      { term: 'Capital market', def: 'The market for long-term debt and equity, such as stocks and long-term bonds.' },
      { term: 'Primary market', def: 'The market where issuers sell new securities and receive the money, as in an IPO.' },
      { term: 'Secondary market', def: 'The market where investors trade existing securities with each other; the issuer receives nothing.' },
      { term: 'Convergence', def: 'The blending of banking, securities and insurance services within the same firms.' },
      { term: 'Financial holding company', def: 'A company allowed by the Gramm-Leach-Bliley Act to own banking, securities and insurance businesses together.' }
    ],
    traps: [
      'Credit unions are insured by the NCUA, not the FDIC.',
      'Buying shares on an exchange after an IPO is a secondary-market trade; the company gets none of that money.',
      'The money market is short-term debt (one year or less), not a place to buy stocks.',
      'Glass-Steagall separated banking and investing; Gramm-Leach-Bliley allowed them to combine again.'
    ],
    explainer: null,
    video: 'v-fic-markets',
    caseFrequent: true
  },

  // ---------------------------------------------------------------- FI 2
  {
    id: 'fi-economy-global-markets',
    area: 'FI',
    title: 'Economic conditions, the Fed and global financial markets',
    pis: ['FI:574', 'FI:575'],
    minutes: 8,
    sections: [
      {
        pi: 'FI:574',
        heading: 'How the economy moves financial markets',
        html: `<p>Financial markets are a mirror of the economy. Investors constantly ask, "What will businesses earn, and what will money cost?" Changes in the economy change those answers.</p>
<ul>
<li><strong>Business cycle.</strong> In an expansion, sales and profits rise, so stock prices tend to rise. In a recession, profits fall and stock prices usually drop. Markets often move <em>before</em> the economy does, because investors trade on expectations.</li>
<li><strong>Interest rates.</strong> When market interest rates rise, the prices of existing bonds fall, and when rates fall, bond prices rise. This <strong>inverse relationship</strong> is one of the most tested facts in finance. Higher rates also make borrowing costlier for companies, which can drag down stock prices.</li>
<li><strong>Inflation.</strong> Rising prices erode the purchasing power of fixed payments, so bond investors demand higher yields. Inflation also tends to push the Federal Reserve to raise rates.</li>
<li><strong>Unemployment and consumer confidence.</strong> More jobs mean more spending and stronger company sales.</li>
</ul>
<h4>Where the Federal Reserve fits</h4>
<p>The Fed is the U.S. central bank. It has a 7-member Board of Governors, 12 regional Reserve Banks, and the Federal Open Market Committee (FOMC), which sets monetary policy. Its main lever is a <strong>target range for the federal funds rate</strong>, the rate banks charge each other for overnight loans. It steers that rate using interest on reserve balances and <strong>open market operations</strong> (buying or selling government securities). Reserve requirements have been <strong>0% since March 2020</strong>. After its October 2026 meeting, the target range stood at 3.75% to 4.00%. Rates can change at any meeting, so always check the latest figure.</p>
<ul>
<li><strong>Expansionary policy</strong> (to fight a recession): buy securities and lower rates, so credit gets cheaper.</li>
<li><strong>Contractionary policy</strong> (to fight inflation): sell securities and raise rates, so credit gets more expensive.</li>
</ul>
<div class="tip"><p>Monetary policy = the Fed (rates and money). Fiscal policy = Congress and the President (taxes and spending).</p></div>`
      },
      {
        pi: 'FI:575',
        heading: 'Financial globalization',
        html: `<p><strong>Financial globalization</strong> is the growing connection between countries' financial systems. Money, investments, loans and financial companies now cross borders constantly and almost instantly.</p>
<p><strong>What it looks like:</strong></p>
<ul>
<li>U.S. investors own shares of foreign companies, often through international mutual funds and ETFs, and foreign investors buy U.S. stocks and Treasury bonds.</li>
<li>Large banks and insurers operate in dozens of countries.</li>
<li>Companies raise money abroad, for example by issuing bonds in another currency.</li>
<li>Markets trade around the clock as trading moves from Asia to Europe to the Americas.</li>
</ul>
<p><strong>Benefits:</strong> businesses can reach a bigger pool of capital, investors can <strong>diversify internationally</strong> (when one country's economy struggles, another may be growing), and competition can lower costs for customers.</p>
<p><strong>Risks:</strong></p>
<ul>
<li><strong>Currency (exchange-rate) risk.</strong> If you own a European stock and the euro weakens against the dollar, your investment is worth fewer dollars even if the stock's price doesn't change. A stronger dollar also makes U.S. exports more expensive for foreign buyers.</li>
<li><strong>Contagion.</strong> Trouble in one country can spread quickly. The 2008 financial crisis began in the U.S. housing market and spread to banks and economies worldwide.</li>
<li><strong>Political and regulatory risk.</strong> Different countries have different laws, accounting rules and levels of stability.</li>
</ul>
<div class="example"><h4>Example</h4><p>Marco buys shares of a Japanese company. Over the year the stock price in yen is flat, but the yen strengthens against the dollar. When Marco converts back, he has more dollars than he started with. Currency movement alone created his gain, and it could just as easily have created a loss.</p></div>`
      }
    ],
    keyTerms: [
      { term: 'Inverse relationship (bonds)', def: 'When market interest rates rise, existing bond prices fall, and vice versa.' },
      { term: 'Federal funds rate', def: 'The interest rate banks charge each other for overnight loans; the Fed sets a target range for it.' },
      { term: 'Open market operations', def: 'The Fed buying or selling government securities to steer short-term interest rates.' },
      { term: 'Expansionary monetary policy', def: 'Fed actions that lower rates and expand credit to fight a recession.' },
      { term: 'Contractionary monetary policy', def: 'Fed actions that raise rates and tighten credit to fight inflation.' },
      { term: 'Financial globalization', def: 'The increasing integration of countries’ financial markets and institutions.' },
      { term: 'Currency risk', def: 'The chance that exchange-rate changes reduce the value of a foreign investment.' },
      { term: 'Contagion', def: 'Financial trouble spreading quickly from one market or country to others.' }
    ],
    traps: [
      'Rising interest rates push existing bond prices down, not up.',
      'The Fed sets a target for the federal funds rate; it does not directly set mortgage or prime rates.',
      'Monetary policy belongs to the Fed; fiscal policy belongs to Congress and the President.',
      'A stronger dollar makes U.S. exports more expensive for foreign buyers.'
    ],
    explainer: null,
    video: 'v-fic-fed-banks',
    caseFrequent: false
  },

  // ---------------------------------------------------------------- FI 3
  {
    id: 'fi-securities-tvm',
    area: 'FI',
    title: 'Securities information, securities tables and TVM math',
    pis: ['FI:274', 'FI:275', 'FI:238'],
    minutes: 11,
    sections: [
      {
        pi: 'FI:274',
        heading: 'Where investors find securities information',
        html: `<p>Good investment decisions start with good information. The best source depends on <em>what</em> you need to know.</p>
<table>
<thead><tr><th>Source</th><th>Best for</th></tr></thead>
<tbody>
<tr><td>Financial websites and brokerage apps</td><td><strong>Current</strong> prices, charts and news, updated during the trading day</td></tr>
<tr><td>Company annual report</td><td>A year's results, financial statements and management's discussion, written for shareholders</td></tr>
<tr><td>SEC filings (Form 10-K annual, Form 10-Q quarterly), searchable in the SEC's EDGAR database</td><td>Official, detailed, audited (10-K) disclosures that public companies must file</td></tr>
<tr><td>Prospectus</td><td>Details about a new security offering or a mutual fund: goals, risks and fees</td></tr>
<tr><td>Financial newspapers and magazines</td><td>Analysis, market commentary and longer stories; printed prices are already out of date</td></tr>
<tr><td>Analyst and brokerage research reports</td><td>Professional opinions, earnings forecasts and ratings</td></tr>
<tr><td>Bond rating agencies</td><td>Credit ratings that estimate the chance an issuer will default</td></tr>
</tbody>
</table>
<p>Investors should judge every source on <strong>timeliness</strong> (how current is it?), <strong>reliability</strong> (is it official or audited?) and <strong>objectivity</strong> (does the writer gain if I buy?). A company's own press release is useful but promotional. A social-media "hot tip" may be outdated, wrong, or part of a scheme to pump up a price.</p>
<div class="example"><h4>Example</h4><p>Priya wants the price of a stock right now: a financial website or brokerage app. She wants to know how much debt the company carries: its latest 10-K or 10-Q. She's comparing two mutual funds' fees: each fund's prospectus.</p></div>
<div class="tip"><p>"Right now" questions → website. "Official and detailed" questions → SEC filings or the annual report.</p></div>`
      },
      {
        pi: 'FI:275',
        heading: 'Reading a stock table',
        html: `<p>A <strong>securities table</strong> packs a lot of information into one row per security. The column names vary a little by source, but these are standard:</p>
<table>
<thead><tr><th>Column</th><th>Meaning</th></tr></thead>
<tbody>
<tr><td>52-week high / low</td><td>The highest and lowest prices over the past year</td></tr>
<tr><td>Name / symbol</td><td>The company and its ticker symbol</td></tr>
<tr><td>Div</td><td>Annual dividend per share, in dollars</td></tr>
<tr><td>Yld %</td><td>Dividend yield: annual dividend ÷ current price</td></tr>
<tr><td>P/E</td><td>Price-to-earnings ratio: price ÷ earnings per share</td></tr>
<tr><td>Vol</td><td>Shares traded that day; check the table's note, since volume is often shown in hundreds or thousands</td></tr>
<tr><td>Close / Last</td><td>The most recent or closing price</td></tr>
<tr><td>Net chg</td><td>Change from the previous day's close</td></tr>
</tbody>
</table>
<div class="formula">Dividend yield = Annual dividend ÷ Price × 100</div>
<div class="formula">P/E ratio = Price per share ÷ Earnings per share</div>
<div class="example"><h4>Example</h4><p>A row for a made-up company with the symbol <code>HLX</code> reads: 52-wk high 58.40, low 41.10, Div 1.50, Close 50.00, Net chg +0.75. The company's earnings per share (EPS) are $2.50.</p>
<ul>
<li>Yield = 1.50 ÷ 50.00 = 0.03, or <strong>3.0%</strong>.</li>
<li>P/E = 50.00 ÷ 2.50 = <strong>20</strong>. Investors pay $20 for each $1 of yearly earnings.</li>
<li>Net chg +0.75 means yesterday's close was 50.00 − 0.75 = <strong>$49.25</strong>.</li>
</ul></div>
<p><strong>Interpreting:</strong> a high P/E often means investors expect fast growth (or the stock is pricey). A high yield attracts income investors, but a yield that's high because the price crashed can be a warning sign. A price near its 52-week high shows recent strength.</p>
<p><strong>Bond tables</strong> quote price as a <em>percent of par</em>. A quote of 98.5 on a $1,000 bond means a price of $985. A price below 100 is a <strong>discount</strong>, and above 100 is a <strong>premium</strong>.</p>`
      },
      {
        pi: 'FI:238',
        heading: 'Calculating the time value of money',
        html: `<p>The <strong>time value of money (TVM)</strong> says a dollar today is worth more than a dollar later, because today's dollar can earn interest. FI:238 asks you to actually do the math. Every TVM problem uses the same pieces: present value (PV), future value (FV), rate per period (r), number of periods (n or t), and sometimes a regular payment (PMT).</p>
<div class="formula">Simple interest: I = P × r × t</div>
<div class="formula">Compound future value: FV = PV × (1 + r)ⁿ</div>
<div class="formula">Present value: PV = FV ÷ (1 + r)ⁿ</div>
<div class="formula">Rule of 72: years to double ≈ 72 ÷ interest rate</div>
<div class="example"><h4>Example</h4>
<ul>
<li><strong>Simple:</strong> $1,000 at 6% for 3 years. I = 1,000 × 0.06 × 3 = <strong>$180</strong> interest, so $1,180 total.</li>
<li><strong>Compound:</strong> the same deposit compounded yearly. FV = 1,000 × 1.06³ = 1,000 × 1.191016 = <strong>$1,191.02</strong>. The extra $11.02 is interest earned on interest.</li>
<li><strong>Present value:</strong> $5,000 needed in 4 years at 5%. PV = 5,000 ÷ 1.05⁴ = 5,000 ÷ 1.215506 = <strong>$4,113.51</strong> today.</li>
<li><strong>Annuity:</strong> $2,000 saved at the end of each year for 5 years at 6% grows to <strong>$11,274.19</strong>.</li>
<li><strong>Rule of 72:</strong> at 8%, money doubles in about 72 ÷ 8 = <strong>9 years</strong>.</li>
</ul></div>
<p>Exam distractors come from predictable slips: giving the total ($1,180) when the question asks for the interest ($180), using one year instead of the full term, misplacing a decimal, or doubling the interest. Read the question's last few words carefully.</p>
<p>Direction rules are tested even more than arithmetic: more frequent compounding raises FV, a higher interest rate raises FV, and a higher discount rate lowers PV.</p>
<div class="tip"><p>On a four-function calculator, find (1.06)³ by multiplying 1.06 × 1.06 × 1.06.</p></div>`
      }
    ],
    keyTerms: [
      { term: 'Form 10-K', def: 'The detailed annual report a public company files with the SEC, including audited financial statements.' },
      { term: 'Prospectus', def: 'A disclosure document describing a new security offering or a mutual fund, including its risks and fees.' },
      { term: 'Ticker symbol', def: 'The short letter code that identifies a security on an exchange.' },
      { term: 'Dividend yield', def: 'Annual dividend per share divided by the share price, shown as a percent.' },
      { term: 'P/E ratio', def: 'Share price divided by earnings per share; shows how much investors pay per dollar of earnings.' },
      { term: 'Net change', def: 'The difference between today’s closing price and the previous day’s close.' },
      { term: 'Present value', def: 'What a future amount of money is worth today at a given interest rate.' },
      { term: 'Future value', def: 'What money invested today will grow to at a given rate over a given time.' },
      { term: 'Rule of 72', def: 'A shortcut: 72 divided by the annual interest rate estimates the years needed to double money.' }
    ],
    traps: [
      'The best source for a current stock price is a financial website, not an annual report or newspaper.',
      'Yield is dividend ÷ price; P/E is price ÷ earnings per share. Don’t flip them.',
      'When a question asks for interest, don’t answer with principal plus interest.',
      'A higher discount rate gives a lower present value.'
    ],
    explainer: 'bond',
    video: 'v-fic-investments',
    caseFrequent: false
  },
  // ---------------------------------------------------------------- FI 4
  {
    id: 'fi-equity-managerial',
    area: 'FI',
    title: 'Statement of changes in equity and managerial accounting',
    pis: ['FI:630', 'FI:660'],
    minutes: 7,
    sections: [
      {
        pi: 'FI:630',
        heading: 'The statement of changes in equity',
        html: `<p>The <strong>statement of changes in equity</strong> (also called the statement of stockholders' equity, or the statement of owner's equity for a small business) explains <em>why</em> the owners' stake in a business changed over a period. It is the bridge between the income statement and the balance sheet.</p>
<div class="formula">Beginning equity + Net income (or − Net loss) + New owner investment or stock issued − Withdrawals or dividends = Ending equity</div>
<p>For a corporation, the statement usually shows separate columns for <strong>contributed capital</strong> (money shareholders paid in for stock) and <strong>retained earnings</strong> (profits kept in the business instead of paid out). A narrower version that tracks only retained earnings is called a <strong>statement of retained earnings</strong>.</p>
<div class="example"><h4>Example</h4><p>Summit Bikes starts the year with $80,000 of equity. It earns net income of $25,000, issues $10,000 of new stock, and pays $5,000 in dividends.</p>
<p>80,000 + 25,000 + 10,000 − 5,000 = <strong>$110,000</strong> ending equity, which then appears on the year-end balance sheet.</p></div>
<p><strong>Order of preparation:</strong> income statement first (to get net income), then the statement of changes in equity (to get ending equity), then the balance sheet, then the cash flow statement.</p>
<p><strong>Why users care:</strong> investors can see whether growth in equity came from profits (a healthy sign) or just from selling more stock, and how much of the profit was paid out as dividends.</p>
<div class="tip"><p>Dividends are <em>not</em> an expense. They never appear on the income statement. They reduce retained earnings on this statement.</p></div>`
      },
      {
        pi: 'FI:660',
        heading: 'The nature of managerial accounting',
        html: `<p>Accounting has two main branches, and the exam loves to contrast them.</p>
<table>
<thead><tr><th></th><th>Financial accounting</th><th>Managerial accounting</th></tr></thead>
<tbody>
<tr><td>Main users</td><td>Outsiders: investors, lenders, regulators</td><td>Insiders: managers and employees</td></tr>
<tr><td>Rules</td><td>Must follow GAAP (or IFRS)</td><td>No required format; whatever helps decisions</td></tr>
<tr><td>Time focus</td><td>Past results</td><td>Mostly the future: plans, budgets, forecasts</td></tr>
<tr><td>Scope</td><td>The whole company</td><td>Products, departments, stores, projects</td></tr>
<tr><td>Timing</td><td>Quarterly and annual reports</td><td>As often as needed, even daily</td></tr>
<tr><td>Precision</td><td>Verifiable, often audited</td><td>Timely estimates are fine</td></tr>
</tbody>
</table>
<p><strong>Managerial accounting</strong> gives managers the numbers they need to <strong>plan</strong>, <strong>control</strong> and <strong>decide</strong>. Typical tools include:</p>
<ul>
<li>Cost classification (direct, indirect, fixed, variable, sunk, differential)</li>
<li>Budgets and cost accounting budgets</li>
<li>Variance analysis (comparing actual results to the budget)</li>
<li>Break-even and marginal analysis</li>
<li>Product costing and cost allocation</li>
<li>Make-or-buy, pricing and special-order decisions</li>
</ul>
<div class="example"><h4>Example</h4><p>A coffee chain's annual report shows total company profit. That's financial accounting. Its regional manager gets a weekly report showing labor cost per store and which drinks earn the highest margin. That's managerial accounting.</p></div>
<div class="tip"><p>Financial = for <strong>F</strong>olks outside. Managerial = for <strong>M</strong>anagers inside.</p></div>`
      }
    ],
    keyTerms: [
      { term: 'Statement of changes in equity', def: 'A financial statement showing how owners’ equity changed during a period from income, investments and distributions.' },
      { term: 'Retained earnings', def: 'Cumulative profits a corporation has kept rather than paid out as dividends.' },
      { term: 'Contributed capital', def: 'The money shareholders have paid the company in exchange for stock.' },
      { term: 'Managerial accounting', def: 'Accounting that produces information for internal managers to plan, control and make decisions.' },
      { term: 'Financial accounting', def: 'Accounting that produces GAAP-based reports for outside users such as investors and lenders.' }
    ],
    traps: [
      'Dividends reduce retained earnings; they are not an expense on the income statement.',
      'Managerial accounting does not have to follow GAAP; financial accounting does.',
      'The statement of changes in equity covers a period of time, while the balance sheet shows a single date.'
    ],
    explainer: null,
    video: null,
    caseFrequent: false
  },

  // ---------------------------------------------------------------- FI 5
  {
    id: 'fi-cost-analysis',
    area: 'FI',
    title: 'Cost types, marginal analysis and cost allocation',
    pis: ['FI:658', 'FI:659', 'FI:663'],
    minutes: 10,
    sections: [
      {
        pi: 'FI:658',
        heading: 'Types of costs managers use',
        html: `<p>Managerial accountants sort costs several different ways, depending on the question being asked.</p>
<h4>By traceability</h4>
<ul>
<li><strong>Direct costs</strong> can be traced to one specific product, job or department: the wood in a table, or the wages of the worker who builds it.</li>
<li><strong>Indirect costs (overhead)</strong> are shared and can't be traced to one product: factory rent, utilities, a supervisor's salary, equipment depreciation.</li>
</ul>
<h4>By behavior</h4>
<ul>
<li><strong>Fixed costs</strong> stay the same <em>in total</em> as volume changes (rent, insurance). Fixed cost <em>per unit</em> falls as you make more.</li>
<li><strong>Variable costs</strong> change in total with volume but stay the same <em>per unit</em> (materials, sales commissions).</li>
<li><strong>Mixed costs</strong> have both parts, like a phone plan with a base fee plus usage charges.</li>
</ul>
<h4>For decisions</h4>
<ul>
<li><strong>Sunk costs</strong> were already spent and can't be recovered. They should be <em>ignored</em> in future decisions.</li>
<li><strong>Differential (incremental) costs</strong> are the costs that differ between two alternatives. Only these, along with differences in revenue, matter when choosing.</li>
<li><strong>Opportunity cost</strong> is the value of the best alternative you give up.</li>
<li><strong>Controllable costs</strong> are costs a particular manager can influence, which is useful when judging that manager's performance.</li>
</ul>
<div class="example"><h4>Example</h4><p>A print shop paid $4,000 for a machine last year (sunk). It's choosing between running jobs on that machine, with $600 a month in supplies, or outsourcing them for $900 a month. The differential cost is $300 a month. The $4,000 already spent doesn't change either way, so it's irrelevant.</p></div>
<div class="tip"><p>Sunk = sunk to the bottom of the lake. You can't get it back, so stop thinking about it.</p></div>`
      },
      {
        pi: 'FI:659',
        heading: 'Marginal analysis',
        html: `<p><strong>Marginal analysis</strong> asks: "What happens if we do <em>one more</em>?" One more unit, one more hour open, one more employee, one more ad. "Marginal" just means <em>additional</em>.</p>
<ul>
<li><strong>Marginal cost (MC)</strong> is the added cost of producing one more unit.</li>
<li><strong>Marginal revenue (MR)</strong> is the added revenue from selling one more unit.</li>
<li><strong>Marginal benefit</strong> is the general version: the added gain from one more of anything.</li>
</ul>
<div class="formula">Keep expanding while marginal revenue > marginal cost. Profit is highest where MR = MC.</div>
<p>Average costs can mislead. Suppose a bakery's average cost per cake is $12, counting rent and equipment. If a customer offers $10 for a one-time extra cake, average-cost thinking says "reject." Marginal thinking asks what that <em>extra</em> cake adds. If the oven and staff are already there and ingredients cost $4, the extra cake adds $10 of revenue and $4 of cost, a $6 gain. That logic is called a <strong>special-order decision</strong>, as long as there is spare capacity and regular customers won't demand the same low price.</p>
<div class="example"><h4>Example</h4><p>Ana's food truck is deciding whether to stay open one extra hour. That hour would bring about $180 in sales, and food, fuel and wages for the hour would cost about $130. Marginal benefit ($180) exceeds marginal cost ($130), so the extra hour adds about $50 of profit. A second extra hour might bring only $90 of sales against $130 of cost, so she should stop after one.</p></div>
<p><strong>Applications:</strong> setting production levels, pricing, special orders, staffing, advertising budgets, and deciding whether to add or drop a product line. Marginal analysis also explains <strong>diminishing returns</strong>: each extra worker or dollar eventually adds less than the one before.</p>`
      },
      {
        pi: 'FI:663',
        heading: 'Cost allocation',
        html: `<p>Indirect costs, like factory rent or a maintenance crew, still have to be paid for by the products and departments that use them. <strong>Cost allocation</strong> is the process of assigning those shared costs to <strong>cost objects</strong> (products, departments, customers or projects) using a reasonable <strong>allocation base</strong>.</p>
<p>A good allocation base is a <strong>cost driver</strong>, meaning something that actually causes the cost to rise:</p>
<ul>
<li>Rent and building costs → square footage</li>
<li>Machine maintenance → machine hours</li>
<li>Supervision → direct labor hours or number of employees</li>
<li>Purchasing department costs → number of purchase orders</li>
</ul>
<div class="formula">Allocation rate = Total indirect cost ÷ Total allocation base</div>
<div class="example"><h4>Example</h4><p>A company pays $30,000 a year in rent for 10,000 square feet. The Assembly department uses 6,000 square feet and Packaging uses 4,000.</p>
<p>Rate = 30,000 ÷ 10,000 = $3 per square foot. Assembly gets 6,000 × $3 = <strong>$18,000</strong>; Packaging gets 4,000 × $3 = <strong>$12,000</strong>.</p></div>
<p><strong>Why allocate?</strong> To set prices that cover all costs, to measure each product's or department's true profitability, and to make managers aware of the shared resources they use.</p>
<p><strong>What usually isn't allocated to products:</strong> general administrative and selling costs, such as the CEO's salary or national advertising, are treated as <em>period costs</em> and expensed in the period, not built into product cost.</p>
<p>Traditional costing often uses one plant-wide rate, such as labor hours. <strong>Activity-based costing (ABC)</strong> uses many cost drivers for different activities, which usually gives more accurate product costs when products use resources very differently.</p>`
      }
    ],
    keyTerms: [
      { term: 'Direct cost', def: 'A cost that can be traced to a specific product, job or department.' },
      { term: 'Indirect cost (overhead)', def: 'A shared cost that cannot be traced to one product and must be allocated.' },
      { term: 'Sunk cost', def: 'A cost already incurred that cannot be recovered and should be ignored in decisions.' },
      { term: 'Differential cost', def: 'The difference in cost between two alternatives; also called incremental cost.' },
      { term: 'Marginal cost', def: 'The additional cost of producing one more unit.' },
      { term: 'Marginal revenue', def: 'The additional revenue from selling one more unit.' },
      { term: 'Cost allocation', def: 'Assigning indirect costs to products, departments or other cost objects using an allocation base.' },
      { term: 'Cost driver', def: 'An activity or factor that causes a cost to be incurred, used as an allocation base.' }
    ],
    traps: [
      'Total fixed cost stays constant; fixed cost per unit falls as volume rises.',
      'Including a sunk cost in a decision is a classic error.',
      'Factory overhead is allocated to products; general administrative costs usually are not.',
      'Marginal analysis compares the added benefit with the added cost, not averages.'
    ],
    explainer: null,
    video: null,
    caseFrequent: false
  },

  // ---------------------------------------------------------------- FI 6
  {
    id: 'fi-cost-budgets-variance',
    area: 'FI',
    title: 'Cost accounting budgets and variance analysis',
    pis: ['FI:662', 'FI:661'],
    minutes: 7,
    sections: [
      {
        pi: 'FI:662',
        heading: 'Cost accounting budgets',
        html: `<p>A <strong>budget</strong> is a financial plan expressed in numbers. In cost accounting, budgets plan what it should cost to make and sell the company's products, and they become the yardstick for judging actual results.</p>
<p>A company's <strong>master budget</strong> is a set of linked budgets. The order matters because each feeds the next:</p>
<ol>
<li><strong>Sales budget</strong>: expected units and revenue. This is the foundation; everything else depends on it.</li>
<li><strong>Production budget</strong>: units to make = expected sales + desired ending inventory − beginning inventory.</li>
<li><strong>Direct materials</strong>, <strong>direct labor</strong> and <strong>manufacturing overhead budgets</strong>: the resources production will need.</li>
<li><strong>Cost of goods sold</strong> and <strong>selling and administrative expense budgets</strong>.</li>
<li><strong>Cash budget</strong>: when cash comes in and goes out, and whether borrowing will be needed.</li>
<li><strong>Budgeted income statement and balance sheet</strong>.</li>
</ol>
<p>Many companies build budgets from <strong>standard costs</strong>, which are the expected cost per unit for materials, labor and overhead under normal conditions. For example, a standard of 2 pounds of resin at $3 per pound means $6 of materials per unit.</p>
<h4>Kinds of budgets</h4>
<ul>
<li><strong>Static budget</strong>: set for one level of activity and not changed.</li>
<li><strong>Flexible budget</strong>: adjusts costs to the activity level actually reached, so comparisons are fair.</li>
<li><strong>Zero-based budget</strong>: every expense must be justified from zero each period, rather than starting from last year's numbers.</li>
</ul>
<div class="tip"><p>Sales budget first. You can't plan production, materials or cash until you know how much you expect to sell.</p></div>`
      },
      {
        pi: 'FI:661',
        heading: 'Variance analysis',
        html: `<p>A <strong>variance</strong> is the difference between what actually happened and what was budgeted. <strong>Variance analysis</strong> means calculating those differences, figuring out why they happened, and deciding what to do about them.</p>
<div class="formula">Variance = Actual − Budgeted (or standard)</div>
<ul>
<li>A <strong>favorable (F)</strong> variance helps profit: actual costs <em>below</em> budget, or actual revenue <em>above</em> budget.</li>
<li>An <strong>unfavorable (U)</strong> variance hurts profit: actual costs <em>above</em> budget, or actual revenue <em>below</em> budget.</li>
</ul>
<div class="example"><h4>Example</h4><p>A furniture maker budgeted $10,000 for wood this month and actually spent $11,200. The variance is $1,200 <strong>unfavorable</strong>. Digging in, managers find wood prices rose, which is a <em>price</em> variance, and a new worker wasted boards, which is a <em>quantity</em> (efficiency) variance.</p></div>
<p>Cost variances are often split into two parts:</p>
<ul>
<li><strong>Price (rate) variance</strong>: did we pay more or less per unit of input than the standard?</li>
<li><strong>Quantity (efficiency or usage) variance</strong>: did we use more or less input than the standard allowed?</li>
</ul>
<p>Comparing actual costs to a <strong>flexible budget</strong> is fairer than comparing to a static one. If a company sold 20% more units than planned, its materials cost <em>should</em> be higher. That isn't poor control.</p>
<p>Managers practice <strong>management by exception</strong>: they investigate large or unusual variances and don't waste time on tiny ones. "Favorable" isn't always good news, either. Spending less on maintenance than budgeted looks favorable now but might cause breakdowns later.</p>`
      }
    ],
    keyTerms: [
      { term: 'Master budget', def: 'A complete set of linked budgets, starting with the sales budget and ending with budgeted financial statements.' },
      { term: 'Standard cost', def: 'The expected cost of materials, labor and overhead per unit under normal conditions.' },
      { term: 'Flexible budget', def: 'A budget that adjusts costs to the actual level of activity achieved.' },
      { term: 'Zero-based budget', def: 'A budget in which every expense must be justified from zero each period.' },
      { term: 'Variance', def: 'The difference between an actual result and the budgeted or standard amount.' },
      { term: 'Favorable variance', def: 'A variance that increases profit, such as costs below budget or revenue above budget.' },
      { term: 'Management by exception', def: 'Focusing management attention on large or unusual variances.' }
    ],
    traps: [
      'The sales budget comes first in the master budget, not the cash budget.',
      'Actual cost above budget is unfavorable; actual revenue above budget is favorable.',
      'A static budget can make variances look worse or better than they really are when volume changes.'
    ],
    explainer: null,
    video: null,
    caseFrequent: false
  },
  // ---------------------------------------------------------------- FM 1
  {
    id: 'fm-fim-function',
    area: 'FM',
    title: 'The financial-information management function: scope, ethics and technology',
    pis: ['FM:002', 'FM:003', 'FM:011'],
    minutes: 9,
    sections: [
      {
        pi: 'FM:002',
        heading: 'What financial-information management covers',
        html: `<p>Every business runs on a handful of core functions: marketing, operations, human resources, management, and <strong>financial-information management (FIM)</strong>. FIM is the function that <strong>collects, records, processes, stores, analyzes and reports</strong> a business's financial data so people can make sound decisions.</p>
<p>Its scope includes:</p>
<ul>
<li><strong>Accounting</strong>: recording transactions and preparing financial statements.</li>
<li><strong>Budgeting and forecasting</strong>: planning future revenue, costs and cash.</li>
<li><strong>Financial analysis</strong>: ratios, trends and comparisons to judge performance.</li>
<li><strong>Cash management</strong>: accounts receivable, accounts payable, payroll.</li>
<li><strong>Tax records and compliance reporting</strong>.</li>
<li><strong>Internal controls</strong>: protecting assets and keeping records accurate.</li>
<li><strong>Financial planning</strong>: deciding how to raise and invest money.</li>
</ul>
<p>FIM serves two audiences. <strong>Internal users</strong> (managers, department heads, employees) use it to plan, set prices, control costs and evaluate performance. <strong>External users</strong> (investors, lenders, government agencies, suppliers) use it to decide whether to invest, lend, tax or extend credit.</p>
<div class="example"><h4>Example</h4><p>A regional bank's FIM team closes the books each month, prepares reports for regulators, builds next year's budget, and gives branch managers a dashboard of loan volume and expenses. When the marketing team asks whether a new promotion paid off, FIM supplies the numbers.</p></div>
<p>On the exam, watch for distractors that name other functions. Buying supplies is purchasing, persuading customers is selling, and deciding what features a product has is product management. Recording, analyzing and reporting financial data is FIM.</p>
<div class="tip"><p>FIM in five verbs: collect, record, analyze, report, protect.</p></div>`
      },
      {
        pi: 'FM:003',
        heading: 'Ethics in financial-information management',
        html: `<p>Financial information is only useful if people can <strong>trust</strong> it. Investors, lenders, employees and regulators all rely on numbers they can't check themselves. That makes ethics central to FIM.</p>
<p>Key ethical duties:</p>
<ul>
<li><strong>Accuracy and honesty</strong>: record transactions truthfully and in the right period. Don't "cook the books" by inflating revenue, hiding expenses or delaying bad news.</li>
<li><strong>Confidentiality</strong>: protect customer, employee and company financial data. Share it only with people authorized to see it.</li>
<li><strong>Objectivity</strong>: avoid conflicts of interest, such as approving payments to a relative's company.</li>
<li><strong>Transparency</strong>: give complete, understandable disclosures, not technically true reports that mislead.</li>
<li><strong>Compliance</strong>: follow GAAP, tax law and securities rules.</li>
</ul>
<p>The <strong>fraud triangle</strong> explains why people commit financial fraud. It takes <strong>pressure</strong> (a need or incentive, such as hitting a bonus target), <strong>opportunity</strong> (weak controls) and <strong>rationalization</strong> ("I'll pay it back"). Businesses fight fraud mainly by removing opportunity with controls like <strong>segregation of duties</strong>, so the same person can't both approve and record a payment.</p>
<p>After the Enron and WorldCom accounting scandals, the <strong>Sarbanes-Oxley Act (2002)</strong> required CEOs and CFOs of public companies to certify their financial statements and created the PCAOB to oversee auditors. Many companies also protect <strong>whistleblowers</strong> who report wrongdoing.</p>
<div class="example"><h4>Example</h4><p>Jordan, a staff accountant, is asked by his manager to record next month's sales this month so the team hits its quarterly goal. Recording revenue in the wrong period misstates results. The ethical response is to decline and, if pressure continues, report it through the company's ethics channel.</p></div>`
      },
      {
        pi: 'FM:011',
        heading: 'Technology in financial-information management',
        html: `<p>Technology has turned FIM from paper ledgers into real-time systems. The main tools you should know:</p>
<ul>
<li><strong>Accounting software</strong> records transactions, produces financial statements automatically, and handles invoicing and payroll.</li>
<li><strong>Enterprise resource planning (ERP) systems</strong> connect finance with purchasing, inventory, sales and HR in one shared database, so a sale updates inventory and revenue at once.</li>
<li><strong>Spreadsheets</strong> are the go-to tool for budgets, forecasts and "what-if" analysis.</li>
<li><strong>Cloud computing</strong> lets teams access financial data from anywhere and reduces hardware costs.</li>
<li><strong>Data analytics and dashboards</strong> turn large amounts of data into visual summaries of key numbers.</li>
<li><strong>Automation and artificial intelligence</strong> handle routine tasks such as matching invoices to payments, and flag unusual transactions that may be fraud.</li>
<li><strong>Electronic payments</strong> (ACH transfers, direct deposit, online bill pay) speed up cash flow and reduce paperwork.</li>
</ul>
<p><strong>Benefits:</strong> speed, accuracy, fewer manual errors, better forecasting, and real-time information for decisions.</p>
<p><strong>Risks and controls:</strong> technology creates new risks, including cyberattacks, ransomware, phishing and data breaches. FIM teams protect data with <strong>access controls</strong> (only authorized users), <strong>multi-factor authentication</strong>, <strong>encryption</strong>, <strong>firewalls</strong>, regular <strong>backups</strong>, and audit trails that record who changed what. Financial institutions must also follow privacy rules, such as giving customers GLBA privacy notices.</p>
<div class="example"><h4>Example</h4><p>A retailer moves from spreadsheets to an ERP system. Now when a store sells a jacket, inventory drops, revenue posts to the ledger, and the CFO's dashboard updates the same day. Month-end closing shrinks from ten days to three.</p></div>`
      }
    ],
    keyTerms: [
      { term: 'Financial-information management', def: 'The business function that collects, records, analyzes and reports financial data for decision making.' },
      { term: 'Internal users', def: 'People inside a business, such as managers, who use financial information to plan and control.' },
      { term: 'External users', def: 'Outsiders such as investors, lenders and regulators who use a company’s financial information.' },
      { term: 'Fraud triangle', def: 'The three conditions behind most fraud: pressure, opportunity and rationalization.' },
      { term: 'Segregation of duties', def: 'An internal control that splits key tasks among different people so no one person controls a whole transaction.' },
      { term: 'ERP system', def: 'Enterprise resource planning software that links finance, inventory, sales and HR in one database.' },
      { term: 'Encryption', def: 'Scrambling data so only authorized users with the key can read it.' }
    ],
    traps: [
      'Purchasing, selling and product management are separate business functions, not financial-information management.',
      'Recording revenue in an earlier period to hit a goal is unethical, even if the sale is expected.',
      'Segregation of duties removes opportunity, one side of the fraud triangle.'
    ],
    explainer: null,
    video: 'v-fic-fim',
    caseFrequent: false
  },

  // ---------------------------------------------------------------- FM 2
  {
    id: 'fm-analysis-applications',
    area: 'FM',
    title: 'Budgeting, financial analysis and customer financial information',
    pis: ['FM:013', 'FM:014', 'FM:009', 'FM:016'],
    minutes: 12,
    sections: [
      {
        pi: 'FM:013',
        heading: 'Budgeting applications',
        html: `<p>Knowing what a budget is isn't enough. FM:013 asks you to <em>use</em> budgets. Businesses apply budgeting in several ways:</p>
<ul>
<li><strong>Operating budgets</strong> plan revenue and expenses for the coming year, department by department.</li>
<li><strong>Cash budgets</strong> map when money arrives and leaves, so the business can arrange a line of credit before a shortfall, or invest a surplus.</li>
<li><strong>Capital budgets</strong> evaluate big long-term purchases, like a new building or equipment.</li>
<li><strong>Budgets as control tools</strong>: comparing actual results to the budget reveals problems early.</li>
</ul>
<div class="formula">Cash budget: Beginning cash + Cash receipts − Cash payments = Ending cash</div>
<div class="example"><h4>Example</h4><p>A landscaping company starts April with $8,000 in cash, expects $22,000 in customer payments and $27,000 in payments for wages, fuel and equipment. Ending cash = 8,000 + 22,000 − 27,000 = <strong>$3,000</strong>. If it wants at least $5,000 on hand, it should plan to borrow about $2,000 or delay a purchase.</p></div>
<h4>Capital budgeting basics</h4>
<ul>
<li><strong>Payback period</strong> = initial investment ÷ yearly cash inflow (when inflows are even). A $10,000 machine that brings in $4,000 a year pays back in 2.5 years. Payback is simple but ignores the time value of money and any cash after payback.</li>
<li><strong>Net present value (NPV)</strong> discounts future cash flows to today and subtracts the cost. Accept projects with a positive NPV. That same $10,000 machine, at a 10% required return for 3 years, has an NPV of about −$53, so it should be rejected even though its payback looks quick.</li>
</ul>
<p>Good budgets are realistic, involve the managers who must meet them, and get revised when conditions change.</p>`
      },
      {
        pi: 'FM:014',
        heading: 'Financial analysis applications',
        html: `<p><strong>Financial analysis</strong> turns financial statements into answers: Is the company healthy? Is it improving? How does it compare with rivals? The main tool is <strong>ratio analysis</strong>.</p>
<table>
<thead><tr><th>Question</th><th>Ratio</th><th>Formula</th></tr></thead>
<tbody>
<tr><td>Can it pay short-term bills? (liquidity)</td><td>Current ratio</td><td>Current assets ÷ Current liabilities</td></tr>
<tr><td>Liquidity without inventory</td><td>Quick ratio</td><td>(Current assets − Inventory) ÷ Current liabilities</td></tr>
<tr><td>How much debt? (leverage)</td><td>Debt-to-equity</td><td>Total liabilities ÷ Total equity</td></tr>
<tr><td>How profitable?</td><td>Net profit margin</td><td>Net income ÷ Revenue</td></tr>
<tr><td>How well are assets used?</td><td>Return on assets (ROA)</td><td>Net income ÷ Total assets</td></tr>
<tr><td>Return to owners</td><td>Return on equity (ROE)</td><td>Net income ÷ Total equity</td></tr>
<tr><td>How fast does stock sell?</td><td>Inventory turnover</td><td>Cost of goods sold ÷ Average inventory</td></tr>
</tbody>
</table>
<div class="example"><h4>Example</h4><p>A store has current assets of $150,000 and current liabilities of $75,000. Current ratio = 150,000 ÷ 75,000 = <strong>2.0</strong>, so it has $2 of short-term assets for every $1 of short-term debt. Net income of $30,000 on revenue of $400,000 gives a net margin of <strong>7.5%</strong>.</p></div>
<p>Other techniques:</p>
<ul>
<li><strong>Horizontal (trend) analysis</strong> compares the same item across years, such as revenue growth of 12%.</li>
<li><strong>Vertical (common-size) analysis</strong> shows each item as a percent of a base, such as every expense as a percent of sales.</li>
<li><strong>Benchmarking</strong> compares ratios with competitors or industry averages.</li>
</ul>
<p>A ratio means little alone. Interpret it against trends and industry norms. A very high current ratio may signal idle cash or excess inventory, not just strength.</p>`
      },
      {
        pi: 'FM:009',
        heading: 'Analyzing customer financial information',
        html: `<p>Lenders, banks, and businesses that sell on credit all need to judge whether a customer can and will pay. That's <strong>credit analysis</strong>, and it's what FM:009 is about.</p>
<h4>The 5 Cs of credit</h4>
<ul>
<li><strong>Character</strong>: track record of repaying debts, shown in the credit history.</li>
<li><strong>Capacity</strong>: ability to repay from income compared with existing debts. Often seen as the most important C.</li>
<li><strong>Capital</strong>: the borrower's own savings, investments or net worth.</li>
<li><strong>Collateral</strong>: assets pledged to secure the loan, like a car or house.</li>
<li><strong>Conditions</strong>: the loan's purpose and the economy, the factor the borrower controls least.</li>
</ul>
<h4>Tools for individual customers</h4>
<ul>
<li><strong>Credit reports and scores.</strong> FICO scores weight payment history 35%, amounts owed 30%, length of history 15%, new credit 10% and credit mix 10%.</li>
<li><strong>Debt-to-income (DTI) ratio</strong> = monthly debt payments ÷ gross monthly income. Lower is better.</li>
<li>Pay stubs, tax returns and bank statements to verify income and assets.</li>
</ul>
<div class="example"><h4>Example</h4><p>Leah earns $5,000 a month before taxes and pays $1,500 a month on a car loan and student loans. Her DTI is 1,500 ÷ 5,000 = <strong>30%</strong>. A lender compares that with its own guidelines when deciding on her mortgage application.</p></div>
<h4>Tools for business customers</h4>
<ul>
<li>Financial statements and ratios (current ratio, debt-to-equity, cash flow).</li>
<li>Business credit reports and trade references from suppliers.</li>
<li><strong>Accounts receivable aging</strong>: sorting unpaid customer invoices by how long they're overdue to spot slow payers.</li>
</ul>
<p>All of this must be done fairly and privately. The Equal Credit Opportunity Act bars discrimination based on race, color, religion, national origin, sex, marital status, age or receipt of public assistance.</p>`
      },
      {
        pi: 'FM:016',
        heading: 'Non-traditional uses of financial information',
        html: `<p>Financial information isn't only for financial statements. FM:016 names four newer ways businesses use it.</p>
<ul>
<li><strong>Lean</strong>: a management approach that eliminates <em>waste</em>, meaning anything customers wouldn't pay for, such as excess inventory, waiting, extra steps and defects. Financial data measures what waste costs and tracks the savings from removing it.</li>
<li><strong>Six Sigma</strong>: a data-driven method for cutting defects and variation. Its steps are <strong>DMAIC</strong>: Define, Measure, Analyze, Improve, Control. Financial information puts a dollar value on defects, such as the cost of a loan-processing error, and shows a project's payoff.</li>
<li><strong>Activity-based costing (ABC)</strong>: assigns overhead to products or customers based on the <em>activities</em> they actually use, each with its own cost driver, such as number of setups or customer service calls. ABC often reveals that some "profitable" products or customers are actually money-losers.</li>
<li><strong>Sustainability reporting</strong>: reporting environmental, social and governance results, such as energy use, emissions, waste, worker safety and community impact, alongside financial results. The idea is sometimes called the <strong>triple bottom line</strong>: people, planet, profit.</li>
</ul>
<div class="example"><h4>Example</h4><p>A bank uses ABC and finds that small checking accounts that require frequent branch visits cost more to serve than they earn. Instead of dropping those customers, it promotes its mobile app, which lowers the cost per transaction. That's financial information driving an operational decision.</p></div>
<div class="tip"><p>Lean cuts waste. Six Sigma cuts defects. ABC follows activities. Sustainability reporting adds people and planet to profit.</p></div>`
      }
    ],
    keyTerms: [
      { term: 'Cash budget', def: 'A plan of expected cash receipts and payments that shows ending cash and borrowing needs.' },
      { term: 'Payback period', def: 'The time needed for an investment’s cash inflows to repay its cost.' },
      { term: 'Current ratio', def: 'Current assets divided by current liabilities; measures short-term liquidity.' },
      { term: 'Horizontal analysis', def: 'Comparing financial statement items across several periods to find trends.' },
      { term: 'Vertical analysis', def: 'Showing each statement item as a percent of a base figure, such as total sales.' },
      { term: '5 Cs of credit', def: 'Character, capacity, capital, collateral and conditions: factors used to judge a borrower.' },
      { term: 'Debt-to-income ratio', def: 'Monthly debt payments divided by gross monthly income.' },
      { term: 'Activity-based costing', def: 'A costing method that assigns overhead based on the activities products or customers use.' },
      { term: 'Six Sigma', def: 'A data-driven quality method that reduces defects using the DMAIC steps.' },
      { term: 'Sustainability reporting', def: 'Disclosing environmental, social and governance performance along with financial results.' }
    ],
    traps: [
      'Capacity is ability to repay; collateral is the asset pledged. Don’t mix them up.',
      'A short payback period does not guarantee a positive NPV.',
      'Lean focuses on eliminating waste, while Six Sigma focuses on reducing defects and variation.',
      'A ratio means little without a trend or an industry comparison.'
    ],
    explainer: 'ratios',
    video: null,
    caseFrequent: false
  },
  // ---------------------------------------------------------------- RM 1
  {
    id: 'rm-ethics-tech-legal',
    area: 'RM',
    title: 'Risk management: ethics, technology and legal considerations',
    pis: ['RM:041', 'RM:042', 'RM:043'],
    minutes: 9,
    sections: [
      {
        pi: 'RM:041',
        heading: 'The role of ethics in risk management',
        html: `<p>Risk management is about protecting people, money and reputation. Doing it <strong>ethically</strong> means being honest about risks, even when the truth is inconvenient.</p>
<p>Ethical issues risk managers face:</p>
<ul>
<li><strong>Honest disclosure</strong>: reporting risks fully to the board, regulators and customers instead of downplaying them to protect a bonus or stock price.</li>
<li><strong>Conflicts of interest</strong>: a manager paid on short-term profits may be tempted to ignore long-term risks.</li>
<li><strong>Fair treatment</strong>: insurers and lenders must price risk fairly and avoid illegal discrimination.</li>
<li><strong>Protecting stakeholders</strong>: not cutting safety corners to save money when employees or customers could be harmed.</li>
<li><strong>Moral hazard</strong>: people or firms acting more recklessly because someone else bears the loss, such as a bank taking big gambles because it expects a rescue.</li>
</ul>
<p>Ethics is also a <em>source</em> of risk. Unethical behavior creates <strong>reputational risk</strong>, lawsuits, fines and lost customers. That's why strong organizations build an ethical culture with a <strong>code of ethics</strong>, training, <strong>"tone at the top"</strong> (leaders modeling ethical behavior), anonymous reporting hotlines, and protection for whistleblowers.</p>
<div class="example"><h4>Example</h4><p>Danielle, a bank risk analyst, discovers that a popular loan product has default rates far above what was reported to senior management. Her boss suggests waiting until after the quarterly results to mention it. Ethical risk management means escalating the finding now, because hiding a known risk leaves leaders and investors making decisions on false information.</p></div>
<div class="tip"><p>On the exam, the ethical choice is usually the one that is transparent, protects stakeholders, and follows policy, not the one that looks best this quarter.</p></div>`
      },
      {
        pi: 'RM:042',
        heading: 'Technology in risk management',
        html: `<p>Technology helps businesses <strong>identify, measure, monitor and respond to</strong> risk faster and more precisely. It also creates brand-new risks that must be managed.</p>
<h4>Technology as a risk-management tool</h4>
<ul>
<li><strong>Data analytics and predictive modeling</strong>: crunching historical data to estimate how likely and how costly losses are. Insurers' actuaries and banks' credit models rely on this.</li>
<li><strong>Artificial intelligence and machine learning</strong>: flagging unusual credit card transactions in real time to stop fraud.</li>
<li><strong>Risk management information systems (RMIS)</strong>: software that tracks incidents, claims, insurance policies and risk registers in one place.</li>
<li><strong>Dashboards and heat maps</strong>: visual displays of the top risks for executives and the board.</li>
<li><strong>Telematics</strong>: devices in vehicles that record driving behavior so auto insurers can price risk more accurately and fleets can coach drivers.</li>
<li><strong>Mapping and catastrophe models</strong>: estimating exposure to floods, hurricanes or wildfires by location.</li>
<li><strong>Security technology</strong>: cameras, access cards, encryption, multi-factor authentication and backups.</li>
</ul>
<h4>Technology as a source of risk</h4>
<p><strong>Cyber risk</strong>, including data breaches, ransomware, phishing and system outages, is now one of the biggest risks businesses face. Relying on outside technology vendors adds <strong>third-party risk</strong>. Businesses respond with cybersecurity programs, employee training, incident-response plans and <strong>cyber liability insurance</strong>.</p>
<div class="example"><h4>Example</h4><p>A credit union's fraud system notices a member's debit card being used in two distant states within an hour. It automatically blocks the card and texts the member. Technology reduced the loss before it grew.</p></div>`
      },
      {
        pi: 'RM:043',
        heading: 'Legal considerations affecting risk management',
        html: `<p>Laws shape risk management in two ways: they <strong>create</strong> risks, such as fines and lawsuits for breaking rules, and they <strong>provide tools</strong>, such as contracts, for managing risk.</p>
<h4>Legal risks businesses manage</h4>
<ul>
<li><strong>Liability</strong>: being legally responsible for harm to others. Negligence, meaning failing to use reasonable care, is the most common basis for lawsuits, such as a customer slipping on an unmarked wet floor.</li>
<li><strong>Regulatory compliance</strong>: workplace safety rules (OSHA), privacy rules (financial institutions' GLBA privacy notices), anti-money-laundering rules under the Bank Secrecy Act (such as reporting cash transactions over $10,000), and the internal-control requirements of Sarbanes-Oxley for public companies.</li>
<li><strong>Required insurance</strong>: most states require workers' compensation coverage for employees and liability coverage for drivers.</li>
</ul>
<h4>Legal tools for managing risk</h4>
<ul>
<li><strong>Contracts</strong> can shift risk. An <strong>indemnity</strong> or <strong>hold-harmless clause</strong> makes one party responsible for certain losses of the other.</li>
<li><strong>Waivers and releases</strong> ask participants to accept certain risks, though they don't excuse every kind of negligence.</li>
<li><strong>Choice of business ownership form</strong>: corporations and LLCs give owners limited liability.</li>
<li><strong>Insurance contracts</strong> transfer risk. In the U.S., insurance is regulated mainly by the <strong>states</strong> under the McCarran-Ferguson Act (1945), with the NAIC coordinating state regulators.</li>
</ul>
<div class="example"><h4>Example</h4><p>A gym requires members to sign a waiver, trains staff on equipment safety, keeps inspection logs, and carries general liability insurance. If a member is hurt, those records show the gym used reasonable care, and the insurance handles costs the gym can't avoid.</p></div>
<div class="tip"><p>Compliance with the law is the minimum. Good risk management goes beyond what's legally required.</p></div>`
      }
    ],
    keyTerms: [
      { term: 'Reputational risk', def: 'The chance of losing customers, value or trust because of damage to an organization’s reputation.' },
      { term: 'Tone at the top', def: 'The ethical climate set by an organization’s leaders through their words and actions.' },
      { term: 'Moral hazard', def: 'The tendency to take more risk when someone else bears the cost of losses.' },
      { term: 'Predictive modeling', def: 'Using historical data and statistics to forecast the likelihood and size of future losses.' },
      { term: 'Cyber risk', def: 'The risk of loss from data breaches, hacking, ransomware or technology failures.' },
      { term: 'Negligence', def: 'Failure to use the care a reasonable person would use, causing harm to another.' },
      { term: 'Hold-harmless clause', def: 'A contract provision in which one party agrees to bear certain losses or claims of another party.' },
      { term: 'McCarran-Ferguson Act', def: 'The 1945 law leaving insurance regulation mainly to the states.' }
    ],
    traps: [
      'Insurance in the U.S. is regulated mainly by the states, not a single federal agency.',
      'Technology is both a tool for managing risk and a source of new risks like cyberattacks.',
      'Hiding a known risk to protect short-term results is an ethics failure, even if no law is broken.'
    ],
    explainer: null,
    video: null,
    caseFrequent: false
  },

  // ---------------------------------------------------------------- RM 2
  {
    id: 'rm-control-erm',
    area: 'RM',
    title: 'Risk control and enterprise risk management',
    pis: ['RM:058', 'RM:062'],
    minutes: 8,
    sections: [
      {
        pi: 'RM:058',
        heading: 'Risk control: internal and external',
        html: `<p><strong>Risk control</strong> covers the actions an organization takes to make losses <em>less likely</em> (<strong>loss prevention</strong>) or <em>less severe</em> when they happen (<strong>loss reduction</strong>). Locking the vault prevents theft. Sprinklers don't prevent fires, but they reduce the damage.</p>
<p>Risk controls are often grouped by where they come from.</p>
<h4>Internal risk controls</h4>
<p>These are designed and run by the organization itself:</p>
<ul>
<li>Policies, procedures and approval limits</li>
<li><strong>Segregation of duties</strong>, so no single person controls a whole transaction</li>
<li>Employee screening, training and safety programs</li>
<li>Physical security such as locks, cameras and access badges</li>
<li>Reconciliations and <strong>internal audits</strong></li>
<li>Cybersecurity measures and data backups</li>
</ul>
<h4>External risk controls</h4>
<p>These come from or rely on parties outside the organization:</p>
<ul>
<li>Government laws, regulations and examinations, such as bank examiners reviewing a bank's loans</li>
<li><strong>External audits</strong> by independent CPA firms</li>
<li>Requirements set by insurance companies, such as installing alarms to get coverage</li>
<li>Industry standards and contracts with vendors and partners</li>
</ul>
<p>Risks themselves can also be described as internal (employee errors, fraud, equipment failure) or external (recessions, natural disasters, new competitors, changing laws). A business can usually control internal risks more directly. For external risks it often relies on monitoring, contingency plans and transferring the risk through insurance.</p>
<div class="example"><h4>Example</h4><p>A bank requires two employees to open the vault (internal control), follows anti-money-laundering rules checked by federal examiners (external control), and has its statements reviewed by an outside audit firm (external control).</p></div>`
      },
      {
        pi: 'RM:062',
        heading: 'Enterprise risk management (ERM)',
        html: `<p>Traditionally, each department handled its own risks in a <strong>silo</strong>. The safety manager worried about injuries, the treasurer about interest rates, IT about hackers, and nobody saw the whole picture. <strong>Enterprise risk management (ERM)</strong> is the integrated, organization-wide approach that manages <em>all</em> of a company's risks together, as a portfolio, in line with its strategy.</p>
<h4>What makes ERM different</h4>
<ul>
<li><strong>Enterprise-wide</strong>: covers strategic, financial, operational, compliance and reputational risks across every unit.</li>
<li><strong>Connected</strong>: looks at how risks interact. A cyberattack, for example, can create operational, legal and reputational losses at once.</li>
<li><strong>Tied to strategy</strong>: considers risks to goals and also opportunities, since some risks are worth taking.</li>
<li><strong>Top-down oversight</strong>: the board of directors oversees risk, often with a <strong>chief risk officer (CRO)</strong> leading the program.</li>
</ul>
<h4>Key ERM tools and terms</h4>
<ul>
<li><strong>Risk appetite</strong>: how much risk the organization is willing to accept to reach its goals.</li>
<li><strong>Risk tolerance</strong>: the acceptable variation around specific targets.</li>
<li><strong>Risk register</strong>: a list of identified risks with owners, ratings and responses.</li>
<li><strong>Heat map</strong>: a chart that plots risks by likelihood and impact.</li>
<li>Widely used frameworks include COSO's ERM framework and the ISO 31000 standard.</li>
</ul>
<p>The ERM cycle: identify risks → assess likelihood and impact → choose responses (avoid, reduce, transfer, accept) → implement → monitor and report.</p>
<div class="example"><h4>Example</h4><p>A bank's FTDM-style briefing might group its risks as credit, interest-rate, operational, regulatory and strategic. Under ERM, one committee ranks them together and sees that rising rates increase both interest-rate risk and credit risk, because borrowers struggle with higher payments.</p></div>`
      }
    ],
    keyTerms: [
      { term: 'Risk control', def: 'Actions that reduce the likelihood (loss prevention) or severity (loss reduction) of losses.' },
      { term: 'Internal control', def: 'A policy or procedure an organization designs and runs itself to protect assets and ensure accurate records.' },
      { term: 'External control', def: 'A control coming from outside the organization, such as regulation, external audit or insurer requirements.' },
      { term: 'Enterprise risk management', def: 'An integrated, organization-wide approach to managing all risks together in line with strategy.' },
      { term: 'Risk appetite', def: 'The amount of risk an organization is willing to accept in pursuit of its goals.' },
      { term: 'Risk register', def: 'A document listing identified risks with their ratings, owners and planned responses.' },
      { term: 'Heat map', def: 'A visual grid plotting risks by likelihood and impact.' },
      { term: 'Chief risk officer', def: 'The executive responsible for leading an organization’s risk management program.' }
    ],
    traps: [
      'ERM is enterprise-wide and integrated; managing risks department by department is the silo approach it replaces.',
      'An internal audit is an internal control; an independent CPA audit is an external control.',
      'Loss prevention lowers how often losses happen; loss reduction lowers how bad they are.'
    ],
    explainer: null,
    video: null,
    caseFrequent: false
  },

  // ---------------------------------------------------------------- SM 1
  {
    id: 'sm-management-risk',
    area: 'SM',
    title: 'Management, the business environment and risk management',
    pis: ['SM:001', 'SM:100', 'SM:075', 'SM:076'],
    minutes: 14,
    sections: [
      {
        pi: 'SM:001',
        heading: 'The concept of management',
        html: `<p><strong>Management</strong> is the process of reaching an organization's goals by using its resources (people, money, equipment, information and time) effectively and efficiently. <em>Effective</em> means reaching the goal. <em>Efficient</em> means not wasting resources along the way.</p>
<h4>The functions of management</h4>
<ul>
<li><strong>Planning</strong>: setting goals and deciding how to reach them.</li>
<li><strong>Organizing</strong>: arranging tasks, people and resources, and deciding who reports to whom.</li>
<li><strong>Staffing</strong>: recruiting, hiring and training the right people. Some texts fold this into organizing.</li>
<li><strong>Leading (directing)</strong>: motivating, guiding and communicating with employees.</li>
<li><strong>Controlling</strong>: setting standards, measuring performance, comparing results to the plan and correcting problems.</li>
</ul>
<h4>Levels of management</h4>
<ul>
<li><strong>Top management</strong> (CEO, CFO, presidents) sets long-term, <strong>strategic</strong> direction.</li>
<li><strong>Middle management</strong> (regional and department managers) turns strategy into medium-term <strong>tactical</strong> plans.</li>
<li><strong>Supervisory or first-line management</strong> (team leaders, branch supervisors) directs daily, <strong>operational</strong> work.</li>
</ul>
<p>In a well-governed company, the <strong>board of directors</strong> oversees top management and sets broad direction, while management runs the business day to day.</p>
<div class="example"><h4>Example</h4><p>A bank's branch manager plans a goal of opening 40 new accounts this quarter, organizes staff schedules, trains a new teller, encourages the team at morning huddles, and checks progress weekly against the goal. She just used every function of management.</p></div>
<div class="tip"><p>Remember "POSLC": plan, organize, staff, lead, control.</p></div>`
      },
      {
        pi: 'SM:100',
        heading: 'Factors that affect management',
        html: `<p>Managers don't make decisions in a vacuum. Forces inside and outside the organization shape what they can and should do.</p>
<h4>Internal factors (inside the organization)</h4>
<ul>
<li><strong>Resources</strong>: available money, equipment, technology and time.</li>
<li><strong>Employees</strong>: their skills, experience, motivation and diversity.</li>
<li><strong>Organizational culture</strong>: shared values and "how we do things here."</li>
<li><strong>Structure and policies</strong>: chain of command, rules and procedures.</li>
<li><strong>Mission, goals and ownership</strong>: what the owners and board want the business to achieve.</li>
</ul>
<h4>External factors (outside the organization)</h4>
<ul>
<li><strong>Economic</strong>: interest rates, inflation, unemployment, the business cycle.</li>
<li><strong>Political and legal</strong>: laws, regulations, taxes, trade policy.</li>
<li><strong>Social and cultural</strong>: changing customer values, demographics and lifestyles.</li>
<li><strong>Technological</strong>: new tools, automation, and disruption by fintech competitors.</li>
<li><strong>Competitive</strong>: rivals' prices, products and strategies.</li>
<li><strong>Global and environmental</strong>: international events, natural disasters, climate concerns.</li>
</ul>
<p>Managers scan these factors with tools like <strong>SWOT analysis</strong>, where strengths and weaknesses are <em>internal</em> and opportunities and threats are <em>external</em>, and <strong>PEST</strong> analysis (political, economic, social, technological).</p>
<div class="example"><h4>Example</h4><p>A credit union manager sees rising interest rates (economic), a new state data-privacy law (legal), younger members who want mobile-only banking (social and technological), and a fintech app offering higher savings rates (competitive). Each one changes her plans for the year.</p></div>
<div class="tip"><p>A competitor's new product is a <em>threat</em> (external), not a <em>weakness</em> (internal).</p></div>`
      },
      {
        pi: 'SM:075',
        heading: 'The nature of risk management',
        html: `<p><strong>Risk</strong> is the possibility of loss or injury. <strong>Risk management</strong> is the systematic process of identifying risks and deciding how to handle them so an organization or person can reach its goals while limiting losses.</p>
<h4>Kinds of risk</h4>
<ul>
<li><strong>Pure risk</strong>: only loss or no loss, never a gain. Examples are fire, theft, injury and death. Pure risks are generally <strong>insurable</strong>.</li>
<li><strong>Speculative risk</strong>: a chance of gain <em>or</em> loss, such as investing in stock or launching a product. Not insurable.</li>
<li>By cause: <strong>economic</strong> risks (recession, rate changes, competition), <strong>natural</strong> risks (storms, floods, earthquakes) and <strong>human</strong> risks (theft, errors, fraud, illness).</li>
<li>Financial institutions also name <strong>credit</strong>, <strong>interest-rate</strong>, <strong>operational</strong>, <strong>regulatory</strong> and <strong>strategic</strong> risk.</li>
</ul>
<h4>The four ways to handle risk</h4>
<table>
<thead><tr><th>Technique</th><th>Meaning</th><th>Example</th></tr></thead>
<tbody>
<tr><td>Avoid</td><td>Don't do the risky activity at all</td><td>Not building a branch in a flood zone</td></tr>
<tr><td>Reduce (control)</td><td>Lower the chance or size of loss</td><td>Security cameras, safety training, sprinklers</td></tr>
<tr><td>Transfer (share)</td><td>Shift the financial consequences to someone else</td><td>Buying insurance; a hold-harmless contract</td></tr>
<tr><td>Retain (accept)</td><td>Absorb the loss yourself</td><td>Self-insuring small losses; choosing a high deductible</td></tr>
</tbody>
</table>
<div class="tip"><p>Buying insurance is <strong>transfer</strong>, not reduction. Choosing a high deductible means <strong>retaining</strong> part of the risk.</p></div>`
      },
      {
        pi: 'SM:075',
        heading: 'Risk management in a client case: insurance and the process',
        html: `<p>Risk management is one of the most common case topics in FTDM, often paired with insurance needs and saving. Judges want to hear a clear <strong>process</strong> and a sensible match between each risk and its technique.</p>
<h4>The risk management process</h4>
<ol>
<li><strong>Identify</strong> risks: what could go wrong?</li>
<li><strong>Assess</strong> each one by <em>probability</em> (how likely) and <em>severity</em> (how costly).</li>
<li><strong>Choose a technique</strong>: avoid, reduce, transfer or retain.</li>
<li><strong>Implement</strong> the plan.</li>
<li><strong>Monitor and review</strong>, since risks change over time.</li>
</ol>
<p>A handy rule of thumb: <strong>high-severity, low-probability</strong> risks, like a house fire or the death of a parent, are usually best <strong>transferred</strong> with insurance. <strong>Low-severity, high-probability</strong> risks, like small repairs, are often <strong>retained</strong> with an emergency fund. Risks that are both likely and severe may need to be <strong>avoided</strong>.</p>
<p>Insurance vocabulary to use correctly: the <strong>premium</strong> is the price of coverage. The <strong>deductible</strong> is what you pay before the insurer pays, and a higher deductible lowers the premium. A <strong>copay</strong> is a flat dollar amount, while <strong>coinsurance</strong> is a percentage.</p>
<div class="example"><h4>Example</h4><p>The Nguyens are new parents with one income. Their risks: the earner dies or becomes disabled (rare but devastating, so transfer with term life and disability insurance), a car accident (transfer with auto liability coverage), and small unexpected bills (retain with a three-to-six-month emergency fund, a common guideline). They reduce risk by childproofing the house and keeping smoke detectors working.</p></div>
<p>Remember that insurance and investments are different tools. Insurance protects against pure risk. Investing takes on speculative risk in pursuit of growth.</p>`
      },
      {
        pi: 'SM:076',
        heading: 'Conducting a risk assessment of an event',
        html: `<p>A <strong>risk assessment</strong> is a structured look at what could go wrong with a specific event, how likely and serious each problem is, and what to do about it. Think of a concert, a charity 5K, a conference, or a bank's community financial-literacy fair.</p>
<h4>Steps</h4>
<ol>
<li><strong>Describe the event</strong>: date, location, expected attendance, activities, money handled.</li>
<li><strong>Identify hazards and risks</strong> in categories: weather, crowd safety and injuries, security and theft, financial (low ticket sales, cost overruns), legal (permits, liability), technology (ticketing or payment failures) and reputation.</li>
<li><strong>Rate each risk</strong> for likelihood and impact, often on a 1 to 5 scale. Multiply them, or plot them on a <strong>risk matrix</strong>, to rank priorities.</li>
<li><strong>Plan responses</strong> for the top risks: avoid, reduce, transfer or retain.</li>
<li><strong>Prepare contingency plans</strong> and assign responsibilities, such as a rain location, first-aid staff and evacuation routes.</li>
<li><strong>Document, communicate and monitor</strong> before, during and after the event.</li>
</ol>
<div class="example"><h4>Example</h4><p>A DECA chapter plans an outdoor fundraiser for 300 people.</p>
<ul>
<li>Rain: likelihood 3, impact 4, score 12. Response: book the gym as a backup (reduce).</li>
<li>Cash theft: likelihood 2, impact 3, score 6. Response: use card readers and a locked cash box with two-person counting (reduce).</li>
<li>Guest injury: likelihood 2, impact 5, score 10. Response: first-aid volunteer, clear walkways, and event liability coverage through the school (reduce and transfer).</li>
<li>Low turnout: likelihood 3, impact 3, score 9. Response: presales and social-media promotion (reduce), and keep upfront costs small (retain what's left).</li>
</ul>
<p>Rain ranks first, so the backup venue gets locked in early.</p></div>`
      }
    ],
    keyTerms: [
      { term: 'Management', def: 'Reaching organizational goals by planning, organizing, staffing, leading and controlling resources.' },
      { term: 'Controlling', def: 'The management function of setting standards, measuring performance and correcting deviations.' },
      { term: 'SWOT analysis', def: 'A review of internal strengths and weaknesses and external opportunities and threats.' },
      { term: 'Pure risk', def: 'A risk with only the possibility of loss or no loss; generally insurable.' },
      { term: 'Speculative risk', def: 'A risk with a chance of gain or loss; not insurable.' },
      { term: 'Risk transfer', def: 'Shifting the financial consequences of a risk to another party, such as an insurer.' },
      { term: 'Risk retention', def: 'Accepting and paying for a loss yourself, such as through a deductible or emergency fund.' },
      { term: 'Risk assessment', def: 'Identifying risks and rating their likelihood and impact to set priorities and responses.' },
      { term: 'Risk matrix', def: 'A grid that ranks risks by combining likelihood and impact.' },
      { term: 'Contingency plan', def: 'A backup plan prepared in advance in case a specific risk occurs.' }
    ],
    traps: [
      'Buying insurance transfers risk; it does not reduce the chance of loss.',
      'Speculative risks, like investing, cannot be insured; pure risks generally can.',
      'In SWOT, strengths and weaknesses are internal; opportunities and threats are external.',
      'A risk assessment ranks risks by both likelihood and impact, not likelihood alone.'
    ],
    explainer: null,
    video: 'v-fic-risk',
    caseFrequent: true
  }
];
