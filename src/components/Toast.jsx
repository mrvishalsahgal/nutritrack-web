import { useState, useEffect } from 'react';

export default function Toast() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ message: '', type: 'success' });

  useEffect(() => {
    const handleToast = (e) => {
      setData(e.detail);
      setVisible(true);
      
      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    };

    window.addEventListener('nt-toast', handleToast);
    return () => window.removeEventListener('nt-toast', handleToast);
  }, []);

  if (!visible) return null;

  const isSuccess = data.type === 'success';

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-top-4 fade-in duration-500">
      <div className={`flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/20 backdrop-blur-2xl shadow-2xl shadow-black/5 ${isSuccess ? 'bg-primary/90 text-white' : 'bg-red-500/90 text-white'}`}>
        <span className="material-symbols-outlined text-xl">
          {isSuccess ? 'check_circle' : 'error'}
        </span>
        <span className="text-sm font-bold tracking-tight">
          {data.message}
        </span>
      </div>
    </div>
  );
}
