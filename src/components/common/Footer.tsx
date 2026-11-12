import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  ChevronRight,
  Heart
} from 'lucide-react';
import { useApp, PageId } from '../../context/AppContext';
import { MP_PROFILE } from '../../data/mockData';

export const Footer: React.FC = () => {
  const { setActivePage } = useApp();

  const handleNav = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#003822] text-white pt-12 pb-24 md:pb-12 border-t-4 border-[#006B3F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: MP & Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 shrink-0">
                <svg viewBox="0 0 100 100" className="w-8 h-8">
                  <circle cx="50" cy="50" r="46" fill="#006B3F" />
                  <circle cx="48" cy="50" r="20" fill="#E32636" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-serif">{MP_PROFILE.name}</h3>
                <p className="text-xs text-emerald-300 font-medium">{MP_PROFILE.designation} · {MP_PROFILE.constituency}</p>
              </div>
            </div>

            <p className="text-xs text-emerald-100/80 leading-relaxed">
              {MP_PROFILE.subHeadline}
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 bg-[#004D30]/80 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-xs text-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>ডিজিটাল সিটিজেন সাপোর্ট হেল্পডেস্ক</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider mb-4 pb-1 border-b border-emerald-500/20">
              জরুরি লিংকসমূহ
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/90">
              <li>
                <button 
                  onClick={() => handleNav('home')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  হোম পেজ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('about')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  সংসদ সদস্যের পরিচিতি
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('parliamentary')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  সংসদে উত্থাপিত প্রশ্ন ও বক্তব্য
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('projects')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  চলমান উন্নয়ন প্রকল্প
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('constituency')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  ৫৬ রাজশাহী-৫ (দুর্গাপুর–পুঠিয়া)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('news')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  সংবাদ ও প্রেস বিজ্ঞপ্তি
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Citizen Services */}
          <div>
            <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider mb-4 pb-1 border-b border-emerald-500/20">
              জনসেবা ও আবেদন
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/90">
              <li>
                <button 
                  onClick={() => handleNav('complaint-form')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  অভিযোগ বা নাগরিক আবেদন দাখিল
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('tracking')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  আবেদনের বর্তমান অবস্থা যাচাই
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('appointment-form')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  এমপি মহোদয়ের সাক্ষাতের আবেদন
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('services')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  থানা, হাসপাতাল ও ফায়ার সার্ভিস নম্বর
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('admin')} 
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-emerald-300"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  কর্মকর্তা ও স্টাফ অ্যাডমিন পোর্টাল
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Office Address & Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider mb-4 pb-1 border-b border-emerald-500/20">
              যোগাযোগ ও কার্যালয়
            </h4>
            
            <div className="flex items-start gap-2 text-xs text-emerald-100/80">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{MP_PROFILE.officeAddress}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-100/80">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{MP_PROFILE.officePhone}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-100/80">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{MP_PROFILE.email}</span>
            </div>

            <div className="flex items-start gap-2 text-xs text-emerald-100/80">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{MP_PROFILE.visitingHours}</span>
            </div>
          </div>
        </div>

        {/* Clear Non-Government Disclaimer as mandated by Prompt */}
        <div className="p-4 rounded-xl bg-[#002616] border border-emerald-900/50 mb-8 text-xs text-emerald-200/90 leading-relaxed">
          <p className="font-semibold text-white mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            স্বীকৃতি ও গুরুত্বপূর্ণ নির্দেশিকা:
          </p>
          <p>
            এই ওয়েব পোর্টালটি ৫৬ রাজশাহী-৫ (দুর্গাপুর–পুঠিয়া) আসনের সংসদ সদস্য <strong>নাজরুল ইসলাম মণ্ডল</strong> এর ব্যক্তিগত ও নির্বাচনী এলাকার কার্যালয়ের একটি ডিজিটাল জনসংযোগ ও জনসেবা মাধ্যম। এটি বাংলাদেশ সরকারের কোনো অফিশিয়াল মন্ত্রণালয় বা প্রশাসনিক গেজেটের বিকল্প নয়। এখানে নাগরিক আবেদন ও অভিযোগসমূহ নথিভুক্ত করে সংশ্লিষ্ট সরকারি দপ্তর ও মন্ত্রণালয়ে সুপারিশ এবং সমাধানের লক্ষ্যে সমন্বয় করা হয়।
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/70 gap-4">
          <p>
            © ২০২৬ নাজরুল ইসলাম মণ্ডল, সংসদ সদস্য — ৫৬ রাজশাহী-৫। সর্বস্বত্ব সংরক্ষিত।
          </p>
          
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">গোপনীয়তা নীতি</button>
            <span>·</span>
            <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">শর্তাবলী</button>
            <span>·</span>
            <button onClick={() => handleNav('admin')} className="text-emerald-300 hover:text-white transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              অ্যাডমিন লগইন
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
