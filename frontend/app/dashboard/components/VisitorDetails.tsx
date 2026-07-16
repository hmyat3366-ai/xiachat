import React from "react";
import { toast } from "react-hot-toast";

export const VisitorDetails = ({ conversation }: { conversation: any }) => {
  return (
    <div className="w-72 border-l border-[rgba(255,255,255,0.08)] bg-[#09090B] flex flex-col overflow-y-auto hidden lg:flex shrink-0">
      {/* Profile Card */}
      <div className="p-6 border-b border-[rgba(255,255,255,0.08)] text-center bg-[#09090B]/80 backdrop-blur-xl">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#4F46E5] to-[#818CF8] mx-auto flex items-center justify-center text-white font-semibold text-2xl mb-3 shadow-[0_8px_24px_rgba(79,70,229,0.4)] ring-4 ring-[#09090B] border border-[rgba(255,255,255,0.1)]">
          {conversation?.visitorId?.name?.charAt(0).toUpperCase() || "S"}
        </div>
        <h2 className="text-[15px] font-semibold text-[#FAFAFA] tracking-tight">{conversation?.visitorId?.name || "Anonymous"}</h2>
        <p className="text-xs text-[#A1A1AA] mb-4">{conversation?.visitorId?.email || "No email provided"}</p>
        <div className="flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider">Online</span>
        </div>
      </div>

      {/* Details Accordions/Sections */}
      <div className="p-5 space-y-6">
        
        {/* Magic Browse Action */}
        <div>
          <button 
            onClick={() => toast("Magic Browse is an Enterprise feature (Coming soon!)", { icon: "✨" })}
            className="w-full flex items-center justify-center gap-2 py-2 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] shadow-sm text-[#FAFAFA] text-[13px] font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50">
            <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Start Magic Browse
          </button>
          <p className="text-[10px] text-[#A1A1AA] font-medium text-center mt-2">View user&apos;s screen in real-time</p>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-3">Location</h3>
          <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.02)] p-3 rounded-xl border border-[rgba(255,255,255,0.05)]">
            <span className="text-lg">🌐</span>
            <div>
              <p className="text-[13px] font-semibold text-[#FAFAFA]">{conversation?.visitorId?.location || "Unknown Location"}</p>
              <p className="text-[11px] font-medium text-[#A1A1AA]">IP: {conversation?.visitorId?.ipAddress || "Unknown"}</p>
            </div>
          </div>
        </div>

        {/* Browser / Tech */}
        <div>
          <h3 className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-3">Technology</h3>
          <div className="space-y-2.5 bg-[rgba(255,255,255,0.02)] p-3 rounded-xl border border-[rgba(255,255,255,0.05)] shadow-sm">
            <div className="flex justify-between items-center text-[12px]">
              <span className="text-[#A1A1AA] font-medium">Browser</span>
              <span className="font-semibold text-[#FAFAFA]">{conversation?.visitorId?.browser || "Unknown"}</span>
            </div>
            <div className="flex justify-between items-center text-[12px]">
              <span className="text-[#A1A1AA] font-medium">OS</span>
              <span className="font-semibold text-[#FAFAFA]">{conversation?.visitorId?.os || "Unknown"}</span>
            </div>
            <div className="flex justify-between items-center text-[12px]">
              <span className="text-[#A1A1AA] font-medium">IP Address</span>
              <span className="font-mono text-[11px] text-[#E4E4E7] font-medium">{conversation?.visitorId?.ipAddress || "Unknown"}</span>
            </div>
          </div>
        </div>

        {/* Current Page */}
        <div>
          <h3 className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-3">Current Page</h3>
          <a href={conversation?.visitorId?.currentPage || "#"} target="_blank" rel="noreferrer" className="text-[12px] font-medium text-[#4F46E5] hover:text-[#818CF8] hover:underline break-all block leading-relaxed bg-[rgba(79,70,229,0.1)] p-3 rounded-xl border border-[rgba(79,70,229,0.2)] transition-colors">
            {conversation?.visitorId?.currentPage || "Unknown"}
          </a>
        </div>

        {/* Activity History */}
        <div>
          <h3 className="text-[10px] font-bold text-[#A1A1AA] uppercase tracking-wider mb-3">Recent Activity</h3>
          <div className="relative pl-4 border-l border-[rgba(255,255,255,0.1)] space-y-4 ml-1">
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#4F46E5] ring-4 ring-[#09090B] shadow-[0_0_8px_rgba(79,70,229,0.8)]" />
              <p className="text-[13px] font-semibold text-[#FAFAFA]">Started Chat</p>
              <p className="text-[11px] font-medium text-[#A1A1AA] mt-0.5">
                {conversation?.createdAt ? new Date(conversation.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Recently"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
