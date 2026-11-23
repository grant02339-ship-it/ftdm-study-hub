// ht-ops: reels.
export default [
 {
  "id": "v-hto-emergency",
  "area": "OP",
  "title": "When the alarm sounds: emergency response",
  "lesson": "ht-op-emergency",
  "scenes": [
   {
    "dur": 7,
    "kind": "title",
    "caption": "When the alarm sounds, guests look to you. Here is how to keep them safe.",
    "data": {
     "title": "Emergency response",
     "subtitle": "People first, every time"
    }
   },
   {
    "dur": 8,
    "kind": "bullets",
    "caption": "Every property needs a written emergency plan. Staff know their roles, know the exits, and practice drills.",
    "data": {
     "heading": "The emergency action plan",
     "items": [
      "Assign roles in advance",
      "Know exits and alarms",
      "Practice drills",
      "Tell guests clearly"
     ]
    }
   },
   {
    "dur": 9,
    "kind": "diagram",
    "caption": "In a fire, remember R A C E. Rescue, sound the alarm, contain the fire, then extinguish or evacuate.",
    "data": {
     "nodes": [
      {
       "id": "r",
       "label": "Rescue"
      },
      {
       "id": "a",
       "label": "Alarm"
      },
      {
       "id": "c",
       "label": "Contain"
      },
      {
       "id": "e",
       "label": "Extinguish or evacuate"
      }
     ],
     "edges": [
      [
       "r",
       "a",
       "then"
      ],
      [
       "a",
       "c",
       "then"
      ],
      [
       "c",
       "e",
       "then"
      ]
     ]
    }
   },
   {
    "dur": 11,
    "kind": "example",
    "caption": "At two a m, a hotel alarm sounds. The manager calls for help, sends guests down the stairs, and counts everyone at the meeting spot.",
    "data": {
     "prompt": "Night alarm at a full hotel",
     "steps": [
      "Call emergency services",
      "Guide guests to the stairs",
      "Meet at the assembly point",
      "Account for everyone"
     ],
     "answer": "Use the stairs, never the elevators"
    }
   },
   {
    "dur": 9,
    "kind": "compare",
    "caption": "Different dangers need different moves. A fire means get out. A tornado means move to a safe inside space.",
    "data": {
     "left": {
      "title": "Evacuate",
      "items": [
       "Fire or smoke",
       "Gas leak",
       "Bomb threat"
      ]
     },
     "right": {
      "title": "Shelter in place",
      "items": [
       "Tornado warning",
       "Outdoor chemical release",
       "Move to an interior room"
      ]
     }
    }
   },
   {
    "dur": 9,
    "kind": "bullets",
    "caption": "Evacuation depends on the type of emergency, the layout, who is there, the time of day, and staff training.",
    "data": {
     "heading": "Factors affecting evacuation",
     "items": [
      "Type of emergency",
      "Layout and exits",
      "Crowds and mobility needs",
      "Time and training"
     ]
    }
   },
   {
    "dur": 10,
    "kind": "bullets",
    "caption": "For first aid, check the scene, call for help, and press firmly on heavy bleeding. Use an A E D if breathing stops.",
    "data": {
     "heading": "First aid basics",
     "items": [
      "Check the scene",
      "Call for help",
      "Direct pressure on bleeding",
      "Use an AED when needed"
     ]
    }
   },
   {
    "dur": 8,
    "kind": "bullets",
    "caption": "Exam trap. Never use elevators in a fire, and never go beyond your training. Life first, then property.",
    "data": {
     "heading": "Recap",
     "items": [
      "Life first, property second",
      "Stairs, not elevators",
      "Stay within your training",
      "Practice before you need it"
     ]
    }
   }
  ]
 },
 {
  "id": "v-hto-card-fraud",
  "area": "OP",
  "title": "Stopping card fraud and identity theft",
  "lesson": "ht-op-security",
  "scenes": [
   {
    "dur": 8,
    "kind": "title",
    "caption": "Cards and personal data are what thieves want from hotels and restaurants. Here is how to stop them.",
    "data": {
     "title": "Card fraud and identity theft",
     "subtitle": "Protect the guest and the business"
    }
   },
   {
    "dur": 9,
    "kind": "compare",
    "caption": "Card present means the guest is standing there. Card not present means a phone or online booking, which is riskier.",
    "data": {
     "left": {
      "title": "Card present",
      "items": [
       "Chip reader",
       "Check name and ID when needed",
       "Tap or insert card"
      ]
     },
     "right": {
      "title": "Card not present",
      "items": [
       "Ask for security code",
       "Check billing address",
       "Watch for rush requests"
      ]
     }
    }
   },
   {
    "dur": 10,
    "kind": "bullets",
    "caption": "Four habits cut card fraud. Use the chip reader, check the card and the person, verify remote orders, and never write down numbers.",
    "data": {
     "heading": "Fraud prevention",
     "items": [
      "Use chip readers",
      "Check card and person",
      "Verify code and address",
      "Never write down numbers"
     ]
    }
   },
   {
    "dur": 10,
    "kind": "example",
    "caption": "A week long booking comes in with a mismatched billing address. The agent does not simply confirm. She verifies the cardholder first.",
    "data": {
     "prompt": "Booking with a mismatched address",
     "steps": [
      "Spot the warning sign",
      "Contact the cardholder",
      "Verify card details",
      "Then confirm or decline"
     ],
     "answer": "Verify before you confirm"
    }
   },
   {
    "dur": 9,
    "kind": "diagram",
    "caption": "If fraud slips through, the cardholder disputes it. The reversal is called a chargeback, and the business loses the sale.",
    "data": {
     "nodes": [
      {
       "id": "g",
       "label": "Fraudulent charge"
      },
      {
       "id": "b",
       "label": "Cardholder disputes"
      },
      {
       "id": "c",
       "label": "Chargeback to business"
      }
     ],
     "edges": [
      [
       "g",
       "b",
       "is reported"
      ],
      [
       "b",
       "c",
       "reverses sale"
      ]
     ]
    }
   },
   {
    "dur": 8,
    "kind": "bullets",
    "caption": "Identity theft means using someone else's personal information. Collect less, limit access, lock files, and shred old records.",
    "data": {
     "heading": "Identity theft controls",
     "items": [
      "Collect only what you need",
      "Limit who can see it",
      "Lock files and screens",
      "Shred old records"
     ]
    }
   },
   {
    "dur": 8,
    "kind": "bullets",
    "caption": "Never say a guest's room number out loud. Offer to connect the call or take a message.",
    "data": {
     "heading": "Guest security at the desk",
     "items": [
      "Never announce room numbers",
      "Connect the call instead",
      "Take a message",
      "Report suspicious people"
     ]
    }
   },
   {
    "dur": 9,
    "kind": "bullets",
    "caption": "Exam trap. An approved card does not prove the buyer is the real cardholder. Never store the security code.",
    "data": {
     "heading": "Recap",
     "items": [
      "Approved does not mean genuine",
      "Never store the security code",
      "Protect data to stop both frauds",
      "Verify, then confirm"
     ]
    }
   }
  ]
 }
];
