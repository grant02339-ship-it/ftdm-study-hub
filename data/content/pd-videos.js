// Videos for Professional Development
export default [
  {
    id: 'v-pd-careers', area: 'PD', title: 'Finance careers and credentials', lesson: 'pd-career-exploration',
    scenes: [
      { dur: 6, kind: 'title', caption: "Want a career in finance? Here's the map, the jobs, and the licenses.", data: { title: 'Careers in financial services', subtitle: 'Jobs, licenses and credentials' } },
      { dur: 9, kind: 'bullets', caption: "Start with self assessment. Look at your interests, skills, and values. Then research with the Occupational Outlook Handbook and real professionals.", data: { heading: 'Explore before you choose', items: ['Interests, skills and values', 'Occupational Outlook Handbook', 'Counselors and professionals', 'Job shadowing and interviews'] } },
      { dur: 7, kind: 'diagram', caption: "Finance hires in banking, investments, insurance, and accounting. Each sector has jobs at different levels.", data: { nodes: [{ id: 'fin', label: 'Finance industry' }, { id: 'bank', label: 'Banking' }, { id: 'inv', label: 'Investments' }, { id: 'ins', label: 'Insurance and accounting' }], edges: [['fin', 'bank', 'includes'], ['fin', 'inv', 'includes'], ['fin', 'ins', 'includes']] } },
      { dur: 7, kind: 'compare', caption: "A teller handles everyday transactions. A loan officer reviews applications and helps customers borrow.", data: { left: { title: 'Teller', items: ['Entry-level job', 'Deposits and withdrawals', 'Strong customer service'] }, right: { title: 'Loan officer', items: ['Reviews loan applications', 'Explains rates and terms', 'Credit and math skills'] } } },
      { dur: 6, kind: 'diagram', caption: "Careers climb a ladder. Teller, personal banker, assistant branch manager, branch manager.", data: { nodes: [{ id: 't', label: 'Teller' }, { id: 'p', label: 'Personal banker' }, { id: 'a', label: 'Assistant manager' }, { id: 'b', label: 'Branch manager' }], edges: [['t', 'p', 'promotion'], ['p', 'a', 'promotion'], ['a', 'b', 'promotion']] } },
      { dur: 11, kind: 'bullets', caption: "Licenses matter. The S I E is entry level and needs no sponsor. The Series seven lets you sell securities, and needs a sponsoring firm.", data: { heading: 'FINRA licenses', items: ['SIE: entry-level, no sponsor', 'Series 7: needs a sponsoring firm', 'Series 63: state securities law', 'Series 65: investment advisers'] } },
      { dur: 9, kind: 'compare', caption: "Exam trap. A promotion moves you up in responsibility. A lateral move changes jobs at the same level to build skills.", data: { left: { title: 'Promotion', items: ['Moves up the ladder', 'More responsibility and pay'] }, right: { title: 'Lateral move', items: ['Same level', 'Builds new skills'] } } },
      { dur: 7, kind: 'bullets', caption: "Recap. Explore with reliable sources. Start at entry level. Earn credentials as needed. Never stop learning.", data: { heading: 'Recap', items: ['Self-assess and research', 'Know the finance sectors', 'SIE before Series 7', 'Keep learning for life'] } }
    ]
  },
  {
    id: 'v-pd-professionalism', area: 'PD', title: 'Workplace professionalism essentials', lesson: 'pd-workplace-conduct',
    scenes: [
      { dur: 6, kind: 'title', caption: "First impressions form in seconds. Here are the habits that make you hireable.", data: { title: 'Workplace professionalism', subtitle: 'Conduct, goals and good habits' } },
      { dur: 7, kind: 'bullets', caption: "Professionalism starts with image. Dress for the workplace, keep neat grooming, and use confident body language.", data: { heading: 'Professional image', items: ['Dress that fits the setting', 'Neat grooming', 'Eye contact, firm handshake'] } },
      { dur: 8, kind: 'compare', caption: "Exam trap. A policy is a rule. A protocol is the step by step procedure for a task.", data: { left: { title: 'Policy', items: ['A rule or guideline', 'Example: confidentiality policy'] }, right: { title: 'Protocol', items: ['Step by step procedure', 'Example: opening an account'] } } },
      { dur: 8, kind: 'bullets', caption: "Follow the code of conduct. Be honest, keep accurate records, protect customer data, and report suspected fraud.", data: { heading: 'Rules of conduct', items: ['Honesty and respect', 'Accurate records', 'Confidentiality', 'Report suspected fraud'] } },
      { dur: 7, kind: 'diagram', caption: "Respect the chain of command. Take concerns to your direct supervisor first. They escalate if needed.", data: { nodes: [{ id: 'e', label: 'Employee' }, { id: 's', label: 'Supervisor' }, { id: 'm', label: 'Manager' }, { id: 'x', label: 'Executive' }], edges: [['e', 's', 'tell first'], ['s', 'm', 'escalates'], ['m', 'x', 'escalates']] } },
      { dur: 5, kind: 'bullets', caption: "Set SMART goals. Specific, measurable, achievable, relevant, and time bound.", data: { heading: 'SMART goals', items: ['Specific and measurable', 'Achievable and relevant', 'Time-bound'] } },
      { dur: 10, kind: 'example', caption: "Vague goal, do better in finance class. SMART goal, raise my average from eighty two to ninety by the end of the semester.", data: { prompt: 'Vague goal: do better in finance class.', steps: ['Specific: raise my class average', 'Measurable: from 82 to 90', 'Time-bound: end of semester'], answer: 'Raise my finance average from 82 to 90 by semester end.' } },
      { dur: 8, kind: 'bullets', caption: "Recap. Look professional. Work systematically. Follow rules and the chain of command. Set SMART goals. Act with integrity.", data: { heading: 'Recap', items: ['Professional image', 'Systematic and rule-following', 'Chain of command', 'SMART goals and integrity'] } }
    ]
  }
];
