export type TeamSize = '1 Member' | '2 Members' | '3 Members' | '4 Members';

export type TechnologyDomain =
  | 'Embedded Systems and Microcontrollers'
  | 'Internet of Things (IoT) and Smart Devices'
  | 'Robotics and Industrial Automation'
  | 'Artificial Intelligence and Edge Computing'
  | 'Smart Sensors and Wireless Communication'
  | 'Automotive Embedded Systems'
  | 'Wearable and Healthcare Devices';

export interface MemberDetails {
  fullName: string;
  email: string;
  phoneNumber: string;
  college: string;
  department: string;
  yearOfStudy: string; // e.g., '1st Year', '2nd Year', '3rd Year', 'Final Year'
}

export interface RegistrationRecord {
  id: string; // e.g. EMB26-4821
  timestamp: string;
  email: string; // Team Leader / Participant Email
  teamName: string;
  collegeName: string; // Primary College
  teamSize: TeamSize; // '1 Member' | '2 Members' | '3 Members' | '4 Members'
  leaderName: string;
  leaderMobile: string;

  // Exact Google Sheet Member Fields
  member1: MemberDetails;
  member2?: MemberDetails;
  member3?: MemberDetails;
  member4?: MemberDetails;

  // Backwards-compatible convenience getters
  member2Name?: string;
  member2Contact?: string;
  member3Name?: string;
  member3Contact?: string;
  member4Name?: string;
  member4Contact?: string;

  domain: TechnologyDomain;
  participantCount: number;
  totalAmount: number;
  transactionId: string;
  screenshotUrl?: string; // base64 or blob preview
  screenshotName?: string;
  status: 'Pending Verification' | 'Verified' | 'Flagged';
  declared: boolean;
}

export interface DomainInfo {
  id: string;
  title: TechnologyDomain;
  shortTitle: string;
  iconName: string;
  description: string;
  suggestedHardware: string[];
  sampleUseCases: string[];
}
