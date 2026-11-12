import React from 'react';
import { MapPin, ArrowRight, Layers, Map } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CONSTITUENCY_DETAILS } from '../../data/mockData';

export const ConstituencyOverview: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-2xl h-full flex flex-col justify-between">
      <div>
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#006B3F] rounded-full inline-block"></span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-red-600" />
              <h2 className="text-xl font-bold text-[#17251E] font-serif">
                এলাকার তথ্য
              </h2>
            </div>
          </div>
          <button
            onClick={() => setActivePage('constituency')}
            className="text-xs font-bold text-[#006B3F] hover:text-[#004D30] flex items-center gap-1 group"
          >
            <span>বিস্তারিত মানচিত্র</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Map & Constituency Presentation */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          
          {/* Stylized SVG Map of Bangladesh with Rajshahi-5 highlighted */}
          <div className="sm:col-span-5 bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-3 flex flex-col items-center justify-center relative overflow-hidden">
            <svg viewBox="0 0 100 120" className="w-28 h-32 opacity-90">
              {/* Silhouette of Bangladesh */}
              <path
                d="M35 15 C 45 10, 60 12, 70 20 C 75 25, 80 40, 75 55 C 72 65, 80 75, 85 85 C 80 100, 65 110, 50 115 C 38 112, 25 105, 20 90 C 15 75, 20 60, 25 50 C 22 35, 25 25, 35 15 Z"
                fill="#d1fae5"
                stroke="#10b981"
                strokeWidth="1.5"
              />
              {/* Padma / Jamuna Rivers stylization */}
              <path d="M28 45 Q 45 60 55 80 Q 60 95 62 110" stroke="#93c5fd" strokeWidth="2" fill="none" strokeDasharray="2,2" />
              
              {/* Rajshahi-5 Location marker pin */}
              <circle cx="28" cy="46" r="4.5" fill="#E32636" className="animate-pulse" />
              <circle cx="28" cy="46" r="1.8" fill="#ffffff" />
            </svg>

            <span className="text-[10px] font-bold text-[#006B3F] mt-1 bg-white px-2 py-0.5 rounded shadow-xs border border-emerald-200">
              ৫৬ রাজশাহী-৫
            </span>
          </div>

          {/* Details */}
          <div className="sm:col-span-7 space-y-2">
            <h3 className="text-base font-bold text-[#17251E] font-serif">
              দুর্গাপুর ও পুঠিয়া উপজেলা
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              রাজশাহী জেলার কৃষি, শিক্ষা ও প্রাচীন ঐতিহাসিক সংস্কৃতির অন্যতম কেন্দ্রবিন্দু। ঐতিহ্যবাহী পুঠিয়া রাজবাড়ি ও দেশের অন্যতম বৃহৎ আমের বাজার বানেশ্বর এ আসনেই অবস্থিত।
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="bg-white p-2 rounded-lg border border-gray-150">
                <span className="text-gray-500 block">উপজেলা:</span>
                <span className="font-bold text-[#006B3F]">২টি (দুর্গাপুর, পুঠিয়া)</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-gray-150">
                <span className="text-gray-500 block">ইউনিয়ন ও পৌরসভা:</span>
                <span className="font-bold text-[#006B3F]">১৩টি ইউনিয়ন, ২টি পৌরসভা</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <button
          onClick={() => setActivePage('constituency')}
          className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-[#006B3F] text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>ইউনিয়ন ভিত্তিক বিস্তারিত তথ্য দেখুন</span>
        </button>
      </div>
    </div>
  );
};
