// Content source for the whole site. Every fact here comes from the client brief, the client's catalogs
// (content/flyers/*.pdf) or the old sygnetconnect.io site. Nothing is invented: where the client has not
// supplied something (specs, photos, counts) the page shows one marked placeholder instead.

export const SITE = {
  brand: 'Sygnet IoT',
  platform: 'Sygnet IoT Connect',
  legal: 'Sygnet IoT Pvt. Ltd.',
  formerly: 'Resonent TechnoLabs Pvt. Ltd.',
  line: 'Operational Intelligence for Connected Enterprises',   // Sygnet Profile, cover
  subline: 'From Sensors to Insights. From Data to Decisions.',  // Sygnet Profile, cover
  phone: '+91 95749 60077',
  tel: '+919574960077',
  whatsapp: 'https://wa.me/919574960077',   // the same number, for the floating chat button and the custom-build CTA
  email: 'sales@sygnetconnect.io',
  city: 'Surat, Gujarat, India',   // short form: page descriptions, the Company page, the legal pages
  // full office address (client, 2026-11-20): the footer, the Contact page and the Organization schema
  address: ['Building No. 1, Ground Floor, Navarang Industrial Society', 'Udhana–Magdalla Road, near Sosyo Circle', 'Surat, Gujarat 395002, India'],
  street: 'Building No. 1, Ground Floor, Navarang Industrial Society, Udhana–Magdalla Road, near Sosyo Circle',
  postcode: '395002',
  social: [['facebook', 'Facebook', 'https://www.facebook.com/sygnetiotconnect/'], ['instagram', 'Instagram', 'https://www.instagram.com/sygnetiotconnect/']],
  domain: 'https://sygnetconnect.io',
  year: 2026,
  credit: 'Designed & developed by Vrattiks',
};

// ---------------------------------------------------------------- catalog images (build/catalog, crop_catalog.py)
// alt text, and render: true where the picture is an AI-looking render (it carries a "Product render" tag)
export const CATALOG = {
  'ncs-station-display': { alt: 'Sygnet NCS-Plus nurse station display unit with room call lamps', render: true },
  'ncs-pendant-switch': { alt: 'Sygnet hand-held pendant bed switch on a coiled cable', render: false },
  'ncs-lcd-display': { alt: 'Sygnet NCS-Professional LCD multi-service nursing display unit', render: true },
  'ncs-bedside-pendant': { alt: 'Sygnet bedside pendant on a coiled cable', render: false },
  'ncs-code-blue-switch': { alt: 'Sygnet Code Blue wall switch', render: true },
  'ncs-nurse-station-unit': { alt: 'Sygnet NCS-Enterprise nurse station display unit', render: true },
  'ncs-patient-tracker': { alt: 'Sygnet patient tracker worn on the wrist', render: false },
  'ncs-staff-tracker': { alt: 'Sygnet staff tracker wristband', render: false },
  'ncs-staff-app': { alt: 'Sygnet staff app on a phone showing a Code Blue call', render: true },
  'bell-tbg': { alt: 'Sygnet TBG automatic bell timer with LCD and keypad', render: true },
  'bell-range-tbg': { alt: 'Sygnet TBG basic bell timer', render: true },
  'bell-range-tba-wl': { alt: 'Sygnet TBA-WL audio bell timer', render: true },
  'bell-range-tba-d': { alt: 'Sygnet TBA-D desktop bell and PA system with built-in speaker', render: true },
  'bell-range-tbw-wl': { alt: 'Sygnet TBW-WL smart Wi-Fi bell system', render: true },
  'bell-range-tbw-d': { alt: 'Sygnet TBW-D touch screen bell and PA system', render: true },
  'bell-speaker': { alt: 'Sygnet addressable classroom speaker', render: true },
  'qms-lite': { alt: 'Sygnet QMS Lite LED token displays and call pad', render: true },
  'qms-kiosk': { alt: 'Sygnet QMS touch kiosk for token generation', render: true },
  'qms-counter-display': { alt: 'Sygnet QMS counter display showing a token number', render: true },
  'qms-family': { alt: 'Sygnet QMS kiosk, operator console, counter display, call pad and LED token displays', render: true },
  'hw-industrial-controller': { alt: 'Sygnet industrial controller with terminal blocks and Ethernet ports', render: true },
  'hw-sensor-nodes': { alt: 'Two Sygnet sensor nodes, round and square housings', render: true },
  'hw-wireless-node': { alt: 'Sygnet wireless node with antenna', render: true },
  'hw-bridge-device': { alt: 'Sygnet bridge device with two antennas', render: true },
  'hw-industrial-gateway': { alt: 'Sygnet industrial gateway with Ethernet and USB ports', render: true },
  'hw-data-logger': { alt: 'Sygnet data logger with a small display', render: true },
  'hw-communication-module': { alt: 'Sygnet communication module board with antenna connector', render: true },
  'hw-edge-computer': { alt: 'Sygnet fanless edge computing device', render: true },
  'water-atm-kiosk': { alt: 'Sygnet community Water ATM kiosk with three dispensing points', render: true },
  'water-centre': { alt: 'Sygnet Rural Water Center building with four taps and a payment panel', render: true },
  'dairy-milk-atm': { alt: 'Sygnet Community Milk ATM kiosk on castor wheels', render: true },
  'dairy-mobile-milk-atm': { alt: 'Sygnet Mobile Milk ATM: a chilled tanker vehicle with two dispensing units', render: true },
  'flyer-napkin-vending': { alt: 'Sygnet napkin vending machine with coin slot, key lock and collection tray', render: true },
  'flyer-smart-milk-vending': { alt: 'Sygnet Smart Milk Vending machine with dispensing window and keypad', render: true },
  'flyer-water-atm-panel': { alt: 'Sygnet Water ATM panel with card reader, coin slot and two tap buttons', render: true },
  // product-card cut-outs on a transparent ground (build/tools/cutout_cards.py); used only by the product cards
  'ncs-station-display-cut': { alt: 'Sygnet NCS-Plus nurse station display unit with room call lamps', render: true },
  'qms-kiosk-cut': { alt: 'Sygnet QMS touch kiosk for token generation, with ticket printer', render: true },
  'bell-tbg-cut': { alt: 'Sygnet TBG automatic bell timer with LCD and keypad', render: true },
  // School Bell & PA model viewer (build/tools/cutout_bell.py, from the catalogue's Sygnet-branded page 1)
  'bell-range-tba-wl-cut': { alt: 'Sygnet TBA-WL audio bell timer with LCD and keypad', render: true },
  'bell-range-tba-d-cut': { alt: 'Sygnet TBA-D desktop bell and PA system with built-in speaker, LCD and keypad', render: true },
  'bell-range-tbw-wl-cut': { alt: 'Sygnet TBW-WL smart Wi-Fi bell system with display, audio and relay lamps', render: true },
  'bell-speaker-cut': { alt: 'Sygnet addressable classroom speaker', render: true },
  'bell-range-tbw-d-cut': { alt: 'Sygnet TBW-D desktop bell and PA system with a touch screen showing the day timetable', render: true },
  // Water ATM page viewer (build/tools/cutout_water.py, p15: Sygnet mark and generic "Save The Water" art only)
  'water-atm-kiosk-cut': { alt: 'Sygnet community Water ATM kiosk: a round white kiosk with a green roof, three dispensing bays and the Sygnet IoT Connect mark', render: true },
  'water-atm-panel-cut': { alt: 'Sygnet Water ATM panel with card reader, coin slot and two tap buttons', render: true },
  'napkin-vending-cut': { alt: 'Sygnet napkin vending machine with coin slot, key lock and collection tray', render: true },
  'smart-milk-vending-cut': { alt: 'Sygnet Smart Milk Vending machine with dispensing window and keypad', render: true },
  'dairy-milk-atm-cut': { alt: 'Sygnet Community Milk ATM kiosk on castor wheels', render: true },
  // Dairy Connect page (build/tools/cutout_dairy.py, from the catalogue's p14 and p12)
  'dairy-kiosk-cut': { alt: 'Sygnet Community Milk ATM: a blue kiosk on castor wheels with a keypad, display and container bay', render: true },
  'dairy-mobile-cut': { alt: 'Sygnet Mobile Milk ATM: a stainless milk tank on a light truck with two dispensing units at the back', render: true },
  'dairy-tank-cut': { alt: 'Cut-away of the Milk ATM cabinet: a stainless tank of milk with an agitator, motor on top and insulated walls', render: true },
  // Nurse Call System page (build/tools/cutout_ncs.py, catalogue pp. 2-3). render: true on the screens and display
  // panels, which are drawn mock-ups; the wearables, pendants, switches and pull-cord read as product photographs
  'ncs-plus-display-cut': { alt: 'Sygnet NCS-Plus single-service nurse station display unit: a white panel of room call lamps with the Sygnet name', render: true },
  'ncs-room-indicator-cut': { alt: 'Room indicator: a column light in red, green, amber and yellow sections', render: false },
  'ncs-pendant-cut': { alt: 'Hand-held pendant bed switch on a coiled cable', render: false },
  'ncs-lcd-display-cut': { alt: 'LCD multi-service nursing display unit: a monitor showing calls by bed in coloured tiles', render: true },
  'ncs-bed-switch-cut': { alt: 'Bed switch wall plate with nurse, housekeeping and Code Blue call buttons, reset buttons and a pendant socket', render: false },
  'ncs-bedside-pendant-cut': { alt: 'Bedside pendant with two call buttons on a coiled cable', render: false },
  'ncs-pull-cord-cut': { alt: 'Bathroom pull-cord: a small wall unit with a hanging cord', render: false },
  'ncs-server-standard-cut': { alt: 'Standard reporting server: a monitor showing call reports with charts', render: true },
  'ncs-code-blue-cut': { alt: 'Code Blue switch: a white wall plate with one blue call button and a lamp', render: false },
  'ncs-station-unit-cut': { alt: 'Nurse station display unit: a monitor showing calls by bed in coloured tiles', render: true },
  'ncs-patient-tracker-cut': { alt: 'Patient tracker: a white wristband with a round tag', render: false },
  'ncs-attend-switch-cut': { alt: 'Attend switch: a white wall plate with an attend button and a staff call button', render: false },
  'ncs-staff-tracker-cut': { alt: 'Staff tracker: a black wristband with a round tag', render: false },
  'ncs-server-enterprise-cut': { alt: 'Enterprise reporting server: a monitor showing a reporting dashboard', render: true },
  'ncs-staff-app-cut': { alt: 'Staff app for Code Blue on a phone, showing an incoming Code Blue call with a Resolve button', render: true },
  // Queue Management System page (build/tools/cutout_qms.py, catalogue p18 and p19)
  'qms-lite-cut': { alt: 'Sygnet QMS Lite: two red segment token displays and the Sygnet call pad with its keypad', render: true },
  'qms-pro-cut': { alt: 'Sygnet QMS Professional: the Sygnet touch kiosk, an operator console screen listing tokens with call buttons, and a Sygnet token display', render: true },
  'qms-ent-cut': { alt: 'Sygnet QMS Enterprise: the cloud dashboard on a laptop and on a phone, drawn without figures', render: true },
  'qms-kiosk-lg': { alt: 'Sygnet QMS touch kiosk with a Choose Department screen, ticket printer and scanner', render: true },
  // the last product pages (build/tools/cutout_remaining.py)
  'rwc-centre-cut': { alt: 'Sygnet Rural Water Center: a teal building on a stone plinth with the Sygnet IoT Connect mark, a payment panel and four water dispensing points', render: true },
  'smart-milk-vending-clean-cut': { alt: 'Sygnet Smart Milk Vending machine: a blue and steel cabinet on castor wheels with a dispensing window, keypad and display', render: true },
  'qms-callpad': { alt:'Sygnet call pad: a white hand unit with a small LCD and blue keys for call, skip, absent and transfer', render: true },
};

// ---------------------------------------------------------------- trust (Sygnet NCS Catalog, page 1)
// shown as text only: certificate copies, logo files and written permission are still to come from the client
export const CERTS = ['ISO 9001:2015', 'SMERA rating', 'NSIC registration', 'D&B'];
export const CERTS_NOTE = 'As listed in the NCS catalog. Certificate copies to follow.';
export const HOSPITALS = ['AIIMS Bhopal', 'P.D. Hinduja Hospital & Medical Research Centre (Mahim)', 'Pawana Hospital', 'Sapphire Hospital', "Dr. Sachdev Maxivision Eye Care Centre", 'Tata Medical Center'];

