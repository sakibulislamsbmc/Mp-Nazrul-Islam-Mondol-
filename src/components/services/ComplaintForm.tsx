import React, { useState } from 'react';
import { 
  Send, 
  FileText, 
  CheckCircle2, 
  Copy, 
  ArrowLeft, 
  Paperclip, 
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CONSTITUENCY_DETAILS } from '../../data/mockData';

export const ComplaintForm: React.FC = () => {
  const { submitComplaint, setActivePage, setSearchTrackingNumber } = useApp();

  const [formData, setFormData] = useState({
    applicantName: '',
    phone: '',
    address: '',
    upazila: 'দুর্গাপুর' as 'দুর্গাপুর' | 'পুঠিয়া',
    union: 'নওপাড়া ইউনিয়ন',
    ward: '০১',
    type: 'রাস্তা/সেতু মেরামত',
    title: '',
    description: '',
    attachmentName: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<{ trackingNumber: string; applicantName: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // Union options by selected upazila
  const currentUnions = formData.upazila === 'দুর্গাপুর' 
    ? [...CONSTITUENCY_DETAILS.upazilas[0].unions, 'দুর্গাপুর পৌরসভা']
    : [...CONSTITUENCY_DETAILS.upazilas[1].unions, 'পুঠিয়া পৌরসভা'];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.applicantName.trim()) newErrors.applicantName = 'আবেদনকারীর নাম প্রদান করুন';
    if (!formData.phone.trim()) {
      newErrors.phone = 'সচল মোবাইল নম্বর প্রদান করুন';
    } else if (!/^01[3-9]\d{8}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01700000000)';
    }
    if (!formData.address.trim()) newErrors.address = 'গ্রাম বা মহল্লার ঠিকানা প্রদান করুন';
    if (!formData.title.trim()) newErrors.title = 'সমস্যার সংক্ষিপ্ত শিরোনাম দিন';
    if (!formData.description.trim() || formData.description.length < 15) {
      newErrors.description = 'সমস্যার বিস্তারিত বিবরণ অন্তত ১৫ অক্ষরে লিখুন';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const result = submitComplaint({
      applicantName: formData.applicantName,
      phone: formData.phone,
      address: formData.address,
      upazila: formData.upazila,
      union: formData.union,
      ward: formData.ward,
      type: formData.type,
      title: formData.title,
      description: formData.description,
      attachmentName: formData.attachmentName || undefined,
    });

    setSubmittedData({
      trackingNumber: result.trackingNumber,
      applicantName: result.applicantName,
    });
  };

  const handleCopyCode = () => {
    if (!submittedData) return;
    navigator.clipboard.writeText(submittedData.trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGoToTracking = () => {
    if (submittedData) {
      setSearchTrackingNumber(submittedData.trackingNumber);
    }
    setActivePage('tracking');
  };

  if (submittedData) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/30 text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              আবেদন সফলভাবে নথিভুক্ত হয়েছে
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17251E] mt-3 font-serif">
              ধন্যবাদ, {submittedData.applicantName}
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-lg mx-auto leading-relaxed">
              আপনার অভিযোগ/আবেদনটি সংসদ সদস্যের কার্যালয়ের সিস্টেমে গৃহীত হয়েছে। সংশ্লিষ্ট বিভাগ ও কর্মকর্তাদের সাথে সমন্বয়পূর্বক প্রয়োজনীয় পদক্ষেপ গ্রহণ করা হবে।
            </p>
          </div>

          {/* Tracking Number Card */}
          <div className="bg-emerald-50/80 border-2 border-dashed border-[#006B3F]/40 p-4 rounded-2xl max-w-md mx-auto">
            <span className="text-xs font-semibold text-gray-600 block">আপনার আবেদন ট্র্যাকিং নম্বর</span>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#006B3F] tracking-wider font-mono">
                {submittedData.trackingNumber}
              </span>
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-[#006B3F] hover:bg-emerald-50 transition-colors"
                title="ট্র্যাকিং নম্বর কপি করুন"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copied && <span className="text-[11px] text-emerald-700 font-bold block mt-1">কপি হয়েছে!</span>}
            <p className="text-[11px] text-gray-500 mt-2">
              ভবিষ্যতে আবেদনের অগ্রগতি জানতে এই নম্বরটি সংরক্ষণ করুন।
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleGoToTracking}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#006B3F] hover:bg-[#004D30] text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>আবেদনের বর্তমান অবস্থা দেখুন</span>
            </button>
            <button
              onClick={() => {
                setSubmittedData(null);
                setFormData({
                  applicantName: '',
                  phone: '',
                  address: '',
                  upazila: 'দুর্গাপুর',
                  union: 'নওপাড়া ইউনিয়ন',
                  ward: '০১',
                  type: 'রাস্তা/সেতু মেরামত',
                  title: '',
                  description: '',
                  attachmentName: '',
                });
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-sm rounded-xl transition-all"
            >
              আরেকটি নতুন আবেদন করুন
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => setActivePage('services')}
          className="text-xs font-bold text-[#006B3F] flex items-center gap-1 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          জনসেবা পোর্টালে ফিরে যান
        </button>

        <span className="text-xs text-gray-500">
          ডিজিটাল নাগরিক পোর্টাল · ৫৬ রাজশাহী-৫
        </span>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-xl">
        {/* Title */}
        <div className="border-b border-gray-150 pb-5 mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-6 bg-[#006B3F] rounded-full inline-block"></span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#17251E] font-serif">
              অনলাইন অভিযোগ ও নাগরিক আবেদন
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            দুর্গাপুর ও পুঠিয়া এলাকার যেকোনো অবকাঠামোগত সমস্যা, রাস্তাঘাট সংস্কার, বিদ্যুৎ, পানীয় জল বা সামাজিক সহায়তার আবেদন সরাসরি সংসদ সদস্যের কার্যালয়ে দাখিল করুন।
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Applicant Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#006B3F] uppercase tracking-wider flex items-center gap-1.5">
              <span>১. আবেদনকারীর ব্যক্তিগত তথ্য</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  আবেদনকারীর পুরো নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="যেমন: মোঃ রফিকুল ইসলাম"
                  value={formData.applicantName}
                  onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F] ${
                    errors.applicantName ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
                {errors.applicantName && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.applicantName}</p>
                )}
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
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F] ${
                    errors.phone ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
                {errors.phone && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Address Information */}
          <div className="space-y-4 pt-2 border-t border-gray-150">
            <h3 className="text-sm font-bold text-[#006B3F] uppercase tracking-wider flex items-center gap-1.5">
              <span>২. নির্বাচনী এলাকার অবস্থান</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">উপজেলা *</label>
                <select
                  value={formData.upazila}
                  onChange={(e) => {
                    const upz = e.target.value as 'দুর্গাপুর' | 'পুঠিয়া';
                    const defaultUnion = upz === 'দুর্গাপুর' ? 'নওপাড়া ইউনিয়ন' : 'পুঠিয়া সদর ইউনিয়ন';
                    setFormData({ ...formData, upazila: upz, union: defaultUnion });
                  }}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                >
                  <option value="দুর্গাপুর">দুর্গাপুর</option>
                  <option value="পুঠিয়া">পুঠিয়া</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ইউনিয়ন / পৌরসভা *</label>
                <select
                  value={formData.union}
                  onChange={(e) => setFormData({ ...formData, union: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                >
                  {currentUnions.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ওয়ার্ড নম্বর</label>
                <select
                  value={formData.ward}
                  onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                >
                  {['০১', '০২', '০৩', '০৪', '০৫', '০৬', '০৭', '০৮', '০৯'].map((w) => (
                    <option key={w} value={w}>ওয়ার্ড {w}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                গ্রাম / পাড়া / সুনির্দিষ্ট ঠিকানা <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="যেমন: গ্রাম: পালি, মধ্যপাড়া, পানানগর রোড"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F] ${
                  errors.address ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              {errors.address && (
                <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>
              )}
            </div>
          </div>

          {/* Section 3: Complaint / Application Details */}
          <div className="space-y-4 pt-2 border-t border-gray-150">
            <h3 className="text-sm font-bold text-[#006B3F] uppercase tracking-wider flex items-center gap-1.5">
              <span>৩. অভিযোগ বা আবেদনের বিবরণ</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">অভিযোগের ধরন *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                >
                  <option value="রাস্তা/সেতু মেরামত">রাস্তা / সেতু / কালভার্ট সংস্কার</option>
                  <option value="বিদ্যুৎ/আলো">বিদ্যুৎ সংযোগ / ট্রান্সফরমার / লোডশেডিং</option>
                  <option value="পানি/স্যানিটেশন">খাবার পানি / সেচ ও স্যানিটেশন</option>
                  <option value="স্বাস্থ্যসেবা">হাসপাতাল / স্বাস্থ্যকেন্দ্র সংক্রান্ত</option>
                  <option value="শিক্ষা/স্কুল">স্কুল / কলেজ / মাদ্রাসা উন্নয়ন</option>
                  <option value="সামাজিক ভাতা/সহায়তা">বয়স্ক / বিধবা / বিশেষ মানবিক সহায়তা</option>
                  <option value="আইন-শৃঙ্খলা/প্রশাসন">আইন-শৃঙ্খলা ও প্রশাসনিক সহযোগিতা</option>
                  <option value="অন্যান্য">অন্যান্য জনস্বার্থমূলক আবেদন</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  সংক্ষিপ্ত শিরোনাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="যেমন: পানানগর সংযোগ সড়কের ব্রিজ সংস্কার"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F] ${
                    errors.title ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
                {errors.title && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.title}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                সমস্যার বিস্তারিত বিবরণ <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="সমস্যাটির বর্তমান পরিস্থিতি, ভুক্তভোগী মানুষের সংখ্যা এবং আপনার সুনির্দিষ্ট প্রত্যাশা বিস্তারিত লিখুন..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F] leading-relaxed ${
                  errors.description ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              {errors.description && (
                <p className="text-[11px] text-red-500 mt-1">{errors.description}</p>
              )}
            </div>

            {/* Attachment Simulation */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                ছবি বা ডকুমেন্ট সংযুক্তি (ঐচ্ছিক)
              </label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-xl text-xs font-medium text-gray-700 transition-colors">
                  <Paperclip className="w-4 h-4 text-gray-500" />
                  <span>ফাইল নির্বাচন করুন</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFormData({ ...formData, attachmentName: e.target.files[0].name });
                      }
                    }}
                  />
                </label>
                <span className="text-xs text-gray-500 truncate max-w-xs">
                  {formData.attachmentName ? `সংযুক্ত: ${formData.attachmentName}` : 'কোনো ফাইল সংযুক্ত নেই (JPG, PNG বা PDF)'}
                </span>
              </div>
            </div>
          </div>

          {/* Privacy & Legal Note */}
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/70 rounded-xl text-xs text-emerald-900 leading-relaxed flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#006B3F] shrink-0 mt-0.5" />
            <p>
              আপনার ব্যক্তিগত তথ্য (যেমন মোবাইল নম্বর ও ঠিকানা) সুরক্ষিত রাখা হবে এবং কেবল প্রশাসনিক তদন্ত ও সেবা প্রদানের উদ্দেশ্যে সংশ্লিষ্ট দপ্তরে ব্যবহার করা হবে।
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#006B3F] hover:bg-[#004D30] text-white font-bold text-base rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-5 h-5 text-emerald-200" />
              <span>আবেদন দাখিল করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
