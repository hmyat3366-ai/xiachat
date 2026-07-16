import React, { useState, useMemo } from "react";
import { ChannelIcon } from "./ChannelIcon";

interface Props {
  conversations: any[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string) => void;
}

export const ConversationList = ({ conversations, activeConversationId, setActiveConversationId }: Props) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"open" | "resolved">("open");

  const uniqueTabs = useMemo(() => {
    const tabs = new Map<string, { id: string; label: string; count: number }>();
    
    // Only count conversations for the current statusFilter
    const filteredByStatus = conversations.filter(c => 
      statusFilter === "open" ? c.status !== "resolved" : c.status === "resolved"
    );

    filteredByStatus.forEach(c => {
      let id = c.channel || 'web';
      let label = id.charAt(0).toUpperCase() + id.slice(1);
      
      if (id === 'web' && c.sourceUrl) {
        try {
          const urlStr = c.sourceUrl.startsWith('http') ? c.sourceUrl : `https://${c.sourceUrl}`;
          const url = new URL(urlStr);
          // Only show domain name
          id = `web-${url.hostname}`;
          label = `Web (${url.hostname})`;
        } catch (e) {
          id = `web-${c.sourceUrl}`;
          label = `Web (${c.sourceUrl})`;
        }
      }
      
      if (tabs.has(id)) {
        tabs.get(id)!.count += 1;
      } else {
        tabs.set(id, { id, label, count: 1 });
      }
    });
    
    return Array.from(tabs.values());
  }, [conversations, statusFilter]);

  const filteredConversations = useMemo(() => {
    return conversations.filter(c => {
      // status filter
      if (statusFilter === "open" && c.status === "resolved") return false;
      if (statusFilter === "resolved" && c.status !== "resolved") return false;

      // search filter
      if (searchQuery && !c.visitorId?.name?.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // tab filter
      if (activeTab === "all") return true;
      
      let id = c.channel || 'web';
      if (id === 'web' && c.sourceUrl) {
        try {
          const urlStr = c.sourceUrl.startsWith('http') ? c.sourceUrl : `https://${c.sourceUrl}`;
          const url = new URL(urlStr);
          id = `web-${url.hostname}`;
        } catch (e) {
          id = `web-${c.sourceUrl}`;
        }
      }
      return id === activeTab;
    });
  }, [conversations, activeTab, searchQuery, statusFilter]);

  return (
    <div className="w-full lg:w-[340px] border-r border-[rgba(255,255,255,0.08)] flex flex-col bg-[#09090B] shrink-0 z-10 h-full">
      <div className="h-16 flex items-center px-5 border-b border-[rgba(255,255,255,0.08)] bg-[#09090B]/80 backdrop-blur-xl shrink-0">
        <h1 className="text-[17px] font-semibold text-[#FAFAFA] tracking-tight">Inbox</h1>
        <span className="ml-2 px-2 py-0.5 bg-[rgba(255,255,255,0.06)] text-[#A1A1AA] text-[11px] font-bold rounded-full border border-[rgba(255,255,255,0.08)]">{conversations.length}</span>
      </div>
      
      {/* Search / Filter */}
      <div className="p-4 border-b border-[rgba(255,255,255,0.08)] bg-[#09090B] flex flex-col gap-3">
        <div className="relative group">
          <svg className="w-4 h-4 absolute left-3 top-2.5 text-[#A1A1AA] group-focus-within:text-[#4F46E5] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search conversations..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] shadow-inner rounded-md text-[13px] text-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] transition-all placeholder:text-[#A1A1AA]" 
          />
        </div>
        
        {/* Status Toggle (Open / Resolved) */}
        <div className="flex bg-[rgba(255,255,255,0.03)] p-[3px] rounded-md border border-[rgba(255,255,255,0.05)] shadow-inner">
          <button
            onClick={() => setStatusFilter("open")}
            className={`flex-1 text-[12px] font-semibold py-1.5 rounded-[4px] transition-all ${statusFilter === "open" ? 'bg-[#09090B] text-[#FAFAFA] shadow-[0_2px_8px_rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)]' : 'text-[#A1A1AA] hover:text-[#FAFAFA]'}`}
          >
            Open
          </button>
          <button
            onClick={() => setStatusFilter("resolved")}
            className={`flex-1 text-[12px] font-semibold py-1.5 rounded-[4px] transition-all ${statusFilter === "resolved" ? 'bg-[#09090B] text-[#FAFAFA] shadow-[0_2px_8px_rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)]' : 'text-[#A1A1AA] hover:text-[#FAFAFA]'}`}
          >
            Resolved
          </button>
        </div>

        {/* Tabs */}
        {uniqueTabs.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide pt-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-[4px] text-[11px] font-semibold whitespace-nowrap transition-colors border ${activeTab === 'all' ? 'bg-[#4F46E5] text-white border-[#4F46E5]' : 'bg-[rgba(255,255,255,0.03)] text-[#A1A1AA] border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)]'}`}
            >
              All
            </button>
            {uniqueTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 rounded-[4px] text-[11px] font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 border ${activeTab === tab.id ? 'bg-[#4F46E5]/20 text-[#4F46E5] border-[#4F46E5]/30' : 'bg-[rgba(255,255,255,0.03)] text-[#A1A1AA] border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)]'}`}
              >
                {tab.label}
                <span className={`px-1.5 py-0.5 rounded-[4px] text-[9px] ${activeTab === tab.id ? 'bg-[#4F46E5]/30 text-[#4F46E5]' : 'bg-[rgba(255,255,255,0.06)] text-[#A1A1AA]'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto bg-[#09090B]">
        {filteredConversations.length === 0 && (
          <div className="p-8 flex flex-col items-center justify-center text-center">
             <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-[#A1A1AA]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
             </div>
             <p className="text-[#A1A1AA] text-sm font-medium">No conversations found</p>
          </div>
        )}
        {filteredConversations.map((c) => (
          <div 
            key={c._id} 
            onClick={() => setActiveConversationId(c._id)}
            className={`group flex items-start gap-3 p-4 cursor-pointer border-b border-[rgba(255,255,255,0.04)] transition-all ${activeConversationId === c._id ? "bg-[rgba(255,255,255,0.06)] relative" : "hover:bg-[rgba(255,255,255,0.02)]"}`}
          >
            {activeConversationId === c._id && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#4F46E5] shadow-[0_0_12px_rgba(79,70,229,0.8)]" />}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-[13px] shrink-0 bg-gradient-to-tr from-[#4F46E5] to-[#818CF8] shadow-[0_4px_12px_rgba(79,70,229,0.3)] ring-1 ring-[rgba(255,255,255,0.1)]`}>
              {(c.visitorId?.name || "V").charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className={`text-[13px] font-semibold truncate pr-2 flex items-center gap-2 ${activeConversationId === c._id ? 'text-[#FAFAFA]' : 'text-[#E4E4E7]'}`}>
                  {c.visitorId?.name || "Anonymous"}
                  {c.unreadCount > 0 && activeConversationId !== c._id && (
                    <span className="w-2 h-2 rounded-full bg-[#4F46E5] inline-block shadow-[0_0_8px_rgba(79,70,229,0.8)]" />
                  )}
                </h3>
                <span className="text-[10px] font-semibold text-[#A1A1AA] shrink-0 uppercase tracking-wider">
                  {new Date(c.lastMessageAt || c.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
              <p className={`text-[12px] truncate mb-2 leading-tight ${activeConversationId === c._id ? "text-[#E4E4E7] font-medium" : "text-[#A1A1AA]"}`}>
                {c.status !== 'open' ? 'Resolved' : (() => {
                  if (c.lastMessage) return c.lastMessage;
                  const lastTime = c.lastMessageAt ? new Date(c.lastMessageAt).getTime() : 0;
                  const minutesAgo = (Date.now() - lastTime) / 60000;
                  if (minutesAgo < 2) return '🟢 Active now...';
                  if (minutesAgo < 30) return `Last reply ${Math.floor(minutesAgo)}m ago`;
                  return 'Idle — no recent activity';
                })()}
              </p>
              <div className="flex items-center gap-2">
                <div className="text-[#A1A1AA]">
                  <ChannelIcon type={c.channel || 'web'} sourceUrl={c.sourceUrl} />
                </div>
                {c.mode === 'ai' ? (
                  <span className="flex items-center justify-center bg-purple-500/20 border border-purple-500/30 text-purple-400 p-0.5 rounded-full" title="AI Handling">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                  </span>
                ) : (
                  <span className="flex items-center justify-center bg-blue-500/20 border border-blue-500/30 text-blue-400 p-0.5 rounded-full" title="Agent Handling">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
