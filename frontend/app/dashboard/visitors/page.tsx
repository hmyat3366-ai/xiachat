"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState<any[]>([]);
  const [notification, setNotification] = useState("");
  const router = useRouter();

  const fetchVisitors = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const user = JSON.parse(storedUser);
      const workspaceId = user.workspaces?.[0] || "";
      // FIX: Include auth token
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://xiachat.onrender.com"}/api/visitors/${workspaceId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      
      if (data.success) {
        const mapped = data.data.map((v: any) => ({
          id: v._id,
          ip: v.ipAddress || "Unknown IP",
          location: v.location || "Unknown Location",
          page: v.currentPage || "/",
          timeOnPage: new Date(v.lastActive || v.createdAt).toLocaleTimeString(),
          browser: `${v.browser || 'Unknown'} / ${v.os || 'Unknown'}`,
          status: (Date.now() - new Date(v.lastActive || v.createdAt).getTime()) < 5 * 60000 ? "active" : "idle"
        }));
        setVisitors(mapped);
      }
    } catch (err) {
      console.error("Failed to fetch visitors", err);
    }
  };

  useEffect(() => {
    fetchVisitors();
    const interval = setInterval(fetchVisitors, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStartChat = (visitorId: string) => {
    setNotification("Starting proactive chat with visitor...");
    setTimeout(() => {
      setNotification("");
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#09090B] relative">
      {/* Notification Toast */}
      {notification && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#18181B] text-[#FAFAFA] px-4 py-2 rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.5)] border border-[rgba(255,255,255,0.1)] text-sm font-medium z-50 animate-bounce">
          {notification}
        </div>
      )}

      <div className="h-16 flex items-center px-6 border-b border-[rgba(255,255,255,0.08)] shrink-0 bg-[#09090B]/80 backdrop-blur-xl">
        <h1 className="text-lg font-bold text-[#FAFAFA] tracking-tight">Active Visitors</h1>
        <div className="ml-4 flex items-center gap-2 px-2.5 py-1 bg-[rgba(34,197,94,0.1)] rounded-full border border-[rgba(34,197,94,0.2)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-bold text-green-400">{visitors.length} Online</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Map Visualization */}
          <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl shadow-sm p-6 mb-6">
            <h3 className="text-sm font-bold text-[#FAFAFA] mb-4">Live Global Traffic</h3>
            <div className="w-full h-64 bg-[rgba(79,70,229,0.05)] rounded-lg border border-[rgba(79,70,229,0.1)] flex items-center justify-center relative overflow-hidden">
              {/* Mock Map Background */}
              <svg className="absolute inset-0 w-full h-full text-[rgba(79,70,229,0.1)]" fill="currentColor" viewBox="0 0 1000 500">
                <path d="M 0 0 L 1000 0 L 1000 500 L 0 500 Z" fill="none" />
                {Array.from({ length: 150 }).map((_, i) => (
                  <circle key={i} cx={Math.random() * 1000} cy={Math.random() * 500} r="2" opacity="0.3" />
                ))}
              </svg>
              
              {/* Real-time moving ping */}
              <div className="absolute top-[40%] left-[20%]">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4F46E5] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#4F46E5]"></span>
                </span>
              </div>
              <div className="absolute top-[60%] left-[70%]">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4F46E5] opacity-75" style={{ animationDelay: '1s' }}></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4F46E5]"></span>
                </span>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-[rgba(79,70,229,0.3)] font-bold text-2xl tracking-widest uppercase">Real-Time Radar</p>
              </div>
            </div>
          </div>

          {/* Visitors Table */}
          <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[rgba(255,255,255,0.06)] flex justify-between items-center">
              <h3 className="text-sm font-bold text-[#FAFAFA]">Current Sessions</h3>
              <button onClick={fetchVisitors} className="text-xs font-semibold text-[#4F46E5] hover:underline">Refresh List</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-full md:min-w-[800px]">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.06)] text-xs uppercase tracking-wider text-[#A1A1AA] font-semibold">
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Location & IP</th>
                    <th className="px-6 py-4 hidden md:table-cell">Current Page</th>
                    <th className="px-6 py-4 hidden md:table-cell">Time on Page</th>
                    <th className="px-6 py-4 hidden md:table-cell">Browser / OS</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.04)] text-sm">
                  {visitors.map((v) => (
                    <tr key={v.id} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        {v.status === 'active' ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[rgba(34,197,94,0.15)] text-green-400 border border-[rgba(34,197,94,0.2)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[rgba(255,255,255,0.05)] text-[#A1A1AA] border border-[rgba(255,255,255,0.08)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A1A1AA]"></span>
                            Idle
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-[#FAFAFA]">{v.location}</div>
                        <div className="text-xs font-mono text-[#A1A1AA] mt-0.5">{v.ip}</div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <a href="#" className="text-[#4F46E5] hover:underline font-medium">{v.page}</a>
                      </td>
                      <td className="px-6 py-4 font-mono text-[#A1A1AA] hidden md:table-cell">{v.timeOnPage}</td>
                      <td className="px-6 py-4 text-[#A1A1AA] hidden md:table-cell">{v.browser}</td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => handleStartChat(v.id)}
                          className="opacity-100 md:opacity-0 group-hover:opacity-100 px-3 py-1.5 bg-[#4F46E5] text-white text-xs font-bold rounded-lg hover:bg-[#4338CA] transition-all shadow-[0_2px_8px_rgba(79,70,229,0.3)]"
                        >
                          Start Chat
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {visitors.length === 0 && (
              <div className="p-12 text-center text-[#A1A1AA] text-sm">
                No active visitors right now. Waiting for traffic...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
