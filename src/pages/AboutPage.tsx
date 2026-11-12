import React from 'react';
import { 
  User, 
  MapPin, 
  Building2, 
  Award, 
  BookOpen, 
  HeartHandshake, 
  Phone, 
  Mail, 
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MP_PROFILE } from '../data/mockData';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Top Banner / Breadcrumb */}
      <div className="border-b border-[#006B3F]/15 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-xs font-bold text-[#006B3F] mb-3">
          <User className="w-3.5 h-3.5" />
          <span>সংসদ সদস্য জীবনবৃত্তান্ত ও পরিচিতি</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17251E] font-serif">
          {MP_PROFILE.name}
        </h1>
        <p className="text-base text-[#006B3F] font-semibold mt-1">
          {MP_PROFILE.designation} · {MP_PROFILE.constituency} (দুর্গাপুর–পুঠিয়া, রাজশাহী)
        </p>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Portrait & Quick Facts */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-4 rounded-3xl shadow-xl overflow-hidden">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-emerald-50 mb-4">
              <img
                src={MP_PROFILE.portraitUrl}
                alt={MP_PROFILE.name}
                className="w-full h-full object-cover object-top filter brightness-[1.02]"
              />
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-[#17251E] font-serif">{MP_PROFILE.name}</h2>
              <p className="text-xs font-semibold text-[#006B3F]">{MP_PROFILE.designation}</p>
              <p className="text-xs text-gray-500">{MP_PROFILE.constituency}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-150 space-y-2.5 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span>নির্বাচনী এলাকা: ৫৬ রাজশাহী-৫</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#006B3F] shrink-0" />
                <span>উপজেলা: দুর্গাপুর ও পুঠিয়া</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">{MP_PROFILE.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{MP_PROFILE.officePhone}</span>
              </div>
            </div>

            <div className="mt-5 pt-3">
              <button
                onClick={() => setActivePage('appointment-form')}
                className="w-full py-2.5 bg-[#006B3F] hover:bg-[#004D30] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>সাক্ষাতের অনুরোধ জানান</span>
              </button>
            </div>
          </div>

          {/* Parliamentary Oath & Commitment */}
          <div className="glass-panel p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-2">
            <span className="font-bold text-[#004D30] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#006B3F]" />
              জনগণের পবিত্র আমানত:
            </span>
            <p className="leading-relaxed">
              "আমি এলাকার দল-মত নির্বিশেষে প্রতিটি মানুষের সুখে-দুঃখে পাশে থাকার অঙ্গীকার করছি। দুর্গাপুর ও পুঠিয়ার উন্নয়ন ও মানুষের অধিকার সুরক্ষাই আমার মূল ব্রত।"
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Sections */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: সংক্ষিপ্ত জীবনী ও ভূমিকা */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-150">
              <User className="w-5 h-5 text-[#006B3F]" />
              <h3 className="text-xl font-bold text-[#17251E] font-serif">
                ব্যক্তিগত পরিচিতি ও সংক্ষিপ্ত ভূমিকা
              </h3>
            </div>
            
            <p className="text-sm text-gray-700 leading-relaxed">
              {MP_PROFILE.name} ৫৬ রাজশাহী-৫ (দুর্গাপুর–পুঠিয়া) আসন থেকে নির্বাচিত একজন নিবেদিতপ্রাণ জনপ্রতিনিধি। তিনি তৃণমূল পর্যায় থেকে সাধারণ মানুষের সুখ-দুঃখে পাশে থেকে নেতৃত্ব দিয়েছেন এবং স্থানীয় মানুষের জীবনমান উন্নয়নে প্রতিশ্রুতিবদ্ধ।
            </p>

            <p className="text-sm text-gray-700 leading-relaxed">
              দুর্গাপুরের ঐতিহ্যবাহী পান ও কৃষি শিল্প এবং পুঠিয়ার ঐতিহাসিক প্রত্নতাত্ত্বিক ঐতিহ্য ও রেশম-আম ব্যবসাকে জাতীয় পর্যায়ে গুরুত্বের সাথে তুলে ধরার ক্ষেত্রে তিনি সর্বদাই সচেষ্ট রয়েছেন।
            </p>
          </div>

          {/* Section 2: শিক্ষাগত ও রাজনৈতিক পরিচিতি (Editable verified placeholders) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* শিক্ষা */}
            <div className="glass-panel p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-[#006B3F]">
                <BookOpen className="w-5 h-5" />
                <h4 className="text-base font-bold font-serif text-[#17251E]">শিক্ষাগত পটভূমি</h4>
              </div>
              <ul className="space-y-2 text-xs text-gray-700 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>স্নাতক ও উচ্চশিক্ষা সম্পন্ন (যাচাইকৃত নথি অনুসারে সংরক্ষিত)।</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>শিক্ষা বিস্তার ও স্থানীয় বিদ্যালয়-মাদ্রাসার অবকাঠামো উন্নয়নে বিশেষ অবদান।</span>
                </li>
              </ul>
              <p className="text-[11px] text-gray-500 italic">
                * সংসদ সচিবালয়ের রেকর্ড সাপেক্ষে হালনাগাদযোগ্য।
              </p>
            </div>

            {/* রাজনৈতিক জীবন */}
            <div className="glass-panel p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-[#006B3F]">
                <Briefcase className="w-5 h-5" />
                <h4 className="text-base font-bold font-serif text-[#17251E]">রাজনৈতিক আদর্শ ও জীবন</h4>
              </div>
              <ul className="space-y-2 text-xs text-gray-700 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>তৃণমূল থেকে শুরু করে উপজেলা ও জেলা পর্যায়ে সক্রিয় রাজনৈতিক দায়িত্ব পালন।</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>সুশাসন, ন্যায়বিচার এবং দুর্নীতির বিরুদ্ধে জিরো টলারেন্স নীতিতে বিশ্বাসী।</span>
                </li>
              </ul>
              <p className="text-[11px] text-gray-500 italic">
                * জনসেবায় নিবেদিত রাজনৈতিক যাত্রা।
              </p>
            </div>
          </div>

          {/* Section 3: সংসদীয় ও জনকল্যাণমূলক দায়িত্ব */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-150">
              <Building2 className="w-5 h-5 text-[#006B3F]" />
              <h3 className="text-xl font-bold text-[#17251E] font-serif">
                সংসদীয় ভূমিকা ও এলাকা উন্নয়নের রূপরেখা
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-gray-700">
              <div className="p-3 rounded-xl bg-white border border-gray-150 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#006B3F] font-bold flex items-center justify-center shrink-0 text-xs">
                  ১
                </span>
                <div>
                  <h5 className="font-bold text-gray-900 mb-0.5">গ্রামীণ যোগাযোগ ব্যবস্থার আমূল সংস্কার</h5>
                  <p className="text-xs text-gray-600">
                    দুর্গাপুর ও পুঠিয়ার প্রতিটি ইউনিয়নের ভাঙাচোরা রাস্তা পাকা করা, নতুন কালভার্ট নির্মাণ এবং জেলা সদরের সাথে দ্রুতগতির যোগাযোগ স্থাপন।
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-gray-150 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#006B3F] font-bold flex items-center justify-center shrink-0 text-xs">
                  ২
                </span>
                <div>
                  <h5 className="font-bold text-gray-900 mb-0.5">কৃষকবান্ধব বরেন্দ্র সেচ ও ফল প্রক্রিয়াজাতকরণ</h5>
                  <p className="text-xs text-gray-600">
                    আম ও পানের ন্যায্যমূল্য নিশ্চিতকরণে আধুনিক কোল্ডস্টোরেজ ও সেচ প্রকল্পের বিদ্যুতের সমস্যা নিরসন।
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-gray-150 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#006B3F] font-bold flex items-center justify-center shrink-0 text-xs">
                  ৩
                </span>
                <div>
                  <h5 className="font-bold text-gray-900 mb-0.5">মানসম্মত স্বাস্থ্যসেবা ও শিক্ষাপ্রতিষ্ঠান আধুনিকায়ন</h5>
                  <p className="text-xs text-gray-600">
                    পুঠিয়া ও দুর্গাপুর উপজেলা স্বাস্থ্য কমপ্লেক্সে ডাক্তার ও আধুনিক পরীক্ষার সুযোগ সম্প্রসারণ এবং বিদ্যালয়সমূহে ডিজিটাল ল্যাব স্থাপন।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Constituency Office Contacts */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-[#17251E] font-serif">সরাসরি পরামর্শ বা অভিযোগ পাঠাতে চান?</h4>
              <p className="text-xs text-gray-600">এমপি মহোদয়ের ব্যক্তিগত কার্যালয় সর্বদাই জনগণের সেবায় উন্মুক্ত।</p>
            </div>
            <button
              onClick={() => setActivePage('complaint-form')}
              className="px-5 py-2.5 bg-[#006B3F] hover:bg-[#004D30] text-white text-xs font-bold rounded-xl transition-all shadow-md shrink-0"
            >
              নাগরিক আবেদন জানান
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
