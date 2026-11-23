// fi-core lessons: Tier 1 Financial Analysis (FI) performance indicators.
// Time-sensitive figures are marked "as of 2026".

const money = {
  id: `fi-money`,
  area: `FI`,
  title: `Money: what it is, what it does and how we pay`,
  pis: [`FI:058`, `FI:059`, `FI:060`],
  minutes: 5,
  sections: [
    {
      pi: `FI:060`,
      heading: `The three jobs money does`,
      html: `<p>Before money existed, people bartered: you traded eggs for shoes, but only if the shoemaker happened to want eggs. Economists call that problem the <em>double coincidence of wants</em>. Money solves it by doing three jobs.</p>
<ul>
<li><strong>Medium of exchange.</strong> Everyone accepts money in trade, so you can sell your labor for dollars and spend those dollars on anything.</li>
<li><strong>Unit of measure</strong> (also called a unit of account or measure of value). Money gives us one common yardstick for value. A $30 shirt and a $90 pair of shoes can be compared instantly.</li>
<li><strong>Store of value.</strong> Money keeps its purchasing power over time, so you can earn today and spend next month. Inflation weakens this job, because rising prices mean each dollar buys a little less each year.</li>
</ul>
<p>For something to work well as money, it should have certain <strong>characteristics</strong>: it must be durable (does not fall apart), portable (easy to carry), divisible (can be broken into smaller amounts), uniform (every dollar is the same), limited in supply (scarce), and widely accepted.</p>
<div class="example"><h4>Example</h4><p>Jada checks prices for three phones listed at $399, $549 and $799. Comparing them in dollars is money acting as a <strong>unit of measure</strong>. When she pays with cash, it is a <strong>medium of exchange</strong>. The $200 she leaves in savings for next summer is money as a <strong>store of value</strong>.</p></div>
<div class="tip"><p>Memory aid: money lets you <strong>Buy</strong> (exchange), <strong>Compare</strong> (measure) and <strong>Keep</strong> (store).</p></div>`
    },
    {
      pi: `FI:059`,
      heading: `Types of currency in the United States`,
      html: `<p><strong>Currency</strong> is the physical form of money. In the United States it comes in two main forms:</p>
<ul>
<li><strong>Coins</strong> (pennies, nickels, dimes, quarters), made by the U.S. Mint.</li>
<li><strong>Paper money</strong>, called Federal Reserve notes, printed by the Bureau of Engraving and Printing and issued through the Federal Reserve. A <strong>banknote</strong> is a paper note issued by a bank that promises to pay the bearer. Today's U.S. dollar bills are banknotes issued by the nation's central bank.</li>
</ul>
<p>Modern U.S. money is <strong>fiat money</strong>: it has value because the government declares it <em>legal tender</em> (it must be accepted to pay debts) and because people trust it, not because it can be traded in for gold. Older systems used <strong>commodity money</strong>, such as gold or silver coins, whose material itself was valuable.</p>
<p>The PI also lists <strong>government bonds and treasury notes</strong>. These are not pocket cash. They are IOUs from the federal government: you lend the government money, and it promises to pay you back with interest. Treasury <em>bills</em> are short-term, Treasury <em>notes</em> are medium-term and Treasury <em>bonds</em> are long-term. Because they are backed by the U.S. government, they are considered among the safest investments and can be sold easily, which makes them "near money" for many investors.</p>
<div class="example"><h4>Example</h4><p>Marcus's grandmother gives him a government savings bond. It is not money he can spend at the store today, but it is a safe IOU from the U.S. Treasury that will pay interest and can later be cashed in.</p></div>`
    },
    {
      pi: `FI:058`,
      heading: `Forms of financial exchange: cash, checks, debit, credit and EFT`,
      html: `<p>A <strong>form of financial exchange</strong> is the way value moves from buyer to seller. Each form has trade-offs in speed, safety and cost.</p>
<table>
<thead><tr><th>Form</th><th>How it works</th><th>Key point</th></tr></thead>
<tbody>
<tr><td>Cash</td><td>Coins and bills handed over</td><td>Accepted almost everywhere, but no protection if lost or stolen</td></tr>
<tr><td>Check</td><td>Written order telling your bank to pay someone from your account</td><td>Leaves a paper record; can bounce if funds are short</td></tr>
<tr><td>Debit card</td><td>Takes money directly from your checking account</td><td>Spending your own money right now</td></tr>
<tr><td>Credit card</td><td>Borrows money from the card issuer, to be repaid later</td><td>Interest is charged if you do not pay the full balance</td></tr>
<tr><td>Electronic funds transfer (EFT)</td><td>Money moved electronically between accounts</td><td>Includes direct deposit, automatic bill pay, ACH transfers and wire transfers</td></tr>
</tbody>
</table>
<p>Other common forms include <strong>prepaid cards</strong> (loaded with a set amount in advance), <strong>mobile and digital payments</strong> through phone apps and digital wallets, and <strong>money orders</strong> or <strong>cashier's checks</strong>, which are guaranteed by the issuer and often required for large purchases like a car down payment.</p>
<div class="tip"><p>The big exam distinction: <strong>debit = your money now</strong>; <strong>credit = borrowed money you pay back later</strong>. Federal law generally gives credit cards stronger protection against unauthorized charges than debit cards, and with debit cards, how quickly you report a lost card matters a lot.</p></div>`
    }
  ],
  keyTerms: [
    { term: `Medium of exchange`, def: `Money's role as something everyone accepts in trade for goods and services.` },
    { term: `Unit of measure`, def: `Money's role as a common yardstick for comparing the value of different things.` },
    { term: `Store of value`, def: `Money's role in holding purchasing power so it can be spent later.` },
    { term: `Fiat money`, def: `Money that has value because the government declares it legal tender, not because it is backed by a commodity.` },
    { term: `Federal Reserve note`, def: `The official name for U.S. paper money.` },
    { term: `Electronic funds transfer (EFT)`, def: `Any electronic movement of money between accounts, such as direct deposit or automatic bill pay.` },
    { term: `Debit card`, def: `A card that takes money directly from your checking account at the time of purchase.` }
  ],
  traps: [
    `Mixing up debit and credit: a debit card spends money you already have; a credit card spends borrowed money.`,
    `Calling money's ability to compare prices a "store of value" — comparing prices is the unit-of-measure function.`,
    `Thinking U.S. dollars are backed by gold. Today's dollar is fiat money.`
  ],
  explainer: null,
  video: null,
  caseFrequent: false
};

const incomeTaxes = {
  id: `fi-income-taxes`,
  area: `FI`,
  title: `Income, paychecks and taxes`,
  pis: [`FI:061`, `FI:068`, `FI:067`, `FI:074`],
  minutes: 7,
  sections: [
    {
      pi: `FI:061`,
      heading: `Where income comes from`,
      html: `<p><strong>Income</strong> is money you receive. Most people earn it by working, but it can also come from money you already have.</p>
<ul>
<li><strong>Wages</strong>: pay per hour. Under federal law, covered hourly workers earn overtime of 1.5 times their regular rate for hours over 40 in a workweek.</li>
<li><strong>Salary</strong>: a fixed amount per year, paid in equal installments no matter how many hours you work.</li>
<li><strong>Commission</strong>: a percentage of what you sell, common in real estate and sales jobs.</li>
<li><strong>Tips, bonuses and piece-rate pay</strong> (pay per item produced).</li>
<li><strong>Self-employment income</strong>: profit from running your own business.</li>
</ul>
<p>Income earned by working is <strong>earned income</strong>. Income from money or property is often called <strong>unearned</strong> or <strong>passive income</strong>: interest from savings, dividends from stocks, rent from property and capital gains from selling investments for more than you paid. Government <strong>transfer payments</strong> such as Social Security or unemployment benefits are another source.</p>
<p><strong>Compensation</strong> is bigger than your paycheck. Employers also offer <strong>benefits</strong> such as health insurance, a retirement plan with an employer match, and paid time off. When comparing job offers, a slightly lower salary with strong benefits can be worth more.</p>
<div class="example"><h4>Example</h4><p>Luis earns $20 an hour and works 45 hours in one week. He gets 40 × $20 = $800 regular pay plus 5 × $30 = $150 overtime, for <strong>$950 gross pay</strong>.</p></div>`
    },
    {
      pi: `FI:068`,
      heading: `Reading a pay stub`,
      html: `<p>A <strong>pay stub</strong> is the statement that comes with each paycheck. It shows how your <strong>gross pay</strong> (everything you earned) turns into <strong>net pay</strong> (what you actually take home).</p>
<div class="formula">Gross pay − Deductions = Net pay</div>
<p>Common lines on a stub:</p>
<ul>
<li><strong>Federal income tax withholding</strong>, based on the W-4 you gave your employer.</li>
<li><strong>State and local income tax</strong>, where they apply.</li>
<li><strong>Social Security tax</strong>: 6.2% of wages, up to a yearly wage cap ($184,500 as of 2026).</li>
<li><strong>Medicare tax</strong>: 1.45% of all wages, with no cap. Social Security plus Medicare together are called <strong>FICA</strong>, a combined 7.65% for most employees. Your employer pays a matching amount.</li>
<li><strong>Voluntary deductions</strong>: retirement plan contributions such as a 401(k), health insurance premiums, union dues.</li>
<li><strong>Year-to-date (YTD)</strong> totals: everything earned or withheld so far this calendar year.</li>
</ul>
<div class="example"><h4>Example</h4><p>With $950 of gross pay, FICA is $950 × 7.65% = <strong>$72.68</strong> (Social Security $58.90 plus Medicare $13.78). If federal withholding is $70 and state tax is $25, net pay is $950 − $72.68 − $70 − $25 = <strong>$782.32</strong>.</p></div>
<div class="tip"><p>Check every stub: hours, pay rate and deductions. Payroll mistakes happen, and catching them early is your responsibility.</p></div>`
    },
    {
      pi: `FI:067`,
      heading: `The nature of tax liabilities`,
      html: `<p>A <strong>tax liability</strong> is the amount of tax you legally owe. Governments use taxes to pay for roads, schools, defense and social programs. The main taxes people face are:</p>
<ul>
<li><strong>Income tax</strong> (federal, and in most states, state) on wages and other income.</li>
<li><strong>Payroll taxes</strong> (FICA) for Social Security and Medicare.</li>
<li><strong>Sales tax</strong> on purchases, set by states and localities.</li>
<li><strong>Property tax</strong> on homes and land, usually funding local schools.</li>
<li><strong>Excise tax</strong> on specific goods such as gasoline and tobacco.</li>
</ul>
<p>Taxes are classified by how they relate to income. A <strong>progressive</strong> tax takes a larger percentage as income rises; the federal income tax is progressive, with seven brackets from 10% to 37% (as of 2026). A <strong>regressive</strong> tax takes a larger share of a low income, as sales taxes on necessities do. A <strong>proportional</strong> (flat) tax takes the same percentage from everyone.</p>
<p>The key idea about brackets: your <strong>marginal rate</strong> applies only to the dollars <em>inside</em> that bracket. Moving into a higher bracket never makes all of your income taxed at the higher rate. Your <strong>effective rate</strong> is total tax divided by income, and it is always lower than your top marginal rate.</p>
<div class="example"><h4>Example</h4><p>Priya gets a raise that pushes $1,000 of her income into the 22% bracket. Only that $1,000 is taxed at 22%, so her tax rises by $220, not by 22% of her whole income.</p></div>`
    },
    {
      pi: `FI:074`,
      heading: `Personal income tax forms`,
      html: `<p>Filing taxes means reporting your income and figuring out whether you owe more or get a refund. Know who fills out each form:</p>
<table>
<thead><tr><th>Form</th><th>Who completes it</th><th>Purpose</th></tr></thead>
<tbody>
<tr><td>W-4</td><td>Employee, given to the employer when hired</td><td>Tells the employer how much federal income tax to withhold</td></tr>
<tr><td>W-2</td><td>Employer, sent to employee and IRS by January 31</td><td>Reports a year's wages and taxes withheld</td></tr>
<tr><td>1099</td><td>A payer other than an employer</td><td>Reports other income, such as freelance pay (1099-NEC) or bank interest (1099-INT)</td></tr>
<tr><td>1040</td><td>The taxpayer</td><td>The individual income tax return, normally due April 15</td></tr>
</tbody>
</table>
<p>The basic flow of a 1040: total income, minus certain adjustments, minus either the <strong>standard deduction</strong> or your <strong>itemized deductions</strong> (whichever is larger) equals <strong>taxable income</strong>. For tax year 2026 the standard deduction is $16,100 for single filers and $32,200 for married couples filing jointly (as of 2026). Tax is figured on taxable income, then <strong>credits</strong> are subtracted. Compare the result with what was withheld: overpay and you get a <strong>refund</strong>; underpay and you owe the difference.</p>
<div class="tip"><p>A <strong>deduction</strong> lowers taxable income, so it saves the deduction times your marginal rate. A <strong>credit</strong> lowers the tax itself, dollar for dollar. At a 22% rate, a $1,000 deduction saves $220, but a $1,000 credit saves $1,000.</p></div>`
    }
  ],
  keyTerms: [
    { term: `Gross pay`, def: `Total earnings before any deductions are taken out.` },
    { term: `Net pay`, def: `Take-home pay after taxes and other deductions.` },
    { term: `FICA`, def: `Federal payroll taxes for Social Security (6.2%) and Medicare (1.45%), matched by the employer.` },
    { term: `Progressive tax`, def: `A tax whose rate rises as income rises, such as the federal income tax.` },
    { term: `Marginal tax rate`, def: `The rate applied to your last, or next, dollar of income.` },
    { term: `W-4`, def: `Form an employee gives an employer to set income tax withholding.` },
    { term: `W-2`, def: `Form an employer sends each year showing wages earned and taxes withheld.` },
    { term: `Tax credit`, def: `A dollar-for-dollar reduction in the tax you owe.` }
  ],
  traps: [
    `Swapping the W-4 and W-2: the employee fills out the W-4; the employer issues the W-2.`,
    `Believing a raise into a higher bracket taxes all income at the higher rate. Only the dollars above the threshold are.`,
    `Treating a deduction and a credit as equal: a credit is worth far more per dollar.`,
    `Confusing gross pay (before deductions) with net pay (take-home).`
  ],
  explainer: null,
  video: `v-fi-taxes`,
  caseFrequent: false
};

