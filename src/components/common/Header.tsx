import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  Search, 
  UserCheck, 
  ShieldCheck, 
  Home, 
  Building2, 
  Briefcase, 
  FileText, 
  HeartHandshake, 
  Newspaper, 
  MapPin, 
  Clock,
  Sparkles
} from 'lucide-react';
import { useApp, PageId } from '../../context/AppContext';
import { MP_PROFILE } from '../../data/mockData';

export const Header: React.FC = () => {
  const { activePage, setActivePage, complaints, appointments } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trackingInput, setTrackingInput] = useState('');
  const [isQuickTrackOpen, setIsQuickTrackOpen] = useState(false);
  const { setSearchTrackingNumber } = useApp();

  const navItems: { id: PageId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'হোম', icon: Home },
    { id: 'about', label: 'পরিচিতি', icon: UserCheck },
    { id: 'parliamentary', label: 'সংসদীয় কার্যক্রম', icon: Building2 },
    { id: 'projects', label: 'উন্নয়ন প্রকল্প', icon: Briefcase },
    { id: 'services', label: 'জনসেবা', icon: HeartHandshake },
    { id: 'news', label: 'সংবাদ', icon: Newspaper },
    { id: 'constituency', label: 'নির্বাচনী এলাকা', icon: MapPin },
    { id: 'contact', label: 'যোগাযোগ', icon: Phone },
  ];

  const handleNavClick = (page: PageId) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;
    setSearchTrackingNumber(trackingInput.trim());
    setActivePage('tracking');
    setIsQuickTrackOpen(false);
    setTrackingInput('');
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-200">
      {/* Top Utility Bar (Desktop & Tablet) */}
      <div className="bg-[#004D30] text-white/90 text-xs py-1.5 px-4 sm:px-8 border-b border-white/10 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-emerald-100">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              ডিজিটাল সংসদীয় কার্যালয় — ৫৬ রাজশাহী-৫ (দুর্গাপুর–পুঠিয়া)
            </span>
            <span className="text-white/40">|</span>
            <span className="text-emerald-100/80">অফিস সময়: সকাল ১০:০০ - দুপুর ২:০০</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActivePage('tracking')}
              className="hover:text-white transition-colors flex items-center gap-1 text-emerald-200"
            >
              <Search className="w-3.5 h-3.5" />
              আবেদন ট্র্যাকিং
            </button>
            <span className="text-white/30">|</span>
            <button 
              onClick={() => setActivePage('contact')}
              className="hover:text-white transition-colors"
            >
              যোগাযোগ
            </button>
            <span className="text-white/30">|</span>
            <button 
              onClick={() => setActivePage('admin')}
              className="bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded text-[11px] font-medium text-white transition-all flex items-center gap-1"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-300" />
              অ্যাডমিন পোর্টাল
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Identity Bar */}
      <div className="glass-nav bg-white/95 backdrop-blur-md border-b border-[#006B3F]/15 px-4 sm:px-8 py-2.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Brand Lockup matching the reference UI */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* Custom Bangladeshi Emblem SVG */}
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#006B3F] to-[#004D30] p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-8 h-8">
                  {/* Bangladesh flag aesthetic green circle & red sun */}
                  <circle cx="50" cy="50" r="46" fill="#006B3F" />
                  <circle cx="48" cy="50" r="20" fill="#E32636" />
                  {/* Stylized caring hands / people motif */}
                  <path d="M50 30 C 44 20, 32 20, 28 32 C 24 44, 40 58, 50 68 C 60 58, 76 44, 72 32 C 68 20, 56 20, 50 30 Z" fill="rgba(255,255,255,0.2)" />
                  <circle cx="50" cy="38" r="6" fill="#ffffff" />
                </svg>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-white"></span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold text-[#006B3F] tracking-tight font-serif leading-none">
                  {MP_PROFILE.name}
                </span>
                <span className="hidden md:inline-block text-[11px] bg-emerald-50 text-[#006B3F] border border-emerald-200 px-2 py-0.5 rounded font-medium">
                  {MP_PROFILE.designation}
                </span>
              </div>
              <span className="text-xs sm:text-sm text-[#4d5c53] font-medium leading-tight">
                জনসেবায় মানুষের পাশে · <span className="text-[#004D30] font-semibold">{MP_PROFILE.constituency} (দুর্গাপুর–পুঠিয়া)</span>
              </span>
            </div>
          </div>

          {/* Quick Actions Right Side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Track Button */}
            <button
              onClick={() => setIsQuickTrackOpen(!isQuickTrackOpen)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#006B3F] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              title="আবেদন বা অভিযোগের অবস্থান দেখুন"
            >
              <Search className="w-3.5 h-3.5" />
              <span>আবেদন খুঁজুন</span>
            </button>

            {/* Emergency Hotline Button */}
            <button
              onClick={() => setActivePage('services')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>জরুরি সেবা</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#004D30] hover:bg-emerald-50 transition-colors focus:outline-none"
              aria-label="মেনু খুলুন"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Quick Tracking Collapsible Bar */}
        {isQuickTrackOpen && (
          <div className="max-w-7xl mx-auto pt-3 pb-1 border-t border-emerald-100 mt-2.5">
            <form onSubmit={handleQuickTrackSubmit} className="flex items-center gap-2 max-w-md">
              <input
                type="text"
                placeholder="যেমন: NIM-2026-1042 বা APT-2026-501"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#006B3F]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#006B3F] hover:bg-[#004D30] rounded-lg transition-colors whitespace-nowrap"
              >
                ট্র্যাক করুন
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Primary Green Navigation Bar (Desktop / Tablet) - Styled exactly as reference */}
      <div className="bg-[#006B3F] shadow-sm hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-2.5 text-sm font-semibold transition-all duration-150 whitespace-nowrap flex items-center gap-1.5 relative ${
                      isActive 
                        ? 'bg-[#E32636] text-white shadow-sm' 
                        : 'text-white/95 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-4 h-4 opacity-85" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Action Button in Nav */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActivePage('complaint-form')}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded transition-all flex items-center gap-1.5 border border-white/20"
              >
                <span>অভিযোগ / আবেদন জানান</span>
              </button>
              <button
                onClick={() => setActivePage('appointment-form')}
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded transition-all shadow-sm"
              >
                <span>সাক্ষাৎ অনুরোধ</span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-[#006B3F]/20 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Quick Tracking on Mobile */}
          <div className="p-4 bg-emerald-50/70 border-b border-emerald-100">
            <form onSubmit={handleQuickTrackSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="আবেদন কোড (যেমন: NIM-2026-1042)"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                className="flex-1 px-3 py-2 text-sm bg-white border border-[#006B3F]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006B3F]"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-semibold text-white bg-[#006B3F] rounded-lg shrink-0"
              >
                খুঁজুন
              </button>
            </form>
          </div>

          <div className="py-2 px-3 divide-y divide-gray-100">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 text-base font-semibold flex items-center justify-between transition-colors ${
                    isActive 
                      ? 'bg-emerald-50 text-[#006B3F] font-bold rounded-lg' 
                      : 'text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-[#006B3F]' : 'text-gray-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#E32636]"></span>}
                </button>
              );
            })}

            <div className="pt-3 pb-2 space-y-2">
              <button
                onClick={() => handleNavClick('complaint-form')}
                className="w-full py-2.5 px-4 bg-[#006B3F] text-white text-sm font-semibold rounded-lg text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <span>অভিযোগ / আবেদন দাখিল</span>
              </button>
              <button
                onClick={() => handleNavClick('appointment-form')}
                className="w-full py-2.5 px-4 bg-emerald-50 text-[#006B3F] border border-emerald-300 text-sm font-semibold rounded-lg text-center flex items-center justify-center gap-2"
              >
                <span>সাক্ষাতের অনুরোধ</span>
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full py-2 px-4 text-xs text-gray-600 hover:text-emerald-800 text-center flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>দায়িত্বপ্রাপ্তদের জন্য: অ্যাডমিন পোর্টাল</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
