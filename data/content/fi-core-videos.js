// fi-core animated video lessons (generated as plain data).

export default [
  {
    "id": "v-fi-tvm",
    "area": "FI",
    "title": "Why money grows: the time value of money",
    "lesson": "fi-tvm",
    "scenes": [
      {
        "dur": 7, audio: 'media/v-fi-tvm-0.m4a',
        "kind": "title",
        "caption": "A dollar today beats a dollar tomorrow. Here's why that idea runs all of finance.",
        "data": {
          "title": "The time value of money",
          "subtitle": "Why a dollar today beats a dollar tomorrow"
        }
      },
      {
        "dur": 10, audio: 'media/v-fi-tvm-1.m4a',
        "kind": "bullets",
        "caption": "Three reasons. You can invest it now. Inflation shrinks future dollars. And a future promise might never pay.",
        "data": {
          "heading": "Why today's dollar wins",
          "items": [
            "It can earn interest now",
            "Inflation shrinks future buying power",
            "Future payments carry risk"
          ]
        }
      },
      {
        "dur": 7, audio: 'media/v-fi-tvm-2.m4a',
        "kind": "compare",
        "caption": "Simple interest pays only on what you put in. Compound interest pays on your interest too.",
        "data": {
          "left": {
            "title": "Simple interest",
            "items": [
              "Paid on principal only",
              "Grows in a straight line",
              "I = P × r × t"
            ]
          },
          "right": {
            "title": "Compound interest",
            "items": [
              "Paid on principal plus past interest",
              "Grows faster and faster",
              "FV = PV × (1 + r)ⁿ"
            ]
          }
        }
      },
      {
        "dur": 9, audio: 'media/v-fi-tvm-3.m4a',
        "kind": "formula",
        "caption": "Simple interest is principal times rate times time. A thousand dollars at six percent for three years earns one hundred eighty.",
        "data": {
          "label": "Simple interest: $1,000 at 6% for 3 years",
          "tokens": [
            "I",
            "=",
            "$1,000",
            "×",
            "0.06",
            "×",
            "3"
          ],
          "result": "= $180"
        }
      },
      {
        "dur": 13, audio: 'media/v-fi-tvm-4.m4a',
        "kind": "formula",
        "caption": "Now compounding. Future value equals present value times one plus the rate, to the power of the years. That thousand becomes one thousand one hundred ninety one dollars.",
        "data": {
          "label": "Compound interest: $1,000 at 6% for 3 years",
          "tokens": [
            "FV",
            "=",
            "$1,000",
            "×",
            "(1.06)³"
          ],
          "result": "= $1,191.02"
        }
      },
      {
        "dur": 10, audio: 'media/v-fi-tvm-5.m4a',
        "kind": "chart",
        "caption": "Give it thirty years and the gap explodes. Simple interest gets you twenty eight hundred. Compounding gets you about fifty seven hundred.",
        "data": {
          "type": "line",
          "title": "$1,000 at 6%: simple vs. compound",
          "xLabel": "Years",
          "yLabel": "Balance ($)",
          "series": [
            {
              "name": "Simple",
              "points": [
                [
                  0,
                  1000
                ],
                [
                  5,
                  1300
                ],
                [
                  10,
                  1600
                ],
                [
                  15,
                  1900
                ],
                [
                  20,
                  2200
                ],
                [
                  25,
                  2500
                ],
                [
                  30,
                  2800
                ]
              ]
            },
            {
              "name": "Compound",
              "points": [
                [
                  0,
                  1000.0
                ],
                [
                  5,
                  1338.23
                ],
                [
                  10,
                  1790.85
                ],
                [
                  15,
                  2396.56
                ],
                [
                  20,
                  3207.14
                ],
                [
                  25,
                  4291.87
                ],
                [
                  30,
                  5743.49
                ]
              ]
            }
          ]
        }
      },
      {
        "dur": 10, audio: 'media/v-fi-tvm-6.m4a',
        "kind": "formula",
        "caption": "Present value runs it backwards. Five thousand dollars in four years, at five percent, is worth about forty one hundred today.",
        "data": {
          "label": "Present value: $5,000 in 4 years at 5%",
          "tokens": [
            "PV",
            "=",
            "$5,000",
            "÷",
            "(1.05)⁴"
          ],
          "result": "= $4,113.51"
        }
      },
      {
        "dur": 12, audio: 'media/v-fi-tvm-7.m4a',
        "kind": "example",
        "caption": "Here's a shortcut. The Rule of seventy two. Divide seventy two by the rate. At eight percent, your money doubles in about nine years.",
        "data": {
          "prompt": "At 8% a year, about how long until money doubles?",
          "steps": [
            "Rule of 72: years ≈ 72 ÷ rate",
            "72 ÷ 8 = 9"
          ],
          "answer": "About 9 years"
        }
      },
      {
        "dur": 10, audio: 'media/v-fi-tvm-8.m4a',
        "kind": "compare",
        "caption": "Exam trap. A P R ignores compounding. A P Y includes it, so A P Y is the higher number.",
        "data": {
          "left": {
            "title": "APR",
            "items": [
              "Yearly rate, no compounding",
              "Used to disclose loan costs",
              "12% APR monthly → 12% APR"
            ]
          },
          "right": {
            "title": "APY",
            "items": [
              "Includes compounding",
              "Used to advertise savings",
              "12% APR monthly → about 12.68% APY"
            ]
          }
        }
      },
      {
        "dur": 10, audio: 'media/v-fi-tvm-9.m4a',
        "kind": "bullets",
        "caption": "More time or a higher rate means more future value. A higher discount rate means less present value.",
        "data": {
          "heading": "Direction rules",
          "items": [
            "More time → higher future value",
            "Higher rate → higher future value",
            "Higher discount rate → lower present value",
            "More frequent compounding → higher APY"
          ]
        }
      },
      {
        "dur": 10, audio: 'media/v-fi-tvm-10.m4a',
        "kind": "bullets",
        "caption": "Bottom line. Start early, let compounding do the work, and compare offers using the same kind of rate.",
        "data": {
          "heading": "Recap",
          "items": [
            "A dollar today is worth more than a dollar later",
            "Compound interest grows on itself",
            "Present value works backward",
            "Rule of 72 estimates doubling time"
          ]
        }
      }
    ]
  },
  {
    id: 'v-fi-statements', area: 'FI', title: 'The three financial statements, decoded', lesson: 'fi-statements',
    scenes: [
      { dur: 7, kind: 'title', caption: "A company can show a profit and still go broke. Three statements explain how.", data: { title: 'Three statements, one story', subtitle: 'Income, balance sheet, cash flow' } },
      { dur: 9, kind: 'bullets', caption: "Each statement answers one question. Did we profit? What do we own and owe? Where did the cash go?", data: { heading: 'One question each', items: ['Income statement: did we profit?', 'Balance sheet: what we own and owe', 'Cash flow: where did cash go?'] } },
      { dur: 9, kind: 'diagram', caption: "The income statement runs top to bottom. Revenue minus product costs, then expenses, interest and taxes. What's left is net income.", data: { nodes: [{ id: 'rev', label: 'Revenue' }, { id: 'gp', label: 'Gross profit' }, { id: 'oi', label: 'Operating income' }, { id: 'ni', label: 'Net income' }], edges: [['rev', 'gp', 'minus COGS'], ['gp', 'oi', 'minus operating expenses'], ['oi', 'ni', 'minus interest and taxes']] } },
      { dur: 9, kind: 'chart', caption: "Take a bike shop. Five hundred thousand dollars in sales. Three hundred thousand in product costs. Net income? Just forty thousand.", data: { type: 'bar', title: 'Lakeside Bikes income statement', labels: ['Revenue', 'COGS', 'Gross profit', 'Operating expenses', 'Net income'], values: [500000, 300000, 200000, 140000, 40000], unit: '$' } },
      { dur: 7, kind: 'formula', caption: "The balance sheet is a snapshot of one date. Assets always equal liabilities plus equity.", data: { label: 'The accounting equation', tokens: ['Assets', '=', 'Liabilities', '+', 'Equity'], result: '$400,000 = $160,000 + $240,000' } },
      { dur: 8, kind: 'diagram', caption: "Cash flow has three buckets. Operating is daily business. Investing is equipment. Financing is loans, stock, and dividends.", data: { nodes: [{ id: 'op', label: 'Operating' }, { id: 'inv', label: 'Investing' }, { id: 'fin', label: 'Financing' }, { id: 'cash', label: 'Change in cash' }], edges: [['op', 'cash', 'daily business'], ['inv', 'cash', 'long-term assets'], ['fin', 'cash', 'loans, stock, dividends']] } },
      { dur: 9, kind: 'compare', caption: "Exam trap. Profit is not cash. Depreciation cuts profit but spends no cash, and unpaid sales still count as revenue.", data: { left: { title: 'Profit', items: ['Revenue when earned', 'Includes non-cash expenses'] }, right: { title: 'Cash', items: ['Money actually received and paid', 'Hit by slow-paying customers'] } } },
      { dur: 9, kind: 'bullets', caption: "Recap. Income statement, a period. Balance sheet, one date. Cash flow, operating, investing, financing. Dividends are never an expense.", data: { heading: 'Recap', items: ['Income statement: a period', 'Balance sheet: one date', 'Cash flow: three buckets', 'Dividends are not an expense'] } }
    ]
  },
  {
    id: 'v-fi-ratios', area: 'FI', title: 'Financial ratios in plain English', lesson: 'fi-statements',
    scenes: [
      { dur: 7, kind: 'title', caption: "Ratios turn a pile of numbers into a company's report card. Here's the cheat sheet.", data: { title: 'Financial ratios', subtitle: 'Liquidity, leverage, profitability' } },
      { dur: 9, kind: 'bullets', caption: "Three families. Liquidity asks, can it pay its bills? Leverage asks, how much debt? Profitability asks, how much does it earn?", data: { heading: 'Ratio families', items: ['Liquidity: can it pay bills?', 'Leverage: how much debt?', 'Profitability: how much earned?'] } },
      { dur: 8, kind: 'formula', caption: "Current ratio is current assets divided by current liabilities. A hundred twenty thousand over sixty thousand is two.", data: { label: 'Liquidity', tokens: ['Current ratio', '=', 'Current assets', '÷', 'Current liabilities'], result: '= $120,000 ÷ $60,000 = 2.0' } },
      { dur: 10, kind: 'formula', caption: "Debt to equity is liabilities divided by equity. One hundred sixty thousand over two hundred forty thousand is about point six seven.", data: { label: 'Leverage', tokens: ['Debt-to-equity', '=', 'Total liabilities', '÷', 'Total equity'], result: '= $160,000 ÷ $240,000 ≈ 0.67' } },
      { dur: 10, kind: 'chart', caption: "Now profitability. Gross margin, forty percent. Net margin, eight percent. Return on assets, ten percent. Return on equity, about sixteen point seven.", data: { type: 'bar', title: 'Lakeside Bikes profitability', labels: ['Gross margin', 'Net margin', 'ROA', 'ROE'], values: [40, 8, 10, 16.7], unit: '%' } },
      { dur: 10, kind: 'compare', caption: "Exam trap. Return on assets uses total assets. Return on equity uses owners' equity. With debt in play, equity return is higher.", data: { left: { title: 'Return on assets', items: ['Net income ÷ total assets', 'Lakeside: 10%'] }, right: { title: 'Return on equity', items: ["Net income ÷ owners' equity", 'Lakeside: about 16.7%'] } } },
      { dur: 7, kind: 'example', caption: "Quick test. Ninety thousand in current assets, forty five thousand in current liabilities. Current ratio? Two.", data: { prompt: 'Current assets $90,000; current liabilities $45,000', steps: ['Current assets ÷ current liabilities', '$90,000 ÷ $45,000'], answer: 'Current ratio = 2.0' } },
      { dur: 9, kind: 'bullets', caption: "Recap. Current ratio for liquidity. Debt to equity for leverage. Margins and returns for profit. Always ask, compared with what?", data: { heading: 'Recap', items: ['Current ratio: liquidity', 'Debt-to-equity: leverage', 'Margins and returns: profit', 'Compare over time and to rivals'] } }
    ]
  },
  {
    id: 'v-fi-credit', area: 'FI', title: 'Credit scores, decoded', lesson: 'fi-credit',
    scenes: [
      { dur: 7, kind: 'title', caption: "One number decides your car loan, your apartment, even some jobs. Your credit score.", data: { title: 'Credit scores, decoded', subtitle: 'Costs, scores and smart habits' } },
      { dur: 9, kind: 'compare', caption: "Installment credit is a fixed loan, like a car loan. Revolving credit is a reusable limit, like a credit card.", data: { left: { title: 'Installment credit', items: ['Fixed amount borrowed', 'Equal payments', 'Car loans, mortgages'] }, right: { title: 'Revolving credit', items: ['Reusable credit limit', 'Payments vary', 'Credit cards'] } } },
      { dur: 10, kind: 'example', caption: "A card at eighteen percent A P R charges one point five percent a month. On fifteen hundred dollars, that's twenty two fifty.", data: { prompt: '$1,500 balance at 18% APR', steps: ['Monthly rate: 18% ÷ 12 = 1.5%', '$1,500 × 0.015 = $22.50'], answer: 'About $22.50 in one month' } },
      { dur: 10, kind: 'bullets', caption: "Truth in Lending makes lenders show two numbers. A P R is the yearly cost. The finance charge is the total dollar cost.", data: { heading: 'Truth in Lending', items: ['APR: yearly cost as a percent', 'Finance charge: total dollar cost', 'Use both to compare offers'] } },
      { dur: 8, kind: 'chart', caption: "Your FICO score runs three hundred to eight fifty. Payment history is thirty five percent. Amounts owed, thirty.", data: { type: 'bar', title: 'What makes up a FICO score', labels: ['Payment history', 'Amounts owed', 'Length of history', 'New credit', 'Credit mix'], values: [35, 30, 15, 10, 10], unit: '%' } },
      { dur: 9, kind: 'formula', caption: "Utilization is balance divided by limit. Fourteen hundred on a two thousand limit is seventy percent. Ouch. Keep it low.", data: { label: 'Credit utilization', tokens: ['Utilization', '=', 'Balance', '÷', 'Credit limit'], result: '$1,400 ÷ $2,000 = 70%' } },
      { dur: 11, kind: 'compare', caption: "Exam trap. Checking your own credit is a soft inquiry and never hurts. Applying for new credit is a hard inquiry and can lower your score.", data: { left: { title: 'Soft inquiry', items: ['Checking your own credit', 'No effect on score'] }, right: { title: 'Hard inquiry', items: ['Applying for a loan or card', 'Can lower score a little'] } } },
      { dur: 10, kind: 'bullets', caption: "Recap. Pay on time, every time. Keep utilization low. Compare A P R and finance charge. Checking your own report is free and safe.", data: { heading: 'Recap', items: ['Pay on time, always', 'Keep utilization low', 'Compare APR and finance charge', 'Own-report checks are safe'] } }
    ]
  },
  {
    id: 'v-fi-budget', area: 'FI', title: 'Budgets and break-even', lesson: 'fi-business-finance',
    scenes: [
      { dur: 6, kind: 'title', caption: "Every dollar needs a job. Here's how budgets and break-even work.", data: { title: 'Budgets and break-even', subtitle: 'Planning money at home and at work' } },
      { dur: 10, kind: 'bullets', caption: "Build a personal budget from take-home pay, not gross pay. Track expenses, split fixed from variable, and make savings a line item.", data: { heading: 'Personal budget basics', items: ['Start with take-home pay', 'Track every expense', 'Separate fixed and variable', 'Make savings a line item'] } },
      { dur: 11, kind: 'chart', caption: "The fifty thirty twenty rule is a guideline. On twenty four hundred dollars, that's twelve hundred for needs, seven twenty for wants, four eighty for savings.", data: { type: 'bar', title: '50/30/20 on $2,400 take-home', labels: ['Needs', 'Wants', 'Savings and debt'], values: [1200, 720, 480], unit: '$' } },
      { dur: 9, kind: 'diagram', caption: "In business, the master budget starts with sales. Sales drive production and expenses, and the cash budget shows when to borrow.", data: { nodes: [{ id: 'sales', label: 'Sales budget' }, { id: 'prod', label: 'Production budget' }, { id: 'exp', label: 'Expense budgets' }, { id: 'cash', label: 'Cash budget' }], edges: [['sales', 'prod', 'drives'], ['prod', 'exp', 'drives'], ['exp', 'cash', 'feeds']] } },
      { dur: 9, kind: 'compare', caption: "Exam trap. Fixed costs, like rent, stay the same in total. Variable costs, like materials, rise with every unit.", data: { left: { title: 'Fixed costs', items: ['Same total at any volume', 'Rent, insurance'] }, right: { title: 'Variable costs', items: ['Total rises with units', 'Materials, commissions'] } } },
      { dur: 10, kind: 'formula', caption: "Break-even equals fixed costs over contribution margin. Price twenty five minus cost ten leaves fifteen. Twelve thousand over fifteen is eight hundred units.", data: { label: 'Break-even point', tokens: ['Break-even units', '=', 'Fixed costs', '÷', '(Price − Variable cost)'], result: '= $12,000 ÷ $15 = 800 units' } },
      { dur: 8, kind: 'chart', caption: "Revenue crosses total cost at eight hundred units. After that, every unit adds fifteen dollars of profit.", data: { type: 'line', title: 'Revenue vs. total cost', xLabel: 'Units sold', yLabel: 'Dollars', series: [{ name: 'Revenue', points: [[0, 0], [200, 5000], [400, 10000], [600, 15000], [800, 20000], [1000, 25000], [1200, 30000]] }, { name: 'Total cost', points: [[0, 12000], [200, 14000], [400, 16000], [600, 18000], [800, 20000], [1000, 22000], [1200, 24000]] }] } },
      { dur: 9, kind: 'bullets', caption: "Recap. Budget from take-home pay. Start business budgets with sales. Variance is actual minus budget. Break-even is fixed costs over margin.", data: { heading: 'Recap', items: ['Personal budgets use take-home pay', 'Master budget starts with sales', 'Variance = actual − budget', 'Break-even = fixed ÷ margin'] } }
    ]
  },
  {
    id: 'v-fi-taxes', area: 'FI', title: 'Where your paycheck goes', lesson: 'fi-income-taxes',
    scenes: [
      { dur: 7, kind: 'title', caption: "Your first paycheck will be smaller than you expect. Here's where the money goes.", data: { title: 'Taxes and your paycheck', subtitle: 'From gross pay to take-home pay' } },
      { dur: 7, kind: 'formula', caption: "Gross pay minus deductions equals net pay. Net pay is what you actually take home.", data: { label: 'From gross to net', tokens: ['Gross pay', '−', 'Deductions', '=', 'Net pay'] } },
      { dur: 9, kind: 'example', caption: "Twenty dollars an hour for forty five hours. Overtime pays time and a half. Gross pay is nine hundred fifty dollars.", data: { prompt: '$20 per hour, 45 hours in one week', steps: ['40 regular hours × $20 = $800', '5 overtime hours × $30 = $150'], answer: 'Gross pay = $950' } },
      { dur: 10, kind: 'chart', caption: "Social Security and Medicare together are called FICA. Employees pay six point two percent plus one point four five percent. Your employer matches it.", data: { type: 'bar', title: 'FICA employee rates', labels: ['Social Security', 'Medicare'], values: [6.2, 1.45], unit: '%' } },
      { dur: 10, kind: 'compare', caption: "Exam trap. You fill out the W four when you're hired, to set withholding. Your employer sends the W two by January thirty first.", data: { left: { title: 'W-4', items: ['Filled out by employee', 'Given when hired', 'Sets withholding'] }, right: { title: 'W-2', items: ['Issued by employer', 'Sent by January 31', 'Reports wages and tax withheld'] } } },
      { dur: 10, kind: 'bullets', caption: "Income tax is progressive. Each rate applies only inside its bracket, so a raise never taxes all your income at a higher rate.", data: { heading: 'Progressive income tax', items: ['Seven brackets, 10% to 37% (2026)', 'Each rate applies within its bracket', 'Effective rate is below top rate'] } },
      { dur: 10, kind: 'compare', caption: "A deduction lowers taxable income, saving two twenty on a thousand at twenty two percent. A credit cuts tax dollar for dollar.", data: { left: { title: 'Deduction', items: ['Lowers taxable income', '$1,000 at 22% saves $220'] }, right: { title: 'Credit', items: ['Lowers tax owed directly', '$1,000 credit saves $1,000'] } } },
      { dur: 9, kind: 'bullets', caption: "Recap. Gross minus deductions is net. FICA is seven point six five percent. The W four sets withholding. Credits beat deductions.", data: { heading: 'Recap', items: ['Gross − deductions = net', 'FICA = 7.65%', 'W-4 sets withholding; W-2 reports', 'Credits beat deductions'] } }
    ]
  }
];