const tvmGoals = {
  id: `fi-tvm`,
  area: `FI`,
  title: `Time value of money and financial goals`,
  pis: [`FI:062`, `FI:065`],
  minutes: 5,
  sections: [
    {
      pi: `FI:062`,
      heading: `Why a dollar today beats a dollar tomorrow`,
      html: `<p>The <strong>time value of money</strong> (TVM) says a dollar today is worth more than a dollar in the future, because today's dollar can be invested to earn interest. Inflation and risk add to the case: future dollars may buy less, and a promised payment might not arrive.</p>
<p><strong>Simple interest</strong> is paid only on the original principal:</p>
<div class="formula">Interest = Principal × Rate × Time</div>
<p><strong>Compound interest</strong> is paid on the principal <em>and</em> on interest already earned, so money grows faster over time:</p>
<div class="formula">Future value = Present value × (1 + r)ⁿ</div>
<div class="example"><h4>Example</h4><p>Put $1,000 away at 6% for 3 years. Simple interest earns $1,000 × 0.06 × 3 = $180, for $1,180 total. Compounded annually, it grows to $1,000 × 1.06³ = <strong>$1,191.02</strong>. The extra $11.02 is interest earned on interest.</p></div>
<p><strong>Present value</strong> works backward: what is a future amount worth today? PV = FV ÷ (1 + r)ⁿ. For example, $5,000 received in 4 years at 5% is worth $5,000 ÷ 1.05⁴ = <strong>$4,113.51</strong> today.</p>
<p>The <strong>Rule of 72</strong> estimates doubling time: years to double ≈ 72 ÷ interest rate. At 8%, money doubles in about 9 years.</p>
<p>Direction rules show up often on the exam: more time or a higher rate raises future value; a higher discount rate <em>lowers</em> present value; more frequent compounding raises future value. That last rule is why <strong>APY</strong> (which includes compounding) is higher than <strong>APR</strong> whenever interest compounds more than once a year. For example, 12% APR compounded monthly equals an APY of about 12.68%.</p>`
    },
    {
      pi: `FI:065`,
      heading: `Setting financial goals that actually happen`,
      html: `<p>A <strong>financial goal</strong> is a specific thing you want to do with money, such as buying a car, paying for college or retiring comfortably. Vague wishes ("save more") rarely happen. Strong goals are <strong>SMART</strong>:</p>
<ul>
<li><strong>Specific</strong>: exactly what you want ("a used car").</li>
<li><strong>Measurable</strong>: a dollar amount ("$6,000").</li>
<li><strong>Attainable</strong>: realistic for your income.</li>
<li><strong>Relevant</strong>: tied to what matters to you.</li>
<li><strong>Time-bound</strong>: a deadline ("in 24 months").</li>
</ul>
<p>Goals are grouped by time: <strong>short-term</strong> (within about a year, like a new laptop or an emergency fund), <strong>intermediate</strong> (one to five years, like a car) and <strong>long-term</strong> (more than five years, like a home or retirement). Since you cannot fund everything at once, <strong>prioritize</strong>: most planners put an emergency fund and high-interest debt payoff near the top.</p>
<p>Goal setting and TVM work together. A long-term goal gives compound interest decades to work, so you can reach it with smaller monthly amounts if you start early. Short-term goals should sit in safe, easy-to-reach places like savings accounts, because there is no time to recover from an investment loss.</p>
<div class="example"><h4>Example</h4><p>Aiden wants $6,000 for a car in 24 months. Dividing $6,000 by 24 gives a target of <strong>$250 a month</strong>, before any interest. Writing the goal down, automating the transfer and checking progress monthly turns the goal into a plan.</p></div>`
    }
  ],
  keyTerms: [
    { term: `Time value of money`, def: `The idea that money available now is worth more than the same amount later because it can earn interest.` },
    { term: `Simple interest`, def: `Interest calculated only on the original principal: Principal × Rate × Time.` },
    { term: `Compound interest`, def: `Interest earned on both the principal and previously earned interest.` },
    { term: `Present value`, def: `What a future amount of money is worth today at a given interest rate.` },
    { term: `Future value`, def: `What money invested today will grow to by a future date.` },
    { term: `Rule of 72`, def: `Shortcut: 72 divided by the interest rate estimates the years needed to double money.` },
    { term: `APY`, def: `Annual percentage yield, the yearly rate including the effect of compounding.` },
    { term: `SMART goal`, def: `A goal that is specific, measurable, attainable, relevant and time-bound.` }
  ],
  traps: [
    `Reporting principal plus interest when the question asks only for the interest, or one year of interest instead of the full term.`,
    `Thinking a higher discount rate raises present value. It lowers it.`,
    `Assuming APR and APY are the same. APY is higher whenever interest compounds more than once a year.`
  ],
  explainer: `tvm`,
  video: `v-fi-tvm`,
  caseFrequent: false
};

const savingInvesting = {
  id: `fi-saving-investing`,
  area: `FI`,
  title: `Why save and invest, and the main types of investments`,
  pis: [`FI:270`, `FI:077`],
  minutes: 5,
  sections: [
    {
      pi: `FI:270`,
      heading: `The need to save and invest`,
      html: `<p><strong>Saving</strong> means setting money aside in safe, easy-to-reach places such as savings accounts. <strong>Investing</strong> means buying assets such as stocks, bonds or funds that can grow in value but carry risk. You need both.</p>
<p>Reasons to <strong>save</strong>:</p>
<ul>
<li>An <strong>emergency fund</strong> for surprises like car repairs or job loss. A common guideline is three to six months of expenses.</li>
<li>Short-term goals, such as a trip or a down payment.</li>
<li>Avoiding debt: paying cash beats paying interest.</li>
</ul>
<p>Reasons to <strong>invest</strong>:</p>
<ul>
<li><strong>Beating inflation.</strong> Money in a low-interest account can lose purchasing power when prices rise faster than the interest it earns.</li>
<li><strong>Compound growth</strong> toward long-term goals like retirement or college.</li>
<li>Building wealth and financial independence.</li>
</ul>
<p>"<strong>Pay yourself first</strong>" means moving money to savings as soon as you are paid, before spending, ideally with an automatic transfer.</p>
<div class="example"><h4>Example: the cost of waiting</h4><p>Two friends each invest $5,000 once and earn 7% a year until age 65. Nia invests at 25, so her money grows for 40 years to about <strong>$74,872</strong>. Owen waits until 35, giving it 30 years, and ends with about <strong>$38,061</strong>. Waiting ten years cut the result roughly in half.</p></div>
<div class="tip"><p>In client-advice cases, explain that the biggest advantage a young investor has is <strong>time</strong>, not the size of the deposit.</p></div>`
    },
    {
      pi: `FI:077`,
      heading: `Types of investments and the risk-return trade-off`,
      html: `<p>The <strong>risk-return trade-off</strong> is the rule behind every investment: a chance at higher returns means accepting more risk of loss.</p>
<table>
<thead><tr><th>Investment</th><th>What it is</th><th>Risk and return</th></tr></thead>
<tbody>
<tr><td>Savings account, money market deposit account (MMDA), certificate of deposit (CD)</td><td>Bank deposits; a CD locks money for a set term with a penalty for early withdrawal</td><td>Lowest risk, insured by the FDIC (or NCUA at credit unions); lowest return</td></tr>
<tr><td>Bonds</td><td>Loans to a government or company that pay interest and return the face value at maturity</td><td>Low to moderate. Bond prices move opposite to interest rates</td></tr>
<tr><td>Stocks</td><td>Shares of ownership in a corporation; return comes from dividends and price gains</td><td>Higher risk, highest long-run growth potential</td></tr>
<tr><td>Mutual funds and ETFs</td><td>Pooled money buying many securities; mutual funds price once a day, ETFs trade all day like a stock</td><td>Depends on what they hold; built-in diversification</td></tr>
<tr><td>Real estate</td><td>Property owned for rent or price growth</td><td>Moderate to high; hard to sell quickly</td></tr>
</tbody>
</table>
<p><strong>Common stock</strong> gives voting rights and a claim on what is left after everyone else is paid. <strong>Preferred stock</strong> usually has no vote but receives a fixed dividend before common stockholders. An <strong>index fund</strong> simply tracks a market index, which keeps costs low.</p>
<p>Smart strategies: <strong>diversification</strong> (spreading money across many investments so one loss does not sink you), <strong>asset allocation</strong> (choosing a mix of stocks, bonds and cash based on your goals and timeline) and <strong>dollar-cost averaging</strong> (investing a fixed amount on a regular schedule, which buys more shares when prices are low).</p>
<div class="tip"><p>Big trap: a <strong>money market deposit account</strong> is an insured bank deposit, but a <strong>money market mutual fund</strong> is an investment and is <em>not</em> FDIC-insured. Stocks, bonds and funds bought at a bank are not insured either.</p></div>`
    }
  ],
  keyTerms: [
    { term: `Emergency fund`, def: `Savings set aside for unexpected expenses, often three to six months of costs as a guideline.` },
    { term: `Risk-return trade-off`, def: `The principle that higher potential returns come with higher risk.` },
    { term: `Stock`, def: `A share of ownership in a corporation.` },
    { term: `Bond`, def: `A loan to a government or company that pays interest and repays face value at maturity.` },
    { term: `Mutual fund`, def: `A professionally managed pool of investors' money that buys many securities and is priced once a day.` },
    { term: `Certificate of deposit (CD)`, def: `A bank deposit held for a fixed term at a set rate, with a penalty for early withdrawal.` },
    { term: `Diversification`, def: `Spreading money among many investments to reduce the impact of any single loss.` },
    { term: `Dollar-cost averaging`, def: `Investing a fixed amount at regular intervals regardless of price.` }
  ],
  traps: [
    `Assuming anything bought at a bank is FDIC-insured. Stocks, bonds, mutual funds and money market mutual funds are not.`,
    `Thinking bond prices rise when interest rates rise. They move in opposite directions.`,
    `Giving preferred stockholders priority over bondholders. Creditors are paid before any stockholders.`
  ],
  explainer: `bond`,
  video: null,
  caseFrequent: true
};

