import { DomainInfo, RegistrationRecord } from '../types';
import founderPhoto from '../assets/brand/founder-kandasami-circle.png';
import secretaryPhoto from '../assets/brand/secretary-savitha-circle.png';
import principalPhoto from '../assets/brand/principal-kiruba-circle.png';
import coconvenerPhoto from '../assets/brand/coconvener-kandasamy-circle.png';
import staffSivaramaPhoto from '../assets/brand/staff-sivarama.png';
import staffManickamPhoto from '../assets/brand/staff-manickam.png';
import studentAthishPhoto from '../assets/brand/student-athish.png';
import studentKishorePhoto from '../assets/brand/student-kishore.png';

export const INSTITUTION = {
  trust: 'Ponmudi Muthusamy Gounder Charitable Trust',
  name: 'SASURIE COLLEGE OF ENGINEERING',
  autonomous: 'AUTONOMOUS',
  accreditations: 'Approved by AICTE, New Delhi & Affiliated to Anna University, Chennai',
  certifications: "Accredited by NAAC with 'A' Grade · An ISO 9001:2015 Certified Institution",
  location: 'Vijayamangalam, Tirupur - 638 056, Tamil Nadu, India.',
  website: 'https://sasurieengg.com',
  anniversary: '25 Years of Academic Excellence (Silver Jubilee)',
  founder: {
    name: 'Sri A. M. KANDASWAMI',
    title: 'Founder & Chairman',
    photo: founderPhoto,
    originalPhoto: '/brand/founder-kandasamy-original.jpg',
  },
};

export const EVENT_DETAILS = {
  name: 'EMBEDATHON 2026',
  college: 'SASURIE COLLEGE OF ENGINEERING (AUTONOMOUS)',
  department: 'Department of Electronics and Communication Engineering',
  tagline: 'Build Beyond Limits. Embed the Future.',
  theme: 'Explore the Future with Embedded Technologies',
  description: '8 Hours. Unlimited Ideas. Real Impact.',
  date: '15th October 2026',
  rawDate: '2026-10-15T09:30:00',
  deadlineDate: '2026-10-13T23:59:59',
  deadlineDisplay: '13/10/2026 (11:59 PM)',
  timing: '9:30 AM – 5:30 PM',
  eventTiming: '9:30 AM – 5:30 PM',
  reportingTime: '8:30 AM',
  duration: '9:30 AM – 5:30 PM',
  venue: 'ABINANTHAM HALL',
  feePerHead: 300,
  teamSizes: ['1 Member', '2 Members', '3 Members', '4 Members'] as const,
  upi: {
    id: 'mrkandasamy1983-6@oksbi',
    name: 'PROF. R. KANDASAMY',
    role: 'Co-convener & HOD, ECE',
    bank: 'INDIAN OVERSEAS BANK',
    rawQrText: 'upi://pay?pa=mrkandasamy1983-6@oksbi&pn=PROF.R.KANDASAMY&cu=INR',
  },
  registrationFormUrl: 'https://form.jotform.com/kdofficialathi02/embedathon-2026--registration-form',
  googleFormUrl: 'https://form.jotform.com/kdofficialathi02/embedathon-2026--registration-form',
  googleFormEmbedUrl: 'https://form.jotform.com/kdofficialathi02/embedathon-2026--registration-form',
};

