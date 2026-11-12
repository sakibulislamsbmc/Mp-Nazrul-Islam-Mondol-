import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  Calendar, 
  Briefcase, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Printer, 
  Download, 
  ChevronRight, 
  Building2, 
  LogOut,
  Newspaper,
  History,
  Settings,
  Eye,
  Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { 
  RoleType, 
  ComplaintStatus, 
  AppointmentStatus, 
  ProjectStatus, 
  ComplaintApplication, 
  AppointmentRequest, 
  DevelopmentProject 
} from '../types';
import { MP_PROFILE } from '../data/mockData';

type AdminTab = 
  | 'overview' 
  | 'complaints' 
  | 'appointments' 
  | 'projects' 
  | 'news' 
  | 'audit' 
  | 'settings';

export const AdminDashboard: React.FC = () => {
  const { 
    complaints, 
    appointments, 
    projects, 
    news, 
    auditLogs,
    currentRole, 
    setCurrentRole, 
    isAdminLoggedIn, 
    setIsAdminLoggedIn,
    updateComplaintStatus,
    updateAppointmentStatus,
    updateProject,
    addProject,
    addNewsArticle,
    deleteNewsArticle,
    resetAllData,
    showToast,
    setActivePage
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Role permissions check
  // সুপার অ্যাডমিন, সংসদ সদস্য, ব্যক্তিগত সচিব, অফিস কর্মকর্তা, কনটেন্ট ম্যানেজার
  const canManageComplaints = ['সুপার অ্যাডমিন', 'সংসদ সদস্য', 'ব্যক্তিগত সচিব', 'অফিস কর্মকর্তা'].includes(currentRole);
  const canManageAppointments = ['সুপার অ্যাডমিন', 'সংসদ সদস্য', 'ব্যক্তিগত সচিব'].includes(currentRole);
  const canManageProjects = ['সুপার অ্যাডমিন', 'সংসদ সদস্য', 'অফিস কর্মকর্তা'].includes(currentRole);
  const canManageNews = ['সুপার অ্যাডমিন', 'সংসদ সদস্য', 'কনটেন্ট ম্যানেজার'].includes(currentRole);
  const canViewAudit = ['সুপার অ্যাডমিন', 'সংসদ সদস্য', 'ব্যক্তিগত সচিব'].includes(currentRole);

  // Search & Filter in complaints
  const [complaintSearch, setComplaintSearch] = useState('');
  const [complaintStatusFilter, setComplaintStatusFilter] = useState('সকল');
  
  // Selected complaint for status change modal
  const [editingComplaint, setEditingComplaint] = useState<ComplaintApplication | null>(null);
  const [modalStatus, setModalStatus] = useState<ComplaintStatus>('নতুন আবেদন');
  const [modalDepartment, setModalDepartment] = useState('');
  const [modalNotes, setModalNotes] = useState('');
  const [modalResolution, setModalResolution] = useState('');

  // Selected appointment for schedule modal
  const [editingAppointment, setEditingAppointment] = useState<AppointmentRequest | null>(null);
  const [aptStatus, setAptStatus] = useState<AppointmentStatus>('অপেক্ষমান');
  const [aptDate, setAptDate] = useState('');
  const [aptTime, setAptTime] = useState('');
  const [aptVenue, setAptVenue] = useState('');
  const [aptNotes, setAptNotes] = useState('');

  // Project Add Modal
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [newProj, setNewProj] = useState({
    title: '',
    category: 'সড়ক উন্নয়ন' as any,
    location: '',
    upazila: 'দুর্গাপুর' as any,
    implementingAgency: '',
    estimatedBudget: '',
    startDate: '',
    targetCompletionDate: '',
    status: 'পরিকল্পনাধীন' as any,
    progress: 0,
    description: '',
  });

  // News Add Modal
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false);
  const [newNews, setNewNews] = useState({
    title: '',
    category: 'এলাকা সফর',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    content: '',
    imageUrl: '/src/assets/images/constituency_public_meeting_1794469797718.jpg',
  });

  // KPI Calculations
  const totalComplaints = complaints.length;
  const newComplaints = complaints.filter(c => c.status === 'নতুন আবেদন').length;
  const inProgressComplaints = complaints.filter(c => ['পর্যালোচনাধীন', 'প্রক্রিয়াধীন', 'সংশ্লিষ্ট দপ্তরে প্রেরিত'].includes(c.status)).length;
  const resolvedComplaints = complaints.filter(c => c.status === 'নিষ্পত্তি হয়েছে').length;
  const pendingAppointments = appointments.filter(a => a.status === 'অপেক্ষমান').length;
  const runningProjects = projects.filter(p => p.status === 'চলমান').length;

  const handleOpenComplaintEdit = (c: ComplaintApplication) => {
    setEditingComplaint(c);
    setModalStatus(c.status);
    setModalDepartment(c.assignedDepartment || '');
    setModalNotes(c.adminNotes || '');
    setModalResolution(c.officialResolution || '');
  };

  const handleSaveComplaintEdit = () => {
    if (!editingComplaint) return;
    updateComplaintStatus(
      editingComplaint.id,
      modalStatus,
      modalNotes,
      modalDepartment,
      modalResolution
    );
    setEditingComplaint(null);
  };

  const handleOpenAppointmentEdit = (a: AppointmentRequest) => {
    setEditingAppointment(a);
    setAptStatus(a.status);
    setAptDate(a.scheduledDate || a.preferredDate);
    setAptTime(a.scheduledTime || a.preferredTime);
    setAptVenue(a.venue || 'এমপি মহোদয়ের দুর্গাপুর কার্যালয়');
    setAptNotes(a.adminNotes || '');
  };

  const handleSaveAppointmentEdit = () => {
    if (!editingAppointment) return;
    updateAppointmentStatus(
      editingAppointment.id,
      aptStatus,
      aptDate,
      aptTime,
      aptVenue,
      aptNotes
    );
    setEditingAppointment(null);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProj.title.trim() || !newProj.location.trim()) {
      showToast('প্রকল্পের শিরোনাম ও অবস্থান প্রদান করুন', 'error');
      return;
    }
    addProject({
      ...newProj,
      imageUrl: '/src/assets/images/rajshahi_rural_road_project_1794469797718.jpg',
    });
    setIsAddProjectOpen(false);
    setNewProj({
      title: '',
      category: 'সড়ক উন্নয়ন',
      location: '',
      upazila: 'দুর্গাপুর',
      implementingAgency: '',
      estimatedBudget: '',
      startDate: '',
      targetCompletionDate: '',
      status: 'পরিকল্পনাধীন',
      progress: 0,
      description: '',
    });
  };

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNews.title.trim() || !newNews.content.trim()) {
      showToast('সংবাদের শিরোনাম ও বিবরণ পূরণ করুন', 'error');
      return;
    }
    addNewsArticle(newNews);
    setIsAddNewsOpen(false);
    setNewNews({
      title: '',
      category: 'এলাকা সফর',
      date: new Date().toISOString().split('T')[0],
      excerpt: '',
      content: '',
      imageUrl: '/src/assets/images/constituency_public_meeting_1794469797718.jpg',
    });
  };

  const filteredComplaints = complaints.filter((c) => {
    const matchStatus = complaintStatusFilter === 'সকল' || c.status === complaintStatusFilter;
    const matchSearch = 
      c.trackingNumber.toLowerCase().includes(complaintSearch.toLowerCase()) ||
      c.applicantName.toLowerCase().includes(complaintSearch.toLowerCase()) ||
      c.title.toLowerCase().includes(complaintSearch.toLowerCase()) ||
      c.phone.includes(complaintSearch);
    return matchStatus && matchSearch;
  });

  const exportComplaintsCSV = () => {
    const headers = 'ট্র্যাকিং কোড,আবেদনকারীর নাম,ফোন,উপজেলা,ইউনিয়ন,ধরন,শিরোনাম,অবস্থা,তারিখ\n';
    const rows = complaints.map(c => 
      `"${c.trackingNumber}","${c.applicantName}","${c.phone}","${c.upazila}","${c.union}","${c.type}","${c.title}","${c.status}","${c.createdAt}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MP_Office_Complaints_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    showToast('নাগরিক আবেদনের এক্সপোর্ট CSV ফাইল তৈরি হয়েছে।');
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Top Admin Header with Role Switcher */}
      <div className="glass-panel p-5 sm:p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-2 border-emerald-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-bold text-[#006B3F] uppercase tracking-wider">
              ডিজিটাল সচিবালয় ও অভ্যন্তরীণ ড্যাশবোর্ড
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17251E] font-serif">
            সংসদ সদস্য কার্যালয় ম্যানেজমেন্ট সিস্টেম
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            ৫৬ রাজশাহী-৫ (দুর্গাপুর–পুঠিয়া) · সংসদ সদস্য নাজরুল ইসলাম মণ্ডল
          </p>
        </div>

        {/* Role Selector & Fast Reset */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-[#006B3F]" />
            <span className="text-xs font-semibold text-gray-700">ভূমিকা:</span>
            <select
              value={currentRole}
              onChange={(e) => {
                setCurrentRole(e.target.value as RoleType);
                showToast(`ভূমিকা পরিবর্তিত: ${e.target.value}`, 'info');
              }}
              className="text-xs font-bold text-[#006B3F] bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="সুপার অ্যাডমিন">সুপার অ্যাডমিন</option>
              <option value="সংসদ সদস্য">সংসদ সদস্য (এমপি)</option>
              <option value="ব্যক্তিগত সচিব">ব্যক্তিগত সচিব (পিএস)</option>
              <option value="অফিস কর্মকর্তা">অফিস কর্মকর্তা</option>
              <option value="কনটেন্ট ম্যানেজার">কনটেন্ট ম্যানেজার</option>
            </select>
          </div>

          <button
            onClick={resetAllData}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
            title="নমুনা তথ্য রিসেট করুন"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActivePage('home')}
            className="px-3.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>মূল ওয়েবসাইটে ফিরুন</span>
          </button>
        </div>
      </div>

      {/* Nav Tabs for Admin Modules */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2">
        {[
          { id: 'overview', label: 'ড্যাশবোর্ড সারসংক্ষেপ', icon: TrendingUp },
          { id: 'complaints', label: `নাগরিক আবেদন (${complaints.length})`, icon: FileText, allowed: canManageComplaints },
          { id: 'appointments', label: `সাক্ষাৎ (${appointments.length})`, icon: Calendar, allowed: canManageAppointments },
          { id: 'projects', label: `উন্নয়ন প্রকল্প (${projects.length})`, icon: Briefcase, allowed: canManageProjects },
          { id: 'news', label: `সংবাদ ও মিডিয়া (${news.length})`, icon: Newspaper, allowed: canManageNews },
          { id: 'audit', label: `অডিট লগ (${auditLogs.length})`, icon: History, allowed: canViewAudit },
        ].filter(item => item.allowed !== false).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as AdminTab)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === item.id
                ? 'bg-[#006B3F] text-white shadow-md'
                : 'bg-white hover:bg-emerald-50 text-gray-700 border border-gray-200'
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW & KPIS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* KPI Widget Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="glass-panel p-4 rounded-2xl border-l-4 border-l-emerald-600 space-y-1">
              <span className="text-xs text-gray-500 font-medium">মোট নাগরিক আবেদন</span>
              <div className="text-2xl font-extrabold text-[#17251E] font-mono tabular-nums">{totalComplaints}</div>
              <span className="text-[10px] text-emerald-700">সর্বমোট দাখিলকৃত</span>
            </div>

            <div className="glass-panel p-4 rounded-2xl border-l-4 border-l-amber-500 space-y-1">
              <span className="text-xs text-gray-500 font-medium">নতুন অভিযোগ</span>
              <div className="text-2xl font-extrabold text-amber-600 font-mono tabular-nums">{newComplaints}</div>
              <span className="text-[10px] text-amber-800">পর্যালোচনা অপেক্ষমান</span>
            </div>

            <div className="glass-panel p-4 rounded-2xl border-l-4 border-l-blue-500 space-y-1">
              <span className="text-xs text-gray-500 font-medium">প্রক্রিয়াধীন</span>
              <div className="text-2xl font-extrabold text-blue-600 font-mono tabular-nums">{inProgressComplaints}</div>
              <span className="text-[10px] text-blue-800">দপ্তরে প্রেরিত / যাচাই</span>
            </div>

            <div className="glass-panel p-4 rounded-2xl border-l-4 border-l-green-600 space-y-1">
              <span className="text-xs text-gray-500 font-medium">নিষ্পত্তিকৃত</span>
              <div className="text-2xl font-extrabold text-green-700 font-mono tabular-nums">{resolvedComplaints}</div>
              <span className="text-[10px] text-green-800">সমাধান সম্পন্ন</span>
            </div>

            <div className="glass-panel p-4 rounded-2xl border-l-4 border-l-purple-500 space-y-1">
              <span className="text-xs text-gray-500 font-medium">সাক্ষাৎ অপেক্ষমান</span>
              <div className="text-2xl font-extrabold text-purple-700 font-mono tabular-nums">{pendingAppointments}</div>
              <span className="text-[10px] text-purple-800">সময় নির্ধারণ বাকি</span>
            </div>

            <div className="glass-panel p-4 rounded-2xl border-l-4 border-l-teal-500 space-y-1">
              <span className="text-xs text-gray-500 font-medium">চলমান প্রকল্প</span>
              <div className="text-2xl font-extrabold text-teal-700 font-mono tabular-nums">{runningProjects}</div>
              <span className="text-[10px] text-teal-800">অবকাঠামো অগ্রগতি</span>
            </div>
          </div>

          {/* Quick Dual Action Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Complaints Stream */}
            <div className="glass-panel p-5 rounded-3xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-150">
                <h3 className="text-base font-bold text-[#17251E] font-serif flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#006B3F]" />
                  <span>সর্বশেষ নাগরিক আবেদনসমূহ</span>
                </h3>
                <button
                  onClick={() => setActiveTab('complaints')}
                  className="text-xs font-bold text-[#006B3F] hover:underline"
                >
                  সকল আবেদন দেখুন →
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {complaints.slice(0, 4).map((c) => (
                  <div key={c.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-gray-800">{c.trackingNumber}</span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">
                          {c.upazila}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-900 mt-0.5 truncate max-w-xs">{c.title}</p>
                      <span className="text-gray-500">{c.applicantName} · {c.phone}</span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold block ${
                        c.status === 'নিষ্পত্তি হয়েছে' ? 'bg-emerald-100 text-[#006B3F]' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {c.status}
                      </span>
                      <button
                        onClick={() => handleOpenComplaintEdit(c)}
                        className="text-[11px] text-[#006B3F] font-bold hover:underline mt-1 block"
                      >
                        আপডেট করুন
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Appointments Stream */}
            <div className="glass-panel p-5 rounded-3xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-150">
                <h3 className="text-base font-bold text-[#17251E] font-serif flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span>সাক্ষাতের অনুরোধের তালিকা</span>
                </h3>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="text-xs font-bold text-[#006B3F] hover:underline"
                >
                  সকল সাক্ষাৎ →
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {appointments.slice(0, 4).map((a) => (
                  <div key={a.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-gray-800">{a.trackingNumber}</span>
                        <span className="text-gray-500">{a.preferredDate}</span>
                      </div>
                      <p className="font-semibold text-gray-900 mt-0.5 truncate max-w-xs">{a.purpose}</p>
                      <span className="text-gray-500">{a.applicantName} {a.organization ? `(${a.organization})` : ''}</span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold block ${
                        a.status === 'অনুমোদিত' ? 'bg-emerald-100 text-[#006B3F]' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {a.status}
                      </span>
                      <button
                        onClick={() => handleOpenAppointmentEdit(a)}
                        className="text-[11px] text-purple-700 font-bold hover:underline mt-1 block"
                      >
                        সিডিউল করুন
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMPLAINTS & APPLICATION MANAGER */}
      {activeTab === 'complaints' && (
        <div className="glass-panel p-6 rounded-3xl space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-150">
            <div>
              <h2 className="text-xl font-bold text-[#17251E] font-serif">
                নাগরিক আবেদন ও অভিযোগ ব্যবস্থাপনা
              </h2>
              <p className="text-xs text-gray-500">
                আবেদনের স্থিতি পরিবর্তন, সংশ্লিষ্ট সরকারি দপ্তরে অগ্রগামীকরণ ও নিষ্পত্তির বিবরণ লিপিবদ্ধকরণ
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={exportComplaintsCSV}
                className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#006B3F] border border-emerald-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV রিপোর্ট এক্সপোর্ট</span>
              </button>
            </div>
          </div>

          {/* Search & Filter Strip */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ট্র্যাকিং কোড, নাম, ফোন বা সমস্যা খুঁজুন..."
                value={complaintSearch}
                onChange={(e) => setComplaintSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {['সকল', 'নতুন আবেদন', 'পর্যালোচনাধীন', 'প্রক্রিয়াধীন', 'সংশ্লিষ্ট দপ্তরে প্রেরিত', 'নিষ্পত্তি হয়েছে'].map((st) => (
                <button
                  key={st}
                  onClick={() => setComplaintStatusFilter(st)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                    complaintStatusFilter === st
                      ? 'bg-[#006B3F] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Table of Complaints */}
          <div className="overflow-x-auto border border-gray-150 rounded-2xl bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-700 border-b border-gray-150 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">ট্র্যাকিং কোড</th>
                  <th className="py-3 px-4">আবেদনকারী</th>
                  <th className="py-3 px-4">উপজেলা ও ইউনিয়ন</th>
                  <th className="py-3 px-4">ধরন ও বিষয়</th>
                  <th className="py-3 px-4">বর্তমান অবস্থা</th>
                  <th className="py-3 px-4">তারিখ</th>
                  <th className="py-3 px-4 text-right">কার্যক্রম</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {filteredComplaints.map((c) => (
                  <tr key={c.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#006B3F]">
                      {c.trackingNumber}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900">{c.applicantName}</div>
                      <div className="text-[11px] text-gray-500 font-mono">{c.phone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold">{c.upazila}</span>
                      <div className="text-[11px] text-gray-500">{c.union} (ওয়ার্ড {c.ward})</div>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {c.type}
                      </span>
                      <p className="font-medium text-gray-900 truncate mt-1">{c.title}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block ${
                        c.status === 'নিষ্পত্তি হয়েছে'
                          ? 'bg-emerald-100 text-[#006B3F]'
                          : c.status === 'সংশ্লিষ্ট দপ্তরে প্রেরিত'
                          ? 'bg-blue-100 text-blue-800'
                          : c.status === 'নতুন আবেদন'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                      {c.createdAt}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleOpenComplaintEdit(c)}
                        className="px-3 py-1 bg-[#006B3F] hover:bg-[#004D30] text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                      >
                        ব্যবস্থাপনা
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: APPOINTMENT MANAGER */}
      {activeTab === 'appointments' && (
        <div className="glass-panel p-6 rounded-3xl space-y-6 shadow-md">
          <div className="pb-4 border-b border-gray-150">
            <h2 className="text-xl font-bold text-[#17251E] font-serif">
              সাক্ষাৎ ও অ্যাপয়েন্টমেন্ট শিডিউলিং
            </h2>
            <p className="text-xs text-gray-500">
              নাগরিক ও প্রতিনিধি দলের সাক্ষাতের অনুরোধ অনুমোদন, সময় ও স্থান নির্ধারণ
            </p>
          </div>

          <div className="overflow-x-auto border border-gray-150 rounded-2xl bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-700 border-b border-gray-150 font-bold uppercase">
                <tr>
                  <th className="py-3 px-4">রেফারেন্স</th>
                  <th className="py-3 px-4">আবেদনকারী / সংগঠন</th>
                  <th className="py-3 px-4">উদ্দেশ্য</th>
                  <th className="py-3 px-4">পছন্দের তারিখ ও সময়</th>
                  <th className="py-3 px-4">অবস্থা</th>
                  <th className="py-3 px-4">নির্ধারিত সময় ও স্থান</th>
                  <th className="py-3 px-4 text-right">কার্যক্রম</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((a) => (
                  <tr key={a.id} className="hover:bg-purple-50/20">
                    <td className="py-3 px-4 font-mono font-bold text-purple-700">{a.trackingNumber}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900">{a.applicantName}</div>
                      <div className="text-[11px] text-gray-500">{a.organization || a.upazila} · {a.phone}</div>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <p className="line-clamp-2">{a.purpose}</p>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {a.preferredDate} ({a.preferredTime})
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        a.status === 'অনুমোদিত'
                          ? 'bg-emerald-100 text-[#006B3F]'
                          : a.status === 'অপেক্ষমান'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {a.scheduledDate ? (
                        <div className="text-[11px]">
                          <span className="font-bold text-[#006B3F]">{a.scheduledDate} {a.scheduledTime}</span>
                          <p className="text-gray-500 truncate max-w-xs">{a.venue}</p>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">এখনও নির্ধারিত হয়নি</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleOpenAppointmentEdit(a)}
                        className="px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
                      >
                        শিডিউল করুন
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: PROJECTS MANAGER */}
      {activeTab === 'projects' && (
        <div className="glass-panel p-6 rounded-3xl space-y-6 shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-gray-150">
            <div>
              <h2 className="text-xl font-bold text-[#17251E] font-serif">
                উন্নয়ন প্রকল্প হালনাগাদ ও ব্যবস্থাপনা
              </h2>
              <p className="text-xs text-gray-500">
                অগ্রগতির হার আপডেট, নতুন প্রকল্প যুক্তকরণ এবং স্ট্যাটাস পরিবর্তন
              </p>
            </div>

            <button
              onClick={() => setIsAddProjectOpen(true)}
              className="px-4 py-2 bg-[#006B3F] hover:bg-[#004D30] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন প্রকল্প যুক্ত করুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div key={p.id} className="p-4 rounded-2xl bg-white border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {p.category} · {p.upazila}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    p.status === 'সম্পন্ন' ? 'bg-emerald-100 text-[#006B3F]' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {p.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#17251E] font-serif">{p.title}</h4>
                <p className="text-xs text-gray-500">{p.location}</p>

                {/* Progress Slider */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>অগ্রগতি হার:</span>
                    <span className="text-[#006B3F] tabular-nums font-mono">{p.progress}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={p.progress}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      updateProject({
                        ...p,
                        progress: val,
                        status: val === 100 ? 'সম্পন্ন' : p.status,
                        lastUpdated: new Date().toISOString().split('T')[0]
                      });
                    }}
                    className="w-full accent-[#006B3F] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px] text-gray-500">
                  <span>সংস্থা: {p.implementingAgency}</span>
                  <div className="flex items-center gap-2">
                    <select
                      value={p.status}
                      onChange={(e) => {
                        updateProject({
                          ...p,
                          status: e.target.value as ProjectStatus,
                          lastUpdated: new Date().toISOString().split('T')[0]
                        });
                      }}
                      className="border border-gray-200 rounded px-1.5 py-0.5 text-[11px] bg-white font-bold"
                    >
                      <option value="পরিকল্পনাধীন">পরিকল্পনাধীন</option>
                      <option value="চলমান">চলমান</option>
                      <option value="সম্পন্ন">সম্পন্ন</option>
                      <option value="স্থগিত">স্থগিত</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: NEWS & MEDIA MANAGER */}
      {activeTab === 'news' && (
        <div className="glass-panel p-6 rounded-3xl space-y-6 shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-gray-150">
            <div>
              <h2 className="text-xl font-bold text-[#17251E] font-serif">
                সংবাদ ও প্রেস বিজ্ঞপ্তি প্রকাশনা
              </h2>
              <p className="text-xs text-gray-500">
                নতুন সংবাদ প্রকাশ ও মিডিয়া আর্কাইভ নিয়ন্ত্রণ
              </p>
            </div>

            <button
              onClick={() => setIsAddNewsOpen(true)}
              className="px-4 py-2 bg-[#006B3F] hover:bg-[#004D30] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন সংবাদ প্রকাশ</span>
            </button>
          </div>

          <div className="divide-y divide-gray-100 bg-white rounded-2xl border border-gray-150 p-2">
            {news.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={item.imageUrl} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-[#006B3F] bg-emerald-50 px-2 py-0.5 rounded">
                      {item.category} · {item.date}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900 mt-1 font-serif line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{item.excerpt}</p>
                  </div>
                </div>

                <button
                  onClick={() => deleteNewsArticle(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0"
                  title="মুছে ফেলুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="glass-panel p-6 rounded-3xl space-y-6 shadow-md">
          <div className="pb-4 border-b border-gray-150">
            <h2 className="text-xl font-bold text-[#17251E] font-serif">
              অডিট ও অ্যাক্টিভিটি লগ (Security & Audit Trail)
            </h2>
            <p className="text-xs text-gray-500">
              কার্যালয়ের কর্মকর্তা ও ব্যবহারকারীদের প্রতিটি কাজের স্বয়ংক্রিয় সময়লিপিবদ্ধ বিবরণ
            </p>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3.5 rounded-xl bg-white border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#006B3F]">{log.action}</span>
                    <span className="text-gray-400">·</span>
                    <span className="font-semibold text-gray-800">{log.user} ({log.role})</span>
                  </div>
                  <p className="text-gray-600 mt-0.5">{log.details}</p>
                </div>

                <span className="text-[11px] text-gray-500 font-mono whitespace-nowrap">
                  {log.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: Edit Complaint Status */}
      {editingComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="text-base font-bold text-[#17251E] font-serif">
                আবেদনের অবস্থা আপডেট: {editingComplaint.trackingNumber}
              </h3>
              <button onClick={() => setEditingComplaint(null)} className="text-gray-400 font-bold">✕</button>
            </div>

            <div className="text-xs text-gray-700 bg-gray-50 p-3 rounded-xl space-y-1">
              <p>আবেদনকারী: <strong>{editingComplaint.applicantName}</strong> ({editingComplaint.phone})</p>
              <p>বিষয়: {editingComplaint.title}</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">অবস্থা পরিবর্তন করুন *</label>
                <select
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value as ComplaintStatus)}
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl font-bold text-[#006B3F]"
                >
                  <option value="নতুন আবেদন">নতুন আবেদন</option>
                  <option value="পর্যালোচনাধীন">পর্যালোচনাধীন</option>
                  <option value="প্রক্রিয়াধীন">প্রক্রিয়াধীন</option>
                  <option value="সংশ্লিষ্ট দপ্তরে প্রেরিত">সংশ্লিষ্ট দপ্তরে প্রেরিত</option>
                  <option value="নিষ্পত্তি হয়েছে">নিষ্পত্তি হয়েছে</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">সংশ্লিষ্ট দপ্তর / কর্মকর্তা</label>
                <input
                  type="text"
                  placeholder="যেমন: উপজেলা প্রকৌশলী (LGED), দুর্গাপুর"
                  value={modalDepartment}
                  onChange={(e) => setModalDepartment(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">অভ্যন্তরীণ প্রশাসনিক নোট (Admin Note)</label>
                <textarea
                  rows={2}
                  placeholder="চিঠি পাঠানো হয়েছে, পরিদর্শন দল গঠন করা হয়েছে ইত্যাদি..."
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">নাগরিককে প্রদর্শনের জন্য আনুষ্ঠানিক নিষ্পত্তির বিবরণ</label>
                <textarea
                  rows={2}
                  placeholder="সমস্যার সমাধানের অগ্রগতি বা বরাদ্দ প্রদানের বিবরণ..."
                  value={modalResolution}
                  onChange={(e) => setModalResolution(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => setEditingComplaint(null)}
                className="px-4 py-2 border border-gray-300 text-xs font-semibold rounded-xl"
              >
                বাতিল
              </button>
              <button
                onClick={handleSaveComplaintEdit}
                className="px-5 py-2 bg-[#006B3F] text-white text-xs font-bold rounded-xl shadow-md"
              >
                সংরক্ষণ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Edit Appointment Request */}
      {editingAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="text-base font-bold text-[#17251E] font-serif">
                সাক্ষাৎ শিডিউল: {editingAppointment.trackingNumber}
              </h3>
              <button onClick={() => setEditingAppointment(null)} className="text-gray-400 font-bold">✕</button>
            </div>

            <div className="text-xs text-gray-700 bg-gray-50 p-3 rounded-xl space-y-1">
              <p>আবেদনকারী: <strong>{editingAppointment.applicantName}</strong> ({editingAppointment.phone})</p>
              <p>উদ্দেশ্য: {editingAppointment.purpose}</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">অনুরোধের অবস্থা</label>
                <select
                  value={aptStatus}
                  onChange={(e) => setAptStatus(e.target.value as AppointmentStatus)}
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl font-bold"
                >
                  <option value="অপেক্ষমান">অপেক্ষমান</option>
                  <option value="অনুমোদিত">অনুমোদিত</option>
                  <option value="বাতিল">বাতিল</option>
                  <option value="পুনঃনির্ধারিত">পুনঃনির্ধারিত</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">নির্ধারিত তারিখ</label>
                  <input
                    type="date"
                    value={aptDate}
                    onChange={(e) => setAptDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">নির্ধারিত সময়</label>
                  <input
                    type="text"
                    value={aptTime}
                    onChange={(e) => setAptTime(e.target.value)}
                    placeholder="সকাল ১১:৩০"
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">সাক্ষাতের স্থান</label>
                <input
                  type="text"
                  value={aptVenue}
                  onChange={(e) => setAptVenue(e.target.value)}
                  placeholder="এমপি মহোদয়ের দুর্গাপুর কার্যালয়"
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">প্রশাসনিক মন্তব্য / নোট</label>
                <textarea
                  rows={2}
                  value={aptNotes}
                  onChange={(e) => setAptNotes(e.target.value)}
                  placeholder="প্রতিনিধি দলের সাথে আলোচনা হবে..."
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => setEditingAppointment(null)}
                className="px-4 py-2 border border-gray-300 text-xs font-semibold rounded-xl"
              >
                বাতিল
              </button>
              <button
                onClick={handleSaveAppointmentEdit}
                className="px-5 py-2 bg-purple-700 text-white text-xs font-bold rounded-xl shadow-md"
              >
                সংরক্ষণ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Add New Development Project */}
      {isAddProjectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="text-base font-bold text-[#17251E] font-serif">
                নতুন উন্নয়ন প্রকল্প অন্তর্ভুক্তিকরণ
              </h3>
              <button onClick={() => setIsAddProjectOpen(false)} className="text-gray-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">প্রকল্পের নাম *</label>
                <input
                  type="text"
                  placeholder="যেমন: দুর্গাপুর–পানানগর পাকা রাস্তা নির্মাণ"
                  value={newProj.title}
                  onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={newProj.category}
                    onChange={(e) => setNewProj({ ...newProj, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                  >
                    <option value="সড়ক উন্নয়ন">সড়ক উন্নয়ন</option>
                    <option value="ব্রিজ ও কালভার্ট">ব্রিজ ও কালভার্ট</option>
                    <option value="শিক্ষা প্রতিষ্ঠান">শিক্ষা প্রতিষ্ঠান</option>
                    <option value="স্বাস্থ্যসেবা">স্বাস্থ্যসেবা</option>
                    <option value="পানি ও স্যানিটেশন">পানি ও স্যানিটেশন</option>
                    <option value="অন্যান্য">অন্যান্য</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">উপজেলা</label>
                  <select
                    value={newProj.upazila}
                    onChange={(e) => setNewProj({ ...newProj, upazila: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                  >
                    <option value="দুর্গাপুর">দুর্গাপুর</option>
                    <option value="পুঠিয়া">পুঠিয়া</option>
                    <option value="উভয় উপজেলা">উভয় উপজেলা</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">সুনির্দিষ্ট অবস্থান *</label>
                <input
                  type="text"
                  placeholder="যেমন: পানানগর ইউনিয়ন রোড"
                  value={newProj.location}
                  onChange={(e) => setNewProj({ ...newProj, location: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">বাস্তবায়নকারী সংস্থা</label>
                  <input
                    type="text"
                    placeholder="যেমন: স্থানীয় সরকার প্রকৌশল অধিদপ্তর (LGED)"
                    value={newProj.implementingAgency}
                    onChange={(e) => setNewProj({ ...newProj, implementingAgency: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">প্রকল্পের বাজেট / স্কিম</label>
                  <input
                    type="text"
                    placeholder="যেমন: সরকারি রাজস্ব তহবিল"
                    value={newProj.estimatedBudget}
                    onChange={(e) => setNewProj({ ...newProj, estimatedBudget: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">বিবরণ</label>
                <textarea
                  rows={2}
                  placeholder="প্রকল্পের লক্ষ্য ও সুবিধাভোগী মানুষের উপকারিতা..."
                  value={newProj.description}
                  onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProjectOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-xs font-semibold rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#006B3F] text-white text-xs font-bold rounded-xl shadow-md"
                >
                  প্রকল্প যুক্ত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Add News Article */}
      {isAddNewsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="text-base font-bold text-[#17251E] font-serif">
                নতুন সংবাদ বা প্রেস বিজ্ঞপ্তি প্রকাশ
              </h3>
              <button onClick={() => setIsAddNewsOpen(false)} className="text-gray-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateNews} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">শিরোনাম *</label>
                <input
                  type="text"
                  placeholder="সংবাদের মূল শিরোনাম"
                  value={newNews.title}
                  onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">বিভাগ</label>
                  <select
                    value={newNews.category}
                    onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                  >
                    <option value="এলাকা সফর">এলাকা সফর</option>
                    <option value="সংসদীয় সংবাদ">সংসদীয় সংবাদ</option>
                    <option value="উন্নয়ন পরিদর্শন">উন্নয়ন পরিদর্শন</option>
                    <option value="প্রেস বিজ্ঞপ্তি">প্রেস বিজ্ঞপ্তি</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">তারিখ</label>
                  <input
                    type="date"
                    value={newNews.date}
                    onChange={(e) => setNewNews({ ...newNews, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">সংক্ষিপ্ত সারসংক্ষেপ</label>
                <input
                  type="text"
                  placeholder="এক বা দুই লাইনে সারসংক্ষেপ..."
                  value={newNews.excerpt}
                  onChange={(e) => setNewNews({ ...newNews, excerpt: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">সম্পূর্ণ প্রতিবেদন *</label>
                <textarea
                  rows={4}
                  placeholder="সংবাদের বিস্তারিত বিবরণ লিখুন..."
                  value={newNews.content}
                  onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-gray-300 rounded-xl"
                  required
                />
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddNewsOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-xs font-semibold rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#006B3F] text-white text-xs font-bold rounded-xl shadow-md"
                >
                  প্রকাশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