const budgetNetWorth = {
  id: `fi-budget-networth`,
  area: `FI`,
  title: `Personal budgets, net worth and smart money decisions`,
  pis: [`FI:066`, `FI:562`, `FI:783`],
  minutes: 5,
  sections: [
    {
      pi: `FI:066`,
      heading: `Building a personal budget`,
      html: `<p>A <strong>budget</strong> is a plan for spending and saving your income. It tells your money where to go instead of wondering where it went.</p>
<ol>
<li><strong>Figure out income.</strong> Use <em>net</em> (take-home) pay, because that is what you can actually spend.</li>
<li><strong>Track expenses</strong> for a month. Sort them into <strong>fixed expenses</strong> (the same each month, like rent or a phone plan) and <strong>variable expenses</strong> (they change, like groceries, gas and entertainment).</li>
<li><strong>Set goals</strong> and include savings as a line item, not an afterthought.</li>
<li><strong>Compare and adjust.</strong> If expenses exceed income, cut variable spending first.</li>
<li><strong>Review regularly.</strong> A budget is a living plan.</li>
</ol>
<p>A popular guideline is the <strong>50/30/20 rule</strong>: about 50% of take-home pay for needs, 30% for wants and 20% for savings and extra debt payments. It is a rule of thumb, not a law, and people adjust it to their situation.</p>
<div class="example"><h4>Example</h4><p>Sofia takes home $2,400 a month. Under 50/30/20, she would aim for $1,200 for needs (rent share, food, transportation), $720 for wants (eating out, streaming) and $480 for savings and debt payoff.</p></div>
<div class="tip"><p>If your budget shows a <strong>surplus</strong> (income above expenses), put it toward goals. A <strong>deficit</strong> means you are borrowing or draining savings, a warning sign to fix fast.</p></div>`
    },
    {
      pi: `FI:562`,
      heading: `Calculating personal net worth`,
      html: `<p><strong>Net worth</strong> is a snapshot of your financial position at one moment: what you own minus what you owe.</p>
<div class="formula">Net worth = Total assets − Total liabilities</div>
<p><strong>Assets</strong> are things of value you own: cash, checking and savings balances, investments, retirement accounts, a car (at its current market value, not what you paid), a home and valuable possessions. <strong>Liabilities</strong> are debts: credit card balances, student loans, car loans and a mortgage.</p>
<p>A personal net worth statement works like a business balance sheet. Assets equal liabilities plus net worth, the same shape as the accounting equation. Net worth can be <strong>negative</strong>, which is common for young adults with student loans. What matters most is the <strong>trend</strong>: tracking it once or twice a year shows whether you are moving forward.</p>
<div class="example"><h4>Example</h4><p>Jordan has $1,500 in checking, $3,000 in savings, a car worth $9,000 and $2,500 in a retirement account, for $16,000 of assets. He owes $6,000 on his car loan and $1,200 on a credit card, for $7,200 of liabilities. His net worth is $16,000 − $7,200 = <strong>$8,800</strong>.</p></div>
<p>You raise net worth in two ways: <strong>increase assets</strong> (save, invest, let investments grow) or <strong>decrease liabilities</strong> (pay down debt). Buying a new car with a loan can actually lower net worth, because cars lose value quickly while the loan stays.</p>`
    },
    {
      pi: `FI:783`,
      heading: `Making responsible financial decisions`,
      html: `<p>Good money decisions follow a process rather than an impulse. A standard <strong>decision-making process</strong>:</p>
<ol>
<li><strong>Define the problem or goal</strong> ("I need reliable transportation").</li>
<li><strong>Gather information</strong> and list alternatives (used car, new car, bus pass, bike).</li>
<li><strong>Evaluate the alternatives</strong>: cost, benefits, risks and how each fits your budget and goals.</li>
<li><strong>Choose</strong> the best option.</li>
<li><strong>Act</strong> on it.</li>
<li><strong>Review the result</strong> and learn from it.</li>
</ol>
<p>Every choice has an <strong>opportunity cost</strong>, the value of the next-best alternative you give up. Spending $1,000 on a gaming PC might mean giving up $1,000 toward a car down payment.</p>
<p>Habits of responsible decision-makers:</p>
<ul>
<li>Separate <strong>needs</strong> (essentials) from <strong>wants</strong> (nice-to-haves).</li>
<li><strong>Comparison shop</strong> and read reviews before big purchases.</li>
<li>Look at the <strong>total cost</strong>, including interest, fees, insurance and upkeep, not just the monthly payment.</li>
<li>Wait before large impulse buys; a 24-hour or 30-day rule helps.</li>
<li>Read contracts before signing, and ask questions about anything unclear.</li>
<li>Consider how today's choice affects future goals and your credit.</li>
</ul>
<div class="example"><h4>Example</h4><p>Kayla is offered a phone for "only $40 a month for 36 months." Looking at the total, $40 × 36 = $1,440, she sees it costs far more than the $999 cash price. Seeing the whole cost is what responsible decision-making looks like.</p></div>`
    }
  ],
  keyTerms: [
    { term: `Budget`, def: `A written plan for how income will be spent and saved over a period.` },
    { term: `Fixed expense`, def: `A cost that stays the same each period, such as rent.` },
    { term: `Variable expense`, def: `A cost that changes from period to period, such as groceries or entertainment.` },
    { term: `50/30/20 rule`, def: `A budgeting guideline: about 50% needs, 30% wants and 20% savings and debt payoff.` },
    { term: `Net worth`, def: `Total assets minus total liabilities.` },
    { term: `Liability`, def: `A debt or obligation you owe to someone else.` },
    { term: `Opportunity cost`, def: `The value of the next-best alternative given up when making a choice.` }
  ],
  traps: [
    `Building a budget from gross pay instead of take-home pay.`,
    `Valuing a car at its purchase price instead of its current market value when figuring net worth.`,
    `Judging affordability by the monthly payment alone instead of the total cost.`
  ],
  explainer: null,
  video: null,
  caseFrequent: false
};

const banking = {
  id: `fi-banking`,
  area: `FI`,
  title: `Managing accounts: checks, records, reconciling and paying bills`,
  pis: [`FI:560`, `FI:069`, `FI:070`, `FI:565`, `FI:830`],
  minutes: 8,
  sections: [
    {
      pi: `FI:560`,
      heading: `Writing a check correctly`,
      html: `<p>A <strong>check</strong> is a written order telling your bank to pay a specific amount from your checking account to a specific person or business, called the <strong>payee</strong>. You, the account holder, are the <strong>drawer</strong> (or maker).</p>
<p>The parts you fill in:</p>
<ol>
<li><strong>Date</strong>: today's date.</li>
<li><strong>Pay to the order of</strong>: the payee's full name.</li>
<li><strong>Amount box</strong>: the amount in numbers, such as 125.50, written close to the dollar sign.</li>
<li><strong>Amount line</strong>: the amount in words, such as "One hundred twenty-five and 50/100," with a line drawn through the leftover space so no one can add to it. If the words and numbers disagree, the bank generally goes by the words.</li>
<li><strong>Memo</strong>: optional note, such as "March rent" or an account number.</li>
<li><strong>Signature</strong>: your signature authorizes payment.</li>
</ol>
<p>The numbers along the bottom are the bank's <strong>routing number</strong> (identifies the bank), your <strong>account number</strong> and the <strong>check number</strong>.</p>
<p>The payee <strong>endorses</strong> a check by signing the back. A <strong>blank endorsement</strong> (signature only) lets anyone holding the check cash it. A <strong>restrictive endorsement</strong> such as "For deposit only" limits it to deposit. A <strong>special endorsement</strong> ("Pay to the order of Sam Lee") transfers it to another person.</p>
<div class="tip"><p>Safety rules: use pen, never sign a blank check, record every check in your register right away, and never write a check for more than your available balance. A check that bounces (NSF, nonsufficient funds) brings fees from your bank and often from the payee.</p></div>`
    },
    {
      pi: `FI:069`,
      heading: `Maintaining financial records`,
      html: `<p><strong>Financial records</strong> are the documents that show what you earned, spent, owe and own. Good records help you budget, catch errors and fraud, file taxes, prove purchases for warranties or returns, and apply for loans.</p>
<p>Important records to keep:</p>
<ul>
<li><strong>Account records</strong>: a check register or app log, bank and credit card statements.</li>
<li><strong>Income records</strong>: pay stubs, W-2s and 1099s.</li>
<li><strong>Tax records</strong>: filed returns and supporting receipts. The IRS generally recommends keeping these at least three years, longer in some situations.</li>
<li><strong>Receipts and warranties</strong> for major purchases.</li>
<li><strong>Insurance policies</strong>, loan documents and contracts.</li>
<li><strong>Vital documents</strong>: birth certificate, Social Security card, passport, titles and deeds, best kept in a secure place such as a fireproof box or safe-deposit box.</li>
</ul>
<p>Organize records by category, digitally or in labeled folders, and back up digital files. When you dispose of old documents with account numbers or your Social Security number, <strong>shred</strong> them to protect against identity theft.</p>
<div class="example"><h4>Example</h4><p>Ethan's laptop stops working at month 11 of a one-year warranty. Because he saved the receipt in a "warranties" folder, he gets a free repair instead of paying several hundred dollars.</p></div>`
    },
    {
      pi: `FI:070`,
      heading: `Balancing (reconciling) a bank account`,
      html: `<p><strong>Balancing</strong> or <strong>reconciling</strong> an account means comparing your own records with the bank statement and explaining every difference. It catches bank errors, your own math mistakes and fraud.</p>
<p>The two balances rarely match at first, because of timing:</p>
<ul>
<li><strong>Outstanding checks</strong>: checks you wrote that have not cleared the bank yet.</li>
<li><strong>Deposits in transit</strong>: deposits you made that the statement does not show yet.</li>
<li>Items on the statement you have not recorded: <strong>service fees</strong>, <strong>interest earned</strong>, automatic payments.</li>
</ul>
<div class="formula">Statement balance + Deposits in transit − Outstanding checks = Adjusted bank balance</div>
<div class="formula">Register balance + Interest earned − Fees = Adjusted register balance</div>
<p>The two adjusted balances should be equal. If they are not, look for missing entries, math errors or reversed digits.</p>
<div class="example"><h4>Example</h4><p>Mia's statement shows $820. She has a $150 deposit in transit and $210 of outstanding checks: $820 + $150 − $210 = <strong>$760</strong>. Her register shows $767, but the statement lists a $10 fee and $3 of interest she had not recorded: $767 − $10 + $3 = <strong>$760</strong>. Balanced.</p></div>
<div class="tip"><p>Reconcile every month, as soon as your statement arrives. Small errors are easy to fix early.</p></div>`
    },
    {
      pi: `FI:565`,
      heading: `Paying bills on time`,
      html: `<p>Paying bills on time protects your money and your credit. Late payments can bring <strong>late fees</strong>, higher interest rates, service shutoffs and, once a payment is reported late to the credit bureaus, damage to your credit score. Payment history is the single biggest factor in a FICO score.</p>
<p>Ways to pay:</p>
<ul>
<li><strong>Automatic payments (autopay)</strong>: the company withdraws the payment on the due date. Convenient, but you must keep enough money in the account.</li>
<li><strong>Online bill pay</strong> through your bank, or through the company's website or app.</li>
<li><strong>Checks</strong> by mail, which take several days to arrive.</li>
<li><strong>Debit or credit card</strong> payments.</li>
</ul>
<p>A simple bill-paying system:</p>
<ol>
<li>List every bill with its amount and due date.</li>
<li>Line up due dates with paydays; many companies will move a due date if you ask.</li>
<li>Set reminders or autopay.</li>
<li>Review each bill for errors before paying.</li>
<li>Keep confirmation numbers or records of payment.</li>
</ol>
<p>If money is tight, pay essentials first (housing, utilities, food, transportation to work), and contact creditors <em>before</em> you miss a payment. Many offer hardship plans.</p>
<div class="example"><h4>Example</h4><p>Andre's car insurance is due on the 3rd, but he is paid on the 15th. He asks the insurer to move his due date to the 20th, and he sets autopay so the bill is never late.</p></div>`
    },
    {
      pi: `FI:830`,
      heading: `Managing online accounts safely`,
      html: `<p>Most banking now happens online: checking balances, depositing checks with a phone camera, transferring money and paying bills. Online accounts are convenient and let you spot problems fast, but they need protection.</p>
<p><strong>Security habits:</strong></p>
<ul>
<li>Use a <strong>strong, unique password</strong> for every financial account; a password manager helps.</li>
<li>Turn on <strong>multi-factor authentication</strong> (a code sent to your phone or an authenticator app) so a stolen password alone is not enough.</li>
<li>Avoid logging in on <strong>public Wi-Fi</strong> or shared computers, and log out when finished.</li>
<li>Download banking apps only from official app stores, and keep your phone updated.</li>
<li>Watch for <strong>phishing</strong>: emails or texts that pretend to be your bank and ask you to click a link or share a code. Real banks do not ask for your password.</li>
</ul>
<p><strong>Management habits:</strong></p>
<ul>
<li>Set up <strong>alerts</strong> for low balances, large purchases and deposits.</li>
<li>Check activity several times a week and report unfamiliar transactions immediately.</li>
<li>Use the budgeting and categorizing tools many banking apps offer.</li>
<li>Choose paperless statements, but save copies of the ones you need.</li>
</ul>
<div class="example"><h4>Example</h4><p>Zoe gets a text: "Your account is locked, tap here to verify." Instead of tapping, she opens her bank's app directly and sees no problem. She reports the text as phishing.</p></div>`
    }
  ],
  keyTerms: [
    { term: `Payee`, def: `The person or business a check is made out to.` },
    { term: `Endorsement`, def: `The payee's signature or instructions on the back of a check.` },
    { term: `Restrictive endorsement`, def: `An endorsement such as "For deposit only" that limits what can be done with a check.` },
    { term: `Outstanding check`, def: `A check that has been written but has not yet cleared the bank.` },
    { term: `Deposit in transit`, def: `A deposit recorded by the account holder but not yet shown on the bank statement.` },
    { term: `Bank reconciliation`, def: `Matching your account records to the bank statement and explaining all differences.` },
    { term: `Multi-factor authentication`, def: `A login that needs a second proof of identity, such as a code, in addition to a password.` },
    { term: `Phishing`, def: `A scam message pretending to be a trusted company to steal passwords or personal data.` }
  ],
  traps: [
    `Adding outstanding checks to the bank balance during reconciliation. They are subtracted.`,
    `Using a blank endorsement on a check you plan to mail or deposit; "For deposit only" is safer.`,
    `Assuming autopay means you never need to check your account balance.`
  ],
  explainer: null,
  video: null,
  caseFrequent: false
};