// ---------------------------------------------------------------- products
// window: which illustrative interface the page shows (ui.mjs, WINDOWS); card: the product card's cut-out (CATALOG *-cut)
export const PRODUCTS = [
  {
    // content from content/flyers/Sygnet NCS Catalog.pdf (3 pages: cover and trust, NCS-Plus and NCS-Professional,
    // NCS-Enterprise). The page has its own layout (pages.mjs ncsPage), built from the School Bell & PA page's parts:
    // centred intro, a tier viewer (#plus, #professional, #enterprise), set-ups, how a call works, benefits, trust,
    // and the comparison last. Component names are the catalogue's own words. Client rules (2026-11-20): no hospital accreditation or compliance claim
    // anywhere on the site, no tier-to-bed-size mapping, no figures beyond the set-ups below, logos only with permission.
    slug: 'nurse-call-system', card: 'ncs-station-display-cut', img: 'ncs-station-display', icon: 'hospital', menu: 'Wired and wireless, three tiers', short: 'Nurse Call', name: 'Sygnet NCS Nurse Call System', code: 'NCS',
    tier: 'priority', window: 'ncs', industries: ['healthcare'], layout: 'ncs',
    one: 'Wired and wireless nurse call for wards of 10 to 200 beds.',
    title: 'Sygnet NCS: wired and wireless nurse call for hospital wards',
    desc: 'Sygnet NCS nurse call system for hospitals in three tiers, NCS-Plus, NCS-Professional and NCS-Enterprise: bed switches and pendants, room indicators, bathroom pull-cords, nurse station displays, Code Blue, trackers, staff app and reporting, wired or wireless.',
    eyebrow: 'Nurse Call System · For hospitals',
    h1: 'Nurse call for hospital wards',
    lead: 'IoT-enabled nurse calling, wired or wireless, so every call is seen, answered and recorded.',
    // pp. 2-3: the four key features, the same on every tier
    features: [
      ['wifi', 'Reliable and efficient', 'Real-time alerts for faster response.'],
      ['bell-ring', 'Multi-level indication', 'Visual and audible alerts.'],
      ['shield-check', 'Easy to use', 'Simple, intuitive devices.'],
      ['settings', 'Flexible options', 'Wired and wireless.'],
    ],
    // pp. 2-3: the parts, in the catalogue's words. img: build/tools/cutout_ncs.py
    parts: {
      plusDisplay: ['8/16/24-room single-service nurse station display unit', 'ncs-plus-display-cut'],
      roomIndicator: ['Room indicator with multiple indication', 'ncs-room-indicator-cut'],
      pendant: ['Hand-held pendant bed switch', 'ncs-pendant-cut'],
      lcd: ['LCD-based multi-service nursing display unit', 'ncs-lcd-display-cut'],
      bedSwitch: ['Bed switch with pendant: nurse, housekeeping and emergency Code Blue calls', 'ncs-bed-switch-cut'],
      bedside: ['Bedside pendant', 'ncs-bedside-pendant-cut'],
      pullCord: ['Bathroom pull-cord for bathroom emergency calls', 'ncs-pull-cord-cut'],
      serverStd: ['Standard reporting server', 'ncs-server-standard-cut'],
      codeBlue: ['Code Blue switch', 'ncs-code-blue-cut'],
      stationUnit: ['Nurse station display unit', 'ncs-station-unit-cut'],
      patientTracker: ['Patient tracker', 'ncs-patient-tracker-cut'],
      staffTracker: ['Staff tracker', 'ncs-staff-tracker-cut'],
      attend: ['Attend switch', 'ncs-attend-switch-cut'],
      app: ['Staff app for Code Blue', 'ncs-staff-app-cut'],
      serverEnt: ['Enterprise reporting server', 'ncs-server-enterprise-cut'],
    },
    // the three tiers. id: panel id and URL hash; img: the viewer's lead device; groups: [label, part keys]
    range: [
      { id: 'plus', code: 'Tier 1', name: 'NCS-Plus', line: 'Essential nurse call for smaller wards', img: 'ncs-plus-display-cut',
        groups: [['Components', ['plusDisplay', 'roomIndicator', 'pendant']]] },
      { id: 'professional', code: 'Tier 2', name: 'NCS-Professional', line: 'Multi-service nurse call with reporting', img: 'ncs-lcd-display-cut',
        groups: [['Components', ['lcd', 'bedSwitch', 'bedside', 'roomIndicator', 'pullCord', 'serverStd']]] },
      { id: 'enterprise', code: 'Tier 3', name: 'NCS-Enterprise', line: 'The complete nurse call and Code Blue system', img: 'ncs-staff-app-cut',
        groups: [['Added in Enterprise', ['codeBlue', 'stationUnit', 'patientTracker', 'staffTracker', 'attend', 'app', 'serverEnt']],
                 ['Everything in Professional', ['bedSwitch', 'bedside', 'roomIndicator', 'pullCord']]],
        note: 'In Enterprise, the nurse station display unit and the enterprise reporting server take the place of the LCD display and the standard reporting server.' },
    ],
    // reference set-ups from the client brief; deliberately not mapped to a tier
    setups: [
      ['bed-double', 'Small', 'About 10 beds', '2 switches'],
      ['layers', 'Medium', 'About 25 beds', 'Across 2 floors'],
      ['lamp', 'Large', '50 to 100 beds', 'Corridor door indicators'],
      ['siren', 'Advanced', 'About 200 beds', 'Code Blue, 4 switches'],
    ],
    how: [
      ['hand', 'The patient calls', 'The patient presses the bed switch or pulls the bathroom cord.'],
      ['lightbulb', 'The ward sees it', 'The room indicator lights up and the nurse station display shows the bed and ward.'],
      ['user-check', 'A nurse attends', 'The nurse goes to the bed and presses the attend switch (Enterprise).'],
      ['file-text', 'The call is recorded', 'The call is kept in the reporting server.'],
    ],
    benefits: [
      ['chart-column', 'Nursing staff performance monitoring', 'Every call is recorded, so nursing managers can see how calls are answered.'],
      ['heart-pulse', 'Smoother patient experience', 'Patients know their call has gone through and that help is coming.'],
      ['clock', 'Turnaround and waiting-time optimisation', 'Calls are seen at once, which helps the ward shorten the wait between a call and care.'],
      ['server', 'Reporting software on a local server', 'Call records stay inside the hospital, on a server on site.'],
      ['smartphone', 'Staff app for on-the-move alerts', 'Code Blue calls reach staff on their phones, away from the desk.', 'Enterprise'],
    ],
    // the comparison, from pp. 2-3 and the client brief. true = Yes, false = No, a string = that word (shown as present)
    compare: {
      rows: [
        ['Wired and wireless options', [true, true, true]],
        ['Room indicator with multiple indication', [true, true, true]],
        ['Hand-held or bedside pendant', [true, true, true]],
        ['Nurse station display', ['Single-service, 8/16/24 rooms', 'LCD multi-service', 'Nurse station display unit']],
        ['Bed switch with nurse, housekeeping and emergency calls', [false, true, true]],
        ['Bathroom pull-cord', [false, true, true]],
        ['Reporting server', [false, 'Standard', 'Enterprise']],
        ['Code Blue switch', [false, false, true]],
        ['Attend switch', [false, false, true]],
        ['Patient tracker', [false, false, true]],
        ['Staff tracker', [false, false, true]],
        ['Staff app for Code Blue', [false, false, true]],
      ],
      note: 'From the Sygnet NCS catalogue. Every tier is available wired or wireless. Electrical and installation specifications to follow.',
    },
    about: 'Sygnet NCS is an IoT-enabled nurse call system for hospital wards, wired or wireless, in three tiers. NCS-Plus pairs a single-service nurse station display for 8, 16 or 24 rooms with room indicators and hand-held pendant bed switches. NCS-Professional adds an LCD multi-service nursing display, bed switches for nurse, housekeeping and Code Blue calls, bedside pendants, bathroom pull-cords and a standard reporting server. NCS-Enterprise adds Code Blue switches, a nurse station display unit, patient and staff trackers, attend switches, a staff app for Code Blue and an enterprise reporting server. Sygnet IoT is based in Surat, Gujarat, India.',
    models: [],
    faq: [],
  },
  {
    // content from content/flyers/Sygnet QMS.pdf (19 slides). The page has its own layout (pages.mjs qmsPage), built
    // from the School Bell & PA page's parts: centred intro, a tier viewer (#lite, #professional, #enterprise),
    // the customer journey, the feature blocks, where it is used, and the comparison last. THREE tiers only (p18).
    // Client rules (2026-11-20): never use the p2 "Challenge" or p16 "Why Sygnet" slides; no related-products block;
    // no prices, user limits, counter counts or dashboard figures; no accreditation mention; no stock photos of people.
    slug: 'queue-management-system', card: 'qms-kiosk-cut', img: 'qms-family', icon: 'users-round', menu: 'Kiosk, QR and WhatsApp tokens', short: 'Queue Management', name: 'Sygnet QMS Queue Management System', code: 'QMS',
    tier: 'priority', window: 'qms', industries: ['healthcare', 'retail', 'building', 'smart-city', 'education'], layout: 'qms',
    one: 'Tokens by kiosk, QR or WhatsApp, with one dashboard for every branch.',
    title: 'Sygnet QMS: queue management for hospitals, banks and offices',
    desc: 'Sygnet QMS queue management in three tiers, QMS Lite, QMS Professional and QMS Enterprise: kiosk, QR, WhatsApp and SMS tokens, virtual queue, appointments, queue displays, counter console, multi-branch reports, feedback and integrations.',
    eyebrow: 'Queue Management System · Smart customer flow',
    h1: 'Queue management that makes waiting intelligent',
    lead: 'Tokens, appointments, displays and reports in one platform, for hospitals, banks, government offices and service centres.',
    // p18 "Product Portfolio": the three tiers, in the slide's words. img: build/tools/cutout_qms.py
    range: [
      { id: 'lite', code: 'Tier 1', name: 'QMS Lite', tab: 'Hardware based', line: 'Hardware queue management for basic needs', img: 'qms-lite-cut',
        text: 'Segment display and call pad based hardware queue management with LAN and Wi-Fi based systems for basic features and low-budget customers.',
        points: ['Segment token displays', 'Call pad', 'LAN and Wi-Fi based', 'Basic features'],
        best: 'Basic features and low-budget customers.' },
      { id: 'professional', code: 'Tier 2', name: 'QMS Professional', tab: 'Kiosk and software', line: 'Kiosk and software for advanced queues', img: 'qms-pro-cut',
        text: 'Touch kiosk and software based advanced queue management with advanced features.',
        points: ['Touch kiosk', 'Operator console', 'Token display', 'Advanced features'],
        best: 'Sites that need advanced queue management features.' },
      { id: 'enterprise', code: 'Tier 3', name: 'QMS Enterprise', tab: 'Cloud based', line: 'Cloud queue management, ready to use', img: 'qms-ent-cut',
        text: 'Cloud-based queue management with quick-buy-and-use deployment and yearly subscription models.',
        points: ['Quick buy: start in minutes', 'Use instantly: no installation', 'Pay yearly: affordable plans', 'Web and mobile access'],
        best: 'Teams that want to buy and use at once, on a yearly subscription.' },
    ],
    // p18 foot strip
    strengths: [['cpu', 'Reliable hardware'], ['puzzle', 'Easy integration'], ['sliders-horizontal', 'Advanced features'], ['lock', 'Secure and safe'], ['headphones', 'Indian support']],
    // p4 "Complete customer journey", rewritten short
    journey: [
      ['calendar-clock', 'Pre-arrival', 'Check wait times and plan the visit.'],
      ['qr-code', 'Appointment or QR scan', 'Book ahead, or scan a QR code to join.'],
      ['ticket', 'Token generation', 'An instant token with the estimated waiting time.'],
      ['sofa', 'Waiting area', 'Real-time updates on the queue while you wait.'],
      ['user-check', 'Counter service', 'Served at the assigned counter.'],
      ['star', 'Feedback', 'A quick rating after the visit.'],
      ['chart-line', 'Reports and analytics', 'Insights to improve the service.'],
    ],
    // p5
    joinWays: [['monitor', 'Walk-in kiosk'], ['qr-code', 'QR code'], ['globe', 'Mobile web'], ['calendar-check', 'Online appointment'], ['contact', 'Reception desk'], ['message-circle', 'WhatsApp'], ['message-square-text', 'SMS link']],
    tokenPoints: [['zap', 'Instant token', 'Visitors get a token at once and start their journey.'], ['clock', 'Estimated waiting time', 'Each visitor knows their place in the queue.'], ['ticket', 'Digital tickets', 'Easy to access, share and manage on a phone.']],
    // p6
    virtualCan: [['wifi', 'Join remotely'], ['activity', 'Track the live queue'], ['bell-ring', 'Receive notifications'], ['map-pin', 'Arrive only when required']],
    virtualBenefits: [['users-round', 'Less crowding'], ['smile', 'Better experience'], ['hand', 'Contactless operation'], ['timer', 'Reduced waiting time']],
    // p7
    appointments: [['globe', 'Online booking'], ['calendar-days', 'Slot management'], ['stethoscope', 'Doctor or service selection'], ['circle-check', 'Automatic confirmation'], ['bell', 'Reminder notifications'], ['repeat', 'Reschedule and cancel'], ['merge', 'Walk-in and appointment integration']],
    // p8
    notifyVia: [['message-square-text', 'SMS'], ['message-circle', 'WhatsApp'], ['globe', 'Mobile browser'], ['mail', 'Email']],
    notifyAlerts: [['ticket', 'Token issued'], ['list-ordered', 'Queue position'], ['clock', 'Estimated waiting time'], ['megaphone', 'Counter called']],
    // p9
    displayShows: [['volume-2', 'Now serving', 'The token being served.'], ['arrow-right', 'Next queue', 'The next token in line.'], ['circle-alert', 'Missed queue', 'Missed or skipped tokens.'], ['users-round', 'Waiting queue', 'The tokens still waiting.']],
    displayOptional: [['circle-play', 'Promotional videos'], ['heart-pulse', 'Health awareness'], ['megaphone', 'Advertisements'], ['building-2', 'Corporate branding']],
    // p10
    console: [['phone', 'Call next', 'Call the next token.'], ['rotate-ccw', 'Recall', 'Recall the previous or any token.'], ['arrow-right', 'Forward', 'Send the token to another counter.'], ['skip-forward', 'Skip', 'Skip the current token.'], ['user', 'Absent', 'Mark the token absent.'], ['circle-check', 'Attended', 'Mark the token attended.']],
    // p11
    branches: [['hospital', 'Multiple hospitals or organisations', 'Run them all from one platform.'], ['network', 'Multiple branches', 'Oversee every branch and location in real time.'], ['users-round', 'Multiple departments', 'Control each department and service queue on its own.']],
    branchTools: [['layout-dashboard', 'Central dashboard'], ['settings', 'Remote configuration'], ['activity', 'Live monitoring']],
    // p12
    reports: ['Daily', 'Weekly', 'Monthly', 'Counter performance', 'Staff performance', 'Peak hours', 'Waiting time', 'Service time', 'Customer volume'],
    // p13
    feedback: [['star', 'Star rating', 'A simple rating, with room to say more.'], ['gauge', 'NPS', 'Net Promoter Score to follow loyalty.'], ['circle-question-mark', 'Custom questions', 'Ask what matters to you.'], ['external-link', 'Google review redirect', 'Invite happy visitors to leave a Google review.'], ['clipboard-list', 'Complaint registration', 'Visitors register a complaint and you track it to resolution.'], ['chart-column', 'Dashboard analytics', 'Feedback, ratings and trends in one view.']],
    // p14
    languages: [['English', 'English'], ['Hindi', 'हिन्दी'], ['Gujarati', 'ગુજરાતી'], ['Marathi', 'मराठी'], ['Tamil', 'தமிழ்'], ['Telugu', 'తెలుగు']],
    // p15
    integrations: [['hospital', 'HIS'], ['building', 'HMS'], ['boxes', 'ERP'], ['users', 'CRM'], ['file-text', 'EMR'], ['receipt', 'Billing software'], ['tv', 'Digital signage'], ['phone', 'Calling systems'], ['message-circle', 'WhatsApp API'], ['message-square-text', 'SMS gateway']],
    // p17 "Applications": the sectors, as icon cards
    sectors: [
      ['heart-pulse', 'Healthcare', 'Hospitals, clinics and diagnostic centres.'],
      ['landmark', 'Banking', 'Banks, co-operative banks and NBFCs.'],
      ['building-2', 'Government', 'Offices, departments and citizen service centres.'],
      ['shopping-cart', 'Retail', 'Supermarkets, malls and showrooms.'],
      ['graduation-cap', 'Education', 'Schools, colleges, universities and training institutes.'],
      ['plane', 'Airports', 'Passenger services, check-in and help desks.'],
      ['antenna', 'Telecom', 'Service centres, stores and customer support.'],
      ['wrench', 'Service centres', 'Multi-brand service centres, workshops and dealerships.'],
      ['building', 'Municipal corporations', 'Municipal offices, tax counters and utility services.'],
    ],
    // the comparison: only what the brief and p18 state. null = to be confirmed
    compare: {
      rows: [
        ['Approach', ['Hardware based', 'Touch kiosk and software based', 'Cloud based']],
        ['Core devices', ['Segment display and call pad', 'Touch kiosk, operator console, token display', 'Cloud platform, web and mobile access']],
        ['Connectivity', ['LAN and Wi-Fi', null, 'Cloud']],
        ['Positioning', ['Basic features, low budget', 'Advanced features', 'Quick buy and use']],
        ['Commercial model', [null, null, 'Yearly subscription']],
      ],
      pending: ['Feature-wise availability', 'Token types, appointments, WhatsApp, reports and the other features on this page, tier by tier.'],
      note: 'From the Sygnet QMS catalogue. Prices, capacities and the feature list of each tier are confirmed with you during the demo.',
    },
    about: 'Sygnet QMS is a queue management system in three tiers. QMS Lite is hardware based: segment token displays and a call pad, on LAN and Wi-Fi, for basic features and low budgets. QMS Professional is touch kiosk and software based, with an operator console, token displays and advanced features. QMS Enterprise is cloud based, bought and used at once on a yearly subscription. Sygnet IoT is based in Surat, Gujarat, India.',
    models: [],
    faq: [],
  },
  {
    // content from content/flyers/Sygnet Bell PA Systems.pdf (8 pages: range, one page per model, comparison, ecosystem).
    // The page has its own layout (pages.mjs bellPage): a model viewer with five tabs, the ecosystem, the range's
    // benefits and the comparison. Feature lists, subtitles and "Best for" lines are the catalogue's own words.
    slug: 'school-bell-pa-system', card: 'bell-tbg-cut', img: 'bell-tbg', icon: 'bell-ring', menu: 'Five models, timer to touch screen', short: 'School Bell & PA', name: 'Sygnet School Bell & PA System', code: 'Bell',
    tier: 'priority', window: 'bell', industries: ['education', 'manufacturing', 'building'], viewer: true,
    one: 'Automatic bells, prayers and class announcements on a timetable.',
    title: 'Sygnet School Bell & PA: automatic bells and announcements',
    desc: 'Sygnet School Bell & PA systems: five models from the TBG bell timer to the TBW-D touch screen bell and PA, with MP3 prayers, addressable classroom speakers and a mobile app.',
    h1: 'Automatic school bells and announcements',
    lead: 'Set the timetable once and the bells, prayers and classroom announcements run on their own.',
    rangeHead: ['Five models.', 'Pick one to see what it does.'],
    // id: the panel id and URL hash; img: the viewer's cut-out (bell-tbg-cut is page 2, the rest page 1 of the catalogue)
    range: [
      { id: 'tbg', code: 'TBG', name: 'Basic bell timer', title: 'Automatic Bell Timer', img: 'bell-tbg-cut',
        line: 'Reliable bell automation for schools and industries',
        text: 'The TBG automatic bell timer rings the bell on your timetable, so no one has to watch the clock. You program it on its keypad, and its relay output drives the bell, hooter or siren you already have.',
        features: ['Automatic bell scheduling', 'Multiple daily timetables', 'Relay output for bell/hooter/siren', 'RTC with battery backup', 'Manual bell trigger', 'Easy keypad programming', 'Compact wall-mount design'],
        apps: ['Schools', 'Colleges', 'Factories', 'Workshops'],
        best: 'Customers who only need automatic bell ringing.', bestShort: 'Bell ringing only' },
      { id: 'tba-wl', code: 'TBA-WL', name: 'Audio bell timer', title: 'Audio Bell Timer', img: 'bell-range-tba-wl-cut',
        line: 'Bell automation with MP3 audio playback',
        text: 'The TBA-WL audio bell timer adds recorded audio to the bell. Prayers, the national anthem and recorded announcements play from MP3 at the set time, through its speaker output or your amplifier.',
        features: ['MP3 audio playback', 'Prayer and national anthem scheduling', '32 GB SD card storage', 'Mobile app audio upload', 'Built-in speaker output', 'AUX output for amplifier', 'LCD display and keypad', 'Fully automatic operation'],
        best: 'Schools wanting automated prayers and announcements without a full PA system.', bestShort: 'Automated prayers, no full PA' },
      { id: 'tba-d', code: 'TBA-D', name: 'Desktop bell & PA system', title: 'Desktop Bell & PA System', img: 'bell-range-tba-d-cut',
        line: 'Classroom communication made easy',
        text: 'The TBA-D desktop bell and PA system does everything the TBA-WL does and adds a desktop microphone. Staff speak live to one classroom, a group of rooms or a zone, through addressable speakers.',
        features: ['All TBA-WL features', 'Desktop microphone', 'Live announcements', 'Addressable speaker support', 'Classroom-wise communication', 'Zone and group announcements', 'Local audio monitoring', 'Volume control'],
        best: 'Medium and large schools requiring classroom-wise announcements.', bestShort: 'Classroom-wise announcements' },
      { id: 'tbw-wl', code: 'TBW-WL', name: 'Smart Wi-Fi bell system', title: 'Smart Wi-Fi Bell System', img: 'bell-range-tbw-wl-cut',
        line: 'Mobile app controlled bell and announcement system',
        text: 'The TBW-WL smart Wi-Fi bell system is run from a mobile app: timetables, audio uploads and live announcements, over Wi-Fi or from anywhere with internet access. It keeps its own time in sync.',
        features: ['Mobile app control', 'Unlimited timetables', 'Wireless audio upload', 'Live mobile announcements', 'External mic support', 'Wi-Fi connectivity', 'Remote internet access', 'Automatic time synchronisation'],
        best: 'Modern schools wanting centralised management through mobile devices.', bestShort: 'Central control from a phone' },
      { id: 'tbw-d', code: 'TBW-D', name: 'Touch screen bell & PA system', title: 'Premium Touch Screen Bell & PA System', img: 'bell-range-tbw-d-cut',
        line: 'The ultimate smart school communication platform',
        text: 'The TBW-D premium touch screen bell and PA system is the top of the range. It is run from a 5-inch touch screen with a graphical timetable editor, or from the mobile app, and drives addressable speakers for zone, group and live announcements.',
        features: ['5-inch capacitive touch screen', 'Touch + mobile app operation', 'Graphical timetable editor', 'Addressable speaker control', 'Zone and group announcements', 'Live announcements', 'Remote internet access', 'Audio playback and scheduling', 'Local audio monitoring'],
        best: 'Premium schools, universities and multi-building campuses.', bestShort: 'Premium and multi-building campuses' },
    ],
    // the catalogue's "Product comparison snapshot" (p. 7), row for row
    compare: {
      rows: [
        ['Audio playback', [0, 1, 1, 1, 1]],
        ['Microphone', [0, 0, 1, 1, 1]],
        ['Addressable speakers', [0, 0, 1, 1, 1]],
        ['Mobile app', [0, 1, 0, 1, 1]],
        ['Internet control', [0, 0, 0, 1, 1]],
        ['Touch screen', [0, 0, 0, 0, 1]],
      ],
      note: 'From the Sygnet Bell & PA catalogue. Electrical and mounting specifications to follow.',
    },
    // p. 8: the parts the models work with
    ecosystem: [
      { title: 'Smart addressable speakers', img: 'bell-speaker-cut', text: 'A wall speaker in each room, each with its own address. For the TBA-D, TBW-WL and TBW-D.',
        features: ['Classroom-wise communication', 'Group announcements', 'Zone broadcasting', 'School-wide announcements'] },
      { title: 'Mobile application', text: 'The day’s bells, audio and announcements on a phone. For the TBA-WL, TBW-WL and TBW-D.',
        features: ['Bell scheduling', 'Audio upload', 'Live announcements', 'Remote management', 'Time synchronisation'] },
    ],
    // p. 1: key benefits and the four strengths of the range
    benefits: [
      ['bell-ring', 'Automatic bell scheduling', 'Periods, breaks and dispersal ring on the timetable.'],
      ['music', 'Audio playback', 'Prayers, the anthem and recorded tones play from MP3.'],
      ['smartphone', 'Mobile app control', 'Bells, audio and announcements from a phone.'],
      ['users', 'Classroom announcements', 'Speak to one room, a group, a zone or the whole school.'],
      ['volume-2', 'Addressable speaker support', 'Each speaker has its own address.'],
      ['wifi', 'Wi-Fi and internet connectivity', 'Managed remotely, with the clock kept in sync.'],
    ],
    strengths: [['shield-check', 'Reliable performance'], ['settings', 'Easy operation'], ['share-2', 'Scalable solution'], ['cloud', 'Future ready']],
    // plain text for search engines and readers, from the catalogue; no schema, ratings or counts
    about: 'Sygnet School Bell & PA systems are automatic bell timers and public address systems for schools, colleges, universities, factories and workshops. The range runs from the TBG automatic bell timer, through the TBA-WL MP3 audio bell timer and the TBA-D desktop bell and PA system, to the TBW-WL smart Wi-Fi bell system and the TBW-D touch screen bell and PA system, with addressable classroom speakers and a mobile app. Sygnet IoT is based in Surat, Gujarat, India.',
    models: [],
    faq: [],
  },
  {
    slug: 'water-atm', card: 'water-atm-panel-cut', img: 'water-atm-kiosk', icon: 'droplet', menu: 'Water ATMs and Rural Water Centers', short: 'Water ATM', name: 'Sygnet Water ATM', code: 'Water',
    tier: 'priority', window: 'water', industries: ['water', 'smart-city', 'agriculture'], layout: 'water',
    one: 'Two-tap water dispensing with card, coin or UPI, monitored online.',
    // 2026-11-20 rebuilt on the bell-page pattern from Sygnet_Water ATM_26-1.pdf and the Water ATM Panel flyer
    // (pages.mjs waterPage): centred intro, a viewer (#kiosk, #panel), the PDF's sections in its order, the roles
    // table last. Client rules: never use p3 (Challenge), p6 (price table, "beneficiaries"), p7 (deployment
    // locations), p11 (one ATM can deliver) or p18 (thank-you slide, old logo); no pricing; no SDG icons or colours;
    // no dashboard or report figures (the drawn screen carries states only); no "100%" claims; no related products.
    // The p10 figures appear only as a labelled planning estimate on the assumed 200 users a day.
    title: 'Sygnet Water Connect: smart community Water ATMs for CSR, NGOs and Panchayats',
    desc: 'Sygnet Water Connect: community Water ATMs and the Water ATM Panel, with IoT monitoring, cashless payment and transparent reporting, for CSR teams, NGOs, Panchayats and municipalities.',
    eyebrow: 'Sygnet Water Connect · Smart community drinking water',
    h1: 'Safe drinking water infrastructure for communities',
    lead: 'Water ATMs with IoT monitoring, cashless payment and transparent reporting, for CSR teams, NGOs, Panchayats and municipalities.',
    chips: [['droplet', 'Safe and purified'], ['clock', '24x7 availability'], ['activity', 'Smart IoT monitoring']],
    tagline: ['Fund once. ', 'Impact for years.'],
    // the viewer. img: build/tools/cutout_water.py (p15, Sygnet mark only) and cutout_cards.py (the flyer's panel)
    range: [
      { id: 'kiosk', code: 'Community kiosk', name: 'Water ATM', tab: 'Water ATM (community kiosk)', img: 'water-atm-kiosk-cut',
        line: 'Safe, reliable drinking water for the whole community',
        text: 'A smart water infrastructure and utility technology platform delivering safe and reliable drinking water to communities.',
        points: [
          ['droplet', 'Safe and purified drinking water', 'Advanced purification for clean, safe and healthy water.'],
          ['wifi', 'IoT-enabled smart platform', 'Real-time monitoring, remote management and smart analytics.'],
          ['qr-code', 'Cashless and convenient access', 'QR-based access and digital payments.'],
          ['shield-check', 'Reliable and secure', 'Tamper-proof systems, secure operations and data protection.'],
          ['leaf', 'Sustainable by design', 'Energy efficient and eco-friendly, built for the long term.'],
          ['chart-column', 'Data-driven insights', 'Actionable insights for better planning and performance.'],
          ['users', 'Community-centric', 'Built to support well-being and strengthen communities.'],
        ],
        forLabel: 'Built for', for: ['CSR teams', 'NGOs', 'Panchayats', 'Municipalities'] },
      { id: 'panel', code: 'Panel', name: 'Water ATM Panel', tab: 'Water ATM Panel', img: 'water-atm-panel-cut',
        line: 'Smart. Reliable. Connected.',
        text: 'A smart, user-friendly panel for automated water dispensing, with secure payment options and real-time online monitoring.',
        points: [
          ['droplet', 'Two-tap dispensing', 'Serve more users with a dual-tap dispensing system.'],
          ['credit-card', 'Payment by RFID card, coin or UPI', 'Flexible payment options at the panel.'],
          ['cloud', 'Online monitoring built in', 'Real-time sales, usage and system status, from anywhere.'],
          ['smartphone', 'Easy rate configuration via mobile', 'Update water rates instantly from a simple mobile screen.'],
          ['file-chart-column', 'Easy reports on mobile', 'Detailed reports and analytics, anytime.'],
        ],
        monitorLabel: 'Online monitoring',
        monitor: ['Real-time data: sales, usage and status', 'Instant alerts: low water, offline and other issues', 'Detailed reports: sales, collection, usage and performance', 'Secure and reliable operations'] },
    ],
    // p2
    about: [
      ['droplet', 'Public Water ATMs', 'Affordable, safe drinking water for communities.'],
      ['filter', 'Water purification systems', 'Advanced purification for safe and healthy water.'],
      ['waves', 'Water quality monitoring', 'Continuous monitoring for safe water assurance.'],
      ['container', 'Water tank monitoring', 'Real-time tank level and water quality monitoring.'],
      ['gauge', 'Water metering solutions', 'Accurate metering for efficient water management.'],
      ['chart-column', 'Water utility monitoring', 'End-to-end visibility of water infrastructure and operations.'],
      ['cloud', 'IoT-based water infrastructure', 'An IoT platform for real-time monitoring and smart decisions.'],
      ['settings', 'Operations and maintenance', 'Reliable O&M for long-term sustainability.'],
    ],
    // p4, in calm words: no "100%", no guaranteed outcomes
    forCommunities: [
      ['heart-pulse', 'Improved health and hygiene', 'Reliable access to safe water helps reduce waterborne illness.'],
      ['droplet', 'Access to safe drinking water', 'Clean, purified and affordable drinking water for everyone.'],
      ['hand-coins', 'Reduced daily cost', 'An affordable source of safe water helps families save on daily water expenses.'],
      ['smile', 'Better quality of life', 'Better hydration, better well-being, better living.'],
      ['building-2', 'Improved public infrastructure', 'Strengthens community amenities and public facilities.'],
    ],
    forSponsors: [
      ['hand-heart', 'Visible social impact', 'A tangible initiative that creates positive, visible change.'],
      ['sprout', 'Sustainable community asset', 'Long-term community infrastructure that continues to serve for years.'],
      ['badge-check', 'Strong CSR and ESG contribution', 'Supports sustainability goals and strengthens CSR commitments.'],
      ['award', 'Enhanced brand reputation', 'Builds goodwill and trust within the community.'],
      ['users', 'Empowering communities', 'Contributes to inclusive growth and community development.'],
    ],
    // p8
    how: [
      ['smartphone', 'Select water quantity', 'Choose how much water you need at the machine.'],
      ['credit-card', 'Make payment', 'Pay at the machine with the options it offers.'],
      ['droplet', 'Receive safe drinking water', 'Purified water is dispensed into your container.'],
      ['clipboard-list', 'Usage recorded', 'The transaction is logged automatically.'],
      ['layout-dashboard', 'Dashboard updated', 'Sales, usage and status update online.'],
    ],
    // p9
    revenue: [['wrench', 'Maintenance'], ['user-check', 'Service visits'], ['filter', 'Filter replacement'], ['wifi', 'IoT monitoring'], ['box', 'Consumables'], ['settings', 'Operations']],
    csrResults: [
      ['hand-heart', 'Sustains operations', 'Supports ongoing maintenance and uptime.'],
      ['shield-check', 'Improves reliability', 'Regular service for consistent water quality.'],
      ['users', 'Builds community impact', 'Revenue reinvested for long-term community benefit.'],
      ['trending-up', 'Promotes sustainability', 'Smart, efficient and responsible use of resources.'],
    ],
    // p10, shown only as a planning estimate on its stated assumption (200 users a day x 365 days)
    impact: { users: '200', outputs: [['chart-column', '73,000+', 'transactions a year'], ['droplet', '73,000+', 'litres dispensed a year'], ['calendar-days', '365', 'days availability']] },
    // p12: goal numbers and names as text only (no UN icons or colours)
    sdgs: [['3', 'Good health and well-being'], ['6', 'Clean water and sanitation'], ['11', 'Sustainable cities and communities'], ['12', 'Responsible consumption and production']],
    esg: [
      ['leaf', 'Environmental', ['Promotes clean water access', 'Helps reduce plastic bottle usage', 'Supports sustainable resource use', 'Enables IoT-based monitoring']],
      ['users', 'Social', ['Improves community health', 'Provides affordable water for all', 'Creates local impact', 'Builds healthier communities']],
      ['landmark', 'Governance', ['Transparent operations', 'Real-time data and reporting', 'Accountable fund utilization', 'IoT-enabled monitoring']],
    ],
    // p13
    dashboard: [
      ['droplet', 'Water dispensed', 'Total litres of safe drinking water dispensed.'],
      ['users', 'Users served', 'The number of unique users and transactions.'],
      ['wallet-cards', 'Revenue collected', 'Real-time revenue collection and reports.'],
      ['test-tube', 'Water quality', 'TDS, pH and water quality, monitored continuously.'],
      ['activity', 'Device health and uptime', 'Device status, performance and uptime, 24x7.'],
      ['wrench', 'Maintenance activities', 'A log of service, maintenance and filter replacement.'],
    ],
    trust: [
      ['cloud', 'IoT enabled', 'Smart connectivity for real-time data updates.'],
      ['shield-check', 'Secure and reliable', 'Encrypted data transmission and secure cloud storage.'],
      ['file-chart-column', 'Accurate reporting', 'Real-time insights for better decisions and accountability.'],
      ['smartphone', 'Access on web or mobile', 'Open the dashboard on the web or on a phone, anytime.'],
    ],
    // p14 (the slide's sample report mock-ups are not used)
    physical: [
      ['monitor', 'ATM branding', 'Your logo displayed on the Water ATM.'],
      ['handshake', 'Sponsor logo on the front panel', 'Visible placement of your logo on the front panel.'],
      ['signpost', 'Site signage', 'Branded site signage acknowledging your support.'],
      ['megaphone', 'Awareness displays', 'Informing the community about clean water and your contribution.'],
    ],
    digital: [
      ['file-chart-column', 'Impact reports', 'Reports on water dispensed, users served and community impact.'],
      ['file-check', 'CSR documentation', 'Your contribution, ready for CSR reports and sustainability documents.'],
      ['trending-up', 'Annual impact reports', 'A yearly summary of the social, environmental and community benefits.'],
    ],
    // p15
    flow: [
      ['handshake', 'Sponsor / CSR partner', 'Shows its commitment to community well-being and sustainable impact.'],
      ['hand-coins', 'Funds infrastructure', 'Funds the installation of a Water ATM in the selected community.'],
      [null, 'Sygnet Water Connect', ['Installs', 'Operates', 'Maintains', 'Monitors', 'Reports']],
      ['users', 'Community receives safe drinking water', 'Access to clean, safe drinking water every day.'],
    ],
    commitment: [
      ['settings', 'End-to-end management', 'From installation to long-term operations.'],
      ['wifi', 'IoT-enabled monitoring', 'Real-time data, performance tracking and alerts.'],
      ['shield-check', 'Regular maintenance', 'Preventive servicing and quality checks.'],
      ['clipboard-list', 'Transparent reporting', 'Detailed impact, usage and financial reports.'],
      ['users', 'Community impact', 'Healthier lives, stronger communities.'],
    ],
    // p16 ("100% transparency" replaced)
    funds: [
      ['building-2', 'Water ATM infrastructure', 'A durable, smart Water ATM set-up.'],
      ['filter', 'Water purification equipment', 'Filtration and purification systems for safe drinking water.'],
      ['cpu', 'IoT monitoring hardware', 'Sensors, connectivity and devices for real-time monitoring.'],
      ['signpost', 'Branding and signage', 'ATM branding, sponsor logo, site signage and awareness displays.'],
      ['wrench', 'Installation and commissioning', 'Complete installation, testing and commissioning.'],
    ],
    // p17, softened: no "100% transparency", no "multi-stage purification", no "uninterrupted"
    why: [
      ['building-2', 'Water infrastructure expertise', 'End-to-end expertise in the design, deployment and management of smart water infrastructure.'],
      ['cloud', 'IoT monitoring platform', 'IoT technology for real-time monitoring, analytics and performance tracking.'],
      ['droplet', 'Water quality assurance', 'Purification with continuous quality monitoring, for safe and clean drinking water.'],
      ['settings', 'Operations and maintenance', 'Reliable operations and proactive maintenance for efficient service.'],
      ['file-chart-column', 'Impact reporting', 'Data-driven reports on water impact, usage and social outcomes.'],
      ['handshake', 'Transparent CSR execution', 'Transparent fund utilization, with accountability at every stage.'],
      ['refresh-cw', 'Sustainable operating model', 'An environmentally responsible, financially sustainable model for long-term community impact.'],
    ],
    // the roles table (last section)
    roles: [
      ['Role', 'Funds the Water ATM', 'Installs, operates and maintains', 'Receives safe drinking water'],
      ['Reporting', 'Receives impact reports and CSR documentation', 'Provides IoT monitoring and transparent reports', 'Benefits from regular service'],
      ['Visibility', 'Sponsor branding on the ATM and site signage', 'Maintains branding and signage', 'Sees the sponsor’s support'],
    ],
    // one link row only, to the Rural Water Center page (built 2026-11-20 from Synget Water Centers_26.pdf)
    rwc: ['Rural Water Center', 'Community water purification and distribution hub', '/products/rural-water-center/'],
  },
  {
    // 2026-11-20 built on the bell-page pattern (pages.mjs rwcPage) from content/flyers/Synget Water Centers_26.pdf (20
    // pages, all read). Same exclusions as the Water ATM page: not used are p2 (The Challenge), p10 (Impact per village:
    // population served, "millions of litres", "thousands of disease cases prevented", left out as unlabelled scale
    // claims), p14's dashboard figures, p20 (Thank you); no pricing or affordability wording ("affordable" removed from
    // p1, p4, p8, p9, p18), no locations, no related products, no third-party-branded kiosk renders, SDGs as text chips only. p9's
    // "Affordable user charges" row and p12's "Scalable: one village ... national programs" list are left out. The picture
    // is p15's Sygnet-branded building on white (build/tools/cutout_remaining.py). One product, so no selector cards: the
    // three community access models (p8) are a section, since only the first has a clean picture.
    slug: 'rural-water-center', card: 'rwc-centre-cut', img: 'water-centre', icon: 'droplet', menu: 'Community water purification hub', short: 'Rural Water Center', name: 'Sygnet Rural Water Center', code: 'RWC',
    tier: 'secondary', window: 'water', industries: ['water', 'agriculture', 'smart-city'], layout: 'rwc',
    one: 'A community water purification and distribution hub for villages.',
    title: 'Sygnet Rural Water Center: safe drinking water hubs for villages',
    desc: 'Sygnet Rural Water Center: a centrally managed purified drinking water facility for villages, monitored on Sygnet Water Connect, for NGOs, CSR teams, Panchayats and development partners.',
    eyebrow: 'Sygnet Water Connect · Rural Water Center',
    h1: 'Sustainable safe drinking water for every village',
    lead: 'A community water purification and distribution hub, monitored on Sygnet Water Connect, for institutions, NGOs, CSR fund managers and development partners.',
    chips: [['droplet', 'Safe water'], ['users', 'Healthy communities'], ['refresh-cw', 'Sustainable solutions'], ['handshake', 'Better together']],
    tagline: ['Transforming rural water access through ', 'technology and community participation.'],
    // p4 (and the render's own signboard: RO purified, IoT monitored, community owned, sustainable)
    view: {
      img: 'rwc-centre-cut', code: 'Community hub', name: 'Rural Water Center (RWC)', line: 'A community water purification and distribution hub',
      text: 'A centrally managed purified drinking water facility that provides safe drinking water to villagers through a pay-per-use model.',
      services: [
        ['droplet', 'Purified drinking water'], ['container', 'Refill water containers'], ['users', 'Community water distribution'],
        ['shield-check', 'Water quality assurance'], ['layout-dashboard', 'Digital monitoring and reporting'],
      ],
      for: ['Villages', 'Schools', 'Tribal communities', 'Rural institutions', 'Panchayats', 'Semi-urban communities'],
      marks: ['RO purified', 'IoT monitored', 'Community owned', 'Sustainable'],
    },
    // p5
    process: [
      ['droplet', 'Raw water source', 'Borewell, river, municipal, surface or tank water.'],
      ['filter', 'Water treatment plant', 'Filtration and treatment.'],
      ['container', 'Purified water storage', 'Hygienic and secure storage.'],
      ['credit-card', 'Smart Water ATM', 'Pay-per-use access.'],
      ['users', 'Community access', 'Safe drinking water for all.'],
      ['layout-dashboard', 'Digital monitoring and reporting', 'Real-time data, transparent operations.'],
    ],
    sources: [['circle-dot', 'Borewell water'], ['waves', 'River water'], ['landmark', 'Municipal water'], ['trees', 'Surface water'], ['container', 'Tank water']],
    // p6
    chain: ['Source', 'Treatment', 'Storage', 'Distribution', 'Community'],
    components: [
      ['filter', 'Water treatment', ['RO plants', 'UV systems', 'UF systems', 'Iron removal systems', 'Customised water treatment']],
      ['droplet', 'Distribution', ['Water ATM', 'Smart dispensing system', 'Community refill station']],
      ['wifi', 'Technology', ['IoT monitoring', 'Cloud dashboard', 'Mobile app', 'Remote diagnostics', 'Water quality monitoring']],
    ],
    // p8 (p8's photographs and the delivery truck are not used)
    access: [
      { ic: 'credit-card', name: 'Water ATM', label: 'Citizens collect water using', list: ['RFID cards', 'Smart cards', 'QR codes', 'Mobile payments', 'UPI payments'], close: 'Safe, convenient access to pure drinking water.' },
      { ic: 'truck', name: 'Water delivery', label: 'How it works', list: ['Local entrepreneurs deliver water', 'Home delivery model', 'Rural employment generation'], close: 'Local entrepreneurs delivering water to every home.' },
      { ic: 'school', name: 'Institutional supply', label: 'Supplies', list: ['Schools', 'Anganwadis', 'Health centers', 'Community buildings'], close: 'Reliable water supply for institutions that build communities.' },
    ],
    accessStrip: [['droplet', 'Inclusive access for all'], ['handshake', 'Supports local entrepreneurs'], ['users', 'Strengthens rural communities'], ['shield-check', 'Safe water, better health']],
    // p7 and p14 (the slide's dashboard figures are not used)
    monitoring: ['Plant health monitoring', 'Water production monitoring', 'Water sales tracking', 'Water quality monitoring', 'Tank level monitoring', 'Equipment status monitoring', 'Service alerts and notifications', 'Predictive maintenance'],
    stakeholders: [
      ['users', 'NGO dashboard', 'Track impact, usage and community benefits in real time.'],
      ['handshake', 'CSR dashboard', 'Monitor projects, KPIs and fund utilisation, transparently.'],
      ['user-cog', 'Operator dashboard', 'Manage operations, equipment and alerts efficiently.'],
      ['landmark', 'Panchayat dashboard', 'Village-level insights for better planning and decision making.'],
    ],
    platform: [['clock', 'Real-time visibility'], ['settings', 'Smart operations'], ['chart-column', 'Data-driven decisions'], ['shield-check', 'Secure and reliable'], ['smartphone', 'Remote access, anytime']],
    // p3 ("Every rupee invested" line not used)
    impact: [
      ['users', 'Social impact', ['Improved public health', 'Reduced disease burden', 'Better school attendance', 'Women empowerment', 'Improved quality of life']],
      ['trending-up', 'Economic impact', ['Reduced healthcare expenditure', 'Increased workforce productivity', 'Local employment generation', 'Sustainable village development']],
      ['leaf', 'Environmental impact', ['Reduced plastic bottle usage', 'Efficient water utilisation', 'Sustainable resource management']],
    ],
    // p12 and p13
    ngo: { transparency: [['file-text', 'Real-time usage reports'], ['droplet', 'Water production reports'], ['users', 'Beneficiary tracking'], ['chart-line', 'Impact analytics']],
           sustainability: [['refresh-cw', 'Reduced operational dependency'], ['house', 'Community ownership model'], ['wrench', 'Professional maintenance support']] },
    institutions: { suitable: ['Schools', 'Hospitals', 'Government institutions', 'Colleges', 'Hostels', 'Industrial communities'],
                    benefits: [['droplet', 'Continuous access to safe water'], ['package', 'Reduced packaged water costs'], ['heart-pulse', 'Improved hygiene'], ['layout-dashboard', 'Digital monitoring and reporting']] },
    // p11: goal numbers and names as text only (no UN icons or colours)
    csr: [['heart-pulse', 'Healthcare'], ['house', 'Rural development'], ['users', 'Community welfare'], ['user-check', 'Women empowerment'], ['graduation-cap', 'Education'], ['sprout', 'Sustainable development']],
    sdgs: [['3', 'Good health and well-being'], ['6', 'Clean water and sanitation'], ['8', 'Decent work and economic growth'], ['11', 'Sustainable cities and communities'], ['13', 'Climate action']],
    // p15: what is measured, never a figure
    kpis: [
      ['users', 'Social', ['People served', 'Families benefited', 'Schools covered', 'Villages covered']],
      ['settings', 'Operational', ['Litres dispensed', 'Plant uptime', 'Water quality compliance']],
      ['chart-column', 'Financial', ['Revenue generated', 'Operational sustainability', 'Maintenance efficiency']],
    ],
    // p16 and p19
    partners: [
      ['users', 'NGO partnership', ['Community implementation', 'Beneficiary mobilisation', 'Impact assessment']],
      ['handshake', 'CSR partnership', ['Project funding', 'Multi-village deployment', 'District-level programmes']],
      ['landmark', 'Government partnership', ['Public infrastructure enhancement', 'Rural development programmes', 'Drinking water initiatives']],
    ],
    partnerWith: [['users', 'NGOs'], ['hand-heart', 'Foundations'], ['shield-check', 'Trusts'], ['landmark', 'Government bodies'], ['globe', 'Development institutions']],
    // p17 and p18
    expertise: [
      ['droplet', 'Water ATMs'], ['house', 'Rural Water Centers'], ['filter', 'RO plant monitoring'], ['test-tube', 'Water quality monitoring'], ['container', 'Tank monitoring'],
      ['gauge', 'Smart water metering'], ['cloud', 'IoT platform'], ['smartphone', 'Mobile apps and dashboards'], ['monitor', 'Remote monitoring center'],
    ],
    vision: 'To create a network of sustainable Rural Water Centers that ensure access to safe drinking water for every rural community.',
    together: [['heart-pulse', 'Improve health'], ['users', 'Empower communities'], ['sprout', 'Create sustainable impact'], ['house', 'Build water secure villages']],
    // p9, qualitative, the table last: [area, traditional water projects, Rural Water Center model]
    compare: {
      rows: [
        ['Funding', 'High dependence on donations', 'Community participation'],
        ['Maintenance', 'Poor maintenance', 'Long-term maintenance'],
        ['Accountability', 'No accountability', 'Real-time monitoring and transparent reporting'],
        ['Equipment', 'Equipment failure after a few years', 'Sustainable operations'],
        ['Outcome', 'Short-term funding leads to long-term failures and wasted resources', 'A self-sustaining model for reliable service, accountability and long-term impact'],
      ],
      note: 'A qualitative comparison from the Sygnet Rural Water Center catalogue.',
    },
    models: [],
    faq: [],
  },
  {
    slug: 'textile-connect', img: null, icon: 'factory', menu: 'Production, energy and utilities for mills', short: 'Textile Connect', name: 'Sygnet Textile Connect', code: 'Textile',
    tier: 'priority', window: 'textile', industries: ['manufacturing', 'energy'], layout: 'textile',
    one: 'Machine, production, OEE, energy and utility monitoring for mills.',
    // 2026-11-20 rebuilt on the bell-page pattern from Sygnet Textile Connect Catalog.pdf (pages.mjs textilePage):
    // centred intro, a layer viewer (#production, #energy, #utility, #business), the 12 solutions, a value-chain
    // viewer, ERP and BI, ROI levers, why choose, the focus-area table last. Client rules: never use p2 (the
    // "leakages" slide) nor "profit leakage" wording; no figures, percentages, ERP logos, machine or factory photos,
    // dashboards from the PDF; no related-products block.
    title: 'Sygnet Textile Connect: operational intelligence for textile mills',
    desc: 'Sygnet Textile Connect for textile mills and factories: production, energy, utility and business intelligence on one platform, from spinning to garments, with ERP integration and executive dashboards.',
    eyebrow: 'Textile Connect · For textile mills and factories',
    h1: 'Operational intelligence for modern textile manufacturing',
    lead: 'Connect machines, energy, utilities and business systems on one platform, so management sees production and cost in real time.',
    chips: ['Monitor', 'Analyse', 'Optimise', 'Profit'],
    // p4 "One platform. Complete factory visibility.": the four intelligence layers, in the slide's words
    layers: [
      { id: 'production', code: 'Layer 01', tab: 'Production', icon: 'factory', name: 'Production Intelligence', screen: 'production',
        line: 'Every machine, every shift, in one view.',
        text: 'Machines report when they run, idle and stop, and what they produce, so production and OEE are measured as they happen.',
        points: ['Machine monitoring', 'Production monitoring', 'OEE analysis', 'Machine utilisation', 'Production counting', 'Shift performance', 'Operator productivity', 'Downtime analysis'],
        close: 'See the shop floor without walking it.' },
      { id: 'energy', code: 'Layer 02', tab: 'Energy', icon: 'zap', name: 'Energy Intelligence', screen: 'energy',
        line: 'Know where the power goes.',
        text: 'Consumption, demand and power quality are measured at the panels that matter, so energy is tied to the machines that use it.',
        points: ['Energy monitoring', 'Power quality monitoring', 'Demand monitoring', 'Load analysis', 'Power factor monitoring', 'Harmonics analysis'],
        close: 'Energy, measured where it is used.' },
      { id: 'utility', code: 'Layer 03', tab: 'Utility', icon: 'droplet', name: 'Utility Intelligence', screen: 'utility',
        line: 'The utilities that feed the floor, on the same screen.',
        text: 'Compressors, DG sets, solar, water and RO plants are watched alongside production, not in separate logbooks.',
        points: ['Air compressor monitoring', 'DG set monitoring', 'Solar monitoring', 'Water tank monitoring', 'Borewell monitoring', 'Water meter monitoring', 'Pump monitoring', 'RO plant monitoring'],
        close: 'Utilities in step with production.' },
      { id: 'business', code: 'Layer 04', tab: 'Business', icon: 'chart-line', name: 'Business Intelligence', screen: 'business',
        line: 'From operational data to management decisions.',
        text: 'Dashboards, alerts and reports turn machine, energy and utility data into the view owners and managers need, on the web and on the phone.',
        points: ['Executive dashboards', 'AI analytics', 'Smart alerts', 'KPI reports', 'Mobile monitoring', 'Historical reports', 'Predictive maintenance', 'Multi-factory monitoring'],
        close: 'Real-time visibility. Smarter operations. Higher profitability.' },
    ],
    // p1 "Our solutions": twelve, one line each (no specifications)
    solutions: [
      ['cpu', 'Machine monitoring', 'Running, idle and stopped status for every machine, live.'],
      ['chart-column', 'Production monitoring', 'Production counted by machine and by shift.'],
      ['zap', 'Energy monitoring', 'Consumption and power quality at the panels that matter.'],
      ['wind', 'Air compressor monitoring', 'Running status and electricity use of each compressor.'],
      ['sun', 'Solar plant monitoring', 'Solar generation tracked, so underperformance shows early.'],
      ['fuel', 'DG set monitoring', 'Running status and fuel use of each DG set.'],
      ['droplet', 'Water monitoring', 'Water tanks, borewells and water meters on one screen.'],
      ['filter', 'RO plant monitoring', 'RO plant status, so inefficiency is caught early.'],
      ['gauge', 'Utility monitoring', 'Pumps, chillers, boilers and other utilities beside production.'],
      ['brain', 'AI analytics', 'Insights drawn from machine, energy and utility data.'],
      ['workflow', 'ERP integration', 'Shop-floor data flows into the ERP the factory already uses.'],
      ['chart-pie', 'Business intelligence', 'Executive dashboards and KPI reports for management.'],
    ],
    // p5 "Designed for the complete textile value chain": seven stages, then the factory utilities
    chain: [
      { id: 'spinning', code: 'Stage 01', tab: 'Spinning mills', icon: 'orbit', name: 'Spinning mills',
        line: 'From carding to autoconers, with the humidification around them.',
        machines: ['Ring frames', 'Open-end (OE)', 'Carding', 'Draw frames', 'Simplex', 'TFO machines', 'Autoconers', 'Humidification systems'] },
      { id: 'warping-sizing', code: 'Stage 02', tab: 'Warping and sizing', icon: 'rows-3', name: 'Warping and sizing',
        line: 'Beams prepared for the looms, every machine in view.',
        machines: ['Direct warping', 'Sectional warping', 'Beam handling', 'Sizing machines'] },
      { id: 'weaving', code: 'Stage 03', tab: 'Weaving units', icon: 'grid-2x2', name: 'Weaving units',
        line: 'Every loom type the weaving shed runs.',
        machines: ['Power looms', 'Rapier looms', 'Air jet looms', 'Water jet looms', 'Jacquard looms', 'Dobby looms', 'Projectile looms'] },
      { id: 'dyeing', code: 'Stage 04', tab: 'Dyeing and processing', icon: 'palette', name: 'Dyeing and processing',
        line: 'Dyeing, drying and finishing on one screen.',
        machines: ['Jet dyeing', 'Soft flow', 'Jiggers', 'Stenters', 'Calendering', 'Compacting', 'Washing', 'Finishing lines'] },
      { id: 'knitting', code: 'Stage 05', tab: 'Knitting units', icon: 'infinity', name: 'Knitting units',
        line: 'Circular, flat and warp knitting.',
        machines: ['Circular knitting', 'Flat knitting', 'Warp knitting'] },
      { id: 'embroidery', code: 'Stage 06', tab: 'Embroidery units', icon: 'flower-2', name: 'Embroidery units',
        line: 'Multi-head and computerised embroidery.',
        machines: ['Multi-head embroidery', 'Computerised embroidery'] },
      { id: 'garment', code: 'Stage 07', tab: 'Garment manufacturing', icon: 'shirt', name: 'Garment manufacturing',
        line: 'From the cutting table to the packing line.',
        machines: ['Cutting machines', 'Sewing machines', 'Fabric spreaders', 'Pressing stations', 'Packing lines', 'Finishing lines'] },
    ],
    utilities: [['wind', 'Compressors'], ['fuel', 'DG sets'], ['sun', 'Solar plants'], ['zap', 'Electrical panels'], ['gauge', 'Pumps'], ['droplet', 'Water tanks'],
      ['waves', 'Borewells'], ['filter', 'RO plants'], ['snowflake', 'Chillers'], ['fan', 'Cooling towers'], ['flame', 'Boilers'], ['thermometer', 'HVAC systems']],
    // p6 "ERP integration and business intelligence": names as plain text, never the vendors' logos
    erps: ['SAP Business One', 'Microsoft Dynamics 365', 'Oracle NetSuite', 'Focus ERP', 'TallyPrime', 'BUSY', 'Textile industry ERPs', 'Custom ERP solutions'],
    erpData: [['clipboard-list', 'Production orders'], ['activity', 'Machine performance'], ['chart-column', 'Production quantity'], ['zap', 'Energy consumption'], ['droplet', 'Utility consumption'],
      ['wrench', 'Maintenance records'], ['package', 'Inventory'], ['users', 'Operator performance'], ['calendar-clock', 'Shift data'], ['clipboard-check', 'Quality parameters']],
    erpBi: [['chart-line', 'Production vs energy cost'], ['coins', 'Machine-wise profitability'], ['scale', 'Cost per unit produced'], ['zap', 'Energy cost per product'], ['trending-up', 'Utility consumption trends'],
      ['layout-dashboard', 'Plant-wise KPI dashboard'], ['gauge', 'OEE reports'], ['wrench', 'Maintenance analytics'], ['file-chart-column', 'Management MIS reports']],
    erpTrio: [['network', 'One platform', 'Unified data from machines, utilities and business systems.'],
      ['layout-dashboard', 'One dashboard', 'Real-time insights for better visibility and faster decisions.'],
      ['shield-check', 'One source of truth', 'Accurate, reliable and actionable business data.']],
    // p7 "Return on investment": the levers only; the slide's percentages are never shown
    roi: [
      { icon: 'trending-up', title: 'Increase revenue', points: ['Improve machine availability', 'Increase production output', 'Improve OEE', 'Maximise equipment utilisation'] },
      { icon: 'piggy-bank', title: 'Reduce costs', points: ['Lower electricity bills', 'Reduce water consumption', 'Minimise compressor losses', 'Reduce diesel consumption', 'Prevent equipment failures', 'Lower maintenance expenses', 'Eliminate manual reporting'] },
      { icon: 'layout-dashboard', title: 'Improve management', points: ['Live dashboards', 'Mobile monitoring', 'Instant alerts', 'AI-based insights', 'Historical trends', 'Faster decision making'] },
    ],
    // p7 "Why choose Sygnet Textile Connect?"
    why: [['factory', 'Purpose-built for textile industries'], ['blocks', 'Modular and scalable architecture'], ['cloud', 'Cloud or on-premise deployment'], ['workflow', 'ERP, PLC and SCADA integration'],
      ['shield-check', 'Secure MQTT communication'], ['smartphone', 'Android, iOS and web applications'], ['download', 'OTA firmware updates'], ['building-2', 'Multi-factory support'],
      ['brain', 'AI-ready platform'], ['map-pin', 'Made in India']],
    // p3 table, first column renamed "Focus area" and phrased neutrally (client, 2026-11-20)
    focus: [
      ['Machine downtime', 'Machine monitoring', 'Increased production'],
      ['Low machine utilisation', 'Production analytics', 'Higher productivity'],
      ['Poor OEE', 'OEE dashboard', 'Better asset utilisation'],
      ['High electricity bills', 'Energy monitoring', 'Lower energy cost'],
      ['Poor power quality', 'Power quality monitoring', 'Reduced equipment failure'],
      ['Air compressor inefficiency', 'Compressor monitoring', 'Lower electricity consumption'],
      ['Solar underperformance', 'Solar monitoring', 'Maximum energy generation'],
      ['Excess DG fuel consumption', 'DG monitoring', 'Lower diesel cost'],
      ['Water wastage', 'Water monitoring', 'Reduced utility cost'],
      ['RO plant inefficiency', 'RO monitoring', 'Lower operating cost'],
      ['Reactive maintenance', 'Predictive maintenance', 'Lower maintenance expenses'],
      ['Delayed decision making', 'AI dashboards', 'Faster management decisions'],
    ],
    about: 'Sygnet Textile Connect is an industrial IoT platform for textile mills and factories. It brings production, energy, utility and business intelligence together: machine, production and OEE monitoring, energy and power quality, compressors, DG sets, solar, water and RO plants, with ERP integration, executive dashboards, alerts and reports on the web and on Android and iOS. It covers spinning, warping and sizing, weaving, dyeing and processing, knitting, embroidery and garment units. Sygnet IoT is based in Surat, Gujarat, India.',
    partsHead: ['What it watches.', 'The whole mill, not just the machines.'],
    parts: [
      ['Machine and production', 'Running, stopped and idle states for each machine, with production by shift.'],
      ['OEE', 'Availability, performance and quality worked out from the machine data.'],
      ['Energy and power quality', 'Consumption and power quality at the panels that matter.'],
      ['Utilities', 'Compressor, DG set, solar, RO plant and borewell on the same screen.'],
      ['ERP integration', 'Production data flows to the ERP the mill already uses.'],
      ['Executive BI', 'Plant-level reports for owners and managers.'],
    ],
    modelsHead: ['Specifications.', 'Coming with the catalogue.'],
    models: [],
    benefitsHead: ['Made for Surat mills.', 'One view from loom to boardroom.'],
    benefits: [
      ['Mill owners', 'A plant view without walking the floor.'],
      ['Production managers', 'Stoppages show as they happen, by machine and by shift.'],
      ['Maintenance and utilities', 'Compressors, DG sets and pumps are watched alongside production.'],
    ],
    faq: [],
  },
  {
    // 2026-11-20 rebuilt on the bell-page pattern (pages.mjs simplePage). No catalogue, flyer or picture exists yet, so
    // the page uses only the site's own earlier wording: no specifications, models, figures or screens, and no selector
    // cards (one product). The picture is the brand's hexagon illustration with a "Coming soon" tag.
    slug: 'energy-monitoring', img: null, icon: 'zap', menu: 'Coming soon', short: 'Energy Monitoring', name: 'Sygnet Energy Monitoring', code: 'Energy',
    tier: 'priority', window: 'energy', industries: ['energy', 'building', 'manufacturing'], soon: true, layout: 'simple',
    one: 'Coming soon: energy and water monitoring for AC, lifts, pumps and VFDs.',
    title: 'Sygnet Energy Monitoring: coming soon',
    desc: 'Sygnet Energy Monitoring is coming soon: energy use of AC, lifts, pumps and VFDs, and water consumption and leakage detection for industry.',
    eyebrow: 'Energy Monitoring · Coming soon',
    h1: 'Energy monitoring, coming soon',
    lead: 'We are preparing an energy monitoring product for the equipment that drives operating costs: AC, lifts, pumps and VFDs. It will also track water consumption and leakage for industry.',
    view: {
      code: 'Coming soon', name: 'Sygnet Energy Monitoring', line: 'Where operating costs hide',
      text: 'Energy monitoring for the largest loads on a site, and water monitoring for industry. The catalogue is not ready yet.',
      pointsLabel: 'What it will cover',
      points: [
        ['fan', 'AC and lifts', 'Consumption of the largest loads in clubs, gyms and hospitals.'],
        ['gauge', 'Pumps and VFDs', 'Running hours and energy of pumps and variable-frequency drives.'],
        ['droplet', 'Water consumption', 'How much water a site uses, and where.'],
        ['triangle-alert', 'Leakage detection', 'Unusual flow that points to a leak in an industrial line.'],
      ],
      ill: 'zap', illTag: 'Coming soon', illLabel: 'Sygnet Energy Monitoring: product picture to follow, product coming soon',
      awaiting: 'Catalogue, specifications and product pictures',
    },
    where: { head: ['Where it fits.', 'Lower operating costs.'], items: [
      ['dumbbell', 'Clubs and gyms', 'AC and pumps run long hours; seeing their use is the first step to cutting it.'],
      ['hospital', 'Hospitals', 'Lifts, AC and pumps run around the clock.'],
      ['factory', 'Industry', 'Water use and leaks across plant lines.'],
    ] },
    close: { h2: 'Tell us what you want to measure', line: 'We will show you Sygnet IoT Connect on your site today, and come back to you when the Energy Monitoring catalogue is ready.' },
    models: [],
    faq: [],
  },
  {
    // content from content/flyers/Sygnet Dairy Connect_26-1.pdf (17 pages). Own layout (pages.mjs dairyPage), built
    // like the School Bell & PA page: centred intro, a two-model viewer, then the catalogue's sections. Left out on
    // the client's instruction: "Challenges faced by dairies today" (p2), "Smarter operations. Lower costs. Higher
    // profits." (p7), "Increased milk sales" (p8) and the "Vendor scaling scheme" (p15). No capacities, costs,
    // savings, earnings or dashboard figures anywhere; the catalogue's info@/ping@ addresses are not used.
    slug: 'dairy-connect', card: 'dairy-milk-atm-cut', img: 'dairy-milk-atm', icon: 'milk', menu: 'Community and Mobile Milk ATMs', short: 'Dairy Connect', name: 'Sygnet Dairy Connect', code: 'Dairy',
    tier: 'secondary', window: 'dairy', industries: ['agriculture'], layout: 'dairy',
    one: 'Monitoring for milk collection, cooling, chilling and tankers.',
    title: 'Sygnet Dairy Connect: Community and Mobile Milk ATMs for dairies',
    desc: 'Sygnet Dairy Connect for dairies and cooperatives: Community Milk ATM kiosks and Mobile Milk ATMs with cashless payment, IoT monitoring and one dashboard on Sygnet IoT Connect.',
    eyebrow: 'Dairy Connect · For dairies and cooperatives',
    h1: 'Smart milk distribution for modern dairies',
    lead: 'Automated Milk ATMs, connected to one platform, so your dairy sells milk around the clock with less manual work.',
    // pp. 4, 6, 14: the two models. id: the panel id and URL hash; img: the viewer cut-out (build/tools/cutout_dairy.py)
    range: [
      { id: 'community', code: 'Model 1 · Kiosk', name: 'Community Milk ATM', tab: 'Community Milk ATM (kiosk)', img: 'dairy-kiosk-cut',
        line: 'Fixed installation for 24x7 community access',
        text: 'A chilled, self-service milk kiosk placed where people live. Customers bring their own container, pay without cash and take the quantity they want, at any hour, with no one needed at the counter.',
        benefits: ['24x7 milk availability', 'Hygienic and safe dispensing', 'No manpower at the outlet', 'Bring your own container', 'Cashless and smart payments'],
        ideal: ['Villages', 'Housing societies', 'Apartment complexes', 'Rural centers', 'Dairy outlets'],
        where: 'Villages, housing societies, apartment complexes, rural collection centers' },
      { id: 'mobile', code: 'Model 2 · On wheels', name: 'Mobile Milk ATM', tab: 'Mobile Milk ATM (on wheels)', img: 'dairy-mobile-cut',
        line: 'On-wheels milk distribution, anywhere, anytime',
        text: 'A stainless milk tank and dispensing units on a light vehicle. It takes chilled milk along a route, to a colony or to an event, and customers fill and pay at the vehicle.',
        benefits: ['Reach more customers', 'Flexible timings and routes', 'Fresh milk with chilled storage', 'Operates with minimal staff', 'Expand business faster'],
        ideal: ['Doorstep delivery', 'Urban routes and colonies', 'Events and fairs', 'Rural outreach programs', 'Areas without permanent outlets'],
        where: 'Urban routes, doorstep delivery, events, rural outreach' },
    ],
    // p. 5
    how: [
      ['milk', 'Automated dispensing', 'Consistent, hygienic dispensing with no one at the counter.'],
      ['credit-card', 'Digital payments', 'Cashless and accurate, recorded as each sale happens.'],
      ['activity', 'Real-time monitoring', 'Every machine reports its status as it runs.'],
      ['file-text', 'Auto reports', 'Sales and dispensing reports without manual records.'],
      ['settings', 'Remote management', 'Machines managed from anywhere, not on site.'],
    ],
    // p. 10
    payMethods: [
      ['smartphone', 'UPI', 'Pay using any UPI app'],
      ['qr-code', 'QR code', 'Scan and pay instantly'],
      ['wallet', 'Wallet', 'Pay using e-wallets'],
      ['wallet-cards', 'RFID smart card', 'Tap your smart card'],
      ['refresh-cw', 'Online recharge', 'Recharge online anytime'],
      ['landmark', 'Direct payment', 'Pay directly at the machine'],
    ],
    payBenefits: [
      ['banknote', 'No cash handling', 'No cash to collect, count or store.'],
      ['check-check', 'No reconciliation issues', 'Automatic digital records keep the books straight.'],
      ['shield-check', 'Reduced fraud', 'Secure and transparent transactions.'],
      ['zap', 'Faster transactions', 'Quick, simple payments at the machine.'],
    ],
    paySupports: [
      ['user-cog', 'Vendor recharge', 'Vendors recharge anytime, anywhere.'],
      ['smartphone', 'Online recharge for customers', 'Customers top up online and use the balance at the machine.'],
      ['landmark', 'Direct machine payment', 'Pay at the machine with several options.'],
    ],
    // p. 11
    monitor: [['thermometer', 'Milk temperature'], ['gauge', 'Tank level'], ['milk', 'Dispensed quantity'], ['lock-open', 'Door open status'], ['plug-zap', 'Power status'], ['antenna', 'GSM connectivity'], ['activity', 'Machine health']],
    alerts: [['triangle-alert', 'Low milk stock'], ['unplug', 'Power failure'], ['snowflake', 'Cooling failure'], ['shield-x', 'Unauthorized access'], ['signal', 'Communication failure']],
    monitorHi: [['clock', 'Real-time data, 24x7'], ['bell-ring', 'Instant alerts on critical events'], ['cloud', 'Remote access from anywhere'], ['chart-column', 'Data-driven decisions'], ['shield-check', 'Uptime and operational efficiency']],
    // p. 9
    rsmsWatch: ['Sales per ATM', 'Revenue collection', 'Milk dispensed', 'Tank level', 'Machine health', 'Operator activities', 'Payment collections'],
    rsmsModules: [
      ['chart-column', 'Revenue dashboards', 'Revenue insights, collections, trends and performance.'],
      ['settings', 'Machine management', 'Machine status, health, uptime, alarms and remote diagnostics.'],
      ['wallet-cards', 'Card management', 'RFID cards, customers, limits, top-ups and transactions.'],
      ['chart-pie', 'Reports and analytics', 'Reports on sales, milk dispensed, revenue and collection.'],
      ['headphones', 'Support monitoring', 'Support tickets, service requests and resolution status.'],
    ],
    // p. 12: the tank cut-away's four callouts and the page's features, in calm words
    quality: [
      ['snowflake', 'Chilled storage tank', 'An SS 304 food-grade tank that keeps milk cold until it is dispensed.'],
      ['refresh-cw', 'Continuous agitation', 'An agitator motor keeps the milk mixed, to help prevent fat separation.'],
      ['layers', 'Insulation', 'High-density insulation helps hold the milk at a low temperature.'],
      ['thermometer', 'Temperature sensor', 'Milk temperature is monitored in real time.'],
      ['milk', 'Automated dispensing', 'Designed for accurate, hygienic and consistent dispensing.'],
      ['hand', 'Reduced human contact', 'Less handling between the tank and the customer’s container.'],
    ],
    // p. 13
    environment: [
      ['recycle', 'Reduced plastic pouch consumption', 'Milk is sold loose, not in single-use pouches.'],
      ['milk', 'Bring-your-own-container model', 'Customers fill their own can or bottle.'],
      ['wallet', 'Lower packaging cost', 'Less spent on pouches and packing.'],
      ['trash-2', 'Reduced waste', 'Less packaging to throw away.'],
      ['globe', 'Support for ESG goals', 'Helps a dairy work towards its sustainability goals.'],
    ],
    // p. 16: integration possibilities. A fourth value true = not live yet, shown as "Roadmap" (client instruction)
    future: [
      ['milk', 'Milk ATM network', 'Real-time monitoring of every ATM for sales, stock and health.'],
      ['building-2', 'BMC monitoring', 'Bulk milk coolers watched from collection to distribution.'],
      ['snowflake', 'Cold chain monitoring', 'Temperature followed across the cold chain.'],
      ['truck', 'Vehicle tracking', 'Live location of milk tankers and delivery vehicles.'],
      ['smartphone', 'Customer mobile app', 'Nearby ATMs, payments, offers and support on a phone.'],
      ['route', 'Route optimization', 'Data-driven routes that save fuel and time.', true],
      ['gift', 'Loyalty program', 'Rewards that bring customers back.', true],
      ['calendar-clock', 'Subscription model', 'Recurring deliveries for regular customers.', true],
      ['store', 'Franchise management', 'Onboard, manage and grow a franchise network.', true],
      ['wrench', 'Predictive maintenance', 'Early warning before a machine needs service.', true],
    ],
    // p. 3 (rows and their wording) and p. 6; qualitative only: [parameter, traditional, Sygnet Milk ATM]
    compare: {
      rows: [
        ['Manpower', 'Booth staff and vendors needed', 'Minimal: the system is automated'],
        ['Availability', 'Fixed booth hours', 'Around the clock, 24x7'],
        ['Cash handling', 'Cash collection and reconciliation', 'Cashless: digital payments and smart cards'],
        ['Monitoring', 'Manual, no real-time view', 'Real-time IoT monitoring and alerts'],
        ['Milk quality and hygiene', 'Handled in open containers', 'Sealed, chilled tank with less human contact'],
        ['Scalability', 'Each new outlet needs a booth and staff', 'More machines, run from one dashboard'],
        ['Customer experience', 'Queues and fixed pack sizes', 'Self-service, any quantity, any time'],
        ['Packaging', 'Plastic pouches', 'Bring your own container'],
      ],
      note: 'A qualitative comparison from the Sygnet Dairy Connect catalogue.',
    },
    about: 'Sygnet Dairy Connect gives dairies and milk cooperatives automated Milk ATMs on the Sygnet IoT Connect platform: the Community Milk ATM, a chilled self-service kiosk for villages, housing societies and apartment complexes, and the Mobile Milk ATM, a milk tank with dispensing units on a vehicle for routes, doorstep delivery and events. Customers pay by UPI, QR code, wallet or RFID card and bring their own container. Each machine reports milk temperature, tank level, sales and alerts to one dashboard. Sygnet IoT is based in Surat, Gujarat, India.',
    models: [],
    faq: [],
  },
  {
    // 2026-11-20 rebuilt on the bell-page pattern (pages.mjs simplePage) from content/flyers/smart-milk-vending-flyer.jpg,
    // the only source. One product: a single large view, no selector cards. The picture is the flyer's machine with the
    // "Powered by Paytm" sticker painted out (build/tools/cutout_remaining.py). The flyer's laptop and phone dashboards are
    // not used; the drawn screen carries sample states only. "Where it fits" is the site's earlier wording.
    slug: 'smart-milk-vending', card: 'smart-milk-vending-clean-cut', img: 'flyer-smart-milk-vending', icon: 'milk', menu: 'Chilled milk, card or Paytm', short: 'Smart Milk Vending', name: 'Sygnet Smart Milk Vending', code: 'Milk',
    tier: 'secondary', window: 'milk', industries: ['agriculture', 'retail'], layout: 'simple',
    one: 'Chilled milk vending up to 500 L, with card or Paytm payment.',
    title: 'Sygnet Smart Milk Vending machine with chiller and auto-cleaning',
    desc: 'Sygnet Smart Milk Vending: a plug-and-play machine up to 500 litres, cow and buffalo milk options, card or Paytm payment, hot water auto-cleaning, chiller, battery backup and an online dashboard.',
    eyebrow: 'Smart Milk Vending · For dairies, societies and retail',
    h1: 'Smart milk vending machines',
    lead: 'A plug-and-play chilled milk dispenser with cow and buffalo options, card or Paytm payment and built-in hot water cleaning. Revenue and recharges show on an online dashboard.',
    tagline: ['Fresh. Hygienic. ', 'Automated.'],
    chips: [['plug', 'Plug and play'], ['milk', 'Cow and buffalo'], ['credit-card', 'Card and Paytm']],
    view: {
      img: 'smart-milk-vending-clean-cut', code: 'Vending machine', name: 'Sygnet Smart Milk Vending', line: 'Fresh. Hygienic. Automated.',
      text: 'A complete machine, ready to install, that keeps milk chilled, dispenses it at the machine and takes cashless payment.',
      pointsLabel: 'Key features',
      points: [
        ['plug', 'Complete plug and play', 'A ready-to-install machine.'],
        ['container', 'Up to 500 litres', 'Available in capacities up to 500 litres.'],
        ['milk', 'Cow and buffalo', 'Dual milk options from one machine.'],
        ['credit-card', 'Card and Paytm', 'Cashless payment at the machine.'],
        ['droplet', 'Hot water auto-cleaning', 'A built-in hot water cleaning system.'],
        ['battery-full', 'Battery backup', 'A built-in battery keeps vending running.'],
        ['snowflake', 'Heavy-duty chiller', 'A chiller for dispensing.'],
        ['cloud', 'IoT dashboard', 'Online revenue monitoring and recharge.'],
      ],
      awaiting: 'Model-wise capacities, dimensions and power ratings',
    },
    monitor: {
      head: ['Online monitoring dashboard.', 'Revenue and recharge, online.'], label: 'What the dashboard gives you', screen: 'milk',
      items: [['activity', 'Real-time monitoring'], ['chart-column', 'Analytics'], ['bell-ring', 'Alerts'], ['settings', 'Remote management'], ['wallet-cards', 'Online revenue monitoring and recharge']],
    },
    where: { head: ['Where it fits.', 'Dairies, societies and retail points.'], items: [
      ['milk', 'Dairies', 'Sell direct to customers without a staffed counter.'],
      ['building-2', 'Housing societies', 'Fresh milk at the gate, paid by card or Paytm.'],
      ['store', 'Retail points', 'A self-service milk counter with cleaning built in.'],
    ] },
    close: { h2: 'See Smart Milk Vending working for your dairy', line: 'Tell us where the machine will stand and we will walk you through the machine, the payment options and the dashboard.' },
    models: [],
    faq: [],
  },
  {
    // 2026-11-20 rebuilt on the bell-page pattern (pages.mjs simplePage) from content/flyers/napkin-vending-flyer.jpg, the
    // only source. One product: a single large view, no selector cards. Not used: the flyer's dashboard and impact figures
    // (machines, napkins, women, uptime), its map and location bars, and the photograph of the girl. The drawn screen
    // carries sample states only. Feature lines are the site's earlier wording of the flyer's six icons.
    slug: 'napkin-vending', card: 'napkin-vending-cut', img: 'flyer-napkin-vending', icon: 'heart', menu: 'Napkin vending with usage records', short: 'Napkin Vending', name: 'Sygnet Napkin Vending', code: 'Napkin',
    tier: 'secondary', window: 'napkin', industries: ['education', 'retail'], layout: 'simple',
    one: 'Cash or token napkin vending, with impact measured online.',
    title: 'Sygnet Napkin Vending machine for schools, colleges and NGO programmes',
    desc: 'Sygnet Napkin Vending: cash or token operated sanitary napkin vending machines with hygienic dispensing and online monitoring, for schools, colleges, public toilets, workplaces and NGO programmes.',
    eyebrow: 'Napkin Vending · For schools, NGOs and workplaces',
    h1: 'Napkin vending machine solutions',
    lead: 'A cash or token operated napkin vending machine with hygienic dispensing, and online monitoring that helps NGOs and institutions track usage and measure the impact of a menstrual hygiene programme.',
    tagline: ['Smart. Hygienic. ', 'Empowering.'],
    chips: [['heart', 'Promoting menstrual hygiene'], ['hand-heart', 'Driving social impact'], ['chart-column', 'Measuring what matters']],
    view: {
      img: 'napkin-vending-cut', code: 'Vending machine', name: 'Sygnet Napkin Vending Machine', line: 'Empowering hygiene. Enabling dignity.',
      text: 'Sygnet napkin vending machines give easy access to sanitary napkins, while IoT monitoring helps NGOs track usage, measure impact and bring transparency to menstrual hygiene programmes.',
      pointsLabel: 'Key features',
      points: [
        ['coins', 'Cash or token operated', 'Quick access to napkins.'],
        ['package', 'Hygienic dispensing', 'Individually packed napkins, dispensed touch-free.'],
        ['activity', 'Real-time monitoring', 'Usage and location-wise consumption on the platform.'],
        ['cloud', 'Remote management', 'Machines are managed without a site visit.'],
        ['leaf', 'Low power consumption', 'Draws little power at the point of use.'],
        ['shield-check', 'Rugged and reliable', 'Built for schools, public toilets and workplaces.'],
      ],
      awaiting: 'Napkin capacity, dimensions and power ratings',
    },
    empower: { head: ['Empowering women.', 'Enabling change.'], items: [
      ['hand', 'Easy access', 'Quick access to napkins where they are needed.'],
      ['package', 'Hygienic and safe', 'Individually packed, touch-free dispensing.'],
      ['shield-check', 'Dignity and privacy', 'Empowering women with respect.'],
      ['chart-line', 'Sustainable impact', 'Data-driven insights for better decisions.'],
    ] },
    monitor: {
      head: ['Transparent impact.', 'Track. Measure. Transform.'], label: 'Key insights', screen: 'napkin',
      items: [['activity', 'Real-time usage monitoring'], ['map-pin', 'Location-wise consumption'], ['users', 'Beneficiary impact tracking'], ['file-text', 'Automated reports for donors and stakeholders'], ['chart-column', 'Data-driven decision making']],
    },
    why: { head: ['Why NGOs choose Sygnet.', 'One partner from machine to report.'], items: [
      ['layers', 'End-to-end solution: hardware and software'], ['trending-up', 'Scalable'], ['file-chart-column', 'Transparent impact measurement'],
      ['wrench', 'Easy installation and low maintenance'], ['headphones', 'Dedicated support and training'],
    ] },
    where: { head: ['Where it fits.', 'Ideal for these places.'], items: [
      ['school', 'Schools and colleges'], ['bath', 'Public toilets'], ['hand-heart', 'NGO programmes'], ['building-2', 'Workplaces'], ['sprout', 'Rural initiatives'],
    ] },
    close: { h2: 'Bring napkin vending to your programme', line: 'Tell us about the schools, workplaces or communities you serve and we will show you the machine and the impact reports.' },
    models: [],
    faq: [],
  },
  {
    // 2026-11-20 rebuilt on the bell-page pattern (pages.mjs simplePage). No flyer, photograph or specification has come
    // from the client yet: the page uses only the site's earlier wording. One product, no selector cards; the picture is
    // the brand's hexagon illustration with one "Awaiting from client" chip. No screen, figures or models.
    slug: 'reverse-vending', img: null, icon: 'recycle', menu: 'Bottle and can collection', short: 'Reverse Vending', name: 'Sygnet Reverse Vending', code: 'RVM',
    tier: 'secondary', window: 'rvm', industries: ['smart-city', 'retail'], layout: 'simple',
    one: 'Collects used bottles and cans, with every collection logged.',
    title: 'Sygnet Reverse Vending machine for bottle and can collection',
    desc: 'Sygnet Reverse Vending machine: collects used bottles and cans in public places and stores, with every collection logged on Sygnet IoT Connect.',
    eyebrow: 'Reverse Vending · For cities, stores and recycling',
    h1: 'Reverse vending machines for bottles and cans',
    lead: 'People return used bottles and cans to the machine instead of the bin. Every collection is logged on Sygnet IoT Connect, for municipalities, stores and recycling programmes.',
    view: {
      code: 'Collection point', name: 'Sygnet Reverse Vending Machine', line: 'Collection you can count',
      text: 'A collection point for used bottles and cans that reports every collection to Sygnet IoT Connect, wherever it stands.',
      pointsLabel: 'What it does',
      points: [
        ['recycle', 'Collects used containers', 'Bottles and cans go into the machine, not the street.'],
        ['clipboard-list', 'Logged collections', 'Each collection is recorded on the platform.'],
        ['wifi', 'Connected', 'Each machine reports to Sygnet IoT Connect, wherever it stands.'],
      ],
      ill: 'recycle', illTag: 'Awaiting from client', illLabel: 'Sygnet Reverse Vending: product picture awaited from Sygnet',
      note: 'Flyer, photographs and specifications to follow.',
    },
    how: { head: ['How it works.', 'From the bin to the record.'], items: [
      ['recycle', 'A bottle or can is returned', 'People drop used containers into the machine instead of the bin.'],
      ['clipboard-list', 'The collection is logged', 'Each collection is recorded on Sygnet IoT Connect.'],
      ['file-chart-column', 'Data for reports', 'Collection data is ready for municipal and recycling programme reports.'],
    ] },
    where: { head: ['Where it fits.', 'Cities and stores.'], items: [
      ['landmark', 'Municipalities', 'Collection points in public places, with records.'],
      ['store', 'Stores and malls', 'A return point that brings people back in.'],
      ['recycle', 'Recycling programmes', 'Collection data for reports.'],
    ] },
    close: { h2: 'Plan a collection point with us', line: 'Tell us where bottles and cans should be collected and we will walk you through Reverse Vending on Sygnet IoT Connect.' },
    models: [],
    faq: [],
  },
];

