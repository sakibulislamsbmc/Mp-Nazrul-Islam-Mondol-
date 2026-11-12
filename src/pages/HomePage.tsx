import React from 'react';
import { Hero } from '../components/home/Hero';
import { QuickActionCards } from '../components/home/QuickActionCards';
import { RecentActivities } from '../components/home/RecentActivities';
import { DevelopmentProgress } from '../components/home/DevelopmentProgress';
import { ParliamentaryHighlight } from '../components/home/ParliamentaryHighlight';
import { ConstituencyOverview } from '../components/home/ConstituencyOverview';
import { Mail, Calendar, PhoneCall, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <div className="space-y-8 sm:space-y-12 pb-12">
      {/* 1. Hero Section matching reference mockup */}
      <Hero />

      {/* 2. Four Quick Action Cards */}
      <QuickActionCards />

      {/* 3. Main Two-Column Row 1: Recent Activities & Development Progress (Directly from Mockup) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Recent Activities (7 cols on desktop) */}
          <div className="lg:col-span-7">
            <RecentActivities />
          </div>

          {/* Right Column: Development Progress (5 cols on desktop) */}
          <div className="lg:col-span-5">
            <DevelopmentProgress />
          </div>
        </div>
      </section>

      {/* 4. Main Two-Column Row 2: Parliamentary Activities & Constituency Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Parliamentary Activities (6 cols) */}
          <div className="lg:col-span-6">
            <ParliamentaryHighlight />
          </div>

          {/* Right: Constituency Information (6 cols) */}
          <div className="lg:col-span-6">
            <ConstituencyOverview />
          </div>
        </div>
      </section>

      {/* 5. Citizen Welfare Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#004D30] to-[#006B3F] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-semibold text-emerald-300 bg-black/20 px-3 py-1 rounded-full border border-white/10">
                দুর্গাপুর ও পুঠিয়ার সার্বিক উন্নয়নে
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif">
                আপনার এলাকার যে কোনো সমস্যা সরাসরি জানান
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
                রাস্তাঘাট, ব্রিজ-কালভার্ট, পানীয় জল বা বিদ্যুৎ সংক্রান্ত সমস্যা থাকলে ঘরে বসেই অনলাইন অভিযোগ দাখিল করুন এবং ট্র্যাকিং নম্বরের মাধ্যমে অগ্রগতি জানুন।
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => setActivePage('complaint-form')}
                className="px-6 py-3 bg-[#E32636] hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>অভিযোগ জানান</span>
              </button>
              <button
                onClick={() => setActivePage('services')}
                className="px-6 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-emerald-300" />
                <span>সকল নাগরিক সেবা</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
