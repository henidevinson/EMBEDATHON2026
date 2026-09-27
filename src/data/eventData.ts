import { DomainInfo, RegistrationRecord } from '../types';

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
    name: 'Sri. A. M. KANDASAMI',
    title: 'Founder & Chairman',
    photo: '/brand/founder-kandasami-circle.png',
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
  timing: '9:30 AM – 4:30 PM',
  reportingTime: '8:30 AM – 9:15 AM',
  duration: '8 Hours',
  venue: 'ABINANTHAM HALL',
  feePerHead: 300,
  teamSizes: ['1 Member', '2 Members', '3 Members', '4 Members'] as const,
  upi: {
    id: 'mrkandasamy1983-6@oksbi',
    name: 'R. KANDASAMY',
    role: 'Convenor & HOD, ECE',
    bank: 'State Bank of India',
    rawQrText: 'upi://pay?pa=mrkandasamy1983-6@oksbi&pn=R.KANDASAMY&cu=INR',
  },
  googleFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSczwFr0FMT5uBfGsBdRUqUeinYGlEM83ZLCt3AACXgwv2TNOQ/viewform',
  googleFormEmbedUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSczwFr0FMT5uBfGsBdRUqUeinYGlEM83ZLCt3AACXgwv2TNOQ/viewform?embedded=true',
  googleSheetWebhookUrl: 'https://script.google.com/macros/s/AKfycbxU2i7qEQz0GnD5ZkahjnGvV5ku7aWbbltQOg8Nwv3fVbt9dvdNxwLApO-1dU6kjLRv/exec',
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
  chiefPatron: {
    role: 'Chief Patron',
    name: 'Dr. R. KIRUBAKARAN',
    designation: 'Principal',
  },
  patron: {
    role: 'Patron',
    name: 'Sri. A. M. KANDASAMI',
    designation: 'Founder & Chairman, Sasurie Group',
    photo: '/brand/founder-kandasami-circle.png',
  },
  convenor: {
    role: 'Convenor',
    name: 'Mr. R. KANDASAMY',
    designation: 'HOD, Department of ECE',
    upiId: 'mrkandasamy1983-6@oksbi',
  },
  facultyCoordinators: [
    {
      name: 'Dr. G. SIVARAMA SUBRAMANIAM',
      designation: 'Assistant Professor / ECE',
    },
    {
      name: 'Prof. T. MANICKAM',
      designation: 'Assistant Professor / ECE',
    },
  ],
  studentCoordinators: [
    {
      name: 'S. ATHISH',
      role: 'Secretary / ECE',
      phone: '+91 9840831058',
      phoneClean: '9840831058',
    },
    {
      name: 'K. KISHORE KUMAR',
      role: 'SLC / ECE',
      phone: '+91 97894 37018',
      phoneClean: '9789437018',
    },
  ],
};

export const SCHEDULE_ITEMS = [
  {
    time: '08:30 AM – 09:15 AM',
    title: 'Reporting & Kit Verification',
    description: 'Team arrival at Abinantham Hall, physical attendance check, Wi-Fi credential distribution, and workspace allocation.',
    badge: 'Registration',
  },
  {
    time: '09:30 AM – 10:00 AM',
    title: 'Inaugural Ceremony & Briefing',
    description: 'Welcome address by Chief Patron Dr. R. Kirubakaran and Convenor Mr. R. Kandasamy. Rule explanation and evaluation criteria.',
    badge: 'Kickoff',
  },
  {
    time: '10:00 AM',
    title: 'Hackathon Commences (8h Clock Starts)',
    description: 'Development sprints start across all 7 technology domains. Hardware integration, circuit assembly, and firmware programming.',
    badge: 'Active Sprint',
  },
  {
    time: '11:30 AM – 11:45 AM',
    title: 'Morning High-Tea & Refreshments',
    description: 'Energizing refreshments served to all participants at the hall pantry without disrupting sprint workflow.',
    badge: 'Break',
  },
  {
    time: '01:00 PM – 01:45 PM',
    title: 'Networking Lunch & Mid-Way Mentoring Review',
    description: 'Hot buffet lunch provided. Faculty and expert jury visit team booths for preliminary architecture check.',
    badge: 'Lunch & Review',
  },
  {
    time: '03:30 PM',
    title: 'Code Freeze & Live Demonstrations',
    description: 'Hardware prototypes locked. Teams present their working system, schematic design, and impact metrics to the evaluation panel.',
    badge: 'Judging',
  },
  {
    time: '04:15 PM – 04:45 PM',
    title: 'Valedictory & Prize Distribution',
    description: 'Announcement of winning teams, distribution of cash rewards, trophies, and certificates for all participants.',
    badge: 'Awards',
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
    description: 'Nutritious lunch and multiple rounds of refreshments provided throughout the 8-hour sprint to keep teams fueled.',
    stat: 'Included',
  },
  {
    title: 'Lab & Power Infrastructure',
    description: 'Dedicated workstations in Abinantham Hall equipped with high-speed Wi-Fi, test benches, and multi-socket power strips.',
    stat: 'Full Support',
  },
];

export const GUIDELINES = [
  'Teams must consist of 2 to 4 members from recognized engineering / polytechnic institutions.',
  'Participants should bring their own laptops, microcontrollers (STM32, ESP32, Arduino, Raspberry Pi, etc.), sensors, and connecting cables.',
  'Core code and hardware prototyping must be assembled during the 8-hour sprint period.',
  'Registration fee is ₹300 per head (e.g. 2 members = ₹600, 3 members = ₹900, 4 members = ₹1200).',
  'Payment must be made via UPI to mrkandasamy1983-6@oksbi and the UTR / Transaction ID along with screenshot must be submitted.',
  'Decisions of the evaluation jury and convenor will be final and binding.',
];

export const INITIAL_REGISTRATIONS: RegistrationRecord[] = [];

