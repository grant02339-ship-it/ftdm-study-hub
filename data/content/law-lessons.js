// Business Law (BL) lessons for FTDM Study Hub. Plain data only.
export default [
  {
    id: 'bl-law-courts',
    area: 'BL',
    title: 'Sources of law, courts and legal procedure',
    pis: ['BL:067', 'BL:068', 'BL:070', 'BL:074'],
    minutes: 6,
    sections: [
      {
        pi: 'BL:067',
        heading: 'Where U.S. law comes from',
        html: `<p>Law is the set of rules a society enforces through its government. In the United States, those rules come from several <strong>sources</strong>, and they rank in a clear order.</p>
<ul>
<li><strong>Constitutional law:</strong> the U.S. Constitution is the supreme law of the land. Any federal or state law that conflicts with it can be struck down. Each state also has its own constitution.</li>
<li><strong>Statutory law:</strong> written laws passed by legislatures, meaning Congress and state legislatures. Cities and counties pass local laws called <em>ordinances</em>.</li>
<li><strong>Administrative law:</strong> rules and regulations written by government agencies such as the SEC or the EPA, using power Congress gave them.</li>
<li><strong>Case law (common law):</strong> law made by judges' decisions. Under <em>stare decisis</em>, courts follow <em>precedent</em>, meaning earlier rulings on similar facts, so the law stays predictable.</li>
</ul>
<p>Treaties and executive orders are also sources of law. Lawyers also sort law into categories. <strong>Criminal law</strong> deals with wrongs against society, and the government prosecutes them. <strong>Civil law</strong> deals with disputes between private parties, such as a broken contract. <strong>Substantive law</strong> sets out rights and duties, while <strong>procedural law</strong> sets out the steps for enforcing them in court.</p>
<div class="example"><h4>Example</h4><p>A bank must follow the Constitution, federal statutes such as the Truth in Lending Act, regulations written by federal agencies to carry out those statutes, and past court decisions that interpret them. If a state law clashed with a valid federal law, the federal law would generally win.</p></div>
<div class="tip"><p>Memory aid, top to bottom: <strong>Constitution, Statutes, Regulations, Cases</strong>. "Can Students Read Cases?"</p></div>`
      },
      {
        pi: 'BL:068',
        heading: 'The U.S. judicial system',
        html: `<p>The United States has a <strong>dual court system</strong>: a federal court system and a separate court system in each state. Most cases, such as traffic tickets, divorces and most contract disputes, are heard in state courts.</p>
<p>Both systems have the same basic levels:</p>
<ul>
<li><strong>Trial courts</strong> hear the evidence, listen to witnesses and decide the facts. In the federal system these are the <strong>U.S. district courts</strong>. Many states also have <em>small claims courts</em> for minor money disputes.</li>
<li><strong>Appellate courts</strong> review a trial court's decision for errors of law. They don't hold new trials or use juries. The federal system has 13 <strong>U.S. courts of appeals</strong>, also called circuit courts.</li>
<li><strong>Supreme courts</strong> are the highest level. The <strong>U.S. Supreme Court</strong> has nine justices and chooses which cases to hear. It is the final word on the meaning of the Constitution and federal law.</li>
</ul>
<p><strong>Jurisdiction</strong> is a court's power to hear a case. Federal courts hear cases about federal law or the Constitution (federal question cases), cases where the U.S. government is a party, and certain cases between citizens of different states (diversity cases). There are also specialized federal courts, such as <strong>bankruptcy courts</strong> and the U.S. Tax Court.</p>
<div class="example"><h4>Example</h4><p>An investor sues a brokerage firm for securities fraud under federal law. The case begins in a federal district court. If the losing side thinks the judge made a legal mistake, it can appeal to the court of appeals for that circuit, and then ask the Supreme Court to review it.</p></div>
<div class="tip"><p>Trial courts find <strong>facts</strong>. Appellate courts check the <strong>law</strong>.</p></div>`
      },
      {
        pi: 'BL:070',
        heading: 'How a lawsuit moves through the system',
        html: `<p>Legal procedure is the set of steps a case follows. Here are the usual stages of a <strong>civil lawsuit</strong>:</p>
<ol>
<li><strong>Pleadings:</strong> the <em>plaintiff</em>, the person suing, files a <em>complaint</em>. The <em>defendant</em> is served with a summons and files an <em>answer</em>, and may add a counterclaim.</li>
<li><strong>Pretrial motions:</strong> for example, a motion to dismiss argues that the complaint has no legal basis.</li>
<li><strong>Discovery:</strong> each side gathers evidence from the other through <em>depositions</em> (sworn out-of-court testimony), <em>interrogatories</em> (written questions) and requests for documents.</li>
<li><strong>Trial:</strong> jury selection, opening statements, presentation of evidence, closing arguments, and a verdict.</li>
<li><strong>Judgment and appeal:</strong> the court enters a judgment, and the losing side may appeal.</li>
</ol>
<p>The <strong>burden of proof</strong> differs by type of case. In a civil case the plaintiff must prove the claim by a <em>preponderance of the evidence</em>, meaning more likely true than not. In a criminal case the government must prove guilt <em>beyond a reasonable doubt</em>, a much higher standard. A <strong>statute of limitations</strong> sets a deadline for filing a lawsuit.</p>
<p>Many disputes never reach trial because of <strong>alternative dispute resolution (ADR)</strong>:</p>
<ul>
<li><strong>Negotiation:</strong> the parties work it out themselves.</li>
<li><strong>Mediation:</strong> a neutral mediator helps the parties reach their own agreement but cannot impose a decision.</li>
<li><strong>Arbitration:</strong> a neutral arbitrator hears both sides and makes a decision, usually binding. Disputes between customers and brokerage firms often go to FINRA arbitration.</li>
</ul>
<div class="tip"><p>Mediator <strong>suggests</strong>, arbitrator <strong>decides</strong>.</p></div>`
      },
      {
        pi: 'BL:074',
        heading: 'Administrative law and government agencies',
        html: `<p>Congress can't write every detailed rule for banking, pollution or workplace safety. Instead, it passes an <strong>enabling statute</strong> that creates an agency and gives it power over an area. <strong>Administrative law</strong> is the body of law that governs these agencies and the rules they make.</p>
<p>Agencies often hold all three kinds of government power:</p>
<ul>
<li><strong>Rulemaking (quasi-legislative):</strong> writing regulations that have the force of law. Under the Administrative Procedure Act, agencies usually publish a proposed rule, invite public comment, and then publish a final rule. Final rules are collected in the Code of Federal Regulations.</li>
<li><strong>Enforcement (executive):</strong> inspecting, investigating and bringing actions against violators.</li>
<li><strong>Adjudication (quasi-judicial):</strong> deciding disputes in hearings run by <em>administrative law judges</em>. Their decisions can usually be appealed to regular courts.</li>
</ul>
<p>Agencies that matter in finance include the <strong>SEC</strong> (securities markets), the <strong>FDIC</strong> (deposit insurance and bank supervision), the <strong>OCC</strong> (national banks), the <strong>CFPB</strong> (consumer financial products), the <strong>FTC</strong> (unfair or deceptive business practices) and the <strong>IRS</strong> (taxes).</p>
<div class="example"><h4>Example</h4><p>The Securities Exchange Act of 1934 created the SEC. The SEC then writes detailed rules on how public companies report their results, investigates companies that break those rules, and can bring enforcement actions with fines.</p></div>
<div class="tip"><p>Statutes come from Congress. Regulations come from agencies, using power Congress delegated.</p></div>`
      }
    ],
    keyTerms: [
      { term: 'Precedent', def: 'An earlier court decision that courts follow in later cases with similar facts (stare decisis).' },
      { term: 'Statutory law', def: 'Written laws passed by Congress, state legislatures or local governments.' },
      { term: 'Administrative law', def: 'Rules made by government agencies, and the law governing how those agencies act.' },
      { term: 'Jurisdiction', def: "A court's legal power to hear and decide a case." },
      { term: 'Appellate court', def: 'A court that reviews a lower court decision for errors of law, without a new trial or jury.' },
      { term: 'Discovery', def: 'The pretrial stage where each side gathers evidence through depositions, interrogatories and document requests.' },
      { term: 'Mediation', def: 'ADR in which a neutral person helps the parties reach their own agreement but cannot impose one.' },
      { term: 'Arbitration', def: 'ADR in which a neutral arbitrator hears both sides and makes a decision that is usually binding.' }
    ],
    traps: [
      'Mixing up mediation and arbitration: only an arbitrator makes a decision for the parties.',
      'Thinking appellate courts retry cases. They review legal errors and do not use juries.',
      'Confusing statutes (passed by legislatures) with regulations (written by agencies).',
      'Using the criminal standard "beyond a reasonable doubt" for civil cases, which use "preponderance of the evidence."'
    ],
    explainer: null,
    video: null,
    caseFrequent: false
  },
  {
    id: 'bl-contracts-agency',
    area: 'BL',
    title: 'Contracts, credit and agency',
    pis: ['BL:002', 'BL:071', 'BL:072'],
    minutes: 5,
    sections: [
      {
        pi: 'BL:002',
        heading: 'What makes a contract legally binding',
        html: `<p>A <strong>contract</strong> is an agreement that a court will enforce. A valid contract needs five elements:</p>
<ol>
<li><strong>Offer:</strong> a clear proposal to make a deal.</li>
<li><strong>Acceptance:</strong> agreement to the exact terms of the offer. Offer plus acceptance is called <em>mutual assent</em>, or a "meeting of the minds."</li>
<li><strong>Consideration:</strong> something of value that each side gives, such as money, goods, services or a promise.</li>
<li><strong>Capacity:</strong> both parties must be legally able to contract, meaning of legal age and of sound mind.</li>
<li><strong>Legality:</strong> the purpose must be legal.</li>
</ol>
<p>Contracts that go wrong fall into three groups. A <strong>void</strong> contract was never a contract at all, such as an agreement to commit a crime. A <strong>voidable</strong> contract is valid, but one party may cancel it, for example a minor, or someone tricked by fraud or pressured by duress. An <strong>unenforceable</strong> contract is valid, but a court won't enforce it, for example because a required writing is missing.</p>
<p>Most oral contracts are binding, but the <strong>Statute of Frauds</strong> requires a writing for some, including sales of real estate, contracts that can't be performed within one year, promises to pay someone else's debt, and sales of goods of $500 or more under the Uniform Commercial Code (UCC).</p>
<p>A <strong>breach</strong> happens when a party fails to perform. The usual remedy is <strong>compensatory damages</strong>, money that puts the injured party where it would have been. For unique items like land or art, a court may order <strong>specific performance</strong>, meaning the party must do what it promised.</p>
<div class="example"><h4>Example</h4><p>Jordan, age 16, signs a contract to buy a used car. Because Jordan is a minor, the contract is voidable: Jordan may cancel it, but the adult seller cannot.</p></div>
<div class="tip"><p>Elements memory aid: "<strong>O</strong>nly <strong>A</strong> <strong>C</strong>ontract <strong>C</strong>an <strong>L</strong>ast": Offer, Acceptance, Consideration, Capacity, Legality.</p></div>`
      },
      {
        pi: 'BL:071',
        heading: 'Debtors, creditors and collateral',
        html: `<p>A <strong>debtor</strong> owes money, and a <strong>creditor</strong> is owed money. Their relationship is set by the loan contract and by laws that protect both sides.</p>
<p><strong>Secured vs. unsecured debt.</strong> A <strong>secured</strong> loan is backed by <strong>collateral</strong>, property the creditor can take if the debtor defaults. A car loan and a mortgage are secured. If the borrower stops paying, the lender can <em>repossess</em> the car or <em>foreclose</em> on the house. An <strong>unsecured</strong> loan, like most credit cards, has no collateral, so the lender usually charges a higher rate. A creditor's legal claim on property is called a <strong>lien</strong>.</p>
<p>Article 9 of the UCC covers <strong>secured transactions</strong>. A lender usually "perfects" its claim on business collateral by filing a <strong>UCC-1 financing statement</strong>, which puts other creditors on notice.</p>
<p>Creditors have collection tools. A court can order <strong>wage garnishment</strong>, where an employer withholds part of a debtor's pay for the creditor. A <strong>cosigner</strong> or <strong>guarantor</strong> promises to pay if the borrower doesn't. Debtors are protected too: the <strong>Fair Debt Collection Practices Act</strong> limits abusive conduct by debt collectors.</p>
<p><strong>Bankruptcy</strong> is a federal court process for debtors who can't pay:</p>
<ul>
<li><strong>Chapter 7, liquidation:</strong> a trustee sells nonexempt assets to pay creditors, and many remaining debts are discharged.</li>
<li><strong>Chapter 11, reorganization:</strong> mainly for businesses, which keep operating under a court-approved plan.</li>
<li><strong>Chapter 13, individual repayment plan:</strong> a person with regular income repays debts over three to five years and keeps their property.</li>
</ul>
<div class="tip"><p>7 = sell it off. 11 = business fixes itself. 13 = person pays over time.</p></div>`
      },
      {
        pi: 'BL:072',
        heading: 'Agency relationships',
        html: `<p>In an <strong>agency relationship</strong>, one person, the <strong>principal</strong>, authorizes another, the <strong>agent</strong>, to act on the principal's behalf with third parties. When an agent signs a deal within their authority, the principal is bound by it.</p>
<p>Agents are <strong>fiduciaries</strong>, which means they owe the principal special duties:</p>
<ul>
<li><strong>Loyalty:</strong> put the principal's interests first and avoid secret conflicts of interest.</li>
<li><strong>Obedience:</strong> follow the principal's lawful instructions.</li>
<li><strong>Care:</strong> act with reasonable skill and diligence.</li>
<li><strong>Notification:</strong> share important information with the principal.</li>
<li><strong>Accounting:</strong> keep track of and hand over the principal's money and property.</li>
</ul>
<p>In return, the principal owes the agent compensation, reimbursement of proper expenses, and cooperation.</p>
<p><strong>Types of authority.</strong> <em>Actual authority</em> is what the principal actually gave the agent, either stated (express) or reasonably implied by the job. <em>Apparent authority</em> exists when the principal's conduct leads a third party to reasonably believe the agent has authority, even if the agent doesn't.</p>
<p>Under <strong>respondeat superior</strong>, an employer is liable for torts its employees commit within the scope of their jobs. Employers generally aren't liable for the acts of independent contractors.</p>
<div class="example"><h4>Example</h4><p>Priya is an insurance agent who sells policies for an insurer. The insurer is the principal. When Priya binds coverage for a customer within her authority, the insurer is legally bound to that policy.</p></div>
<p>Finance is full of agents: stockbrokers, insurance agents, real estate agents and loan brokers all act for someone else.</p>`
      }
    ],
    keyTerms: [
      { term: 'Consideration', def: 'Something of value each party gives in a contract, such as money, goods or a promise.' },
      { term: 'Voidable contract', def: 'A valid contract that one party has the right to cancel, for example because of fraud or being a minor.' },
      { term: 'Statute of Frauds', def: 'Rule requiring certain contracts, such as real estate sales, to be in writing to be enforceable.' },
      { term: 'Collateral', def: 'Property pledged to secure a loan, which the lender can take if the borrower defaults.' },
      { term: 'Garnishment', def: "A court order directing an employer to withhold part of a debtor's wages for a creditor." },
      { term: 'Fiduciary duty', def: "A legal duty to act in another person's best interest with loyalty and care." },
      { term: 'Apparent authority', def: "Authority a third party reasonably believes an agent has because of the principal's conduct." },
      { term: 'Respondeat superior', def: "Doctrine making an employer liable for employees' torts committed within the scope of employment." }
    ],
    traps: [
      'Void vs. voidable: a void contract never existed, while a voidable one is valid until a party cancels it.',
      'Assuming all contracts must be written. Most oral contracts are binding, except those under the Statute of Frauds.',
      'Mixing up bankruptcy chapters: 7 liquidates, 11 reorganizes a business, 13 is an individual repayment plan.',
      'Actual vs. apparent authority: apparent authority comes from what the principal led the third party to believe.'
    ],
    explainer: null,
    video: 'v-bl-contracts',
    caseFrequent: false
  },
  {
    id: 'bl-business-ownership',
    area: 'BL',
    title: 'Forms of business ownership and legal issues',
    pis: ['BL:003', 'BL:001'],
    minutes: 4,
    sections: [
      {
        pi: 'BL:003',
        heading: 'Choosing a form of business ownership',
        html: `<p>The legal form of a business decides who owns it, who is liable for its debts, and how it is taxed.</p>
<table>
<thead><tr><th>Form</th><th>Owners</th><th>Liability</th><th>Taxes</th></tr></thead>
<tbody>
<tr><td>Sole proprietorship</td><td>One person</td><td>Unlimited</td><td>Pass-through</td></tr>
<tr><td>General partnership</td><td>Two or more partners</td><td>Unlimited, shared</td><td>Pass-through</td></tr>
<tr><td>LLC</td><td>Members</td><td>Limited</td><td>Pass-through by default</td></tr>
<tr><td>C corporation</td><td>Shareholders</td><td>Limited</td><td>Double taxation</td></tr>
<tr><td>S corporation</td><td>Up to 100 shareholders</td><td>Limited</td><td>Pass-through</td></tr>
</tbody>
</table>
<p><strong>Unlimited liability</strong> means the owner's personal assets, like a house or savings, can be taken to pay business debts. <strong>Limited liability</strong> means owners can lose only what they invested. <strong>Pass-through taxation</strong> means business profit is taxed once, on the owners' personal returns.</p>
<p>A <strong>sole proprietorship</strong> is the easiest form to start, and the owner keeps all profits but carries all the risk. In a <strong>general partnership</strong>, each partner can bind the firm and is personally liable for its debts. A <strong>limited partnership</strong> has at least one general partner who manages and has unlimited liability, plus limited partners who invest but don't manage.</p>
<p>A <strong>corporation</strong> is a separate legal entity formed by filing articles of incorporation with a state. It is run by a board of directors elected by shareholders, can raise money by selling stock, and continues even when owners change. Its drawback is <strong>double taxation</strong>: the corporation pays tax on profits, and shareholders pay tax again on dividends. An <strong>S corporation</strong> is a corporation that elects pass-through taxation and must meet limits, such as no more than 100 shareholders and one class of stock.</p>
<div class="tip"><p>An LLC is a type of entity created under state law. An S corporation is a tax election made with the IRS.</p></div>`
      },
      {
        pi: 'BL:001',
        heading: 'Legal issues every business faces',
        html: `<p>Every business, from a lemonade stand to a large bank, works inside a web of laws. The main legal issues are:</p>
<ul>
<li><strong>Contracts:</strong> leases, supplier agreements, loan documents and customer terms all create legal duties.</li>
<li><strong>Liability:</strong> a business can be sued for torts such as negligence or defective products.</li>
<li><strong>Employment law:</strong> the Fair Labor Standards Act sets the federal minimum wage and overtime at 1.5 times regular pay for nonexempt workers above 40 hours a week. Title VII of the Civil Rights Act of 1964 bans job discrimination based on race, color, religion, sex or national origin. Other laws protect workers age 40 and older (ADEA) and people with disabilities (ADA), and OSHA covers workplace safety.</li>
<li><strong>Consumer protection:</strong> the FTC fights deceptive advertising and unfair practices. In finance, the Truth in Lending Act requires lenders to disclose the APR and finance charges, the Fair Credit Reporting Act protects the accuracy of credit reports, and the Equal Credit Opportunity Act bans lending discrimination.</li>
<li><strong>Intellectual property:</strong> protecting the firm's own brands and ideas while not infringing on others'.</li>
<li><strong>Privacy and data security:</strong> keeping customer information safe and following privacy laws.</li>
<li><strong>Competition:</strong> antitrust laws such as the Sherman Act ban monopolization and agreements that restrain trade, like price fixing.</li>
<li><strong>Taxes and licensing:</strong> registering the business, getting required licenses and paying taxes.</li>
</ul>
<div class="example"><h4>Example</h4><p>Marcus opens a small tax-preparation office. In his first month he signs a lease (contracts), hires two employees (employment law), advertises his prices (consumer protection), stores clients' Social Security numbers (privacy) and registers his business name (licensing).</p></div>
<p>Most employment in the United States is <strong>at will</strong>: either side can end it at any time for any lawful reason, but not for an illegal reason such as discrimination or retaliation.</p>`
      }
    ],
    keyTerms: [
      { term: 'Unlimited liability', def: "Owners' personal assets can be used to pay the business's debts." },
      { term: 'Limited liability', def: 'Owners can lose only the money they invested in the business.' },
      { term: 'Pass-through taxation', def: "Business profit is taxed only once, on the owners' personal tax returns." },
      { term: 'Double taxation', def: 'C corporation profits are taxed at the corporate level, then again when paid to shareholders as dividends.' },
      { term: 'Limited partner', def: 'A partner who invests money, does not manage, and has liability limited to the investment.' },
      { term: 'At-will employment', def: 'Either employer or employee may end employment at any time for any lawful reason.' },
      { term: 'Antitrust law', def: 'Laws such as the Sherman Act that ban monopolization and agreements that restrain competition.' }
    ],
    traps: [
      'Treating an S corporation and an LLC as the same thing: one is a tax election, the other a state-law entity.',
      'Forgetting that general partners have unlimited liability, just like sole proprietors.',
      'Assuming at-will employment lets an employer fire someone for any reason. Illegal reasons such as discrimination are still banned.'
    ],
    explainer: null,
    video: 'v-bl-ownership',
    caseFrequent: false
  },
  {
    id: 'bl-ip-torts',
    area: 'BL',
    title: 'Intellectual property and business torts',
    pis: ['BL:051', 'BL:069'],
    minutes: 4,
    sections: [
      {
        pi: 'BL:051',
        heading: 'Protecting intellectual property',
        html: `<p><strong>Intellectual property (IP)</strong> is a creation of the mind, such as an invention, a brand or a song. The law gives owners exclusive rights so they can profit from their work. There are four main types:</p>
<ul>
<li><strong>Patent:</strong> protects a new, useful invention, such as a machine, process or new chemical. It is granted by the U.S. Patent and Trademark Office (USPTO). A utility patent generally lasts 20 years from the filing date, and then anyone may use the invention.</li>
<li><strong>Trademark:</strong> protects a word, phrase, logo or symbol that identifies the source of goods or services, like a bank's name and logo. It can last indefinitely as long as it stays in use, with federal registrations renewed periodically. The symbol <strong>®</strong> means federally registered, while <strong>™</strong> claims a mark that may not be registered.</li>
<li><strong>Copyright:</strong> protects original works of authorship fixed in a tangible form, such as books, music, photos and software code. It protects the expression, not the underlying idea. Protection exists as soon as the work is created; registering with the U.S. Copyright Office is optional but helps in court. For an individual author, it generally lasts the author's life plus 70 years.</li>
<li><strong>Trade secret:</strong> valuable business information kept confidential, like a formula, a client list or a trading algorithm. It isn't registered and lasts as long as it stays secret.</li>
</ul>
<p>Businesses protect trade secrets with <strong>nondisclosure agreements (NDAs)</strong>, limited access and employee training. They earn money from IP through <strong>licensing</strong>, which lets others use it for a fee. Using someone's IP without permission is <strong>infringement</strong>, and the owner can sue.</p>
<div class="example"><h4>Example</h4><p>A fintech startup builds a budgeting app. It copyrights the code, trademarks the app's name and logo, keeps its risk-scoring formula as a trade secret under NDAs, and could seek a patent for a truly new process.</p></div>
<div class="tip"><p>Patent = invention. Trademark = brand. Copyright = creative work. Trade secret = kept hidden.</p></div>`
      },
      {
        pi: 'BL:069',
        heading: 'Basic torts in business',
        html: `<p>A <strong>tort</strong> is a civil wrong, other than a breach of contract, that injures a person or property. The injured party sues for <strong>damages</strong>, which is money. A <strong>crime</strong> is a wrong against society that the government prosecutes. The same act can be both: a punch can lead to criminal charges and a civil lawsuit.</p>
<p><strong>Intentional torts</strong> are done on purpose:</p>
<ul>
<li><strong>Assault</strong> is a threat that makes someone fear immediate harm. <strong>Battery</strong> is actual harmful or offensive contact.</li>
<li><strong>Defamation</strong> is a false statement that harms someone's reputation. Written or published defamation is <strong>libel</strong>, and spoken defamation is <strong>slander</strong>.</li>
<li><strong>Fraud</strong> (misrepresentation) is knowingly lying about an important fact to get someone to act, causing them harm.</li>
<li>Others include <strong>trespass</strong> (entering land without permission), <strong>conversion</strong> (taking someone's property as your own), false imprisonment and invasion of privacy.</li>
</ul>
<p><strong>Negligence</strong> is carelessness. To win, the plaintiff must prove four elements: the defendant had a <strong>duty</strong> of care, <strong>breached</strong> it, and that breach <strong>caused</strong> real <strong>damages</strong>. Defenses include comparative negligence (the plaintiff was partly at fault) and assumption of risk.</p>
<p><strong>Strict liability</strong> means liability without fault. It applies to abnormally dangerous activities and to defective products: a manufacturer can be liable for a dangerous product even if it was careful.</p>
<div class="example"><h4>Example</h4><p>A bank leaves a wet lobby floor without a warning sign, and a customer slips and breaks a wrist. The bank had a duty to keep the lobby safe, breached it, and caused the injury, so the customer can sue for negligence.</p></div>
<div class="tip"><p>Libel lasts (it's written down). Slander is spoken.</p></div>`
      }
    ],
    keyTerms: [
      { term: 'Patent', def: 'Exclusive right to a new, useful invention; a utility patent generally lasts 20 years from filing.' },
      { term: 'Trademark', def: 'A word, phrase, logo or symbol that identifies the source of goods or services.' },
      { term: 'Copyright', def: 'Protection for original creative works fixed in a tangible form, such as books, music and software.' },
      { term: 'Trade secret', def: 'Confidential business information that has value because it is kept secret.' },
      { term: 'Tort', def: 'A civil wrong, other than breach of contract, that injures a person or property.' },
      { term: 'Negligence', def: 'Carelessness that causes harm; requires duty, breach, causation and damages.' },
      { term: 'Libel', def: 'Defamation that is written or published.' },
      { term: 'Strict liability', def: 'Liability without fault, as for defective products or very dangerous activities.' }
    ],
    traps: [
      'Libel vs. slander: libel is written or published, slander is spoken.',
      'Assault vs. battery: assault is the threat, battery is the contact.',
      'Choosing copyright for a logo or brand name. Brands are protected by trademarks.',
      'Thinking a trade secret must be registered. It is protected only by keeping it secret.'
    ],
    explainer: null,
    video: null,
    caseFrequent: false
  },
  {
    id: 'bl-environment-trade',
    area: 'BL',
    title: 'Environmental, import/export and customs law',
    pis: ['BL:073', 'BL:145', 'BL:126'],
    minutes: 5,
    sections: [
      {
        pi: 'BL:073',
        heading: 'Environmental law',
        html: `<p><strong>Environmental law</strong> protects air, water, land and wildlife by limiting pollution and setting rules for hazardous materials. The main federal agency is the <strong>Environmental Protection Agency (EPA)</strong>, created in 1970. States have their own environmental agencies and laws too.</p>
<p>Key federal laws include:</p>
<ul>
<li><strong>National Environmental Policy Act (NEPA):</strong> requires federal agencies to study the environmental effects of major projects, often in an <em>environmental impact statement</em>.</li>
<li><strong>Clean Air Act:</strong> limits air pollution from factories, power plants and vehicles.</li>
<li><strong>Clean Water Act:</strong> regulates pollutants discharged into rivers, lakes and other waters.</li>
<li><strong>Resource Conservation and Recovery Act (RCRA):</strong> governs how hazardous waste is handled, from creation to disposal.</li>
<li><strong>Superfund law (CERCLA):</strong> makes responsible parties, including current and past owners of a site, pay to clean up contaminated land.</li>
</ul>
<p>Breaking environmental laws can bring fines, cleanup costs, lawsuits and even criminal charges.</p>
<p><strong>Why it matters in finance.</strong> Because Superfund liability can follow the owner of contaminated property, cleanup costs can wipe out a property's value. Before lending on commercial real estate, lenders usually order an <strong>environmental site assessment</strong> to check for contamination. Investors and insurers also weigh environmental risk, and many investors look at a company's environmental record as part of ESG (environmental, social and governance) analysis.</p>
<div class="example"><h4>Example</h4><p>A bank is asked to finance the purchase of an old gas station. Before approving the loan, it orders an environmental site assessment. The report finds leaking underground tanks, so the bank requires the cleanup to be handled before it will lend.</p></div>`
      },
      {
        pi: 'BL:145',
        heading: 'Import and export law',
        html: `<p>Governments control what crosses their borders. <strong>Import/export law</strong> covers the rules for buying goods from, and selling goods to, other countries.</p>
<p>Common trade controls include:</p>
<ul>
<li><strong>Tariff (duty):</strong> a tax on imported goods. It raises the price of imports and protects domestic producers.</li>
<li><strong>Quota:</strong> a limit on the quantity of a good that can be imported.</li>
<li><strong>Embargo:</strong> a total ban on trade with a country or in a product, usually for political or security reasons.</li>
<li><strong>Export controls:</strong> licenses are required to ship certain sensitive goods and technology, such as military items or advanced software, to certain countries or buyers. The Commerce Department oversees most of these controls.</li>
<li><strong>Economic sanctions:</strong> restrictions on dealing with certain countries, companies and people. In the U.S., the Treasury Department's Office of Foreign Assets Control (<strong>OFAC</strong>) administers them.</li>
</ul>
<p><strong>Trade agreements</strong> lower these barriers between member countries. The United States-Mexico-Canada Agreement (USMCA), which replaced NAFTA, reduces tariffs on goods traded among those three countries.</p>
<p><strong>Why it matters in finance.</strong> Banks finance international trade with tools like letters of credit, so they must make sure they aren't helping a customer break the law. Banks screen customers and payments against OFAC sanctions lists and can face large penalties for processing a transaction with a sanctioned party.</p>
<div class="example"><h4>Example</h4><p>Elena's company wants to export encryption software. Before shipping, she checks whether the product needs an export license and whether the buyer appears on any government restricted list. Her bank also screens the incoming payment against sanctions lists.</p></div>
<div class="tip"><p>Tariff = tax. Quota = quantity limit. Embargo = total ban.</p></div>`
      },
      {
        pi: 'BL:126',
        heading: 'Customs regulations',
        html: `<p><strong>Customs</strong> is the government process for inspecting goods that enter a country, collecting duties and enforcing import rules. In the United States, <strong>U.S. Customs and Border Protection (CBP)</strong>, part of the Department of Homeland Security, handles this job.</p>
<p>When goods arrive, the <strong>importer of record</strong> is responsible for making sure they follow the rules. Key customs requirements include:</p>
<ul>
<li><strong>Classification:</strong> every product is assigned a code in the <em>Harmonized Tariff Schedule</em>, which sets its duty rate. A wrong code can mean paying the wrong duty, and penalties.</li>
<li><strong>Valuation:</strong> declaring the goods' true value, since many duties are a percentage of value.</li>
<li><strong>Country of origin:</strong> identifying where goods were made, which affects duty rates and whether trade-agreement benefits apply. Many imports must be marked with their country of origin.</li>
<li><strong>Documentation:</strong> commercial invoices, packing lists and entry forms.</li>
<li><strong>Admissibility:</strong> some goods are banned or need approval from other agencies, such as food or medicine.</li>
</ul>
<p>Many importers hire a licensed <strong>customs broker</strong> to prepare the paperwork and clear goods. Importers often post a <strong>customs bond</strong>, which guarantees that duties and penalties will be paid. <strong>Foreign-trade zones</strong> are designated areas where goods can be stored or processed before duties are owed.</p>
<p>Undervaluing goods or lying about their origin to cut duties is customs fraud. It can lead to fines, seized goods and criminal charges.</p>
<div class="example"><h4>Example</h4><p>A retailer imports 5,000 jackets. Its customs broker classifies them under the correct tariff code, declares their value and origin, and pays the duty so CBP releases the shipment.</p></div>`
      }
    ],
    keyTerms: [
      { term: 'EPA', def: 'Environmental Protection Agency, the main federal agency that enforces environmental laws.' },
      { term: 'Environmental impact statement', def: 'A NEPA study of how a major federal project will affect the environment.' },
      { term: 'Superfund (CERCLA)', def: 'Law making responsible parties, including property owners, pay to clean up contaminated sites.' },
      { term: 'Tariff', def: 'A tax on imported goods, also called a duty.' },
      { term: 'Embargo', def: 'A government ban on trade with a country or in a certain product.' },
      { term: 'OFAC', def: 'Treasury office that administers U.S. economic sanctions programs.' },
      { term: 'Customs broker', def: 'A licensed professional who prepares import paperwork and clears goods through customs.' },
      { term: 'Harmonized Tariff Schedule', def: "The coding system that classifies imported products and sets each one's duty rate." }
    ],
    traps: [
      'Tariff vs. quota: a tariff taxes imports, a quota limits how many can come in.',
      'Assuming environmental law has nothing to do with finance. Contaminated collateral can make a loan worthless.',
      'Confusing CBP (customs at the border) with OFAC (sanctions administered by Treasury).'
    ],
    explainer: null,
    video: null,
    caseFrequent: false
  },
  {
    id: 'bl-finance-law-tax',
    area: 'BL',
    title: 'Financial regulation and tax law',
    pis: ['BL:133', 'BL:134'],
    minutes: 4,
    sections: [
      {
        pi: 'BL:133',
        heading: 'Key laws and regulators in finance',
        html: `<p>Finance is one of the most heavily regulated industries, because it handles other people's money and a failure can hurt the whole economy. Learn each major law with its purpose:</p>
<table>
<thead><tr><th>Law</th><th>What it does</th></tr></thead>
<tbody>
<tr><td>Securities Act of 1933</td><td>Requires registration and disclosure, through a prospectus, for new securities sold to the public.</td></tr>
<tr><td>Securities Exchange Act of 1934</td><td>Created the SEC; regulates trading in existing securities and bans insider trading.</td></tr>
<tr><td>Glass-Steagall (Banking Act of 1933)</td><td>Created the FDIC and separated commercial and investment banking.</td></tr>
<tr><td>Gramm-Leach-Bliley Act (1999)</td><td>Allowed banks, securities firms and insurers to combine; requires privacy notices.</td></tr>
<tr><td>Sarbanes-Oxley Act (2002)</td><td>Passed after Enron and WorldCom; tightened corporate financial reporting and created the PCAOB to oversee auditors.</td></tr>
<tr><td>Dodd-Frank Act (2010)</td><td>Passed after the 2008 crisis; created the CFPB and the Financial Stability Oversight Council.</td></tr>
<tr><td>Bank Secrecy Act (1970)</td><td>The core anti-money-laundering law; requires reports on large cash transactions.</td></tr>
</tbody>
</table>
<p>Regulators each have their own turf. The <strong>SEC</strong> oversees securities markets. <strong>FINRA</strong> is a self-regulatory organization, not a government agency, that oversees broker-dealers under SEC supervision. The <strong>FDIC</strong> insures bank deposits, the <strong>OCC</strong> charters national banks, the <strong>Federal Reserve</strong> sets monetary policy and supervises bank holding companies, the <strong>NCUA</strong> oversees federal credit unions, and <strong>state insurance commissioners</strong> regulate insurance.</p>
<p>Finance professionals also face legal duties to clients. Investment advisers owe a <strong>fiduciary duty</strong> to act in the client's best interest. <strong>Insider trading</strong>, meaning trading on material, nonpublic information in breach of a duty, is illegal.</p>
<div class="tip"><p>1933 Act = new issues. 1934 Act = trading, and it created the SEC.</p></div>`
      },
      {
        pi: 'BL:134',
        heading: 'How tax law shapes financial decisions',
        html: `<p>Taxes change how much an investor or business actually keeps, so tax law affects nearly every financial transaction. The <strong>Internal Revenue Service (IRS)</strong> collects federal taxes and enforces the tax code written by Congress.</p>
<ul>
<li><strong>Capital gains:</strong> profit from selling an asset such as stock for more than you paid. A <strong>short-term</strong> gain, on an asset held one year or less, is taxed at ordinary income rates. A <strong>long-term</strong> gain, held more than one year, usually gets a lower rate. That rewards investors for holding longer.</li>
<li><strong>Capital losses</strong> can offset capital gains, which lowers taxes. The <strong>wash sale rule</strong> blocks a loss deduction if the investor buys the same or a substantially identical security within 30 days before or after the sale.</li>
<li><strong>Interest and dividends:</strong> interest from bonds and savings is generally taxed as ordinary income. Interest on most municipal bonds is generally exempt from federal income tax, which is why munis can pay lower rates and still attract investors.</li>
<li><strong>Tax-advantaged accounts:</strong> traditional 401(k)s and IRAs let contributions grow <em>tax-deferred</em>, with taxes paid on withdrawal. Roth accounts use after-tax money, and qualified withdrawals are tax-free.</li>
<li><strong>Business taxes:</strong> a C corporation's profits face double taxation, while pass-through businesses are taxed once on owners' returns. Interest a business pays on debt is generally deductible, which makes borrowing cheaper after taxes.</li>
</ul>
<p>Financial firms report customers' income to the IRS on forms such as the 1099. <strong>Tax avoidance</strong>, legally using the rules to reduce taxes, is allowed. <strong>Tax evasion</strong>, illegally hiding income or lying to the IRS, is a crime.</p>
<div class="example"><h4>Example</h4><p>Liam bought shares 10 months ago and they've risen sharply. If he sells now, the gain is short-term and taxed as ordinary income. If he waits until he's held them more than a year, the gain becomes long-term and usually faces a lower rate.</p></div>`
      }
    ],
    keyTerms: [
      { term: 'SEC', def: 'Securities and Exchange Commission, the federal agency that oversees securities markets; created by the 1934 Act.' },
      { term: 'FINRA', def: 'A self-regulatory organization, not a government agency, that oversees broker-dealers under SEC supervision.' },
      { term: 'Sarbanes-Oxley Act', def: '2002 law that tightened corporate financial reporting after Enron and WorldCom and created the PCAOB.' },
      { term: 'Dodd-Frank Act', def: '2010 post-crisis reform law that created the CFPB and the Financial Stability Oversight Council.' },
      { term: 'Insider trading', def: 'Illegally trading on material, nonpublic information in breach of a duty.' },
      { term: 'Long-term capital gain', def: 'Profit on an asset held more than one year, usually taxed at a lower rate.' },
      { term: 'Tax-deferred', def: 'Taxes are postponed until money is withdrawn, as in a traditional IRA or 401(k).' },
      { term: 'Tax evasion', def: 'Illegally avoiding taxes, such as hiding income; unlike tax avoidance, it is a crime.' }
    ],
    traps: [
      'The 1933 Act covers new issues; the 1934 Act covers trading and created the SEC.',
      'Calling FINRA a government agency. It is a self-regulatory organization overseen by the SEC.',
      'Tax avoidance (legal planning) vs. tax evasion (illegal).',
      'Short-term gains are taxed as ordinary income, not at the lower long-term rate.'
    ],
    explainer: null,
    video: 'v-bl-regulation',
    caseFrequent: false
  },
  {
    id: 'bl-compliance',
    area: 'BL',
    title: 'Compliance in the finance industry',
    pis: ['BL:163', 'BL:148', 'BL:149'],
    minutes: 5,
    sections: [
      {
        pi: 'BL:163',
        heading: 'Following the spirit of the law, not just the letter',
        html: `<p>The <strong>letter of the law</strong> is its exact wording. The <strong>spirit and intent</strong> of the law is the purpose behind it. A professional who complies with the spirit of the law asks, "What is this rule trying to prevent?" and avoids that harm, instead of hunting for loopholes.</p>
<p>Finance offers a clear example. Banks must report cash transactions over $10,000 so the government can track money laundering. A customer who splits $18,000 in cash into two deposits of $9,000 to avoid the report is <strong>structuring</strong>. Each deposit looks fine on its own, but structuring to evade the reporting requirement is itself illegal, and a bank employee who helps is breaking the law too.</p>
<p>Complying with the spirit of the law means:</p>
<ul>
<li>Following company policies and codes of conduct, even when no one is watching.</li>
<li>Asking the compliance department when you're unsure, instead of guessing.</li>
<li>Disclosing conflicts of interest instead of hiding them.</li>
<li>Reporting suspected wrongdoing through proper channels. Laws such as Sarbanes-Oxley and Dodd-Frank include protections for whistleblowers.</li>
<li>Remembering that <strong>legal isn't always ethical</strong>. Laws set the minimum standard, and ethical professionals often hold themselves to a higher one.</li>
</ul>
<div class="example"><h4>Example</h4><p>Ava, a new bank teller, notices a regular customer making several cash deposits just under $10,000 on the same day at different branches. Rather than ignoring it because each deposit is "under the limit," she reports the pattern to her compliance officer, as bank policy requires.</p></div>
<p>Firms that honor the spirit of the law build trust with customers and regulators. Firms that chase loopholes risk fines, lawsuits and lost reputation.</p>`
      },
      {
        pi: 'BL:148',
        heading: 'What a compliance program does',
        html: `<p><strong>Compliance</strong> means making sure a firm and its employees follow all applicable laws, regulations and internal policies. Most financial firms have a <strong>compliance department</strong> led by a <strong>chief compliance officer</strong>.</p>
<p>A strong compliance program includes:</p>
<ul>
<li><strong>Written policies and procedures</strong> that turn laws into everyday rules.</li>
<li><strong>Training</strong> so employees know the rules for their jobs.</li>
<li><strong>Monitoring and testing</strong> to check that rules are actually followed.</li>
<li><strong>Reporting</strong> required information to regulators and to senior management.</li>
<li><strong>Recordkeeping</strong> so the firm can prove what it did.</li>
<li><strong>Fixing problems</strong> and disciplining violations.</li>
</ul>
<p>Major compliance areas in finance include:</p>
<ul>
<li><strong>Anti-money laundering (AML):</strong> under the Bank Secrecy Act, banks file a <em>Currency Transaction Report</em> for cash transactions over $10,000 in a business day and a <em>Suspicious Activity Report</em> when they spot suspicious activity.</li>
<li><strong>Know Your Customer (KYC):</strong> verifying each customer's identity, such as name, date of birth, address and ID number, and understanding their financial situation.</li>
<li><strong>Privacy:</strong> the Gramm-Leach-Bliley Act requires privacy notices and protecting customer data.</li>
<li><strong>Fair lending and consumer disclosures:</strong> following the Equal Credit Opportunity Act and Truth in Lending Act.</li>
<li><strong>Investment rules:</strong> recommendations must fit the client, and insider trading is banned.</li>
</ul>
<p>Breaking these rules can bring heavy fines, lost licenses, lawsuits and damaged reputations. That's why compliance is often called a firm's <em>second line of defense</em>, after the business staff who serve customers and before internal audit.</p>
<div class="tip"><p>Compliance isn't only the compliance department's job. Every employee is responsible for following the rules.</p></div>`
      },
      {
        pi: 'BL:149',
        heading: 'Technology in compliance (RegTech)',
        html: `<p>Large banks process millions of transactions a day, far too many for people to check by hand. Firms use <strong>regulatory technology</strong>, or <strong>RegTech</strong>, to help them comply.</p>
<ul>
<li><strong>Transaction monitoring:</strong> software scans activity for red flags, such as repeated cash deposits just under $10,000 or sudden large wire transfers, and creates <em>alerts</em> for compliance staff to review.</li>
<li><strong>Identity verification:</strong> digital KYC tools check ID documents and customer information when someone opens an account online.</li>
<li><strong>Sanctions screening:</strong> systems automatically compare customer names and payments against government lists, such as OFAC's sanctions list.</li>
<li><strong>Communication surveillance and archiving:</strong> firms keep records of business emails and messages and scan them for signs of misconduct like insider trading.</li>
<li><strong>Data analytics and artificial intelligence:</strong> these spot unusual patterns and can reduce <em>false positives</em>, which are alerts that turn out to be harmless.</li>
<li><strong>Automated reporting:</strong> systems prepare required regulatory reports faster and with fewer errors.</li>
<li><strong>Cybersecurity:</strong> encryption, multi-factor authentication and access controls protect customer data, as privacy laws require.</li>
</ul>
<p>Technology also creates <strong>audit trails</strong>, time-stamped records of who did what and when, so firms can show regulators that they followed the rules.</p>
<p>Technology helps, but it doesn't replace judgment. People still review alerts, decide whether to file reports, and make sure the systems themselves are set up correctly. New technology also brings new compliance duties, such as protecting data stored in the cloud.</p>
<div class="example"><h4>Example</h4><p>A credit union's monitoring software flags an account that receives many small transfers from unrelated people and immediately wires the total overseas. A compliance analyst reviews the alert, investigates, and decides whether to file a Suspicious Activity Report.</p></div>`
      }
    ],
    keyTerms: [
      { term: 'Compliance', def: 'Making sure a firm and its employees follow all laws, regulations and internal policies.' },
      { term: 'Structuring', def: 'Illegally splitting cash transactions to avoid the over-$10,000 reporting requirement.' },
      { term: 'Currency Transaction Report (CTR)', def: 'Report a bank files for cash transactions over $10,000 in a business day.' },
      { term: 'Suspicious Activity Report (SAR)', def: 'Report a financial institution files when it identifies possibly illegal activity.' },
      { term: 'Know Your Customer (KYC)', def: "Verifying a customer's identity and understanding their financial profile." },
      { term: 'RegTech', def: 'Technology that helps firms meet regulatory requirements, such as monitoring and screening software.' },
      { term: 'Audit trail', def: 'A time-stamped record of who did what and when, used to prove compliance.' },
      { term: 'Whistleblower', def: 'An employee who reports wrongdoing; certain laws protect them from retaliation.' }
    ],
    traps: [
      'Thinking deposits just under $10,000 are always fine. Splitting cash to avoid the report is structuring, which is illegal.',
      'Mixing up the CTR (large cash amounts) with the SAR (filed for suspicious activity, whether or not cash is involved).',
      'Believing technology replaces people in compliance. Humans still review alerts and make decisions.',
      'Assuming legal always means ethical. Laws set only the minimum standard.'
    ],
    explainer: null,
    video: null,
    caseFrequent: false
  }
];
