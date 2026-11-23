// ent-fin reels.
export default [
  {
    "id": "v-enf-funding",
    "area": "FI",
    "title": "Funding a start-up: bootstrap, borrow or bring in investors",
    "lesson": "ent-fi-funding",
    "scenes": [
      {
        "dur": 5,
        "kind": "title",
        "caption": "Starting a business takes money. Where does it come from?",
        "data": {
          "title": "Funding a start-up",
          "subtitle": "Bootstrap, borrow or share ownership"
        }
      },
      {
        "dur": 11,
        "kind": "example",
        "caption": "First, know the number. Maya needs sixty thousand dollars for her food truck. Add a ten percent cushion and the need is sixty six thousand.",
        "data": {
          "prompt": "Maya needs $60,000 plus a 10% cushion. She has $16,000 saved.",
          "steps": [
            "$60,000 + $6,000 cushion = $66,000",
            "$66,000 - $16,000 savings"
          ],
          "answer": "She must raise $50,000"
        }
      },
      {
        "dur": 9,
        "kind": "bullets",
        "caption": "Option one is bootstrapping. Use your own savings and sales. You keep full control, but growth may be slow.",
        "data": {
          "heading": "Bootstrapping",
          "items": [
            "Owner savings and sales revenue",
            "Full ownership and control",
            "Slower growth"
          ]
        }
      },
      {
        "dur": 11,
        "kind": "bullets",
        "caption": "Option two is debt. A bank or an S B A backed loan must be repaid with interest. Lenders look at credit, cash flow and collateral.",
        "data": {
          "heading": "Debt: loans",
          "items": [
            "Repaid with interest",
            "Owner keeps ownership",
            "Lenders check cash flow and collateral"
          ]
        }
      },
      {
        "dur": 10,
        "kind": "bullets",
        "caption": "Option three is equity. Investors give cash for a share of the business. No monthly payments, but you give up some control.",
        "data": {
          "heading": "Equity: investors",
          "items": [
            "Angels and venture capital",
            "No required repayment",
            "Owners share control and profit"
          ]
        }
      },
      {
        "dur": 10,
        "kind": "formula",
        "caption": "Valuation is simple. An investor puts in fifty thousand for twenty percent. The business is worth two hundred fifty thousand after the deal.",
        "data": {
          "label": "Post-money value",
          "tokens": [
            "$50,000",
            "÷",
            "0.20"
          ],
          "result": "= $250,000"
        }
      },
      {
        "dur": 8,
        "kind": "compare",
        "caption": "So which one? Debt keeps ownership but demands payments. Equity eases cash flow but shares the upside.",
        "data": {
          "left": {
            "title": "Debt",
            "items": [
              "Must repay",
              "Keep ownership",
              "Interest cost"
            ]
          },
          "right": {
            "title": "Equity",
            "items": [
              "No repayment",
              "Give up ownership",
              "Share profits"
            ]
          }
        }
      },
      {
        "dur": 8,
        "kind": "bullets",
        "caption": "Exam trap. The S B A usually guarantees loans. It does not lend the money itself. Remember that.",
        "data": {
          "heading": "Exam trap",
          "items": [
            "SBA guarantees part of a loan",
            "The lender provides the cash"
          ]
        }
      }
    ]
  },
  {
    "id": "v-enf-breakeven",
    "area": "FI",
    "title": "Cash flow and break-even for a small business",
    "lesson": "ent-fi-profit",
    "scenes": [
      {
        "dur": 7,
        "kind": "title",
        "caption": "A busy shop can still run out of cash. Let us see how to stay safe.",
        "data": {
          "title": "Cash flow and break-even",
          "subtitle": "Know your numbers"
        }
      },
      {
        "dur": 8,
        "kind": "compare",
        "caption": "Profit is not cash. A sale on credit counts as profit now, but the cash arrives later.",
        "data": {
          "left": {
            "title": "Profit",
            "items": [
              "Revenue minus expenses",
              "Counts credit sales"
            ]
          },
          "right": {
            "title": "Cash flow",
            "items": [
              "Cash in minus cash out",
              "Counts only money received"
            ]
          }
        }
      },
      {
        "dur": 6,
        "kind": "diagram",
        "caption": "The cash flow statement has three parts: operating, investing and financing.",
        "data": {
          "nodes": [
            {
              "id": "op",
              "label": "Operating"
            },
            {
              "id": "inv",
              "label": "Investing"
            },
            {
              "id": "fin",
              "label": "Financing"
            },
            {
              "id": "net",
              "label": "Net change in cash"
            }
          ],
          "edges": [
            [
              "op",
              "net",
              "sales and bills"
            ],
            [
              "inv",
              "net",
              "equipment"
            ],
            [
              "fin",
              "net",
              "loans"
            ]
          ]
        }
      },
      {
        "dur": 8,
        "kind": "bullets",
        "caption": "Now break-even. It is the sales level where profit is exactly zero. Costs come in two types.",
        "data": {
          "heading": "Two kinds of cost",
          "items": [
            "Fixed: rent, insurance",
            "Variable: ingredients, supplies",
            "Contribution margin = price minus variable cost"
          ]
        }
      },
      {
        "dur": 5,
        "kind": "formula",
        "caption": "Break-even units equal fixed costs divided by contribution margin.",
        "data": {
          "label": "Break-even",
          "tokens": [
            "Fixed costs",
            "÷",
            "(Price",
            "-",
            "Variable cost)"
          ]
        }
      },
      {
        "dur": 10,
        "kind": "example",
        "caption": "A cleaning service has thirty six hundred dollars of fixed costs. Each job sells for sixty dollars and costs twenty four dollars to deliver.",
        "data": {
          "prompt": "Fixed $3,600. Price $60. Variable $24.",
          "steps": [
            "Contribution margin = $60 - $24 = $36",
            "Break-even = $3,600 ÷ $36"
          ],
          "answer": "100 jobs a month"
        }
      },
      {
        "dur": 9,
        "kind": "chart",
        "caption": "Below one hundred jobs the business loses money. Above one hundred, every job adds thirty six dollars of profit.",
        "data": {
          "type": "bar",
          "title": "Profit at different job counts",
          "labels": [
            "80 jobs",
            "100 jobs",
            "120 jobs"
          ],
          "values": [
            -720,
            0,
            720
          ],
          "unit": "$"
        }
      },
      {
        "dur": 8,
        "kind": "bullets",
        "caption": "Use it to plan. Test what happens if jobs drop or costs rise, and keep cash in reserve.",
        "data": {
          "heading": "Recap",
          "items": [
            "Profit is not cash",
            "Break-even = fixed ÷ margin",
            "Exam trap: divide by margin, not price"
          ]
        }
      }
    ]
  }
];