const credit = {
  id: `fi-credit`,
  area: `FI`,
  title: `Credit: why it matters, what it costs and how to use it wisely`,
  pis: [`FI:002`, `FI:782`, `FI:071`],
  minutes: 6,
  sections: [
    {
      pi: `FI:002`,
      heading: `The purposes and importance of credit`,
      html: `<p><strong>Credit</strong> is the ability to get money, goods or services now in exchange for a promise to pay later, usually with interest. The lender is the <strong>creditor</strong>; the borrower is the <strong>debtor</strong>.</p>
<p>Why credit matters:</p>
<ul>
<li><strong>For consumers</strong>, it makes big purchases possible, such as a home, a car or a college education, that few people could pay for in cash. It also helps in emergencies and is convenient and safer than carrying cash.</li>
<li><strong>For businesses</strong>, credit funds inventory, equipment and expansion, and lets them offer customers "buy now, pay later."</li>
<li><strong>For the economy</strong>, credit increases spending and investment, which supports jobs and growth.</li>
</ul>
<p>Credit comes in two main forms. <strong>Installment credit</strong> is a loan for a set amount repaid in equal payments over a fixed time, such as a car loan or mortgage. <strong>Revolving credit</strong> is a credit limit you can use, repay and use again, such as a credit card. Credit is also <strong>secured</strong> (backed by collateral the lender can take if you do not pay, like the car on a car loan) or <strong>unsecured</strong> (backed only by your promise, like most credit cards).</p>
<p>Credit has costs and risks: interest makes everything you buy more expensive, and overuse can lead to debt you cannot repay. Your record of using credit also follows you, affecting future loans, insurance rates, apartment rentals and sometimes job applications.</p>
<div class="tip"><p>Credit is a tool, not extra income. Borrowing moves future income into the present, so you will have less to spend later.</p></div>`
    },
    {
      pi: `FI:782`,
      heading: `Calculating the cost of credit`,
      html: `<p>The <strong>cost of credit</strong> is everything you pay beyond the amount borrowed: interest plus fees. Under the <strong>Truth in Lending Act</strong>, lenders must disclose two key numbers before you sign:</p>
<ul>
<li>The <strong>finance charge</strong>: the total dollar cost of the credit.</li>
<li>The <strong>APR</strong> (annual percentage rate): the yearly cost as a percentage, which lets you compare offers on equal terms.</li>
</ul>
<p>For a simple-interest loan:</p>
<div class="formula">Interest = Principal × Rate × Time</div>
<div class="example"><h4>Example 1: a simple-interest loan</h4><p>Ben borrows $2,000 at 9% simple interest for 2 years. Interest = $2,000 × 0.09 × 2 = <strong>$360</strong>. He repays $2,360 in total.</p></div>
<div class="example"><h4>Example 2: a credit card</h4><p>Lena carries a $1,500 balance on a card with an 18% APR. The monthly rate is 18% ÷ 12 = 1.5%, so one month's interest is about $1,500 × 0.015 = <strong>$22.50</strong>. Paying only the minimum keeps that charge coming month after month.</p></div>
<p>What drives the cost up:</p>
<ul>
<li>A <strong>higher interest rate</strong>, which usually comes with a weaker credit score.</li>
<li>A <strong>longer term</strong>: lower monthly payments but much more total interest. A 30-year, $200,000 mortgage at 6% has a payment of about $1,199, and over 30 years about $231,676 of the total paid is interest.</li>
<li><strong>Fees</strong>: annual fees, late fees, balance-transfer and cash-advance fees.</li>
<li><strong>Paying only the minimum</strong> on a credit card.</li>
</ul>
<div class="tip"><p>A credit card's <strong>grace period</strong> lets you avoid interest on purchases only if you pay the <em>full</em> statement balance by the due date.</p></div>`
    },
    {
      pi: `FI:071`,
      heading: `Using credit wisely`,
      html: `<p>Wise credit use means getting the benefits of credit while keeping costs low and your credit record strong.</p>
<ul>
<li><strong>Pay on time, every time.</strong> Payment history is about 35% of a FICO score, the largest factor.</li>
<li><strong>Pay the full balance</strong> on credit cards when you can, so you pay no interest.</li>
<li><strong>Keep utilization low.</strong> Utilization is your balance divided by your credit limit. Amounts owed make up about 30% of a FICO score, and lower is better.</li>
<li><strong>Borrow only for things that last</strong> or build value, like education or a reliable car, not everyday wants.</li>
<li><strong>Shop for the lowest APR</strong> and read the terms before signing.</li>
<li><strong>Do not open many accounts at once</strong>; each application can mean a hard inquiry.</li>
<li><strong>Keep older accounts open</strong> when sensible, since length of credit history counts too.</li>
</ul>
<div class="example"><h4>Example</h4><p>Ravi has a $2,000 credit limit and a $1,400 balance: utilization of $1,400 ÷ $2,000 = <strong>70%</strong>, which hurts his score. Paying the balance down to $400 drops utilization to 20%.</p></div>
<p>Warning signs of credit trouble: using one card to pay another, making only minimum payments, being near your limits, or not knowing how much you owe. Under the <strong>Credit CARD Act of 2009</strong>, card statements must arrive at least 21 days before the due date, issuers must give 45 days' notice before raising rates, and applicants under 21 need independent income or a cosigner.</p>`
    }
  ],
  keyTerms: [
    { term: `Credit`, def: `Receiving money, goods or services now in exchange for a promise to pay later.` },
    { term: `Installment credit`, def: `A loan repaid in equal payments over a fixed period, such as a car loan.` },
    { term: `Revolving credit`, def: `A reusable credit limit, such as a credit card, that can be borrowed against and repaid repeatedly.` },
    { term: `Collateral`, def: `An asset pledged to secure a loan that the lender can take if the borrower defaults.` },
    { term: `Finance charge`, def: `The total dollar cost of credit, including interest and certain fees.` },
    { term: `APR`, def: `Annual percentage rate, the yearly cost of credit expressed as a percentage.` },
    { term: `Credit utilization`, def: `The share of available revolving credit currently being used.` },
    { term: `Grace period`, def: `Time between a statement date and due date when no interest is charged if the full balance is paid.` }
  ],
  traps: [
    `Comparing loans by monthly payment instead of APR and total finance charge.`,
    `Assuming a longer loan term is cheaper because the payment is lower. It costs more total interest.`,
    `Believing carrying a credit card balance builds credit better than paying in full. It just costs interest.`
  ],
  explainer: `loan`,
  video: `v-fi-credit`,
  caseFrequent: false
};

const creditProtection = {
  id: `fi-credit-protection`,
  area: `FI`,
  title: `Credit reports, identity theft and consumer protection laws`,
  pis: [`FI:072`, `FI:073`, `FI:063`],
  minutes: 6,
  sections: [
    {
      pi: `FI:072`,
      heading: `Checking and validating your credit history`,
      html: `<p>Your <strong>credit report</strong> is the detailed history of how you have handled credit: accounts, balances, payment record, inquiries and public records such as bankruptcies. It is kept by three nationwide <strong>credit bureaus</strong>: <strong>Equifax, Experian and TransUnion</strong>. Your <strong>credit score</strong> is a number calculated from that report. FICO scores range from 300 to 850.</p>
<table>
<thead><tr><th>FICO factor</th><th>Approximate weight</th></tr></thead>
<tbody>
<tr><td>Payment history</td><td>35%</td></tr>
<tr><td>Amounts owed (utilization)</td><td>30%</td></tr>
<tr><td>Length of credit history</td><td>15%</td></tr>
<tr><td>New credit</td><td>10%</td></tr>
<tr><td>Credit mix</td><td>10%</td></tr>
</tbody>
</table>
<p>Income, age, race and employer are not part of a FICO score.</p>
<p><strong>Validating</strong> your history means checking that the report is accurate. Under the <strong>Fair Credit Reporting Act (FCRA)</strong> you are entitled to a free report from each of the three bureaus every 12 months through AnnualCreditReport.com, the official site. (The bureaus have also offered free weekly online reports, but that is a voluntary practice, not an FCRA requirement.) Check for accounts you do not recognize, wrong balances, late payments you did not make and incorrect personal information.</p>
<p>If you find an error, <strong>dispute</strong> it with the bureau and with the company that reported it. Accurate negative information cannot be removed early, but most of it drops off after <strong>7 years</strong>; a bankruptcy can stay up to <strong>10 years</strong>.</p>
<div class="tip"><p>Checking your own credit is a <strong>soft inquiry</strong> and never lowers your score. A <strong>hard inquiry</strong> happens when a lender checks your credit because you applied for credit.</p></div>`
    },
    {
      pi: `FI:073`,
      heading: `Protecting against identity theft`,
      html: `<p><strong>Identity theft</strong> happens when someone uses your personal information, such as your Social Security number, account numbers or login, to open accounts, make purchases, file taxes or get medical care in your name.</p>
<p>Common methods:</p>
<ul>
<li><strong>Phishing</strong>: fake emails, texts or calls that trick you into giving information.</li>
<li><strong>Skimming</strong>: devices hidden on card readers at gas pumps or ATMs.</li>
<li><strong>Data breaches</strong> at companies that store your information.</li>
<li><strong>Mail theft</strong> and digging through trash for statements.</li>
<li>Oversharing on social media (birthdays, pet names, school) that helps guess security answers.</li>
</ul>
<p><strong>Prevention:</strong> shred documents with personal data, guard your Social Security number, use strong unique passwords and multi-factor authentication, check statements and credit reports regularly, and never give information to someone who contacts you unexpectedly.</p>
<p><strong>If it happens:</strong></p>
<ol>
<li>Report it at <strong>IdentityTheft.gov</strong>, the Federal Trade Commission's site, which creates a recovery plan.</li>
<li>Place a <strong>fraud alert</strong>: it is free, lasts one year, and contacting one bureau notifies the other two. Lenders must take extra steps to verify your identity.</li>
<li>Or place a <strong>credit freeze</strong>: free under federal law, it blocks access to your report for new accounts until you lift it.</li>
<li>Contact the affected companies, close fraudulent accounts and dispute fraudulent items on your reports.</li>
</ol>
<div class="tip"><p>Fraud alert = "check carefully before opening credit." Freeze = "no new credit checks at all until I unlock it."</p></div>`
    },
    {
      pi: `FI:063`,
      heading: `Legal rights and responsibilities with financial products`,
      html: `<p>Federal laws protect consumers who use credit and bank accounts, but consumers also take on <strong>legal responsibilities</strong> when they sign up.</p>
<p><strong>Key protection laws, each with one main job:</strong></p>
<table>
<thead><tr><th>Law</th><th>Main job</th></tr></thead>
<tbody>
<tr><td>Truth in Lending Act (TILA)</td><td>Disclosure of credit costs: APR and finance charge</td></tr>
<tr><td>Fair Credit Reporting Act (FCRA)</td><td>Accuracy and privacy of credit reports; free reports and disputes</td></tr>
<tr><td>Equal Credit Opportunity Act (ECOA)</td><td>Bans credit discrimination based on race, color, religion, national origin, sex, marital status, age or receipt of public assistance</td></tr>
<tr><td>Fair Debt Collection Practices Act (FDCPA)</td><td>Limits abusive practices by third-party debt collectors</td></tr>
<tr><td>Fair Credit Billing Act (FCBA)</td><td>Process for disputing credit card billing errors</td></tr>
<tr><td>Electronic Fund Transfer Act (EFTA)</td><td>Debit card, ATM and electronic transfer protections</td></tr>
<tr><td>Truth in Savings Act</td><td>Disclosure of savings terms, including APY</td></tr>
</tbody>
</table>
<p><strong>Consumer responsibilities:</strong></p>
<ul>
<li><strong>Read and understand</strong> a contract before signing. Your signature makes it legally binding, whether or not you read it.</li>
<li><strong>Give truthful information</strong> on applications. Lying on a loan application is fraud.</li>
<li><strong>Repay as agreed</strong>, on time.</li>
<li><strong>Report lost or stolen cards and errors promptly</strong>; your protection can depend on how quickly you act.</li>
<li>Understand that a <strong>cosigner</strong> is legally responsible for the full debt if the borrower does not pay.</li>
<li>Do not write checks without enough money in the account.</li>
</ul>
<div class="example"><h4>Example</h4><p>Tyler cosigns a car loan for a friend, who then stops paying. The lender can legally collect the full balance from Tyler, and the late payments can appear on Tyler's credit report too.</p></div>`
    }
  ],
  keyTerms: [
    { term: `Credit report`, def: `A record of a person's credit accounts, payment history, inquiries and public records.` },
    { term: `Credit score`, def: `A number, such as a FICO score from 300 to 850, that summarizes credit risk based on a credit report.` },
    { term: `Credit bureau`, def: `A company that collects credit information; the three nationwide bureaus are Equifax, Experian and TransUnion.` },
    { term: `Fair Credit Reporting Act`, def: `Federal law governing credit reports, including free annual reports and the right to dispute errors.` },
    { term: `Fraud alert`, def: `A free notice on credit reports, lasting one year, telling lenders to verify identity before opening credit.` },
    { term: `Credit freeze`, def: `A free block on access to a credit report for new credit until the consumer lifts it.` },
    { term: `Equal Credit Opportunity Act`, def: `Federal law banning credit discrimination based on factors such as race, sex, marital status or age.` },
    { term: `Cosigner`, def: `A person who signs a loan with a borrower and becomes legally responsible if the borrower does not pay.` }
  ],
  traps: [
    `Thinking checking your own credit report lowers your score. It is a soft inquiry.`,
    `Mixing up the laws: TILA = disclosure, FCRA = credit reports, ECOA = discrimination, FDCPA = third-party collectors.`,
    `Believing accurate negative information can be disputed off a report. Only inaccurate items are removed.`
  ],
  explainer: null,
  video: null,
  caseFrequent: false
};

