import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <>
      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="px-4 py-1.5 bg-green-500/10 text-primary font-label text-[10px] font-bold tracking-widest uppercase rounded-full mb-6">
              Introducing AI Logging
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-bold text-on-background tracking-tight leading-[1.1] mb-8 max-w-4xl">
              Track your calories <br className="hidden md:block" /> with{" "}
              <span className="text-primary-container">AI</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mb-12">
              Say goodbye to tedious manual entries. Just chat with NutriTrack
              like you&apos;re texting a friend, and our AI handles the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button
                onClick={() => navigate("/login")}
                className="gradient-button px-8 py-4 rounded-full text-on-primary font-semibold text-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-xl shadow-green-500/20"
              >
                Start Free
              </button>
              <button onClick={() => navigate("/dashboard")} className="px-8 py-4 rounded-full text-on-background font-semibold text-lg border border-outline-variant/30 hover:bg-surface-container-low transition-colors">
                Watch Demo
              </button>
            </div>
          </div>

          {/**/}
          <div className="relative w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-12 gap-6 items-end">
              {/* Left Column: Main Dashboard */}
              <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-[2rem] shadow-2xl overflow-hidden border border-outline-variant/10">
                <div className="p-8">
                  <div className="flex justify-between items-center mb-12">
                    <div>
                      <h3 className="font-headline text-2xl font-bold">
                        Daily Overview
                      </h3>
                      <p className="text-on-surface-variant text-sm">
                        Thursday, Oct 24
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-surface-container rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">
                        calendar_today
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-surface-container-low p-6 rounded-2xl">
                      <p className="font-label text-xs font-bold text-on-surface-variant mb-4 uppercase tracking-wider">
                        CALORIES
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="font-headline text-4xl font-bold">
                          1,840
                        </span>
                        <span className="text-on-surface-variant text-sm">
                          / 2,400
                        </span>
                      </div>
                      <div className="mt-4 h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary-container w-[75%] rounded-full"></div>
                      </div>
                    </div>

                    <div className="bg-surface-container-low p-6 rounded-2xl">
                      <p className="font-label text-xs font-bold text-on-surface-variant mb-4 uppercase tracking-wider">
                        PROTEIN
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="font-headline text-4xl font-bold">
                          142
                        </span>
                        <span className="text-on-surface-variant text-sm">
                          g
                        </span>
                      </div>
                      <div className="mt-4 h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary-container w-[60%] rounded-full"></div>
                      </div>
                    </div>

                    <div className="bg-surface-container-low p-6 rounded-2xl">
                      <p className="font-label text-xs font-bold text-on-surface-variant mb-4 uppercase tracking-wider">
                        WATER
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="font-headline text-4xl font-bold">
                          2.4
                        </span>
                        <span className="text-on-surface-variant text-sm">
                          L
                        </span>
                      </div>
                      <div className="mt-4 h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-primary-container w-[80%] rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <img
                    alt="Healthy meal presentation"
                    className="w-full h-80 object-cover rounded-2xl"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTlpTgVTAo2r2Ac36DtqprBD-aYPqC76Zy5FF1WyoEIlWpYgJ6amoQAP6eeu9ooj5UlaiIX5EkAJN9relOqv8x6QStMJbKnPRw0j35PjLq7Y4QWjmy_sdED7p8K4cOXp1Jt-EOy5_ofccwlyG3q-A4W5UDPEJZZRoNNGx7M_bmaPDofOHoHg6UP-oKrfobWjahyAa4xSic5G_91k-jOu4bjqk2topTZbI_g5m4cbS1UIuycdx6TMH9usdfvXcYeRm6FO3JsoYej8RZ"
                  />
                </div>
              </div>

              {/* Right Column: AI Chat Overlay */}
              <div className="hidden lg:block col-span-4 bg-white/80 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-outline-variant/20 p-6 -ml-12 mb-12 relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 gradient-button rounded-full flex items-center justify-center text-white">
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      auto_awesome
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-on-background">
                      AI Nutritionist
                    </h4>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest">
                      Active Now
                    </p>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="bg-surface-container-low p-4 rounded-2xl rounded-tl-none">
                    <p className="text-sm leading-relaxed text-on-surface-variant">
                      What did you have for lunch today?
                    </p>
                  </div>
                  <div className="bg-primary-container p-4 rounded-2xl rounded-tr-none text-white ml-8">
                    <p className="text-sm leading-relaxed">
                      A large bowl of Greek salad with grilled chicken and a
                      light balsamic glaze.
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-2xl rounded-tl-none">
                    <p className="text-sm leading-relaxed text-on-surface-variant">
                      Logged: 450 calories, 38g protein. Great choice! Your
                      protein goal is 85% complete for today. ✨
                    </p>
                  </div>
                </div>

                <div className="flex items-center bg-surface-container-high rounded-full px-4 py-3 gap-3">
                  <span className="material-symbols-outlined text-slate-400">
                    mic
                  </span>
                  <input
                    className="bg-transparent border-none focus:ring-0 text-sm flex-1 p-0 outline-none"
                    placeholder="Type a meal..."
                    type="text"
                  />
                  <span className="material-symbols-outlined text-primary cursor-pointer hover:scale-110 transition-transform">
                    send
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bento Grid Features */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-20 text-center lg:text-left">
            <h2 className="font-headline text-4xl font-bold mb-4">
              Precision Tracking, Zero Friction
            </h2>
            <p className="font-body text-on-surface-variant">
              Everything you need to reach your health goals faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Feature */}
            <div className="md:col-span-2 bg-surface-container-lowest p-10 rounded-[2rem] border border-outline-variant/10 flex flex-col justify-between hover:border-primary-container/30 transition-colors">
              <div className="max-w-md">
                <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                  <span className="material-symbols-outlined text-3xl">
                    chat_bubble
                  </span>
                </div>
                <h3 className="font-headline text-2xl font-bold mb-4">
                  Conversational Logging
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  No more hunting through massive databases. Just describe your
                  meal naturally. Our AI identifies ingredients, portions, and
                  nutritional values instantly.
                </p>
              </div>
              <div className="mt-12 flex gap-4">
                <div className="px-4 py-2 bg-surface-container rounded-full text-xs font-semibold text-on-surface-variant">
                  NLP 2.0
                </div>
                <div className="px-4 py-2 bg-surface-container rounded-full text-xs font-semibold text-on-surface-variant">
                  Real-time Analysis
                </div>
              </div>
            </div>

            {/* Small Feature 1 */}
            <div className="bg-surface-container-lowest p-10 rounded-[2rem] border border-outline-variant/10 hover:border-primary-container/30 transition-colors">
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                <span className="material-symbols-outlined text-3xl">
                  analytics
                </span>
              </div>
              <h3 className="font-headline text-2xl font-bold mb-4">
                Smart Trends
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">
                Visualize your progress with editorial-style charts that
                highlight your wins.
              </p>
            </div>

            {/* Small Feature 2 */}
            <div className="bg-surface-container-lowest p-10 rounded-[2rem] border border-outline-variant/10 hover:border-primary-container/30 transition-colors">
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-primary mb-8">
                <span className="material-symbols-outlined text-3xl">
                  restaurant
                </span>
              </div>
              <h3 className="font-headline text-2xl font-bold mb-4">
                Recipe Scan
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">
                Upload a photo of a menu or a cookbook page to get instant
                nutritional data.
              </p>
            </div>

            {/* Medium Feature */}
            <div className="md:col-span-2 bg-primary p-10 rounded-[2rem] text-white overflow-hidden relative group">
              <div className="max-w-sm relative z-10">
                <h3 className="font-headline text-2xl font-bold mb-4">
                  Wearable Integration
                </h3>
                <p className="text-primary-fixed leading-relaxed">
                  Sync your Apple Health, Oura, or Whoop data to see how your
                  nutrition impacts your sleep and recovery.
                </p>
              </div>
              {/* Background Decoration */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500"></div>
              <span
                className="material-symbols-outlined absolute right-12 top-1/2 -translate-y-1/2 text-9xl text-white/5 pointer-events-none"
                style={{ fontVariationSettings: "'wght' 200" }}
              >
                watch
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Progress Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="aspect-square w-full max-w-md bg-surface-container rounded-full flex items-center justify-center border-[20px] border-surface-container-highest">
                <div
                  className="absolute inset-0 border-[20px] border-primary-container rounded-full"
                  style={{
                    clipPath:
                      "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20%)",
                  }}
                ></div>
                <div className="text-center">
                  <p className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                    PROGRESS
                  </p>
                  <h2 className="font-headline text-7xl font-bold text-primary tracking-tighter">
                    82%
                  </h2>
                </div>
              </div>
              {/* Floating Data Chips */}
              <div className="absolute top-10 -right-4 glass-card p-4 rounded-2xl shadow-xl border border-white/20">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-green-500">
                    trending_up
                  </span>
                  <span className="font-bold text-sm">+12% Energy</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="font-headline text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Data that tells a{" "}
              <span className="text-primary-container italic">story</span>.
            </h2>
            <p className="font-body text-lg text-on-surface-variant mb-12 leading-relaxed">
              We don&apos;t just dump numbers. NutriTrack analyzes your eating
              patterns to find the correlation between your diet and your mood,
              energy levels, and sleep quality.
            </p>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">
                    lightbulb
                  </span>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Weekly Insights</h4>
                  <p className="text-on-surface-variant text-sm">
                    Personalized reports on your macro balance and micronutrient
                    intake.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">
                    target
                  </span>
                </div>
                <div>
                  <h4 className="font-bold mb-1">Dynamic Goals</h4>
                  <p className="text-on-surface-variant text-sm">
                    Goals that adapt to your activity level and metabolic
                    changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="py-24 px-6 bg-surface-container-lowest border-t border-outline-variant/10">
        <div className="max-w-screen-xl mx-auto">
          <div className="bg-surface-container p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-headline text-4xl md:text-6xl font-bold mb-8 max-w-3xl mx-auto">
                Ready to simplify your nutrition?
              </h2>
              <p className="font-body text-on-surface-variant text-lg mb-12 max-w-xl mx-auto">
                Join over 50,000 health enthusiasts tracking their way to a
                better self.
              </p>
              <button onClick={() => navigate("/signup")} className="gradient-button px-12 py-5 rounded-full text-on-primary font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-green-500/30">
                Get Started For Free
              </button>
              <p className="mt-6 text-sm text-on-surface-variant">
                No credit card required. Free 14-day trial.
              </p>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl -ml-20 -mb-20"></div>
          </div>

          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
            <div className="col-span-2">
              <span className="text-2xl font-extrabold text-primary mb-6 block">
                NutriTrack
              </span>
              <p className="text-on-surface-variant text-sm max-w-xs leading-relaxed">
                The world&apos;s first conversational nutrition tracker. Built
                for people who value their time and health.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-6">Product</h5>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                <li>
                  <a className="hover:text-primary" href="#">
                    Features
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    AI Chat
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6">Resources</h5>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                <li>
                  <a className="hover:text-primary" href="#">
                    Blog
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Guides
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6">Company</h5>
              <ul className="space-y-4 text-sm text-on-surface-variant">
                <li>
                  <a className="hover:text-primary" href="#">
                    About
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Careers
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6">Connect</h5>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container/20 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-on-surface-variant text-xl">
                    share
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container/20 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-on-surface-variant text-xl">
                    alternate_email
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-on-surface-variant">
              © 2024 NutriTrack AI Inc. All rights reserved.
            </p>
            <div className="flex gap-8 text-xs text-on-surface-variant">
              <a href="#">Terms of Service</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
