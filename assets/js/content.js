/* ==========================================================================
   TAO: site content
   ---------------------------------------------------------------------------
   Everything that grows over time lives here: photographs, facilitators,
   development areas, programmes, events, newsletter issues, insights and
   testimonials. Pages render these lists automatically, so adding an item
   below is all it takes to publish it everywhere it belongs.

   HOW TO…
   • Replace a photograph → put new files in assets/img/photos/ and update
     the entry in `photos` (keep the same key and every page updates).
   • Add a programme      → copy one object in `programmes`, give it a new
     unique `id`. Set `featured: true` to show it on the home page.
   • Add an event         → copy the example in `events`, set status
     "upcoming". Past events move to the "Recent workshops" list when their
     status is "past".
   • Add a newsletter issue → add a new object at the TOP of `newsletter`.
     The first issue in the list is treated as the current issue.
   • Add an insight       → create insights/<slug>.html (copy an existing
     article) and add a matching object at the TOP of `insights`.
   • Add a testimonial    → add an object to `testimonials`. Publish only
     verified feedback, with the participant's permission. The section stays
     hidden while the list is empty.
   ========================================================================== */
window.TAO_CONTENT = {

  /* ---- Photographs --------------------------------------------------------
     file: base name in assets/img/photos/ (files are saved as
     <file>-<width>.jpg for each width listed). w/h: pixel size of the
     largest file, used to reserve space and avoid layout shift.          */
  photos: {
    sessionBatna:        { file: "session-batna",        widths: [960, 1600], w: 1600, h: 1200, alt: "Harshadewa Amaratunga explaining a negotiation framework, with a BATNA diagram on the table, as a participant listens during the TAO Negotiation Workshop" },
    didulaPortrait:      { file: "didula-portrait",      widths: [560, 672],  w: 672,  h: 840,  alt: "Didula Weerasekara speaking during a TAO session" },
    didulaPresenting:    { file: "didula-presenting",    widths: [800, 1024], w: 1024, h: 768,  alt: "Didula Weerasekara standing in a TAO training room" },
    didulaSpeaking:      { file: "didula-speaking",      widths: [560, 819],  w: 819,  h: 1024, alt: "Didula Weerasekara in a TAO training room" },
    harshadewaPortrait:  { file: "harshadewa-portrait",  widths: [560, 900],  w: 900,  h: 1125, alt: "Harshadewa Amaratunga preparing session material at the TAO Negotiation Workshop" },
    harshadewaSession:   { file: "harshadewa-session",   widths: [800, 1400], w: 1400, h: 1050, alt: "Harshadewa Amaratunga working at a laptop in front of the TAO Negotiation Workshop banner" },
    together:            { file: "facilitators-together", widths: [560, 900], w: 900,  h: 1125, alt: "Harshadewa Amaratunga and Didula Weerasekara in a table discussion at the TAO Negotiation Workshop" },
    practiceTable:       { file: "practice-table",       widths: [800, 1400], w: 1400, h: 1050, alt: "Participants working through a negotiation exercise around a table" },
    reflectWall:         { file: "reflect-wall",         widths: [800, 1400], w: 1400, h: 1050, alt: "Harshadewa Amaratunga adding reflection notes to a wall of sticky notes" },
    applyNotes:          { file: "apply-notes",          widths: [800, 1400], w: 1400, h: 1050, alt: "Talking through how to put an idea into practice" },
    groupTable:          { file: "group-table",          widths: [800, 1400], w: 1400, h: 1050, alt: "Participants smiling as they review workshop material together" },
    roleplay:            { file: "roleplay-standing",    widths: [800, 1400], w: 1400, h: 1050, alt: "Two participants in a standing role-play conversation" },
    listening:           { file: "participant-listening", widths: [800, 1400], w: 1400, h: 1050, alt: "A participant listening closely during a group discussion" },
    dialogue:            { file: "dialogue",             widths: [560, 900],  w: 900,  h: 1125, alt: "A participant thinking through a response in a one-to-one negotiation exercise" },
    workshopTrio:        { file: "workshop-trio",        widths: [800, 1400], w: 1400, h: 1050, alt: "Three people in discussion during a negotiation simulation" }
  },

  /* ---- Facilitators ------------------------------------------------------- */
  facilitators: [
    {
      id: "didula-weerasekara",
      name: "Didula Weerasekara",
      role: "Communication & Leadership Trainer",
      discipline: "Communication & Leadership",
      photo: "didulaPortrait",
      secondPhoto: "didulaPresenting",
      focus: ["Communication", "Leadership", "Presence", "Influence", "Professional Communication"],
      summary: "Helps professionals turn what they know into how they speak, present and lead, drawing on more than nine years of teaching and training, and a grounding in education and counselling psychology.",
      lead: "Didula works at the point where knowing something becomes saying it well: helping people communicate with clarity, lead with intention and carry themselves with confidence in professional settings.",
      profile: [
        "Over more than nine years of teaching and training, Didula has worked with students, adults and working professionals. The work began in English language education and has grown into communication training, public speaking, leadership development, teacher training, mentoring and curriculum development.",
        "Training in counselling psychology and psychotherapy shapes the approach. Communication difficulties are rarely only a matter of vocabulary or technique; they are also about confidence, attention and how people read one another. Sessions therefore pair clear frameworks with practice, feedback and reflection.",
        "At TAO, Didula leads the communication and leadership strand: presence, professional communication, influence and the everyday conversations through which people lead."
      ],
      credentials: [
        { text: "BA in English Language Teaching" },
        { text: "HND in English / ELT" },
        { text: "Master's in Education Administration, Supervision & Planning (MA / M.Ed)", note: "In progress" },
        { text: "TESOL / TEFL qualification" },
        { text: "Diploma in Counselling Psychology" },
        { text: "Higher Diploma in Psychotherapy" }
      ],
      experience: [
        "9+ years of professional teaching and training",
        "Students, adults and working professionals",
        "English education and communication coaching",
        "Public speaking and presentation skills",
        "Leadership development and mentoring",
        "Teacher training and curriculum development"
      ]
    },
    {
      id: "harshadewa-amaratunga",
      name: "Harshadewa Amaratunga",
      role: "International Negotiation & Access Specialist",
      discipline: "Negotiation & Conflict",
      photo: "harshadewaPortrait",
      secondPhoto: "reflectWall",
      focus: ["Negotiation", "Mediation", "Conflict", "Access Negotiation", "High-Stakes Communication"],
      summary: "Brings the discipline of international and humanitarian access negotiation to professional life: preparation, mediation and conversations where the stakes are real.",
      lead: "Harshadewa brings the discipline of high-stakes negotiation into professional life, from humanitarian access negotiation to mediation, conflict and the difficult conversations every organisation eventually faces.",
      profile: [
        "Harshadewa is an international trainer, certified mediator and access negotiator, with a background in UN and humanitarian access negotiation.",
        "Access negotiation happens under pressure: limited time, unequal power, competing interests and real consequences. Its lessons carry directly into boardrooms, partnerships and teams: how to prepare, how to read the other side, when to hold firm, and how to protect the relationship while doing so.",
        "A Rotary Peace Fellow, Harshadewa holds three master's degrees, including study at the University for Peace. At TAO, Harshadewa leads the negotiation strand: negotiation, mediation, conflict and high-stakes communication."
      ],
      credentials: [
        { text: "International Trainer" },
        { text: "Certified Mediator" },
        { text: "Access Negotiator" },
        { text: "Rotary Peace Fellow" },
        { text: "Three master's degrees, including study at the University for Peace" }
      ],
      experience: [
        "International and humanitarian negotiation",
        "UN / humanitarian access negotiation",
        "Mediation and conflict resolution",
        "Negotiation training for professionals"
      ]
    }
  ],

  /* ---- Core development areas -------------------------------------------- */
  areas: [
    { id: "communication", title: "Communication & Presence",               summary: "Speak, listen and present so that people understand you and trust what they hear." },
    { id: "leadership",    title: "Leadership & Influence",                 summary: "Align people, earn commitment and move decisions forward, with or without formal authority." },
    { id: "negotiation",   title: "Negotiation & Difficult Conversations",  summary: "Prepare properly, hold your position with respect and reach agreements that last." },
    { id: "ei",            title: "Emotional Intelligence",                 summary: "Notice what is happening in yourself and others, and respond with judgement rather than reflex." },
    { id: "teams",         title: "Collaboration & Team Effectiveness",     summary: "Build the habits that let capable individuals work well together." },
    { id: "cultures",      title: "Cross-Cultural Communication",           summary: "Work across languages, cultures and expectations without losing clarity or goodwill." }
  ],

  /* ---- Programmes ---------------------------------------------------------
     audience: "individual" or "organisation"
     area: one of the `areas` ids above
     facilitators: ids from `facilitators`
     format / duration: edit per programme as details are confirmed.       */
  programmes: [
    {
      id: "communicating-with-clarity", audience: "individual", area: "communication", featured: true,
      title: "Communicating with Clarity",
      summary: "Structure your thinking, say it plainly and adapt to the people in front of you in meetings, presentations and everyday work.",
      forWhom: "Professionals who know their subject but want to be clearer, more concise and more persuasive when they speak or write.",
      outcomes: ["Organise a message around what the listener needs", "Speak with more structure and less filler", "Handle questions and interruptions with composure", "Give and receive feedback that is useful"],
      format: "Facilitated workshop, in person or online",
      duration: "Half-day to multi-session; confirmed on enquiry",
      facilitators: ["didula-weerasekara"]
    },
    {
      id: "leading-with-intention", audience: "individual", area: "leadership",
      title: "Leading with Intention",
      summary: "The conversations, decisions and habits through which people actually lead, whatever their title.",
      forWhom: "New and emerging leaders, and experienced managers who want to lead more deliberately.",
      outcomes: ["Set direction and expectations clearly", "Hold one-to-ones and check-ins that build trust", "Delegate with enough context for others to act", "Recognise your default style and when to adapt it"],
      format: "Facilitated workshop, in person or online",
      duration: "Half-day to multi-session; confirmed on enquiry",
      facilitators: ["didula-weerasekara"]
    },
    {
      id: "executive-presence", audience: "individual", area: "communication",
      title: "Executive Presence",
      summary: "How you enter a room, hold attention and remain steady under scrutiny. Presence is a set of behaviours, and behaviours can be practised.",
      forWhom: "Managers, specialists and leaders preparing for larger rooms, senior audiences or more visible roles.",
      outcomes: ["Open and close with authority", "Use voice, pace and pause deliberately", "Stay composed when challenged", "Be concise with senior stakeholders"],
      format: "Facilitated workshop with rehearsal and feedback",
      duration: "Half-day to multi-session; confirmed on enquiry",
      facilitators: ["didula-weerasekara"]
    },
    {
      id: "emotional-intelligence", audience: "individual", area: "ei",
      title: "Emotional Intelligence at Work",
      summary: "Practical self-awareness and self-regulation for professional life: reading situations accurately and choosing your response.",
      forWhom: "Anyone whose work depends on relationships, which is to say almost everyone.",
      outcomes: ["Recognise your triggers and early signs of pressure", "Respond rather than react in tense moments", "Read what others need from a conversation", "Build steadier working relationships"],
      format: "Facilitated workshop, in person or online",
      duration: "Half-day to multi-session; confirmed on enquiry",
      facilitators: ["didula-weerasekara"]
    },
    {
      id: "influence", audience: "individual", area: "leadership",
      title: "Influence without Authority",
      summary: "Move ideas forward when you cannot simply instruct: across teams, with senior stakeholders and with partners.",
      forWhom: "Project leads, specialists, advisers and managers who depend on people outside their line of authority.",
      outcomes: ["Map stakeholders and their interests", "Frame proposals around what others value", "Build credibility before you need it", "Handle resistance without escalating it"],
      format: "Facilitated workshop with case practice",
      duration: "Half-day to multi-session; confirmed on enquiry",
      facilitators: ["didula-weerasekara", "harshadewa-amaratunga"]
    },
    {
      id: "difficult-conversations", audience: "individual", area: "negotiation",
      title: "Difficult Conversations",
      summary: "Prepare for, open and stay steady in the conversations most people postpone: performance, disagreement, bad news and broken trust.",
      forWhom: "Managers, team leads and professionals who need to address problems directly without damaging relationships.",
      outcomes: ["Separate facts, interpretations and feelings", "Open a hard conversation without triggering defence", "Listen for the interests beneath positions", "Agree clear next steps and follow them through"],
      format: "Facilitated workshop with role play and feedback",
      duration: "Half-day to multi-session; confirmed on enquiry",
      facilitators: ["harshadewa-amaratunga", "didula-weerasekara"]
    },
    {
      id: "negotiation", audience: "individual", area: "negotiation", featured: true,
      title: "Negotiation in Practice",
      summary: "Better conversations, stronger outcomes. Preparation, strategy and live negotiation practice drawn from high-stakes international work.",
      forWhom: "Professionals who negotiate with clients, suppliers, partners, colleagues or senior leadership.",
      outcomes: ["Prepare using interests, options and your walk-away (BATNA)", "Create value before dividing it", "Hold your position under pressure while protecting the relationship", "Close with commitments that hold"],
      format: "Experiential workshop with simulations and debriefs",
      duration: "Half-day to multi-session; confirmed on enquiry",
      facilitators: ["harshadewa-amaratunga", "didula-weerasekara"]
    },
    {
      id: "cross-cultural-communication", audience: "individual", area: "cultures",
      title: "Cross-Cultural Communication",
      summary: "Work effectively across cultures, languages and expectations, in international teams, with overseas clients and in multilingual workplaces.",
      forWhom: "Professionals in international roles, global teams, NGOs and organisations working across borders.",
      outcomes: ["Recognise differences in directness, hierarchy and time", "Make expectations explicit without causing offence", "Communicate clearly in English as a shared working language", "Build trust across cultural distance"],
      format: "Facilitated workshop, in person or online",
      duration: "Half-day to multi-session; confirmed on enquiry",
      facilitators: ["harshadewa-amaratunga", "didula-weerasekara"]
    },

    {
      id: "leadership-development", audience: "organisation", area: "leadership", featured: true,
      title: "Leadership Development",
      summary: "A programme for emerging and established leaders, built around the real situations your organisation's leaders face.",
      forWhom: "Leadership teams, high-potential staff and newly promoted managers.",
      outcomes: ["A shared language for leadership across the organisation", "Stronger one-to-ones, feedback and delegation", "Leaders who can hold difficult conversations early", "Specific commitments applied back at work"],
      format: "Designed with you: on-site, off-site or online",
      duration: "Scoped to your objectives",
      facilitators: ["didula-weerasekara", "harshadewa-amaratunga"]
    },
    {
      id: "team-effectiveness", audience: "organisation", area: "teams",
      title: "Team Effectiveness",
      summary: "Facilitated work with an intact team on how it communicates, decides and handles disagreement.",
      forWhom: "Project teams, departments and leadership teams working through change, growth or friction.",
      outcomes: ["Clear agreements on roles, decisions and communication", "Tension surfaced and discussed productively", "Better meetings and handovers", "A team plan the team owns"],
      format: "Facilitated team sessions",
      duration: "Scoped to your objectives",
      facilitators: ["didula-weerasekara", "harshadewa-amaratunga"]
    },
    {
      id: "organisational-communication", audience: "organisation", area: "communication",
      title: "Communication Programmes",
      summary: "Presentation, professional communication and English-for-work programmes shaped around how your people actually communicate.",
      forWhom: "Organisations whose staff present, report, write or communicate with clients and partners, including in English as a working language.",
      outcomes: ["Clearer presentations and reports", "More confident spoken communication", "Consistent standards across teams", "Practice grounded in your own material"],
      format: "Designed with you: on-site, off-site or online",
      duration: "Scoped to your objectives",
      facilitators: ["didula-weerasekara"]
    },
    {
      id: "negotiation-training", audience: "organisation", area: "negotiation",
      title: "Negotiation Training",
      summary: "Negotiation capability for teams who deal with clients, suppliers, partners or stakeholders, built around your own cases.",
      forWhom: "Commercial, procurement, partnership, programme and management teams.",
      outcomes: ["A common preparation method across the team", "Practice on realistic scenarios from your context", "Better outcomes without damaged relationships", "Debriefs that turn experience into learning"],
      format: "Experiential programme with simulations",
      duration: "Scoped to your objectives",
      facilitators: ["harshadewa-amaratunga"]
    },
    {
      id: "conflict-management", audience: "organisation", area: "negotiation",
      title: "Conflict Management",
      summary: "Skills and structures for handling conflict early, drawing on mediation practice.",
      forWhom: "Managers, HR teams and leaders responsible for working relationships.",
      outcomes: ["Recognise conflict before it escalates", "Facilitate conversations between parties", "Use mediation principles in everyday management", "Agree outcomes and follow-through"],
      format: "Facilitated workshop with practice",
      duration: "Scoped to your objectives",
      facilitators: ["harshadewa-amaratunga"]
    },
    {
      id: "custom-workshops", audience: "organisation", area: "teams",
      title: "Custom Workshops",
      summary: "A workshop designed around one specific challenge your team is working through.",
      forWhom: "Any team or organisation with a clear development need and a practical goal.",
      outcomes: ["A short diagnostic conversation before design", "Content built on your context and cases", "Practical tools participants can use immediately", "A brief summary of themes and recommendations"],
      format: "Designed with you",
      duration: "Scoped to your objectives",
      facilitators: ["didula-weerasekara", "harshadewa-amaratunga"]
    },
    {
      id: "facilitated-learning", audience: "organisation", area: "teams",
      title: "Facilitated Organisational Learning",
      summary: "Independent facilitation for retreats, strategy conversations, reflection sessions and learning events.",
      forWhom: "Leadership teams, professional associations, universities, NGOs and development organisations.",
      outcomes: ["Structured, balanced conversations", "Every voice heard, including quieter ones", "Clear decisions and owners", "A record of what was agreed"],
      format: "Facilitated sessions",
      duration: "Scoped to your objectives",
      facilitators: ["harshadewa-amaratunga", "didula-weerasekara"]
    }
  ],

  /* ---- Events ---------------------------------------------------------------
     status: "upcoming" or "past"
     date:   ISO date "YYYY-MM-DD" when confirmed (used for sorting). Leave ""
             if unknown: `dateLabel` is then shown instead (or omitted).
     cta:    { label, href }: registration link or enquiry link.

     Example of an upcoming event (copy, uncomment and edit):
     {
       id: "negotiation-2026-11", status: "upcoming",
       title: "Negotiation Workshop", subtitle: "Better conversations. Stronger outcomes.",
       date: "2026-11-15", dateLabel: "15 November 2026", time: "9:00 to 16:00",
       venue: "Venue name, City", facilitators: ["harshadewa-amaratunga", "didula-weerasekara"],
       description: "…", experience: ["…", "…"], photo: "practiceTable",
       cta: { label: "Register", href: "contact.html?type=workshop&topic=Negotiation%20Workshop#enquiry" }
     },
  ------------------------------------------------------------------------- */
  events: [
    {
      id: "negotiation-workshop-2026", status: "past",
      title: "Negotiation Workshop",
      subtitle: "Better conversations. Stronger outcomes.",
      programmeLabel: "Negotiation, Communication & Leadership: Professional Development Workshop",
      date: "", dateLabel: "", time: "", venue: "",
      facilitators: ["harshadewa-amaratunga", "didula-weerasekara"],
      description: "TAO's negotiation workshop brought professionals together to prepare, practise and debrief real negotiation scenarios, pairing international negotiation practice with the communication and leadership skills that make agreements hold.",
      experience: [
        "Preparation frameworks, including mapping interests and each side's BATNA",
        "One-to-one and small-group negotiation simulations",
        "Facilitated debriefs after every round",
        "Written reflection on what to apply at work",
        "Certificate of participation"
      ],
      photo: "dialogue",
      gallery: ["sessionBatna", "together", "practiceTable", "reflectWall", "groupTable"],
      cta: { label: "Register interest in the next date", href: "contact.html?type=workshop&topic=Negotiation%20in%20Practice#enquiry" }
    }
  ],

  /* ---- Newsletter -----------------------------------------------------------
     The FIRST issue in this list is the current issue. Add new issues at the
     top. Any section left empty is simply not shown.

     NOTE: Issue 01 below is drafted from the workshop and site launch. Replace
     its text with the official September newsletter copy when ready.       */
  newsletter: [
    {
      id: "2026-09",
      number: "01",
      month: "September 2026",
      title: "Better conversations, stronger outcomes",
      intro: "Welcome to the first TAO Newsletter. Each issue brings together what we are learning in the room, what is coming next and a few ideas worth practising before then.",
      cover: "workshopTrio",
      featured: {
        title: "Inside the TAO Negotiation Workshop",
        body: [
          "Most negotiation training begins with tactics. Ours began with preparation. Before anyone sat down opposite a counterpart, participants mapped what they actually needed, what the other side was likely to need, and what they would do if no agreement was reached: their BATNA.",
          "Then came practice. Participants negotiated in pairs and small groups, with Harshadewa Amaratunga and Didula Weerasekara stepping in to debrief each round: what moved the conversation, what stalled it, and what each person would do differently next time.",
          "The session closed with reflection. Each participant wrote down the specific behaviours they would take back to work, and certificates of participation were presented to mark the day. It is a pattern we will keep: learn, practise, reflect, apply."
        ],
        photo: "sessionBatna"
      },
      articles: ["know-your-walk-away", "presence-is-attention", "listening-is-leadership"],
      workshops: [
        { title: "Next public workshop dates", text: "Dates for the next public workshops are being finalised. Register your interest and you will hear first.", href: "events.html", label: "View events" },
        { title: "Workshops for your team", text: "Every TAO programme can be delivered privately for an organisation, built around your own cases.", href: "organisations.html", label: "For organisations" }
      ],
      news: [
        { title: "A new home for TAO", text: "TAO now has a home online, bringing together our programmes, facilitators, events and this newsletter in one place." },
        { title: "The TAO Newsletter begins", text: "This newsletter will carry workshop updates, TAO news, notes from our facilitators and short, practical ideas." }
      ],
      facilitatorNotes: [],
      upcoming: ["negotiation", "difficult-conversations", "communicating-with-clarity", "executive-presence"]
    }
  ],

  /* ---- Insights (evergreen articles) -------------------------------------- */
  insights: [
    { slug: "know-your-walk-away", title: "Know your walk-away before you walk in", category: "Negotiation", date: "September 2026", readTime: "5 min read", photo: "harshadewaSession",
      summary: "Most negotiations are won or lost before anyone speaks. Preparation starts with knowing what you will do if there is no deal." },
    { slug: "presence-is-attention", title: "Presence is attention, not volume", category: "Communication", date: "September 2026", readTime: "4 min read", photo: "didulaPresenting",
      summary: "Executive presence is less about charisma than discipline: knowing your point, steadying yourself and giving people your full attention." },
    { slug: "listening-is-leadership", title: "Listening is a leadership skill", category: "Leadership", date: "September 2026", readTime: "4 min read", photo: "listening",
      summary: "We train people to speak, present and persuade. We rarely train them to listen, yet understanding the situation best is a decisive advantage." },
    { slug: "working-across-cultures", title: "Working across cultures: five practical habits", category: "Global Teams", date: "September 2026", readTime: "5 min read", photo: "groupTable",
      summary: "Most misunderstandings in international teams are not about language. They are about assumptions." }
  ],

  /* ---- Testimonials ---------------------------------------------------------
     Verified participant feedback only, published with permission.
     { quote: "…", name: "Full name", role: "Role, Organisation", programme: "Negotiation Workshop" }
  ------------------------------------------------------------------------- */
  testimonials: []
};
