'use client';
import React from 'react';
import { ArrowUp, ArrowDown, Star, MessageSquare, MessageCircle, AlertTriangle, Siren, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { kpiData, branchHealthData, reviewsData, escalationsInit } from '@/lib/mockData';

export default function DashboardView({ branch, setReviewsTab, setActiveView, resolveEscalation, escalations }: any) {
  const filteredHealth = branch === 'All Branches' ? branchHealthData : branchHealthData.filter(b => b.name === branch);
  const filteredReviews = branch === 'All Branches' ? reviewsData : reviewsData.filter(x => x.branch === branch);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Good morning, Priya 👋</h1>
          <p className="text-slate-500 text-sm mt-1">Here&apos;s what&apos;s happening across all branches today — Saturday, 28 Feb 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-card p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Total Reviews Today</p>
              <h3 className="text-2xl font-bold mt-1">{kpiData.total}</h3>
            </div>
            <div className="p-2 bg-primary/10 rounded-lg"><MessageSquare className="w-5 h-5 text-primary" /></div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">+6</span>
            <span className="text-slate-400 ml-1">since yesterday</span>
          </div>
        </div>
        <div className="bg-card p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Average Rating</p>
              <h3 className="text-2xl font-bold mt-1">{kpiData.avg} <span className="text-yellow-400 text-xl">★</span></h3>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg"><Star className="w-5 h-5 text-yellow-500" /></div>
          </div>
          <div className="mt-4 text-sm text-slate-400">Across all branches</div>
        </div>
        <div className="bg-card p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Response Rate</p>
              <h3 className="text-2xl font-bold mt-1">{kpiData.response}%</h3>
            </div>
            <div className="p-2 bg-primary/10 rounded-lg"><MessageCircle className="w-5 h-5 text-primary" /></div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-slate-100 rounded-full h-1.5 mb-1">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: `${kpiData.response}%` }}></div>
            </div>
            <span className="text-xs text-slate-400">12 reviews pending reply</span>
          </div>
        </div>
        <div className="bg-card p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Negative Reviews</p>
              <h3 className="text-2xl font-bold mt-1">{kpiData.negative}</h3>
            </div>
            <div className="p-2 bg-orange-50 rounded-lg"><AlertTriangle className="w-5 h-5 text-orange-500" /></div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowDown className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">vs 7</span>
            <span className="text-slate-400 ml-1">yesterday</span>
          </div>
        </div>
        <div className="bg-card p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border cursor-pointer hover:border-red-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Escalations Open</p>
              <h3 className="text-2xl font-bold mt-1 text-red-600">{kpiData.escalations}</h3>
            </div>
            <div className="p-2 bg-red-50 rounded-lg animate-pulse"><Siren className="w-5 h-5 text-red-500" /></div>
          </div>
          <div className="mt-4 text-sm text-red-500 font-medium">SLA breach in 1h 20m</div>
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
        <h2 className="text-lg font-bold mb-4">Branch Health Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredHealth.map((b, i) => (
            <div key={i} className={`p-4 rounded-2xl border ${b.alert ? 'border-l-4 border-l-red-500 border-border bg-red-50/30' : 'border-border bg-slate-50/50'}`}>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-slate-800">{b.name}</h3>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${b.statusColor}`}>{b.status}</span>
              </div>
              <div className="text-2xl font-bold mb-4">{b.score} <span className="text-yellow-400 text-xl">★</span></div>
              <div className="space-y-2 mb-4 text-xs font-medium text-slate-600">
                <div className="flex justify-between"><span>Food</span><span>{b.food}</span></div>
                <div className="flex justify-between"><span>Service</span><span>{b.service}</span></div>
                <div className="flex justify-between"><span>Ambience</span><span>{b.ambience}</span></div>
                <div className="flex justify-between"><span>Clean</span><span>{b.clean}</span></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 mb-4 pb-4 border-b border-border">
                <span>Today: <b>{b.today}</b></span>
                <span className={b.pending > 0 ? 'text-orange-600 font-bold' : ''}>Pending: <b>{b.pending}</b></span>
              </div>
              <div className="flex space-x-1 text-[10px] font-bold">
                <span className="bg-green-100 text-green-700 px-1.5 py-1 rounded">{b.pos} Pos</span>
                <span className="bg-slate-100 text-slate-600 px-1.5 py-1 rounded">{b.neu} Neu</span>
                <span className="bg-red-100 text-red-700 px-1.5 py-1 rounded">{b.neg} Neg</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="w-full xl:w-[60%] space-y-6">
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold flex items-center">
                Recent Reviews <span className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></span>
              </h2>
              <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
                {['All', 'Internal', 'Google', 'Zomato'].map(tab => (
                  <button key={tab} onClick={() => setReviewsTab(tab)} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${tab === 'All' ? 'bg-card text-foreground shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {filteredReviews.slice(0, 3).map(r => (
                <div key={r.id} className="p-4 rounded-2xl border border-border hover:border-border bg-slate-50/50 relative overflow-hidden">
                  {r.escalated && <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>}
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${r.source === 'Google' ? 'bg-primary/20 text-primary' : r.source === 'Internal' ? 'bg-primary/10 text-primary' : 'bg-orange-100 text-orange-700'}`}>{r.source}</span>
                      <span className="text-xs font-medium text-slate-500 bg-slate-200/50 px-2 py-0.5 rounded">{r.branch}</span>
                      {r.escalated && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 uppercase">Escalated</span>}
                    </div>
                    <div className="flex text-yellow-400 text-sm">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < r.rating ? 'fill-current' : 'text-slate-200'}`} />)}
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="font-bold text-sm">{r.name}</span>
                    <span className="text-xs text-slate-400">{r.time}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">{r.text}</p>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${r.sentiment === 'Positive' ? 'bg-green-100 text-green-700' : r.sentiment === 'Negative' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>{r.sentiment}</span>
                      <div className="flex space-x-1">
                        {r.tags.map(t => <span key={t} className="text-[10px] text-slate-500 border border-border px-1.5 py-0.5 rounded">[{t}]</span>)}
                      </div>
                      {r.staff && (
                        <div className="flex items-center ml-2 text-xs text-slate-500">
                          <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-bold mr-1">{r.staff[0]}</div>
                          {r.staff}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-xs font-medium px-3 py-1.5 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">Reply</button>
                      {!r.escalated && <button className="text-xs font-medium px-3 py-1.5 bg-card text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors">Escalate</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setActiveView('Reviews Inbox')} className="w-full mt-4 py-2 text-sm font-medium text-primary hover:text-primary/90 flex items-center justify-center">View All Reviews <ArrowRight className="w-4 h-4 ml-1" /></button>
          </div>
        </div>

        <div className="w-full xl:w-[40%] space-y-6">
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center">
              🚨 Open Escalations <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">{escalations.filter((e: any) => e.status !== 'Resolved ✓').length}</span>
            </h2>
            <div className="space-y-3">
              {escalations.map((e: any) => (
                <div key={e.id} className="p-3 border border-border rounded-lg bg-slate-50">
                  <p className="text-sm font-medium italic text-slate-700 mb-2">&quot;{e.text}&quot;</p>
                  <div className="flex justify-between text-xs text-slate-500 mb-2">
                    <span>{e.branch}</span>
                    <span>Assigned: <b>{e.assigned}</b></span>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
                    <div>
                      <div className={`text-xs font-bold ${e.slaColor}`}>{e.sla}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">{e.status}</div>
                    </div>
                    {e.status !== 'Resolved ✓' ? (
                      <button onClick={() => resolveEscalation(e.id)} className="text-xs font-medium px-3 py-1.5 bg-slate-800 text-white rounded hover:bg-slate-700 transition-colors">Resolve</button>
                    ) : (
                      <span className="text-xs font-bold text-green-600 flex items-center"><CheckCircle2 className="w-4 h-4 mr-1" /> Resolved</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
            <h2 className="text-lg font-bold flex items-center">⚡ Quick Reply Queue</h2>
            <p className="text-xs text-slate-500 mb-4">12 reviews awaiting response</p>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-3 border border-border rounded-lg bg-slate-50">
                  <div className="flex text-yellow-400 text-xs mb-1">
                    {[...Array(5)].map((_, j) => <Star key={j} className={`w-3 h-3 ${j < (i===2?3:5) ? 'fill-current' : 'text-slate-200'}`} />)}
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-2">&quot;{i===2 ? 'Food was okay but service was slow.' : 'Amazing experience, loved the ambience!'}&quot;</p>
                  <div className="flex items-center text-[10px] font-medium text-primary bg-primary/10 px-2 py-1 rounded mb-3 w-fit">
                    <Sparkles className="w-3 h-3 mr-1" /> {i===2 ? 'Neutral — Apology & Offer' : 'Positive — General Thanks'}
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 text-xs font-medium py-1.5 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">Use Template</button>
                    <button className="flex-1 text-xs font-medium py-1.5 bg-card text-slate-700 border border-border rounded hover:bg-slate-50 transition-colors">Customize</button>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setActiveView('Reviews Inbox')} className="w-full mt-4 py-2 text-sm font-medium text-primary hover:text-primary/90 flex items-center justify-center">Open Full Inbox <ArrowRight className="w-4 h-4 ml-1" /></button>
          </div>
        </div>
      </div>
    </>
  );
}