export const DOMAINS: DomainInfo[] = [
  {
    id: 'embedded-systems',
    title: 'Embedded Systems and Microcontrollers',
    shortTitle: 'Embedded Systems',
    iconName: 'Cpu',
    description: 'Design robust, low-power embedded solutions leveraging ARM Cortex, STM32, ESP32, and bare-metal RTOS architectures.',
    suggestedHardware: ['STM32 Nucleo', 'ESP32 / ESP8266', 'ARM Cortex-M', 'Raspberry Pi Pico'],
    sampleUseCases: ['Industrial monitoring node', 'Real-time protocol converter', 'Ultra-low power telemetry system'],
  },
  {
    id: 'iot-smart-devices',
    title: 'Internet of Things (IoT) and Smart Devices',
    shortTitle: 'IoT & Smart Devices',
    iconName: 'Wifi',
    description: 'Architect connected ecosystems with MQTT, HTTP/REST, LoRaWAN, and cloud integrations for smart homes, agriculture, or urban infrastructure.',
    suggestedHardware: ['ESP32 Wi-Fi/BLE', 'NodeMCU', 'LoRa Transceivers', 'MQTT Brokers'],
    sampleUseCases: ['Smart agriculture sensing', 'Predictive energy monitoring', 'Connected water quality grid'],
  },
  {
    id: 'robotics-automation',
    title: 'Robotics and Industrial Automation',
    shortTitle: 'Robotics & Automation',
    iconName: 'Bot',
    description: 'Construct intelligent robotic rovers, multi-axis robotic arms, automated guided vehicles (AGVs), or industrial assembly workflows.',
    suggestedHardware: ['Motor Drivers / H-Bridge', 'Encoders & Steppers', 'ROS / Micro-ROS', 'Raspberry Pi 4/5'],
    sampleUseCases: ['Autonomous warehouse rover', 'Pick-and-place robotic arm', 'Defect detection sorting conveyer'],
  },
  {
    id: 'ai-edge-computing',
    title: 'Artificial Intelligence and Edge Computing',
    shortTitle: 'AI & Edge Computing',
    iconName: 'Sparkles',
    description: 'Deploy on-device machine learning models for low-latency visual inspection, audio keyword spotting, or anomaly detection on edge NPUs.',
    suggestedHardware: ['Edge Impulse', 'TensorFlow Lite for Micro', 'Google Coral TPU', 'NVIDIA Jetson / OpenMV'],
    sampleUseCases: ['On-device thermal anomaly detection', 'Edge audio spectrogram classifier', 'Low-power biometric scanner'],
  },
  {
    id: 'smart-sensors-wireless',
    title: 'Smart Sensors and Wireless Communication',
    shortTitle: 'Smart Sensors & Wireless',
    iconName: 'Radio',
    description: 'Integrate multi-modal sensor fusion (IMU, environmental, gas, acoustic) with resilient RF communication like BLE Mesh, Zigbee, or Sub-1GHz.',
    suggestedHardware: ['MEMS IMUs', 'Gas & Chemical Sensors', 'BLE 5.0 Modules', 'Zigbee / XBee'],
    sampleUseCases: ['Hazardous gas telemetry', 'Vibration fatigue diagnostics', 'Asset tracking beacon network'],
  },
  {
    id: 'automotive-embedded',
    title: 'Automotive Embedded Systems',
    shortTitle: 'Automotive Embedded',
    iconName: 'Car',
    description: 'Engineer vehicular subsystems such as CAN-bus telemetry, Battery Management Systems (BMS) for EVs, and intelligent dashboard clusters.',
    suggestedHardware: ['MCP2515 CAN Transceiver', 'OBD-II Interfacing', 'Current Hall Sensors', 'Real-Time Logging'],
    sampleUseCases: ['EV Battery pack thermal monitor', 'CAN bus vehicle diagnostics', 'Anti-collision radar prototype'],
  },
  {
    id: 'wearable-healthcare',
    title: 'Wearable and Healthcare Devices',
    shortTitle: 'Wearable & Healthcare',
    iconName: 'HeartPulse',
    description: 'Innovate non-invasive biometric monitoring systems, portable ECG/PPG telemetry, ergonomic assistive hardware, and patient safety devices.',
    suggestedHardware: ['MAX30102 PPG', 'AD8232 ECG Sensor', 'Flexible Strain Sensors', 'Low-power BLE'],
    sampleUseCases: ['Patient vitals fall detector', 'Smart rehabilitation glove', 'Continuous hypothermia warning band'],
  },
];