const loansDebt = {
  id: `fi-loans-debt`,
  area: `FI`,
  title: `Consumer loans, controlling debt and paying for college`,
  pis: [`FI:625`, `FI:568`, `FI:831`],
  minutes: 6,
  sections: [
    {
      pi: `FI:625`,
      heading: `Applying for a consumer loan`,
      html: `<p>A <strong>consumer loan</strong> is money borrowed by an individual for personal use, such as an auto loan, personal loan or student loan. Applying well can save hundreds or thousands of dollars.</p>
<ol>
<li><strong>Check your credit</strong> first and fix any errors; a better score earns a lower rate.</li>
<li><strong>Decide how much you need</strong> and can afford to repay each month.</li>
<li><strong>Shop several lenders</strong>: banks, credit unions and online lenders. Compare <strong>APR</strong>, term, fees and total cost. Prequalification can show likely rates without a hard inquiry.</li>
<li><strong>Gather documents</strong>: photo ID, proof of income (pay stubs, W-2s), employment information, and details of existing debts.</li>
<li><strong>Submit the application</strong>, which authorizes a hard credit check.</li>
<li><strong>Review the Truth in Lending disclosure</strong> and the loan agreement, then sign the <strong>promissory note</strong>, your legal promise to repay.</li>
</ol>
<p>Lenders judge applicants with the <strong>5 Cs of credit</strong>:</p>
<ul>
<li><strong>Character</strong>: your track record of repaying (credit history).</li>
<li><strong>Capacity</strong>: your ability to repay from income, often measured by <strong>debt-to-income ratio</strong> (monthly debt payments ÷ gross monthly income).</li>
<li><strong>Capital</strong>: savings and assets you have, including a down payment.</li>
<li><strong>Collateral</strong>: assets pledged to secure the loan.</li>
<li><strong>Conditions</strong>: the loan's purpose and the economic environment.</li>
</ul>
<div class="example"><h4>Example</h4><p>A $20,000 auto loan at 6% APR for 5 years has a monthly payment of about <strong>$386.66</strong>. Over 60 payments, Camila pays about $23,199, so roughly $3,199 is interest.</p></div>`
    },
    {
      pi: `FI:568`,
      heading: `Controlling debt`,
      html: `<p>Debt becomes a problem when payments crowd out savings and essentials. <strong>Controlling debt</strong> means keeping borrowing at a level you can repay and having a plan to pay it off.</p>
<p><strong>Warning signs:</strong> paying only minimums, using credit for basics like groceries because cash runs out, borrowing from one card to pay another, maxed-out cards, late payments, and stress about bills.</p>
<p>A useful measure is the <strong>debt-to-income ratio</strong>: total monthly debt payments divided by gross monthly income. Lenders prefer it low; a common lender guideline for mortgages is total debt payments of no more than about 36% of income.</p>
<p><strong>Two popular payoff methods</strong> (pay minimums on everything, then put extra money toward one debt at a time):</p>
<ul>
<li><strong>Avalanche</strong>: target the debt with the <strong>highest interest rate</strong> first. It saves the most money.</li>
<li><strong>Snowball</strong>: target the <strong>smallest balance</strong> first. Quick wins build motivation.</li>
</ul>
<p>Other tools: build a budget that frees up cash, stop adding new debt, call creditors to ask about lower rates or hardship plans, and consider a <strong>debt consolidation</strong> loan only if its rate is lower and you stop running up balances. A <strong>nonprofit credit counseling</strong> agency can set up a debt management plan. Be wary of "debt settlement" companies that charge high fees and promise to erase debt.</p>
<p><strong>Bankruptcy</strong> is a legal last resort. Chapter 7 sells some assets to pay creditors and wipes out many debts; Chapter 13 sets up a repayment plan. It badly damages credit for years, and most student loans and taxes are generally not erased.</p>
<div class="example"><h4>Example</h4><p>Nate pays $600 a month on debts and earns $3,000 a month gross. His debt-to-income ratio is $600 ÷ $3,000 = <strong>20%</strong>.</p></div>`
    },
    {
      pi: `FI:831`,
      heading: `Options for financing a college education`,
      html: `<p>College is one of the biggest investments most people make. The smartest plans use <strong>free money first</strong> and borrow last.</p>
<ol>
<li><strong>File the FAFSA</strong> (Free Application for Federal Student Aid). It is the gateway to federal grants, work-study and federal student loans, and many states and colleges use it for their own aid.</li>
<li><strong>Scholarships</strong>: awards for academics, athletics, talents, community service or background. They do not have to be repaid.</li>
<li><strong>Grants</strong>: need-based aid, such as the federal Pell Grant, that usually does not have to be repaid.</li>
<li><strong>Work-study</strong>: part-time jobs, often on campus, for students with financial need.</li>
<li><strong>Savings</strong>, including a <strong>529 plan</strong>, a tax-advantaged education savings account; earnings grow tax-free when used for qualified education expenses.</li>
<li><strong>Federal student loans</strong>: fixed rates and flexible repayment options. With <em>subsidized</em> loans, for students with financial need, the government pays the interest while you are in school at least half-time. With <em>unsubsidized</em> loans, interest builds up from the start.</li>
<li><strong>Private student loans</strong> from banks and other lenders: often need a cosigner, and usually have fewer repayment protections. Generally used only after federal options.</li>
</ol>
<p>Ways to lower cost: starting at a community college, choosing an in-state public school, earning credits through AP or dual enrollment, and living at home.</p>
<div class="tip"><p>Order to remember: <strong>free money</strong> (scholarships, grants) → <strong>earned money</strong> (work-study, savings) → <strong>borrowed money</strong> (federal loans before private loans).</p></div>`
    }
  ],
  keyTerms: [
    { term: `Promissory note`, def: `A signed legal promise to repay a loan under stated terms.` },
    { term: `5 Cs of credit`, def: `Character, capacity, capital, collateral and conditions, used by lenders to judge applicants.` },
    { term: `Debt-to-income ratio`, def: `Monthly debt payments divided by gross monthly income.` },
    { term: `Debt avalanche`, def: `Paying off the highest-interest debt first while making minimum payments on the rest.` },
    { term: `Debt snowball`, def: `Paying off the smallest balance first while making minimum payments on the rest.` },
    { term: `FAFSA`, def: `The Free Application for Federal Student Aid, used to qualify for federal grants, work-study and loans.` },
    { term: `Subsidized student loan`, def: `A need-based federal loan on which the government pays interest while the student is in school at least half-time.` },
    { term: `529 plan`, def: `A tax-advantaged savings plan for education expenses.` }
  ],
  traps: [
    `Confusing grants and scholarships (no repayment) with loans (repayment with interest).`,
    `Thinking the snowball method saves the most interest. The avalanche method does; snowball is about motivation.`,
    `Assuming bankruptcy erases student loans. Most are generally not discharged.`
  ],
  explainer: `loan`,
  video: null,
  caseFrequent: false
};

const retirementEstate = {
  id: `fi-retirement-estate`,
  area: `FI`,
  title: `Retirement, estate planning and charitable giving`,
  pis: [`FI:569`, `FI:572`, `FI:567`],
  minutes: 6,
  sections: [
    {
      pi: `FI:569`,
      heading: `The nature of retirement planning`,
      html: `<p><strong>Retirement planning</strong> means building enough savings and income to live on after you stop working, which could be 20 to 30 years or more. The earlier you start, the more compound growth does the work.</p>
<p>Retirement income usually comes from three sources, sometimes called a three-legged stool:</p>
<ul>
<li><strong>Social Security</strong>: a government program funded by payroll taxes. It provides a base, but it was never meant to replace all of your income.</li>
<li><strong>Employer plans</strong>: a <strong>401(k)</strong> (private companies), <strong>403(b)</strong> (schools, hospitals and nonprofits) or <strong>457</strong> (state and local governments). Many employers offer a <strong>match</strong>, such as 50 cents per dollar you contribute up to a limit. Not contributing enough to get the full match leaves free money on the table. Some workers have a traditional <strong>pension</strong> that pays a set monthly amount.</li>
<li><strong>Personal savings</strong>, including an <strong>IRA</strong> (individual retirement account) and other investments.</li>
</ul>
<p>Accounts come in two tax styles:</p>
<ul>
<li><strong>Traditional</strong>: contributions are pre-tax or tax-deductible now; withdrawals are taxed in retirement.</li>
<li><strong>Roth</strong>: contributions are made with after-tax money; qualified withdrawals in retirement are tax-free.</li>
</ul>
<p>As of 2026, employees can contribute up to $24,500 a year to a 401(k), 403(b) or 457 plan, and up to $7,500 a year to IRAs, with higher catch-up limits for older workers. Withdrawing from retirement accounts before retirement age generally brings taxes and an extra penalty, so this money should stay invested.</p>
<div class="tip"><p>Traditional = tax break <strong>now</strong>. Roth = tax break <strong>later</strong>. A young worker in a low tax bracket often benefits from Roth contributions.</p></div>`
    },
    {
      pi: `FI:572`,
      heading: `The nature of estate planning`,
      html: `<p>Your <strong>estate</strong> is everything you own (money, property, investments, belongings) minus what you owe. <strong>Estate planning</strong> is deciding ahead of time who will receive your property and who will make decisions for you if you cannot. It is not just for the wealthy: anyone with a bank account, a car, children or pets benefits.</p>
<p>Key tools:</p>
<ul>
<li><strong>Will</strong>: a legal document saying who receives your property and, for parents, who will be <strong>guardian</strong> of minor children. It names an <strong>executor</strong> to carry out your wishes. Dying without a will is called dying <strong>intestate</strong>, and state law then decides who inherits.</li>
<li><strong>Beneficiary designations</strong>: life insurance policies and retirement accounts pass directly to the beneficiaries you name, regardless of what the will says, so keep them up to date.</li>
<li><strong>Trust</strong>: a legal arrangement in which a <strong>trustee</strong> holds and manages property for beneficiaries. Trusts can avoid probate, keep matters private and manage money for children.</li>
<li><strong>Power of attorney</strong>: names someone to handle your financial matters if you cannot.</li>
<li><strong>Health care directive</strong> (living will and health care proxy): states your medical wishes and who can make medical decisions for you.</li>
</ul>
<p><strong>Probate</strong> is the court process that validates a will and oversees distributing an estate. It can take months and cost money, which is why many plans use beneficiary designations and trusts.</p>
<div class="example"><h4>Example</h4><p>New parents Dana and Chris write wills naming a guardian for their daughter, buy life insurance with each other as beneficiary, and sign health care directives. Their plan protects their child even though their estate is small.</p></div>`
    },
    {
      pi: `FI:567`,
      heading: `The nature of charitable giving`,
      html: `<p><strong>Charitable giving</strong> means donating money, goods, time or expertise to organizations that serve the public good, such as food banks, schools, religious groups and disaster relief. People give to support causes they care about, strengthen their communities and live out their values. Many businesses give too, as part of their social responsibility.</p>
<p><strong>Ways to give:</strong> cash or check donations, recurring monthly gifts, donating goods (clothes, food), volunteering time, workplace giving and employer <strong>matching gifts</strong>, and, for larger donors, gifts of appreciated stock or naming a charity as a beneficiary in a will.</p>
<p><strong>Giving wisely:</strong></p>
<ul>
<li><strong>Research the charity</strong>: confirm it is a legitimate organization, and look at how much of its spending goes to programs rather than overhead and fundraising.</li>
<li><strong>Beware of scams</strong>, especially after disasters: high-pressure calls, look-alike names, requests for gift cards or wire transfers.</li>
<li><strong>Build giving into your budget</strong> so it is planned, not impulsive.</li>
<li><strong>Keep records</strong>. Donations to qualified charities (often called 501(c)(3) organizations) may be tax-deductible under IRS rules; the IRS requires a written acknowledgment from the charity for any single gift of $250 or more. Gifts to individuals, or to political campaigns, are not deductible.</li>
</ul>
<div class="example"><h4>Example</h4><p>Hannah's employer matches donations dollar for dollar. When she gives $100 to an animal shelter, the shelter receives $200, and Hannah keeps the shelter's receipt with her tax records.</p></div>`
    }
  ],
  keyTerms: [
    { term: `401(k)`, def: `An employer-sponsored retirement savings plan offered by private companies.` },
    { term: `Employer match`, def: `Money an employer adds to an employee's retirement account based on the employee's contributions.` },
    { term: `Traditional account`, def: `A retirement account with pre-tax contributions; withdrawals are taxed later.` },
    { term: `Roth account`, def: `A retirement account funded with after-tax money; qualified withdrawals are tax-free.` },
    { term: `Will`, def: `A legal document stating how a person's property should be distributed after death.` },
    { term: `Executor`, def: `The person named in a will to carry out its instructions.` },
    { term: `Trust`, def: `An arrangement in which a trustee manages property for the benefit of others.` },
    { term: `Probate`, def: `The court process of validating a will and distributing an estate.` },
    { term: `Intestate`, def: `Dying without a valid will, so state law decides who inherits.` }
  ],
  traps: [
    `Reversing traditional and Roth: traditional saves taxes now; Roth saves taxes in retirement.`,
    `Assuming a will controls life insurance and retirement accounts. Beneficiary designations control them.`,
    `Counting on Social Security to cover all retirement expenses.`
  ],
  explainer: `tvm`,
  video: null,
  caseFrequent: false
};

