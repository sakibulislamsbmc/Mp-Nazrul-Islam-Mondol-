import React, { useState, useEffect } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Calendar, 
  AlertCircle, 
  FileText, 
  ChevronRight,
  ShieldCheck,
  User,
  MapPin,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ComplaintStatus } from '../../types';

export const TrackingSystem: React.FC = () => {
  const { complaints, appointments, searchTrackingNumber, setSearchTrackingNumber, setActivePage } = useApp();
  const [query, setQuery] = useState(searchTrackingNumber || '');
  const [searchedCode, setSearchedCode] = useState(searchTrackingNumber || '');

  useEffect(() => {
    if (searchTrackingNumber) {
      setQuery(searchTrackingNumber);
      setSearchedCode(searchTrackingNumber);
    }
  }, [searchTrackingNumber]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchedCode(query.trim());
    setSearchTrackingNumber(query.trim());
  };

  // Find complaint or appointment
  const foundComplaint = complaints.find(
    (c) => c.trackingNumber.toLowerCase() === searchedCode.trim().toLowerCase()
  );

  const foundAppointment = appointments.find(
    (a) => a.trackingNumber.toLowerCase() === searchedCode.trim().toLowerCase()
  );

  // Mask phone number for privacy
  const maskPhone = (phone: string) => {
    if (!phone) return '';
    const clean = phone.replace(/[^0-9]/g, '');
    if (clean.length >= 11) {
      return `${clean.substring(0, 4)}-***-${clean.substring(clean.length - 3)}`;
    }
    return phone;
  };

  const complaintSteps: ComplaintStatus[] = [
    'নতুন আবেদন',
    'পর্যালোচনাধীন',
    'প্রক্রিয়াধীন',
    'সংশ্লিষ্ট দপ্তরে প্রেরিত',
    'নিষ্পত্তি হয়েছে'
  ];

  const getStepIndex = (status: ComplaintStatus) => {
    return complaintSteps.indexOf(status);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-xs font-bold text-[#006B3F] mb-2">
          <Search className="w-3.5 h-3.5" />
          <span>সার্বক্ষণিক নাগরিক ট্র্যাকিং পোর্টাল</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#17251E] font-serif">
          আবেদন ও অভিযোগের বর্তমান অবস্থা
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          আপনার দাখিলকৃত আবেদনের ট্র্যাকিং নম্বর (যেমন: NIM-2026-1042 বা APT-2026-501) লিখে অনুসন্ধান করুন।
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-6 flex gap-2 max-w-lg mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ট্র্যাকিং কোড লিখুন (যেমন: NIM-2026-1042)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-[#006B3F]/30 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#006B3F] shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-[#006B3F] hover:bg-[#004D30] text-white font-bold text-sm rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>অনুসন্ধান</span>
          </button>
        </form>

        {/* Quick Sample Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-gray-500">পরীক্ষামূলক কোড:</span>
          {complaints.slice(0, 3).map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setQuery(c.trackingNumber);
                setSearchedCode(c.trackingNumber);
                setSearchTrackingNumber(c.trackingNumber);
              }}
              className="px-2.5 py-1 bg-white hover:bg-emerald-50 border border-gray-200 text-[#006B3F] rounded-lg text-xs font-mono font-semibold transition-colors"
            >
              {c.trackingNumber}
            </button>
          ))}
          {appointments.slice(0, 1).map((a) => (
            <button
              key={a.id}
              onClick={() => {
                setQuery(a.trackingNumber);
                setSearchedCode(a.trackingNumber);
                setSearchTrackingNumber(a.trackingNumber);
              }}
              className="px-2.5 py-1 bg-white hover:bg-emerald-50 border border-gray-200 text-[#006B3F] rounded-lg text-xs font-mono font-semibold transition-colors"
            >
              {a.trackingNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      {searchedCode && (
        <div className="mt-6">
          {foundComplaint ? (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
              {/* Header Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-150 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-[#006B3F] text-white px-2.5 py-1 rounded-md">
                      {foundComplaint.trackingNumber}
                    </span>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      {foundComplaint.type}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[#17251E] mt-2 font-serif">
                    {foundComplaint.title}
                  </h2>
                </div>

                <div className="sm:text-right">
                  <span className="text-xs text-gray-500 block">দাখিলের তারিখ</span>
                  <span className="text-sm font-semibold text-gray-800">{foundComplaint.createdAt}</span>
                </div>
              </div>

              {/* Status Timeline Progress Bar */}
              <div className="py-2">
                <span className="text-xs font-bold text-gray-700 block mb-3">অগ্রগতি ধাপ:</span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {complaintSteps.map((step, idx) => {
                    const currentIndex = getStepIndex(foundComplaint.status);
                    const isDone = idx <= currentIndex;
                    const isCurrent = idx === currentIndex;
                    return (
                      <div
                        key={step}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          isCurrent
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-md font-bold'
                            : isDone
                            ? 'bg-emerald-50 text-[#006B3F] border-emerald-200 font-semibold'
                            : 'bg-gray-50 text-gray-400 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-center mb-1">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <Clock className="w-4 h-4 opacity-50" />
                          )}
                        </div>
                        <span className="text-[11px] leading-tight block">{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-150 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-gray-150 space-y-1.5">
                  <span className="font-bold text-gray-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#006B3F]" />
                    আবেদনকারী:
                  </span>
                  <p className="text-sm font-semibold text-gray-900">{foundComplaint.applicantName}</p>
                  <p className="text-gray-500">ফোন: {maskPhone(foundComplaint.phone)} (গোপনীয়তা সুরক্ষিত)</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-gray-150 space-y-1.5">
                  <span className="font-bold text-gray-700 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    অবস্থান:
                  </span>
                  <p className="text-sm font-semibold text-gray-900">
                    {foundComplaint.upazila} উপজেলা · {foundComplaint.union}
                  </p>
                  <p className="text-gray-500">ওয়ার্ড: {foundComplaint.ward} · {foundComplaint.address}</p>
                </div>
              </div>

              {/* Administrative Resolution & Notes */}
              <div className="space-y-3 pt-2 border-t border-gray-150">
                {foundComplaint.assignedDepartment && (
                  <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900">
                    <span className="font-bold block flex items-center gap-1.5 mb-0.5">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      দায়িত্বপ্রাপ্ত দপ্তর:
                    </span>
                    <p className="font-semibold text-blue-950">{foundComplaint.assignedDepartment}</p>
                  </div>
                )}

                {foundComplaint.adminNotes && (
                  <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                    <span className="font-bold block mb-0.5">সংসদ সদস্যের কার্যালয়ের মন্তব্য:</span>
                    <p>{foundComplaint.adminNotes}</p>
                  </div>
                )}

                {foundComplaint.officialResolution && (
                  <div className="p-3.5 bg-teal-50 border border-teal-300 rounded-xl text-xs text-teal-900">
                    <span className="font-bold block text-teal-950 mb-0.5">গৃহীত পদক্ষেপ / নিষ্পত্তির বিবরণ:</span>
                    <p>{foundComplaint.officialResolution}</p>
                  </div>
                )}
              </div>
            </div>
          ) : foundAppointment ? (
            /* Found Appointment */
            <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-150 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-[#006B3F] text-white px-2.5 py-1 rounded-md">
                      {foundAppointment.trackingNumber}
                    </span>
                    <span className="text-xs font-semibold text-purple-800 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                      সাক্ষাতের অনুরোধ
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[#17251E] mt-2 font-serif">
                    {foundAppointment.purpose}
                  </h2>
                </div>

                <div className="sm:text-right">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    foundAppointment.status === 'অনুমোদিত' 
                      ? 'bg-emerald-100 text-[#006B3F]' 
                      : foundAppointment.status === 'অপেক্ষমান'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {foundAppointment.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-gray-150 space-y-1">
                  <span className="font-bold text-gray-700">আবেদনকারী:</span>
                  <p className="text-sm font-semibold text-gray-900">{foundAppointment.applicantName}</p>
                  {foundAppointment.organization && (
                    <p className="text-gray-600">প্রতিষ্ঠান: {foundAppointment.organization}</p>
                  )}
                  <p className="text-gray-500">ফোন: {maskPhone(foundAppointment.phone)}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-gray-150 space-y-1">
                  <span className="font-bold text-gray-700">প্রস্তাবিত সময়:</span>
                  <p className="text-sm font-semibold text-gray-900">{foundAppointment.preferredDate} ({foundAppointment.preferredTime})</p>
                  <p className="text-gray-500">এলাকা: {foundAppointment.upazila}</p>
                </div>
              </div>

              {foundAppointment.venue && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950">
                  <span className="font-bold block mb-1">সাক্ষাতের নির্ধারিত স্থান ও সময়:</span>
                  <p className="text-sm font-bold text-[#006B3F]">
                    {foundAppointment.scheduledDate} · {foundAppointment.scheduledTime}
                  </p>
                  <p className="mt-1">স্থান: {foundAppointment.venue}</p>
                </div>
              )}
            </div>
          ) : (
            /* Not Found */
            <div className="glass-panel p-8 rounded-3xl text-center space-y-4 max-w-lg mx-auto">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#17251E]">কোনো আবেদন খুঁজে পাওয়া যায়নি</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                '{searchedCode}' নম্বরে কোনো আবেদন ডাটাবেজে মেলেনি। অনুগ্রহ করে আপনার ট্র্যাকিং নম্বরটি সঠিকভাবে যাচাই করুন।
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActivePage('complaint-form')}
                  className="px-5 py-2.5 bg-[#006B3F] text-white text-xs font-bold rounded-xl hover:bg-[#004D30] transition-colors"
                >
                  নতুন আবেদন দাখিল করুন
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
