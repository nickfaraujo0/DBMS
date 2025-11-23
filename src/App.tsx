import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { HomePage } from './components/HomePage';
import { NGODashboard } from './components/NGODashboard';
import { CampaignManagement } from './components/CampaignManagement';
import { DonationPage } from './components/DonationPage';
import { VolunteerPage } from './components/VolunteerPage';
import { UserDashboard } from './components/UserDashboard';

type Page = 'login' | 'home' | 'ngo-dashboard' | 'campaigns' | 'donations' | 'volunteers' | 'user-dashboard';
type UserType = 'ngo' | 'user' | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userType, setUserType] = useState<UserType>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (type: 'ngo' | 'user') => {
    setUserType(type);
    setIsLoggedIn(true);
    if (type === 'ngo') {
      setCurrentPage('ngo-dashboard');
    } else {
      setCurrentPage('user-dashboard');
    }
  };

  const handleLogout = () => {
    setUserType(null);
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {currentPage === 'login' && (
        <LoginPage onLogin={handleLogin} onNavigate={navigateTo} />
      )}
      {currentPage === 'home' && (
        <HomePage onNavigate={navigateTo} isLoggedIn={isLoggedIn} userType={userType} />
      )}
      {currentPage === 'ngo-dashboard' && userType === 'ngo' && (
        <NGODashboard onNavigate={navigateTo} onLogout={handleLogout} />
      )}
      {currentPage === 'campaigns' && userType === 'ngo' && (
        <CampaignManagement onNavigate={navigateTo} onLogout={handleLogout} />
      )}
      {currentPage === 'donations' && (
        <DonationPage onNavigate={navigateTo} isLoggedIn={isLoggedIn} userType={userType} onLogout={handleLogout} />
      )}
      {currentPage === 'volunteers' && (
        <VolunteerPage onNavigate={navigateTo} isLoggedIn={isLoggedIn} userType={userType} onLogout={handleLogout} />
      )}
      {currentPage === 'user-dashboard' && userType === 'user' && (
        <UserDashboard onNavigate={navigateTo} onLogout={handleLogout} />
      )}
    </div>
  );
}
