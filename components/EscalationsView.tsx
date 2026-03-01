'use client';
import React, { useState } from 'react';
import { AlertTriangle, Clock, Plus, Filter, MoreVertical, MessageSquare } from 'lucide-react';
import { escalationsInit } from '@/lib/mockData';

export default function EscalationsView({ setActiveView }: any) {
  const [escalations, setEscalations] = useState(escalationsInit);

  const columns = ['Open', 'In Progress', 'Resolved ✓'];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center text-sm text-slate-500 mb-2">
        <button onClick={() => setActiveView('Dashboard')} className="hover:text-primary transition-colors">Dashboard</button>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-medium">Escalations</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Escalations Board</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and resolve high-priority customer issues</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm transition-all">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 shadow-sm transition-all">
            <Plus className="w-4 h-4 mr-2" /> Create Escalation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Total Open</div>
          <div className="text-2xl font-bold">{escalations.filter(e => e.status === 'Open').length}</div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Avg Resolution Time</div>
          <div className="text-2xl font-bold">4.2h</div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
          <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">SLA Compliance</div>
          <div className="text-2xl font-bold text-green-600">78%</div>
        </div>
        <div className="bg-red-50 p-4 rounded-xl border border-red-100 shadow-sm">
          <div className="text-xs text-red-500 uppercase tracking-wider font-bold mb-1">Overdue</div>
          <div className="text-2xl font-bold text-red-600">1</div>
        </div>
      </div>

      <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow-sm">
        <AlertTriangle className="w-4 h-4 mr-2" /> SLA Breach Alert: 1 escalation has exceeded its resolution timeframe.
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {columns.map(col => (
          <div key={col} className="flex-1 min-w-[320px] bg-slate-50/50 rounded-2xl border border-border flex flex-col max-h-full">
            <div className="p-4 border-b border-border flex justify-between items-center bg-slate-100/50 rounded-t-2xl">
              <h3 className="font-bold text-slate-800">{col}</h3>
              <span className="bg-slate-200 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {escalations.filter(e => e.status === col).length}
              </span>
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              {escalations.filter(e => e.status === col).map(e => (
                <div key={e.id} className="bg-card p-4 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex space-x-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${e.priority === 'High' ? 'bg-red-100 text-red-700' : e.priority === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>{e.priority}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">{e.branch}</span>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                  
                  <p className="text-sm text-slate-700 mb-4 line-clamp-3 italic">&quot;{e.text}&quot;</p>
                  
                  <div className="flex justify-between items-center mb-4 text-xs text-slate-500">
                    <div className="flex items-center">
                      <MessageSquare className="w-3 h-3 mr-1" /> {e.customer} ({e.rating}★)
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {e.created}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold mr-2">{e.assigned[0]}</div>
                      <span className="text-xs font-medium text-slate-700">{e.assigned}</span>
                    </div>
                    {col !== 'Resolved ✓' ? (
                      <span className={`text-[10px] font-bold ${e.slaColor}`}>{e.sla}</span>
                    ) : (
                      <span className="text-[10px] font-bold text-green-600">Resolved in 2.5h</span>
                    )}
                  </div>
                  
                  {col !== 'Resolved ✓' && (
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 text-xs font-medium py-1.5 bg-card text-slate-700 border border-border rounded-lg hover:bg-slate-50 transition-colors">Add Note</button>
                      <button 
                        onClick={() => setEscalations(prev => prev.map(item => item.id === e.id ? { ...item, status: 'Resolved ✓', slaColor: 'text-green-600' } : item))}
                        className="flex-1 text-xs font-medium py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Resolve
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