export const COMMITTEE = {
  // 1. Chairman - Sri A.M.Kandaswami, Chief patron
  chiefPatron: {
    role: 'Chief Patron',
    position: 'Chairman',
    name: 'Sri A.M. Kandaswami',
    designation: 'Chairman, Sasurie Institutions',
    photo: founderPhoto,
  },
  // 2. Secretary - Smt. K. Savitha Moganraj, patron
  patron: {
    role: 'Patron',
    position: 'Secretary',
    name: 'Smt. K. Savitha Moganraj',
    designation: 'Secretary, Sasurie College of Engineering',
    photo: secretaryPhoto,
    originalPhoto: '/brand/secretary-savitha.png',
  },
  // 3. Principal - Dr.R. Kiruba Shankar, Convener
  convener: {
    role: 'Convener',
    position: 'Principal',
    name: 'Dr. R. Kiruba Shankar',
    designation: 'Principal, Sasurie College of Engineering',
    photo: principalPhoto,
    originalPhoto: '/brand/principal-kiruba-original.png',
  },
  // 4. HOD - Prof. R. Kandasamy, Co-convener
  coConvener: {
    role: 'Co-convener',
    position: 'HOD',
    name: 'Prof. R. Kandasamy',
    designation: 'HOD, Department of ECE',
    photo: coconvenerPhoto,
    originalPhoto: '/brand/coconvener-kandasamy.jpg',
    upiId: 'mrkandasamy1983-6@oksbi',
    bank: 'INDIAN OVERSEAS BANK',
  },
  // 5. Staffs coordinator - Dr.G. Sivarama Subramanium, Prof.T. Manickam
  staffCoordinators: [
    {
      name: 'Dr. G. Sivarama Subramanium',
      designation: 'Assistant Professor / ECE',
      photo: staffSivaramaPhoto,
    },
    {
      name: 'Prof. T. Manickam',
      designation: 'Assistant Professor / ECE',
      photo: staffManickamPhoto,
    },
  ],
  // Retaining facultyCoordinators alias for backwards-compatibility
  facultyCoordinators: [
    {
      name: 'Dr. G. Sivarama Subramanium',
      designation: 'Assistant Professor / ECE',
      photo: staffSivaramaPhoto,
    },
    {
      name: 'Prof. T. Manickam',
      designation: 'Assistant Professor / ECE',
      photo: staffManickamPhoto,
    },
  ],
  // 6. Students coordinator - S. Athish, K. Kishore Kumar
  studentCoordinators: [
    {
      name: 'S. Athish',
      role: 'Secretary / ECE',
      phone: '+91 9840831058',
      phoneClean: '9840831058',
      photo: studentAthishPhoto,
    },
    {
      name: 'K. Kishore Kumar',
      role: 'SLC / ECE',
      phone: '+91 97894 37018',
      phoneClean: '9789437018',
      photo: studentKishorePhoto,
    },
  ],
};

