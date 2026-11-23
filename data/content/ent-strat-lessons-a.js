export default [
{ id:'ent-sm-planning-foundations', area:'SM', title:'Mission, goals, SWOT and the outside world',
  pis:['SM:009','SM:008','SM:010','SM:011'], minutes:9,
  sections:[
  { pi:'SM:009', heading:'Defining the business mission', html:`<p>A <strong>mission statement</strong> is a short statement of why the business exists, who it serves and what makes it different. It describes the present. A <strong>vision statement</strong> describes where the owner hopes the business will be in the future. Both guide decisions, but the mission answers "What do we do, and for whom?"</p>
<p>A good mission is clear, brief, specific to your business and believable to employees and customers. "To be the best" is too vague. "To serve fresh, locally sourced lunches to busy downtown workers in under five minutes" tells everyone what the food truck stands for.</p>
<ul><li><strong>Purpose:</strong> what the business does</li><li><strong>Customers:</strong> who it serves</li><li><strong>Value:</strong> what it offers that others do not</li><li><strong>Values:</strong> principles that guide behavior (optional but common)</li></ul>
<p>Owners use the mission to say yes or no to ideas. If a daycare's mission is safe, play-based learning for toddlers, then adding a late-night teen program does not fit. Revisit the mission when the business changes direction, but do not rewrite it every month.</p>
<div class="tip"><p>Mission = today's purpose. Vision = tomorrow's picture. Goals = the steps that connect them.</p></div>` },
  { pi:'SM:008', heading:'Developing goals and objectives', html:`<p><strong>Goals</strong> are broad results the owner wants, such as growing sales or becoming known in the neighborhood. <strong>Objectives</strong> are specific, measurable steps that show progress toward a goal. Goals set the direction, and objectives set the target.</p>
<p>Good objectives are <strong>SMART</strong>: Specific, Measurable, Achievable, Relevant and Time-bound. "Sell more cupcakes" is a wish. "Increase online cupcake orders from forty to sixty per week by June thirtieth" is an objective.</p>
<p>Owners usually set goals at three time horizons:</p>
<ul><li><strong>Short-term</strong> (under one year): hire a part-time baker</li><li><strong>Intermediate</strong> (one to three years): open a second pickup location</li><li><strong>Long-term</strong> (three or more years): launch a wholesale line</li></ul>
<p>Goals should support the mission, fit available resources and not contradict each other. A cleaning service cannot both cut prices to the bone and also promise premium, fully insured service without squeezing its margin. At the owner level, you also assign someone responsible for each objective so it does not belong to "everyone."</p>
<div class="example"><h4>Example</h4><p>Goal: build a loyal customer base. Objective: raise repeat customers from thirty percent to forty percent of sales within twelve months using a punch-card program.</p></div>` },
  { pi:'SM:010', heading:'Conducting an organizational SWOT', html:`<p>A <strong>SWOT analysis</strong> examines four things to help an owner plan. <strong>Strengths</strong> and <strong>weaknesses</strong> are <em>internal</em>: they come from inside the business and the owner can control or change them. <strong>Opportunities</strong> and <strong>threats</strong> are <em>external</em>: they come from the market and the owner can only respond.</p>
<table><thead><tr><th>Factor</th><th>Source</th><th>Example for a local café</th></tr></thead><tbody>
<tr><td>Strength</td><td>Internal</td><td>Loyal regulars, skilled baristas</td></tr>
<tr><td>Weakness</td><td>Internal</td><td>Small kitchen, limited cash reserves</td></tr>
<tr><td>Opportunity</td><td>External</td><td>New office building opening nearby</td></tr>
<tr><td>Threat</td><td>External</td><td>A national chain moving in down the street</td></tr></tbody></table>
<p>To conduct a SWOT, gather facts (sales data, customer feedback, competitor visits), list items in each box, rank the most important ones, and then turn them into action. The real value is matching: use strengths to seize opportunities, fix weaknesses that expose you to threats, and avoid projects that combine a weakness with a threat.</p>
<div class="tip"><p>Internal = S and W. External = O and T. If you can fix it yourself, it is probably internal.</p></div>
<p>A common mistake is labeling a competitor's move as a weakness. A rival's new store is a threat because it is outside your control.</p>` },
  { pi:'SM:011', heading:'External planning considerations', html:`<p>Before setting a direction, an owner scans the outside environment. These <strong>external planning considerations</strong> are forces the business does not control but must plan around. A common checklist is:</p>
<ul><li><strong>Economic:</strong> inflation, interest rates, unemployment, customer spending power</li><li><strong>Competitive:</strong> who else serves your customers and how they price and promote</li><li><strong>Technological:</strong> new tools, online ordering, automation</li><li><strong>Legal and regulatory:</strong> licenses, health codes, labor laws, taxes</li><li><strong>Social and demographic:</strong> population changes, tastes, lifestyles</li><li><strong>Environmental:</strong> weather, sustainability expectations, supply availability</li></ul>
<p>Suppliers, lenders and the local community also matter. A 3D-printing start-up that depends on one filament supplier faces risk if that supplier raises prices. A laundromat must watch utility costs and neighborhood population shifts.</p>
<div class="example"><h4>Example</h4><p>A food truck owner sees that the city is adding a lunchtime street-vending zone (legal and regulatory opportunity) while fuel and food costs rise (economic threat). Planning means applying for the zone permit early and testing a menu price change.</p></div>
<p>Scan regularly, not once. Results feed your SWOT's opportunities and threats and shape goals and the business plan.</p>` }
  ],
  keyTerms:[
    {term:'Mission statement', def:'A brief statement of why a business exists, whom it serves and what it offers.'},
    {term:'Vision statement', def:'A picture of what the owner hopes the business becomes in the future.'},
    {term:'Objective', def:'A specific, measurable target that shows progress toward a goal.'},
    {term:'SMART', def:'Specific, Measurable, Achievable, Relevant, Time-bound.'},
    {term:'SWOT', def:'Strengths, weaknesses, opportunities and threats; the first two are internal, the last two external.'},
    {term:'External planning considerations', def:'Outside forces such as economy, competition, technology, laws and demographics.'}
  ],
  traps:['Mixing up mission and vision: the mission is the present purpose, the vision is the future picture.','Labeling a competitor as a weakness: outside factors are opportunities or threats.','Writing vague objectives with no number or deadline.'],
  explainer:null, video:'v-ent-strategic-planning', caseFrequent:false },

{ id:'ent-sm-plans-action', area:'SM', title:'Business plans and action plans',
  pis:['SM:007','SM:013','SM:012'], minutes:8,
  sections:[
  { pi:'SM:007', heading:'The nature of business plans', html:`<p>A <strong>business plan</strong> is a written document that describes what a business is, where it is going and how it will get there. It has two main jobs. Inside the business, it works as a road map and a way to test whether an idea can make money. Outside the business, it is a tool to persuade lenders and investors to put money in.</p>
<p>Plans fall into types by purpose and size. A <strong>start-up plan</strong> supports a new venture. An <strong>operating plan</strong> guides day-to-day work in an existing business. A <strong>strategic plan</strong> looks several years out. A short <strong>lean plan</strong> can fit on one or two pages for quick testing.</p>
<p>Plans are only useful if they stay current. Markets, costs and customers change, so owners revise the plan, usually at least once a year.</p>
<ul><li><strong>Planning forces thinking:</strong> problems show up on paper before they cost money</li><li><strong>It sets benchmarks:</strong> you can compare actual results to the plan</li><li><strong>It builds credibility:</strong> lenders expect one</li></ul>
<div class="tip"><p>A business plan is a living document. It is written for the reader's needs: a banker wants repayment ability, an investor wants growth.</p></div>` },
  { pi:'SM:013', heading:'Developing the business plan', html:`<p>Developing a plan means researching, writing and then testing your assumptions. A standard plan has these parts:</p>
<ol><li><strong>Executive summary:</strong> one page that sells the whole plan. It comes first but is written last.</li><li><strong>Company description:</strong> mission, legal form, location, history</li><li><strong>Market analysis:</strong> industry, target customers, competitors</li><li><strong>Organization and management:</strong> who runs it and key staff</li><li><strong>Products or services:</strong> what you sell and your advantage</li><li><strong>Marketing and sales plan:</strong> pricing, promotion, distribution</li><li><strong>Funding request:</strong> how much money, for what, and how it will be repaid</li><li><strong>Financial projections:</strong> projected income statement, cash flow and balance sheet, with break-even analysis</li><li><strong>Appendix:</strong> supporting documents such as resumes, quotes and permits</li></ol>
<p>Be realistic. Use research for your numbers and show your assumptions. Reviewers distrust plans that predict huge sales with no support. Keep the language clear and the length reasonable, then proofread carefully because errors hurt credibility.</p>
<div class="example"><h4>Example</h4><p>Jada plans a mobile pet-grooming van. Her market section uses local pet-ownership data and three competitor price checks. Her financials show the number of grooms per week she needs to break even.</p></div>` },
  { pi:'SM:012', heading:'Developing action plans', html:`<p>An <strong>action plan</strong> turns a goal into specific tasks. While a business plan says where you are going, an action plan says who does what, by when, with which resources and how you will know it worked.</p>
<p>A solid action plan answers these questions for every step:</p>
<ul><li><strong>What</strong> task must be done?</li><li><strong>Who</strong> is responsible?</li><li><strong>When</strong> is the deadline or milestone?</li><li><strong>Resources:</strong> budget, equipment, people needed</li><li><strong>Measure:</strong> the result that shows success</li></ul>
<table><thead><tr><th>Task</th><th>Owner</th><th>Deadline</th><th>Budget</th></tr></thead><tbody>
<tr><td>Order new oven</td><td>Manager</td><td>March 1</td><td>$4,000</td></tr>
<tr><td>Train two bakers</td><td>Head baker</td><td>March 20</td><td>$300</td></tr>
<tr><td>Launch catering menu</td><td>Owner</td><td>April 1</td><td>$500 ads</td></tr></tbody></table>
<p>Break big goals into small steps, put them in order, and plan for obstacles. Share the plan so every person knows their part. Then connect it to monitoring: milestones let you notice delays early and adjust.</p>
<div class="tip"><p>Business plan = the big picture. Action plan = the to-do list with names, dates and budgets.</p></div>` }
  ],
  keyTerms:[
    {term:'Business plan', def:'A written document describing the business, its market, operations and financial projections.'},
    {term:'Executive summary', def:'A one-page overview placed first in a business plan but written last.'},
    {term:'Lean plan', def:'A short, one- or two-page plan used to test ideas quickly.'},
    {term:'Financial projections', def:'Forecasts of income, cash flow and balance sheet for future periods.'},
    {term:'Action plan', def:'A list of tasks with owners, deadlines, resources and measures needed to reach a goal.'},
    {term:'Milestone', def:'A checkpoint that shows progress toward a goal.'}
  ],
  traps:['Writing the executive summary first: it summarizes the finished plan, so write it last.','Treating the business plan and the action plan as the same thing.','Using unsupported, overly optimistic sales projections.'],
  explainer:null, video:null, caseFrequent:false },

{ id:'ent-sm-measuring-results', area:'SM', title:'Metrics, KPIs and tracking performance',
  pis:['SM:074','SM:027','SM:005','SM:006'], minutes:9,
  sections:[
  { pi:'SM:074', heading:'Selecting metrics for organizational success', html:`<p>A <strong>metric</strong> is a number used to measure how a business is doing. Choosing metrics means deciding what "success" means for your mission and then picking numbers that show it. Pick a few that matter rather than tracking everything.</p>
<p>Useful metrics fall into groups:</p>
<ul><li><strong>Financial:</strong> revenue, gross profit margin, net profit margin, cash on hand</li><li><strong>Customer:</strong> satisfaction score, repeat-purchase rate, number of complaints</li><li><strong>Operations:</strong> order accuracy, inventory turnover, average wait time</li><li><strong>People:</strong> employee turnover, training hours</li></ul>
<p>The <strong>balanced scorecard</strong> reminds owners not to look only at money. It uses four views: financial, customer, internal processes, and learning and growth. A café that watches only daily sales may miss slipping service quality until customers leave.</p>
<p>Good metrics are tied to goals, measurable with available data, and compared with something: last year, the budget, or an industry average. Apply metrics consistently and review them on a schedule.</p>
<div class="example"><h4>Example</h4><p>A cleaning service's goal is to grow through referrals. It tracks repeat-customer rate and the percent of new clients who came from a referral, not just total revenue.</p></div>` },
  { pi:'SM:027', heading:'Key performance indicators, dashboards and benchmarks', html:`<p><strong>Key performance indicators (KPIs)</strong> are the few most important metrics linked directly to strategic goals. All KPIs are metrics, but not all metrics are KPIs. A food truck might track many numbers, but its KPIs could be sales per service hour, food-cost percentage and customer rating.</p>
<p>Owners display KPIs in two common tools:</p>
<ul><li><strong>Dashboard:</strong> a one-screen, often real-time display of current numbers, like a car's instrument panel</li><li><strong>Scorecard:</strong> a periodic report that compares KPIs with targets across several perspectives</li></ul>
<p><strong>Benchmarking</strong> means comparing your KPIs with a standard to see how you really stack up. Common benchmarks are your own past results (internal), a direct competitor (competitive), and industry averages from trade associations or published reports (industry).</p>
<p>A KPI has a target, a time frame and an owner. Use a color code such as green, yellow and red so problems stand out. Review the KPIs often enough to act on them.</p>
<div class="tip"><p>Metric = any measure. KPI = a measure tied to a key goal. Benchmark = the standard you compare it with.</p></div>
<p>Avoid vanity metrics, numbers that look impressive but do not lead to decisions, such as social-media followers who never buy.</p>` },
  { pi:'SM:005', heading:'Analyzing operating results against budget and industry', html:`<p>A <strong>budget</strong> is a plan for expected revenue and expenses. Analyzing operating results means comparing what actually happened to the budget and to industry norms, finding the gap, and deciding what to do.</p>
<div class="formula">Variance = Actual − Budget</div>
<p>A variance is <strong>favorable</strong> when it helps profit (revenue above budget or expenses below budget) and <strong>unfavorable</strong> when it hurts profit.</p>
<div class="example"><h4>Example</h4><p>A café budgeted $20,000 in monthly sales but earned $18,500. The variance is 18,500 − 20,000 = −$1,500, or −7.5 percent (1,500 ÷ 20,000), which is unfavorable. Food costs were budgeted at $6,000 and came in at $6,600, a $600 unfavorable variance. Together they explain a profit shortfall.</p></div>
<p>Next, ask why. Was the cause price, volume, waste or a one-time event? Then compare with <strong>industry data</strong>. If the café's food cost is 35.7 percent of sales (6,600 ÷ 18,500) and similar cafés run closer to thirty percent, the problem is bigger than this month's budget.</p>
<p>Corrective actions might include adjusting portions, renegotiating with suppliers, or changing the budget if it was unrealistic. Always investigate large variances, favorable or not.</p>` },
  { pi:'SM:006', heading:'Tracking performance of the business plan', html:`<p>A plan only helps if you follow up. <strong>Tracking</strong> means regularly checking real results against the plan's goals, milestones and financial projections, then adjusting. Think of it as a loop: plan, act, measure, adjust.</p>
<ol><li><strong>Set checkpoints.</strong> Monthly for finances, weekly for fast-moving numbers like sales.</li><li><strong>Collect data.</strong> Use accounting records, point-of-sale reports and customer feedback.</li><li><strong>Compare to the plan.</strong> Highlight variances using KPIs and the dashboard.</li><li><strong>Diagnose causes.</strong> Is the plan unrealistic, or is execution weak?</li><li><strong>Take action.</strong> Fix the operation, revise the plan, or change the goal.</li><li><strong>Communicate.</strong> Tell employees, lenders or investors what changed.</li></ol>
<p>Cash flow deserves special attention for a young business. A start-up can show a profit on paper and still run out of cash, so compare projected and actual cash each month.</p>
<div class="example"><h4>Example</h4><p>A laundromat's plan projected sixty percent machine utilization by month six. Month six shows forty-five percent. The owner checks hours, pricing and local competition, then adds a wash-and-fold service and updates the plan.</p></div>` }
  ],
  keyTerms:[
    {term:'Metric', def:'A number used to measure part of business performance.'},
    {term:'KPI', def:'A key performance indicator: a critical metric tied to a strategic goal.'},
    {term:'Dashboard', def:'A one-screen display of current KPIs.'},
    {term:'Benchmarking', def:'Comparing your results with past results, competitors or industry standards.'},
    {term:'Balanced scorecard', def:'A set of measures across financial, customer, internal process, and learning and growth views.'},
    {term:'Budget variance', def:'Actual results minus budgeted amounts.'},
    {term:'Favorable variance', def:'A difference that improves profit.'}
  ],
  traps:['Calling a higher-than-budget expense a favorable variance: extra expense hurts profit.','Tracking only financial numbers and ignoring customer and process measures.','Assuming a profitable plan means enough cash: profit and cash flow differ.'],
  explainer:null, video:null, caseFrequent:false },

{ id:'ent-sm-management-change', area:'SM', title:'Ethics, management influences and managing change',
  pis:['SM:002','SM:028','SM:094','SM:095'], minutes:9,
  sections:[
  { pi:'SM:002', heading:'The nature of managerial ethics', html:`<p><strong>Ethics</strong> are principles of right and wrong that guide behavior. <strong>Managerial ethics</strong> are the standards managers use when making decisions that affect employees, customers, owners and the community. Law is the minimum; ethics asks what is right even when no law applies.</p>
<p>Managers face ethical issues in areas such as:</p>
<ul><li>Honest advertising and pricing</li><li>Fair treatment and pay of employees</li><li>Conflicts of interest, such as hiring a relative over a better candidate or favoring a supplier who gives gifts</li><li>Accurate record keeping and tax reporting</li><li>Confidentiality of customer data</li><li>Environmental impact</li></ul>
<p>Owners promote ethical behavior with a written <strong>code of ethics</strong>, training, a way to report problems without fear (whistleblower protection) and, most important, their own example. Employees copy what leaders do, not what a poster says.</p>
<p>A simple decision test: Is it legal? Is it fair to everyone affected? Would I be comfortable if it were public? Ethical companies often earn more trust, loyalty and long-term profit.</p>
<div class="example"><h4>Example</h4><p>A daycare director notices a staff-to-child ratio slipping below the licensed requirement during a busy week. She hires temporary help instead of hiding the problem, because safety and honesty come first.</p></div>` },
  { pi:'SM:028', heading:'Factors that influence management', html:`<p>Managers do not work in a vacuum. Two groups of forces shape how they plan, organize, lead and control.</p>
<h4>Internal factors</h4>
<ul><li><strong>Owner's values and style:</strong> a hands-on founder manages differently from a delegator</li><li><strong>Size and structure:</strong> a five-person shop uses informal communication</li><li><strong>Culture:</strong> shared beliefs and habits of the team</li><li><strong>Resources:</strong> money, skills, equipment, time</li><li><strong>Mission and goals</strong></li></ul>
<h4>External factors</h4>
<ul><li><strong>Economy:</strong> recession, inflation, interest rates</li><li><strong>Laws and regulations</strong></li><li><strong>Technology</strong></li><li><strong>Competition and customers</strong></li><li><strong>Social trends:</strong> changing workforce expectations</li></ul>
<p>As the business grows, management changes. A founder who does everything must learn to delegate, write procedures and develop supervisors. A tight labor market may push a manager to offer better schedules and training to keep staff.</p>
<div class="tip"><p>Internal factors are controllable (values, culture, resources). External factors must be adapted to (economy, laws, competition).</p></div>` },
  { pi:'SM:094', heading:'Innovation, learning and change', html:`<p>These three ideas feed each other in a loop.</p>
<ul><li><strong>Innovation</strong> is introducing a new or improved product, service, process or business model.</li><li><strong>Change</strong> is any shift in how the business operates.</li><li><strong>Learning</strong> is gaining knowledge and skills from experience, customers and mistakes.</li></ul>
<p>Innovation creates change, because a new tool or menu alters work routines. Change requires learning, because employees need new skills. Learning then sparks new ideas, which brings more innovation. A business that stops learning falls behind competitors who keep improving.</p>
<p>A <strong>learning organization</strong> encourages questions, trains staff, reviews results after projects and treats small failures as lessons. Owners can support this by setting aside training time, collecting customer suggestions and testing ideas on a small scale before a full launch.</p>
<div class="example"><h4>Example</h4><p>A 3D-printing start-up tries a new resin printer (innovation). Production steps change, and staff learn new safety procedures (change and learning). Customer feedback shows demand for custom parts, leading to a new service (further innovation).</p></div>
<p>The relationship is circular, not a single line, and the owner's job is to keep the cycle healthy.</p>` },
  { pi:'SM:095', heading:'The nature of change management', html:`<p><strong>Change management</strong> is a planned, structured approach to moving people and the business from the current way of working to a new one. Change is often resisted, so planning matters as much as the idea itself.</p>
<p>People resist change for common reasons: fear of the unknown, fear of losing jobs or status, extra work, lack of trust, and not understanding why the change is needed.</p>
<p>A simple model by Kurt Lewin has three stages:</p>
<ol><li><strong>Unfreeze:</strong> explain why the current way no longer works</li><li><strong>Change:</strong> introduce the new process with training and support</li><li><strong>Refreeze:</strong> make the new way routine through policies, rewards and follow-up</li></ol>
<p>Effective managers also:</p>
<ul><li>Communicate early, honestly and often</li><li>Involve employees in planning</li><li>Provide training and resources</li><li>Celebrate early wins</li><li>Monitor progress and fix problems</li></ul>
<div class="example"><h4>Example</h4><p>A local café switches to a new ordering app. The owner explains the reason (long lines), lets baristas test it, trains everyone for a week, and then removes the old paper tickets so the new method sticks.</p></div>
<div class="tip"><p>Skipping communication is the fastest way to create resistance.</p></div>` }
  ],
  keyTerms:[
    {term:'Managerial ethics', def:'Standards of right and wrong used by managers when making decisions.'},
    {term:'Code of ethics', def:'A written statement of the behavior a business expects.'},
    {term:'Conflict of interest', def:'A situation where personal interests could affect business judgment.'},
    {term:'Innovation', def:'A new or improved product, service, process or business model.'},
    {term:'Learning organization', def:'A business that continually gains and applies new knowledge.'},
    {term:'Change management', def:'A planned approach to moving people and the business through change.'},
    {term:'Unfreeze-change-refreeze', def:'Lewin\'s three-stage model of organizational change.'}
  ],
  traps:['Thinking something legal is automatically ethical.','Treating innovation, learning and change as unrelated rather than a connected cycle.','Starting a change without explaining why: communication reduces resistance.'],
  explainer:null, video:null, caseFrequent:false }
];
