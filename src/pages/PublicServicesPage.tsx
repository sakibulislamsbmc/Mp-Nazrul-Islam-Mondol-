import React from 'react';
import { 
  HeartHandshake, 
  Mail, 
  Calendar, 
  Search, 
  Phone, 
  ShieldCheck, 
  ExternalLink, 
  FileText, 
  AlertTriangle,
  Lightbulb,
  Building,
  Ambulance,
  Flame,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EMERGENCY_CONTACTS } from '../data/mockData';

export const PublicServicesPage: React.FC = () => {
  const { setActivePage } = useApp();

  const services = [
    {
      title: 'নাগরিক অভিযোগ ও আবেদন',
      desc: 'ভাঙা রাস্তা, কালভার্ট, পানীয় জল বা বিদ্যুৎ সমস্যার প্রতিকার চেয়ে সরাসরি এমপি কার্যালয়ে আবেদন করুন।',
      icon: Mail,
      action: () => setActivePage('complaint-form'),
      btnText: 'অভিযোগ জানান',
      color: 'bg-emerald-600',
    },
    {
      title: 'আবেদন ও অভিযোগ ট্র্যাকিং',
      desc: 'আপনার ট্র্যাকিং নম্বর (NIM-2026-XXXX) দিয়ে আবেদনের বর্তমান প্রশাসনিক অগ্রগতি যাচাই করুন।',
      icon: Search,
      action: () => setActivePage('tracking'),
      btnText: 'অবস্থা অনুসন্ধান',
      color: 'bg-blue-600',
    },
    {
      title: 'সাক্ষাতের অনুরোধ',
      desc: 'এলাকার সামগ্রিক সমস্যা বা প্রস্তাবনা নিয়ে সংসদ সদস্যের সাথে সরাসরি সাক্ষাতের সময় বুকিং দিন।',
      icon: Calendar,
      action: () => setActivePage('appointment-form'),
      btnText: 'সময় নির্ধারণ',
      color: 'bg-[#004D30]',
    },
  ];

  const govPortals = [
    { title: 'জাতীয় তথ্য বাতায়ন (বাংলাদেশ)', url: 'https://bangladesh.gov.bd', desc: 'সকল মন্ত্রণালয় ও সরকারি সেবার প্রধান গেটওয়ে' },
    { title: 'জাতীয় পরিচয়পত্র সেবা (NID Wing)', url: 'https://services.nidw.gov.bd', desc: 'স্মার্ট কার্ড, সংশোধন ও তথ্য যাচাই' },
    { title: 'অনলাইন জন্ম ও মৃত্যু নিবন্ধন', url: 'https://bdris.gov.bd', desc: 'ইউনিয়ন ও পৌরসভা থেকে জন্ম সনদ প্রাপ্তি' },
    { title: 'কৃষি তথ্য ও বাতায়ন (AIS)', url: 'http://www.ais.gov.bd', desc: 'আম, ধান, পান ও রবিশস্যের চাষাবাদ পরামর্শ' },
    { title: 'বরেন্দ্র বহুমুখী উন্নয়ন কর্তৃপক্ষ (BMDA)', url: 'http://www.bmda.gov.bd', desc: 'রাজশাহী অঞ্চলের সেচ ও গভীর নলকূপ স্কিম' },
    { title: 'পল্লী বিদ্যুৎ অভিযোগ কেন্দ্র', url: 'http://reb.gov.bd', desc: 'বিদ্যুৎ লাইন ও ট্রান্সফরমার সেবা' },
  ];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#006B3F]/15 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-xs font-bold text-[#006B3F] mb-3">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>ডিজিটাল জনসেবা পোর্টাল</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17251E] font-serif">
          নাগরিক সেবা ও সহায়তা কেন্দ্র
        </h1>
        <p className="text-sm text-gray-600 mt-2 max-w-3xl leading-relaxed">
          দুর্গাপুর ও পুঠিয়া উপজেলার সকল সাধারণ নাগরিকের সুবিধার্থে অনলাইন অভিযোগ দাখিল, আবেদন ট্র্যাকিং, জরুরি হেল্পলাইন এবং সরকারি সেবাসমূহের সমন্বিত পোর্টাল।
        </p>
      </div>

      {/* Main 3 Action Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((item, idx) => (
          <div
            key={idx}
            className="glass-panel p-6 rounded-3xl shadow-md hover:shadow-xl hover:border-[#006B3F]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#006B3F] flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#17251E] font-serif mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={item.action}
                className={`w-full py-2.5 ${item.color} text-white font-bold text-xs rounded-xl shadow-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer`}
              >
                <span>{item.btnText}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mandatory Non-Government Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-amber-950 mb-0.5">নাগরিক অবগতকরণ নির্দেশিকা:</span>
          এখানে আবেদন বা অভিযোগ দাখিল করলে সংসদ সদস্যের কার্যালয় থেকে তা পর্যালোচনা করে সংশ্লিষ্ট সরকারি দপ্তর ও স্থানীয় প্রশাসনের কাছে পাঠানো হয়। এটি সরকারি কোনো গেজেটেড সেবার নিশ্চয়তা বা সরাসরি সরকারি অর্থ অনুমোদনের আইনি গ্যারান্টি প্রদান করে না।
        </div>
      </div>

      {/* Emergency Contacts Directory */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-6 bg-red-600 rounded-full inline-block"></span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17251E] font-serif">
              জরুরি হেল্পলাইন ও হটলাইনসমূহ (দুর্গাপুর ও পুঠিয়া)
            </h2>
          </div>
          <span className="text-xs text-gray-500">এক ক্লিকেই ডায়াল করুন</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EMERGENCY_CONTACTS.map((contact, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 rounded-2xl border border-gray-150 hover:border-red-300 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {contact.upazila}
                </span>
                <h4 className="text-sm font-bold text-[#17251E] font-serif mt-2 mb-1">
                  {contact.title}
                </h4>
                <p className="text-[11px] text-gray-500 mb-2">
                  {contact.department}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-red-600">
                  {contact.phone}
                </span>
                <a
                  href={`tel:${contact.phone.replace(/[^0-9]/g, '')}`}
                  className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>কল করুন</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* External Government Portals */}
      <div className="space-y-4 pt-4 border-t border-gray-150">
        <div className="flex items-center gap-2">
          <span className="w-2 h-6 bg-[#006B3F] rounded-full inline-block"></span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#17251E] font-serif">
            প্রয়োজনীয় সরকারি সেবা বাতায়ন
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {govPortals.map((portal, idx) => (
            <a
              key={idx}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-4 rounded-2xl hover:border-[#006B3F] transition-all group flex items-start justify-between gap-3"
            >
              <div>
                <h4 className="text-sm font-bold text-[#17251E] group-hover:text-[#006B3F] transition-colors font-serif">
                  {portal.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {portal.desc}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#006B3F] shrink-0 mt-0.5" />
            </a>
          ))}
        </div>
      </div>

    </div>
  );
};