export const productBySlug = Object.fromEntries(PRODUCTS.map(p => [p.slug, p]));

// ---------------------------------------------------------------- brochures
// One brochure per product page, keyed by product slug. Every "Download brochure" button on that page (the in-page
// buttons and the floating one) opens the same form (layout.mjs brochureDialog), and the file downloads only after
// the form is sent. One file per product: tiers and models (NCS, QMS, Bell) share their product's brochure.
// Fill a value with a site path ('/assets/brochures/ncs.pdf', file placed under site/) or a full https:// URL.
// While a value is empty, the form still takes the details and answers "Thank you. We will send the brochure to you
// shortly." with no download. The build stops if a site path points at a file that is not there (build.mjs).
export const BROCHURE_URL = {
  'nurse-call-system': '',
  'queue-management-system': '',
  'school-bell-pa-system': '',
  'water-atm': '',
  'rural-water-center': '',
  'textile-connect': '',
  'energy-monitoring': '',
  'dairy-connect': '',
  'smart-milk-vending': '',
  'napkin-vending': '',
  'reverse-vending': '',
};

// ---------------------------------------------------------------- industries
// The nine industries of the header menu, the sitemap and the footer (the Profile's four "Industry Applications" tabs,
// p. 8, map onto them: Smart Healthcare -> healthcare, Smart Manufacturing -> manufacturing, Smart Retail -> retail,
// Smart Utilities -> water and energy). Used by the industry explorer (pages.mjs industryExplorer: Home and /industries/)
// and by each /industries/<slug>/ page. Every word is taken from an allowed source; nothing is new:
//   suite, who, h1, intro: the old site's industry suites, as already on these pages
//   helps: [icon, use case, optional line]; the use case is from the Profile p. 8 [P], the old site's solution list
//     (SOLUTIONS below) [S] or a finished product page [product]; the line is that product page's own words.
//     A use case with no line on any source keeps its title only (no filler).
//   products: the product pages that list this industry (PRODUCTS[].industries), most relevant first
//   group: the /solutions/ group linked as "<group> solutions" (null: no group fits)
// No figures, no scale claims, no accreditation: the panels stay as short as the sources are.
export const INDUSTRIES = [
  { slug: 'healthcare', name: 'Healthcare', suite: 'Healthcare Connect', icon: 'hospital',
    products: ['nurse-call-system', 'queue-management-system'],
    who: 'Hospitals, clinics and diagnostic centres',
    h1: 'Nurse call and queues for hospitals',
    intro: 'Sygnet NCS and Sygnet QMS work as one hospital system: patients call from the bed, visitors wait by token, and staff see both on the same platform.',
    helps: [
      ['users-round', 'OPD queue management', 'Tokens by kiosk, QR or WhatsApp, with one dashboard for every branch.'],   // P; QMS
      ['bell-ring', 'Nurse call', 'Every call is seen, answered and recorded.'],                                         // P; NCS
      ['megaphone', 'Public address systems'],                                                                           // P
      ['scan-line', 'Asset monitoring'],                                                                                 // P
      ['zap', 'Utility monitoring'],                                                                                     // P
    ],
    group: 'Healthcare' },
  { slug: 'manufacturing', name: 'Manufacturing', suite: 'Manufacturing Connect', icon: 'factory',
    products: ['textile-connect', 'energy-monitoring', 'school-bell-pa-system'],
    who: 'Textile mills, factories and process plants',
    h1: 'Machine and utility monitoring for factories',
    intro: 'From loom status in a Surat mill to compressors and DG sets, Manufacturing Connect puts machines, production and utilities on one screen.',
    helps: [
      ['settings', 'Machine monitoring', 'Running, idle and stopped status for every machine, live.'],                    // P; Textile Connect
      ['activity', 'Production line monitoring', 'Production counted by machine and by shift.'],                         // P; Textile Connect
      ['gauge', 'Utility monitoring', 'Pumps, chillers, boilers and other utilities beside production.'],                // P; Textile Connect
      ['workflow', 'ERP integration', 'Shop-floor data flows into the ERP the factory already uses.'],                   // Textile Connect
      ['warehouse', 'Warehouse management'],                                                                             // P
    ],
    group: 'Industrial' },
  { slug: 'water', name: 'Water', suite: 'Water Connect', icon: 'droplet',
    products: ['water-atm', 'rural-water-center'],
    who: 'Water utilities, CSR teams, NGOs and Panchayats',
    h1: 'Water ATMs and plant monitoring for safe water',
    intro: 'Water Connect runs Water ATMs and Rural Water Centers, and watches the RO plants, tanks, pumps and pipes behind them.',
    helps: [
      ['layout-dashboard', 'Water ATM monitoring', 'Sales, usage and status update online.'],                            // S; Water ATM
      ['flask-conical', 'Water treatment plant monitoring'],                                                             // P
      ['test-tube', 'Water quality monitoring'],                                                                         // S; Rural Water Center
      ['circle-dot', 'Borewell monitoring'],                                                                             // P
      ['handshake', 'CSR dashboard', 'Monitor projects, KPIs and fund utilisation, transparently.'],                     // Rural Water Center
    ],
    group: 'Water' },
  { slug: 'energy', name: 'Energy', suite: 'Energy Connect', icon: 'zap',
    products: ['energy-monitoring', 'textile-connect'],
    who: 'Plants, campuses and facility teams',
    h1: 'Energy, solar and power monitoring',
    intro: 'Energy Connect monitors meters, DG sets, UPS, transformers, solar plants and batteries, so energy use is measured where it is spent.',
    helps: [
      ['zap', 'Energy monitoring', 'Consumption and power quality at the panels that matter.'],                          // P (energy meters); Textile Connect
      ['sun', 'Solar plant monitoring', 'Solar generation tracked, so underperformance shows early.'],                   // S; Textile Connect
      ['fuel', 'DG set monitoring', 'Running status and fuel use of each DG set.'],                                      // S; Textile Connect
      ['wind', 'Air compressor monitoring', 'Running status and electricity use of each compressor.'],                   // S; Textile Connect
    ],
    group: 'Energy' },
  { slug: 'retail', name: 'Retail', suite: 'Retail Connect', icon: 'store',
    products: ['smart-milk-vending', 'napkin-vending', 'reverse-vending', 'queue-management-system'],
    who: 'Stores, vending operators, banks and service counters',
    h1: 'Vending and counters for retail',
    intro: 'Retail Connect runs connected vending machines for milk, napkins and recycling, and manages queues at service counters.',
    helps: [
      ['cpu', 'Vending machine controllers'],                                                                            // P
      ['tag', 'Electronic shelf labels'],                                                                                // P
      ['users-round', 'Queue management', 'Supermarkets, malls and showrooms.'],                                         // QMS sectors
      ['recycle', 'Bottle and can returns', 'A return point that brings people back in.'],                               // Reverse Vending
      ['zap', 'Utility monitoring'],                                                                                     // P
    ],
    group: null },   // 2026-11-20: "Cross-industry" removed (client: it is not an industry)
  { slug: 'building', name: 'Building', suite: 'Building Connect', icon: 'building-2',
    products: ['school-bell-pa-system', 'queue-management-system', 'energy-monitoring'],
    who: 'Facility managers, campuses and commercial buildings',
    h1: 'Monitoring and control for buildings',
    intro: 'Building Connect watches HVAC, chillers, cold storage and air quality, and runs bells, announcements and visitor queues.',
    // thin: titles only, from the old site's solution list; no product page describes them yet
    helps: [
      ['wind', 'HVAC monitoring'],                                                                                       // S
      ['snowflake', 'Chiller monitoring'],                                                                               // S
      ['warehouse', 'Cold storage monitoring'],                                                                          // S
      ['cloud', 'Air quality monitoring'],                                                                               // S
    ],
    group: 'Building & Utility' },
  { slug: 'agriculture', name: 'Agriculture', suite: 'Agriculture Connect', icon: 'sprout',
    products: ['dairy-connect', 'smart-milk-vending', 'rural-water-center', 'water-atm'],
    who: 'Farms, dairies and rural cooperatives',
    h1: 'Irrigation, pumps and dairy monitoring for farms',
    intro: 'Agriculture Connect automates irrigation and farm pumps, and Dairy Connect follows milk from collection to chilling.',
    helps: [
      ['milk', 'Community Milk ATM', 'Fixed installation for 24x7 community access.'],                                   // Dairy Connect
      ['truck', 'Mobile Milk ATM', 'On-wheels milk distribution, anywhere, anytime.'],                                   // Dairy Connect
      ['snowflake', 'Bulk milk cooler monitoring'],                                                                      // S (Dairy)
      ['droplet', 'Smart irrigation system'],                                                                            // S
      ['gauge', 'Farm pump automation'],                                                                                 // S
    ],
    group: 'Agriculture' },
  { slug: 'smart-city', name: 'Smart City', suite: 'Smart City Connect', icon: 'landmark',
    products: ['water-atm', 'rural-water-center', 'reverse-vending', 'queue-management-system'],
    who: 'Municipalities and public service departments',
    h1: 'Connected public services for cities',
    intro: 'Smart City Connect brings public water points, recycling machines and citizen service counters onto one platform.',
    helps: [
      ['droplet', 'Public water points', 'Two-tap water dispensing with card, coin or UPI, monitored online.'],           // Water ATM
      ['recycle', 'Bottle and can collection', 'Collection points in public places, with records.'],                     // Reverse Vending
      ['building', 'Citizen service counters', 'Municipal offices, tax counters and utility services.'],                 // QMS sectors
      ['layout-dashboard', 'Panchayat dashboard', 'Village-level insights for better planning and decision making.'],    // Rural Water Center
    ],
    group: null },
  { slug: 'education', name: 'Education', suite: 'Education Connect', icon: 'school',
    products: ['school-bell-pa-system', 'queue-management-system', 'napkin-vending'],
    who: 'Schools, colleges and universities',
    h1: 'Bells, announcements and campus services for schools',
    intro: 'Automatic bells and classroom announcements, queues at the admission and fee counters, and napkin vending in the washrooms.',
    helps: [
      ['bell-ring', 'Automatic bell scheduling', 'Periods, breaks and dispersal ring on the timetable.'],                // School Bell & PA
      ['music', 'Prayers and the anthem', 'Prayers, the anthem and recorded tones play from MP3.'],                      // School Bell & PA
      ['users', 'Classroom announcements', 'Speak to one room, a group, a zone or the whole school.'],                   // School Bell & PA
      ['users-round', 'Office counters', 'Schools, colleges, universities and training institutes.'],                   // QMS sectors
      ['heart', 'Washroom hygiene', 'Cash or token napkin vending, with impact measured online.'],                       // Napkin Vending
    ],
    group: null },
];
export const industryBySlug = Object.fromEntries(INDUSTRIES.map(i => [i.slug, i]));

