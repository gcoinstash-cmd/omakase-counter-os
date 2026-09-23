import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  LogOut, 
  Search, 
  Key, 
  Sparkles,
  CheckCircle,
  Wine,
  UtensilsCrossed,
  Layers,
  Trash2
} from 'lucide-react';

export interface OmakaseReservation {
  id: string;
  reservationCode: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  partySize: number;
  seatingTime: '5:30 pm' | '8:15 pm';
  reservationDate: string;
  courseSelection: '12-Course Imperial Omakase ($285/guest)' | '16-Course Grand Master Tasting ($395/guest)';
  sommelierPairing: 'Rare Junmai Daiginjo Flight (+$145)' | 'Burgundy Premier Cru Selection (+$195)' | 'None';
  dietaryRestrictions: string;
  status: 'Confirmed' | 'Seated at Counter' | 'Courses In-Flight' | 'Completed';
  totalDeposit: number;
}

interface OmakaseAdminDashboardProps {
  onExit: () => void;
}

export default function OmakaseAdminDashboard({ onExit }: OmakaseAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'manifest' | 'seating' | 'sommelier'>('manifest');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const [reservations, setReservations] = useState<OmakaseReservation[]>([
    {
      id: 'RES-801',
      reservationCode: 'OMK-491028',
      guestName: 'Kenzo Takahashi & Guest',
      guestEmail: 'kenzo@takahashi-holdings.jp',
      guestPhone: '+81 90-1234-5678',
      partySize: 2,
      seatingTime: '8:15 pm',
      reservationDate: new Date().toISOString().split('T')[0],
      courseSelection: '16-Course Grand Master Tasting ($395/guest)',
      sommelierPairing: 'Rare Junmai Daiginjo Flight (+$145)',
      dietaryRestrictions: 'Strictly zero gluten shoyu, loves wild wasabi root.',
      status: 'Confirmed',
      totalDeposit: 1080
    },
    {
      id: 'RES-802',
      reservationCode: 'OMK-771920',
      guestName: 'Dr. Evelyn Vance & Party',
      guestEmail: 'evelyn.vance@vance-partners.com',
      guestPhone: '+1 (415) 890-4421',
      partySize: 4,
      seatingTime: '5:30 pm',
      reservationDate: new Date().toISOString().split('T')[0],
      courseSelection: '12-Course Imperial Omakase ($285/guest)',
      sommelierPairing: 'Burgundy Premier Cru Selection (+$195)',
      dietaryRestrictions: 'No shellfish allergies, requests extra otoro nigiri pieces.',
      status: 'Seated at Counter',
      totalDeposit: 1920
    },
    {
      id: 'RES-803',
      reservationCode: 'OMK-339182',
      guestName: 'Marcus Sterling',
      guestEmail: 'msterling@sterlingtrust.org',
      guestPhone: '+1 (310) 902-1433',
      partySize: 2,
      seatingTime: '8:15 pm',
      reservationDate: new Date().toISOString().split('T')[0],
      courseSelection: '16-Course Grand Master Tasting ($395/guest)',
      sommelierPairing: 'Rare Junmai Daiginjo Flight (+$145)',
      dietaryRestrictions: 'Allergies: zero uni for guest 2.',
      status: 'Confirmed',
      totalDeposit: 1080
    },
    {
      id: 'RES-804',
      reservationCode: 'OMK-110294',
      guestName: 'Elena Rostova',
      guestEmail: 'elena@rostovacap.com',
      guestPhone: '+1 (212) 440-9811',
      partySize: 2,
      seatingTime: '5:30 pm',
      reservationDate: new Date().toISOString().split('T')[0],
      courseSelection: '12-Course Imperial Omakase ($285/guest)',
      sommelierPairing: 'Rare Junmai Daiginjo Flight (+$145)',
      dietaryRestrictions: 'None.',
      status: 'Completed',
      totalDeposit: 860
    }
  ]);

  const handleUpdateStatus = (id: string, newStatus: OmakaseReservation['status']) => {
    setReservations(prev => prev.map(res => res.id === id ? { ...res, status: newStatus } : res));
  };

  const filteredReservations = reservations.filter(res => {
    const matchesSearch = res.guestName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.reservationCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.guestEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || res.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalSeatsTonight = reservations.reduce((acc, r) => acc + r.partySize, 0);
  const totalRevenueTonight = reservations.reduce((acc, r) => acc + r.totalDeposit, 0);

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-[#E8E4DC] font-sans selection:bg-[#E8E4DC]/20 selection:text-white">
      {/* Top Telemetry HUD */}
      <header className="sticky top-0 z-50 bg-[#141414]/95 backdrop-blur-md border-b border-[#2C2C2A] px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-[#2C2C2A] flex items-center justify-center text-[#E8E4DC]">
              <UtensilsCrossed className="w-5 h-5 text-[#E8E4DC]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-normal tracking-[0.2em] uppercase font-serif text-[#E8E4DC]">OMAKASE & COUNTER</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-white/10 text-[#E8E4DC] border border-[#2C2C2A] font-bold">
                  CHEF'S COUNTER ORCHESTRATION OS
                </span>
              </div>
              <p className="text-xs text-stone-400 font-mono">16-Seat Hinoki Counter · Kyoto Gion District</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-black/60 border border-[#2C2C2A] text-xs font-mono text-stone-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>PASSCODE: <strong className="text-[#E8E4DC]">omakase2026</strong></span>
            </div>
            <button
              onClick={onExit}
              className="flex items-center gap-2 px-4 py-2 border border-[#2C2C2A] bg-black/40 hover:bg-[#E8E4DC] hover:text-black hover:border-[#E8E4DC] text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>RETURN TO GUEST EXPERIENCE</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 bg-[#141414] border border-[#2C2C2A] relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Tonight's Counter Revenue</span>
              <DollarSign className="w-4 h-4 text-[#E8E4DC]" />
            </div>
            <div className="text-2xl font-normal font-mono text-white">${totalRevenueTonight.toLocaleString()}</div>
            <div className="text-[11px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>{totalSeatsTonight} of 16 Hinoki Seats Filled</span>
            </div>
          </div>

          <div className="p-5 bg-[#141414] border border-[#2C2C2A] relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Seating Occupancy</span>
              <Clock className="w-4 h-4 text-[#E8E4DC]" />
            </div>
            <div className="text-2xl font-normal font-mono text-[#E8E4DC]">93.8%</div>
            <div className="text-[11px] font-mono text-stone-400 mt-1">5:30 PM & 8:15 PM Seatings</div>
          </div>

          <div className="p-5 bg-[#141414] border border-[#2C2C2A] relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Sommelier Attach Rate</span>
              <Wine className="w-4 h-4 text-[#E8E4DC]" />
            </div>
            <div className="text-2xl font-normal font-mono text-white">100%</div>
            <div className="text-[11px] font-mono text-emerald-400 mt-1">4 of 4 reservations paired</div>
          </div>

          <div className="p-5 bg-[#141414] border border-[#2C2C2A] relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Turnkey Database</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-normal font-mono text-emerald-400">ACTIVE</div>
            <div className="text-[11px] font-mono text-stone-400 mt-1">RLS Protected · Supabase 2.4</div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-[#2C2C2A] mb-6 font-mono text-xs">
          <button
            onClick={() => setActiveTab('manifest')}
            className={`px-4 py-2.5 border-b-2 font-bold transition-colors cursor-pointer ${
              activeTab === 'manifest'
                ? 'border-[#E8E4DC] text-[#E8E4DC]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            TONIGHT'S COUNTER MANIFEST ({reservations.length})
          </button>
          <button
            onClick={() => setActiveTab('seating')}
            className={`px-4 py-2.5 border-b-2 font-bold transition-colors cursor-pointer ${
              activeTab === 'seating'
                ? 'border-[#E8E4DC] text-[#E8E4DC]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            HINOKI COUNTER SEATING MAP
          </button>
          <button
            onClick={() => setActiveTab('sommelier')}
            className={`px-4 py-2.5 border-b-2 font-bold transition-colors cursor-pointer ${
              activeTab === 'sommelier'
                ? 'border-[#E8E4DC] text-[#E8E4DC]'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
          >
            SOMMELIER REVENUE LEDGER
          </button>
        </div>

        {/* Tab 1: Manifest */}
        {activeTab === 'manifest' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#141414] p-4 border border-[#2C2C2A] font-mono text-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-500" />
                <input
                  type="text"
                  placeholder="Search guest, code, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-black/60 border border-[#2C2C2A] text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#E8E4DC]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-stone-500 uppercase">Filter:</span>
                {['All', 'Confirmed', 'Seated at Counter', 'Completed'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-2.5 py-1 text-[11px] border cursor-pointer ${
                      filterStatus === s
                        ? 'border-[#E8E4DC] bg-[#E8E4DC]/10 text-[#E8E4DC]'
                        : 'border-[#2C2C2A] text-stone-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto border border-[#2C2C2A] bg-[#141414]">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-black/60 text-stone-400 border-b border-[#2C2C2A] uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Code & Time</th>
                    <th className="py-3 px-4">Guest & Party</th>
                    <th className="py-3 px-4">Course & Pairing</th>
                    <th className="py-3 px-4">Dietary Notes</th>
                    <th className="py-3 px-4">Total Value</th>
                    <th className="py-3 px-4">Status & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2C2C2A]/60">
                  {filteredReservations.map((res) => (
                    <tr key={res.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#E8E4DC]">{res.reservationCode}</div>
                        <div className="text-[10px] text-stone-400">{res.seatingTime}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-normal text-white">{res.guestName}</div>
                        <div className="text-[10px] text-stone-500">{res.partySize} Guests · {res.guestPhone}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-white text-[11px]">{res.courseSelection}</div>
                        <div className="text-[10px] text-[#E8E4DC]/70">{res.sommelierPairing}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-stone-400 text-[11px] max-w-xs">{res.dietaryRestrictions}</div>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-white">
                        ${res.totalDeposit.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                            res.status === 'Seated at Counter' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800' :
                            res.status === 'Confirmed' ? 'bg-amber-950/60 text-amber-400 border border-amber-800' :
                            'bg-stone-800 text-stone-400'
                          }`}>
                            {res.status}
                          </span>
                          <select
                            value={res.status}
                            onChange={(e) => handleUpdateStatus(res.id, e.target.value as OmakaseReservation['status'])}
                            className="bg-black border border-[#2C2C2A] text-stone-300 px-1.5 py-0.5 text-[10px] focus:outline-none focus:border-[#E8E4DC]"
                          >
                            <option value="Confirmed">Mark Confirmed</option>
                            <option value="Seated at Counter">Seat at Counter</option>
                            <option value="Completed">Mark Completed</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Seating Map */}
        {activeTab === 'seating' && (
          <div className="p-8 bg-[#141414] border border-[#2C2C2A] font-mono text-xs">
            <h3 className="font-serif text-lg text-white mb-2">Hinoki Counter Seating Architecture</h3>
            <p className="text-stone-400 text-xs mb-6">16 Single-Slab Hinoki Wood Counter Stools directly facing the Master Shokunin preparation station.</p>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-8">
              {Array.from({ length: 16 }).map((_, i) => {
                const seatNum = i + 1;
                const isOccupied = seatNum <= 10;
                return (
                  <div
                    key={seatNum}
                    className={`p-4 border text-center flex flex-col justify-between h-24 ${
                      isOccupied 
                        ? 'border-emerald-800/80 bg-emerald-950/20 text-emerald-300' 
                        : 'border-[#2C2C2A] bg-black/40 text-stone-500'
                    }`}
                  >
                    <span className="text-[10px] text-stone-500">SEAT {seatNum}</span>
                    <span className="font-bold text-sm">{isOccupied ? 'FILLED' : 'OPEN'}</span>
                    <span className="text-[9px]">{isOccupied ? 'Course 7 of 16' : 'Available'}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Sommelier Ledger */}
        {activeTab === 'sommelier' && (
          <div className="space-y-6">
            <div className="p-6 bg-[#141414] border border-[#2C2C2A] font-mono">
              <h3 className="text-base font-normal text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#E8E4DC]" />
                <span>30-Day Tasting Counter Economics</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-black/60 border border-[#2C2C2A]">
                  <div className="text-stone-500 mb-1">Gross Tasting Revenue</div>
                  <div className="text-2xl font-normal text-white">$142,800</div>
                  <div className="text-stone-400 text-[11px] mt-1">26 operating evenings @ 98% cap</div>
                </div>
                <div className="p-4 bg-black/60 border border-[#2C2C2A]">
                  <div className="text-stone-500 mb-1">Rare Sake & Wine Pairings</div>
                  <div className="text-2xl font-normal text-[#E8E4DC]">$58,400</div>
                  <div className="text-stone-400 text-[11px] mt-1">Average $165 pairing add-on</div>
                </div>
                <div className="p-4 bg-black/60 border border-[#2C2C2A]">
                  <div className="text-stone-500 mb-1">Net Counter Operating Margin</div>
                  <div className="text-2xl font-normal text-emerald-400">48.2%</div>
                  <div className="text-stone-400 text-[11px] mt-1">Zero third-party marketplace commissions</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#141414] border border-[#E8E4DC]/20 font-mono text-xs">
              <div className="flex items-center gap-2 text-[#E8E4DC] font-normal text-sm uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Turnkey Commercial Acquisition Note</span>
              </div>
              <p className="text-stone-300 leading-relaxed font-sans text-xs">
                Omakase & Counter is engineered for Michelin-starred sushi counters, intimate chef-table experiences, and private dining rooms. Integrates seat inventory controls, sommelier pairing options, and turnkey PostgreSQL reservation databases.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
