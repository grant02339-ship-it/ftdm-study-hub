// ent-start: Entrepreneurship, EN area (discovery, planning, resources, operations, growth, exit).
export default [
 {
  "id": "v-ens-opportunity",
  "area": "EN",
  "title": "Spot an opportunity and test it first",
  "lesson": "ent-en-opportunities",
  "scenes": [
   {
    "dur": 9,
    "kind": "title",
    "caption": "Great businesses start with a real problem. Here is how to spot one and test it before you spend big.",
    "data": {
     "title": "Spot it. Test it.",
     "subtitle": "Opportunities and feasibility"
    }
   },
   {
    "dur": 8,
    "kind": "bullets",
    "caption": "Opportunities hide in problems, changes, and gaps. Listen to complaints. Watch trends. Notice what is missing nearby.",
    "data": {
     "heading": "Where opportunities hide",
     "items": [
      "Customer problems",
      "Changes in tech or tastes",
      "Gaps in the market"
     ]
    }
   },
   {
    "dur": 9,
    "kind": "compare",
    "caption": "An idea is just a thought. An opportunity is an idea with a real need, paying customers, and good timing.",
    "data": {
     "left": {
      "title": "Idea",
      "items": [
       "A thought",
       "No proof yet"
      ]
     },
     "right": {
      "title": "Opportunity",
      "items": [
       "Real need",
       "Paying customers",
       "Good timing"
      ]
     }
    }
   },
   {
    "dur": 7,
    "kind": "diagram",
    "caption": "Move from need to idea to test. Then decide to go or to stop.",
    "data": {
     "nodes": [
      {
       "id": "n",
       "label": "Need"
      },
      {
       "id": "i",
       "label": "Idea"
      },
      {
       "id": "t",
       "label": "Test"
      },
      {
       "id": "d",
       "label": "Go or stop"
      }
     ],
     "edges": [
      [
       "n",
       "i",
       "brainstorm"
      ],
      [
       "i",
       "t",
       "pilot"
      ],
      [
       "t",
       "d",
       "results"
      ]
     ]
    }
   },
   {
    "dur": 6,
    "kind": "bullets",
    "caption": "A feasibility study checks four things. Market. Operations. Finances. And the law.",
    "data": {
     "heading": "Feasibility checks",
     "items": [
      "Market: will they buy?",
      "Operations: can we deliver?",
      "Financial: will it pay?",
      "Legal: are we allowed?"
     ]
    }
   },
   {
    "dur": 9,
    "kind": "example",
    "caption": "Maya surveys forty dog owners about a grooming van. Twenty eight say they would pay. That is seventy percent.",
    "data": {
     "prompt": "28 of 40 owners say yes",
     "steps": [
      "28 ÷ 40 = 0.70",
      "70% show interest"
     ],
     "answer": "Strong signal. Run a pilot weekend next."
    }
   },
   {
    "dur": 7,
    "kind": "bullets",
    "caption": "Remember the order. Generate ideas first. Screen them second. Test the best one last.",
    "data": {
     "heading": "Recap",
     "items": [
      "Generate many ideas",
      "Screen with criteria",
      "Test with a pilot",
      "Exam trap. Feasibility asks can it work. The plan asks how."
     ]
    }
   },
   {
    "dur": 4,
    "kind": "title",
    "caption": "Test small, learn fast, then commit your money.",
    "data": {
     "title": "Test before you invest"
    }
   }
  ]
 },
 {
  "id": "v-ens-plan",
  "area": "EN",
  "title": "The business plan and funding",
  "lesson": "ent-en-business-plan",
  "scenes": [
   {
    "dur": 8,
    "kind": "title",
    "caption": "Before anyone lends you money, they want to read your plan. Here is what goes in it.",
    "data": {
     "title": "The business plan",
     "subtitle": "Define the venture, then fund it"
    }
   },
   {
    "dur": 8,
    "kind": "bullets",
    "caption": "A plan has an executive summary, a company description, a market analysis, products, marketing, operations, and financials.",
    "data": {
     "heading": "Plan parts",
     "items": [
      "Executive summary",
      "Market analysis",
      "Marketing and operations",
      "Financial plan"
     ]
    }
   },
   {
    "dur": 7,
    "kind": "diagram",
    "caption": "The summary appears first but is written last. Write the body, then summarize it.",
    "data": {
     "nodes": [
      {
       "id": "b",
       "label": "Write body"
      },
      {
       "id": "s",
       "label": "Write summary"
      },
      {
       "id": "f",
       "label": "Place first"
      }
     ],
     "edges": [
      [
       "b",
       "s",
       "then"
      ],
      [
       "s",
       "f",
       "move"
      ]
     ]
    }
   },
   {
    "dur": 6,
    "kind": "formula",
    "caption": "Funding needed equals total start-up costs minus the owner's own funds.",
    "data": {
     "label": "Funding needed",
     "tokens": [
      "Costs",
      "−",
      "Owner funds",
      "=",
      "Need"
     ]
    }
   },
   {
    "dur": 9,
    "kind": "example",
    "caption": "A food truck needs forty five thousand dollars. The owner has fifteen thousand saved. How much must she raise?",
    "data": {
     "prompt": "Truck needs $45,000. Owner has $15,000.",
     "steps": [
      "$45,000 − $15,000"
     ],
     "answer": "$30,000 to raise"
    }
   },
   {
    "dur": 9,
    "kind": "compare",
    "caption": "Debt must be repaid with interest but keeps your ownership. Equity gives investors a share and needs no repayment.",
    "data": {
     "left": {
      "title": "Debt",
      "items": [
       "Repay with interest",
       "Keep ownership",
       "Bank loans"
      ]
     },
     "right": {
      "title": "Equity",
      "items": [
       "Share ownership",
       "No set repayment",
       "Angel investors"
      ]
     }
    }
   },
   {
    "dur": 8,
    "kind": "bullets",
    "caption": "Lenders expect you to invest too. Prepare your plan and financial statements, compare sources, and negotiate terms.",
    "data": {
     "heading": "Getting funded",
     "items": [
      "Calculate the need",
      "Prepare documents",
      "Compare sources",
      "Negotiate terms"
     ]
    }
   },
   {
    "dur": 7,
    "kind": "bullets",
    "caption": "Exam trap. The executive summary is written last. And debt is repaid, equity is not.",
    "data": {
     "heading": "Exam trap",
     "items": [
      "Summary written last",
      "Debt repaid, equity shared"
     ]
    }
   }
  ]
 },
 {
  "id": "v-ens-exit",
  "area": "EN",
  "title": "Growth, exit and the entrepreneurial mindset",
  "lesson": "ent-en-exit",
  "scenes": [
   {
    "dur": 8,
    "kind": "title",
    "caption": "Owners build a business to grow it, and one day to leave it. Plan both from day one.",
    "data": {
     "title": "Grow, then exit",
     "subtitle": "Mindset and harvesting"
    }
   },
   {
    "dur": 7,
    "kind": "bullets",
    "caption": "The entrepreneurial mindset is curious, willing to take calculated risks, quick to adapt, and persistent.",
    "data": {
     "heading": "The mindset",
     "items": [
      "Curious",
      "Calculated risks",
      "Adaptable",
      "Persistent"
     ]
    }
   },
   {
    "dur": 7,
    "kind": "bullets",
    "caption": "Growth needs routines. Ask customers for feedback. Review sales data. Collect staff ideas. Scan for change.",
    "data": {
     "heading": "Keep finding opportunities",
     "items": [
      "Customer feedback",
      "Sales data",
      "Staff ideas",
      "Trend scanning"
     ]
    }
   },
   {
    "dur": 9,
    "kind": "diagram",
    "caption": "A business that runs without its owner is worth more. Build systems, then train a successor, then sell or step back.",
    "data": {
     "nodes": [
      {
       "id": "s",
       "label": "Build systems"
      },
      {
       "id": "t",
       "label": "Train successor"
      },
      {
       "id": "h",
       "label": "Harvest"
      }
     ],
     "edges": [
      [
       "s",
       "t",
       "document"
      ],
      [
       "t",
       "h",
       "transition"
      ]
     ]
    }
   },
   {
    "dur": 9,
    "kind": "bullets",
    "caption": "Harvesting means taking value out. Sell to an outsider, family, or employees. Merge, franchise, or go public. Liquidation is last.",
    "data": {
     "heading": "Ways to harvest",
     "items": [
      "Sale or buyout",
      "Merger",
      "IPO or franchise",
      "Liquidation, least value"
     ]
    }
   },
   {
    "dur": 6,
    "kind": "compare",
    "caption": "Some owners exit fully. Others stay involved as manager, consultant, or partial owner.",
    "data": {
     "left": {
      "title": "Full exit",
      "items": [
       "Cash at closing",
       "No role after"
      ]
     },
     "right": {
      "title": "Stay involved",
      "items": [
       "Keep a stake",
       "Earn-out or consulting",
       "More risk"
      ]
     }
    }
   },
   {
    "dur": 8,
    "kind": "example",
    "caption": "Dana plans to sell her shop in five years. She documents every process and trains a manager.",
    "data": {
     "prompt": "Dana wants top price in five years",
     "steps": [
      "Document processes",
      "Train a manager",
      "Track monthly profit"
     ],
     "answer": "Buyers see a business that runs without her"
    }
   },
   {
    "dur": 8,
    "kind": "bullets",
    "caption": "Exam trap. Harvesting is capturing value, not just closing the doors. Continuation planning covers sudden loss too.",
    "data": {
     "heading": "Exam trap",
     "items": [
      "Harvest is not just closing",
      "Plan for sudden loss"
     ]
    }
   }
  ]
 }
];