// ---------------------------------------------------------------- solutions (old /solutions, cleaned)
// link: the product page that covers it
export const SOLUTIONS = [
  { group: 'Water', items: ['Water ATM monitoring|water-atm', 'RO plant monitoring', 'Water treatment plant monitoring', 'Water quality monitoring', 'Borewell monitoring', 'Tank level monitoring', 'Pump monitoring', 'Flow meter monitoring', 'Pressure monitoring', 'Leakage detection'] },
  { group: 'Energy', items: ['Energy meter monitoring|energy-monitoring', 'DG set monitoring', 'UPS monitoring', 'Transformer monitoring', 'Solar plant monitoring', 'Battery bank monitoring', 'Power quality monitoring', 'EV charger monitoring'] },
  { group: 'Building & Utility', items: ['HVAC monitoring', 'Chiller monitoring', 'Compressor monitoring', 'Cold storage monitoring', 'Environmental monitoring', 'Air quality monitoring'] },
  { group: 'Industrial', items: ['Machine monitoring|textile-connect', 'Production monitoring|textile-connect', 'OEE monitoring|textile-connect', 'PLC / SCADA data acquisition', 'Vibration monitoring', 'Utility monitoring system'] },
  { group: 'Healthcare', items: ['Nurse call system|nurse-call-system', 'Queue management system|queue-management-system', 'OPD flow management|queue-management-system', 'Bed occupancy monitoring', 'Hospital asset tracking', 'Vaccine cold chain monitoring'] },
  { group: 'Dairy', items: ['Milk collection center automation|dairy-connect', 'Bulk milk cooler monitoring|dairy-connect', 'Milk chilling center monitoring|dairy-connect', 'Milk tanker tracking|dairy-connect', 'Milk quality monitoring|dairy-connect'] },
  { group: 'Agriculture', items: ['Smart irrigation system', 'Soil moisture monitoring', 'Fertigation automation', 'Greenhouse monitoring', 'Farm pump automation', 'Livestock environment monitoring', 'Weather station monitoring'] },
];
export const SOLUTION_COUNT = SOLUTIONS.reduce((n, g) => n + g.items.length, 0);
// line icons (Lucide names, ui.mjs icon()) for each group and each solution on /solutions/
export const SOLUTION_GROUP_ICONS = { Water: 'droplet', Energy: 'zap', 'Building & Utility': 'building-2', Industrial: 'factory', Healthcare: 'hospital', Dairy: 'milk', Agriculture: 'sprout' };
export const SOLUTION_ICONS = {
  'Water ATM monitoring': 'droplet', 'RO plant monitoring': 'filter', 'Water treatment plant monitoring': 'factory', 'Water quality monitoring': 'test-tube',
  'Borewell monitoring': 'circle-dot', 'Tank level monitoring': 'container', 'Pump monitoring': 'settings', 'Flow meter monitoring': 'waves',
  'Pressure monitoring': 'gauge', 'Leakage detection': 'triangle-alert',
  'Energy meter monitoring': 'zap', 'DG set monitoring': 'flame', 'UPS monitoring': 'plug-zap', 'Transformer monitoring': 'cable',
  'Solar plant monitoring': 'sun', 'Battery bank monitoring': 'battery-full', 'Power quality monitoring': 'activity', 'EV charger monitoring': 'car',
  'HVAC monitoring': 'wind', 'Chiller monitoring': 'snowflake', 'Compressor monitoring': 'gauge', 'Cold storage monitoring': 'warehouse',
  'Environmental monitoring': 'trees', 'Air quality monitoring': 'cloud',
  'Machine monitoring': 'settings', 'Production monitoring': 'package', 'OEE monitoring': 'chart-pie', 'PLC / SCADA data acquisition': 'circuit-board',
  'Vibration monitoring': 'audio-lines', 'Utility monitoring system': 'layout-dashboard',
  'Nurse call system': 'bell-ring', 'Queue management system': 'ticket', 'OPD flow management': 'users', 'Bed occupancy monitoring': 'bed-double',
  'Hospital asset tracking': 'map-pin', 'Vaccine cold chain monitoring': 'thermometer',
  'Milk collection center automation': 'milk', 'Bulk milk cooler monitoring': 'snowflake', 'Milk chilling center monitoring': 'thermometer',
  'Milk tanker tracking': 'truck', 'Milk quality monitoring': 'test-tube',
  'Smart irrigation system': 'droplet', 'Soil moisture monitoring': 'shovel', 'Fertigation automation': 'flask-conical', 'Greenhouse monitoring': 'leaf',
  'Farm pump automation': 'tractor', 'Livestock environment monitoring': 'thermometer', 'Weather station monitoring': 'cloud-sun',
};

