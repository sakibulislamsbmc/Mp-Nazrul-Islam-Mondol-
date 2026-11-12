export type RoleType = 
  | 'সুপার অ্যাডমিন'
  | 'সংসদ সদস্য'
  | 'ব্যক্তিগত সচিব'
  | 'অফিস কর্মকর্তা'
  | 'কনটেন্ট ম্যানেজার';

export type ComplaintStatus = 
  | 'নতুন আবেদন'
  | 'পর্যালোচনাধীন'
  | 'প্রক্রিয়াধীন'
  | 'সংশ্লিষ্ট দপ্তরে প্রেরিত'
  | 'নিষ্পত্তি হয়েছে';

export type AppointmentStatus = 
  | 'অপেক্ষমান'
  | 'অনুমোদিত'
  | 'বাতিল'
  | 'পুনঃনির্ধারিত';

export type ProjectStatus = 
  | 'পরিকল্পনাধীন'
  | 'চলমান'
  | 'সম্পন্ন'
  | ' স্থগিত';

export type ProjectCategory = 
  | 'সড়ক উন্নয়ন'
  | 'ব্রিজ ও কালভার্ট'
  | 'শিক্ষা প্রতিষ্ঠান'
  | 'স্বাস্থ্যসেবা'
  | 'পানি ও স্যানিটেশন'
  | 'বিদ্যুৎ ও অবকাঠামো'
  | 'অন্যান্য';

export interface ComplaintApplication {
  id: string;
  trackingNumber: string;
  applicantName: string;
  phone: string;
  address: string;
  upazila: 'দুর্গাপুর' | 'পুঠিয়া';
  union: string;
  ward: string;
  type: string;
  title: string;
  description: string;
  attachmentName?: string;
  status: ComplaintStatus;
  createdAt: string;
  updatedAt: string;
  assignedDepartment?: string;
  adminNotes?: string;
  officialResolution?: string;
}

export interface AppointmentRequest {
  id: string;
  trackingNumber: string;
  applicantName: string;
  phone: string;
  email?: string;
  organization?: string;
  address: string;
  upazila: 'দুর্গাপুর' | 'পুঠিয়া' | 'অন্যান্য';
  purpose: string;
  preferredDate: string;
  preferredTime: string;
  additionalMessage?: string;
  status: AppointmentStatus;
  scheduledDate?: string;
  scheduledTime?: string;
  venue?: string;
  adminNotes?: string;
  createdAt: string;
}

export interface DevelopmentProject {
  id: string;
  title: string;
  category: ProjectCategory;
  location: string;
  upazila: 'দুর্গাপুর' | 'পুঠিয়া' | 'উভয় উপজেলা';
  implementingAgency: string;
  estimatedBudget?: string;
  startDate: string;
  targetCompletionDate: string;
  status: ProjectStatus;
  progress: number; // 0 - 100
  description: string;
  imageUrl?: string;
  lastUpdated: string;
}

export interface ParliamentaryActivity {
  id: string;
  category: 'বক্তব্য' | 'উত্থাপিত প্রশ্ন' | 'কমিটির কার্যক্রম' | 'উপস্থিতির তথ্য';
  title: string;
  date: string;
  session: string;
  summary: string;
  keyPoints: string[];
  documentUrl?: string;
  videoUrl?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  isFeatured?: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: RoleType;
  action: string;
  details: string;
}

export interface EmergencyContact {
  title: string;
  department: string;
  upazila: string;
  phone: string;
  availableHours: string;
}
