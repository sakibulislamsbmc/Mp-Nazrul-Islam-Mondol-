import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ComplaintApplication, 
  AppointmentRequest, 
  DevelopmentProject, 
  ParliamentaryActivity, 
  NewsArticle, 
  AuditLog, 
  RoleType, 
  ComplaintStatus, 
  AppointmentStatus, 
  ProjectStatus 
} from '../types';
import { 
  INITIAL_COMPLAINTS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_PROJECTS, 
  INITIAL_PARLIAMENTARY, 
  INITIAL_NEWS, 
  INITIAL_AUDIT_LOGS,
  MP_PROFILE 
} from '../data/mockData';

export type PageId = 
  | 'home'
  | 'about'
  | 'parliamentary'
  | 'projects'
  | 'services'
  | 'news'
  | 'constituency'
  | 'contact'
  | 'admin'
  | 'tracking'
  | 'complaint-form'
  | 'appointment-form';

interface AppContextType {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  searchTrackingNumber: string;
  setSearchTrackingNumber: (tn: string) => void;

  // Data collections
  complaints: ComplaintApplication[];
  appointments: AppointmentRequest[];
  projects: DevelopmentProject[];
  parliamentary: ParliamentaryActivity[];
  news: NewsArticle[];
  auditLogs: AuditLog[];

  // Admin state
  currentRole: RoleType;
  setCurrentRole: (role: RoleType) => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;

  // Actions
  submitComplaint: (data: Omit<ComplaintApplication, 'id' | 'trackingNumber' | 'status' | 'createdAt' | 'updatedAt'>) => ComplaintApplication;
  updateComplaintStatus: (id: string, status: ComplaintStatus, adminNotes?: string, assignedDepartment?: string, resolution?: string) => void;
  submitAppointment: (data: Omit<AppointmentRequest, 'id' | 'trackingNumber' | 'status' | 'createdAt'>) => AppointmentRequest;
  updateAppointmentStatus: (id: string, status: AppointmentStatus, scheduledDate?: string, scheduledTime?: string, venue?: string, adminNotes?: string) => void;
  updateProject: (project: DevelopmentProject) => void;
  addProject: (project: Omit<DevelopmentProject, 'id' | 'lastUpdated'>) => void;
  addNewsArticle: (article: Omit<NewsArticle, 'id'>) => void;
  deleteNewsArticle: (id: string) => void;
  resetAllData: () => void;

  // Toast / notification
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [searchTrackingNumber, setSearchTrackingNumber] = useState<string>('');

