import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Landmark, 
  Sparkles, 
  ChevronRight, 
  Building2, 
  ArrowRight,
  TrendingUp,
  HeartHandshake
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CONSTITUENCY_DETAILS } from '../data/mockData';

export const ConstituencyPage: React.FC = () => {
  const { setActivePage } = useApp();
  const [activeTab, setActiveTab] = useState<'both' | 'durgapur' | 'puthia'>('both');

  const durgapur = CONSTITUENCY_DETAILS.upazilas[0];
  const puthia = CONSTITUENCY_DETAILS.upazilas[1];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#006B3F]/15 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-xs font-bold text-[#006B3F] mb-3">
          <MapPin className="w-3.5 h-3.5 text-red-600" />
          <span>জাতীয় সংসদীয় আসন পরিচিতি</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17251E] font-serif">
          ৫৬ রাজশাহী-৫ (দুর্গাপুর ও পুঠিয়া)
        </h1>
        <p className="text-sm text-gray-600 mt-2 max-w-3xl leading-relaxed">
          উত্তরবঙ্গের ঐতিহ্যবাহী বরেন্দ্র অঞ্চলের শস্যভাণ্ডার, মিষ্টি পান, বিশ্ববিখ্যাত আম এবং ঐতিহাসিক স্থাপত্য সমৃদ্ধ পুঠিয়া রাজবাড়ি সমন্বয়ে গঠিত এই সংসদীয় আসন।
        </p>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl text-center space-y-1">
          <span className="text-xs text-gray-500">সংসদীয় আসন</span>
          <div className="text-2xl font-extrabold text-[#006B3F] font-mono">৫৬</div>
          <span className="text-[11px] text-gray-600">রাজশাহী-৫</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl text-center space-y-1">
          <span className="text-xs text-gray-500">উপজেলা সংখ্যা</span>
          <div className="text-2xl font-extrabold text-[#006B3F] font-mono">২টি</div>
          <span className="text-[11px] text-gray-600">দুর্গাপুর ও পুঠিয়া</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl text-center space-y-1">
          <span className="text-xs text-gray-500">ইউনিয়ন পরিষদ</span>
          <div className="text-2xl font-extrabold text-[#006B3F] font-mono">১৩টি</div>
          <span className="text-[11px] text-gray-600">৭টি দুর্গাপুর + ৬টি পুঠিয়া</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl text-center space-y-1">
          <span className="text-xs text-gray-500">পৌরসভা</span>
          <div className="text-2xl font-extrabold text-[#006B3F] font-mono">২টি</div>
          <span className="text-[11px] text-gray-600">দুর্গাপুর ও পুঠিয়া পৌরসভা</span>
        </div>
      </div>

      {/* Interactive Tab Switcher */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setActiveTab('both')}
          className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
            activeTab === 'both' 
              ? 'bg-[#006B3F] text-white shadow-md' 
              : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
          }`}
        >
          উভয় উপজেলা সারসংক্ষেপ
        </button>
        <button
          onClick={() => setActiveTab('durgapur')}
          className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
            activeTab === 'durgapur' 
              ? 'bg-[#006B3F] text-white shadow-md' 
              : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
          }`}
        >
          দুর্গাপুর উপজেলা
        </button>
        <button
          onClick={() => setActiveTab('puthia')}
          className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
            activeTab === 'puthia' 
              ? 'bg-[#006B3F] text-white shadow-md' 
              : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
          }`}
        >
          পুঠিয়া উপজেলা
        </button>
      </div>

      {/* Upazila Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Durgapur Upazila Card */}
        {(activeTab === 'both' || activeTab === 'durgapur') && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-md space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-150">
              <div className="flex items-center gap-2">
                <span className="w-2 h-6 bg-[#006B3F] rounded-full inline-block"></span>
                <h3 className="text-2xl font-bold text-[#17251E] font-serif">
                  {durgapur.name}
                </h3>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                ৭ ইউনিয়ন ও ১ পৌরসভা
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              <strong>অর্থনৈতিক ও কৃষি বৈশিষ্ট্য:</strong> {durgapur.specialty} এখানকার উৎপাদিত বিখ্যাত মিষ্টি বরজ পান দেশজুড়ে এবং বিদেশেও সমাদৃত।
            </p>

            {/* Unions Grid */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                ইউনিয়ন ও প্রশাসনিক এলাকা:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {durgapur.unions.map((u, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white border border-gray-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006B3F]"></span>
                    <span className="font-semibold text-gray-800">{u}</span>
                  </div>
                ))}
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center gap-2 col-span-2">
                  <Building2 className="w-4 h-4 text-[#006B3F]" />
                  <span className="font-bold text-[#004D30]">{durgapur.municipality} (পৌর এলাকা)</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActivePage('complaint-form')}
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-[#006B3F] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>দুর্গাপুর এলাকার যে কোনো সমস্যা জানান</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Puthia Upazila Card */}
        {(activeTab === 'both' || activeTab === 'puthia') && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-md space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-150">
              <div className="flex items-center gap-2">
                <span className="w-2 h-6 bg-[#006B3F] rounded-full inline-block"></span>
                <h3 className="text-2xl font-bold text-[#17251E] font-serif">
                  {puthia.name}
                </h3>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                ৬ ইউনিয়ন ও ১ পৌরসভা
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              <strong>ঐতিহাসিক ও বাণিজ্যিক গুরুত্ব:</strong> {puthia.specialty} পুঠিয়ার বানেশ্বর হাট দেশের অন্যতম প্রধান আমের আড়ত ও মহাসড়ক কেন্দ্রিক বাণিজ্য জোন।
            </p>

            {/* Unions Grid */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                ইউনিয়ন ও প্রশাসনিক এলাকা:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {puthia.unions.map((u, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white border border-gray-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006B3F]"></span>
                    <span className="font-semibold text-gray-800">{u}</span>
                  </div>
                ))}
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 flex items-center gap-2 col-span-2">
                  <Building2 className="w-4 h-4 text-[#006B3F]" />
                  <span className="font-bold text-[#004D30]">{puthia.municipality} (পৌর এলাকা)</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActivePage('complaint-form')}
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-[#006B3F] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>পুঠিয়া এলাকার যে কোনো সমস্যা জানান</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Notable Landmarks Showcase */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-150">
          <Landmark className="w-5 h-5 text-[#006B3F]" />
          <h3 className="text-xl font-bold text-[#17251E] font-serif">
            ৫৬ রাজশাহী-৫ এর ঐতিহ্যবাহী গুরুত্বপূর্ণ স্থানসমূহ
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          {CONSTITUENCY_DETAILS.landmarks.map((landmark, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-gray-150 hover:border-emerald-300 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  ঐতিহ্য #{idx + 1}
                </span>
                <h4 className="text-sm font-bold text-[#17251E] font-serif mt-2">
                  {landmark}
                </h4>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 text-[11px] text-gray-500">
                ৫৬ রাজশাহী-৫
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
