export default [
 {
  "id": "v-ent-strategic-planning",
  "area": "SM",
  "title": "Strategic planning for a small business",
  "lesson": "ent-sm-planning-foundations",
  "scenes": [
   {
    "dur": 7,
    "kind": "title",
    "caption": "Every strong small business starts with a plan. Here is how owners build one.",
    "data": {
     "title": "Strategic planning",
     "subtitle": "Mission, goals and SWOT"
    }
   },
   {
    "dur": 8,
    "kind": "bullets",
    "caption": "Planning answers three questions. Why do we exist? Where are we going? How will we get there?",
    "data": {
     "heading": "Three planning questions",
     "items": [
      "Why do we exist?",
      "Where are we going?",
      "How do we get there?"
     ]
    }
   },
   {
    "dur": 9,
    "kind": "example",
    "caption": "The mission states the purpose today. For a food truck, it might say fresh lunches in under five minutes.",
    "data": {
     "prompt": "Food truck mission",
     "steps": [
      "Purpose: fresh lunches",
      "Customers: downtown workers",
      "Value: ready in five minutes"
     ],
     "answer": "Mission = purpose today"
    }
   },
   {
    "dur": 8,
    "kind": "compare",
    "caption": "The vision is the future picture. Goals are the broad results, and objectives are the measurable steps.",
    "data": {
     "left": {
      "title": "Goal",
      "items": [
       "Broad result",
       "Build loyal customers"
      ]
     },
     "right": {
      "title": "Objective",
      "items": [
       "Specific and measurable",
       "Forty percent repeat sales in twelve months"
      ]
     }
    }
   },
   {
    "dur": 6,
    "kind": "formula",
    "caption": "Good objectives are SMART. They are specific, measurable, achievable, relevant and time bound.",
    "data": {
     "label": "SMART",
     "tokens": [
      "Specific",
      "Measurable",
      "Achievable",
      "Relevant",
      "Time-bound"
     ]
    }
   },
   {
    "dur": 8,
    "kind": "diagram",
    "caption": "Next comes a SWOT. Strengths and weaknesses are inside the business. Opportunities and threats are outside it.",
    "data": {
     "nodes": [
      {
       "id": "in",
       "label": "Inside: strengths, weaknesses"
      },
      {
       "id": "out",
       "label": "Outside: opportunities, threats"
      },
      {
       "id": "plan",
       "label": "Strategy"
      }
     ],
     "edges": [
      [
       "in",
       "plan",
       "use and fix"
      ],
      [
       "out",
       "plan",
       "seize and avoid"
      ]
     ]
    }
   },
   {
    "dur": 7,
    "kind": "bullets",
    "caption": "Scan the outside world too. Look at the economy, competition, technology, laws and customer trends.",
    "data": {
     "heading": "External considerations",
     "items": [
      "Economy",
      "Competition",
      "Technology",
      "Laws",
      "Customer trends"
     ]
    }
   },
   {
    "dur": 9,
    "kind": "example",
    "caption": "Exam trap. A competitor opening nearby is not a weakness. It is outside your control, so it is a threat.",
    "data": {
     "prompt": "Rival opens next door",
     "steps": [
      "Is it inside your business?",
      "No, it is outside"
     ],
     "answer": "Threat"
    }
   },
   {
    "dur": 8,
    "kind": "bullets",
    "caption": "Recap. Define the mission, set SMART objectives, run a SWOT and scan the outside. Then write the plan.",
    "data": {
     "heading": "Recap",
     "items": [
      "Mission: why we exist",
      "SMART objectives",
      "SWOT: inside and outside",
      "Scan the environment"
     ]
    }
   }
  ]
 },
 {
  "id": "v-ent-legal-forms",
  "area": "BL",
  "title": "Legal forms and protecting your business",
  "lesson": "ent-bl-legal-basics",
  "scenes": [
   {
    "dur": 6,
    "kind": "title",
    "caption": "Your legal form decides who pays when things go wrong. Choose it carefully.",
    "data": {
     "title": "Choosing a legal form",
     "subtitle": "Liability, taxes and compliance"
    }
   },
   {
    "dur": 7,
    "kind": "bullets",
    "caption": "Owners weigh five things. Liability, taxes, cost, control and the ability to raise money.",
    "data": {
     "heading": "What to weigh",
     "items": [
      "Liability",
      "Taxes",
      "Cost and paperwork",
      "Control",
      "Raising money"
     ]
    }
   },
   {
    "dur": 9,
    "kind": "compare",
    "caption": "A sole proprietor is the business, so personal assets are at risk. An LLC generally separates owner and business.",
    "data": {
     "left": {
      "title": "Sole proprietorship",
      "items": [
       "Easy and cheap",
       "Unlimited personal liability"
      ]
     },
     "right": {
      "title": "LLC",
      "items": [
       "Owners generally protected",
       "Pass-through taxes by default"
      ]
     }
    }
   },
   {
    "dur": 7,
    "kind": "compare",
    "caption": "A C corporation pays tax, then shareholders pay tax on dividends. That is double taxation.",
    "data": {
     "left": {
      "title": "Pass-through",
      "items": [
       "Sole proprietor, partnership, LLC",
       "Taxed on owners' returns"
      ]
     },
     "right": {
      "title": "C corporation",
      "items": [
       "Taxed as its own entity",
       "Dividends taxed again"
      ]
     }
    }
   },
   {
    "dur": 9,
    "kind": "example",
    "caption": "Sales tax is not your money. Charge eight percent on a ten dollar meal, and eighty cents goes to the state.",
    "data": {
     "prompt": "$10.00 meal, 8% sales tax",
     "steps": [
      "Customer pays $10.80",
      "Owner keeps $10.00",
      "State gets $0.80"
     ],
     "answer": "Send $0.80 to the state"
    }
   },
   {
    "dur": 7,
    "kind": "bullets",
    "caption": "Businesses also file reports. Think annual state reports, tax returns, payroll filings and wage statements.",
    "data": {
     "heading": "Common filings",
     "items": [
      "Annual state report",
      "Tax returns",
      "Payroll reports",
      "Form W-2 to employees"
     ]
    }
   },
   {
    "dur": 8,
    "kind": "diagram",
    "caption": "Compliance is a cycle. List the rules, assign an owner, set a calendar, keep records, then review.",
    "data": {
     "nodes": [
      {
       "id": "a",
       "label": "List rules"
      },
      {
       "id": "b",
       "label": "Assign owner and calendar"
      },
      {
       "id": "c",
       "label": "Keep records"
      },
      {
       "id": "d",
       "label": "Review"
      }
     ],
     "edges": [
      [
       "a",
       "b",
       ""
      ],
      [
       "b",
       "c",
       ""
      ],
      [
       "c",
       "d",
       ""
      ]
     ]
    }
   },
   {
    "dur": 8,
    "kind": "example",
    "caption": "Exam trap. An LLC does not shield you from your own wrongdoing or from loans you personally guaranteed.",
    "data": {
     "prompt": "Personal guarantee on a loan",
     "steps": [
      "LLC shields most business debts",
      "A signed guarantee makes you liable"
     ],
     "answer": "Guarantee still binds you"
    }
   },
   {
    "dur": 9,
    "kind": "bullets",
    "caption": "Recap. Match the form to your risk and funding plans, pay the right taxes, file on time and stay compliant.",
    "data": {
     "heading": "Recap",
     "items": [
      "Form: liability and taxes",
      "Collect and send sales tax",
      "File reports on time",
      "Keep a compliance calendar"
     ]
    }
   }
  ]
 }
];