const providers = {
  id: `fi-providers`,
  area: `FI`,
  title: `Financial-services providers and how to choose one`,
  pis: [`FI:075`, `FI:076`],
  minutes: 4,
  sections: [
    {
      pi: `FI:075`,
      heading: `Types of financial-services providers`,
      html: `<p>Many kinds of businesses help people and companies save, borrow, invest and manage risk. The main split is between <strong>depository institutions</strong>, which accept deposits, and <strong>non-depository institutions</strong>, which do not.</p>
<p><strong>Depository institutions</strong></p>
<ul>
<li><strong>Commercial banks</strong>: for-profit, owned by shareholders; offer checking, savings, loans and credit cards to consumers and businesses. Deposits are insured by the <strong>FDIC</strong>.</li>
<li><strong>Credit unions</strong>: not-for-profit cooperatives owned by their <strong>members</strong>, who share a common bond such as an employer or community. They often offer lower loan rates and fees. Deposits are insured by the <strong>NCUA</strong>, not the FDIC.</li>
<li><strong>Savings institutions</strong> (savings and loans, or thrifts): historically focused on savings accounts and home mortgages.</li>
<li><strong>Online banks</strong>: no branches, often higher savings rates and lower fees.</li>
</ul>
<p><strong>Non-depository institutions</strong></p>
<ul>
<li><strong>Brokerage firms</strong>: buy and sell stocks, bonds and funds for customers.</li>
<li><strong>Investment banks</strong>: help companies issue new stocks and bonds and advise on mergers; they do not take everyday deposits.</li>
<li><strong>Insurance companies</strong>: protect against financial loss in exchange for premiums.</li>
<li><strong>Mutual fund companies</strong> and <strong>financial planners</strong>.</li>
<li><strong>Consumer finance companies</strong>: lend to individuals, often at higher rates.</li>
<li><strong>Alternative providers</strong> such as payday lenders, check-cashing outlets and pawnshops: fast and easy to access, but usually very expensive.</li>
<li><strong>Fintech companies</strong>: payment apps, online lenders and robo-advisors.</li>
</ul>
<div class="tip"><p>As of 2026, deposit insurance covers <strong>$250,000 per depositor, per insured bank, per ownership category</strong>. It covers deposits, not investments.</p></div>`
    },
    {
      pi: `FI:076`,
      heading: `Choosing a financial-services provider`,
      html: `<p>Picking where to bank or invest is a decision you may live with for years. Compare providers on these points:</p>
<ul>
<li><strong>Safety</strong>: Is the bank FDIC-insured or the credit union NCUA-insured? Is the broker or adviser properly registered?</li>
<li><strong>Costs and fees</strong>: monthly maintenance fees, minimum-balance requirements, overdraft and ATM fees, account or advisory fees.</li>
<li><strong>Interest rates</strong>: higher APY on savings, lower APR on loans.</li>
<li><strong>Convenience</strong>: branch and ATM locations, hours, mobile app quality, online bill pay, mobile check deposit.</li>
<li><strong>Services offered</strong>: Can you get checking, savings, loans and credit cards in one place? Investment or financial planning help?</li>
<li><strong>Customer service and reputation</strong>: reviews, complaint records, how problems are handled.</li>
<li><strong>Membership or eligibility rules</strong>, especially for credit unions.</li>
</ul>
<p>The right choice depends on your needs. A student who mostly uses a phone might choose an online bank with no fees and a strong app. A small business owner might want a local bank with a business banker who knows the community. Someone who wants low loan rates might join a credit union.</p>
<div class="example"><h4>Example</h4><p>Bank A charges a $12 monthly fee unless you keep $1,500 in the account. Credit Union B has no monthly fee and slightly fewer ATMs. For Maya, who usually keeps about $400 in checking, Bank A would cost $144 a year, so Credit Union B is the better fit.</p></div>
<div class="tip"><p>Avoid choosing on one factor alone. A high savings rate means little if fees eat it up.</p></div>`
    }
  ],
  keyTerms: [
    { term: `Commercial bank`, def: `A for-profit, shareholder-owned depository institution offering deposits and loans.` },
    { term: `Credit union`, def: `A not-for-profit, member-owned financial cooperative insured by the NCUA.` },
    { term: `FDIC`, def: `Federal Deposit Insurance Corporation, which insures bank deposits up to $250,000 per depositor, per bank, per ownership category (as of 2026).` },
    { term: `NCUA`, def: `National Credit Union Administration, which insures credit union deposits.` },
    { term: `Brokerage firm`, def: `A company that buys and sells securities for customers.` },
    { term: `Payday lender`, def: `A provider of small, short-term loans with very high costs.` }
  ],
  traps: [
    `Saying credit unions are FDIC-insured. Their deposits are insured by the NCUA.`,
    `Thinking investment banks take everyday consumer deposits. They underwrite securities and advise companies.`,
    `Choosing a provider on interest rate alone while ignoring fees.`
  ],
  explainer: null,
  video: null,
  caseFrequent: false
};

const insurance = {
  id: `fi-insurance`,
  area: `FI`,
  title: `Insurance: the concept and figuring out what you need`,
  pis: [`FI:081`, `FI:571`],
  minutes: 5,
  sections: [
    {
      pi: `FI:081`,
      heading: `How insurance works`,
      html: `<p><strong>Insurance</strong> is a way to <strong>transfer risk</strong>. You pay a relatively small, certain amount, the <strong>premium</strong>, to an insurance company, which agrees to pay for large, uncertain losses covered by the <strong>policy</strong> (the contract).</p>
<p>It works by <strong>pooling risk</strong>. Many people pay premiums into one pool, and the few who suffer losses are paid from it. The <strong>law of large numbers</strong> lets insurers predict how many losses a big group will have, even though they cannot predict who will have them. Actuaries use these statistics to set premiums.</p>
<p>Insurers cover <strong>pure risk</strong> (only a chance of loss or no loss, like fire, theft, illness or a car accident), not <strong>speculative risk</strong> (a chance of gain or loss, like investing or starting a business).</p>
<p>Cost-sharing vocabulary:</p>
<ul>
<li><strong>Deductible</strong>: what you pay before the insurer pays. A higher deductible means a lower premium.</li>
<li><strong>Copay</strong>: a flat dollar amount per service, such as $30 per doctor visit.</li>
<li><strong>Coinsurance</strong>: a percentage you pay after the deductible, such as 20%.</li>
<li><strong>Policy limit</strong>: the most the insurer will pay.</li>
<li><strong>Beneficiary</strong>: the person who receives a life insurance payout.</li>
</ul>
<p>Two principles: you must have an <strong>insurable interest</strong> (you would suffer a real financial loss), and the principle of <strong>indemnity</strong> means insurance restores you to your pre-loss position; it does not let you profit.</p>
<div class="example"><h4>Example</h4><p>Leo's car has $3,000 of covered damage, and his collision deductible is $500. He pays the first $500 and the insurer pays $2,500.</p></div>
<div class="tip"><p>Copay = flat dollars. Coinsurance = a percentage. Buying insurance = <em>transferring</em> risk, not reducing it.</p></div>`
    },
    {
      pi: `FI:571`,
      heading: `Determining insurance needs`,
      html: `<p>The goal is to insure against losses you <strong>could not afford to pay yourself</strong>, and to keep small, affordable losses yourself. Determining needs starts with your life situation: Who depends on your income? What do you own? What could you be sued for?</p>
<table>
<thead><tr><th>Type</th><th>Protects against</th><th>Who especially needs it</th></tr></thead>
<tbody>
<tr><td>Health</td><td>Medical bills</td><td>Everyone</td></tr>
<tr><td>Auto</td><td>Liability for injuring others, plus collision (crash damage) and comprehensive (theft, hail, fire)</td><td>All drivers; liability is required in most states</td></tr>
<tr><td>Renters or homeowners</td><td>Damage to belongings or home, plus liability. Floods usually need a separate policy</td><td>Renters and homeowners</td></tr>
<tr><td>Life</td><td>Lost income when someone dies</td><td>People with dependents</td></tr>
<tr><td>Disability</td><td>Lost income when you cannot work due to illness or injury</td><td>Anyone who relies on a paycheck</td></tr>
<tr><td>Umbrella liability</td><td>Lawsuits above home and auto limits</td><td>People with significant assets</td></tr>
</tbody>
</table>
<p><strong>Term life insurance</strong> covers a set number of years, has no cash value and is the least expensive. <strong>Whole life</strong> (permanent) covers your whole life and builds cash value, but costs much more. A single student with no dependents usually needs little or no life insurance; new parents need it a lot.</p>
<p>Needs change with life events: a first car, a first apartment, marriage, children, buying a home, starting a business. A good process: identify risks, estimate how big each loss could be, decide which to <strong>retain</strong> (handle with an emergency fund or higher deductible) and which to <strong>transfer</strong> with insurance, compare policies, and review coverage every year or two.</p>
<div class="example"><h4>Example</h4><p>A young couple with a new baby and one income should look first at health insurance, term life insurance on the earner, disability insurance and renters insurance, and choose deductibles their emergency fund can cover.</p></div>`
    }
  ],
  keyTerms: [
    { term: `Premium`, def: `The price paid for insurance coverage.` },
    { term: `Deductible`, def: `The amount the insured pays before the insurer begins paying.` },
    { term: `Copay`, def: `A flat dollar amount paid for a covered service.` },
    { term: `Coinsurance`, def: `The percentage of covered costs the insured pays after the deductible.` },
    { term: `Pure risk`, def: `A risk with only the possibility of loss or no loss; the kind that is insurable.` },
    { term: `Law of large numbers`, def: `The larger the group, the more predictable its total losses, which lets insurers set premiums.` },
    { term: `Term life insurance`, def: `Life insurance for a set period with no cash value; the least expensive type.` },
    { term: `Whole life insurance`, def: `Permanent life insurance that lasts a lifetime and builds cash value.` }
  ],
  traps: [
    `Calling insurance a way to "reduce" risk. It transfers the financial consequences of risk.`,
    `Mixing up copay (flat dollar amount) and coinsurance (percentage).`,
    `Thinking a higher deductible raises the premium. It lowers it.`,
    `Assuming term life builds cash value. Only permanent policies such as whole life do.`
  ],
  explainer: null,
  video: null,
  caseFrequent: true
};

