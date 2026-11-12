import React from 'react';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DevelopmentProgress: React.FC = () => {
  const { projects, setActivePage, setSelectedProjectId } = useApp();

  const handleProjectClick = (id: string) => {
    setSelectedProjectId(id);
    setActivePage('projects');
  };

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-2xl h-full flex flex-col justify-between">
      <div>
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#006B3F] rounded-full inline-block"></span>
            <h2 className="text-xl font-bold text-[#17251E] font-serif">
              উন্নয়ন প্রকল্পের অগ্রগতি
            </h2>
          </div>
          <button
            onClick={() => setActivePage('projects')}
            className="text-xs font-bold text-[#006B3F] hover:text-[#004D30] flex items-center gap-1 group"
          >
            <span>সকল দেখুন</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Project List with Progress Bars */}
        <div className="space-y-4">
          {projects.slice(0, 4).map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
              className="group cursor-pointer p-3 rounded-xl border border-gray-150 hover:border-[#006B3F]/40 hover:bg-emerald-50/40 transition-all"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <h3 className="text-xs sm:text-sm font-bold text-[#17251E] group-hover:text-[#006B3F] transition-colors truncate">
                  {project.title}
                </h3>
                <span className="text-xs font-bold text-[#006B3F] tabular-nums shrink-0">
                  {project.progress}%
                </span>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    project.progress === 100 
                      ? 'bg-emerald-600' 
                      : 'bg-gradient-to-r from-[#006B3F] to-emerald-500'
                  }`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
                <span className="truncate">স্থান: {project.location}</span>
                <span className="flex items-center gap-1 font-medium text-emerald-800 shrink-0">
                  {project.status === 'সম্পন্ন' ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Clock className="w-3 h-3 text-amber-600" />
                  )}
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
        <span>মোট সক্রিয় প্রকল্প: {projects.length}টি</span>
        <button
          onClick={() => setActivePage('projects')}
          className="text-[#006B3F] font-bold hover:underline"
        >
          সম্পূর্ণ তালিকা ও ফিল্টার →
        </button>
      </div>
    </div>
  );
};
