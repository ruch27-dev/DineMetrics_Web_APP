'use client';
import React, { useState } from 'react';
import { Building2, Users, Bell, Shield, CreditCard, Upload } from 'lucide-react';

export default function SettingsView({ setActiveView }: any) {
  const [activeTab, setActiveTab] = useState('Organization');

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center text-sm text-slate-500 mb-2">
        <button onClick={() => setActiveView('Dashboard')} className="hover:text-primary transition-colors">Dashboard</button>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-medium">Settings</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your organization, team, and preferences</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">
        {/* Left Sidebar Tabs */}
        <div className="w-full lg:w-64 shrink-0 bg-card rounded-2xl shadow-sm border border-border p-4 h-fit space-y-1">
          {[
            { id: 'Organization', icon: Building2 },
            { id: 'Team', icon: Users },
            { id: 'Notifications', icon: Bell },
            { id: 'Security', icon: Shield },
            { id: 'Billing', icon: CreditCard },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <tab.icon className={`w-5 h-5 mr-3 ${activeTab === tab.id ? 'text-primary' : 'text-slate-400'}`} />
              {tab.id}
            </button>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 bg-card rounded-2xl shadow-sm border border-border overflow-y-auto">
          <div className="p-6 border-b border-border bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-900">{activeTab} Settings</h2>
          </div>
          
          <div className="p-6 space-y-8">
            {activeTab === 'Organization' && (
              <>
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-200 transition-colors">
                    <Upload className="w-6 h-6 mb-1" />
                    <span className="text-xs font-medium">Upload Logo</span>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Organization Name</label>
                      <input type="text" defaultValue="Prasad Food Divine" className="w-full max-w-md bg-card text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary border border-border shadow-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 max-w-md">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Default Language</label>
                        <select className="w-full text-sm border border-border rounded-lg px-4 py-2 bg-card outline-none focus:ring-2 focus:ring-primary shadow-sm">
                          <option>English (US)</option>
                          <option>Hindi</option>
                          <option>Marathi</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Timezone</label>
                        <select className="w-full text-sm border border-border rounded-lg px-4 py-2 bg-card outline-none focus:ring-2 focus:ring-primary shadow-sm">
                          <option>Asia/Kolkata (IST)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="text-md font-bold text-slate-900 mb-4">Review Collection Settings</h3>
                  <div className="space-y-4 max-w-2xl">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-border">
                      <div>
                        <div className="font-bold text-sm text-slate-900">Auto-categorization</div>
                        <div className="text-xs text-slate-500">Automatically tag reviews with categories (Food, Service, etc.)</div>
                      </div>
                      <div className="w-12 h-6 rounded-full bg-green-500 flex items-center p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full shadow-sm transform translate-x-6"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-border">
                      <div>
                        <div className="font-bold text-sm text-slate-900">Sentiment Analysis</div>
                        <div className="text-xs text-slate-500">Use AI to determine if a review is Positive, Neutral, or Negative</div>
                      </div>
                      <div className="w-12 h-6 rounded-full bg-green-500 flex items-center p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full shadow-sm transform translate-x-6"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-border">
                      <div>
                        <div className="font-bold text-sm text-slate-900">Review Gating Threshold</div>
                        <div className="text-xs text-slate-500">Do not redirect to public review sites if internal rating is ≤ X</div>
                      </div>
                      <select className="text-sm border border-border rounded-lg px-3 py-1.5 bg-card outline-none focus:ring-2 focus:ring-primary">
                        <option>3 Stars</option>
                        <option>4 Stars</option>
                        <option>Off</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-border">
                      <div>
                        <div className="font-bold text-sm text-slate-900">Default Response SLA</div>
                        <div className="text-xs text-slate-500">Target time to respond to new reviews</div>
                      </div>
                      <select className="text-sm border border-border rounded-lg px-3 py-1.5 bg-card outline-none focus:ring-2 focus:ring-primary">
                        <option>24 Hours</option>
                        <option>48 Hours</option>
                        <option>72 Hours</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 flex justify-end">
                  <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">Save Changes</button>
                </div>
              </>
            )}

            {activeTab !== 'Organization' && (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <h2 className="text-xl font-bold text-slate-800 mb-2">{activeTab} Settings - Coming Soon</h2>
                <p className="text-slate-500">This configuration module is currently under development.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
