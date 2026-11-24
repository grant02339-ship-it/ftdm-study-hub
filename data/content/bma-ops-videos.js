// bma-ops reels.
export default [
 {
  "id": "v-bmo-project-lifecycle",
  "area": "PJ",
  "title": "Running a project from kickoff to close",
  "lesson": "bma-pj-run-close",
  "scenes": [
   {
    "kind": "title",
    "caption": "Every project has a start and an end. Here is how to run one from kickoff to close.",
    "data": {
     "title": "A project from kickoff to close",
     "subtitle": "Initiate, plan, run, close"
    },
    "dur": 8
   },
   {
    "kind": "diagram",
    "caption": "A project moves through four phases. Initiate, plan, execute and control, then close.",
    "data": {
     "nodes": [
      {
       "id": "i",
       "label": "Initiate"
      },
      {
       "id": "p",
       "label": "Plan"
      },
      {
       "id": "e",
       "label": "Execute and control"
      },
      {
       "id": "c",
       "label": "Close"
      }
     ],
     "edges": [
      [
       "i",
       "p",
       "approved"
      ],
      [
       "p",
       "e",
       "baseline set"
      ],
      [
       "e",
       "c",
       "accepted"
      ]
     ]
    },
    "dur": 6
   },
   {
    "kind": "bullets",
    "caption": "Start with a charter. It states the goal, the scope, and who approves the work.",
    "data": {
     "heading": "Initiate",
     "items": [
      "Purpose and goals",
      "Scope, time, and cost",
      "Sponsor and project manager"
     ]
    },
    "dur": 7
   },
   {
    "kind": "diagram",
    "caption": "Next, a work breakdown structure splits the project into small work packages that one person can own.",
    "data": {
     "nodes": [
      {
       "id": "a",
       "label": "Project"
      },
      {
       "id": "b",
       "label": "Deliverables"
      },
      {
       "id": "c",
       "label": "Work packages"
      }
     ],
     "edges": [
      [
       "a",
       "b",
       "splits into"
      ],
      [
       "b",
       "c",
       "splits into"
      ]
     ]
    },
    "dur": 8
   },
   {
    "kind": "example",
    "caption": "Task A takes three days. Tasks B and C follow A and take four and six days. Task D takes two days and follows both. The longest path is eleven days.",
    "data": {
     "prompt": "A is 3 days. B is 4. C is 6. D is 2 after B and C. How long is the project?",
     "steps": [
      "A, B, D = 3 + 4 + 2 = 9 days",
      "A, C, D = 3 + 6 + 2 = 11 days",
      "The longest path is critical"
     ],
     "answer": "11 days"
    },
    "dur": 13
   },
   {
    "kind": "formula",
    "caption": "While the team works, compare actual results to the baseline. Eight thousand dollars of work cost nine thousand. The variance is negative one thousand, so the project is over budget.",
    "data": {
     "label": "Cost variance",
     "tokens": [
      "$8,000",
      "−",
      "$9,000"
     ],
     "result": "= −$1,000 over budget"
    },
    "dur": 13
   },
   {
    "kind": "bullets",
    "caption": "Closing means formal acceptance, final payments, lessons learned, and archived records.",
    "data": {
     "heading": "Close",
     "items": [
      "Get formal acceptance",
      "Pay vendors, release the team",
      "Record lessons learned",
      "Archive the records"
     ]
    },
    "dur": 6
   },
   {
    "kind": "bullets",
    "caption": "Exam trap. Delivery is not the end. A project is not closed until the sponsor accepts it and lessons are recorded.",
    "data": {
     "heading": "Exam trap",
     "items": [
      "Delivered is not closed",
      "Negative variance is over budget",
      "Longest path sets the length"
     ]
    },
    "dur": 9
   }
  ]
 },
 {
  "id": "v-bmo-quality-risk",
  "area": "QM",
  "title": "Quality and risk in operations",
  "lesson": "bma-qm-frameworks-ethics",
  "scenes": [
   {
    "kind": "title",
    "caption": "Quality and risk decide whether operations succeed. Here are the key ideas.",
    "data": {
     "title": "Quality and risk in operations",
     "subtitle": "Frameworks, ethics, and international risk"
    },
    "dur": 6
   },
   {
    "kind": "bullets",
    "caption": "Three frameworks to know. Six Sigma cuts defects. ITIL manages information technology services. CMMI rates how mature a company's processes are.",
    "data": {
     "heading": "Quality frameworks",
     "items": [
      "Six Sigma: fewer defects",
      "ITIL: IT services",
      "CMMI: process maturity"
     ]
    },
    "dur": 9
   },
   {
    "kind": "diagram",
    "caption": "Six Sigma improvement follows five steps. Define, measure, analyze, improve, and control.",
    "data": {
     "nodes": [
      {
       "id": "d",
       "label": "Define"
      },
      {
       "id": "m",
       "label": "Measure"
      },
      {
       "id": "a",
       "label": "Analyze"
      },
      {
       "id": "i",
       "label": "Improve"
      },
      {
       "id": "c",
       "label": "Control"
      }
     ],
     "edges": [
      [
       "d",
       "m",
       ""
      ],
      [
       "m",
       "a",
       ""
      ],
      [
       "a",
       "i",
       ""
      ],
      [
       "i",
       "c",
       ""
      ]
     ]
    },
    "dur": 6
   },
   {
    "kind": "example",
    "caption": "A company finds that six percent of its orders contain errors. It measures where the errors happen, fixes the order form, and adds checks to keep the gain.",
    "data": {
     "prompt": "Six percent of orders have errors. What is the Six Sigma path?",
     "steps": [
      "Define the problem",
      "Measure and analyze causes",
      "Improve the order form",
      "Control with ongoing checks"
     ],
     "answer": "Use DMAIC"
    },
    "dur": 12
   },
   {
    "kind": "compare",
    "caption": "An inspector sees a failed safety test. Honest reporting protects customers. Changing the result puts people at risk.",
    "data": {
     "left": {
      "title": "Ethical",
      "items": [
       "Keep the true record",
       "Hold the batch",
       "Report the problem"
      ]
     },
     "right": {
      "title": "Unethical",
      "items": [
       "Change the result",
       "Ship to meet the deadline",
       "Hide the defect"
      ]
     }
    },
    "dur": 8
   },
   {
    "kind": "bullets",
    "caption": "Going global adds risks. Currency swings, political change, different laws, and long shipping routes.",
    "data": {
     "heading": "International risks",
     "items": [
      "Exchange rates",
      "Political change",
      "Different laws",
      "Long shipping routes"
     ]
    },
    "dur": 7
   },
   {
    "kind": "example",
    "caption": "A firm owes a supplier euros in ninety days. If the euro rises, the bill rises. A contract that locks in today's rate removes that risk.",
    "data": {
     "prompt": "Payment due in euros in 90 days. What is the risk and a fix?",
     "steps": [
      "Euro strengthens, bill rises",
      "Exchange-rate risk",
      "Hedge to lock the rate"
     ],
     "answer": "Hedging"
    },
    "dur": 11
   },
   {
    "kind": "bullets",
    "caption": "Exam trap. Insurance and hedging reduce the cost of risk. They do not make risk disappear.",
    "data": {
     "heading": "Exam trap",
     "items": [
      "Insurance transfers loss",
      "Hedging locks a rate",
      "Diversify suppliers"
     ]
    },
    "dur": 7
   }
  ]
 }
];
