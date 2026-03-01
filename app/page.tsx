'use client';
import React, { useState } from 'react';
import { ChefHat, Search, Bell, ChevronDown, LayoutDashboard, Inbox, BarChart2, Users, MapPin, MessageSquare, Siren, Link as LinkIcon, Settings, Menu, X } from 'lucide-react';
import DashboardView from '@/components/DashboardView';
import ReviewsInboxView from '@/components/ReviewsInboxView';
import AnalyticsView from '@/components/AnalyticsView';
import StaffPerformanceView from '@/components/StaffPerformanceView';
import BranchesView from '@/components/BranchesView';
import ResponseTemplatesView from '@/components/ResponseTemplatesView';
import EscalationsView from '@/components/EscalationsView';
import IntegrationsView from '@/components/IntegrationsView';
import SettingsView from '@/components/SettingsView';
import { escalationsInit, branches } from '@/lib/mockData';

export default function DineMetricsDashboard() {
  const [activeView, setActiveView] = useState('Dashboard');
  const [branch, setBranch] = useState('All Branches');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [reviewsTab, setReviewsTab] = useState('All');
  const [notifsOpen, setNotifsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [escalations, setEscalations] = useState(escalationsInit);

  const resolveEscalation = (id: number) => setEscalations(prev => prev.map(e => e.id === id ? { ...e, status: 'Resolved ✓', slaColor: 'text-green-600' } : e));

  const renderContent = () => {
    switch(activeView) {
      case 'Dashboard':
        return <DashboardView branch={branch} setReviewsTab={setReviewsTab} setActiveView={setActiveView} resolveEscalation={resolveEscalation} escalations={escalations} />;
      case 'Reviews Inbox':
        return <ReviewsInboxView setActiveView={setActiveView} />;
      case 'Analytics':
        return <AnalyticsView setActiveView={setActiveView} />;
      case 'Staff Performance':
        return <StaffPerformanceView setActiveView={setActiveView} />;
      case 'Branches':
        return <BranchesView setActiveView={setActiveView} />;
      case 'Response Templates':
        return <ResponseTemplatesView setActiveView={setActiveView} />;
      case 'Escalations':
        return <EscalationsView setActiveView={setActiveView} />;
      case 'Integrations':
        return <IntegrationsView setActiveView={setActiveView} />;
      case 'Settings':
        return <SettingsView setActiveView={setActiveView} />;
      default:
        return (
          <div className="p-8 bg-card rounded-2xl shadow-sm border border-border flex flex-col items-center justify-center h-64 text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{activeView} - Coming Soon</h2>
            <p className="text-slate-500">This module is currently under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background text-slate-800 font-sans overflow-hidden">
      {/* SIDEBAR */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col bg-zinc-950 text-slate-300 transition-all duration-300 shrink-0`}>
        <div className="h-16 flex items-center justify-center border-b border-zinc-800">
          <ChefHat className="text-primary w-6 h-6" />
          {sidebarOpen && <span className="ml-2 font-bold text-white text-lg tracking-wide">DineMetrics</span>}
        </div>
        <div className="flex-1 py-4 space-y-1 overflow-y-auto">
          {[
            { icon: LayoutDashboard, label: 'Dashboard' },
            { icon: Inbox, label: 'Reviews Inbox', badge: 5 },
            { icon: BarChart2, label: 'Analytics' },
            { icon: Users, label: 'Staff Performance' },
            { icon: MapPin, label: 'Branches' },
            { icon: MessageSquare, label: 'Response Templates' },
            { icon: Siren, label: 'Escalations', badge: 3 },
            { icon: LinkIcon, label: 'Integrations' },
            { icon: Settings, label: 'Settings' }
          ].map((item, i) => {
            const isActive = activeView === item.label;
            return (
              <div 
                key={i} 
                onClick={() => setActiveView(item.label)} 
                className={`flex items-center px-4 py-3 mx-2 rounded-xl cursor-pointer transition-all ${
                  isActive 
                    ? 'bg-primary/10 text-primary border-r-4 border-primary' 
                    : 'hover:bg-zinc-900 hover:text-white border-r-4 border-transparent'
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {sidebarOpen && <span className="ml-3 flex-1 text-sm font-medium">{item.label}</span>}
                {sidebarOpen && item.badge && <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">{item.badge}</span>}
                {!sidebarOpen && item.badge && <span className="absolute right-4 w-2 h-2 bg-primary rounded-full"></span>}
              </div>
            );
          })}
        </div>
        <div className="p-4 border-t border-zinc-800">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="flex items-center justify-center w-full p-2 rounded hover:bg-zinc-900 text-slate-400">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* NAVBAR */}
        <header className="h-16 bg-zinc-950 text-white flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
          <div className="flex items-center flex-1">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search reviews, branches, staff..." className="w-full bg-zinc-900 text-sm text-white rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary placeholder-slate-400 border border-zinc-800" />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <button onClick={() => setNotifsOpen(!notifsOpen)} className="relative p-1 hover:text-primary transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-zinc-950">3</span>
              </button>
              {notifsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-card rounded-2xl shadow-lg border border-border py-2 z-50 text-slate-800">
                  <div className="px-4 py-2 border-b border-border font-semibold text-sm">Notifications</div>
                  <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer text-sm"><span className="font-medium">New escalation:</span> Dombivli branch <span className="text-xs text-slate-500 block">2m ago</span></div>
                  <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer text-sm"><span className="font-medium">Negative review spike:</span> 4 reviews in 1h <span className="text-xs text-slate-500 block">15m ago</span></div>
                  <div className="px-4 py-3 hover:bg-slate-50 cursor-pointer text-sm"><span className="font-medium">Weekly report ready</span> <span className="text-xs text-slate-500 block">1h ago</span></div>
                </div>
              )}
            </div>
            <div className="relative">
              <select value={branch} onChange={e => setBranch(e.target.value)} className="appearance-none bg-zinc-900 text-sm text-white rounded-2xl pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer border border-zinc-800">
                {branches.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <div onClick={() => setProfileOpen(!profileOpen)} className="flex items-center space-x-3 cursor-pointer hover:opacity-80">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">PM</div>
                <div className="hidden md:block text-sm">
                  <div className="font-medium leading-tight">Priya Mehta</div>
                  <div className="text-slate-400 text-xs">Regional Manager</div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-2xl shadow-lg border border-border py-2 z-50 text-slate-800">
                  <div className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm">Profile Settings</div>
                  <div className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm text-red-600">Sign Out</div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
