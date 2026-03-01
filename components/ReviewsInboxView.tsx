'use client';
import React, { useState, useMemo } from 'react';
import { Star, Filter, Search, Sparkles, ChevronDown } from 'lucide-react';
import { reviewsData, branches } from '@/lib/mockData';

export default function ReviewsInboxView({ setActiveView }: any) {
  const [reviewsTab, setReviewsTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedSentiments, setSelectedSentiments] = useState<string[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const filteredReviews = useMemo(() => {
    let r = reviewsData;
    if (searchQuery) r = r.filter(x => x.text.toLowerCase().includes(searchQuery.toLowerCase()) || x.name.toLowerCase().includes(searchQuery.toLowerCase()));
    if (reviewsTab !== 'All') {
      if (reviewsTab === 'Internal') r = r.filter(x => x.source === 'Internal');
      else r = r.filter(x => x.source === reviewsTab);
    }
    if (selectedBranches.length > 0) r = r.filter(x => selectedBranches.includes(x.branch));
    if (selectedSources.length > 0) r = r.filter(x => selectedSources.includes(x.source));
    if (selectedSentiments.length > 0) r = r.filter(x => selectedSentiments.includes(x.sentiment));
    return r;
  }, [searchQuery, reviewsTab, selectedBranches, selectedSources, selectedSentiments]);

  const toggleFilter = (setFn: any, val: string) => {
    setFn((prev: string[]) => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center text-sm text-slate-500 mb-2">
        <button onClick={() => setActiveView('Dashboard')} className="hover:text-primary transition-colors">Dashboard</button>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-medium">Reviews Inbox</span>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reviews Inbox</h1>
          <p className="text-slate-500 text-sm mt-1">Manage and respond to all customer feedback</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
        {/* Left Filter Panel */}
        <div className="w-full lg:w-72 shrink-0 bg-card rounded-2xl shadow-sm border border-border p-5 overflow-y-auto h-full space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search reviews..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 text-sm rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary border border-border" 
            />
          </div>

          <div>
            <h3 className="text-sm font-bold mb-3">Filter by Source</h3>
            <div className="space-y-2">
              {['Google', 'Zomato', 'Internal', 'TripAdvisor'].map(s => (
                <label key={s} className="flex items-center space-x-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={selectedSources.includes(s)} onChange={() => toggleFilter(setSelectedSources, s)} className="rounded text-primary focus:ring-primary" />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-3">Filter by Branch</h3>
            <div className="space-y-2">
              {branches.filter(b => b !== 'All Branches').map(b => (
                <label key={b} className="flex items-center space-x-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={selectedBranches.includes(b)} onChange={() => toggleFilter(setSelectedBranches, b)} className="rounded text-primary focus:ring-primary" />
                  <span>{b}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-3">Sentiment</h3>
            <div className="flex flex-wrap gap-2">
              {['Positive', 'Neutral', 'Negative'].map(s => (
                <button 
                  key={s} 
                  onClick={() => toggleFilter(setSelectedSentiments, s)}
                  className={`px-3 py-1 text-xs font-medium rounded-full border ${selectedSentiments.includes(s) ? 'bg-primary text-primary-foreground border-primary' : 'bg-slate-50 text-slate-600 border-border hover:bg-slate-100'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => { setSearchQuery(''); setSelectedBranches([]); setSelectedSources([]); setSelectedSentiments([]); }}
            className="w-full py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Clear All Filters
          </button>
        </div>

        {/* Right Review List */}
        <div className="flex-1 bg-card rounded-2xl shadow-sm border border-border flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border flex justify-between items-center bg-slate-50/50">
            <span className="text-sm font-medium text-slate-600">Showing {filteredReviews.length} reviews</span>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-500">Sort by:</span>
              <select className="text-sm border border-border rounded-lg px-3 py-1.5 bg-card outline-none focus:ring-2 focus:ring-primary">
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Rating: High to Low</option>
                <option>Rating: Low to High</option>
                <option>Unresponded First</option>
              </select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {filteredReviews.map(r => (
              <div key={r.id} className="p-5 rounded-2xl border border-border hover:border-slate-300 bg-card relative transition-colors">
                {r.escalated && <div className="absolute top-0 left-0 w-1 h-full bg-red-500 rounded-l-2xl"></div>}
                
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider ${r.source === 'Google' ? 'bg-primary/20 text-primary' : r.source === 'Internal' ? 'bg-primary/10 text-primary' : 'bg-orange-100 text-orange-700'}`}>{r.source}</span>
                    <span className="text-sm font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded">{r.branch}</span>
                    <span className="text-xs text-slate-400">{r.time}</span>
                    {r.escalated && <span className="text-xs font-bold px-2.5 py-1 rounded bg-red-100 text-red-700 uppercase">Escalated</span>}
                  </div>
                </div>

                <div className="flex justify-between items-baseline mb-3">
                  <span className="font-bold text-lg text-slate-900">{r.name}</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < r.rating ? 'fill-current' : 'text-slate-200'}`} />)}
                  </div>
                </div>

                <p className="text-base text-slate-700 mb-4 leading-relaxed">{r.text}</p>

                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${r.sentiment === 'Positive' ? 'bg-green-100 text-green-700' : r.sentiment === 'Negative' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>{r.sentiment}</span>
                  <div className="flex space-x-2">
                    {r.tags.map(t => <span key={t} className="text-xs text-slate-500 border border-border px-2 py-1 rounded-md bg-slate-50">[{t}]</span>)}
                  </div>
                  {r.staff && (
                    <div className="flex items-center text-sm text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-border">
                      <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold mr-2 text-slate-700">{r.staff[0]}</div>
                      {r.staff}
                    </div>
                  )}
                </div>

                {replyingTo === r.id ? (
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-border space-y-3">
                    <div className="flex justify-between items-center">
                      <select className="text-sm border border-border rounded-lg px-3 py-1.5 bg-card outline-none w-64">
                        <option>Select a template...</option>
                        <option>Positive - Heartfelt Thanks</option>
                        <option>Negative - Sincere Apology</option>
                      </select>
                      <button className="flex items-center text-sm font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors">
                        <Sparkles className="w-4 h-4 mr-1" /> AI Suggest
                      </button>
                    </div>
                    <textarea 
                      className="w-full h-24 p-3 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none bg-card"
                      placeholder="Write your response here..."
                      defaultValue={`Hi ${r.name.split(' ')[0]}, thank you for your feedback...`}
                    ></textarea>
                    <div className="flex justify-between items-center">
                      <button onClick={() => setReplyingTo(null)} className="text-sm text-slate-500 hover:text-slate-700">Cancel</button>
                      <div className="flex space-x-2">
                        <button className="text-sm font-medium px-4 py-2 bg-card text-slate-700 border border-border rounded-lg hover:bg-slate-100 transition-colors">Save Draft</button>
                        <button className="text-sm font-medium px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Send Reply</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-border">
                    <button className="text-sm font-medium text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">Mark as Ignored</button>
                    {!r.escalated && <button className="text-sm font-medium text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">Escalate</button>}
                    <button onClick={() => setReplyingTo(r.id)} className="text-sm font-medium px-4 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Reply</button>
                  </div>
                )}
              </div>
            ))}
            {filteredReviews.length === 0 && (
              <div className="text-center text-slate-500 py-20 flex flex-col items-center">
                <Search className="w-12 h-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-1">No reviews found</h3>
                <p>Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