// ---------------------------------------------------------------- platform (old site + brief)
export const LAYERS = [
  ['Device', 'Connect any device, sensor, machine or industrial system.'],
  ['Edge', 'Run automation and process data locally, so sites keep working when the link drops.'],
  ['Cloud', 'Store, manage and process device data on a secure platform.'],
  ['Applications', 'Industry suites and custom apps built on the same data.'],
  ['AI', 'Predict, optimise and automate from what the devices report.'],
];

export const DEV = [
  ['Third-party integration', 'Connect ERP, CRM and the tools you already use'],
  ['Open APIs', 'REST, MQTT and Webhooks'],
  ['Multi-tenant', 'One SaaS platform, many customers'],
  ['White label', 'Your brand on the platform'],
  ['Secure OTA', 'Firmware updates over the air'],
  ['Cloud or on-premise', 'Deploy where your data must live'],
];

export const SECURITY = ['End-to-end encryption', 'Role-based access control', 'Secure device authentication', 'Audit logs'];

// Smart Edge Hardware, the eight categories of the Sygnet Profile (page 7), each with its render from that page
export const HARDWARE = [
  ['Industrial controllers', 'hw-industrial-controller'], ['Sensor nodes', 'hw-sensor-nodes'], ['Wireless nodes', 'hw-wireless-node'],
  ['Bridge devices', 'hw-bridge-device'], ['Industrial gateways', 'hw-industrial-gateway'], ['Data loggers', 'hw-data-logger'],
  ['Communication modules', 'hw-communication-module'], ['Edge computing devices', 'hw-edge-computer'],
];
export const HW_QUALITIES = ['Industrial grade design', 'Reliable performance', 'Scalable for any size', 'Rapid deployment', 'Easy to integrate and expand'];

