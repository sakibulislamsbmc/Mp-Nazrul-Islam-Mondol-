import React, { useState } from 'react';
import { 
  Newspaper, 
  Calendar, 
  ArrowRight, 
  Search, 
  Share2, 
  Image as ImageIcon,
  Video,
  ChevronRight,
  Eye
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NewsArticle } from '../types';

export const NewsPage: React.FC = () => {
  const { news, selectedArticleId, setSelectedArticleId } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [activeArticleModal, setActiveArticleModal] = useState<NewsArticle | null>(
    selectedArticleId ? news.find(n => n.id === selectedArticleId) || null : null
  );

  const categories = ['সকল', 'এলাকা সফর', 'সংসদীয় সংবাদ', 'উন্নয়ন পরিদর্শন', 'প্রেস বিজ্ঞপ্তি'];

  const filteredNews = news.filter((n) => {
    const matchCat = selectedCategory === 'সকল' || n.category === selectedCategory;
    const matchSearch = 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#006B3F]/15 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-xs font-bold text-[#006B3F] mb-3">
          <Newspaper className="w-3.5 h-3.5" />
          <span>সংবাদ, প্রেস বিজ্ঞপ্তি ও মিডিয়া</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17251E] font-serif">
          সংবাদ ও সাম্প্রতিক কার্যক্রম
        </h1>
        <p className="text-sm text-gray-600 mt-2 max-w-3xl leading-relaxed">
          মাননীয় সংসদ সদস্যের এলাকা সফর, গণশুনানি, জাতীয় সংসদের কার্যক্রম এবং ৫৬ রাজশাহী-৫ এর সার্বিক উন্নয়নের নিয়মিত সংবাদ প্রবাহ।
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-[#006B3F] text-white shadow-xs'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="সংবাদ অনুসন্ধান করুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
          />
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveArticleModal(item)}
            className="group cursor-pointer glass-panel rounded-3xl overflow-hidden hover:border-[#006B3F]/40 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#004D30]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                  {item.category}
                </span>
              </div>

              <div className="p-5 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar className="w-3.5 h-3.5 text-[#006B3F]" />
                  <span>{item.date}</span>
                </div>

                <h3 className="text-base font-bold text-[#17251E] group-hover:text-[#006B3F] transition-colors font-serif line-clamp-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>
            </div>

            <div className="px-5 pb-4 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-[#006B3F] font-bold">
              <span>সম্পূর্ণ পড়ুন</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="glass-panel p-12 rounded-3xl text-center text-gray-500">
          <p className="text-base font-semibold">কোনো সংবাদ পাওয়া যায়নি।</p>
        </div>
      )}

      {/* Gallery Highlight */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-6 bg-[#006B3F] rounded-full inline-block"></span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17251E] font-serif">
              ফটো ও ভিডিও আর্কাইভ
            </h2>
          </div>
          <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            যাচাইকৃত অ্যালবাম
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="relative aspect-video rounded-xl overflow-hidden group">
            <img src="/src/assets/images/bangladesh_parliament_session_1794469798172.jpg" alt="জাতীয় সংসদ" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-black/40 flex items-end p-2 text-white text-[11px] font-semibold">
              জাতীয় সংসদ অধিবেশন
            </div>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden group">
            <img src="/src/assets/images/rajshahi_rural_road_project_1794469797718.jpg" alt="সড়ক উন্নয়ন" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-black/40 flex items-end p-2 text-white text-[11px] font-semibold">
              পুঠিয়া–দুর্গাপুর মহাসড়ক
            </div>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden group">
            <img src="/src/assets/images/constituency_public_meeting_1794469797718.jpg" alt="জনমত বিনিময়" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-black/40 flex items-end p-2 text-white text-[11px] font-semibold">
              তৃণমূল মতবিনিময়
            </div>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden group">
            <img src="/src/assets/images/puthia_temple_heritage_1794469797068.jpg" alt="পুঠিয়া ঐতিহ্য" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-black/40 flex items-end p-2 text-white text-[11px] font-semibold">
              ঐতিহাসিক পুঠিয়া রাজবাড়ি
            </div>
          </div>
        </div>
      </div>

      {/* Article Detail Modal */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="text-xs font-bold text-[#006B3F] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {activeArticleModal.category}
              </span>
              <button
                onClick={() => {
                  setActiveArticleModal(null);
                  setSelectedArticleId(null);
                }}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={activeArticleModal.imageUrl}
                alt={activeArticleModal.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar className="w-3.5 h-3.5 text-[#006B3F]" />
              <span>প্রকাশিত: {activeArticleModal.date}</span>
            </div>

            <h3 className="text-xl font-bold text-[#17251E] font-serif leading-snug">
              {activeArticleModal.title}
            </h3>

            <div className="text-sm text-gray-700 leading-relaxed space-y-3 pt-2">
              <p className="font-semibold text-gray-900">{activeArticleModal.excerpt}</p>
              <p>{activeArticleModal.content}</p>
            </div>

            <div className="pt-4 border-t border-gray-150 flex justify-end">
              <button
                onClick={() => {
                  setActiveArticleModal(null);
                  setSelectedArticleId(null);
                }}
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