const accounting = {
  id: `fi-accounting`,
  area: `FI`,
  title: `Accounting basics: purpose, ethics, technology and law`,
  pis: [`FI:579`, `FI:085`, `FI:351`, `FI:352`, `FI:353`],
  minutes: 8,
  sections: [
    {
      pi: `FI:579`,
      heading: `Why businesses need financial information`,
      html: `<p><strong>Financial information</strong> is data about a business's money: sales, costs, profits, cash, assets and debts. Without it, decisions are guesses.</p>
<p>Different users need it for different reasons:</p>
<ul>
<li><strong>Managers and owners</strong> (internal users) use it to plan budgets, set prices, control costs, decide whether to expand and measure performance.</li>
<li><strong>Investors</strong> decide whether to buy, hold or sell ownership in the company.</li>
<li><strong>Lenders and creditors</strong> decide whether to lend and at what rate, based on the company's ability to repay.</li>
<li><strong>Government agencies</strong> use it for taxes (the IRS) and, for public companies, to protect investors (the SEC).</li>
<li><strong>Suppliers, employees and unions</strong> judge whether the company is stable.</li>
</ul>
<p>Information is only useful if it is <strong>accurate, timely, relevant, complete and understandable</strong>. Old or incorrect numbers can lead to bad decisions, such as expanding while cash is quietly running out.</p>
<p>Accounting is split by audience. <strong>Financial accounting</strong> prepares standardized reports, the financial statements, for outside users. <strong>Managerial accounting</strong> prepares detailed internal reports, such as budgets and cost reports, to help managers decide.</p>
<div class="example"><h4>Example</h4><p>A bakery owner sees from monthly reports that her catering sales earn twice the profit margin of walk-in sales. She shifts her marketing toward catering, a decision driven entirely by financial information.</p></div>`
    },
    {
      pi: `FI:085`,
      heading: `The concept of accounting`,
      html: `<p><strong>Accounting</strong> is the process of recording, classifying, summarizing, analyzing and reporting financial transactions. It is often called "the language of business."</p>
<p>Everything rests on the <strong>accounting equation</strong>:</p>
<div class="formula">Assets = Liabilities + Owner's equity</div>
<p><strong>Assets</strong> are what the business owns, <strong>liabilities</strong> are what it owes, and <strong>owner's equity</strong> is the owners' claim. In <strong>double-entry accounting</strong>, every transaction affects at least two accounts and total <strong>debits</strong> equal total <strong>credits</strong>, so the equation always balances. The <strong>DEALER</strong> memory aid: <strong>D</strong>ividends, <strong>E</strong>xpenses and <strong>A</strong>ssets increase with debits; <strong>L</strong>iabilities, <strong>E</strong>quity and <strong>R</strong>evenues increase with credits.</p>
<div class="example"><h4>Example</h4><p>A business buys $5,000 of equipment with $1,000 cash and a $4,000 note payable. Assets rise by a net $4,000 (equipment up $5,000, cash down $1,000), and liabilities rise by $4,000. The equation still balances.</p></div>
<p>The <strong>accounting cycle</strong> runs: analyze transactions → record them in the <strong>journal</strong> → post to the <strong>ledger</strong> → prepare a trial balance → make adjusting entries → prepare financial statements → close the temporary accounts for the period.</p>
<p>Two timing methods: <strong>accrual basis</strong> records revenue when earned and expenses when incurred, whether or not cash has moved, and is required by GAAP. <strong>Cash basis</strong> records them only when cash changes hands, which many small businesses and individuals use. U.S. companies follow <strong>Generally Accepted Accounting Principles (GAAP)</strong>, set by the FASB, so statements are consistent and comparable.</p>`
    },
    {
      pi: `FI:351`,
      heading: `The role of ethics in accounting`,
      html: `<p>Investors, lenders and the public rely on accounting reports to be honest. <strong>Accounting ethics</strong> means recording and reporting financial information truthfully, even when the truth is unwelcome.</p>
<p>Core values in professional codes, such as the AICPA's for certified public accountants:</p>
<ul>
<li><strong>Integrity</strong>: honesty and candor, never subordinating the truth.</li>
<li><strong>Objectivity</strong>: being impartial and free of conflicts of interest.</li>
<li><strong>Independence</strong>: auditors must have no financial or personal ties to the companies they audit.</li>
<li><strong>Confidentiality</strong>: protecting clients' private information.</li>
<li><strong>Due care and competence</strong>: doing careful, skilled work.</li>
</ul>
<p>Common ethical problems: recording sales before they happen to hit targets, hiding expenses or debts, "cooking the books" to boost the stock price, and embezzlement. The <strong>fraud triangle</strong> explains why people commit fraud: <strong>pressure</strong> (an incentive, such as a bonus or debt), <strong>opportunity</strong> (weak controls) and <strong>rationalization</strong> ("I'll pay it back"). Businesses mainly fight fraud by removing opportunity with <strong>internal controls</strong>, such as <strong>segregation of duties</strong> (different people authorize, record and handle cash) and regular reconciliations.</p>
<p>Unethical accounting has real victims. Accounting scandals at Enron and WorldCom in the early 2000s wiped out employees' jobs and retirement savings and led Congress to pass the Sarbanes-Oxley Act.</p>
<div class="example"><h4>Example</h4><p>A manager asks Grace, a staff accountant, to record next month's big sale this month so the team earns a bonus. Recording revenue before it is earned breaks accrual rules and misleads users. The ethical choice is to refuse and, if pressured, report it through proper channels.</p></div>`
    },
    {
      pi: `FI:352`,
      heading: `Technology in accounting`,
      html: `<p>Technology has transformed accounting from paper ledgers to software that records and reports in real time.</p>
<ul>
<li><strong>Accounting software</strong> records transactions, generates invoices and produces financial statements automatically. Small businesses often use packaged software; large companies use <strong>enterprise resource planning (ERP)</strong> systems that link accounting with sales, inventory and payroll.</li>
<li><strong>Cloud-based systems</strong> let owners, accountants and auditors access the same up-to-date books from anywhere.</li>
<li><strong>Spreadsheets</strong> remain essential for budgets, forecasts and analysis.</li>
<li><strong>Automation</strong> connects bank feeds, scans receipts and processes payroll, reducing manual errors and freeing accountants for analysis and advice.</li>
<li><strong>Data analytics and artificial intelligence</strong> help detect unusual transactions that may signal fraud, and help auditors test entire sets of data instead of small samples.</li>
<li><strong>Electronic filing</strong> sends tax returns and reports to government agencies quickly.</li>
</ul>
<p>Technology brings new responsibilities: <strong>data security</strong> (protecting financial and customer data from hackers), regular <strong>backups</strong>, <strong>access controls</strong> so only authorized people can change records, and staff training. Software still depends on good input. Entering a wrong number produces a wrong report, only faster.</p>
<div class="example"><h4>Example</h4><p>A landscaping company connects its bank account to cloud accounting software. Each transaction is pulled in and categorized automatically, the owner can check profits on her phone, and her accountant reviews the books remotely at tax time.</p></div>`
    },
    {
      pi: `FI:353`,
      heading: `Legal considerations for accounting`,
      html: `<p>Accounting is not just good practice; much of it is required by law.</p>
<ul>
<li><strong>Tax laws.</strong> Businesses must keep records that support the income and expenses on their tax returns, file on time and pay what they owe. The IRS generally recommends keeping supporting records at least three years, longer in some situations.</li>
<li><strong>Securities laws.</strong> Public companies must file regular financial reports with the <strong>Securities and Exchange Commission (SEC)</strong>, prepared under GAAP, and have them audited by independent CPAs.</li>
<li><strong>Sarbanes-Oxley Act (2002).</strong> Passed after the Enron and WorldCom scandals, it created the <strong>Public Company Accounting Oversight Board (PCAOB)</strong> to oversee auditors of public companies, requires CEOs and CFOs to personally certify their financial statements, and requires reports on internal controls over financial reporting.</li>
<li><strong>Payroll laws.</strong> Employers must withhold and pay income and payroll taxes and file the related reports.</li>
<li><strong>Privacy and data-protection laws</strong> for customer and employee information.</li>
</ul>
<p>Breaking these laws can bring fines, lawsuits, loss of a CPA license and even prison for people who knowingly falsify records. Standard setters matter too: the <strong>FASB</strong> sets U.S. GAAP, while most other countries use <strong>IFRS</strong>, set by the IASB. One well-known difference: IFRS prohibits the LIFO inventory method, while U.S. GAAP allows it.</p>
<div class="example"><h4>Example</h4><p>Under Sarbanes-Oxley, a public company's CEO who signs off on statements she knows are false faces personal legal liability. She cannot simply blame the accounting department.</p></div>`
    }
  ],
  keyTerms: [
    { term: `Accounting equation`, def: `Assets = Liabilities + Owner's equity.` },
    { term: `Double-entry accounting`, def: `A system in which every transaction affects at least two accounts and debits equal credits.` },
    { term: `Accrual basis`, def: `Recording revenue when earned and expenses when incurred, regardless of when cash moves.` },
    { term: `GAAP`, def: `Generally Accepted Accounting Principles, the U.S. accounting rules set by the FASB.` },
    { term: `Financial accounting`, def: `Accounting that produces standardized reports for outside users such as investors and lenders.` },
    { term: `Managerial accounting`, def: `Accounting that produces internal reports to help managers plan and decide.` },
    { term: `Fraud triangle`, def: `Pressure, opportunity and rationalization, the three conditions behind most fraud.` },
    { term: `Segregation of duties`, def: `An internal control that splits authorizing, recording and handling assets among different people.` },
    { term: `Sarbanes-Oxley Act`, def: `A 2002 law that created the PCAOB and requires executives to certify financial statements.` }
  ],
  traps: [
    `Thinking a debit always means a decrease. Debits increase assets and expenses.`,
    `Confusing financial accounting (outside users) with managerial accounting (inside users).`,
    `Assuming internal controls mainly reduce pressure. They mainly reduce opportunity.`
  ],
  explainer: null,
  video: null,
  caseFrequent: false
};

