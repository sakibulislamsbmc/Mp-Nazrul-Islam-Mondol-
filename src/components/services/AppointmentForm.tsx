import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, MapPin, Send, CheckCircle2, ArrowLeft, ShieldAlert, Copy, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AppointmentForm: React.FC = () => {
  const { submitAppointment, setActivePage, setSearchTrackingNumber } = useApp();

  const [formData, setFormData] = useState({
    applicantName: '',
    phone: '',
    email: '',
    organization: '',
    address: '',
    upazila: 'দুর্গাপুর' as 'দুর্গাপুর' | 'পুঠিয়া' | 'অন্যান্য',
    purpose: '',
    preferredDate: '',
    preferredTime: 'সকাল ১১:০০',
    additionalMessage: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<{ trackingNumber: string; applicantName: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.applicantName.trim()) newErrors.applicantName = 'আবেদনকারীর নাম দিন';
    if (!formData.phone.trim()) {
      newErrors.phone = 'সচল মোবাইল নম্বর দিন';
    } else if (!/^01[3-9]\d{8}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01700000000)';
    }
    if (!formData.purpose.trim() || formData.purpose.length < 10) {
      newErrors.purpose = 'সাক্ষাতের উদ্দেশ্য অন্তত ১০ অক্ষরে সংক্ষেপে লিখুন';
    }
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'পছন্দের সম্ভাব্য তারিখ নির্বাচন করুন';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const res = submitAppointment({
      applicantName: formData.applicantName,
      phone: formData.phone,
      email: formData.email || undefined,
      organization: formData.organization || undefined,
      address: formData.address,
      upazila: formData.upazila,
      purpose: formData.purpose,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      additionalMessage: formData.additionalMessage || undefined,
    });

    setSubmittedData({
      trackingNumber: res.trackingNumber,
      applicantName: res.applicantName,
    });
  };

  const handleCopyCode = () => {
    if (!submittedData) return;
    navigator.clipboard.writeText(submittedData.trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
              সাক্ষাতের অনুরোধ দাখিল সম্পন্ন
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17251E] mt-3 font-serif">
              ধন্যবাদ, {submittedData.applicantName}
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-lg mx-auto leading-relaxed">
              আপনার সাক্ষাতের অনুরোধটি সংসদ সদস্যের ব্যক্তিগত সচিব (পিএস) ও কার্যালয় ব্যবস্থাপকের টেবিলে নথিভুক্ত হয়েছে।
            </p>
          </div>

          {/* Warning & Process Info */}
          <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-2xl text-xs text-amber-900 text-left space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-amber-800">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              সাক্ষাৎ নিশ্চিতকরণ নির্দেশিকা:
            </p>
            <p>
              মাননীয় সংসদ সদস্যের এলাকা সফরসূচি, জাতীয় সংসদ অধিবেশন ও অন্যান্য রাষ্ট্রীয় ব্যস্ততা সাপেক্ষে কার্যালয় থেকে আপনার মোবাইল নম্বরে কল করে সাক্ষাতের নির্দিষ্ট স্থান ও সময় জানিয়ে দেওয়া হবে।
            </p>
          </div>

          {/* Tracking Number */}
          <div className="bg-emerald-50/80 border-2 border-dashed border-[#006B3F]/40 p-4 rounded-2xl max-w-md mx-auto">
            <span className="text-xs font-semibold text-gray-600 block">অনুরোধের রেফারেন্স কোড</span>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#006B3F] tracking-wider font-mono">
                {submittedData.trackingNumber}
              </span>
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-[#006B3F] hover:bg-emerald-50 transition-colors"
                title="কপি করুন"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copied && <span className="text-[11px] text-emerald-700 font-bold block mt-1">কপি হয়েছে!</span>}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSearchTrackingNumber(submittedData.trackingNumber);
                setActivePage('tracking');
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#006B3F] hover:bg-[#004D30] text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>স্ট্যাটাস যাচাই করুন</span>
            </button>
            <button
              onClick={() => setActivePage('home')}
              className="w-full sm:w-auto px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-sm rounded-xl transition-all"
            >
              মূল পাতায় ফিরুন
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
          onClick={() => setActivePage('home')}
          className="text-xs font-bold text-[#006B3F] flex items-center gap-1 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          মূল পাতায় ফিরে যান
        </button>

        <span className="text-xs text-gray-500">
          সাক্ষাতের অনুরোধ ফর্ম · সংসদ সদস্য কার্যালয়
        </span>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-xl">
        {/* Header */}
        <div className="border-b border-gray-150 pb-5 mb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-6 bg-[#006B3F] rounded-full inline-block"></span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#17251E] font-serif">
              সংসদ সদস্যের সাথে সাক্ষাতের আবেদন
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            এলাকার সামাজিক সমস্যা, উন্নয়নমূলক পরামর্শ বা ব্যক্তিগত বিষয়ে সংসদ সদস্য নাজরুল ইসলাম মণ্ডল মহোদয়ের সাথে সাক্ষাতের জন্য নির্ধারিত ফর্মটি পূরণ করুন।
          </p>
        </div>

        {/* Notice */}
        <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/70 rounded-xl text-xs text-emerald-900 leading-relaxed mb-6 flex items-start gap-2">
          <Calendar className="w-4 h-4 text-[#006B3F] shrink-0 mt-0.5" />
          <p>
            সাধারণত প্রতি সপ্তাহে সংসদ সদস্যের নির্বাচনী এলাকা সফরের সময় (শনিবার থেকে বৃহস্পতিবার) সুবিধাজনক সময়ে সাক্ষাৎ অনুষ্ঠিত হয়।
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                আবেদনকারীর পুরো নাম <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="যেমন: মোঃ আনিসুর রহমান"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                সংস্থা / পদবী / প্রতিষ্ঠান (যদি থাকে)
              </label>
              <input
                type="text"
                placeholder="যেমন: দুর্গাপুর ব্যবসায়ী সমিতি / প্রধান শিক্ষক"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">উপজেলা *</label>
              <select
                value={formData.upazila}
                onChange={(e) => setFormData({ ...formData, upazila: e.target.value as any })}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
              >
                <option value="দুর্গাপুর">দুর্গাপুর</option>
                <option value="পুঠিয়া">পুঠিয়া</option>
                <option value="অন্যান্য">অন্যান্য এলাকা / ঢাকা</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">ঠিকানা</label>
            <input
              type="text"
              placeholder="গ্রাম / মহল্লা, ডাকঘর"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              সাক্ষাতের উদ্দেশ্য ও বিষয়বস্তু <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="সাক্ষাতের সুনির্দিষ্ট কারণ সংক্ষেপে লিখুন..."
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F] ${
                errors.purpose ? 'border-red-400' : 'border-gray-200'
              }`}
            />
            {errors.purpose && (
              <p className="text-[11px] text-red-500 mt-1">{errors.purpose}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                প্রস্তাবিত পছন্দের তারিখ <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F] ${
                  errors.preferredDate ? 'border-red-400' : 'border-gray-200'
                }`}
              />
              {errors.preferredDate && (
                <p className="text-[11px] text-red-500 mt-1">{errors.preferredDate}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                পছন্দের সময় স্লট
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
              >
                <option value="সকাল ১০:০০">সকাল ১০:০০ - ১১:০০</option>
                <option value="সকাল ১১:০০">সকাল ১১:০০ - ১২:০০</option>
                <option value="দুপুর ১২:০০">দুপুর ১২:০০ - ০১:০০</option>
                <option value="বিকাল ০৩:০০">বিকাল ০৩:০০ - ০৪:০০</option>
                <option value="বিকাল ০৪:০০">বিকাল ০৪:০০ - ০৫:০০</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              অতিরিক্ত তথ্য / প্রতিনিধি দলের সদস্য সংখ্যা
            </label>
            <input
              type="text"
              placeholder="যেমন: প্রতিনিধি দলে ৩ জন সদস্য উপস্থিত থাকবেন"
              value={formData.additionalMessage}
              onChange={(e) => setFormData({ ...formData, additionalMessage: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-[#006B3F] hover:bg-[#004D30] text-white font-bold text-base rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-5 h-5 text-emerald-200" />
              <span>সাক্ষাতের অনুরোধ পাঠান</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
