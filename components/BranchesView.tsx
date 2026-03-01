'use client';
import React, { useState } from 'react';
import { Star, MapPin, QrCode, Download, ChevronRight, Edit2 } from 'lucide-react';
import { branchHealthData } from '@/lib/mockData';

export default function BranchesView({ setActiveView }: any) {
  const [selectedBranch, setSelectedBranch] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-slate-500 mb-2">
        <button onClick={() => setActiveView('Dashboard')} className="hover:text-primary transition-colors">Dashboard</button>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-medium">Branches</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Branch Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage locations, QR codes, and branch-specific settings</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 shadow-sm transition-all">
          + Add New Branch
        </button>
      </div>

      {!selectedBranch ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {branchHealthData.map((b, i) => (
            <div key={i} className="bg-card rounded-2xl shadow-sm border border-border p-5 hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{b.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center mt-1"><MapPin className="w-3 h-3 mr-1" /> Mumbai, MH</p>
                </div>
                <div className="w-10 h-5 bg-green-500 rounded-full flex items-center p-0.5 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm transform translate-x-5"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Avg Rating</div>
                  <div className="text-lg font-bold flex items-center">{b.score} <Star className="w-4 h-4 text-yellow-500 fill-current ml-1" /></div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Reviews</div>
                  <div className="text-lg font-bold">{b.today * 10}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Response Rate</div>
                  <div className="text-lg font-bold">{Math.round((b.responded / b.today) * 100)}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Escalations</div>
                  <div className="text-lg font-bold text-red-600">{b.pending}</div>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
                <div className="flex items-center text-xs text-primary font-medium cursor-pointer hover:underline">
                  <QrCode className="w-4 h-4 mr-1" /> Download QR
                </div>
                <button onClick={() => setSelectedBranch(b)} className="text-xs font-medium px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center">
              <button onClick={() => setSelectedBranch(null)} className="mr-4 p-2 hover:bg-slate-200 rounded-full transition-colors">
                <ChevronRight className="w-5 h-5 text-slate-600 transform rotate-180" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{selectedBranch.name}</h2>
                <p className="text-sm text-slate-500 flex items-center mt-1"><MapPin className="w-4 h-4 mr-1" /> 123 Main St, Mumbai, MH 400001</p>
              </div>
            </div>
            <button className="flex items-center px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm transition-all">
              <Edit2 className="w-4 h-4 mr-2" /> Edit Info
            </button>
          </div>
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-border">
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Overall Rating</div>
                  <div className="text-2xl font-bold flex items-center">{selectedBranch.score} <Star className="w-5 h-5 text-yellow-500 fill-current ml-1" /></div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-border">
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Total Reviews</div>
                  <div className="text-2xl font-bold">{selectedBranch.today * 10}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-border">
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Response Rate</div>
                  <div className="text-2xl font-bold">{Math.round((selectedBranch.responded / selectedBranch.today) * 100)}%</div>
                </div>
                <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                  <div className="text-xs text-red-500 uppercase tracking-wider font-bold mb-1">Open Escalations</div>
                  <div className="text-2xl font-bold text-red-600">{selectedBranch.pending}</div>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-xl border border-border p-6">
                <h3 className="text-lg font-bold mb-4">QR Code Management</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-24 h-24 bg-white border border-border rounded-xl p-2 flex items-center justify-center shadow-sm">
                      <QrCode className="w-16 h-16 text-slate-800" />
                    </div>
                    <div className="ml-6">
                      <h4 className="font-bold text-slate-900">Table Tent QR Code</h4>
                      <p className="text-sm text-slate-500 mt-1 mb-3">Last scanned: 2 hours ago</p>
                      <div className="flex space-x-3">
                        <button className="text-xs font-medium px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center">
                          <Download className="w-3 h-3 mr-1" /> Download PNG
                        </button>
                        <button className="text-xs font-medium px-3 py-1.5 bg-card text-slate-700 border border-border rounded-lg hover:bg-slate-100 transition-colors">
                          Print PDF
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-900">312</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Scans this month</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-slate-50 rounded-xl border border-border p-6">
                <h3 className="text-lg font-bold mb-4">Branch Manager</h3>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mr-4 shadow-sm">PM</div>
                  <div>
                    <h4 className="font-bold text-slate-900">Priya Mehta</h4>
                    <p className="text-sm text-slate-500">priya.m@dinemetrics.com</p>
                    <p className="text-sm text-slate-500">+91 98765 43210</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-xl border border-border p-6">
                <h3 className="text-lg font-bold mb-4">Assigned Staff (12)</h3>
                <div className="space-y-3">
                  {['Amit D.', 'Sneha P.', 'Rahul K.'].map((staff, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold mr-3 text-slate-700">{staff[0]}</div>
                        <span className="text-sm font-medium text-slate-900">{staff}</span>
                      </div>
                      <span className="text-xs text-slate-500 bg-slate-200/50 px-2 py-1 rounded">{i === 0 ? 'Manager' : 'Server'}</span>
                    </div>
                  ))}
                  <button className="w-full mt-2 py-2 text-sm font-medium text-primary hover:text-primary/90 transition-colors">View All Staff</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
