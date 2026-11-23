// Videos for Customer Relations and Communications
export default [
  {
    id: 'v-crco-communication', area: 'CO', title: 'Communication and active listening', lesson: 'co-listening',
    scenes: [
      { dur: 5, kind: 'title', caption: "Most people hear. Few actually listen. Here's the difference.", data: { title: 'Communication and active listening', subtitle: 'Getting the message across' } },
      { dur: 7, kind: 'diagram', caption: "Communication needs a sender, a message, a channel, and a receiver. Then comes feedback.", data: { nodes: [{ id: 's', label: 'Sender' }, { id: 'm', label: 'Message' }, { id: 'c', label: 'Channel' }, { id: 'r', label: 'Receiver' }], edges: [['s', 'm', 'encodes'], ['m', 'c', 'sent by'], ['c', 'r', 'reaches']] } },
      { dur: 7, kind: 'bullets', caption: "Noise blocks messages. It can be a loud room, a buzzing phone, or a worried mind.", data: { heading: 'What is noise?', items: ['Physical: loud rooms, bad connections', 'Mental: worry, daydreaming', 'Language: jargon and slang', 'Fix: reduce distractions'] } },
      { dur: 7, kind: 'compare', caption: "Exam trap. Hearing is automatic. Active listening takes effort. You concentrate, understand, respond, and remember.", data: { left: { title: 'Hearing', items: ['Sound reaches your ears', 'Automatic', 'No response needed'] }, right: { title: 'Active listening', items: ['Full attention', 'A skill you practice', 'Feedback and follow-up'] } } },
      { dur: 9, kind: 'bullets', caption: "Paraphrasing means restating what you heard in your own words. It proves you understood and lets the speaker correct mistakes.", data: { heading: 'Paraphrase to confirm', items: ['"So you are saying..."', 'Use your own words', 'Invite correction'] } },
      { dur: 10, kind: 'example', caption: "A client says she's nervous about investing after a loss. Reflect her concern, then ask what happened. You learn her true risk comfort.", data: { prompt: 'A client says: "I lost money once, and I am nervous."', steps: ['Show interest with eye contact', 'Reflect: "The loss still worries you."', 'Ask an open question: "What happened?"'], answer: "The adviser learns the client's true risk comfort." } },
      { dur: 7, kind: 'compare', caption: "Open ended questions invite detail. Closed questions give short answers, and they're good for confirming facts.", data: { left: { title: 'Open-ended', items: ['What are your goals?', 'Invites detail'] }, right: { title: 'Closed-ended', items: ['Is your address correct?', 'Yes or no answers'] } } },
      { dur: 7, kind: 'bullets', caption: "Recap. Messages need a receiver and feedback. Listen actively. Ask open questions. Confirm what you heard.", data: { heading: 'Recap', items: ['Message needs receiver and feedback', 'Listen actively', 'Ask open-ended questions', 'Confirm understanding'] } }
    ]
  },
  {
    id: 'v-crco-complaints', area: 'CR', title: 'Handling complaints like a pro', lesson: 'cr-problems',
    scenes: [
      { dur: 6, kind: 'title', caption: "A complaint can keep a customer for life, if you handle it well.", data: { title: 'Handling complaints', subtitle: 'Client relationships in financial services' } },
      { dur: 7, kind: 'bullets', caption: "Finance runs on trust. Clients share private details and depend on you for honest, accurate help.", data: { heading: 'Why trust matters', items: ['Clients share private details', 'Mistakes cost real money', 'Reputation spreads fast', 'Retention beats finding new clients'] } },
      { dur: 4, kind: 'diagram', caption: "Four steps. Listen, empathize, act, and follow up.", data: { nodes: [{ id: 'l', label: 'Listen' }, { id: 'e', label: 'Empathize' }, { id: 'a', label: 'Act' }, { id: 'f', label: 'Follow up' }], edges: [['l', 'e', 'then'], ['e', 'a', 'then'], ['a', 'f', 'then']] } },
      { dur: 8, kind: 'bullets', caption: "Exam trap. Apologizing for the experience is good service. It is not an admission of legal fault.", data: { heading: 'Step 2: Empathize', items: ['"I understand why this is frustrating."', 'Apologize for the experience', 'Stay calm, never argue'] } },
      { dur: 10, kind: 'example', caption: "A client is charged an unexpected fee. The banker listens, explains the fee, asks a supervisor about a refund, then calls back.", data: { prompt: 'A client is upset about an unexpected fee.', steps: ['Listen and take notes', 'Empathize and explain the fee', 'Ask a supervisor about a refund', 'Call back and document'], answer: 'Problem solved, trust kept.' } },
      { dur: 5, kind: 'compare', caption: "Defensive replies make people angrier. Calm, helpful replies build loyalty.", data: { left: { title: 'Poor response', items: ['Argues or blames', 'Quotes policy only', 'No follow up'] }, right: { title: 'Strong response', items: ['Listens first', 'Offers options', 'Follows up and documents'] } } },
      { dur: 11, kind: 'bullets', caption: "In finance, verify identity first and protect privacy. And never discourage a client from contacting a regulator like the C F P B or FINRA.", data: { heading: 'Finance rules', items: ['Verify identity first', 'Protect privacy', 'Document the complaint', 'Respect regulator channels'] } },
      { dur: 6, kind: 'bullets', caption: "Recap. Listen, empathize, act, follow up. Be honest and keep good records.", data: { heading: 'Recap', items: ['Listen', 'Empathize', 'Act or escalate', 'Follow up and document'] } }
    ]
  }
];
