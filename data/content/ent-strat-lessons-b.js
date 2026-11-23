export default [
{ id:'ent-bl-legal-basics', area:'BL', title:'Choosing a legal form, taxes, reports and compliance',
  pis:['BL:006','BL:009','BL:010','BL:011'], minutes:10,
  sections:[
  { pi:'BL:006', heading:'Selecting a form of business ownership', html:`<p>The legal form decides who owns the business, who is personally responsible for debts, how profits are taxed and how much paperwork is required. Owners weigh several factors: <strong>liability</strong>, <strong>taxes</strong>, <strong>cost and complexity</strong>, <strong>control</strong>, ability to <strong>raise money</strong> and plans for the future.</p>
<table><thead><tr><th>Form</th><th>Liability</th><th>Taxes</th><th>Notes</th></tr></thead><tbody>
<tr><td>Sole proprietorship</td><td>Unlimited personal liability</td><td>Profit taxed on owner's personal return</td><td>Easiest and cheapest; one owner</td></tr>
<tr><td>General partnership</td><td>Partners are personally liable, including for each other's business acts</td><td>Pass-through to partners</td><td>Needs a written partnership agreement</td></tr>
<tr><td>Limited liability company (LLC)</td><td>Owners' personal assets generally protected</td><td>Pass-through by default; may elect corporate treatment</td><td>Flexible; state filing fees</td></tr>
<tr><td>C corporation</td><td>Shareholders' liability limited</td><td>Corporation taxed, then dividends taxed again (double taxation)</td><td>Best for raising outside investment</td></tr>
<tr><td>S corporation</td><td>Limited</td><td>Pass-through, no corporate-level federal tax</td><td>A tax election with eligibility limits (such as at most one hundred shareholders and one class of stock)</td></tr></tbody></table>
<p>A solo dog-walker may begin as a sole proprietor. When she hires walkers and takes on larger risk, an LLC protects her house and savings. A start-up planning to sell shares to venture investors often becomes a C corporation. Limited liability is not a shield against your own wrongdoing or personally guaranteed loans. Owners should consult an attorney and accountant before choosing.</p>` },
  { pi:'BL:009', heading:'Tax regulations on business', html:`<p>Businesses owe several kinds of tax. Knowing which ones apply, and when to pay, is part of staying legal.</p>
<ul><li><strong>Income tax:</strong> federal, and in most states, on business profit. Sole proprietors, partners and LLC members usually report profit on personal returns; C corporations file their own return.</li><li><strong>Self-employment tax:</strong> owners who work for themselves pay both the employee and employer shares of Social Security and Medicare taxes.</li><li><strong>Payroll taxes:</strong> employers withhold income tax and the employee share of Social Security and Medicare from paychecks, add the employer share, and send the money to the government on schedule. Unemployment taxes are also paid by employers.</li><li><strong>Sales tax:</strong> collected from customers on taxable sales and passed to the state. The seller holds this money in trust; it is not business income.</li><li><strong>Property tax:</strong> on real estate and sometimes business equipment.</li><li><strong>Excise taxes:</strong> on certain goods such as fuel or tobacco.</li></ul>
<p>A business that has employees or is not a sole proprietorship generally needs an <strong>Employer Identification Number (EIN)</strong> from the Internal Revenue Service. Owners pay estimated taxes each quarter since no employer withholds for them.</p>
<div class="example"><h4>Example</h4><p>A food truck owner collects eight percent sales tax on a ten-dollar meal. The customer pays $10.80. The owner keeps $10.00 as sales and sends $0.80 to the state.</p></div>
<div class="tip"><p>Tax avoidance (legal planning, such as deducting real business expenses) is allowed. Tax evasion (hiding income) is a crime.</p></div>` },
  { pi:'BL:010', heading:'Reporting requirements', html:`<p>Beyond paying tax, businesses must file <strong>reports</strong> with government agencies. Missing deadlines can mean penalties and interest, or even loss of the right to operate.</p>
<ul><li><strong>Formation and annual reports:</strong> LLCs and corporations usually file organizing documents with the state and a periodic report to stay in good standing.</li><li><strong>Tax returns:</strong> annual federal and state income tax returns, plus estimated tax payments.</li><li><strong>Payroll reports:</strong> quarterly employment tax returns, annual wage statements (Form W-2) to employees, and information forms (such as Form 1099-NEC) for certain independent contractors.</li><li><strong>Sales tax returns:</strong> monthly, quarterly or yearly, depending on the state and sales volume.</li><li><strong>New-hire and eligibility records:</strong> employers must verify work eligibility with Form I-9 and report new hires to the state.</li><li><strong>Industry reports:</strong> for example, workplace injury records for safety agencies and licensing renewals for health or child-care regulators.</li></ul>
<p>Good <strong>record keeping</strong> makes reporting easy. Keep receipts, invoices, payroll records and bank statements, and store them for the length of time the rules require. Many owners use accounting software and a calendar of due dates, or hire a bookkeeper or accountant.</p>
<div class="example"><h4>Example</h4><p>A daycare must keep staff background checks, child-ratio logs and licensing paperwork current, besides tax and payroll filings.</p></div>
<p>Contractors versus employees matters: misclassifying employees as contractors to avoid payroll taxes can lead to penalties.</p>` },
  { pi:'BL:011', heading:'Strategies for legal and government compliance', html:`<p><strong>Compliance</strong> means following the laws, regulations and standards that apply to the business. Owners should plan for it, not react after a problem. A compliance strategy has several parts.</p>
<ol><li><strong>Identify requirements.</strong> List all federal, state and local rules: business licenses, zoning, health permits, sales tax permits, employment laws, safety rules and industry rules. Agencies such as the Small Business Administration and local chambers of commerce publish checklists.</li><li><strong>Assign responsibility.</strong> One person, often the owner in a small business, owns each requirement.</li><li><strong>Build a compliance calendar</strong> with renewal and filing dates, with reminders ahead of the deadline.</li><li><strong>Train employees</strong> on rules that affect their jobs, such as food safety or harassment prevention.</li><li><strong>Keep records</strong> that prove you complied.</li><li><strong>Get expert help:</strong> an attorney, accountant or insurance agent.</li><li><strong>Audit and update</strong> regularly, because laws change.</li></ol>
<p>Insurance (general liability, workers' compensation, property) helps manage risk but does not replace compliance. If a violation occurs, correct it promptly, document the fix and cooperate with inspectors.</p>
<div class="example"><h4>Example</h4><p>Before opening a bakery, Marcus checks zoning for his storefront, applies for a food-service permit, schedules a health inspection and registers for a sales-tax permit. He puts renewal dates in a shared calendar.</p></div>
<div class="tip"><p>Compliance is cheaper than the fines, lawsuits and shutdowns that follow non-compliance.</p></div>` }
  ],
  keyTerms:[
    {term:'Limited liability', def:'Protection of owners\' personal assets from business debts and lawsuits.'},
    {term:'Pass-through taxation', def:'Business profit is taxed on the owners\' personal returns instead of at the business level.'},
    {term:'Double taxation', def:'C corporation profit taxed once at the corporate level and again when paid out as dividends.'},
    {term:'Employer Identification Number (EIN)', def:'A federal tax ID for a business.'},
    {term:'Self-employment tax', def:'Social Security and Medicare tax paid by people who work for themselves.'},
    {term:'Compliance', def:'Following laws, regulations and standards that apply to a business.'},
    {term:'Compliance calendar', def:'A schedule of filing, renewal and inspection dates.'}
  ],
  traps:['Assuming an LLC protects owners from everything: personal guarantees and personal wrongdoing are not shielded.','Mixing up pass-through taxation (LLC, partnership, S corporation) with double taxation (C corporation).','Treating sales tax collected from customers as business income.','Confusing tax avoidance (legal) with tax evasion (illegal).'],
  explainer:null, video:'v-ent-legal-forms', caseFrequent:false },

{ id:'ent-bl-workplace-law', area:'BL', title:'Employment and workplace regulations',
  pis:['BL:007','BL:008'], minutes:6,
  sections:[
  { pi:'BL:007', heading:'The nature of human resources regulations', html:`<p>Laws govern how employers hire, pay, treat and dismiss workers. A growing business should know the main federal rules. Many have size thresholds, and states and cities may add stricter rules.</p>
<ul><li><strong>Title VII of the Civil Rights Act:</strong> bans employment discrimination based on race, color, religion, sex (including pregnancy and sexual orientation or gender identity under current court interpretation) and national origin. Applies to employers with fifteen or more employees.</li><li><strong>Age Discrimination in Employment Act:</strong> protects workers age forty and older.</li><li><strong>Equal Pay Act:</strong> requires equal pay for equal work regardless of sex.</li><li><strong>Fair Labor Standards Act (FLSA):</strong> sets minimum wage, overtime pay of at least one and one-half times the regular rate for hours over forty in a week for non-exempt employees, recordkeeping and child-labor limits.</li><li><strong>Family and Medical Leave Act (FMLA):</strong> up to twelve weeks of unpaid, job-protected leave for qualifying reasons at employers with fifty or more employees.</li><li><strong>Immigration rules:</strong> employers verify work eligibility with Form I-9.</li><li><strong>Workers' compensation:</strong> state-regulated coverage, required in nearly every state, for job-related injuries.</li></ul>
<p>The Equal Employment Opportunity Commission (EEOC) enforces most anti-discrimination laws, and the Department of Labor enforces wage rules.</p>
<div class="example"><h4>Example</h4><p>A bakery's baker works forty-six hours in a week at fifteen dollars per hour and is non-exempt. Overtime hours are six, paid at $22.50 each (15 × 1.5), so overtime pay is $135.</p></div>
<div class="tip"><p>Hire, pay and fire on job-related reasons and document them. Misclassifying workers or skipping overtime are common small-business violations.</p></div>` },
  { pi:'BL:008', heading:'The nature of workplace regulations', html:`<p>Workplace regulations protect the safety and rights of people at work. Two key areas are safety (OSHA) and disability rights (ADA).</p>
<h4>OSHA</h4>
<p>The <strong>Occupational Safety and Health Act</strong> created the Occupational Safety and Health Administration (OSHA). Employers must give a workplace free of recognized serious hazards, and also train employees, supply needed protective equipment, label hazardous chemicals and post required notices. Many employers must keep injury and illness records, and all employers must report a work-related fatality within eight hours and an in-patient hospitalization within twenty-four hours. Employees may report hazards and cannot be punished for doing so. Example: a restaurant needs non-slip floors, knife and burn safety training and a fire plan.</p>
<h4>ADA</h4>
<p>The <strong>Americans with Disabilities Act</strong> bars discrimination against qualified people with disabilities. For employers with fifteen or more employees, it requires <strong>reasonable accommodation</strong>, a change to the job or workplace that lets a qualified person do the essential duties, unless it causes undue hardship (significant difficulty or expense). Examples: a modified schedule, an adjustable desk, or screen-reading software. Businesses open to the public, regardless of size, must also keep facilities accessible, such as a ramp or accessible restroom, where readily achievable.</p>
<p>Other workplace rules cover harassment prevention, workers' compensation and posting notices.</p>
<div class="tip"><p>OSHA = safety. ADA = disability access and accommodation.</p></div>` }
  ],
  keyTerms:[
    {term:'Title VII', def:'Federal law banning job discrimination based on race, color, religion, sex or national origin.'},
    {term:'FLSA', def:'Fair Labor Standards Act: minimum wage, overtime and child-labor rules.'},
    {term:'FMLA', def:'Law giving eligible employees up to twelve weeks of unpaid, job-protected leave.'},
    {term:'EEOC', def:'Agency that enforces federal anti-discrimination employment laws.'},
    {term:'OSHA', def:'Agency and law that set and enforce workplace safety standards.'},
    {term:'Reasonable accommodation', def:'A workplace change that lets a qualified person with a disability perform essential job duties.'},
    {term:'Non-exempt employee', def:'A worker entitled to minimum wage and overtime pay.'}
  ],
  traps:['Mixing up OSHA (safety) with the ADA (disability).','Forgetting that overtime is time and one-half for hours over forty per week, not just any long day.','Ignoring that laws often have employee-count thresholds, such as fifteen for Title VII and the ADA and fifty for FMLA.'],
  explainer:null, video:null, caseFrequent:false },

{ id:'ent-ei-leading-people', area:'EI', title:'Leading people: style, teams and role modeling',
  pis:['EI:105','EI:044','EI:111'], minutes:7,
  sections:[
  { pi:'EI:105', heading:'Adapting management style to personality type', html:`<p>People differ in how they work, communicate and respond to direction. A manager who treats everyone the same often gets uneven results. <strong>Adapting your management style</strong> means changing how you communicate, delegate and give feedback to suit each person while keeping the same standards for everyone.</p>
<p>Personality models help you notice patterns. One popular model is <strong>DISC</strong>, which describes four tendencies:</p>
<ul><li><strong>Dominance:</strong> direct, results-driven. Give goals and let them move quickly.</li><li><strong>Influence:</strong> outgoing and enthusiastic. Give recognition and chances to talk and collaborate.</li><li><strong>Steadiness:</strong> calm, loyal and team-minded. Give notice before changes and a supportive tone.</li><li><strong>Conscientiousness:</strong> careful and detail-focused. Give clear data, standards and time to be accurate.</li></ul>
<p>Models are tools, not labels. People are mixtures, so listen and observe before assuming.</p>
<p>Another idea is <strong>situational leadership</strong>: match your style to a worker's skill and confidence. A new hire needs <em>directing</em> (clear step-by-step instructions). A learner gaining skills needs <em>coaching</em>. A capable but unsure employee needs <em>supporting</em>. A highly skilled, confident employee needs <em>delegating</em>.</p>
<div class="example"><h4>Example</h4><p>A cleaning-service owner gives a brand-new crew member a checklist and shadowing (directing), but lets an experienced team lead plan her own routes (delegating).</p></div>` },
  { pi:'EI:044', heading:'Encouraging team building', html:`<p><strong>Team building</strong> is the process of turning a group of individuals into a team that works toward shared goals. In a small business, where each person's job matters a lot, teamwork can decide whether the shop runs smoothly on a busy Saturday.</p>
<p>Psychologist Bruce Tuckman described four stages teams often pass through:</p>
<ol><li><strong>Forming:</strong> members meet and are polite but unsure</li><li><strong>Storming:</strong> conflicts appear over roles and methods</li><li><strong>Norming:</strong> agreements and trust grow</li><li><strong>Performing:</strong> the team works effectively together</li></ol>
<p>Managers encourage team building by:</p>
<ul><li>Setting clear, shared goals and defined roles</li><li>Encouraging open communication and listening</li><li>Building trust through fairness and consistency</li><li>Cross-training so people understand each other's jobs</li><li>Recognizing team success, not only individual stars</li><li>Handling conflict early and respectfully</li><li>Holding short team meetings and occasional social activities</li></ul>
<p>Diverse skills and viewpoints make teams stronger when members respect each other.</p>
<div class="example"><h4>Example</h4><p>A food-truck crew hits a rough patch in storming. The owner holds a short huddle, assigns clear stations, rotates tasks and celebrates a record-sales day, helping the crew move to norming and performing.</p></div>` },
  { pi:'EI:111', heading:'Acting as a role model for organizational standards and values', html:`<p>A <strong>role model</strong> is a person whose behavior others copy. In a business, employees watch what owners and managers actually do. If the stated value is honesty but the owner pads an invoice, the team learns the real rule.</p>
<p>Leaders show standards by:</p>
<ul><li><strong>Practicing what they preach:</strong> arrive on time, follow safety rules, respect policies</li><li><strong>Being consistent:</strong> apply rules fairly to everyone, including themselves</li><li><strong>Admitting mistakes</strong> and fixing them</li><li><strong>Treating people with respect</strong>, including customers and vendors</li><li><strong>Giving credit</strong> and taking responsibility</li><li><strong>Showing professionalism</strong> in speech, appearance and ethics</li></ul>
<p>Written values (a code of conduct or core-values list) are only the starting point. Role modeling brings them to life, builds trust and shapes culture. This is especially important in small businesses where the owner is highly visible.</p>
<div class="example"><h4>Example</h4><p>A daycare's core value is "safety first." The director washes her hands at each required point, double-checks sign-out procedures herself, and thanks staff who report hazards. New teachers copy her habits.</p></div>
<div class="tip"><p>Culture is what the leader does repeatedly, not what the poster says.</p></div>` }
  ],
  keyTerms:[
    {term:'Management style', def:'The way a manager communicates, directs, delegates and gives feedback.'},
    {term:'DISC', def:'A model of four behavior tendencies: dominance, influence, steadiness and conscientiousness.'},
    {term:'Situational leadership', def:'Adjusting leadership style to a worker\'s skill and confidence for a task.'},
    {term:'Team building', def:'Activities and practices that help a group work effectively together.'},
    {term:'Tuckman\'s stages', def:'Forming, storming, norming and performing.'},
    {term:'Role model', def:'A person whose behavior sets an example for others.'}
  ],
  traps:['Thinking an adapted style means lower standards for some people: the style changes, the expectations do not.','Treating personality labels as fixed boxes for people.','Assuming conflict means a team has failed: storming is a normal stage.'],
  explainer:null, video:null, caseFrequent:false },

{ id:'ent-ei-relationships', area:'EI', title:'Stakeholders and business relationships',
  pis:['EI:113','EI:114','EI:115','EI:116'], minutes:8,
  sections:[
  { pi:'EI:113', heading:'Determining stakeholder expectations', html:`<p>A <strong>stakeholder</strong> is any person or group affected by, or with an interest in, the business. Stakeholders are not the same as shareholders (owners of stock), although shareholders are one type of stakeholder.</p>
<p>Common small-business stakeholders include <strong>owners and investors, employees, customers, suppliers, lenders, the community and government</strong>. Each expects something different:</p>
<ul><li>Owners and investors: profit and growth</li><li>Employees: fair pay, safe conditions, respect</li><li>Customers: quality, value, good service</li><li>Suppliers: timely payment, steady orders</li><li>Lenders: repayment on time</li><li>Community: jobs, honest dealings, responsible behavior</li><li>Government: legal compliance and tax payment</li></ul>
<p>To <strong>determine expectations</strong>, ask. Use customer surveys, employee meetings, supplier conversations, one-on-one interviews with lenders or investors, and review of contracts and reviews. Then <strong>prioritize</strong> using a stakeholder map that rates each group's power (ability to affect you) and interest (how much they care).</p>
<p>Expectations can conflict, such as customers wanting low prices while employees want higher wages. Managers weigh these tradeoffs using the mission, ethics and the law, and communicate decisions honestly.</p>
<div class="example"><h4>Example</h4><p>A 3D-printing start-up learns from a survey that customers want delivery in three days, while its supplier needs two weeks' notice for materials. The owner adjusts inventory so both can be satisfied.</p></div>` },
  { pi:'EI:114', heading:'Establishing strategic relationships', html:`<p>A <strong>strategic relationship</strong> is a purposeful connection with another person or organization that helps both sides reach important goals. Unlike a one-time transaction, it is built on trust and repeated, mutual benefit.</p>
<p>Examples for a small business:</p>
<ul><li><strong>Strategic alliances and partnerships:</strong> a bakery and a coffee shop that sell each other's products</li><li><strong>Key suppliers:</strong> a reliable vendor who offers priority and better terms</li><li><strong>Mentors and advisors:</strong> experienced owners, SCORE or small business development center counselors</li><li><strong>Lenders and investors</strong></li><li><strong>Professional networks:</strong> chambers of commerce and trade associations</li><li><strong>Distributors or referral partners</strong></li></ul>
<p>To establish them, start by identifying what you need (customers, capital, expertise, supplies) and who could help. Then reach out with a clear, specific proposal, show what you can offer in return, meet commitments, and keep in touch. Put the terms of important arrangements in writing, such as a contract or agreement.</p>
<div class="example"><h4>Example</h4><p>A cleaning service forms a relationship with a property-management company. The service gets steady jobs and the manager gets a trusted, insured vendor.</p></div>
<div class="tip"><p>Strategic relationships are chosen on purpose, built on mutual benefit and kept up over time.</p></div>` },
  { pi:'EI:115', heading:'Sharing best practices with key individuals and groups', html:`<p>A <strong>best practice</strong> is a method that has consistently produced good results and can be repeated. <strong>Sharing best practices</strong> means passing these methods along to employees, partners and peers so everyone benefits and mistakes are not repeated.</p>
<p>Ways to share:</p>
<ul><li><strong>Inside the business:</strong> team meetings, written procedures and checklists, training and mentoring, short "what worked" notes after busy periods</li><li><strong>With partners and suppliers:</strong> joint planning sessions and shared performance reports</li><li><strong>With the wider community:</strong> trade associations, industry events, peer networks and local business groups</li></ul>
<p>Choose the right audience and format. Frontline staff need short, practical steps. Lenders or investors may need a summary with results. Be accurate, explain <em>why</em> the method works and give credit to the people who created it.</p>
<p>Learn as well as teach: <strong>benchmarking</strong> against successful businesses brings in ideas. Share carefully, though. Protect confidential information, trade secrets and customers' private data.</p>
<div class="example"><h4>Example</h4><p>A laundromat owner finds that posting clear price and instruction signs cut customer complaints by a third. She writes it up and shares it with the local owners' association and with her own attendants.</p></div>` },
  { pi:'EI:116', heading:'Leveraging business relationships', html:`<p>To <strong>leverage</strong> relationships means using existing connections to create value for your business, while giving value back. It is not about using people. Healthy leverage rests on trust and reciprocity.</p>
<p>Ways owners leverage relationships:</p>
<ul><li><strong>Referrals and introductions</strong> to new customers and partners</li><li><strong>Better supplier terms</strong>, such as volume discounts or extended payment time earned through a long, reliable record</li><li><strong>Co-marketing:</strong> sharing event booths, social media promotions or bundled offers</li><li><strong>Shared resources:</strong> joint purchasing, delivery or equipment</li><li><strong>Expertise and advice</strong> from mentors and advisors</li><li><strong>Access to funding</strong> through lenders and investors who know your track record</li></ul>
<p>To keep relationships strong, follow through on promises, say thank you, share credit, refer business to others and check in even when you do not need something. Track key contacts, using a customer relationship management (CRM) tool or a simple spreadsheet.</p>
<div class="example"><h4>Example</h4><p>A café owner who always pays her flour supplier on time asks for a thirty-day payment term during slow winter months, easing her cash flow. She also sends customers to the supplier's retail shop.</p></div>
<div class="tip"><p>Give first, ask second. Relationships that only take will not last.</p></div>` }
  ],
  keyTerms:[
    {term:'Stakeholder', def:'Any person or group affected by, or interested in, a business.'},
    {term:'Stakeholder map', def:'A tool rating stakeholders by their power and interest.'},
    {term:'Strategic relationship', def:'A purposeful, mutually beneficial connection with another party.'},
    {term:'Strategic alliance', def:'An agreement between businesses to cooperate toward shared goals.'},
    {term:'Best practice', def:'A proven method that reliably produces good results.'},
    {term:'Benchmarking', def:'Comparing your methods and results with strong performers.'},
    {term:'Reciprocity', def:'Giving value in return for value received.'}
  ],
  traps:['Confusing stakeholders with shareholders: stakeholders include employees, customers, suppliers and the community, not just stock owners.','Treating networking as one-way taking instead of mutual benefit.','Sharing best practices without protecting confidential information.'],
  explainer:null, video:null, caseFrequent:false }
];