// Why Sygnet (Sygnet Profile, page 9): ten points, worded as printed, with the scale claim kept out
export const WHY = [
  ['Full stack solution', 'Hardware, software, cloud, apps and analytics: everything you need.', 'layers'],
  ['Plug and play deployment', 'Pre-configured hardware and a ready platform for rapid deployment.', 'plug'],
  ['Faster implementation', 'Proven frameworks and reusable modules reduce deployment time.', 'gauge'],
  ['Lower project cost', 'One ecosystem reduces integration and engineering cost.', 'chart-no-axes-column'],
  ['Open architecture', 'Open protocols and standards for flexibility and future readiness.', 'workflow'],
  ['Easy integration', 'Integration with ERP, third-party systems and enterprise applications.', 'cable'],
  ['Enterprise grade security', 'End-to-end data security, role-based access and compliance ready.', 'shield-check'],
  ['Scalable platform', 'Built to grow from one site to many.', 'boxes'],
  ['Industry ready applications', 'Pre-built solutions for healthcare, manufacturing, retail, utilities and more.', 'building-2'],
  ['AI ready infrastructure', 'Data pipelines, analytics and AI/ML capabilities for intelligent operations.', 'brain'],
];
export const ENGINEERING = [
  ['PCB design', 'Schematics and boards designed in-house.'],
  ['Cloud', 'Devices connect to Sygnet IoT Connect or your own cloud.'],
  ['Apps', 'Web and mobile apps for the people who use the data.'],
  ['Certification', 'Taking the product through the certification it needs.'],
  ['Production', 'From the first units to production runs.'],
];

