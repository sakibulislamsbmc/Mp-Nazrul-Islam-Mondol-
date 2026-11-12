import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Building2,
  Calendar,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MP_PROFILE } from '../data/mockData';

export const ContactPage: React.FC = () => {
  const { setActivePage, showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      showToast('অনুগ্রহ করে নাম, ফোন এবং বার্তা পূরণ করুন।', 'error');
      return;
    }

    setIsSent(true);
    showToast('আপনার বার্তাটি সংসদ সদস্যের কার্যালয়ে সফলভাবে পাঠানো হয়েছে।');
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#006B3F]/15 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-xs font-bold text-[#006B3F] mb-3">
          <Phone className="w-3.5 h-3.5" />
          <span>সরাসরি যোগাযোগ ও ঠিকানা</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17251E] font-serif">
          সংসদ সদস্য কার্যালয়ে যোগাযোগ
        </h1>
        <p className="text-sm text-gray-600 mt-2 max-w-3xl leading-relaxed">
          দুর্গাপুর ও পুঠিয়া উপজেলার সাধারণ নাগরিক, রাজনৈতিক প্রতিনিধি ও সুশীল সমাজের সাথে সার্বক্ষণিক যোগাযোগের জন্য সংসদীয় কার্যালয় উন্মুক্ত।
        </p>
      </div>

      {/* Grid: Office Contacts & Message Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Office Addresses & Timings (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Constituency Office */}
          <div className="glass-panel p-6 rounded-3xl space-y-3 shadow-md">
            <div className="flex items-center gap-2 text-[#006B3F] pb-2 border-b border-gray-150">
              <Building2 className="w-5 h-5" />
              <h3 className="text-lg font-bold font-serif text-[#17251E]">
                প্রধান নির্বাচনী জনসংযোগ কার্যালয়
              </h3>
            </div>
            
            <div className="space-y-3 text-xs sm:text-sm text-gray-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{MP_PROFILE.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#006B3F] shrink-0" />
                <span className="font-semibold">{MP_PROFILE.officePhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#006B3F] shrink-0" />
                <span>{MP_PROFILE.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{MP_PROFILE.visitingHours}</span>
              </div>
            </div>
          </div>

          {/* Dhaka Office */}
          <div className="glass-panel p-6 rounded-3xl space-y-3 shadow-md">
            <div className="flex items-center gap-2 text-[#006B3F] pb-2 border-b border-gray-150">
              <Building2 className="w-5 h-5" />
              <h3 className="text-lg font-bold font-serif text-[#17251E]">
                জাতীয় সংসদ কার্যালয় (ঢাকা)
              </h3>
            </div>
            
            <div className="space-y-2 text-xs sm:text-sm text-gray-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{MP_PROFILE.dhakaOfficeAddress}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-500">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>অধিবেশন চলাকালীন সংসদ কার্যদিবসে উন্মুক্ত</span>
              </div>
            </div>
          </div>

          {/* Quick Appointment Callout */}
          <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-2">
            <span className="font-bold text-[#004D30] block">সরাসরি সাক্ষাৎ করতে চান?</span>
            <p>
              সংসদ সদস্যের সাথে পূর্বনির্ধারিত সাক্ষাতের জন্য অনলাইন ফরমের মাধ্যমে অনুরোধ দাখিল করতে পারেন।
            </p>
            <div className="pt-1">
              <button
                onClick={() => setActivePage('appointment-form')}
                className="px-4 py-2 bg-[#006B3F] hover:bg-[#004D30] text-white font-bold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>সাক্ষাতের অনুরোধ ফর্ম</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Direct Message Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-xl">
            <div className="pb-4 mb-6 border-b border-gray-150">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="w-5 h-5 text-[#006B3F]" />
                <h3 className="text-xl font-bold text-[#17251E] font-serif">
                  সংসদ সদস্যের কাছে বার্তা পাঠান
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                আপনার যেকোনো পরামর্শ, শুভেচ্ছা বা মতামত সরাসরি সংসদ সদস্যের কার্যালয়ে পৌঁছে দেওয়া হবে।
              </p>
            </div>

            {isSent ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-[#17251E]">আপনার বার্তা গৃহীত হয়েছে</h4>
                <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                  ধন্যবাদ! আপনার বার্তাটি কার্যালয় নথিভুক্ত করেছে। অত্যন্ত জরুরি বিষয়ে সংসদ সদস্যের কার্যালয় থেকে দ্রুত যোগাযোগ করা হবে।
                </p>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setFormData({ name: '', phone: '', subject: '', message: '' });
                  }}
                  className="px-5 py-2 bg-[#006B3F] text-white text-xs font-bold rounded-xl"
                >
                  আরেকটি বার্তা পাঠান
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      আপনার নাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="পুরো নাম"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      মোবাইল নম্বর <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="01700000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    বার্তার বিষয়
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: এলাকার শিক্ষা ব্যবস্থার উন্নয়নে পরামর্শ"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    আপনার বার্তা <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="আপনার বক্তব্য বা মতামত বিস্তারিত লিখুন..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#006B3F] hover:bg-[#004D30] text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-emerald-200" />
                  <span>বার্তা প্রেরণ করুন</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Map visual representation */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-150">
          <MapPin className="w-5 h-5 text-red-600" />
          <h3 className="text-xl font-bold text-[#17251E] font-serif">
            কার্যালয়ের অবস্থান নির্দেশিকা (দুর্গাপুর ও পুঠিয়া)
          </h3>
        </div>

        <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-6 text-center space-y-3">
          <p className="text-sm text-gray-700 max-w-xl mx-auto leading-relaxed">
            দুর্গাপুর উপজেলা পরিষদ চত্বর সংলগ্ন প্রধান কার্যালয় এবং পুঠিয়া ডাকবাংলো সংলগ্ন সাব-অফিস উভয় স্থানেই দায়িত্বপ্রাপ্ত কর্মকর্তা উপস্থিত থাকেন।
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 text-xs font-semibold text-[#006B3F] shadow-xs">
            <span>গুগল ম্যাপে অনুসন্ধান কোড:</span>
            <span className="font-mono text-gray-800 font-bold">Durgapur MP Office, Rajshahi-5</span>
          </div>
        </div>
      </div>

    </div>
  );
};
