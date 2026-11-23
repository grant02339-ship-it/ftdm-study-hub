// ht-info animated reels.

export default [
  {
    "id": "v-hti-guest-data",
    "area": "NF",
    "title": "Guest data: databases and analytics",
    "lesson": "ht-nf-databases-analytics",
    "scenes": [
      {
        "dur": 7,
        "kind": "title",
        "caption": "Every guest leaves a trail of data. Used well, it fills rooms and tables.",
        "data": {
          "title": "Guest data pays",
          "subtitle": "Databases and analytics"
        }
      },
      {
        "dur": 7,
        "kind": "bullets",
        "caption": "A customer database stores stays, preferences and spending. Managers search it instead of guessing.",
        "data": {
          "heading": "Inside a guest record",
          "items": [
            "Past stays and trips",
            "Preferences",
            "Spending",
            "How they found you"
          ]
        }
      },
      {
        "dur": 11,
        "kind": "example",
        "caption": "Say a ski resort wants to fill January. It searches its database for guests who stayed last winter, then sends them an early booking offer.",
        "data": {
          "prompt": "Fill January at a ski resort",
          "steps": [
            "Search the database",
            "Filter: winter guests",
            "Send an early offer"
          ],
          "answer": "A targeted offer beats a mass mailing"
        }
      },
      {
        "dur": 8,
        "kind": "diagram",
        "caption": "Good analysis follows a path. Guest data goes into the database. Analysis finds patterns. Then managers decide.",
        "data": {
          "nodes": [
            {
              "id": "g",
              "label": "Guest data"
            },
            {
              "id": "d",
              "label": "Database"
            },
            {
              "id": "a",
              "label": "Analysis"
            },
            {
              "id": "m",
              "label": "Decision"
            }
          ],
          "edges": [
            [
              "g",
              "d",
              "stored in"
            ],
            [
              "d",
              "a",
              "searched"
            ],
            [
              "a",
              "m",
              "guides"
            ]
          ]
        }
      },
      {
        "dur": 10,
        "kind": "formula",
        "caption": "Web analytics tracks conversion rate. That is bookings divided by visitors, times one hundred. Forty bookings from two thousand visitors is two percent.",
        "data": {
          "label": "Conversion rate",
          "tokens": [
            "40",
            "÷",
            "2,000",
            "×",
            "100"
          ],
          "result": "= 2%"
        }
      },
      {
        "dur": 9,
        "kind": "compare",
        "caption": "Exam trap. Bounce rate is visitors who leave after one page. Conversion rate is visitors who complete a goal, like booking.",
        "data": {
          "left": {
            "title": "Bounce rate",
            "items": [
              "Leaves after one page",
              "Signals a weak page"
            ]
          },
          "right": {
            "title": "Conversion rate",
            "items": [
              "Completes a goal",
              "Such as a booking"
            ]
          }
        }
      },
      {
        "dur": 9,
        "kind": "compare",
        "caption": "Reviews, emails and social posts are unstructured data. They have no set format, so they are harder to sort and analyze.",
        "data": {
          "left": {
            "title": "Structured",
            "items": [
              "Rows and columns",
              "Star rating, rate, nights"
            ]
          },
          "right": {
            "title": "Unstructured",
            "items": [
              "Review text, emails",
              "Photos and posts"
            ]
          }
        }
      },
      {
        "dur": 9,
        "kind": "bullets",
        "caption": "Recap. Search the database to find guests. Track analytics to learn what works. Expect extra work with unstructured data.",
        "data": {
          "heading": "Remember",
          "items": [
            "Database finds guests",
            "Analytics shows what works",
            "Unstructured data is harder"
          ]
        }
      }
    ]
  },
  {
    "id": "v-hti-primary-secondary",
    "area": "NF",
    "title": "Primary vs. secondary information",
    "lesson": "ht-nf-sources-methods",
    "scenes": [
      {
        "dur": 7,
        "kind": "title",
        "caption": "Where does smart hospitality information come from? Two places. New data, or someone else's.",
        "data": {
          "title": "Primary vs. secondary",
          "subtitle": "Where information comes from"
        }
      },
      {
        "dur": 8,
        "kind": "compare",
        "caption": "Primary information is collected firsthand to answer your question. Secondary information was already collected by someone else.",
        "data": {
          "left": {
            "title": "Primary",
            "items": [
              "Collected by you",
              "Fits your question",
              "Costs more, takes longer"
            ]
          },
          "right": {
            "title": "Secondary",
            "items": [
              "Already exists",
              "Faster and cheaper",
              "Made for another purpose"
            ]
          }
        }
      },
      {
        "dur": 7,
        "kind": "bullets",
        "caption": "Secondary sources include government tourism offices, trade associations, convention and visitors bureaus, and industry publications.",
        "data": {
          "heading": "Secondary sources",
          "items": [
            "Government tourism reports",
            "Trade associations",
            "Visitors bureaus",
            "Industry publications"
          ]
        }
      },
      {
        "dur": 7,
        "kind": "bullets",
        "caption": "Primary methods include observation, surveys by mail, phone or Internet, interviews, and focus groups.",
        "data": {
          "heading": "Primary methods",
          "items": [
            "Observation",
            "Mail, phone, online surveys",
            "Interviews",
            "Focus groups"
          ]
        }
      },
      {
        "dur": 9,
        "kind": "example",
        "caption": "A cruise line wonders why bookings fell. It first reads an industry report. Then it surveys its own past passengers.",
        "data": {
          "prompt": "Why did cruise bookings fall?",
          "steps": [
            "Read an industry report: secondary",
            "Survey past passengers: primary"
          ],
          "answer": "Start secondary, then collect primary"
        }
      },
      {
        "dur": 7,
        "kind": "diagram",
        "caption": "Start with secondary data. If it does not answer the question, collect primary data. Then decide.",
        "data": {
          "nodes": [
            {
              "id": "s",
              "label": "Secondary data"
            },
            {
              "id": "p",
              "label": "Primary data"
            },
            {
              "id": "d",
              "label": "Decision"
            }
          ],
          "edges": [
            [
              "s",
              "p",
              "gaps remain"
            ],
            [
              "p",
              "d",
              "informs"
            ]
          ]
        }
      },
      {
        "dur": 8,
        "kind": "compare",
        "caption": "Exam trap. A government tourism report is secondary, even though it is official. You did not collect it.",
        "data": {
          "left": {
            "title": "Secondary",
            "items": [
              "Government report",
              "Trade article"
            ]
          },
          "right": {
            "title": "Primary",
            "items": [
              "Your guest survey",
              "Your own observation"
            ]
          }
        }
      },
      {
        "dur": 7,
        "kind": "bullets",
        "caption": "Recap. Primary is new and yours. Secondary already exists. Always check the date and source online.",
        "data": {
          "heading": "Remember",
          "items": [
            "Primary: new and yours",
            "Secondary: already exists",
            "Check source and date"
          ]
        }
      }
    ]
  }
];