export const TIERS = [
  ['Bronze', 'Authorized Partner', ['Training and support', 'Co-marketing']],
  ['Silver', 'Solution Partner', ['Technical training', 'Sales support']],
  ['Gold', 'Advanced Partner', ['Priority support', 'Joint go-to-market']],
  ['Platinum', 'Strategic Partner', ['Dedicated support', 'Revenue sharing']],
];

// ---------------------------------------------------------------- Company page (pages.mjs company), from the Sygnet Profile
// Used: About (p. 2), Vision & Mission (p. 3), Industry Challenge (p. 4), Industry Applications (p. 8), Why Sygnet (p. 9),
// Partner Ecosystem (p. 10). Not used, by client rule: The Sygnet Solution (p. 5), IoT Connect Platform (p. 6),
// Smart Edge Hardware (p. 7), Contact Us (p. 11); the Platform, Hardware and Contact pages cover them. No dashboard figures,
// no "enterprise grade", "compliance ready" or "thousands to millions" wording; facts (year, team) stay a placeholder.
export const COMPANY = {
  about: [
    ['factory', 'Who we are', 'Sygnet IoT Pvt. Ltd. is an IoT platform company building a complete ecosystem of intelligent hardware, cloud software, mobile applications and operational intelligence solutions.'],
    ['cloud', 'Sygnet IoT Connect', 'Through its flagship platform, Sygnet IoT Connect, organizations can digitize assets, monitor operations in real time, automate workflows and gain actionable business insights.'],
    ['plug', 'Plug and play', 'The plug-and-play architecture reduces deployment time and makes enterprise IoT accessible, scalable and easy to manage.'],
    ['chart-line', 'Built for results', 'Sygnet builds technologies that help industries improve operational efficiency, reduce costs and make faster, data-driven decisions.'],
  ],
  strengths: [['timer', 'Faster deployment'], ['layers', 'Scalable architecture'], ['shield-check', 'Secure by design'], ['activity', 'Real-time intelligence'], ['factory', 'Built for industries']],
  // as printed; the middle part is the phrase the profile highlights
  vision: ['To become a globally trusted ', 'Operational Intelligence Platform', ' powering connected enterprises across industries.'],
  mission: ['To simplify IoT by delivering a complete ', 'plug-and-play', ' ecosystem of intelligent hardware, scalable software and industry-ready applications.'],
  purpose: [['piggy-bank', 'Reduce operational costs'], ['trending-up', 'Improve productivity'], ['gauge', 'Increase asset utilization'], ['workflow', 'Automate operations'], ['chart-column', 'Enable data-driven decisions']],
  values: [['shield-check', 'Trusted technology'], ['cloud', 'Scalable solutions'], ['puzzle', 'Seamless integration'], ['handshake', 'Long-term partnerships'], ['lightbulb', 'Continuous innovation'], ['globe', 'Global perspective']],
  stack: [['radio', 'Sensors'], ['cpu', 'Controllers'], ['router', 'Gateways'], ['antenna', 'Communication networks'], ['cloud', 'Cloud infrastructure'],
    ['smartphone', 'Mobile apps'], ['layout-dashboard', 'Dashboards'], ['chart-line', 'Analytics'], ['brain', 'AI'], ['database', 'ERP integration']],
  impact: [['coins', 'Increases project cost'], ['calendar-clock', 'Delays deployment'], ['trending-down', 'Impacts ROI']],
  apps: [
    { id: 'healthcare', name: 'Smart Healthcare', icon: 'hospital', line: 'For hospitals and clinics: patient flow, staff calls, announcements and the utilities behind them.',
      items: [['users-round', 'OPD queue management system'], ['bell-ring', 'Nurse call system'], ['megaphone', 'Public address systems'], ['scan-line', 'Asset monitoring'], ['zap', 'Utility monitoring']],
      products: ['nurse-call-system', 'queue-management-system'] },
    { id: 'manufacturing', name: 'Smart Manufacturing', icon: 'factory', line: 'For factories and mills: machines, production lines, warehouses and utilities.',
      items: [['settings', 'Machine monitoring'], ['activity', 'Production line monitoring'], ['warehouse', 'Warehouse management'], ['zap', 'Utility monitoring']],
      products: ['textile-connect'] },
    { id: 'retail', name: 'Smart Retail', icon: 'store', line: 'For stores and public places: vending machines, shelf labels and utilities.',
      items: [['cpu', 'Vending machine controllers'], ['tag', 'Electronic shelf labels'], ['zap', 'Utility monitoring']],
      products: ['smart-milk-vending', 'napkin-vending', 'reverse-vending'] },
    { id: 'utilities', name: 'Smart Utilities', icon: 'droplet', line: 'For water and energy infrastructure: borewells, tanks, treatment plants and meters.',
      items: [['waves', 'Borewell monitoring'], ['gauge', 'Water level monitoring'], ['flask-conical', 'Water treatment plant monitoring'], ['plug-zap', 'Energy meter monitoring']],
      products: ['water-atm'] },
  ],
  appsClose: [['timer', 'Pre-integrated for quick deployment'], ['puzzle', 'Works with existing systems'], ['layers', 'Scalable from a single site to many sites']],
  reasons: [
    ['layers', 'Full stack solution', 'Hardware, software, cloud, apps and analytics: everything you need.'],
    ['plug', 'Plug & play deployment', 'Pre-configured hardware and a ready platform for rapid deployment.'],
    ['timer', 'Faster implementation', 'Proven frameworks and reusable modules reduce deployment time significantly.'],
    ['coins', 'Lower project cost', 'A complete solution under one ecosystem reduces integration and engineering cost.'],
    ['puzzle', 'Easy integration', 'Seamless integration with ERP, third-party systems and enterprise applications.'],
    ['shield-check', 'Secure by design', 'End-to-end data security and role-based access.'],
    ['trending-up', 'Scalable platform', 'Built to scale with high performance as you add devices and sites.'],
    ['factory', 'Industry-ready applications', 'Pre-built solutions for healthcare, manufacturing, retail, utilities and more.'],
    ['brain', 'AI-ready infrastructure', 'Built-in data pipelines, analytics and AI/ML capabilities for intelligent operations.'],
  ],
  outcomes: [['piggy-bank', 'Reduce operational expenditure (OpEx)'], ['trending-up', 'Increase productivity'], ['gauge', 'Improve equipment utilization'], ['clock', 'Minimize downtime'],
    ['leaf', 'Reduce energy consumption'], ['wrench', 'Enable preventive maintenance'], ['smile', 'Improve customer experience'], ['chart-column', 'Increase operational profitability']],
  promise: [['badge-check', 'Reliable'], ['rocket', 'Future ready'], ['handshake', 'Trusted partner'], ['globe', 'Building for a connected world']],
  partners: [
    ['users', 'System integrators', 'End-to-end solution implementation and system integration expertise.'],
    ['cpu', 'OEMs', 'Hardware and product manufacturers building innovative solutions with Sygnet.'],
    ['bot', 'Automation companies', 'Bringing automation expertise to deliver smarter operations.'],
    ['hard-hat', 'Electrical contractors', 'Powering infrastructure with reliable and intelligent solutions.'],
    ['cable', 'ELV integrators', 'Delivering intelligent low voltage solutions for connected environments.'],
    ['laptop', 'IT solution providers', 'Enabling digital transformation with scalable IT solutions and support.'],
    ['network', 'Technology partners', 'Collaborating on technology, innovation and market expansion.'],
    ['message-circle', 'Consultants', 'Advising and enabling businesses to achieve their digital transformation goals.'],
  ],
  sites: [['hospital', 'Hospitals'], ['factory', 'Factories'], ['building-2', 'Commercial buildings'], ['warehouse', 'Warehouses'], ['droplet', 'Utility infrastructure']],
};

