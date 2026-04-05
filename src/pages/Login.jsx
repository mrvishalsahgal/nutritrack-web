import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const { user, token } = await authApi.login({ email, password });
      // Note: Here you would parse token/user and store in AuthContext/LocalStorage
      console.log('Logged in successfully:', user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-6 selection:bg-primary-container/30 bg-surface">
      <main className="w-full max-w-[480px] relative">
        {/* Background Ambient Glow */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl"></div>
        
        {/* Auth Container */}
        <div className="relative z-10 bg-surface-container-lowest p-10 rounded-xl shadow-[0_20px_40px_rgba(25,28,30,0.04)] overflow-hidden">
          {/* Brand Anchor */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 gradient-button rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                restaurant_menu
              </span>
            </div>
            <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface">Welcome Back</h1>
            <p className="font-body text-secondary text-sm mt-1">Log in to track your macros.</p>
          </div>
          
          {/* Toggle Switch (Login/Signup) */}
          <div className="bg-surface-container-low p-1.5 rounded-full flex mb-10">
            <Link to="/signup" className="flex-1 py-2.5 text-sm font-medium text-secondary hover:text-on-surface transition-colors text-center inline-block">
              Sign up
            </Link>
            <button className="flex-1 py-2.5 text-sm font-semibold text-on-surface bg-surface-container-lowest rounded-full shadow-sm transition-all duration-200">
              Log in
            </button>
          </div>
          
          <form className="space-y-8" onSubmit={handleLogin}>
            
            {/* Input Fields */}
            <div className="space-y-6">
              <div className="group relative">
                <label className="absolute left-4 -top-2.5 bg-surface-container-lowest px-2 text-[10px] font-bold tracking-widest text-secondary uppercase transition-colors group-focus-within:text-primary">Email Address</label>
                <input 
                  className="w-full px-5 py-4 bg-surface-container-low rounded-lg border-none focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-outline/50 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] outline-none" 
                  placeholder="hello@example.com" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="group relative">
                <label className="absolute left-4 -top-2.5 bg-surface-container-lowest px-2 text-[10px] font-bold tracking-widest text-secondary uppercase transition-colors group-focus-within:text-primary">Password</label>
                <input 
                  className="w-full px-5 py-4 bg-surface-container-low rounded-lg border-none focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-outline/50 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] outline-none" 
                  placeholder="••••••••" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              {/* Error Message */}
              {error && (
                <div className="text-red-400 text-sm px-2 mt-2">
                  {error}
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <a href="#" className="text-secondary text-xs hover:text-primary transition-colors">Forgot password?</a>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full gradient-button text-white py-4 rounded-full font-headline font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
              >
                {loading ? 'Logging In...' : 'Log In'}
                {!loading && <span className="material-symbols-outlined text-xl">arrow_forward</span>}
              </button>
            </div>
            
          </form>
          
        </div>
        
        {/* Footnote */}
        <p className="text-center mt-8 text-secondary/60 font-body text-[11px] uppercase tracking-widest">© 2024 NutriTrack AI Nutrition Labs</p>
      </main>
    </div>
  );
}
