"use client";

import React, { useState, useEffect } from "react";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>({
    totalConversations: 0,
    totalReplies: 0,
    chartData: [0, 0, 0, 0, 0, 0, 0]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const user = JSON.parse(storedUser);
    const workspaceId = user.workspaces?.[0] || "";
    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://xiachat.onrender.com"}/api/analytics/${workspaceId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAnalytics(data.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#09090B] overflow-y-auto">
      <div className="h-16 flex items-center px-6 border-b border-[rgba(255,255,255,0.08)] shrink-0 bg-[#09090B]/80 backdrop-blur-xl">
        <h1 className="text-lg font-bold text-[#FAFAFA] tracking-tight">Analytics</h1>
        {loading && <span className="ml-4 text-sm text-[#A1A1AA]">Loading data...</span>}
      </div>

      <div className="p-4 sm:p-6">
        {/* Date Filter */}
        <div className="flex justify-end mb-6">
          <select style={{colorScheme:"dark"}} className="px-4 py-2 border border-[rgba(255,255,255,0.08)] rounded-lg text-sm text-[#FAFAFA] bg-[rgba(255,255,255,0.03)] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This month</option>
            <option>Last month</option>
          </select>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="p-4 sm:p-6 border border-[rgba(255,255,255,0.08)] rounded-2xl bg-[rgba(255,255,255,0.03)] shadow-sm">
            <p className="text-sm font-medium text-[#A1A1AA] mb-2">Total Conversations</p>
            <div className="flex items-end gap-3">
              <p className="text-4xl font-bold text-[#FAFAFA] tracking-tight">{analytics.totalConversations}</p>
              <p className="text-sm font-semibold text-green-400 pb-1">+12%</p>
            </div>
          </div>
          <div className="p-4 sm:p-6 border border-[rgba(255,255,255,0.08)] rounded-2xl bg-[rgba(255,255,255,0.03)] shadow-sm">
            <p className="text-sm font-medium text-[#A1A1AA] mb-2">Messages Sent</p>
            <div className="flex items-end gap-3">
              <p className="text-4xl font-bold text-[#FAFAFA] tracking-tight">{analytics.totalReplies}</p>
              <p className="text-sm font-semibold text-green-400 pb-1">+8%</p>
            </div>
          </div>
          <div className="p-4 sm:p-6 border border-[rgba(255,255,255,0.08)] rounded-2xl bg-[rgba(255,255,255,0.03)] shadow-sm">
            <p className="text-sm font-medium text-[#A1A1AA] mb-2">Resolution Rate</p>
            <div className="flex items-end gap-3">
              <p className="text-4xl font-bold text-[#FAFAFA] tracking-tight">94%</p>
              <p className="text-sm font-semibold text-green-400 pb-1">+2%</p>
            </div>
          </div>
          <div className="p-4 sm:p-6 border border-[rgba(255,255,255,0.08)] rounded-2xl bg-[rgba(255,255,255,0.03)] shadow-sm">
            <p className="text-sm font-medium text-[#A1A1AA] mb-2">CSAT Score</p>
            <div className="flex items-end gap-3">
              <p className="text-4xl font-bold text-[#FAFAFA] tracking-tight">4.8</p>
              <p className="text-sm font-semibold text-[#A1A1AA] pb-1">/ 5</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 bg-[rgba(255,255,255,0.03)] shadow-sm">
            <h3 className="text-base font-bold text-[#FAFAFA] mb-6">Conversations over time</h3>
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {analytics.chartData.map((h: number, i: number) => {
                const maxH = Math.max(...analytics.chartData, 10);
                const percent = (h / maxH) * 100;
                return (
                  <div key={i} className="w-full bg-[#4F46E5]/20 rounded-t-sm hover:bg-[#4F46E5] transition-colors relative group" style={{ height: `${Math.max(percent, 5)}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#FAFAFA] text-[#09090B] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                      {h}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-4 text-xs font-semibold text-[#A1A1AA] uppercase">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          <div className="border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 bg-[rgba(255,255,255,0.03)] shadow-sm">
            <h3 className="text-base font-bold text-[#FAFAFA] mb-6">Busiest Hours</h3>
            <div className="h-64 bg-[rgba(255,255,255,0.02)] rounded-xl flex items-center justify-center border border-[rgba(255,255,255,0.05)]">
               <p className="text-sm font-semibold text-[#A1A1AA]">Heatmap visualization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