// ---------------------------------------------------------------- Home (pages.mjs home): one intro section per main page
// In the header menu's order: Products, Industries, Platform (Platform, Hardware, Solutions), Partners,
// Company (About, Case studies, Contact). Every word is taken from the page it introduces (its hero, its first section or
// data above); nothing is new. layout: the renderer in pages.mjs HOME_LAYOUTS (tabs, feature, strip, editorial, slim,
// numbered, statement, centre, split); no two neighbours share one. ground: white, mist or indigo (the band).
// items: [icon, title, small line, link]. Products (card grid) and Platform (flow on the Indigo band) are built in pages.mjs.
const slugOf = g => g.toLowerCase().replace(/[^a-z]+/g, '-');
export const HOME = {
  products: { eyebrow: 'Products', href: '/products/', h2: 'Start with one and add the rest as you grow, all on Sygnet IoT Connect.',
    intro: 'Hospitals, schools, mills, water projects, dairies and retail. Each product carries the Sygnet name and runs on Sygnet IoT Connect.',
    moreLabel: 'Also in the range' },
  platform: { eyebrow: 'Platform', href: '/platform/', h2: 'One platform under every product.', muted: 'Five layers, from the device to AI.',
    intro: 'Connect any device, collect its data, automate at the edge and run industry apps on top, in the cloud or on your own servers.' },
  sections: [
    // the industry explorer (pages.mjs industryExplorer), the same component as /industries/
    { id: 'industries', eyebrow: 'Industries', href: '/industries/', layout: 'tabs', ground: 'mist',
      h2: 'Nine industries, one platform.', intro: 'Each suite bundles the Sygnet products and monitoring solutions that industry asks for most.',
      note: 'Also serving logistics and hospitality.' },
    { id: 'hardware', eyebrow: 'Hardware', href: '/hardware/', layout: 'feature', ground: 'white', img: 'hw-industrial-controller',
      h2: 'IoT hardware, and custom boards built to order.',
      intro: 'Controllers, sensor nodes, gateways and edge devices made for Sygnet IoT Connect, plus custom-designed hardware, from PCB design and firmware through to certification and production.',
      items: [['cpu', 'Industrial controllers'], ['radio', 'Sensor nodes'], ['wifi', 'Wireless nodes'], ['router', 'Industrial gateways'], ['hard-drive', 'Data loggers'], ['server', 'Edge computing devices']],
      note: 'Also in the range: bridge devices and communication modules.' },
    { id: 'solutions', eyebrow: 'Solutions', href: '/solutions/', layout: 'editorial', ground: 'mist',   // Mist: its neighbours (Hardware, Partners) are white now Developer and Resources are gone
      h2: `${SOLUTION_COUNT} IoT monitoring solutions on one platform.`,
      intro: 'Water, energy, buildings, factories, hospitals, dairies and farms. Each solution runs on Sygnet IoT Connect, and many come as part of a Sygnet product.',
      items: SOLUTIONS.map(g => [SOLUTION_GROUP_ICONS[g.group], g.group, `${g.items.length} solutions`, `/solutions/#${slugOf(g.group)}`]) },
    { id: 'partners', eyebrow: 'Partners', href: '/partners/', layout: 'numbered', ground: 'white',
      h2: 'Partner program for integrators and resellers.',
      intro: 'Sell, install and support Sygnet products in your region. Four tiers, from Authorized Partner to Strategic Partner, each with training and support.',
      items: TIERS.map(([m, r], k) => [['award', 'medal', 'trophy', 'gem'][k], m, r]) },
    { id: 'company', eyebrow: 'Company', href: '/company/', layout: 'statement', ground: 'indigo',
      // 2026-11-20 client: the "Circuit to cloud, in one company" line replaced by one brief, the /company/ head + Profile p. 2
      h2: 'About Sygnet IoT.', muted: 'A full stack IoT platform company.',
      intro: `${COMPANY.about[0][2]} ${COMPANY.about[1][2]}`,
      items: COMPANY.strengths.map(([ic, t]) => [ic, t]) },
    { id: 'case-studies', eyebrow: 'Case studies', href: '/case-studies/', layout: 'centre', ground: 'white',
      h2: 'Case studies and clients.', intro: 'Each story is published with the client’s permission and is being prepared now.' },
    { id: 'contact', eyebrow: 'Contact', href: '/contact/', layout: 'split', ground: 'mist',
      h2: 'Request a demo or talk to our experts.', intro: 'Tell us about your site and what you want to connect. Our team in Surat will reply by email or phone.',
      items: [['phone', 'Phone', SITE.phone, `tel:${SITE.tel}`], ['mail', 'Email', SITE.email, `mailto:${SITE.email}`],
        ['map-pin', 'Office', SITE.city], ['calendar-check', 'Request a demo', 'Tell us what you run.', '/contact/']] },
  ],
};
