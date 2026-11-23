// Videos for Emotional Intelligence
export default [
  {
    id: 'v-ei-five-components', area: 'EI', title: 'The five parts of emotional intelligence', lesson: 'ei-self-awareness',
    scenes: [
      { dur: 6, kind: 'title', caption: "Being smart isn't enough at work. Emotional intelligence has five parts. Learn them.", data: { title: 'Five parts of emotional intelligence', subtitle: "Goleman's model" } },
      { dur: 7, kind: 'bullets', caption: "Emotional intelligence means recognizing and managing your own emotions, and noticing and influencing other people's.", data: { heading: 'What is emotional intelligence?', items: ['Recognize your own emotions', 'Manage your behavior', 'Notice how others feel', 'Work well with people'] } },
      { dur: 9, kind: 'diagram', caption: "Daniel Goleman named five parts. Self awareness, self regulation, and motivation are personal skills. Empathy and social skills are social.", data: { nodes: [{ id: 'self', label: 'Self-awareness' }, { id: 'reg', label: 'Self-regulation' }, { id: 'mot', label: 'Motivation' }, { id: 'emp', label: 'Empathy' }, { id: 'soc', label: 'Social skills' }], edges: [['self', 'reg', 'leads to'], ['reg', 'mot', 'supports'], ['mot', 'emp', 'then'], ['emp', 'soc', 'builds']] } },
      { dur: 9, kind: 'bullets', caption: "Self awareness is knowing what you feel and how it affects others. Self regulation is pausing and choosing a calm response.", data: { heading: 'Personal skills', items: ['Self-awareness: know your emotions', 'Self-regulation: pause, stay calm', 'Own your mistakes'] } },
      { dur: 9, kind: 'bullets', caption: "Motivation is inner drive that survives setbacks. Empathy is understanding how others feel. Social skills build teamwork and trust.", data: { heading: 'Drive and people skills', items: ['Motivation: inner drive, optimism', 'Empathy: listen, notice feelings', 'Social skills: teamwork, influence'] } },
      { dur: 8, kind: 'compare', caption: "Exam trap. Self awareness, self regulation, and motivation are personal competence. Empathy and social skills are social competence.", data: { left: { title: 'Personal skills', items: ['Self-awareness', 'Self-regulation', 'Motivation'] }, right: { title: 'Social skills', items: ['Empathy', 'Social skills'] } } },
      { dur: 10, kind: 'example', caption: "A customer shouts about a fee. The teller stays calm, notices the frustration, and solves it clearly. That's regulation, empathy, and social skills.", data: { prompt: 'A teller stays calm, listens, says "I understand this is frustrating," then fixes the problem.', steps: ['Staying calm: self-regulation', 'Noticing frustration: empathy', 'Clear words and a fix: social skills'], answer: 'Self-regulation, empathy and social skills' } },
      { dur: 7, kind: 'bullets', caption: "Remember A R M E S. Awareness, regulation, motivation, empathy, social skills. Trust builds careers.", data: { heading: 'Recap', items: ['Self-awareness, self-regulation', 'Motivation', 'Empathy', 'Social skills'] } }
    ]
  },
  {
    id: 'v-ei-conflict-change', area: 'EI', title: 'Handling conflict and change', lesson: 'ei-conflict',
    scenes: [
      { dur: 6, kind: 'title', caption: "Conflict at work isn't the problem. How you handle it is.", data: { title: 'Handling conflict and change', subtitle: 'Skills for the workplace' } },
      { dur: 7, kind: 'compare', caption: "Win lose focuses on positions and hurts relationships. Win win focuses on interests and builds trust.", data: { left: { title: 'Win-lose', items: ['Competing', 'Focus on positions', 'Hurts relationships'] }, right: { title: 'Win-win', items: ['Collaborating', 'Focus on interests', 'Builds trust'] } } },
      { dur: 8, kind: 'bullets', caption: "Five styles. Competing, accommodating, avoiding, compromising, collaborating. Collaborating is best when the issue and the relationship both matter.", data: { heading: 'Five conflict styles', items: ['Competing, accommodating', 'Avoiding, compromising', 'Collaborating: best for big issues'] } },
      { dur: 7, kind: 'diagram', caption: "Resolve conflict in steps. Stay calm, listen, define the real problem, then agree on a solution.", data: { nodes: [{ id: 'calm', label: 'Stay calm' }, { id: 'listen', label: 'Listen' }, { id: 'define', label: 'Define problem' }, { id: 'solve', label: 'Agree on solution' }], edges: [['calm', 'listen', 'then'], ['listen', 'define', 'then'], ['define', 'solve', 'then']] } },
      { dur: 10, kind: 'example', caption: "Sales and loan processing blame each other for slow approvals. Map the process, find the real delay, and set one shared goal.", data: { prompt: 'Two departments blame each other for delays.', steps: ['Bring both groups together', 'Map the process, find the delay', 'Set one shared goal'], answer: 'Focus on the problem, not blame.' } },
      { dur: 8, kind: 'bullets', caption: "People resist change because it feels uncertain. Leaders explain why, share a vision, involve people, and train them.", data: { heading: 'Leading change', items: ['Explain the reason', 'Share a vision', 'Involve people', 'Train and support'] } },
      { dur: 7, kind: 'compare', caption: "Resisting means complaining and avoiding new tools. Adapting means asking questions and attending training.", data: { left: { title: 'Resisting', items: ['Complaining', 'Avoiding new tools'] }, right: { title: 'Adapting', items: ['Asking questions', 'Attending training'] } } },
      { dur: 7, kind: 'bullets', caption: "Recap. Conflict is normal. Collaborate for win win. Focus on the problem, not the person.", data: { heading: 'Recap', items: ['Conflict is normal', 'Collaborate for win-win', 'Explain the why of change', 'Stay calm and respectful'] } }
    ]
  }
];
