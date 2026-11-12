/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ParliamentaryPage } from './pages/ParliamentaryPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { PublicServicesPage } from './pages/PublicServicesPage';
import { NewsPage } from './pages/NewsPage';
import { ConstituencyPage } from './pages/ConstituencyPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ComplaintForm } from './components/services/ComplaintForm';
import { AppointmentForm } from './components/services/AppointmentForm';
import { TrackingSystem } from './components/services/TrackingSystem';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activePage, toast } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9F7] text-[#17251E] selection:bg-[#006B3F] selection:text-white">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 max-w-md animate-in fade-in slide-in-from-top-4 duration-200">
          <div className={`p-4 rounded-2xl shadow-2xl border text-xs sm:text-sm font-semibold flex items-center gap-3 backdrop-blur-md ${
            toast.type === 'error'
              ? 'bg-red-50 text-red-900 border-red-300'
              : toast.type === 'info'
              ? 'bg-blue-50 text-blue-900 border-blue-300'
              : 'bg-emerald-50 text-[#004D30] border-emerald-300'
          }`}>
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 text-blue-600 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-[#006B3F] shrink-0" />
            )}
            <span className="leading-snug">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Global Header */}
      <Header />

      {/* Page Routing */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'parliamentary' && <ParliamentaryPage />}
        {activePage === 'projects' && <ProjectsPage />}
        {activePage === 'services' && <PublicServicesPage />}
        {activePage === 'news' && <NewsPage />}
        {activePage === 'constituency' && <ConstituencyPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'admin' && <AdminDashboard />}
        {activePage === 'complaint-form' && <ComplaintForm />}
        {activePage === 'appointment-form' && <AppointmentForm />}
        {activePage === 'tracking' && <TrackingSystem />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Fixed Glassmorphism Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
