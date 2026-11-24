// bma-ops lessons: supply chains, vendors, projects, quality, international risk.
export default [
{
  id: 'bma-op-supply-chains',
  area: 'OP',
  title: 'Supply chains: networks, global issues, technology, and ethics',
  pis: ['OP:479', 'OP:480', 'OP:478', 'OP:677'],
  minutes: 8,
  sections: [
    { pi: 'OP:479', heading: 'What a supply chain network looks like', html: `<p>A <strong>supply chain</strong> is the set of businesses and steps that move a product from raw materials to the customer. Picture it as a <strong>network</strong>, not a single straight line. A company usually deals with many suppliers, and each supplier has suppliers of its own.</p>
<p>The main links are <strong>suppliers</strong> (who provide materials or parts), <strong>manufacturers</strong> (who make the product), <strong>distributors and warehouses</strong> (who store and move it), <strong>retailers</strong> (who sell it), and <strong>customers</strong>. Three things flow through the network: <strong>goods</strong> move forward, <strong>money</strong> flows back, and <strong>information</strong> (orders, forecasts, delivery updates) flows both ways.</p>
<p>Suppliers are grouped in <strong>tiers</strong>. A first-tier supplier sells directly to your company. A second-tier supplier sells to your first-tier supplier. A problem at a second-tier supplier can still stop your production, even though you never deal with that firm.</p>
<div class="example"><h4>Example</h4><p>Harbor Bikes assembles bicycles. Its first-tier suppliers provide frames and wheels. Those suppliers buy aluminum tubing and rubber from second-tier suppliers. When the tubing maker has a fire, frames run short and Harbor Bikes cannot finish orders, even though it never bought tubing itself.</p></div>
<div class="tip"><p>Remember the three flows: goods forward, money back, information both ways.</p></div>` },
    { pi: 'OP:480', heading: 'Global supply chain issues', html: `<p>When a company buys from or sells to other countries, its supply chain becomes <strong>global</strong>. That can lower costs and open new markets, but it adds problems that local chains do not have.</p>
<ul><li><strong>Longer lead times:</strong> goods spend weeks on ships and at ports, so delays are harder to fix.</li><li><strong>Tariffs and customs:</strong> a tariff is a tax on imported goods. Customs paperwork can slow shipments and raise costs.</li><li><strong>Currency changes:</strong> if the exchange rate moves, the price of imported parts can rise even though the supplier did not change its price.</li><li><strong>Political and legal differences:</strong> trade rules, sanctions, and local laws can change quickly.</li><li><strong>Disruptions:</strong> storms, strikes, port congestion, and pandemics can stop shipments.</li></ul>
<p>Companies lower these risks by using more than one supplier, keeping extra <strong>safety stock</strong>, buying from suppliers closer to home (sometimes called <strong>nearshoring</strong>), and planning for delays. Lean, low-inventory systems save money in normal times but leave little cushion when a global disruption hits.</p>
<div class="example"><h4>Example</h4><p>A small furniture company imports all its hardware from one overseas factory. A port strike delays the shipment by five weeks. Next time, the owner adds a second supplier in a nearby country and keeps a month of hardware on hand.</p></div>` },
    { pi: 'OP:478', heading: 'How technology changes supply chain management', html: `<p>Technology lets companies see and manage the whole chain instead of guessing. Common tools include:</p>
<ul><li><strong>Barcodes and RFID tags:</strong> scan items automatically so inventory counts stay accurate.</li><li><strong>GPS and sensors:</strong> track where a shipment is and sometimes its temperature.</li><li><strong>Enterprise resource planning (ERP) software:</strong> links purchasing, inventory, production, and accounting in one system.</li><li><strong>Electronic data interchange (EDI):</strong> sends orders and invoices between companies without paper.</li><li><strong>Data analytics and forecasting tools:</strong> use past sales to predict how much to order.</li><li><strong>Automation and robots:</strong> speed up picking and packing in warehouses.</li></ul>
<p>The benefits are faster orders, fewer errors, lower inventory costs, and better customer service. The drawbacks are the cost of buying and learning the systems, and <strong>cybersecurity risk</strong>. If a hacker breaks into a shared system, many partners can be affected at once. Technology also works only if the data entered is accurate.</p>
<div class="example"><h4>Example</h4><p>A grocery distributor uses tracking sensors on its refrigerated trucks. When a truck's temperature rises, the system alerts the manager, who reroutes the load before the food spoils.</p></div>` },
    { pi: 'OP:677', heading: 'Ethics in supply chain management', html: `<p>A company is responsible not only for its own behavior but also for how its suppliers operate. Customers, investors, and the public expect businesses to know where their goods come from.</p>
<p>Key ethical issues include:</p>
<ul><li><strong>Labor practices:</strong> safe workplaces, fair wages, reasonable hours, and no child labor or forced labor.</li><li><strong>Environmental impact:</strong> pollution, waste, and use of natural resources.</li><li><strong>Honest dealing:</strong> no bribes, kickbacks, or hiding defects to win a contract.</li><li><strong>Fair treatment of suppliers:</strong> paying on time and not forcing prices so low that the supplier must cut corners.</li><li><strong>Transparency:</strong> being able to trace materials back to their source.</li></ul>
<p>Businesses put these values into practice with a <strong>supplier code of conduct</strong>, which sets rules suppliers must follow. They check compliance through <strong>audits</strong> and visits, and they act when a supplier breaks the rules by requiring fixes or ending the relationship. Ignoring a supplier's abuses can lead to lost customers, fines, and damage to the company's reputation.</p>
<div class="example"><h4>Example</h4><p>Lena owns a clothing shop. A factory audit reveals that a supplier locks fire exits. Lena requires the supplier to fix the problem within thirty days and, when it refuses, moves her orders to a safer factory.</p></div>` }
  ],
  keyTerms: [
    { term: 'Supply chain', def: 'The network of suppliers, makers, distributors, and sellers that moves a product to the customer.' },
    { term: 'Tier', def: 'A level of suppliers; first-tier suppliers sell directly to you, second-tier suppliers sell to them.' },
    { term: 'Tariff', def: 'A tax placed on imported goods.' },
    { term: 'Safety stock', def: 'Extra inventory kept to protect against delays or surprise demand.' },
    { term: 'ERP', def: 'Enterprise resource planning software that links purchasing, inventory, production, and accounting.' },
    { term: 'RFID', def: 'Radio tags that let a reader identify items without scanning a barcode by hand.' },
    { term: 'Supplier code of conduct', def: 'Written rules about labor, safety, environment, and honesty that suppliers agree to follow.' },
    { term: 'Audit', def: 'A check of whether a supplier is actually following the rules and standards.' }
  ],
  traps: [
    'Thinking a supply chain is one straight line. It is a network of many suppliers and tiers.',
    'Assuming the lowest price is always best; a global chain adds tariffs, delays, and currency risk.',
    'Believing a business is not responsible for what its suppliers do. Ethical duties extend down the chain.'
  ],
  explainer: null,
  video: null,
  caseFrequent: false
},
{
  id: 'bma-op-vendors-legal',
  area: 'OP',
  title: 'Vendors, negotiation, and legal issues in operations',
  pis: ['OP:241', 'OP:337', 'OP:339'],
  minutes: 7,
  sections: [
    { pi: 'OP:241', heading: 'Maintaining vendor and supplier relationships', html: `<p>A <strong>vendor</strong> (or supplier) is a business that sells goods or services to your company. Good vendors are a competitive advantage, because they deliver on time, keep quality steady, and help in emergencies. Strong relationships are built, not assumed.</p>
<p>Ways to maintain a good relationship:</p>
<ul><li><strong>Communicate clearly and early:</strong> share forecasts and warn vendors about big changes in orders.</li><li><strong>Pay on time</strong> and as agreed.</li><li><strong>Measure performance:</strong> track a vendor scorecard with on-time delivery, defect rates, and price.</li><li><strong>Give feedback</strong> and meet regularly to solve problems together.</li><li><strong>Be fair and honest,</strong> and keep promises.</li><li><strong>Keep backups:</strong> work with more than one qualified vendor for key items, so no single failure shuts you down.</li></ul>
<p>Relying on one vendor can mean better prices and closer teamwork, but it is risky if that vendor fails. Using many vendors spreads risk, but each gets less of your business and less reason to treat you as a priority.</p>
<div class="example"><h4>Example</h4><p>Marcus runs a bakery. Each quarter he reviews his flour supplier's scorecard: ninety-eight percent of deliveries were on time, but two bags arrived damaged. He shares the data, the supplier fixes its packing, and the relationship improves.</p></div>` },
    { pi: 'OP:337', heading: 'Negotiating terms with vendors', html: `<p><strong>Negotiation</strong> is a discussion in which both sides try to reach an agreement they can accept. In business, the goal is a <strong>win-win</strong> deal that both sides will honor, not simply the lowest price.</p>
<p>Terms you can negotiate include:</p>
<ul><li><strong>Price</strong> and volume discounts</li><li><strong>Payment terms</strong>, such as how many days you have to pay</li><li><strong>Delivery</strong> schedule and shipping costs</li><li><strong>Quality standards</strong> and what happens with defective goods</li><li><strong>Warranties</strong> and returns</li><li><strong>Contract length</strong> and how to end it</li></ul>
<p>Preparation matters most. Know what you need, what you can give up, your best alternatives, and what the vendor probably wants. Your best alternative, if talks fail, gives you confidence to walk away from a bad deal.</p>
<p>A common payment term is <strong>2/10, net 30</strong>. It means the buyer can take a 2 percent discount for paying within 10 days, otherwise the full amount is due within 30 days.</p>
<div class="example"><h4>Example</h4><p>Priya's shop receives a $5,000 invoice with terms 2/10, net 30. If she pays within 10 days, she saves 2 percent of $5,000, which is $100, and pays $4,900. After day 10 she owes the full $5,000 by day 30.</p></div>` },
    { pi: 'OP:339', heading: 'Legal considerations in operations', html: `<p>Operations managers make decisions that carry legal duties. Mistakes can lead to lawsuits, fines, or shutdowns. Key areas include:</p>
<ul><li><strong>Contracts:</strong> purchase agreements with vendors are binding. In the United States, the <strong>Uniform Commercial Code (UCC)</strong> governs most contracts for the sale of goods. It also sets rules for warranties and delivery.</li><li><strong>Product liability:</strong> a company can be held responsible if a defective or unsafe product injures someone.</li><li><strong>Workplace safety:</strong> the Occupational Safety and Health Administration (OSHA) sets and enforces safety rules for most workplaces.</li><li><strong>Employment laws:</strong> wages, hours, and discrimination rules apply to the people who run the operation.</li><li><strong>Environmental rules:</strong> limits on waste, emissions, and the handling of hazardous materials.</li><li><strong>Intellectual property:</strong> do not copy a vendor's patented process or a competitor's trademark.</li><li><strong>Import and export laws</strong> when buying or selling across borders.</li></ul>
<p>Keeping good <strong>records</strong> (contracts, inspections, safety training, delivery logs) helps prove the company followed the law.</p>
<div class="example"><h4>Example</h4><p>A toy company learns that a batch of its product has a small part that can detach. Selling it could create product liability. The manager stops shipments, informs the supplier, and fixes the problem before more units reach children.</p></div>
<div class="tip"><p>When in doubt, put it in writing and ask for legal advice before signing.</p></div>` }
  ],
  keyTerms: [
    { term: 'Vendor', def: 'A business that sells goods or services to another business.' },
    { term: 'Vendor scorecard', def: 'A record that rates a vendor on delivery, quality, and price.' },
    { term: 'Negotiation', def: 'A discussion in which both sides work toward an agreement.' },
    { term: 'Payment terms', def: 'The agreed timing and conditions for paying an invoice, such as 2/10, net 30.' },
    { term: 'UCC', def: 'The Uniform Commercial Code, which governs most sales of goods in the United States.' },
    { term: 'Product liability', def: 'A seller or maker\'s legal responsibility for harm caused by a defective product.' },
    { term: 'OSHA', def: 'The federal agency that sets and enforces workplace safety rules.' }
  ],
  traps: [
    'Treating the lowest price as the only thing to negotiate. Terms, quality, and delivery matter too.',
    'Mixing up 2/10, net 30: the 2 percent discount applies only if paid within 10 days.',
    'Assuming a handshake deal is enough. Written contracts protect both sides.'
  ],
  explainer: null,
  video: null,
  caseFrequent: false
},
{
  id: 'bma-pj-launch-plan',
  area: 'PJ',
  title: 'Starting a project: initiating, WBS, and the schedule',
  pis: ['PJ:005', 'PJ:006', 'PJ:010'],
  minutes: 7,
  sections: [
    { pi: 'PJ:005', heading: 'Initiating a project', html: `<p>A <strong>project</strong> is a temporary effort with a clear start and end that creates a specific product, service, or result. Opening a new store, launching an app, or planning a company event are all projects. Ongoing daily work, such as processing payroll, is not.</p>
<p><strong>Initiating</strong> is the first phase. The team decides why the project is worth doing and who will be responsible. Key steps:</p>
<ul><li><strong>Define the need and objectives.</strong> Good objectives are specific, measurable, and tied to a deadline.</li><li><strong>Check feasibility:</strong> can the company afford it, does it have the skills, and is the timing realistic?</li><li><strong>Identify stakeholders:</strong> the sponsor who funds it, the customers, the team, and anyone affected.</li><li><strong>Name a project manager</strong> and give that person authority.</li><li><strong>Write a project charter,</strong> a short document that states the purpose, goals, scope, major constraints, and who approved it.</li></ul>
<p>Every project is limited by three linked constraints: <strong>scope</strong> (what is included), <strong>time</strong> (the deadline), and <strong>cost</strong> (the budget). Changing one usually affects the others.</p>
<div class="example"><h4>Example</h4><p>A catering company wants to open a second kitchen. The owner writes a charter: build and open the kitchen within six months for $150,000, with the owner as sponsor and Dana as project manager. Signing the charter authorizes the work.</p></div>` },
    { pi: 'PJ:006', heading: 'Preparing a work breakdown structure', html: `<p>A <strong>work breakdown structure (WBS)</strong> breaks the whole project into smaller and smaller pieces until each piece is easy to plan, assign, and measure. It shows <em>what</em> must be delivered, not when.</p>
<p>The top level is the final project. The next level lists major deliverables. Each deliverable splits into smaller parts, and the lowest level is a <strong>work package</strong>, a piece of work small enough to estimate and assign to one person or team.</p>
<p>Two rules guide a good WBS. First, the <strong>100 percent rule</strong>: the pieces must add up to all the work in the project scope, with nothing missing and nothing extra. Second, focus on <strong>deliverables</strong> (things produced) rather than long lists of actions.</p>
<p>A WBS helps estimate cost and time more accurately, shows who is responsible, and prevents forgotten tasks.</p>
<div class="example"><h4>Example</h4><p>Project: launch a company website. Level 2 deliverables are Design, Content, Development, and Testing. Under Content, the work packages are Write product pages, Take photos, and Edit copy. Each package gets an owner and an estimate.</p></div>
<div class="tip"><p>WBS answers "what is the work?" The schedule answers "when will it be done?"</p></div>` },
    { pi: 'PJ:010', heading: 'Managing the project schedule', html: `<p>A <strong>project schedule</strong> lists each task, how long it takes, and the order in which tasks must happen. Some tasks depend on others, which are called <strong>dependencies</strong>. You cannot paint a wall before it is built.</p>
<p>Tools and ideas to know:</p>
<ul><li><strong>Gantt chart:</strong> a bar chart that shows tasks over time.</li><li><strong>Milestone:</strong> a key checkpoint, such as "design approved."</li><li><strong>Critical path:</strong> the longest chain of dependent tasks. It sets the shortest possible project time. A delay on this path delays the whole project.</li><li><strong>Float (slack):</strong> how long a task can be late without delaying the project. Tasks on the critical path have zero float.</li></ul>
<div class="example"><h4>Example</h4><p>Task A takes 3 days. Tasks B (4 days) and C (6 days) both start after A and can run at the same time. Task D (2 days) starts after both B and C finish.</p><p>Path A-B-D = 3 + 4 + 2 = 9 days. Path A-C-D = 3 + 6 + 2 = 11 days. The critical path is A-C-D, so the project takes 11 days. Task B has 2 days of float, since 6 minus 4 equals 2.</p></div>
<p>To get back on track, a manager can <strong>add resources</strong> to critical tasks ("crashing") or run tasks in parallel ("fast tracking"). Both can raise cost or risk. Update the schedule regularly and compare the plan to actual progress.</p>` }
  ],
  keyTerms: [
    { term: 'Project', def: 'A temporary effort with a defined start and end that produces a unique result.' },
    { term: 'Project charter', def: 'A document that authorizes a project and states its purpose, goals, and scope.' },
    { term: 'Stakeholder', def: 'Anyone affected by or interested in a project, such as the sponsor, team, or customers.' },
    { term: 'Scope', def: 'The work and deliverables that are included in a project.' },
    { term: 'Work breakdown structure', def: 'A breakdown of project deliverables into smaller work packages.' },
    { term: 'Work package', def: 'The lowest-level piece of work in a WBS, small enough to estimate and assign.' },
    { term: 'Critical path', def: 'The longest chain of dependent tasks, which determines the minimum project length.' },
    { term: 'Float', def: 'The time a task can slip without delaying the project end date.' },
    { term: 'Milestone', def: 'A key checkpoint or event in the schedule.' }
  ],
  traps: [
    'Confusing a WBS (what work) with a schedule (when work happens).',
    'Thinking the shortest path sets the project length; the longest path, the critical path, does.',
    'Treating ongoing routine operations as a project. Projects are temporary.'
  ],
  explainer: null,
  video: null,
  caseFrequent: false
},
{
  id: 'bma-pj-run-close',
  area: 'PJ',
  title: 'Running a project: execution, team, and closing',
  pis: ['PJ:009', 'PJ:007', 'PJ:008'],
  minutes: 7,
  sections: [
    { pi: 'PJ:009', heading: 'Executing and controlling projects', html: `<p><strong>Executing</strong> means doing the planned work and producing the deliverables. <strong>Controlling</strong> (or monitoring) means checking progress against the plan and fixing problems early. The two happen together.</p>
<p>A project manager compares actual results to the <strong>baseline</strong>, the approved plan for scope, schedule, and cost. Common checks:</p>
<ul><li><strong>Schedule:</strong> are milestones being met?</li><li><strong>Cost:</strong> is spending in line with the budget?</li><li><strong>Quality:</strong> do deliverables meet the requirements?</li><li><strong>Risks and issues:</strong> what has gone wrong, and what might?</li></ul>
<p>A <strong>variance</strong> is the difference between plan and actual. Cost variance equals the budgeted cost of work done minus the actual cost. A negative number means over budget.</p>
<div class="example"><h4>Example</h4><p>The plan budgeted $8,000 for the work completed so far. The team has actually spent $9,000. Cost variance = $8,000 minus $9,000 = negative $1,000, so the project is $1,000 over budget for the work done.</p></div>
<p>Changes will be requested. <strong>Change control</strong> means reviewing each change request, deciding if it is worth the effect on time and cost, and getting approval before acting. Without it, <strong>scope creep</strong> (the slow, uncontrolled growth of the project) can wreck the schedule and budget. Regular status reports keep stakeholders informed.</p>` },
    { pi: 'PJ:007', heading: 'Managing the project team', html: `<p>A project team often includes people from different departments who do not usually work together. The project manager must build them into a team and keep them productive.</p>
<p>Responsibilities include:</p>
<ul><li><strong>Setting clear roles:</strong> everyone knows what they own and who decides what.</li><li><strong>Communicating</strong> goals, deadlines, and changes, with regular meetings.</li><li><strong>Motivating</strong> with recognition, fair workloads, and useful feedback.</li><li><strong>Resolving conflict</strong> by listening to both sides and focusing on the problem rather than the person.</li><li><strong>Providing resources and removing obstacles.</strong></li></ul>
<p>Teams often move through stages, described by Bruce Tuckman: <strong>forming</strong> (getting to know each other), <strong>storming</strong> (disagreements over roles and methods), <strong>norming</strong> (agreeing on how to work), <strong>performing</strong> (working effectively), and <strong>adjourning</strong> (the team breaks up after the project).</p>
<div class="example"><h4>Example</h4><p>Two team members argue over who should design the website's checkout page. The manager meets both, clarifies that Jamal owns the design and Aisha owns testing, and the team moves forward. That is conflict resolution during the storming stage.</p></div>
<div class="tip"><p>Stages in order: forming, storming, norming, performing, adjourning.</p></div>` },
    { pi: 'PJ:008', heading: 'Closing a project', html: `<p><strong>Closing</strong> is the last phase. It makes sure the work is truly finished and that the company learns from it. Skipping it leaves loose ends and repeats mistakes.</p>
<p>Closing steps:</p>
<ul><li><strong>Confirm the deliverables</strong> meet the requirements and get formal acceptance from the customer or sponsor.</li><li><strong>Finish contracts and payments</strong> with vendors, and settle the final budget.</li><li><strong>Release the team and resources</strong> so they can move to other work.</li><li><strong>Document lessons learned:</strong> what went well, what went wrong, and what to do differently next time.</li><li><strong>Archive the project records</strong> so they can be found later.</li><li><strong>Write a final report</strong> that compares results to the original goals, and recognize the team.</li></ul>
<p>Projects can also close early if they are cancelled, for example when the goal is no longer worth the cost. Closing it properly still matters.</p>
<div class="example"><h4>Example</h4><p>A company finishes installing new scheduling software. Before closing, the manager gets the sponsor's written acceptance, pays the final vendor invoice, holds a lessons-learned meeting, and files the documents. Only then is the project officially closed.</p></div>` }
  ],
  keyTerms: [
    { term: 'Baseline', def: 'The approved plan for scope, schedule, and cost that progress is measured against.' },
    { term: 'Variance', def: 'The difference between planned and actual results.' },
    { term: 'Change control', def: 'The process of reviewing and approving requested changes before they are made.' },
    { term: 'Scope creep', def: 'Uncontrolled growth in a project\'s scope without matching changes to time and budget.' },
    { term: 'Status report', def: 'A regular update on progress, problems, and next steps.' },
    { term: 'Storming', def: 'The team stage in which people disagree about roles and methods.' },
    { term: 'Lessons learned', def: 'A review of what worked and what did not, for use on future projects.' },
    { term: 'Formal acceptance', def: 'Written approval from the customer or sponsor that deliverables are complete.' }
  ],
  traps: [
    'Skipping the closing phase once the product is delivered. Acceptance, lessons learned, and archiving still remain.',
    'Letting small requests pile up without change control, which causes scope creep.',
    'Reading a negative cost variance as good news. It means over budget.'
  ],
  explainer: null,
  video: 'v-bmo-project-lifecycle',
  caseFrequent: false
},
{
  id: 'bma-qm-frameworks-ethics',
  area: 'QM',
  title: 'Quality frameworks and ethics',
  pis: ['QM:002', 'QM:012'],
  minutes: 6,
  sections: [
    { pi: 'QM:002', heading: 'Quality management frameworks', html: `<p>A <strong>quality management framework</strong> is an organized set of methods a company follows to deliver consistent products and services. Three well-known ones are:</p>
<ul><li><strong>Six Sigma:</strong> a data-driven method for finding and removing causes of defects and variation. Its goal is extremely few defects, about 3.4 per million opportunities. Projects follow <strong>DMAIC</strong>: Define, Measure, Analyze, Improve, Control.</li><li><strong>ITIL:</strong> a set of best practices for <strong>information technology service management</strong>. It helps IT teams deliver reliable services, such as handling help-desk requests, outages, and changes.</li><li><strong>CMMI (Capability Maturity Model Integration):</strong> a model that rates how mature and well-managed an organization's processes are, in levels from basic and unpredictable up to continually improving.</li></ul>
<p>Other approaches you may see include <strong>Total Quality Management (TQM)</strong>, which makes quality everyone's job; <strong>Lean</strong>, which removes waste; and <strong>ISO 9001</strong>, an international standard for a quality management system.</p>
<div class="example"><h4>Example</h4><p>A software company finds that 6 percent of its customer orders contain errors. It uses Six Sigma: it defines the problem, measures where errors occur, analyzes causes, improves the order form, and sets up controls to keep the gains. The error rate falls.</p></div>
<div class="tip"><p>Match the tool: Six Sigma for defects, ITIL for IT services, CMMI for process maturity.</p></div>` },
    { pi: 'QM:012', heading: 'Ethical considerations in quality management', html: `<p>Quality is not only a technical goal. It is also an ethical duty to customers, employees, and the public. Customers trust that a product is safe and as described.</p>
<p>Ethical issues in quality management include:</p>
<ul><li><strong>Honest reporting:</strong> never falsify test results, inspection records, or audit data to hide a problem.</li><li><strong>Safety first:</strong> do not ship a product known to be unsafe just to meet a deadline or save money.</li><li><strong>Truthful claims:</strong> labels and advertising must match the product's real quality and ingredients.</li><li><strong>Taking responsibility:</strong> report defects, issue recalls when needed, and fix harm caused.</li><li><strong>Speaking up:</strong> employees should be able to report quality or safety concerns without fear of punishment. Reporting wrongdoing to proper authorities is called <strong>whistleblowing</strong>.</li><li><strong>Fair treatment of suppliers and workers</strong> when raising standards.</li></ul>
<p>Ethical lapses can bring injuries, lawsuits, fines, recalls, and a lost reputation. A culture where managers reward honesty over hitting numbers helps prevent them.</p>
<div class="example"><h4>Example</h4><p>An inspector at a juice company finds that a batch failed a safety test. The plant manager asks her to change the result so the shipment can leave on time. The ethical choice is to keep the true record, hold the batch, and report the problem.</p></div>` }
  ],
  keyTerms: [
    { term: 'Six Sigma', def: 'A data-driven method for reducing defects and variation, using DMAIC.' },
    { term: 'DMAIC', def: 'Define, Measure, Analyze, Improve, Control, the five steps of a Six Sigma improvement project.' },
    { term: 'ITIL', def: 'A set of best practices for managing information technology services.' },
    { term: 'CMMI', def: 'A model that rates the maturity of an organization\'s processes in levels.' },
    { term: 'TQM', def: 'Total Quality Management, an approach that makes quality the job of everyone in the company.' },
    { term: 'Lean', def: 'An approach that improves efficiency by removing waste.' },
    { term: 'Recall', def: 'A company\'s action to remove or fix a product that is unsafe or defective.' },
    { term: 'Whistleblowing', def: 'Reporting wrongdoing or safety problems to people who can act on it.' }
  ],
  traps: [
    'Mixing up the frameworks: ITIL is about IT services, not manufacturing defects.',
    'Treating quality as only the quality department\'s job; TQM makes it everyone\'s job.',
    'Believing a deadline or profit goal justifies adjusting inspection records.'
  ],
  explainer: null,
  video: 'v-bmo-quality-risk',
  caseFrequent: false
},
{
  id: 'bma-rm-international',
  area: 'RM',
  title: 'International considerations in risk management',
  pis: ['RM:092'],
  minutes: 5,
  sections: [
    { pi: 'RM:092', heading: 'Risks that appear when a business goes international', html: `<p><strong>Risk management</strong> means identifying possible losses, judging how likely and serious they are, and deciding how to handle them. Doing business in other countries adds new risks on top of the usual ones.</p>
<ul><li><strong>Currency (exchange-rate) risk:</strong> if you agree to pay a foreign supplier in its currency, a stronger foreign currency makes your cost go up.</li><li><strong>Political risk:</strong> changes in government, new tariffs, sanctions, or even the seizure of company property.</li><li><strong>Legal and regulatory risk:</strong> each country has its own laws on contracts, taxes, product standards, labor, and data privacy. U.S. companies must also follow U.S. laws abroad, such as the Foreign Corrupt Practices Act, which bans bribing foreign officials.</li><li><strong>Cultural risk:</strong> different business customs, languages, and expectations can cause misunderstandings.</li><li><strong>Operational risk:</strong> long shipping routes, port delays, natural disasters, and unreliable local infrastructure.</li><li><strong>Payment and credit risk:</strong> it is harder to collect from a customer in another country.</li></ul>
<p>Common ways to <strong>manage</strong> these risks include buying <strong>insurance</strong>, using <strong>hedging</strong> (contracts that lock in an exchange rate), <strong>diversifying</strong> across several countries or suppliers, researching a country's risk before entering, hiring local advisers, and using letters of credit to secure payment.</p>
<div class="example"><h4>Example</h4><p>A small company agrees to pay a supplier in euros in ninety days. If the euro gets stronger, the company needs more dollars to pay the same invoice. To avoid that, it signs a contract that locks in today's exchange rate.</p></div>` }
  ],
  keyTerms: [
    { term: 'Risk management', def: 'Identifying, assessing, and responding to possible losses.' },
    { term: 'Exchange-rate risk', def: 'The chance that changes in currency values will raise costs or cut income.' },
    { term: 'Political risk', def: 'The chance that government actions or instability will harm a business.' },
    { term: 'Hedging', def: 'Using contracts or other tools to reduce the effect of price or currency changes.' },
    { term: 'Diversification', def: 'Spreading activities across several suppliers, products, or markets to reduce risk.' },
    { term: 'Foreign Corrupt Practices Act', def: 'A U.S. law that bans bribing foreign officials to win business.' }
  ],
  traps: [
    'Assuming local laws are the same everywhere. Each country has its own rules.',
    'Thinking insurance removes risk. It transfers the cost of some losses.',
    'Ignoring currency changes when pricing a deal that will be paid later in another currency.'
  ],
  explainer: null,
  video: null,
  caseFrequent: false
}
];
