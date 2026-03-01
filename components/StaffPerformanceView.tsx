'use client';
import React, { useState } from 'react';
import { Star, TrendingUp, TrendingDown, Minus, Search, ChevronRight } from 'lucide-react';
import { staffData } from '@/lib/mockData';

export default function StaffPerformanceView({ setActiveView }: any) {
  const [period, setPeriod] = useState<'This Month' | 'Last Month'>('This Month');
  const [selectedStaff, setSelectedStaff] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-slate-500 mb-2">
        <button onClick={() => setActiveView('Dashboard')} className="hover:text-primary transition-colors">Dashboard</button>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-medium">Staff Performance</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Staff Performance</h1>
          <p className="text-slate-500 text-sm mt-1">Track and coach your team based on customer feedback</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={period} 
            onChange={(e) => setPeriod(e.target.value as any)} 
            className="text-sm border border-border rounded-lg px-3 py-2 bg-card outline-none focus:ring-2 focus:ring-primary shadow-sm"
          >
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Leaderboard */}
        <div className={`bg-card rounded-2xl shadow-sm border border-border overflow-hidden ${selectedStaff ? 'xl:col-span-2' : 'xl:col-span-3'}`}>
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h2 className="text-lg font-bold">Leaderboard</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search staff..." className="w-full bg-slate-50 text-sm rounded-lg pl-9 pr-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary border border-border" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-medium uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3">Rank</th>
                  <th className="px-6 py-3">Staff</th>
                  <th className="px-6 py-3">Branch</th>
                  <th className="px-6 py-3">Avg Rating</th>
                  <th className="px-6 py-3">Reviews</th>
                  <th className="px-6 py-3">Sentiment</th>
                  <th className="px-6 py-3">Trend</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {staffData[period].map((s, i) => (
                  <tr 
                    key={s.name} 
                    onClick={() => setSelectedStaff(s)}
                    className={`transition-colors cursor-pointer ${selectedStaff?.name === s.name ? 'bg-primary/5' : 'hover:bg-slate-50'} ${i < 2 ? 'bg-green-50/30' : i > 3 ? 'bg-red-50/30' : ''}`}
                  >
                    <td className="px-6 py-4 font-bold text-slate-400">#{s.rank}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold mr-3 text-slate-700">{s.initial}</div>
                        <div>
                          <div className="font-bold text-slate-900">{s.name}</div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider">{s.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{s.branch}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center font-bold">
                        {s.rating} <Star className="w-4 h-4 text-yellow-500 fill-current ml-1" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{s.reviews}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center w-24 h-2 bg-red-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${s.pos}%` }}></div>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">{s.pos}% Pos</div>
                    </td>
                    <td className="px-6 py-4">
                      {s.trend === '↑' ? <TrendingUp className="w-4 h-4 text-green-500" /> : s.trend === '↓' ? <TrendingDown className="w-4 h-4 text-red-500" /> : <Minus className="w-4 h-4 text-slate-400" />}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Staff Detail Card */}
        {selectedStaff && (
          <div className="bg-card rounded-2xl shadow-sm border border-border flex flex-col h-[600px] sticky top-6">
            <div className="p-6 border-b border-border bg-slate-50/50 rounded-t-2xl">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mr-4 shadow-sm">{selectedStaff.initial}</div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedStaff.name}</h2>
                  <p className="text-sm text-slate-500">{selectedStaff.role} • {selectedStaff.branch}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-card p-3 rounded-xl border border-border shadow-sm">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Avg Rating</div>
                  <div className="text-lg font-bold flex items-center">{selectedStaff.rating} <Star className="w-4 h-4 text-yellow-500 fill-current ml-1" /></div>
                </div>
                <div className="bg-card p-3 rounded-xl border border-border shadow-sm">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Total Reviews</div>
                  <div className="text-lg font-bold">{selectedStaff.reviews}</div>
                </div>
              </div>
            </div>
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              <div>
                <h3 className="text-sm font-bold mb-3">Recent Tagged Reviews</h3>
                <div className="space-y-3">
                  <div className="p-3 border border-border rounded-xl bg-slate-50 text-sm">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex text-yellow-400"><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/></div>
                      <span className="text-xs text-slate-400">2d ago</span>
                    </div>
                    <p className="text-slate-700 italic">&quot;{selectedStaff.name} was amazing, very attentive and friendly!&quot;</p>
                  </div>
                  {selectedStaff.alert && (
                    <div className="p-3 border border-red-200 rounded-xl bg-red-50 text-sm">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex text-yellow-400"><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 text-slate-300"/><Star className="w-3 h-3 text-slate-300"/><Star className="w-3 h-3 text-slate-300"/></div>
                        <span className="text-xs text-slate-400">4d ago</span>
                      </div>
                      <p className="text-slate-700 italic">&quot;Service was slow, {selectedStaff.name} seemed distracted.&quot;</p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold mb-3">Manager Notes</h3>
                <textarea 
                  className="w-full h-24 p-3 text-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none bg-slate-50"
                  placeholder="Add coaching notes here..."
                ></textarea>
                <button className="w-full mt-3 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors">
                  Save Note & Send Feedback
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
