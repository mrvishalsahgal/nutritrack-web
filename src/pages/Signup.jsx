import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      const { user, token } = await authApi.signup({ name, email, password });
      console.log('Signed up successfully:', user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Signup failed');
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
            <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface">NutriTrack</h1>
            <p className="font-body text-secondary text-sm mt-1">Your journey to vitality starts here.</p>
          </div>
          
          {/* Toggle Switch (Login/Signup) */}
          <div className="bg-surface-container-low p-1.5 rounded-full flex mb-10">
            <button className="flex-1 py-2.5 text-sm font-semibold text-on-surface bg-surface-container-lowest rounded-full shadow-sm transition-all duration-200">
              Sign up
            </button>
            <Link to="/login" className="flex-1 py-2.5 text-sm font-medium text-secondary hover:text-on-surface transition-colors text-center inline-block">
              Log in
            </Link>
          </div>
          
          <form className="space-y-8" onSubmit={handleSignup}>
            {/* Input Fields */}
            <div className="space-y-8">
              <div className="group relative">
                <label className="absolute left-4 -top-2.5 bg-surface-container-lowest px-2 text-[10px] font-bold tracking-widest text-secondary uppercase transition-colors group-focus-within:text-primary">Full Name</label>
                <input 
                  className="w-full px-5 py-4 bg-surface-container-low rounded-lg border-none focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-outline/50 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] outline-none" 
                  placeholder="John Doe" 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                <label className="absolute left-4 -top-2.5 bg-surface-container-lowest px-2 text-[10px] font-bold tracking-widest text-secondary uppercase transition-colors group-focus-within:text-primary">Create Password</label>
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
                <div className="text-red-400 text-sm px-2 mt-2 -mb-4">
                  {error}
                </div>
              )}
            </div>
            
            {/* Submit Button */}
            <div className="pt-4 mt-8">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full gradient-button text-white py-4 rounded-full font-headline font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
                {!loading && <span className="material-symbols-outlined text-xl">arrow_forward</span>}
              </button>
            </div>
            
            {/* Social Proof / Terms */}
            <div className="text-center pt-2">
              <p className="text-secondary text-xs leading-relaxed">
                By continuing, you agree to NutriTrack&apos;s <br />
                <a className="text-on-surface font-semibold underline decoration-primary/30 underline-offset-4 hover:decoration-primary" href="#">Terms of Service</a> and <a className="text-on-surface font-semibold underline decoration-primary/30 underline-offset-4 hover:decoration-primary" href="#">Privacy Policy</a>.
              </p>
            </div>
          </form>
          
          {/* Decorative Visual (Editorial Feel) */}
          <div className="mt-10 pt-10 border-t border-outline-variant/10">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <img alt="User 1" className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHWmdXPzMPNkSw8M9_YK8IJCHzwn3iwKkKPOw9uk9oMpNMzCNbaKdoNlTUR6ppLktZtz0QGJdyCmBcMWiX0-8Wa4KWmwRdJiPBi2QYDyi5hY_DtJ-v10Vnw33p1uaT6aPIx4RHtH8ut1WxigIGzmxz640xSKti7rCki-U3LYP34Td_523EhZCpV_mvRN2ewOTFfSIweQRqjVfx9fJAgfPPbSsNy36q8QsbmhsZm-JlC84c6qvl5sZhv0zp0Rlfa4yQ5CHwNAfr1Jab" />
                <img alt="User 2" className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR1QMuB3hU-LI9m6WUhXFHh01GnwzJm5pBGDu5LUqKkrj6m6tny5tuh3J63_gslgkFbp4jNb_g0v67Y6VKBHypi9dNn1a-kTtxX2kSMewhFeCiPfWIKlQyPWKleC61xLs_0iicjQuDhzslnv0AFdHv1KrVorOfROlTV-k4yLRpacHI47dF22OH3QyLHq43dYzHg2SlDDwov_xhwY1cTktSmXWHdVNPZLkBpQZ04hH0fLyOdWSTriDkk-LX7HMfzaz3_oC__R_XheZR" />
                <img alt="User 3" className="w-8 h-8 rounded-full border-2 border-surface-container-lowest object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDk4jtSVPHrThtYbYPhtKqgKMwml0pVlMdMNNgNrRZwh5ucniY_j_7wG5c18gzpk9Zzw9VQGrFMaJ9uyBspGSKXFXM6_X8zsnDLWO0pv_8IfldJXZOoacprVbW1oOdYdvAZKw2WpCMGhOiwekFEayRFh6IT0DzwEcDhtvA9kt8v1DLdgEdYo29HLlHtdW9T461oqNMBFGrD1_7ZP3Kod7mohYQxHkDGkDGTyaz0_ma2JGVz4r-1sWEmK0K4vNMa3egcS70wHOEZhGvh" />
              </div>
              <p className="text-[11px] font-medium text-secondary">Join <span className="text-on-surface font-bold">12,400+</span> users tracking their health today.</p>
            </div>
          </div>
        </div>
        
        {/* Footnote */}
        <p className="text-center mt-8 text-secondary/60 font-body text-[11px] uppercase tracking-widest">© 2024 NutriTrack AI Nutrition Labs</p>
      </main>
    </div>
  );
}
