// Videos for Operations
export default [
  {
    id: 'v-ops-pm', area: 'OP', title: 'Project management basics', lesson: 'op-pm-basics',
    scenes: [
      { dur: 6, kind: 'title', caption: "Every project is a balancing act. Change one thing, and everything shifts.", data: { title: 'Project management basics', subtitle: 'Plan it, track it, finish it' } },
      { dur: 7, kind: 'compare', caption: "A project is temporary and creates something unique. Ongoing operations repeat day after day.", data: { left: { title: 'Project', items: ['Temporary: start and end', 'Unique result', 'Example: launch an app feature'] }, right: { title: 'Ongoing operations', items: ['Repeats continuously', 'Same routine tasks', 'Example: process daily deposits'] } } },
      { dur: 8, kind: 'bullets', caption: "The triple constraint is scope, time, and cost. They're linked, so changing one usually changes the others.", data: { heading: 'The triple constraint', items: ['Scope: what must be done', 'Time: the schedule', 'Cost: the budget', 'Quality sits in the middle'] } },
      { dur: 5, kind: 'diagram', caption: "The life cycle runs initiate, plan, execute, monitor, close.", data: { nodes: [{ id: 'i', label: 'Initiate' }, { id: 'p', label: 'Plan' }, { id: 'e', label: 'Execute' }, { id: 'm', label: 'Monitor' }, { id: 'c', label: 'Close' }], edges: [['i', 'p', 'approve'], ['p', 'e', 'start work'], ['e', 'm', 'track'], ['m', 'c', 'deliver']] } },
      { dur: 7, kind: 'formula', caption: "The critical path is the longest chain of dependent tasks. It sets the earliest finish date.", data: { label: 'Critical path idea', tokens: ['Task A', 'then', 'Task B', 'then', 'Task C'], result: '= shortest possible project length' } },
      { dur: 7, kind: 'chart', caption: "Actual progress lags the plan from week two. Spot that early, and take corrective action.", data: { type: 'line', title: 'Percent complete', xLabel: 'Week', yLabel: 'Percent', series: [{ name: 'Planned', points: [[1, 10], [2, 25], [3, 45], [4, 65], [5, 85], [6, 100]] }, { name: 'Actual', points: [[1, 10], [2, 20], [3, 35], [4, 55], [5, 80], [6, 100]] }] } },
      { dur: 7, kind: 'compare', caption: "Exam trap. Monitoring happens during the project. Evaluating judges the results at the end.", data: { left: { title: 'Monitoring', items: ['During the project', 'Compare to the plan', 'Take corrective action'] }, right: { title: 'Evaluating', items: ['At closing', 'Compare results to goals', 'Record lessons learned'] } } },
      { dur: 7, kind: 'bullets', caption: "Recap. Projects are temporary. Scope, time, cost. Plan, monitor, correct. Close with lessons learned.", data: { heading: 'Recap', items: ['Projects are temporary', 'Triple constraint: scope, time, cost', 'Plan, monitor, correct', 'Close with lessons learned'] } }
    ]
  },
  {
    id: 'v-ops-quality', area: 'OP', title: 'Quality and process improvement', lesson: 'op-quality',
    scenes: [
      { dur: 6, kind: 'title', caption: "Defects cost businesses money. Here's how to catch them, and stop them.", data: { title: 'Quality and improvement', subtitle: 'Catch it, prevent it, improve it' } },
      { dur: 6, kind: 'compare', caption: "Exam trap. Quality control finds defects. Quality assurance builds processes that prevent them.", data: { left: { title: 'Quality control', items: ['Inspect and test', 'Find defects', 'Fix problems'] }, right: { title: 'Quality assurance', items: ['Design good processes', 'Prevent defects', 'Set standards, train'] } } },
      { dur: 6, kind: 'formula', caption: "Defect rate is defective items divided by total items, times one hundred.", data: { label: 'Defect rate', tokens: ['Defective items', '÷', 'Total items', '×', '100'], result: '= Defect rate in percent' } },
      { dur: 8, kind: 'example', caption: "A batch has four hundred items and eight are defective. Eight over four hundred is two percent.", data: { prompt: 'What is the defect rate?', steps: ['Defective items: 8', 'Total items: 400', '8 ÷ 400 = 0.02', 'Multiply by 100'], answer: '2 percent' } },
      { dur: 10, kind: 'diagram', caption: "The P D C A cycle drives improvement. Plan a change, do it small, check results, then act to make it standard.", data: { nodes: [{ id: 'p', label: 'Plan' }, { id: 'd', label: 'Do' }, { id: 'c', label: 'Check' }, { id: 'a', label: 'Act' }], edges: [['p', 'd', 'try it'], ['d', 'c', 'measure'], ['c', 'a', 'decide'], ['a', 'p', 'repeat']] } },
      { dur: 10, kind: 'chart', caption: "A Pareto chart shows a few causes create most problems. Here, wrong size and scratches cause seventy five percent. Fix the biggest first.", data: { type: 'bar', title: 'Defects by cause', labels: ['Wrong size', 'Scratches', 'Missing part', 'Other'], values: [45, 30, 15, 10], unit: '%' } },
      { dur: 9, kind: 'bullets', caption: "A supplier sends bad goods? Document it, isolate the goods, contact the supplier, request a fix, and find the root cause.", data: { heading: 'Supplier quality problems', items: ['Document the issue', 'Isolate bad goods', 'Contact supplier, request a fix', 'Find the root cause'] } },
      { dur: 8, kind: 'bullets', caption: "Recap. Control finds defects. Assurance prevents them. P D C A keeps improving. Quality is everyone's job.", data: { heading: 'Recap', items: ['QC finds defects', 'QA prevents defects', 'PDCA repeats the loop', "Quality is everyone's job"] } }
    ]
  }
];
