import React from 'react';
import { Calendar, ArrowRight, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RecentActivities: React.FC = () => {
  const { news, setActivePage, setSelectedArticleId } = useApp();

  const handleArticleClick = (id: string) => {
    setSelectedArticleId(id);
    setActivePage('news');
  };

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-2xl h-full flex flex-col justify-between">
      <div>
        {/* Section Header with Green Accent Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#006B3F] rounded-full inline-block"></span>
            <h2 className="text-xl font-bold text-[#17251E] font-serif">
              সাম্প্রতিক কার্যক্রম
            </h2>
          </div>
          <button
            onClick={() => setActivePage('news')}
            className="text-xs font-bold text-[#006B3F] hover:text-[#004D30] flex items-center gap-1 group"
          >
            <span>সকল দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Activity Cards List */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {news.slice(0, 3).map((item) => (
            <div
              key={item.id}
              onClick={() => handleArticleClick(item.id)}
              className="group cursor-pointer rounded-xl overflow-hidden border border-gray-150 bg-white hover:border-[#006B3F]/40 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              {/* Thumbnail Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 bg-[#004D30]/90 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                  {item.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#17251E] group-hover:text-[#006B3F] transition-colors line-clamp-2 leading-snug mb-2 font-serif">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#006B3F]" />
                    {item.date}
                  </span>
                  <span className="text-[#006B3F] font-semibold group-hover:underline flex items-center gap-0.5">
                    বিস্তারিত
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
