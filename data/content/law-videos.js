// Videos for Business Law
export default [
  {
    id: 'v-bl-contracts', area: 'BL', title: 'What makes a contract binding', lesson: 'bl-contracts-agency',
    scenes: [
      { dur: 6, kind: 'title', caption: "Can you get out of a contract you signed? Sometimes. Here's when.", data: { title: 'What makes a contract binding', subtitle: 'Business Law' } },
      { dur: 7, kind: 'bullets', caption: "A valid contract needs five elements. Offer, acceptance, consideration, capacity, and a legal purpose.", data: { heading: 'Five elements', items: ['Offer and acceptance', 'Consideration: value on both sides', 'Capacity: legal age, sound mind', 'Legal purpose'] } },
      { dur: 8, kind: 'diagram', caption: "An offer plus acceptance of the same terms equals mutual assent. That's a meeting of the minds.", data: { nodes: [{ id: 'offer', label: 'Offer' }, { id: 'accept', label: 'Acceptance' }, { id: 'assent', label: 'Mutual assent' }], edges: [['offer', 'accept', 'same terms'], ['accept', 'assent', 'agreement']] } },
      { dur: 9, kind: 'compare', caption: "Exam trap. A void contract was never a contract. A voidable contract is valid, but one party can cancel it.", data: { left: { title: 'Void', items: ['Never a contract', 'Example: deal to commit a crime'] }, right: { title: 'Voidable', items: ['Valid until canceled', 'Example: a minor, or fraud'] } } },
      { dur: 11, kind: 'example', caption: "Jordan is sixteen and signs to buy a used car. Jordan is a minor, so the contract is voidable. Jordan can cancel, but the seller can't.", data: { prompt: 'Jordan, age 16, signs to buy a used car.', steps: ['Check capacity: Jordan is a minor', 'Minors may cancel most contracts', 'The adult seller is still bound'], answer: 'Voidable by Jordan' } },
      { dur: 11, kind: 'bullets', caption: "Most oral contracts count. But the Statute of Frauds requires writing for real estate, deals over a year, and goods of five hundred dollars or more.", data: { heading: 'Must be in writing', items: ['Real estate sales', 'Deals longer than one year', "Paying someone else's debt", 'Goods of $500 or more'] } },
      { dur: 10, kind: 'compare', caption: "When someone breaks a contract, the usual remedy is money damages. For unique items like land, a court may order specific performance.", data: { left: { title: 'Damages', items: ['Money', 'Puts you where you would have been'] }, right: { title: 'Specific performance', items: ['Court orders the deal done', 'Unique items: land, art'] } } },
      { dur: 9, kind: 'bullets', caption: "Recap. Five elements make a contract. Void is never valid. Voidable can be canceled. Some deals must be written.", data: { heading: 'Recap', items: ['Five elements', 'Void vs. voidable', 'Statute of Frauds writings', 'Damages or specific performance'] } }
    ]
  },
  {
    id: 'v-bl-ownership', area: 'BL', title: 'Forms of business ownership', lesson: 'bl-business-ownership',
    scenes: [
      { dur: 6, kind: 'title', caption: "Pick the wrong business form and creditors could come after your house.", data: { title: 'Forms of business ownership', subtitle: 'Liability, control and taxes' } },
      { dur: 7, kind: 'bullets', caption: "A sole proprietorship has one owner who keeps all profit, and has unlimited personal liability.", data: { heading: 'Sole proprietorship', items: ['One owner', 'Easiest to start', 'Keeps all profits', 'Unlimited liability'] } },
      { dur: 8, kind: 'bullets', caption: "In a general partnership, owners share profits and control. Each partner can bind the firm, with unlimited liability.", data: { heading: 'General partnership', items: ['Two or more owners', 'Shared profits and control', 'Each partner binds the firm', 'Unlimited liability'] } },
      { dur: 9, kind: 'bullets', caption: "A corporation is a separate legal person owned by shareholders. Owners have limited liability, and it can sell stock.", data: { heading: 'Corporation', items: ['Separate legal entity', 'Owned by shareholders', 'Limited liability', 'Can sell stock'] } },
      { dur: 8, kind: 'example', caption: "Double taxation. A C corporation pays tax on its profit. Then shareholders pay tax again on the dividends.", data: { prompt: 'How is a C corporation taxed?', steps: ['Corporation pays tax on profit', 'It pays dividends from what is left', 'Shareholders pay tax on dividends'], answer: 'Double taxation' } },
      { dur: 11, kind: 'compare', caption: "Exam trap. An L L C is a business type created under state law. An S corporation is a tax election made with the I R S.", data: { left: { title: 'LLC', items: ['State-law entity', 'Owners are members', 'Pass-through by default'] }, right: { title: 'S corporation', items: ['IRS tax election', 'Up to 100 shareholders', 'Pass-through taxation'] } } },
      { dur: 7, kind: 'bullets', caption: "Recap. Sole proprietors and general partners face unlimited liability. Corporations and L L Cs protect owners.", data: { heading: 'Recap', items: ['Unlimited: sole proprietor, general partner', 'Limited: LLC, corporation', 'C corporation: double taxation', 'S corporation: pass-through'] } }
    ]
  },
  {
    id: 'v-bl-regulation', area: 'BL', title: 'Financial regulation: laws and agencies', lesson: 'bl-finance-law-tax',
    scenes: [
      { dur: 7, kind: 'title', caption: "Finance handles other people's money, so the rules are tough. Meet the laws and agencies.", data: { title: 'Financial regulation', subtitle: 'Key laws and agencies' } },
      { dur: 9, kind: 'compare', caption: "The thirty three Act covers new securities. The thirty four Act covers trading, and created the S E C.", data: { left: { title: 'Securities Act of 1933', items: ['New issues', 'Registration and prospectus'] }, right: { title: 'Exchange Act of 1934', items: ['Trading existing securities', 'Created the SEC', 'Bans insider trading'] } } },
      { dur: 11, kind: 'bullets', caption: "Glass Steagall in nineteen thirty three created the F D I C. Gramm Leach Bliley in nineteen ninety nine let banks, brokers, and insurers combine.", data: { heading: 'Banking laws', items: ['Glass-Steagall, 1933: created the FDIC', 'Gramm-Leach-Bliley, 1999: firms combine'] } },
      { dur: 10, kind: 'bullets', caption: "Sarbanes Oxley tightened corporate reporting after Enron, in two thousand two. Dodd Frank created the C F P B in twenty ten.", data: { heading: 'Reform laws', items: ['Sarbanes-Oxley, 2002: corporate reporting', 'Dodd-Frank, 2010: created the CFPB'] } },
      { dur: 10, kind: 'compare', caption: "Exam trap. The S E C is a federal government agency. FINRA is a self regulatory organization, not part of the government.", data: { left: { title: 'SEC', items: ['Federal agency', 'Oversees securities markets'] }, right: { title: 'FINRA', items: ['Self-regulatory organization', 'Oversees broker-dealers'] } } },
      { dur: 11, kind: 'bullets', caption: "The F D I C insures deposits. The O C C charters national banks. The Fed runs monetary policy. The N C U A covers credit unions.", data: { heading: 'Banking regulators', items: ['FDIC: deposit insurance', 'OCC: national banks', 'Federal Reserve: monetary policy', 'NCUA: credit unions'] } },
      { dur: 9, kind: 'example', caption: "A customer deposits fifteen thousand dollars in cash. Over ten thousand triggers a Currency Transaction Report under the Bank Secrecy Act.", data: { prompt: 'A customer deposits $15,000 in cash.', steps: ['Bank Secrecy Act: anti-money-laundering law', 'Cash over $10,000 in a day is reported', '$15,000 is over the threshold'], answer: 'File a Currency Transaction Report' } },
      { dur: 6, kind: 'bullets', caption: "Recap. Match each law to its purpose, and each regulator to its turf.", data: { heading: 'Recap', items: ['1933 new issues, 1934 trading and SEC', 'Sarbanes-Oxley and Dodd-Frank reforms', 'FDIC, OCC, Fed, NCUA for banks', 'Cash over $10,000: file a CTR'] } }
    ]
  }
];
