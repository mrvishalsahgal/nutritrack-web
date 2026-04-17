import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Toast from '../components/Toast';
import { profileApi } from '../api/profile';

export default function DashboardLayout() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    profileApi.getProfile().then(data => setProfile(data));
  }, []);

  const isChatPage = location.pathname === '/chat';

  return (
    <div className="bg-surface font-body text-on-surface antialiased flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <header className="fixed top-0 right-0 left-0 md:left-64 z-40 h-16 bg-white/70 backdrop-blur-xl shadow-sm font-headline antialiased">
          <div className="flex justify-between items-center px-6 h-full w-full max-w-screen-2xl mx-auto">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-full max-w-xs group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                <input 
                  className="w-full bg-slate-100 border-none rounded-full pl-10 pr-4 py-1.5 text-sm focus:ring-2 focus:ring-green-500/20 outline-none font-body" 
                  placeholder="Search nutrients..." 
                  type="text" 
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-500 hover:scale-105 active:scale-95 transition-transform">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div 
                onClick={() => navigate('/profile')}
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm cursor-pointer hover:scale-105 hover:border-primary active:scale-95 transition-all"
              >
                {profile ? (
                  <img 
                    className="w-full h-full object-cover" 
                    src={profile.avatar}
                    alt="Profile" 
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 animate-pulse"></div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="pt-24 pb-32 md:pb-8 px-6 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>

      {/* Floating Action Button - Hidden on Chat Page */}
      {!isChatPage && (
        <button 
          onClick={() => navigate('/chat')}
          className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-16 h-16 bg-gradient-to-tr from-primary to-primary-container text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 hover:scale-110 active:scale-95 transition-all z-50 animate-in fade-in zoom-in duration-500"
        >
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      )}
      <Toast />
    </div>
  );
}
