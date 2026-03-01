'use client';
import React, { useState } from 'react';
import { Search, Sparkles, Edit2, Trash2, Copy, Plus } from 'lucide-react';

const defaultTemplates = [
  { id: 1, name: 'Positive - Heartfelt Thanks', sentiment: 'Positive', category: 'General', text: 'Hi {customer_name}, thank you so much for your wonderful review! We are thrilled to hear you had a great experience at our {branch_name} branch. We hope to see you again soon!', usage: 245 },
  { id: 2, name: 'Positive - Food Compliment', sentiment: 'Positive', category: 'Food', text: 'Hi {customer_name}, we are so glad you enjoyed the food! Our chefs work hard to ensure every dish is perfect. Thank you for the {rating}-star review!', usage: 182 },
  { id: 3, name: 'Neutral - We Hear You', sentiment: 'Neutral', category: 'General', text: 'Hi {customer_name}, thank you for your feedback. We appreciate you taking the time to share your experience. We will use this to improve our services.', usage: 89 },
  { id: 4, name: 'Neutral - Room for Improvement', sentiment: 'Neutral', category: 'Service', text: 'Hi {customer_name}, thank you for visiting. We aim for a 5-star experience and it looks like we fell short this time. We have shared your feedback with the {branch_name} team.', usage: 56 },
  { id: 5, name: 'Negative - Sincere Apology', sentiment: 'Negative', category: 'General', text: 'Hi {customer_name}, please accept our sincerest apologies for your experience. This is not the standard we strive for. We would love to make this right. Please contact us at support@dinemetrics.com.', usage: 120 },
  { id: 6, name: 'Negative - Food Quality Issue', sentiment: 'Negative', category: 'Food', text: 'Hi {customer_name}, we are very sorry to hear that the food did not meet your expectations. We take food quality very seriously and have addressed this with our kitchen team.', usage: 45 },
  { id: 7, name: 'Negative - Service Issue', sentiment: 'Negative', category: 'Service', text: 'Hi {customer_name}, we apologize for the slow service you experienced. We are currently training new staff and your feedback helps us identify areas for improvement.', usage: 67 },
  { id: 8, name: 'Negative - Escalation Acknowledgment', sentiment: 'Negative', category: 'General', text: 'Hi {customer_name}, we are extremely sorry for the unacceptable experience. A senior manager has been notified and will be reaching out to you directly to resolve this.', usage: 12 },
];

export default function ResponseTemplatesView({ setActiveView }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSentiment, setFilterSentiment] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTemplates = defaultTemplates.filter(t => {
    if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase()) && !t.text.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterSentiment !== 'All' && t.sentiment !== filterSentiment) return false;
    return true;
  });

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center text-sm text-slate-500 mb-2">
        <button onClick={() => setActiveView('Dashboard')} className="hover:text-primary transition-colors">Dashboard</button>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-medium">Response Templates</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Response Templates</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your library of canned responses and AI prompts</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 shadow-sm transition-all">
          <Plus className="w-4 h-4 mr-2" /> Create Template
        </button>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-border flex flex-col flex-1 overflow-hidden">
        <div className="p-6 border-b border-border bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search templates..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary border border-border shadow-sm" 
            />
          </div>
          <div className="flex space-x-2 w-full sm:w-auto">
            <select 
              value={filterSentiment}
              onChange={(e) => setFilterSentiment(e.target.value)}
              className="text-sm border border-border rounded-lg px-3 py-2 bg-card outline-none focus:ring-2 focus:ring-primary shadow-sm w-full sm:w-auto"
            >
              <option value="All">All Sentiments</option>
              <option value="Positive">Positive</option>
              <option value="Neutral">Neutral</option>
              <option value="Negative">Negative</option>
            </select>
            <select className="text-sm border border-border rounded-lg px-3 py-2 bg-card outline-none focus:ring-2 focus:ring-primary shadow-sm w-full sm:w-auto">
              <option>All Categories</option>
              <option>Food</option>
              <option>Service</option>
              <option>Ambience</option>
            </select>
          </div>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(t => (
              <div key={t.id} className="bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-slate-900 line-clamp-1" title={t.name}>{t.name}</h3>
                </div>
                <div className="flex space-x-2 mb-4">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${t.sentiment === 'Positive' ? 'bg-green-100 text-green-700' : t.sentiment === 'Negative' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>{t.sentiment}</span>
                  <span className="text-[10px] text-slate-500 border border-border px-2 py-1 rounded-md bg-slate-50">{t.category}</span>
                </div>
                <p className="text-sm text-slate-600 mb-4 line-clamp-4 flex-1 italic">&quot;{t.text}&quot;</p>
                <div className="flex justify-between items-center pt-4 border-t border-border mt-auto">
                  <span className="text-xs text-slate-500 font-medium">Used {t.usage} times</span>
                  <div className="flex space-x-1">
                    <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="Edit"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-md transition-colors" title="Duplicate"><Copy className="w-4 h-4" /></button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl shadow-xl border border-border w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900">Create Template</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">✕</button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Template Name</label>
                <input type="text" placeholder="e.g., Positive - Birthday Celebration" className="w-full bg-card text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary border border-border shadow-sm" />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Sentiment</label>
                  <select className="w-full text-sm border border-border rounded-lg px-4 py-2 bg-card outline-none focus:ring-2 focus:ring-primary shadow-sm">
                    <option>Positive</option>
                    <option>Neutral</option>
                    <option>Negative</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                  <select className="w-full text-sm border border-border rounded-lg px-4 py-2 bg-card outline-none focus:ring-2 focus:ring-primary shadow-sm">
                    <option>General</option>
                    <option>Food</option>
                    <option>Service</option>
                    <option>Ambience</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-slate-700">Template Text</label>
                  <button className="flex items-center text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors">
                    <Sparkles className="w-3 h-3 mr-1" /> Generate variations with AI
                  </button>
                </div>
                <div className="mb-2 flex flex-wrap gap-2">
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded border border-border cursor-pointer hover:bg-slate-200">{`{customer_name}`}</span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded border border-border cursor-pointer hover:bg-slate-200">{`{branch_name}`}</span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded border border-border cursor-pointer hover:bg-slate-200">{`{rating}`}</span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded border border-border cursor-pointer hover:bg-slate-200">{`{category}`}</span>
                </div>
                <textarea 
                  className="w-full h-32 p-3 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none bg-card shadow-sm"
                  placeholder="Type your template here..."
                ></textarea>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-border">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Preview</h4>
                <p className="text-sm text-slate-700 italic">&quot;Hi John Doe, thank you so much for your wonderful review! We are thrilled to hear you had a great experience at our Mulund branch. We hope to see you again soon!&quot;</p>
              </div>
            </div>

            <div className="p-6 border-t border-border bg-slate-50/50 flex justify-end space-x-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 bg-card border border-border rounded-lg hover:bg-slate-100 transition-colors">Cancel</button>
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors">Save Template</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
