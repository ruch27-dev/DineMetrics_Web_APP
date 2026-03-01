'use client';
import React, { useState } from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { Download, TrendingUp, TrendingDown, Minus, Star } from 'lucide-react';
import { csatData, pieData, barData, avgRatingByBranch, branchHealthData } from '@/lib/mockData';

const radarData = [
  { subject: 'Food', A: 4.6, B: 4.1, C: 4.3, D: 4.5, E: 4.1, fullMark: 5 },
  { subject: 'Service', A: 4.4, B: 3.5, C: 4.1, D: 4.3, E: 3.9, fullMark: 5 },
  { subject: 'Ambience', A: 4.7, B: 4.2, C: 4.0, D: 4.2, E: 4.0, fullMark: 5 },
  { subject: 'Cleanliness', A: 4.5, B: 4.0, C: 4.4, D: 4.6, E: 4.1, fullMark: 5 },
  { subject: 'Staff', A: 4.6, B: 3.2, C: 4.8, D: 4.3, E: 4.3, fullMark: 5 },
  { subject: 'Value', A: 4.2, B: 3.8, C: 4.1, D: 4.4, E: 4.0, fullMark: 5 },
];

export default function AnalyticsView({ setActiveView }: any) {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-slate-500 mb-2">
        <button onClick={() => setActiveView('Dashboard')} className="hover:text-primary transition-colors">Dashboard</button>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-medium">Analytics</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics & Insights</h1>
          <p className="text-slate-500 text-sm mt-1">Deep dive into your performance metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select className="text-sm border border-border rounded-lg px-3 py-2 bg-card outline-none focus:ring-2 focus:ring-primary shadow-sm">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Last 90 Days</option>
            <option>Custom Range</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm transition-all">
            <Download className="w-4 h-4 mr-2" /> Export Data
          </button>
        </div>
      </div>

      <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl w-fit overflow-x-auto max-w-full">
        {['Overview', 'Branch Comparison', 'Category Analysis', 'Sentiment Deep Dive', 'Custom Reports'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-card text-foreground shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
            <h2 className="text-lg font-bold mb-6">Customer Satisfaction Over 30 Days</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={csatData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                  <YAxis domain={[3.5, 5.0]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                  <RTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="score" name="CSAT Score" stroke="#fb7232" strokeWidth={3} dot={{ r: 4, fill: '#fb7232', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
            <h2 className="text-lg font-bold mb-6">Review Sources</h2>
            <div className="h-72 flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie data={pieData} innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value" label>
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <RTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex space-x-4 text-sm font-medium mt-4">
                {pieData.map(d => <div key={d.name} className="flex items-center"><span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: d.color}}></span>{d.name}</div>)}
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-6 lg:col-span-2">
            <h2 className="text-lg font-bold mb-6">Average Rating by Branch</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={avgRatingByBranch} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                  <YAxis domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                  <RTooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="rating" name="Avg Rating" fill="#fb7232" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Branch Comparison' && (
        <div className="space-y-6">
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
            <h2 className="text-lg font-bold mb-6">Branch Performance Radar</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: '#94A3B8', fontSize: 10 }} />
                  <Radar name="Mulund" dataKey="A" stroke="#fb7232" fill="#fb7232" fillOpacity={0.3} />
                  <Radar name="Dombivli" dataKey="B" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
                  <Radar name="Kalyan West" dataKey="C" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <RTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-bold">Branch Ranking</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-medium uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-3">Rank</th>
                    <th className="px-6 py-3">Branch</th>
                    <th className="px-6 py-3">Avg Rating</th>
                    <th className="px-6 py-3">Total Reviews</th>
                    <th className="px-6 py-3">Response Rate</th>
                    <th className="px-6 py-3">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {branchHealthData.sort((a, b) => b.score - a.score).map((b, i) => (
                    <tr key={b.name} className="hover:bg-slate-50 transition-colors cursor-pointer">
                      <td className="px-6 py-4 font-bold text-slate-400">#{i + 1}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{b.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="font-bold mr-1">{b.score}</span>
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        </div>
                      </td>
                      <td className="px-6 py-4">{b.today * 10}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-slate-200 rounded-full h-1.5 mr-2">
                            <div className="bg-primary h-1.5 rounded-full" style={{ width: `${(b.responded / b.today) * 100}%` }}></div>
                          </div>
                          <span className="text-xs text-slate-500">{Math.round((b.responded / b.today) * 100)}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {b.status.includes('Up') ? <TrendingUp className="w-4 h-4 text-green-500" /> : b.status.includes('Attention') ? <TrendingDown className="w-4 h-4 text-red-500" /> : <Minus className="w-4 h-4 text-slate-400" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'Overview' && activeTab !== 'Branch Comparison' && (
        <div className="p-12 bg-card rounded-2xl shadow-sm border border-border flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{activeTab} - Coming Soon</h2>
          <p className="text-slate-500">This analytics module is currently under development.</p>
        </div>
      )}
    </div>
  );
}
