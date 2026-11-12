import React from 'react';
import { Mic2, HelpCircle, Users2, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ParliamentaryHighlight: React.FC = () => {
  const { setActivePage } = useApp();

  const items = [
    {
      title: 'বক্তব্য',
      desc: 'জাতীয় সংসদে রাজশাহী-৫ এর দাবি ও বাজেট বিতর্ক',
      icon: Mic2,
      count: '১২টি বক্তব্য',
    },
    {
      title: 'প্রশ্ন',
      desc: 'মন্ত্রী মহোদয়গণের সমীপে উত্থাপিত তারকা চিহ্নিত প্রশ্ন',
      icon: HelpCircle,
      count: '১৮টি প্রশ্ন',
    },
    {
      title: 'উপস্থিতি',
      desc: 'চলতি সংসদীয় ক্যালেন্ডারে নিয়মিত উপস্থিতি রেকর্ড',
      icon: Users2,
      count: '৯৬% উপস্থিতি',
    },
  ];

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-2xl h-full flex flex-col justify-between">
      <div>
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#006B3F] rounded-full inline-block"></span>
            <h2 className="text-xl font-bold text-[#17251E] font-serif">
              সংসদীয় কার্যক্রম
            </h2>
          </div>
          <button
            onClick={() => setActivePage('parliamentary')}
            className="text-xs font-bold text-[#006B3F] hover:text-[#004D30] flex items-center gap-1 group"
          >
            <span>সকল দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Action Cards as in reference mockup */}
        <div className="grid grid-cols-3 gap-3">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActivePage('parliamentary')}
              className="group p-3 sm:p-4 rounded-xl border border-gray-200 bg-white hover:border-[#006B3F] hover:bg-emerald-50/50 transition-all text-center flex flex-col items-center justify-center cursor-pointer shadow-xs hover:shadow-sm"
            >
              <div className="p-2.5 rounded-full bg-emerald-100/70 text-[#006B3F] mb-2 group-hover:scale-110 transition-transform">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#17251E] group-hover:text-[#006B3F] transition-colors font-serif">
                {item.title}
              </h3>
              <span className="text-[10px] text-gray-500 mt-0.5">
                {item.count}
              </span>
            </button>
          ))}
        </div>

        {/* Highlight Quote */}
        <div className="mt-4 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/60 text-xs text-emerald-900 leading-relaxed">
          <p className="font-semibold text-[#004D30] mb-0.5">সংসদের প্রতি অঙ্গীকার:</p>
          "দুর্গাপুর ও পুঠিয়ার কৃষক, ছাত্র ও সাধারণ মেহনতি মানুষের মৌলিক অধিকারের পক্ষে সংসদে সোচ্চার থাকা আমার পবিত্র দায়িত্ব।"
        </div>
      </div>
    </div>
  );
};
