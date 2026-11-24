// bma-mgmt videos
export default [
 {
  "id": "v-bmm-knowledge-mgmt",
  "area": "KM",
  "title": "Knowledge management: keep what your company knows",
  "lesson": "bma-km-knowledge-management",
  "scenes": [
   {
    "dur": 7,
    "kind": "title",
    "caption": "What happens when your best employee quits? All their know-how walks out the door.",
    "data": {
     "title": "Knowledge management",
     "subtitle": "Keep what your company knows"
    }
   },
   {
    "dur": 7,
    "kind": "compare",
    "caption": "Explicit knowledge is written down. Tacit knowledge lives in people's heads and is harder to share.",
    "data": {
     "left": {
      "title": "Explicit",
      "items": [
       "Manuals and policies",
       "Templates and reports",
       "Easy to store"
      ]
     },
     "right": {
      "title": "Tacit",
      "items": [
       "Experience and judgment",
       "Know-how in people",
       "Shared by mentoring"
      ]
     }
    }
   },
   {
    "dur": 7,
    "kind": "diagram",
    "caption": "The process is a cycle. Capture knowledge, organize it, share it, then use and update it.",
    "data": {
     "nodes": [
      {
       "id": "a",
       "label": "Capture"
      },
      {
       "id": "b",
       "label": "Organize"
      },
      {
       "id": "c",
       "label": "Share"
      },
      {
       "id": "d",
       "label": "Use and update"
      }
     ],
     "edges": [
      [
       "a",
       "b",
       "store"
      ],
      [
       "b",
       "c",
       "find"
      ],
      [
       "c",
       "d",
       "apply"
      ]
     ]
    }
   },
   {
    "dur": 6,
    "kind": "bullets",
    "caption": "Technology helps. Wikis, searchable databases, and collaboration tools make knowledge easy to find.",
    "data": {
     "heading": "KM technology",
     "items": [
      "Document systems",
      "Wikis and intranets",
      "Search and tags",
      "Access controls"
     ]
    }
   },
   {
    "dur": 6,
    "kind": "bullets",
    "caption": "Ethics matters too. Be accurate, give credit, protect private data, and share openly.",
    "data": {
     "heading": "Ethical KM",
     "items": [
      "Be accurate",
      "Give fair credit",
      "Protect privacy",
      "Share openly"
     ]
    }
   },
   {
    "dur": 7,
    "kind": "bullets",
    "caption": "The law matters as well. Protect trade secrets, respect copyrights, and use nondisclosure agreements.",
    "data": {
     "heading": "Legal basics",
     "items": [
      "Copyrights and trademarks",
      "Trade secrets",
      "Nondisclosure agreements",
      "Privacy laws"
     ]
    }
   },
   {
    "dur": 7,
    "kind": "example",
    "caption": "A catering team finishes a big event. What should the manager do with the lessons learned?",
    "data": {
     "prompt": "A big event just ended. What next?",
     "steps": [
      "Write a short lessons-learned note",
      "Save it in a labeled shared folder",
      "Review it at the next team meeting"
     ],
     "answer": "Capture, organize, share, then update"
    }
   },
   {
    "dur": 8,
    "kind": "bullets",
    "caption": "Exam trap. Capturing knowledge is only the start. It must also be organized, shared, and kept current.",
    "data": {
     "heading": "Recap",
     "items": [
      "Explicit versus tacit",
      "Capture, organize, share, use",
      "Ethics and legal rules",
      "Exam trap: stopping at capture"
     ]
    }
   }
  ]
 },
 {
  "id": "v-bmm-dispute-resolution",
  "area": "BL",
  "title": "Settling business disputes",
  "lesson": "bma-bl-resolving-disputes",
  "scenes": [
   {
    "dur": 7,
    "kind": "title",
    "caption": "Two companies disagree about a contract. Do they have to go to court? Not always.",
    "data": {
     "title": "Resolving disputes",
     "subtitle": "Settlement, litigation, and ADR"
    }
   },
   {
    "dur": 7,
    "kind": "bullets",
    "caption": "Most disputes are settled. Cost, time, risk, and relationships all push parties to settle.",
    "data": {
     "heading": "Why settle?",
     "items": [
      "Legal cost",
      "Time and distraction",
      "Uncertain outcome",
      "Relationships and reputation"
     ]
    }
   },
   {
    "dur": 7,
    "kind": "diagram",
    "caption": "Litigation follows steps. The complaint comes first, then the answer, discovery, trial, and appeal.",
    "data": {
     "nodes": [
      {
       "id": "a",
       "label": "Complaint"
      },
      {
       "id": "b",
       "label": "Answer"
      },
      {
       "id": "c",
       "label": "Discovery"
      },
      {
       "id": "d",
       "label": "Trial"
      },
      {
       "id": "e",
       "label": "Appeal"
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
      ],
      [
       "d",
       "e",
       ""
      ]
     ]
    }
   },
   {
    "dur": 7,
    "kind": "bullets",
    "caption": "In discovery, both sides gather evidence. A deposition is questioning of a witness under oath.",
    "data": {
     "heading": "Discovery tools",
     "items": [
      "Interrogatories",
      "Depositions",
      "Document requests"
     ]
    }
   },
   {
    "dur": 8,
    "kind": "compare",
    "caption": "Mediation and arbitration are alternatives to court. A mediator helps you agree. An arbitrator decides for you.",
    "data": {
     "left": {
      "title": "Mediation",
      "items": [
       "Neutral helper",
       "No decision made",
       "Parties choose to agree"
      ]
     },
     "right": {
      "title": "Arbitration",
      "items": [
       "Neutral decision maker",
       "Issues an award",
       "May be binding"
      ]
     }
    }
   },
   {
    "dur": 8,
    "kind": "example",
    "caption": "A contract says disputes go to a neutral person whose decision is final. Which method is this?",
    "data": {
     "prompt": "Contract clause: final decision by a neutral party",
     "steps": [
      "A neutral person decides",
      "The decision is final",
      "That is not mediation"
     ],
     "answer": "Binding arbitration"
    }
   },
   {
    "dur": 7,
    "kind": "bullets",
    "caption": "Exam trap. A mediator never decides the outcome. Only an arbitrator or a court does.",
    "data": {
     "heading": "Recap",
     "items": [
      "Most disputes settle",
      "Litigation has set stages",
      "Mediator helps, arbitrator decides",
      "Exam trap: mediator decides"
     ]
    }
   }
  ]
 }
];