const statements = {
  id: `fi-statements`,
  area: `FI`,
  title: `The three financial statements and the ratios built from them`,
  pis: [`FI:094`, `FI:093`, `FI:091`],
  minutes: 6,
  sections: [
    {
      pi: `FI:094`,
      heading: `The income statement: profit over a period`,
      html: `<p>The <strong>income statement</strong>, also called the profit and loss statement (P&amp;L), shows a company's <strong>performance over a period of time</strong>, such as "for the year ended December 31." It answers one question: did we make a profit?</p>
<table>
<thead><tr><th>Lakeside Bikes, for the year</th><th>Amount</th></tr></thead>
<tbody>
<tr><td>Revenue (sales)</td><td>$500,000</td></tr>
<tr><td>− Cost of goods sold (COGS)</td><td>$300,000</td></tr>
<tr><td><strong>= Gross profit</strong></td><td>$200,000</td></tr>
<tr><td>− Operating expenses (wages, rent, marketing, depreciation)</td><td>$140,000</td></tr>
<tr><td><strong>= Operating income</strong></td><td>$60,000</td></tr>
<tr><td>− Interest expense</td><td>$10,000</td></tr>
<tr><td>− Income taxes</td><td>$10,000</td></tr>
<tr><td><strong>= Net income</strong></td><td>$40,000</td></tr>
</tbody>
</table>
<p>Profitability ratios come straight from this statement:</p>
<div class="formula">Gross profit margin = Gross profit ÷ Revenue = $200,000 ÷ $500,000 = 40%</div>
<div class="formula">Net profit margin = Net income ÷ Revenue = $40,000 ÷ $500,000 = 8%</div>
<p>Lakeside keeps 8 cents of profit from every dollar of sales. Comparing margins with last year (<strong>horizontal analysis</strong>) or with competitors shows whether that is good.</p>
<div class="tip"><p>Dividends paid to owners are <strong>not</strong> an expense, so they never appear on the income statement. They reduce retained earnings instead.</p></div>`
    },
    {
      pi: `FI:093`,
      heading: `The balance sheet: a snapshot on one date`,
      html: `<p>The <strong>balance sheet</strong> shows a company's <strong>financial position at a single point in time</strong>, "as of December 31." It follows the accounting equation: <strong>Assets = Liabilities + Owners' equity</strong>.</p>
<ul>
<li><strong>Current assets</strong>: cash and items expected to become cash or be used within a year: accounts receivable, inventory, prepaid expenses.</li>
<li><strong>Long-term assets</strong>: property, plant and equipment (shown net of accumulated depreciation) and intangibles such as patents.</li>
<li><strong>Current liabilities</strong>: debts due within a year: accounts payable, wages payable, the current part of loans.</li>
<li><strong>Long-term liabilities</strong>: bonds, mortgages and long-term loans.</li>
<li><strong>Owners' equity</strong>: money owners invested plus <strong>retained earnings</strong> (profits kept in the business).</li>
</ul>
<div class="example"><h4>Example: Lakeside Bikes as of December 31</h4><p>Current assets $120,000 (cash $20,000, receivables $30,000, inventory $60,000, prepaid $10,000) plus equipment of $280,000 gives total assets of <strong>$400,000</strong>. Current liabilities are $60,000 and long-term debt $100,000, so total liabilities are $160,000. Equity is $400,000 − $160,000 = <strong>$240,000</strong>.</p></div>
<p>Key balance-sheet ratios:</p>
<div class="formula">Current ratio = Current assets ÷ Current liabilities = $120,000 ÷ $60,000 = 2.0</div>
<div class="formula">Debt-to-equity = Total liabilities ÷ Total equity = $160,000 ÷ $240,000 ≈ 0.67</div>
<p>A current ratio of 2.0 means $2 of short-term assets for every $1 of short-term debts. Combining statements gives return ratios: <strong>ROA</strong> = net income ÷ total assets = $40,000 ÷ $400,000 = 10%, and <strong>ROE</strong> = net income ÷ equity = $40,000 ÷ $240,000 ≈ 16.7%.</p>
<div class="tip"><p>Higher is not always better: a very high current ratio can mean idle cash or too much inventory.</p></div>`
    },
    {
      pi: `FI:091`,
      heading: `The cash flow statement: where cash came from and went`,
      html: `<p>The <strong>statement of cash flows</strong> explains how a company's cash balance changed over a period. Profit and cash are not the same: a company can show a profit and still run out of cash, for example if customers pay slowly or it buys a lot of inventory or equipment.</p>
<p>Cash flows are sorted into three sections:</p>
<ul>
<li><strong>Operating activities</strong>: cash from the day-to-day business, such as cash from customers and cash paid to suppliers and employees.</li>
<li><strong>Investing activities</strong>: buying or selling long-term assets such as equipment, buildings or investments.</li>
<li><strong>Financing activities</strong>: borrowing and repaying loans, issuing or buying back stock, and paying dividends.</li>
</ul>
<div class="example"><h4>Example: Lakeside Bikes</h4><p><strong>Operating</strong>: net income $40,000, plus $15,000 depreciation added back (an expense that used no cash), minus a $5,000 increase in receivables, plus a $3,000 increase in payables = <strong>+$53,000</strong>. <strong>Investing</strong>: bought equipment = <strong>−$35,000</strong>. <strong>Financing</strong>: repaid $10,000 of loans and paid $6,000 of dividends = <strong>−$16,000</strong>. Net change in cash = 53,000 − 35,000 − 16,000 = <strong>+$2,000</strong>.</p></div>
<p>How the statements connect: net income from the income statement increases retained earnings in the equity section of the balance sheet, and the cash flow statement's ending cash equals the cash on the balance sheet.</p>
<div class="tip"><p>Healthy companies usually generate positive <strong>operating</strong> cash flow. A business that survives only by borrowing (financing) or selling assets (investing) is a warning sign.</p></div>`
    }
  ],
  keyTerms: [
    { term: `Income statement`, def: `Shows revenue, expenses and net income over a period of time.` },
    { term: `Balance sheet`, def: `Shows assets, liabilities and owners' equity at a single point in time.` },
    { term: `Statement of cash flows`, def: `Shows cash inflows and outflows from operating, investing and financing activities over a period.` },
    { term: `Gross profit`, def: `Revenue minus cost of goods sold.` },
    { term: `Net income`, def: `Profit left after all expenses, interest and taxes; the bottom line.` },
    { term: `Retained earnings`, def: `Accumulated profits kept in the business rather than paid out as dividends.` },
    { term: `Current ratio`, def: `Current assets divided by current liabilities; a measure of short-term liquidity.` },
    { term: `Debt-to-equity ratio`, def: `Total liabilities divided by total equity; a measure of reliance on debt.` },
    { term: `Net profit margin`, def: `Net income divided by revenue.` }
  ],
  traps: [
    `Saying the balance sheet covers a period. It is a snapshot on one date; the income and cash flow statements cover periods.`,
    `Listing dividends as an expense on the income statement. They are a financing cash flow that reduces retained earnings.`,
    `Assuming profit equals cash. Depreciation, receivables and inventory make them differ.`,
    `Putting equipment purchases in operating activities instead of investing activities.`
  ],
  explainer: `ratios`,
  video: `v-fi-statements`,
  caseFrequent: false
};

const businessFinance = {
  id: `fi-business-finance`,
  area: `FI`,
  title: `Finance in business: its role, ethics, laws and budgets`,
  pis: [`FI:354`, `FI:355`, `FI:356`, `FI:106`],
  minutes: 7,
  sections: [
    {
      pi: `FI:354`,
      heading: `The role of finance in business`,
      html: `<p><strong>Finance</strong> is the business function that <strong>gets money, manages it and puts it to work</strong>. If accounting records the score, finance helps decide the plays. In larger companies, finance is led by a <strong>chief financial officer (CFO)</strong>.</p>
<p>The finance function has three main jobs:</p>
<ol>
<li><strong>Raising funds (financing).</strong> Businesses get money through <strong>debt financing</strong> (borrowing through bank loans, lines of credit or bonds, which must be repaid with interest but keeps ownership with the owners) or <strong>equity financing</strong> (selling ownership through investors or stock, which does not need repayment but gives up part of the ownership and profits). Retained earnings are another source of equity.</li>
<li><strong>Investing funds.</strong> Deciding which long-term projects, equipment or expansions are worth the money, a process called <strong>capital budgeting</strong>.</li>
<li><strong>Managing day-to-day money.</strong> Keeping enough cash to pay bills, collecting from customers, managing inventory and paying suppliers, called <strong>working capital management</strong> (working capital = current assets − current liabilities).</li>
</ol>
<p>Finance also supports <strong>financial planning</strong>: forecasting sales and costs, preparing budgets and projected statements, and managing financial risk. Good financial management helps a business survive slow periods, grow and earn a return for owners.</p>
<div class="example"><h4>Example</h4><p>A growing food truck business needs $40,000 for a second truck. Its owner compares a bank loan (keeps 100% ownership but adds monthly payments) with an investor offering $40,000 for 25% of the business (no payments but shares future profits). Weighing that trade-off is the core of the finance function.</p></div>`
    },
    {
      pi: `FI:355`,
      heading: `The role of ethics in finance`,
      html: `<p>Finance runs on <strong>trust</strong>. Investors, customers and lenders hand over money because they believe it will be handled honestly. When that trust breaks, markets and companies can collapse.</p>
<p>Key ethical principles:</p>
<ul>
<li><strong>Fiduciary duty</strong>: someone managing money for others, such as a financial adviser or a company's executives acting for shareholders, must put the client's interests ahead of their own.</li>
<li><strong>Avoiding conflicts of interest</strong>: an adviser should not push a product because it pays a bigger commission. Conflicts that cannot be avoided must be disclosed.</li>
<li><strong>Honesty and transparency</strong>: give accurate information about risks, fees and performance; never exaggerate expected returns.</li>
<li><strong>Confidentiality</strong>: protect clients' financial information.</li>
<li><strong>Fairness</strong>: treat all clients and investors equally.</li>
</ul>
<p>Common ethical failures: <strong>insider trading</strong> (trading on important nonpublic information), misleading investors, hiding risks, predatory lending that targets vulnerable borrowers, and fraud schemes that pay old investors with new investors' money. These hurt not only the victims but the reputation of the whole industry.</p>
<p>Ethical behavior pays off over time: it builds customer loyalty, lowers legal risk and protects a firm's reputation, which can take years to rebuild once damaged.</p>
<div class="example"><h4>Example</h4><p>An adviser could earn a larger commission by selling a client a high-fee product, even though a low-fee index fund fits the client's goals better. Recommending the index fund, and disclosing how she is paid, is the ethical choice.</p></div>`
    },
    {
      pi: `FI:356`,
      heading: `Legal considerations for finance`,
      html: `<p>Because finance involves other people's money, it is heavily regulated. Major laws and regulators to know:</p>
<ul>
<li><strong>Securities Act of 1933</strong>: companies selling new securities to the public must register them and give investors a <strong>prospectus</strong> with truthful information.</li>
<li><strong>Securities Exchange Act of 1934</strong>: created the <strong>Securities and Exchange Commission (SEC)</strong>, regulates trading of existing securities and requires ongoing reports from public companies.</li>
<li><strong>Insider trading laws</strong> make trading on material nonpublic information illegal.</li>
<li><strong>Sarbanes-Oxley Act (2002)</strong>: stronger corporate financial reporting and executive accountability.</li>
<li><strong>Dodd-Frank Act (2010)</strong>: passed after the 2008 financial crisis; it created the <strong>Consumer Financial Protection Bureau (CFPB)</strong> and tightened oversight of large financial firms.</li>
<li><strong>Consumer credit laws</strong> such as the Truth in Lending Act and Equal Credit Opportunity Act.</li>
<li><strong>Anti-money-laundering rules</strong>, including the Bank Secrecy Act, which require financial institutions to verify customers' identities and report suspicious activity.</li>
<li><strong>Contract law</strong>: loan agreements, leases and investment agreements are legally binding.</li>
</ul>
<p>Businesses also face legal limits when raising money. A small company cannot simply sell shares to the public without following securities rules. Breaking financial laws can bring fines, lawsuits, loss of licenses and prison time.</p>
<div class="example"><h4>Example</h4><p>An employee learns her company will announce a merger next week and buys its stock before the news is public. That is illegal insider trading, enforced by the SEC, even if she never tells anyone.</p></div>`
    },
    {
      pi: `FI:106`,
      heading: `The nature of business budgets`,
      html: `<p>A <strong>business budget</strong> is a financial plan that estimates future revenue and expenses for a period. Budgets turn goals into numbers, help control spending, coordinate departments and give a yardstick for measuring results.</p>
<p>The <strong>master budget</strong> starts with the <strong>sales budget</strong>, because sales drive everything else: production, purchasing, labor and expenses. Other common budgets:</p>
<ul>
<li><strong>Operating budget</strong>: planned revenues and expenses for day-to-day operations.</li>
<li><strong>Cash budget</strong>: expected cash receipts and payments, showing when the business may need to borrow. Beginning cash + receipts − payments = ending cash.</li>
<li><strong>Capital budget</strong>: planned spending on long-term assets such as equipment or buildings.</li>
</ul>
<p>Budget styles: a <strong>static budget</strong> is set for one level of activity; a <strong>flexible budget</strong> adjusts to the actual level of activity; a <strong>zero-based budget</strong> requires every expense to be justified from zero each period.</p>
<p>After the period, managers compare actual results with the budget. The difference is a <strong>variance</strong>, labeled favorable (better than planned) or unfavorable.</p>
<p><strong>Break-even analysis</strong> supports budgeting by showing how many units must be sold to cover all costs. <strong>Fixed costs</strong> stay the same in total (rent, insurance); <strong>variable costs</strong> rise with each unit (materials).</p>
<div class="formula">Break-even units = Fixed costs ÷ (Price − Variable cost per unit)</div>
<div class="example"><h4>Example</h4><p>Fixed costs are $12,000, the price is $25 and the variable cost is $10 per unit. Each unit contributes $15, so break-even is $12,000 ÷ $15 = <strong>800 units</strong>. Every unit sold beyond 800 adds $15 of profit.</p></div>`
    }
  ],
  keyTerms: [
    { term: `Finance function`, def: `The business activity of raising, investing and managing money.` },
    { term: `Debt financing`, def: `Raising money by borrowing, which must be repaid with interest.` },
    { term: `Equity financing`, def: `Raising money by selling ownership in the business.` },
    { term: `Fiduciary duty`, def: `A legal and ethical obligation to act in another person's best financial interest.` },
    { term: `Insider trading`, def: `Illegally trading securities based on important information not yet available to the public.` },
    { term: `SEC`, def: `Securities and Exchange Commission, the federal agency that regulates securities markets.` },
    { term: `Master budget`, def: `The full set of a company's budgets, built starting from the sales budget.` },
    { term: `Variance`, def: `The difference between actual results and budgeted amounts.` },
    { term: `Break-even point`, def: `The sales level at which total revenue equals total costs, so profit is zero.` }
  ],
  traps: [
    `Thinking equity financing is free. Owners give up part of the ownership and expect a higher return than lenders.`,
    `Confusing the Securities Act of 1933 (new issues) with the Securities Exchange Act of 1934 (created the SEC, trading).`,
    `Starting a master budget with the cash budget. It starts with the sales budget.`,
    `Thinking fixed cost per unit stays constant. Total fixed cost is constant; per-unit fixed cost falls as volume rises.`
  ],
  explainer: `breakeven`,
  video: `v-fi-budget`,
  caseFrequent: false
};

export default [
  money,
  incomeTaxes,
  tvmGoals,
  savingInvesting,
  budgetNetWorth,
  banking,
  credit,
  creditProtection,
  loansDebt,
  retirementEstate,
  providers,
  insurance,
  accounting,
  statements,
  businessFinance
];
