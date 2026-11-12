import React from 'react';
import { Megaphone, Calendar, TrendingUp, PhoneCall, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickActionCards: React.FC = () => {
  const { setActivePage } = useApp();

  const cards = [
    {
      id: 'complaint',
      title: 'অভিযোগ জানান',
      subtitle: 'এলাকার সমস্যা ও সরাসরি নাগরিক আবেদন দাখিল',
      icon: Megaphone,
      action: () => setActivePage('complaint-form'),
      badge: 'জনসেবা',
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50/80',
    },
    {
      id: 'appointment',
      title: 'সাক্ষাতের সময় নিন',
      subtitle: 'সংসদ সদস্যের সাথে সাক্ষাতের তারিখ ও সময় অনুরোধ',
      icon: Calendar,
      action: () => setActivePage('appointment-form'),
      badge: 'সরাসরি সাক্ষাৎ',
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50/80',
    },
    {
      id: 'projects',
      title: 'উন্নয়ন প্রকল্প দেখুন',
      subtitle: 'দুর্গাপুর ও পুঠিয়ার চলমান কাজের অগ্রগতি ও বাজেট',
      icon: TrendingUp,
      action: () => setActivePage('projects'),
      badge: 'অগ্রগতি',
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50/80',
    },
    {
      id: 'contact',
      title: 'যোগাযোগ করুন',
      subtitle: 'কার্যালয়ের ঠিকানা, হেল্পলাইন ও জরুরি নম্বর',
      icon: PhoneCall,
      action: () => setActivePage('contact'),
      badge: 'কার্যালয়',
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50/80',
    },
  ];

  return (
    <section className="py-6 sm:py-8 -mt-6 sm:-mt-8 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={card.action}
              className="group text-left p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#006B3F]/15 hover:border-[#006B3F]/50 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 sm:p-3 rounded-xl ${card.bgColor} ${card.color} group-hover:scale-110 transition-transform`}>
                    <card.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-[#006B3F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-[#17251E] group-hover:text-[#006B3F] transition-colors mb-1 font-serif">
                  {card.title}
                </h3>
                
                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {card.subtitle}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-800">
                  {card.badge}
                </span>
                <span className="text-[11px] text-[#006B3F] font-bold group-hover:underline">
                  প্রবেশ করুন →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
