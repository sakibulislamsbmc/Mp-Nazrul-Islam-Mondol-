import React from 'react';
import { Mail, Calendar, MapPin, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MP_PROFILE } from '../../data/mockData';

export const Hero: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F2F7F4] via-white to-[#F7F9F7] py-8 md:py-16 border-b border-[#006B3F]/10">
      {/* Subtle architectural backdrop texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#006B3F_1px,transparent_1px)] [background-size:20px_20px]" />
      
      {/* Decorative gradient glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-96 h-96 bg-red-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Portrait Column (Desktop: 5 cols, Mobile: centered) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group max-w-sm sm:max-w-md w-full">
              
              {/* Outer Glass Card Container */}
              <div className="relative rounded-3xl overflow-hidden p-2 sm:p-3 glass-panel shadow-2xl transition-all duration-300">
                
                {/* MP Portrait Image */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-emerald-50">
                  <img
                    src={MP_PROFILE.portraitUrl}
                    alt={MP_PROFILE.name}
                    className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03]"
                    loading="eager"
                  />
                  
                  {/* Subtle inner gradient shadow at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                  
                  {/* Floating Glass Pill on the image - matching reference */}
                  <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4">
                    <div className="bg-black/75 backdrop-blur-md border border-white/25 rounded-xl px-3 py-2 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 shadow-lg">
                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        <User className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{MP_PROFILE.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span>{MP_PROFILE.constituency}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Verified Office Tag */}
              <div className="mt-3 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#006B3F] font-semibold bg-emerald-100/70 border border-emerald-300/60 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#006B3F]" />
                  জনগণের সরাসরি যোগাযোগ ও সংসদীয় অফিস পোর্টাল
                </span>
              </div>
            </div>
          </div>

          {/* Text & Call-To-Action Column (Desktop: 7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-100/80 border border-emerald-300/70 text-xs font-bold text-[#004D30]">
              <span className="w-2 h-2 rounded-full bg-[#E32636]"></span>
              <span>৫৬ রাজশাহী-৫ (দুর্গাপুর–পুঠিয়া)</span>
            </div>

            {/* Main Headline - Exact matching reference typography with Red accent */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#17251E] tracking-tight leading-[1.15]">
              আপনাদের সেবায়, <br />
              <span className="text-[#E32636] relative inline-block underline decoration-[#006B3F]/30 decoration-wavy underline-offset-8">
                প্রতিশ্রুতিবদ্ধ
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl font-bold text-[#006B3F]">
              আপনার এলাকার উন্নয়ন ও জনসেবায় একসাথে
            </p>

            {/* Descriptive Body */}
            <p className="text-sm sm:text-base text-[#4b5550] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              দুর্গাপুর ও পুঠিয়ার সম্মানিত নাগরিকদের কথা, সমস্যা, সম্ভাবনা এবং উন্নয়ন কর্মকাণ্ডের সঙ্গে সরাসরি যুক্ত থাকুন একটি আধুনিক স্বচ্ছ ডিজিটাল প্ল্যাটফর্মে। কোনো মধ্যস্বত্বভোগী ছাড়াই আপনার অভিযোগ ও আবেদন পৌঁছবে সংসদ সদস্যের কার্যালয়ে।
            </p>

            {/* Primary & Secondary CTA Buttons - Styled matching reference */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              
              {/* Primary Green CTA */}
              <button
                onClick={() => setActivePage('complaint-form')}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#006B3F] hover:bg-[#004D30] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 text-base group cursor-pointer"
              >
                <Mail className="w-5 h-5 text-emerald-200 group-hover:scale-110 transition-transform" />
                <span>অভিযোগ / আবেদন জানান</span>
                <ArrowRight className="w-4 h-4 ml-1 opacity-70 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Glass CTA */}
              <button
                onClick={() => setActivePage('appointment-form')}
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-emerald-50 text-[#006B3F] font-bold rounded-xl border-2 border-[#006B3F]/40 hover:border-[#006B3F] transition-all duration-200 flex items-center justify-center gap-2.5 text-base shadow-sm cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-[#006B3F]" />
                <span>সাক্ষাতের অনুরোধ</span>
              </button>
            </div>

            {/* Trust highlights banner strip */}
            <div className="pt-4 border-t border-[#006B3F]/10 grid grid-cols-3 gap-2 sm:gap-4 max-w-xl mx-auto lg:mx-0 text-center">
              <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                <div className="text-lg sm:text-xl font-bold text-[#006B3F]">২৪/৭</div>
                <div className="text-[11px] text-[#4d5c53]">ডিজিটাল আবেদন</div>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                <div className="text-lg sm:text-xl font-bold text-[#006B3F]">১০০%</div>
                <div className="text-[11px] text-[#4d5c53]">ট্র্যাকিং সুবিধা</div>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                <div className="text-lg sm:text-xl font-bold text-[#006B3F]">১৩টি</div>
                <div className="text-[11px] text-[#4d5c53]">ইউনিয়ন ও ২ পৌরসভা</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
