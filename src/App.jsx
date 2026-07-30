import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/layout/CommandPalette';
import { Toast } from './components/layout/Toast';
import { ScanUploadModal } from './components/modals/ScanUploadModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ScansPage } from './pages/ScansPage';
import { AssetsPage } from './pages/AssetsPage';
import { AssetDetailsPage } from './pages/AssetDetailsPage';
import { VulnerabilitiesPage } from './pages/VulnerabilitiesPage';
import { VulnerabilityDetailsPage } from './pages/VulnerabilityDetailsPage';
import { AiAssistantPage } from './pages/AiAssistantPage';
import { ReportGeneratorPage } from './pages/ReportGeneratorPage';
import { ReportsArchivePage } from './pages/ReportsArchivePage';
import { ThreatIntelPage } from './pages/ThreatIntelPage';
import { SecurityAnalyticsPage } from './pages/SecurityAnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { HelpDocsPage } from './pages/HelpDocsPage';
import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';

const MainLayout = () => {
  const { currentRoute } = useApp();

  const renderPage = () => {
    switch (currentRoute) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'scans':
        return <ScansPage />;
      case 'assets':
        return <AssetsPage />;
      case 'asset-details':
        return <AssetDetailsPage />;
      case 'vulnerabilities':
        return <VulnerabilitiesPage />;
      case 'vulnerability-details':
        return <VulnerabilityDetailsPage />;
      case 'ai-assistant':
        return <AiAssistantPage />;
      case 'report-generator':
        return <ReportGeneratorPage />;
      case 'reports':
        return <ReportsArchivePage />;
      case 'threat-intel':
        return <ThreatIntelPage />;
      case 'analytics':
        return <SecurityAnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'docs':
        return <HelpDocsPage />;
      case 'about':
        return <AboutPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <DashboardPage />;
    }
  };

  const isPublicPage = currentRoute === 'landing' || currentRoute === 'login' || currentRoute === 'register';

  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className={`flex-1 overflow-y-auto ${isPublicPage ? 'p-0' : 'p-4 md:p-6 lg:p-8'}`}>
          {renderPage()}
        </main>
      </div>

      <Footer />
      <CommandPalette />
      <ScanUploadModal />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
