import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DevelopmentProject, ProjectCategory, ProjectStatus } from '../types';

export const ProjectsPage: React.FC = () => {
  const { projects, selectedProjectId, setSelectedProjectId } = useApp();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('সকল');
  const [selectedStatus, setSelectedStatus] = useState<string>('সকল');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [activeProjectModal, setActiveProjectModal] = useState<DevelopmentProject | null>(
    selectedProjectId ? projects.find(p => p.id === selectedProjectId) || null : null
  );

  const categories = ['সকল', 'সড়ক উন্নয়ন', 'শিক্ষা প্রতিষ্ঠান', 'স্বাস্থ্যসেবা', 'পানি ও স্যানিটেশন', 'অন্যান্য'];
  const upazilas = ['সকল', 'দুর্গাপুর', 'পুঠিয়া', 'উভয় উপজেলা'];
  const statuses = ['সকল', 'চলমান', 'পরিকল্পনাধীন', 'সম্পন্ন'];

  const filteredProjects = projects.filter((p) => {
    const matchCat = selectedCategory === 'সকল' || p.category === selectedCategory;
    const matchUpz = selectedUpazila === 'সকল' || p.upazila === selectedUpazila;
    const matchStat = selectedStatus === 'সকল' || p.status === selectedStatus;
    const matchSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.implementingAgency.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchUpz && matchStat && matchSearch;
  });

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#006B3F]/15 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-xs font-bold text-[#006B3F] mb-3">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>উন্নয়ন ট্র্যাকিং ও জনস্বার্থ পোর্টাল</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17251E] font-serif">
          উন্নয়ন প্রকল্প ও অবকাঠামো অগ্রগতি
        </h1>
        <p className="text-sm text-gray-600 mt-2 max-w-3xl leading-relaxed">
          দুর্গাপুর ও পুঠিয়ার প্রত্যন্ত অঞ্চল পর্যন্ত সড়ক, কালভার্ট, শিক্ষা প্রতিষ্ঠান, বিশুদ্ধ পানি ও বিদ্যুৎ অবকাঠামোর স্বচ্ছ ও জবাবদিহিতামূলক তথ্য ভাণ্ডার।
        </p>
      </div>

      {/* Filter and Search Container */}
      <div className="glass-panel p-5 rounded-3xl space-y-4 shadow-md">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#006B3F] text-white shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="প্রকল্প বা স্থান অনুসন্ধান..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
            />
          </div>
        </div>

        {/* Secondary Sub-filters: Upazila & Status */}
        <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-gray-150 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-700">উপজেলা:</span>
            {upazilas.map((u) => (
              <button
                key={u}
                onClick={() => setSelectedUpazila(u)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                  selectedUpazila === u
                    ? 'bg-emerald-100 text-[#006B3F] font-bold'
                    : 'hover:text-gray-900 text-gray-500'
                }`}
              >
                {u}
              </button>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-gray-300 hidden sm:block"></div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-700">অবস্থা:</span>
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedStatus(s)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                  selectedStatus === s
                    ? 'bg-emerald-100 text-[#006B3F] font-bold'
                    : 'hover:text-gray-900 text-gray-500'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => setActiveProjectModal(proj)}
            className="group cursor-pointer glass-panel rounded-3xl overflow-hidden hover:border-[#006B3F]/40 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Image banner */}
              <div className="relative aspect-[16/10] bg-emerald-50 overflow-hidden">
                {proj.imageUrl ? (
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-emerald-300 bg-emerald-900/10">
                    <Briefcase className="w-10 h-10" />
                  </div>
                )}

                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="bg-[#004D30]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                    {proj.category}
                  </span>
                  <span className="bg-white/95 backdrop-blur-xs text-emerald-900 text-[10px] font-bold px-2 py-1 rounded-md shadow-xs">
                    {proj.upazila}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-xs font-bold text-[#006B3F] shadow-sm tabular-nums">
                  {proj.progress}% সম্পন্ন
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <h3 className="text-base font-bold text-[#17251E] group-hover:text-[#006B3F] transition-colors font-serif line-clamp-2 leading-snug">
                  {proj.title}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>

                {/* Progress bar */}
                <div className="space-y-1 pt-1">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        proj.progress === 100 
                          ? 'bg-emerald-600' 
                          : 'bg-gradient-to-r from-[#006B3F] to-emerald-500'
                      }`}
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-gray-500 space-y-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span className="truncate">{proj.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Building2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span className="truncate">{proj.implementingAgency}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 pb-4 pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className={`font-semibold flex items-center gap-1 ${
                proj.status === 'সম্পন্ন' ? 'text-emerald-700' : 'text-amber-700'
              }`}>
                {proj.status === 'সম্পন্ন' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                {proj.status}
              </span>

              <span className="text-[#006B3F] font-bold group-hover:underline flex items-center gap-0.5">
                বিস্তারিত তথ্য →
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="glass-panel p-12 rounded-3xl text-center text-gray-500">
          <p className="text-base font-semibold">কোনো প্রকল্প খুঁজে পাওয়া যায়নি।</p>
          <p className="text-xs mt-1">অনুসন্ধান বা ফিল্টার পুনরায় নির্বাচন করুন।</p>
        </div>
      )}

      {/* Project Detail Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#006B3F] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {activeProjectModal.category}
                </span>
                <span className="text-xs font-bold text-gray-700">
                  {activeProjectModal.upazila}
                </span>
              </div>
              <button
                onClick={() => {
                  setActiveProjectModal(null);
                  setSelectedProjectId(null);
                }}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {activeProjectModal.imageUrl && (
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={activeProjectModal.imageUrl}
                  alt={activeProjectModal.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <h3 className="text-xl font-bold text-[#17251E] font-serif">
              {activeProjectModal.title}
            </h3>

            {/* Progress Section */}
            <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#006B3F]">
                <span>কাজের বর্তমান অগ্রগতি</span>
                <span className="tabular-nums text-sm">{activeProjectModal.progress}%</span>
              </div>
              <div className="w-full h-2.5 bg-white rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full"
                  style={{ width: `${activeProjectModal.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-600 pt-1">
                <span>বর্তমান অবস্থা: <strong>{activeProjectModal.status}</strong></span>
                <span>হালনাগাদ: {activeProjectModal.lastUpdated}</span>
              </div>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-500 block mb-0.5">প্রকল্পের অবস্থান:</span>
                <span className="font-semibold">{activeProjectModal.location}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-500 block mb-0.5">বাস্তবায়নকারী সংস্থা:</span>
                <span className="font-semibold">{activeProjectModal.implementingAgency}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-500 block mb-0.5">শুরুর তারিখ:</span>
                <span className="font-semibold">{activeProjectModal.startDate}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <span className="text-gray-500 block mb-0.5">সম্ভাব্য সমাপ্তির তারিখ:</span>
                <span className="font-semibold">{activeProjectModal.targetCompletionDate}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">প্রকল্পের বিস্তারিত বিবরণ:</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {activeProjectModal.description}
              </p>
            </div>

            {activeProjectModal.estimatedBudget && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                <span className="font-bold">বাজেট ও অর্থায়ন: </span>
                <span>{activeProjectModal.estimatedBudget}</span>
              </div>
            )}

            <div className="pt-4 border-t border-gray-150 flex justify-end">
              <button
                onClick={() => {
                  setActiveProjectModal(null);
                  setSelectedProjectId(null);
                }}
                className="px-5 py-2 bg-[#006B3F] text-white text-xs font-bold rounded-xl"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
