import React, { useState } from 'react';
import { 
  Building2, 
  Mic2, 
  HelpCircle, 
  Users2, 
  Calendar, 
  Search, 
  Filter, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ParliamentaryActivity } from '../types';

export const ParliamentaryPage: React.FC = () => {
  const { parliamentary } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItem, setActiveItem] = useState<ParliamentaryActivity | null>(null);

  const categories = ['সকল', 'বক্তব্য', 'উত্থাপিত প্রশ্ন', 'কমিটির কার্যক্রম', 'উপস্থিতির তথ্য'];

  const filteredItems = parliamentary.filter((item) => {
    const matchesCategory = selectedCategory === 'সকল' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.session.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="border-b border-[#006B3F]/15 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-xs font-bold text-[#006B3F] mb-3">
          <Building2 className="w-3.5 h-3.5" />
          <span>জাতীয় সংসদীয় কার্যক্রম ও বক্তব্য</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17251E] font-serif">
          জাতীয় সংসদে ভূমিকা ও কার্যক্রম
        </h1>
        <p className="text-sm text-gray-600 mt-2 max-w-3xl leading-relaxed">
          জাতীয় সংসদে ৫৬ রাজশাহী-৫ (দুর্গাপুর–পুঠিয়া) এলাকার সাধারণ মানুষের পক্ষে মাননীয় সংসদ সদস্য নাজরুল ইসলাম মণ্ডল এর উত্থাপিত প্রশ্ন, নীতিগত বিতর্ক, বাজেট বক্তব্য ও সংসদীয় কমিটির বিবরণ।
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-[#006B3F] text-white shadow-sm'
                  : 'bg-white/80 text-gray-700 hover:bg-emerald-50 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="বক্তব্য বা প্রশ্ন খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="glass-panel p-6 rounded-3xl hover:border-[#006B3F]/40 transition-all shadow-md hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  item.category === 'বক্তব্য' 
                    ? 'bg-emerald-100 text-[#006B3F]' 
                    : item.category === 'উত্থাপিত প্রশ্ন'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {item.category}
                </span>

                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  {item.date}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#17251E] font-serif leading-snug mb-2">
                {item.title}
              </h3>

              <div className="text-xs text-[#006B3F] font-semibold mb-3 flex items-center gap-1">
                <span>অধিবেশন:</span>
                <span className="text-gray-700">{item.session}</span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                {item.summary}
              </p>

              {item.keyPoints && item.keyPoints.length > 0 && (
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1.5 mb-4">
                  <span className="text-[11px] font-bold text-[#004D30] block">মূল দাবিসমূহ:</span>
                  <ul className="space-y-1 text-xs text-emerald-950">
                    {item.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-150 flex items-center justify-between text-xs">
              <span className="text-gray-500">সংসদ কার্যবিবরণী রেকর্ডভুক্ত</span>
              <button
                onClick={() => setActiveItem(item)}
                className="text-[#006B3F] font-bold hover:underline flex items-center gap-1"
              >
                <span>বিস্তারিত দেখুন</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="glass-panel p-12 rounded-3xl text-center text-gray-500">
          <p className="text-base font-semibold">কোনো সংসদীয় রেকর্ড মেলেনি।</p>
          <p className="text-xs mt-1">অনুসন্ধান বা ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
        </div>
      )}

      {/* Modal View for detailed parliamentary activity */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="text-xs font-bold text-[#006B3F] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {activeItem.category}
              </span>
              <button
                onClick={() => setActiveItem(null)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <h3 className="text-xl font-bold text-[#17251E] font-serif">
              {activeItem.title}
            </h3>

            <div className="text-xs text-gray-500 space-y-1">
              <p>তারিখ: <strong>{activeItem.date}</strong></p>
              <p>অধিবেশন: <strong>{activeItem.session}</strong></p>
            </div>

            <div className="text-sm text-gray-700 leading-relaxed space-y-3 pt-2">
              <p>{activeItem.summary}</p>
              {activeItem.keyPoints && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                  <span className="font-bold text-[#004D30] text-xs uppercase tracking-wider block">
                    সংসদে আলোচিত প্রধান বিষয়বস্তু:
                  </span>
                  <ul className="space-y-1.5 text-xs text-gray-800">
                    {activeItem.keyPoints.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#006B3F] font-bold">✔</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-150 flex justify-end">
              <button
                onClick={() => setActiveItem(null)}
                className="px-5 py-2 bg-[#006B3F] text-white text-xs font-bold rounded-xl"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
