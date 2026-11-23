// ent-ops: Operations (OP) and Human Resources (HR) content for the Entrepreneurship cluster.
export default [
 {
  "id": "v-eno-day-to-day",
  "area": "OP",
  "title": "Running day-to-day operations",
  "lesson": "ent-op-quality-systems",
  "scenes": [
   {
    "dur": 6,
    "kind": "title",
    "caption": "Running a small business day to day takes systems, not heroics.",
    "data": {
     "title": "Day-to-day operations",
     "subtitle": "Systems beat heroics"
    }
   },
   {
    "dur": 8,
    "kind": "bullets",
    "caption": "Great operations rest on three habits. Write the steps down. Measure the results. Fix the slowest step first.",
    "data": {
     "heading": "Three habits",
     "items": [
      "Write the steps down",
      "Measure results",
      "Fix the slowest step"
     ]
    }
   },
   {
    "dur": 9,
    "kind": "diagram",
    "caption": "A process turns inputs into outputs. People and materials go in. A product or service customers want comes out.",
    "data": {
     "nodes": [
      {
       "id": "a",
       "label": "Inputs"
      },
      {
       "id": "b",
       "label": "Process"
      },
      {
       "id": "c",
       "label": "Customer value"
      }
     ],
     "edges": [
      [
       "a",
       "b",
       "flow in"
      ],
      [
       "b",
       "c",
       "delivers"
      ]
     ]
    }
   },
   {
    "dur": 9,
    "kind": "example",
    "caption": "A car wash has a long line at the vacuum station. The washing tunnel is fast, but the vacuums are slow.",
    "data": {
     "prompt": "Where do cars wait?",
     "steps": [
      "Tunnel handles many cars",
      "Vacuum bay handles few",
      "The slow step sets the pace"
     ],
     "answer": "Fix the bottleneck"
    }
   },
   {
    "dur": 8,
    "kind": "formula",
    "caption": "Break-even tells you how many sales cover your fixed costs. Divide fixed costs by price minus variable cost.",
    "data": {
     "label": "Break-even units",
     "tokens": [
      "Fixed costs",
      "÷",
      "(Price − Variable cost)"
     ]
    }
   },
   {
    "dur": 10,
    "kind": "example",
    "caption": "A food truck has forty-eight hundred dollars in fixed costs. Each sale brings ten dollars and costs four. That leaves six dollars per sale.",
    "data": {
     "prompt": "$4,800 ÷ $6",
     "steps": [
      "Margin = $10 − $4 = $6",
      "$4,800 ÷ $6"
     ],
     "answer": "800 sales to break even"
    }
   },
   {
    "dur": 7,
    "kind": "compare",
    "caption": "Budget variance compares actual spending to the plan. Over budget on an expense is unfavorable.",
    "data": {
     "left": {
      "title": "Expense over budget",
      "items": [
       "Unfavorable variance",
       "Find the cause"
      ]
     },
     "right": {
      "title": "Expense under budget",
      "items": [
       "Favorable variance",
       "Check quality still holds"
      ]
     }
    }
   },
   {
    "dur": 11,
    "kind": "bullets",
    "caption": "Protect the business too. Layer your locks, split cash duties, and turn on two-step sign-in. Exam trap. Personal protective gear is the last fix, not the first.",
    "data": {
     "heading": "Protect it",
     "items": [
      "Layer security",
      "Split cash duties",
      "Two-step sign-in",
      "Exam trap: PPE is last"
     ]
    }
   },
   {
    "dur": 4,
    "kind": "bullets",
    "caption": "Recap. Systems, measures, and protection keep operations steady.",
    "data": {
     "heading": "Recap",
     "items": [
      "Write the steps",
      "Measure and budget",
      "Fix bottlenecks",
      "Protect people and data"
     ]
    }
   }
  ]
 },
 {
  "id": "v-eno-hire-lead",
  "area": "HR",
  "title": "Hiring and leading your first employees",
  "lesson": "ent-hr-hiring",
  "scenes": [
   {
    "dur": 8,
    "kind": "title",
    "caption": "Your first hire can make or break a small business. Here is how to do it right.",
    "data": {
     "title": "Your first hires",
     "subtitle": "Hire well, lead well"
    }
   },
   {
    "dur": 7,
    "kind": "bullets",
    "caption": "Hire for a real need. Check the workload first. Then pick full-time, part-time, or a contractor.",
    "data": {
     "heading": "Need first",
     "items": [
      "Study the workload",
      "Write the job description",
      "Pick the right type of worker"
     ]
    }
   },
   {
    "dur": 7,
    "kind": "diagram",
    "caption": "Screen against the requirements. Interview with the same questions. Check references. Then make the offer.",
    "data": {
     "nodes": [
      {
       "id": "a",
       "label": "Screen"
      },
      {
       "id": "b",
       "label": "Interview"
      },
      {
       "id": "c",
       "label": "References"
      },
      {
       "id": "d",
       "label": "Offer"
      }
     ],
     "edges": [
      [
       "a",
       "b",
       "short list"
      ],
      [
       "b",
       "c",
       "top pick"
      ],
      [
       "c",
       "d",
       "verified"
      ]
     ]
    }
   },
   {
    "dur": 8,
    "kind": "compare",
    "caption": "Ask about the job, not the person. Availability is fair. Family plans, age, and religion are not.",
    "data": {
     "left": {
      "title": "Fair questions",
      "items": [
       "Can you work weekends?",
       "Tell me about a past customer problem"
      ]
     },
     "right": {
      "title": "Avoid",
      "items": [
       "Age",
       "Family plans",
       "Religion"
      ]
     }
    }
   },
   {
    "dur": 9,
    "kind": "bullets",
    "caption": "Train every new hire. Show it, let them try it, and give feedback. Exam trap. Experienced hires still need orientation.",
    "data": {
     "heading": "Train them",
     "items": [
      "Orientation",
      "Show and practice",
      "Feedback",
      "Exam trap: orient everyone"
     ]
    }
   },
   {
    "dur": 9,
    "kind": "bullets",
    "caption": "Lead with clear expectations. Delegate tasks with the authority to finish them. Praise in public and correct in private.",
    "data": {
     "heading": "Lead well",
     "items": [
      "Clear expectations",
      "Delegate with authority",
      "Praise public, correct private"
     ]
    }
   },
   {
    "dur": 9,
    "kind": "diagram",
    "caption": "If problems appear, escalate step by step. Coach first. Then a verbal warning, a written warning, and last, termination.",
    "data": {
     "nodes": [
      {
       "id": "a",
       "label": "Coach"
      },
      {
       "id": "b",
       "label": "Verbal"
      },
      {
       "id": "c",
       "label": "Written"
      },
      {
       "id": "d",
       "label": "Terminate"
      }
     ],
     "edges": [
      [
       "a",
       "b",
       "repeats"
      ],
      [
       "b",
       "c",
       "repeats"
      ],
      [
       "c",
       "d",
       "no change"
      ]
     ]
    }
   },
   {
    "dur": 7,
    "kind": "bullets",
    "caption": "Document everything and keep records private. Fair, consistent treatment protects you and your team.",
    "data": {
     "heading": "Document it",
     "items": [
      "Write down facts",
      "Keep files confidential",
      "Treat everyone consistently"
     ]
    }
   },
   {
    "dur": 6,
    "kind": "bullets",
    "caption": "Recap. Hire for need, interview fairly, train well, and lead consistently.",
    "data": {
     "heading": "Recap",
     "items": [
      "Hire for need",
      "Interview fairly",
      "Train well",
      "Lead consistently"
     ]
    }
   }
  ]
 }
];