export const SCHEDULE_ITEMS = [
  {
    time: '08:00 AM – 08:30 AM',
    title: 'Reporting, Kit Verification & Desk Setup',
    description: 'Team arrival at Abinantham Hall, physical attendance check, ID verification, Wi-Fi credentials distribution, and workstation setup.',
    badge: 'Pre-Game · 08:00 AM',
    phase: 'pre-game',
  },
  {
    time: '08:30 AM – 09:00 AM',
    title: 'Reporting, Kit Verification & Desk Setup',
    description: 'Team arrival at Abinantham Hall, physical attendance check, ID verification, Wi-Fi credentials distribution, and workstation setup.',
    badge: 'Pre-Game · 08:30 AM',
    phase: 'pre-game',
  },
  {
    time: '09:00 AM – 09:30 AM',
    title: 'Inaugural Ceremony & Rules Briefing',
    description: 'Welcome address by Chief Patron Sri A.M. Kandaswami, Patron Smt. K. Savitha Moganraj, Convener Dr. R. Kiruba Shankar, and Co-convener Prof. R. Kandasamy. Hardware guidelines and kickoff countdown.',
    badge: 'Pre-Game · Inaugural',
    phase: 'pre-game',
  },
  {
    time: '09:30 AM',
    title: 'THE GAME COMMENCES: 8-HOUR HACK SPRINT',
    description: 'The official competition timer starts! Active hardware assembly, microcontroller flashing, sensor calibration, and firmware development across all 7 technology domains.',
    badge: 'GAME START (09:30 AM)',
    phase: 'game',
    highlight: true,
  },
  {
    time: '11:45 AM – 12:00 PM',
    title: 'Morning High-Tea & Refreshments',
    description: 'Hot tea, coffee, and energy snacks served at the hall pantry without interrupting ongoing team coding and circuit testing.',
    badge: 'In-Game Fuel',
    phase: 'game',
  },
  {
    time: '01:15 PM – 02:00 PM',
    title: 'Networking Lunch & Mid-Sprint Mentorship',
    description: 'Nutritious buffet lunch served. Faculty coordinators and technical jury mentors conduct booth walkthroughs to inspect circuit architecture and progress.',
    badge: 'In-Game Break',
    phase: 'game',
  },
  {
    time: '04:45 PM – 05:30 PM',
    title: 'Final Integration & Circuit Packaging',
    description: 'Teams wrap up their firmware, finalize sensor-actuator communication, package hardware into enclosures, and prepare live demo test rigs.',
    badge: 'Final Rush',
    phase: 'game',
  },
  {
    time: '05:30 PM',
    title: 'THE GAME CONCLUDES: CODE & HARDWARE FREEZE',
    description: 'Promptly at 5:30 PM, the 8-hour sprint ends! All coding, soldering, and circuit changes must cease immediately. Test benches are locked for jury review.',
    badge: 'GAME OVER (05:30 PM)',
    phase: 'game',
    highlight: true,
  },
  {
    time: '05:30 PM – 06:15 PM',
    title: 'Live Prototype Demonstrations & Jury Assessment',
    description: 'Expert jury panel visits each team workstation for live hardware demonstrations, circuit schematic auditing, firmware code execution check, and technical Q&A defense.',
    badge: 'Post-Game · Jury Demos',
    phase: 'post-game',
  },
  {
    time: '06:15 PM – 07:00 PM',
    title: 'Valedictory Ceremony & Prize Distribution',
    description: 'Valedictory address, announcement of winning champions and runners-up across domains, distribution of cash awards, trophies, and official certificates.',
    badge: 'Post-Game · Valedictory',
    phase: 'post-game',
  },
];

export const BENEFITS = [
  {
    title: 'Cash Prizes & Trophies',
    description: 'Substantial prize pool for top-performing teams across embedded, IoT, and AI domains, plus recognition trophies.',
    stat: 'Top Honors',
  },
  {
    title: 'Certified Credentials',
    description: 'Official printed Certificate of Participation / Merit for every team member issued by the Department of ECE.',
    stat: '100% Certified',
  },
  {
    title: 'Complimentary Lunch & Snacks',
    description: 'Nutritious lunch and refreshments provided during the event to keep teams energized.',
    stat: 'Included',
  },
  {
    title: 'Lab & Power Infrastructure',
    description: 'Dedicated workstations in Abinantham Hall equipped with high-speed Wi-Fi, test benches, and multi-socket power strips.',
    stat: 'Full Support',
  },
];

export const GUIDELINES = [
  'Teams must consist of 1 to 4 members from recognized engineering / polytechnic institutions.',
  'Participants should bring their own laptops, microcontrollers (STM32, ESP32, Arduino, Raspberry Pi, etc.), sensors, and connecting cables.',
  'Core code and hardware prototyping must be assembled during the 9:30 AM – 5:30 PM event period.',
  'Registration fee is ₹300 per head (e.g. 2 members = ₹600, 3 members = ₹900, 4 members = ₹1200).',
  'Payment details and team verification are submitted directly through the official registration form.',
  'Decisions of the evaluation jury and convenor will be final and binding.',
];

export const INITIAL_REGISTRATIONS: RegistrationRecord[] = [];

