// Videos for Information Management
export default [
  {
    id: 'v-nf-decisions', area: 'NF', title: 'Turning data into decisions', lesson: 'nf-info-process',
    scenes: [
      { dur: 6, kind: 'title', caption: "Data isn't information. Here's how businesses turn one into the other.", data: { title: 'Turning data into decisions', subtitle: 'Information management basics' } },
      { dur: 11, kind: 'compare', caption: "Exam trap. Data are raw facts. Information is data organized to have meaning. Sales of forty two, fifty one, forty seven average out to forty seven.", data: { left: { title: 'Data', items: ['Raw facts', 'Sales of 42, 51, 47', 'Not yet useful'] }, right: { title: 'Information', items: ['Organized and meaningful', 'Average sales are 47', 'Supports decisions'] } } },
      { dur: 8, kind: 'diagram', caption: "The cycle runs assess the need, obtain, evaluate, apply. Start by asking what decision you must make.", data: { nodes: [{ id: 'need', label: 'Assess need' }, { id: 'get', label: 'Obtain' }, { id: 'eval', label: 'Evaluate' }, { id: 'use', label: 'Apply' }], edges: [['need', 'get', 'find'], ['get', 'eval', 'check'], ['eval', 'use', 'decide']] } },
      { dur: 7, kind: 'compare', caption: "Check secondary data first. Someone already collected it. Collect primary data yourself only when you must.", data: { left: { title: 'Secondary data', items: ['Already collected', 'Fast and low cost', 'Government, industry reports'] }, right: { title: 'Primary data', items: ['Collected firsthand', 'Fits your exact question', 'Costs more time and money'] } } },
      { dur: 6, kind: 'bullets', caption: "Evaluate every source. Is it authoritative, accurate, current, objective, and relevant?", data: { heading: 'Evaluate every source', items: ['Authority and accuracy', 'Currency', 'Objectivity', 'Relevance'] } },
      { dur: 8, kind: 'chart', caption: "Look for trends. Mobile deposits rise steadily over six months, from twelve thousand to twenty seven thousand.", data: { type: 'line', title: 'Mobile deposits per month', xLabel: 'Month', yLabel: 'Deposits in thousands', series: [{ name: 'Deposits', points: [[1, 12], [2, 14], [3, 17], [4, 19], [5, 23], [6, 27]] }] } },
      { dur: 9, kind: 'example', caption: "Deposits and app downloads both rise. That's correlation. Other factors could explain both, so test with a pilot before deciding.", data: { prompt: 'Deposits and app downloads both rise. Does the app cause the deposits?', steps: ['Both move together: correlation', 'Other factors could explain both', 'Test with a small pilot'], answer: 'Correlation alone does not prove causation.' } },
      { dur: 7, kind: 'bullets', caption: "Recap. Assess the need. Secondary data first. Evaluate sources. Correlation is not causation. Then apply it.", data: { heading: 'Recap', items: ['Assess the need', 'Secondary data first', 'Evaluate sources', 'Correlation is not causation'] } }
    ]
  },
  {
    id: 'v-nf-protect', area: 'NF', title: 'Protecting information in finance', lesson: 'nf-ethics-legal',
    scenes: [
      { dur: 6, kind: 'title', caption: "One data breach can wreck a bank's reputation. Here's how finance protects information.", data: { title: 'Protecting information', subtitle: 'Security, privacy, and ethics' } },
      { dur: 7, kind: 'bullets', caption: "Customers trust finance with sensitive details. Protect it three ways. Ethics, law, and security tools.", data: { heading: 'Three layers of protection', items: ['Ethics', 'Law', 'Security tools'] } },
      { dur: 9, kind: 'compare', caption: "Exam trap. Privacy is the customer's right to control their data. Confidentiality is the business's duty to keep it restricted.", data: { left: { title: 'Privacy', items: ["The customer's right", 'Control over personal data'] }, right: { title: 'Confidentiality', items: ["The business's duty", 'Share only with authorized people'] } } },
      { dur: 9, kind: 'diagram', caption: "Gramm Leach Bliley requires protecting customer data. Sarbanes Oxley demands accurate records. Breach laws require notifying people when data is exposed.", data: { nodes: [{ id: 'glba', label: 'GLBA: protect customer data' }, { id: 'sox', label: 'Sarbanes-Oxley: accurate records' }, { id: 'breach', label: 'Breach laws: notify people' }], edges: [['glba', 'sox', 'and'], ['sox', 'breach', 'and']] } },
      { dur: 7, kind: 'bullets', caption: "Strong passwords, two step sign in, updates, encryption, and limited access keep data safe.", data: { heading: 'Security habits', items: ['Strong, unique passwords', 'Two-step sign in', 'Updates and encryption', 'Limit access'] } },
      { dur: 10, kind: 'example', caption: "An urgent email asks Sam to confirm his password through a link. Don't click. Check the sender, report it, and contact the bank directly.", data: { prompt: 'An urgent email asks Sam to confirm his password through a link.', steps: ["Don't click the link or reply", 'Check the sender address', 'Report it; contact the bank directly'], answer: 'Treat it as phishing and report it.' } },
      { dur: 9, kind: 'compare', caption: "Data mining can detect fraud. Used badly, it invades privacy or repeats bias. Get consent, anonymize, and test for bias.", data: { left: { title: 'Responsible use', items: ['Get consent', 'Anonymize records', 'Test for bias'] }, right: { title: 'Risky use', items: ['Sell data without notice', 'Biased lending models', 'Collect more than needed'] } } },
      { dur: 6, kind: 'bullets', caption: "Recap. Protect information with ethics, law, and security. In finance, trust is everything.", data: { heading: 'Recap', items: ['Respect privacy and confidentiality', 'Know the main laws', 'Use strong security habits', 'Mine data ethically'] } }
    ]
  }
];
