"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

type Campaign = {
  _id: string;
  name: string;
  type: string;
  status: "Active" | "Draft" | "Completed";
  sent: number;
  opened: string;
  clicked: string;
  audience: string;
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Draft">("All");
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // New Campaign Form State
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("Email");
  const [newAudience, setNewAudience] = useState("All Customers");
  const [newMessage, setNewMessage] = useState("");

  const getAuthInfo = () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const workspaceId = user?.workspaces?.[0] || "";
    return { token, workspaceId };
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://xiachat.onrender.com";

  useEffect(() => {
    const fetchCampaigns = async () => {
      const { token, workspaceId } = getAuthInfo();
      if (!workspaceId) return;

      try {
        const res = await fetch(`${API_URL}/api/campaigns/${workspaceId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setCampaigns(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch campaigns", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const filteredCampaigns = campaigns.filter(c => {
    if (activeTab === "All") return true;
    if (activeTab === "Active") return c.status === "Active" || c.status === "Completed";
    if (activeTab === "Draft") return c.status === "Draft";
    return true;
  });

  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    
    const { token, workspaceId } = getAuthInfo();
    if (!workspaceId) return toast.error("Workspace missing");

    try {
      const res = await fetch(`${API_URL}/api/campaigns`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          workspaceId,
          name: newName,
          type: newType,
          audience: newAudience,
          message: newMessage
        })
      });
      const data = await res.json();
      
      if (data.success) {
        setCampaigns([data.data, ...campaigns]);
        setIsCreating(false);
        setNewName("");
        setNewMessage("");
        setActiveTab("Draft");
        toast.success("Campaign created as Draft");
      } else {
        toast.error(data.error || "Failed to create campaign");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    }
  };

  const handlePublish = async (id: string) => {
    const { token, workspaceId } = getAuthInfo();
    
    try {
      const res = await fetch(`${API_URL}/api/campaigns/${id}/publish`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ workspaceId })
      });
      const data = await res.json();
      
      if (data.success) {
        setCampaigns(campaigns.map(c => 
          c._id === id ? { ...c, status: "Active" } : c
        ));
        toast.success("Campaign published!");
      } else {
        toast.error(data.error || "Failed to publish");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#09090B] relative">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-[rgba(255,255,255,0.08)] shrink-0">
        <div>
          <h1 className="text-lg font-bold text-[#FAFAFA] tracking-tight">Campaigns</h1>
          <p className="text-[11px] font-medium text-[#A1A1AA] mt-0.5">Automate and send messages to your users</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-[#4F46E5] text-white text-sm font-semibold rounded-lg hover:bg-[#4F46E5]-hover transition-colors shadow-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          New Campaign
        </button>
      </div>

      {/* Tabs & Stats */}
      <div className="p-4 sm:p-6 bg-transparent border-b border-[rgba(255,255,255,0.08)] flex flex-col gap-4 sm:gap-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[rgba(255,255,255,0.03)] p-4 rounded-xl border border-[rgba(255,255,255,0.08)] shadow-sm">
            <p className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-1">Total Sent (30d)</p>
            <h2 className="text-2xl font-bold text-[#FAFAFA]">16,543</h2>
            <p className="text-xs text-green-600 font-medium mt-1">↑ 12% from last month</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.03)] p-4 rounded-xl border border-[rgba(255,255,255,0.08)] shadow-sm">
            <p className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-1">Avg. Open Rate</p>
            <h2 className="text-2xl font-bold text-[#FAFAFA]">42.8%</h2>
            <p className="text-xs text-green-600 font-medium mt-1">↑ 3.2% from last month</p>
          </div>
          <div className="bg-[rgba(255,255,255,0.03)] p-4 rounded-xl border border-[rgba(255,255,255,0.08)] shadow-sm">
            <p className="text-xs font-semibold text-[#A1A1AA] uppercase tracking-wider mb-1">Active Campaigns</p>
            <h2 className="text-2xl font-bold text-[#FAFAFA]">{campaigns.filter(c => c.status === "Active").length}</h2>
            <p className="text-xs text-[#A1A1AA] font-medium mt-1">Currently running</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-[rgba(255,255,255,0.08)] pb-px">
          {["All", "Active", "Draft"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-3 text-sm font-semibold transition-colors relative ${
                activeTab === tab ? "text-[#4F46E5]" : "text-[#A1A1AA] hover:text-[#FAFAFA]"
              }`}
            >
              {tab} Campaigns
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4F46E5] rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[rgba(255,255,255,0.03)]">
        <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-full md:min-w-[800px]">
              <thead>
                <tr className="bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.08)] text-xs uppercase tracking-wider text-[#A1A1AA] font-semibold">
                  <th className="px-6 py-4">Campaign Name</th>
                  <th className="px-6 py-4 hidden sm:table-cell">Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 hidden md:table-cell">Audience</th>
                  <th className="px-6 py-4 hidden sm:table-cell">Sent</th>
                  <th className="px-6 py-4 hidden lg:table-cell">Opened</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.04)] text-sm">
              {filteredCampaigns.map((c) => (
                <tr key={c._id} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors group">
                  <td className="px-6 py-4 font-semibold text-[#FAFAFA]">{c.name}</td>
                  <td className="px-6 py-4 text-[#A1A1AA] hidden sm:table-cell">
                    <span className="flex items-center gap-1.5">
                      {c.type === "Email" && <svg className="w-4 h-4 text-[#A1A1AA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>}
                      {c.type === "In-App Popup" && <svg className="w-4 h-4 text-[#A1A1AA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>}
                      {c.type === "Automated Message" && <svg className="w-4 h-4 text-[#A1A1AA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>}
                      {c.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                      c.status === 'Active' ? 'bg-[rgba(34,197,94,0.15)] text-green-400' : 
                      c.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' : 'bg-[rgba(59,130,246,0.15)] text-blue-400'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#A1A1AA] font-medium hidden md:table-cell">{c.audience}</td>
                  <td className="px-6 py-4 font-mono text-[#A1A1AA] hidden sm:table-cell">{c.sent.toLocaleString()}</td>
                  <td className="px-6 py-4 font-mono text-[#A1A1AA] hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      {c.opened}
                      {c.opened !== "-" && (
                        <div className="w-12 h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                          <div className="h-full bg-[#4F46E5]" style={{ width: c.opened }} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {c.status === "Draft" ? (
                      <button 
                        onClick={() => handlePublish(c._id)}
                        className="opacity-0 group-hover:opacity-100 px-3 py-1.5 bg-[#4F46E5]/10 text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white transition-all text-xs font-bold rounded-lg"
                      >
                        Publish Now
                      </button>
                    ) : (
                      <button className="opacity-0 group-hover:opacity-100 p-2 text-[#A1A1AA] hover:text-[#4F46E5] transition-all">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredCampaigns.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#A1A1AA]">
                    No campaigns found in this tab.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* Create Modal Overlay */}
      {isCreating && (
        <div className="absolute inset-0 bg-[#09090B]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-[rgba(255,255,255,0.03)] rounded-2xl shadow-xl w-full max-w-md max-h-[90dvh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 sm:p-6 border-b border-[rgba(255,255,255,0.06)] flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold text-[#FAFAFA]">Create New Campaign</h2>
              <button onClick={() => setIsCreating(false)} className="text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors p-1">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleCreateCampaign} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto">
              <div>
                <label className="block text-sm font-semibold text-[#FAFAFA] mb-1.5">Campaign Name</label>
                <input 
                  type="text" 
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g. Summer Sale 2024" 
                  className="w-full px-4 h-11 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-lg text-sm text-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] transition-all shadow-sm"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#FAFAFA] mb-1.5">Campaign Type</label>
                <select style={{colorScheme:"dark"}} 
                  value={newType}
                  onChange={e => setNewType(e.target.value)}
                  className="w-full px-4 h-11 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-lg text-sm text-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] transition-all shadow-sm"
                >
                  <option>Email</option>
                  <option>In-App Popup</option>
                  <option>Automated Message</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#FAFAFA] mb-1.5">Target Audience</label>
                <select style={{colorScheme:"dark"}} 
                  value={newAudience}
                  onChange={e => setNewAudience(e.target.value)}
                  className="w-full px-4 h-11 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-lg text-sm text-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] transition-all shadow-sm"
                >
                  <option>All Customers</option>
                  <option>New Signups (Last 7 days)</option>
                  <option>Idle &gt; 30 days</option>
                  <option>Pro Users</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#FAFAFA] mb-1.5">Message / Content</label>
                <textarea 
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder="Enter your campaign message here..." 
                  className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-lg text-sm text-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] transition-all shadow-sm min-h-[100px]"
                  required
                />
              </div>

              </div>
              <div className="p-4 sm:p-6 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] flex gap-3 shrink-0">
                <button type="button" onClick={() => setIsCreating(false)} className="flex-1 px-4 h-11 border border-[rgba(255,255,255,0.08)] text-[#E4E4E7] text-sm font-semibold rounded-lg hover:bg-[rgba(255,255,255,0.04)] transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={!newName.trim()} className="flex-1 px-4 h-11 bg-[#4F46E5] text-white text-sm font-semibold rounded-lg hover:bg-[#4F46E5]-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                  Save as Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

