import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Concept from "./components/Concept";
import Menu from "./components/Menu";
import Reserve from "./components/Reserve";
import Footer from "./components/Footer";
import ItemModal from "./components/ItemModal";
import OmakaseAdminDashboard from "./components/OmakaseAdminDashboard";
import { MenuItemType } from "./types";
import { Lock, X, Sparkles } from "lucide-react";

export default function App() {
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);

  // Admin Control Room State (1-Click Cheat Code Bypass)
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminPassModalOpen, setIsAdminPassModalOpen] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // URL /admin bypass check on boot
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    if (path.includes('admin') || hash.includes('admin') || search.includes('admin')) {
      setIsAdminMode(true);
      setTimeout(() => triggerToast("⚡ Shokunin Bypass: Counter Command Room Unlocked"), 300);
    }
  }, []);

  const handleAdminUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassInput.trim() === 'omakase2026') {
      setIsAdminMode(true);
      setIsAdminPassModalOpen(false);
      setAdminPassInput('');
      triggerToast("⚡ Counter Command Access Granted (Cheat Code Verified)");
    } else {
      triggerToast("❌ Invalid Passkey. Use demo passcode: omakase2026");
    }
  };

  const scrollToReserve = () => {
    const reserveSection = document.getElementById("order");
    if (reserveSection) {
      reserveSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (isAdminMode) {
    return <OmakaseAdminDashboard onExit={() => setIsAdminMode(false)} />;
  }

  return (
    <div className="bg-sumi-ink text-raw-silk min-h-screen relative selection:bg-raw-silk selection:text-sumi-ink">
      {/* Absolute luxury frame corners (very thin minimalist decorative border lines in margins) */}
      <div className="fixed inset-0 z-40 pointer-events-none border border-muted-charcoal/30 m-4 md:m-8" />

      {/* Global Header Navigation */}
      <Header 
        onReserveClick={scrollToReserve} 
        onOpenAdminPass={() => setIsAdminPassModalOpen(true)}
      />

      {/* Top ambient luxury lighting glow */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[500px] bg-gradient-to-b from-raw-silk/5 to-transparent blur-[120px] pointer-events-none z-0" />

      <main className="relative z-10">
        {/* Zen Hero Section */}
        <Hero onReserveClick={scrollToReserve} />

        {/* Philosophy & Concept Section */}
        <Concept />

        {/* Structured Course Grid Section */}
        <Menu onSelectItem={setSelectedItem} />

        {/* Interactive Reservation Seating Form */}
        <Reserve />
      </main>

      {/* Footer Timing/Location Details */}
      <Footer />

      {/* Sommelier Pairing & In-Depth Details Modal */}
      <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#141414] border border-[#2C2C2A] text-raw-silk px-4 py-3 shadow-2xl font-mono text-xs flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-raw-silk" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Pass Modal (1-Click Cheat Code Bypass) */}
      {isAdminPassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm font-mono">
          <div className="bg-[#141414] border border-[#2C2C2A] w-full max-w-md p-6 relative shadow-2xl text-raw-silk">
            <button
              onClick={() => setIsAdminPassModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 border border-[#2C2C2A] flex items-center justify-center text-raw-silk">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-white text-base">CHEF'S COUNTER COMMAND</h3>
                <p className="text-xs text-stone-400 font-mono">16-Seat Hinoki Reservation Ledger</p>
              </div>
            </div>

            <form onSubmit={handleAdminUnlock} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-stone-300 uppercase tracking-wider mb-2">
                  Enter Counter Access Passkey
                </label>
                <input
                  type="password"
                  placeholder="Enter passkey (e.g. omakase2026)"
                  value={adminPassInput}
                  onChange={(e) => setAdminPassInput(e.target.value)}
                  className="w-full bg-black/70 border border-[#2C2C2A] px-3 py-2 text-stone-100 text-xs focus:outline-none focus:border-raw-silk"
                  autoFocus
                />
              </div>

              <div className="p-3 bg-black/40 border border-[#2C2C2A] text-xs font-semibold">
                <div className="text-stone-400 mb-1 flex items-center justify-between">
                  <span>DEMO CHEAT CODE:</span>
                  <span className="text-stone-500">(1-Click Fill)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAdminPassInput('omakase2026')}
                  className="w-full py-1.5 px-2 bg-white/5 hover:bg-white/10 border border-[#2C2C2A] text-raw-silk font-bold text-left flex items-center justify-between cursor-pointer"
                >
                  <span>omakase2026</span>
                  <span className="text-xs font-semibold tracking-wider uppercase underline">AUTO-FILL</span>
                </button>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-raw-silk hover:bg-white text-black font-bold text-base font-semibold min-h-[44px] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Authorize Session
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdminPassModalOpen(false)}
                  className="py-2.5 px-4 bg-stone-900 border border-[#2C2C2A] text-stone-400 hover:text-white text-xs uppercase cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
