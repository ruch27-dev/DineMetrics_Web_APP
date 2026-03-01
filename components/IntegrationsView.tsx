'use client';
import React, { useState } from 'react';
import { CheckCircle2, XCircle, Settings, Link as LinkIcon, Smartphone, Mail, MessageSquare } from 'lucide-react';

export default function IntegrationsView({ setActiveView }: any) {
  const [googleSync, setGoogleSync] = useState(true);
  const [whatsappSync, setWhatsappSync] = useState(true);
  const [smsSync, setSmsSync] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-slate-500 mb-2">
        <button onClick={() => setActiveView('Dashboard')} className="hover:text-primary transition-colors">Dashboard</button>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-medium">Integrations</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Integrations</h1>
          <p className="text-slate-500 text-sm mt-1">Connect your review sources and notification channels</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Connected Platforms</h2>
          
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-blue-600">G</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Google Business Profile</h3>
                  <p className="text-sm text-slate-500">prasadfooddivine@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center text-green-600 text-sm font-bold bg-green-50 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-4 h-4 mr-1" /> Connected
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-3 rounded-xl border border-border">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Last Synced</div>
                <div className="font-bold">3 mins ago</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-border">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Reviews Pulled</div>
                <div className="font-bold">284</div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="font-bold text-sm text-slate-900">Auto-sync</div>
                <div className="text-xs text-slate-500">Automatically fetch new reviews</div>
              </div>
              <div 
                onClick={() => setGoogleSync(!googleSync)}
                className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${googleSync ? 'bg-green-500' : 'bg-slate-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${googleSync ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="font-bold text-sm text-slate-900">Sync Frequency</div>
              <select className="text-sm border border-border rounded-lg px-3 py-1.5 bg-card outline-none focus:ring-2 focus:ring-primary">
                <option>Every 15 mins</option>
                <option>Every 1 hour</option>
                <option>Daily</option>
              </select>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-border">
              <button className="flex-1 text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Sync Now</button>
              <button className="flex-1 text-sm font-medium px-4 py-2 bg-card text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">Disconnect</button>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mr-4">
                  <span className="text-2xl font-bold text-red-600">Z</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Zomato</h3>
                  <p className="text-sm text-slate-500">prasadfooddivine@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center text-green-600 text-sm font-bold bg-green-50 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-4 h-4 mr-1" /> Connected
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-3 rounded-xl border border-border">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Last Synced</div>
                <div className="font-bold">22 mins ago</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-border">
                <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Reviews Pulled</div>
                <div className="font-bold">156</div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-border">
              <button className="flex-1 text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Sync Now</button>
              <button className="flex-1 text-sm font-medium px-4 py-2 bg-card text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">Disconnect</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Available Platforms</h2>
          
          <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-6 flex items-center justify-between opacity-70 hover:opacity-100 transition-opacity">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-green-700">T</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">TripAdvisor</h3>
                <p className="text-sm text-slate-500">Pull reviews and respond directly</p>
              </div>
            </div>
            <button className="text-sm font-medium px-4 py-2 bg-card text-slate-700 border border-border rounded-lg hover:bg-slate-100 transition-colors">Connect</button>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-6 flex items-center justify-between opacity-70 hover:opacity-100 transition-opacity">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mr-4">
                <span className="text-2xl font-bold text-orange-600">S</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">Swiggy</h3>
                <p className="text-sm text-slate-500">Pull reviews and respond directly</p>
              </div>
            </div>
            <button className="text-sm font-medium px-4 py-2 bg-card text-slate-700 border border-border rounded-lg hover:bg-slate-100 transition-colors">Connect</button>
          </div>

          <h2 className="text-lg font-bold text-slate-900 pt-4">Notification Channels</h2>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <MessageSquare className="w-6 h-6 text-green-500 mr-3" />
                <div>
                  <h3 className="font-bold text-slate-900">WhatsApp (via Twilio)</h3>
                  <p className="text-xs text-slate-500">+91 98765 43210</p>
                </div>
              </div>
              <div 
                onClick={() => setWhatsappSync(!whatsappSync)}
                className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${whatsappSync ? 'bg-green-500' : 'bg-slate-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${whatsappSync ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </div>
            <button className="w-full text-sm font-medium px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">Test Notification</button>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Smartphone className="w-6 h-6 text-blue-500 mr-3" />
                <div>
                  <h3 className="font-bold text-slate-900">SMS (via MSG91)</h3>
                  <p className="text-xs text-slate-500">Not configured</p>
                </div>
              </div>
              <div 
                onClick={() => setSmsSync(!smsSync)}
                className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors ${smsSync ? 'bg-green-500' : 'bg-slate-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${smsSync ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </div>
            </div>
            <button className="w-full text-sm font-medium px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">Configure Settings</button>
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-slate-500 mr-3" />
                <div>
                  <h3 className="font-bold text-slate-900">Email Notifications</h3>
                  <p className="text-xs text-slate-500">SMTP Configured</p>
                </div>
              </div>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Settings className="w-5 h-5 text-slate-500" /></button>
            </div>
            <button className="w-full text-sm font-medium px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">Test Email</button>
          </div>
        </div>
      </div>
    </div>
  );
}