  // Admin auth & role
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<RoleType>('সুপার অ্যাডমিন');

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // State with LocalStorage
  const [complaints, setComplaints] = useState<ComplaintApplication[]>(() => {
    const saved = localStorage.getItem('nim_complaints');
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  const [appointments, setAppointments] = useState<AppointmentRequest[]>(() => {
    const saved = localStorage.getItem('nim_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [projects, setProjects] = useState<DevelopmentProject[]>(() => {
    const saved = localStorage.getItem('nim_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [parliamentary, setParliamentary] = useState<ParliamentaryActivity[]>(() => {
    const saved = localStorage.getItem('nim_parliamentary');
    return saved ? JSON.parse(saved) : INITIAL_PARLIAMENTARY;
  });

  const [news, setNews] = useState<NewsArticle[]>(() => {
    const saved = localStorage.getItem('nim_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('nim_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('nim_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('nim_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('nim_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('nim_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('nim_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const addAuditLog = (action: string, details: string) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: formattedDate,
      user: currentRole === 'সংসদ সদস্য' ? MP_PROFILE.name : `${currentRole} কর্মকর্তা`,
      role: currentRole,
      action,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const submitComplaint = (data: Omit<ComplaintApplication, 'id' | 'trackingNumber' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const trackingNumber = `NIM-2026-${randomCode}`;
    const today = new Date().toISOString().split('T')[0];
    
    const newComplaint: ComplaintApplication = {
      ...data,
      id: `c-${Date.now()}`,
      trackingNumber,
      status: 'নতুন আবেদন',
      createdAt: today,
      updatedAt: today
    };

    setComplaints(prev => [newComplaint, ...prev]);
    addAuditLog('নাগরিক আবেদন দাখিল', `${data.applicantName} কর্তৃক নতুন অভিযোগ/আবেদন (${trackingNumber}) দাখিল করা হয়েছে।`);
    showToast(`আপনার আবেদন সফলভাবে গৃহীত হয়েছে! ট্র্যাকিং নম্বর: ${trackingNumber}`);
    return newComplaint;
  };

  const updateComplaintStatus = (
    id: string, 
    status: ComplaintStatus, 
    adminNotes?: string, 
    assignedDepartment?: string, 
    resolution?: string
  ) => {
    const today = new Date().toISOString().split('T')[0];
    let updatedItem: ComplaintApplication | null = null;

    setComplaints(prev => prev.map(item => {
      if (item.id === id) {
        updatedItem = {
          ...item,
          status,
          updatedAt: today,
          ...(adminNotes !== undefined && { adminNotes }),
          ...(assignedDepartment !== undefined && { assignedDepartment }),
          ...(resolution !== undefined && { officialResolution: resolution })
        };
        return updatedItem;
      }
      return item;
    }));

    if (updatedItem) {
      addAuditLog('অভিযোগের স্ট্যাটাস পরিবর্তন', `ট্র্যাকিং নম্বর ${(updatedItem as ComplaintApplication).trackingNumber} এর অবস্থা '${status}' এ হালনাগাদ করা হয়েছে।`);
      showToast(`আবেদন #${(updatedItem as ComplaintApplication).trackingNumber} এর অবস্থা সফলভাবে আপডেট করা হয়েছে।`);
    }
  };

  const submitAppointment = (data: Omit<AppointmentRequest, 'id' | 'trackingNumber' | 'status' | 'createdAt'>) => {
    const randomCode = Math.floor(500 + Math.random() * 499);
    const trackingNumber = `APT-2026-${randomCode}`;
    const today = new Date().toISOString().split('T')[0];

    const newAppointment: AppointmentRequest = {
      ...data,
      id: `apt-${Date.now()}`,
      trackingNumber,
      status: 'অপেক্ষমান',
      createdAt: today
    };

    setAppointments(prev => [newAppointment, ...prev]);
    addAuditLog('সাক্ষাতের অনুরোধ দাখিল', `${data.applicantName} কর্তৃক সাক্ষাতের অনুরোধ (${trackingNumber}) দাখিল করা হয়েছে।`);
    showToast(`সাক্ষাতের অনুরোধ পাঠানো হয়েছে! ট্র্যাকিং কোড: ${trackingNumber}`);
    return newAppointment;
  };

  const updateAppointmentStatus = (
    id: string, 
    status: AppointmentStatus, 
    scheduledDate?: string, 
    scheduledTime?: string, 
    venue?: string, 
    adminNotes?: string
  ) => {
    let updatedItem: AppointmentRequest | null = null;

    setAppointments(prev => prev.map(item => {
      if (item.id === id) {
        updatedItem = {
          ...item,
          status,
          ...(scheduledDate !== undefined && { scheduledDate }),
          ...(scheduledTime !== undefined && { scheduledTime }),
          ...(venue !== undefined && { venue }),
          ...(adminNotes !== undefined && { adminNotes })
        };
        return updatedItem;
      }
      return item;
    }));

    if (updatedItem) {
      addAuditLog('সাক্ষাতকার অনুরোধ হালনাগাদ', `অনুরোধ ${(updatedItem as AppointmentRequest).trackingNumber} এর অবস্থা '${status}' করা হয়েছে।`);
      showToast(`সাক্ষাতের আবেদন #${(updatedItem as AppointmentRequest).trackingNumber} সফলভাবে হালনাগাদ করা হয়েছে।`);
    }
  };

  const updateProject = (updatedProj: DevelopmentProject) => {
    setProjects(prev => prev.map(p => p.id === updatedProj.id ? updatedProj : p));
    addAuditLog('প্রকল্প তথ্য পরিবর্তন', `প্রকল্প '${updatedProj.title}' এর অগ্রগতি ${updatedProj.progress}% ও অবস্থা '${updatedProj.status}' হালনাগাদ করা হয়েছে।`);
    showToast(`'${updatedProj.title}' সফলভাবে আপডেট করা হয়েছে।`);
  };

  const addProject = (projectData: Omit<DevelopmentProject, 'id' | 'lastUpdated'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newProj: DevelopmentProject = {
      ...projectData,
      id: `proj-${Date.now()}`,
      lastUpdated: today
    };
    setProjects(prev => [newProj, ...prev]);
    addAuditLog('নতুন উন্নয়ন প্রকল্প যুক্ত', `নতুন প্রকল্প '${newProj.title}' ডাটাবেজে যুক্ত করা হয়েছে।`);
    showToast(`নতুন প্রকল্প সফলভাবে যুক্ত হয়েছে!`);
  };

  const addNewsArticle = (articleData: Omit<NewsArticle, 'id'>) => {
    const newArticle: NewsArticle = {
      ...articleData,
      id: `news-${Date.now()}`
    };
    setNews(prev => [newArticle, ...prev]);
    addAuditLog('নতুন সংবাদ প্রকাশ', `'${newArticle.title}' প্রকাশিত হয়েছে।`);
    showToast(`সংবাদ সফলভাবে প্রকাশিত হয়েছে!`);
  };

  const deleteNewsArticle = (id: string) => {
    const article = news.find(n => n.id === id);
    setNews(prev => prev.filter(n => n.id !== id));
    if (article) {
      addAuditLog('সংবাদ অপসারণ', `'${article.title}' মুছে ফেলা হয়েছে।`);
      showToast(`সংবাদ সফলভাবে অপসারণ করা হয়েছে।`);
    }
  };

  const resetAllData = () => {
    localStorage.removeItem('nim_complaints');
    localStorage.removeItem('nim_appointments');
    localStorage.removeItem('nim_projects');
    localStorage.removeItem('nim_parliamentary');
    localStorage.removeItem('nim_news');
    localStorage.removeItem('nim_audit_logs');
    setComplaints(INITIAL_COMPLAINTS);
    setAppointments(INITIAL_APPOINTMENTS);
    setProjects(INITIAL_PROJECTS);
    setParliamentary(INITIAL_PARLIAMENTARY);
    setNews(INITIAL_NEWS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    showToast('সকল নমুনা তথ্য প্রাথমিক অবস্থায় সফলভাবে রিসেট করা হয়েছে।', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProjectId,
        setSelectedProjectId,
        selectedArticleId,
        setSelectedArticleId,
        searchTrackingNumber,
        setSearchTrackingNumber,
        complaints,
        appointments,
        projects,
        parliamentary,
        news,
        auditLogs,
        currentRole,
        setCurrentRole,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        submitComplaint,
        updateComplaintStatus,
        submitAppointment,
        updateAppointmentStatus,
        updateProject,
        addProject,
        addNewsArticle,
        deleteNewsArticle,
        resetAllData,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
