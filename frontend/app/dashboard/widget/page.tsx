"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function WidgetCustomizationPage() {
  const [activeTab, setActiveTab] = useState("Appearance");
  
  const [config, setConfig] = useState({
    autoTheme: true,
    primaryColor: "#3B82F6",
    secondaryColor: "#1D4ED8",
    headerColor: "#3B82F6",
    visitorBubbleColor: "#3B82F6",
    agentBubbleColor: "#F3F4F6",
    aiBubbleColor: "#E0E7FF",
    backgroundColor: "#FFFFFF",
    textColor: "#111827",
    borderRadius: 24,
    glassBlur: 24,
    glassOpacity: 85,
    shadowIntensity: 15,
    animationSpeed: "normal",
    
    logo: "",
    agentAvatar: "",
    companyName: "Acme Corp",
    widgetTitle: "Support",
    welcomeMessage: "Hi there! How can we help you today?",
    offlineMessage: "We're currently offline. Please leave a message.",
    placeholderText: "Type your message...",
    
    bubblePosition: "Bottom Right",
    bubbleSize: 64,
    launcherIcon: "chat",
    unreadBadge: true,
    notificationSound: true,
    
    windowWidth: 380,
    windowHeight: 650,
    roundedCorners: true,
    showTimestamp: true,
    showTypingIndicator: true,
    showReadStatus: true,
    showAiBadge: true,
    showAgentAvatar: true,
    
    autoOpen: false,
    openDelay: 0,
    exitIntentPopup: false,
    desktopOnly: false,
    mobileOnly: false,
    darkMode: false,
    lightMode: false,
    autoDetectWebsiteTheme: true
  });

  const [workspaceId, setWorkspaceId] = useState("demo-workspace");

  useEffect(() => {
    let wsId = "demo-workspace";
    try {
      const u = JSON.parse(localStorage.getItem("user") || "{}");
      if (u.workspaces && u.workspaces[0]) {
        wsId = u.workspaces[0];
        setWorkspaceId(wsId);
      }
    } catch(e) {}

    // Load from DB instead of localStorage
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://xiachat.onrender.com"}/api/workspaces/${wsId}`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.widgetConfig) {
          // Merge with default config to ensure all keys exist
          setConfig(prev => ({ ...prev, ...data.data.widgetConfig }));
        }
      })
      .catch(err => console.error("Failed to load widget config", err));
  }, []);

  const handleChange = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const loadingToast = toast.loading("Saving widget settings...");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://xiachat.onrender.com"}/api/workspaces/${workspaceId}/widget`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ widgetConfig: config })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Widget settings saved successfully!", { id: loadingToast });
      } else {
        toast.error(data.error || "Failed to save settings.", { id: loadingToast });
      }
    } catch (err) {
      toast.error("An error occurred while saving.", { id: loadingToast });
    }
  };

  const tabs = [
    { id: "Appearance", icon: "🎨" },
    { id: "Branding", icon: "✨" },
    { id: "Launcher", icon: "🚀" },
    { id: "Chat Window", icon: "💬" },
    { id: "Behavior", icon: "⚙️" },
    { id: "Installation", icon: "💻" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Appearance":
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.08)]">
              <div>
                <h4 className="font-semibold text-gray-900">Auto Theme Detection</h4>
                <p className="text-sm text-[#A1A1AA]">Automatically match your website's colors and fonts.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={config.autoTheme} onChange={e => handleChange("autoTheme", e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-[rgba(255,255,255,0.1)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4F46E5]"></div>
              </label>
            </div>
            
            {!config.autoTheme && (
              <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                <div>
                  <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Primary Color</label>
                  <div className="flex gap-2">
                    <input type="color" value={config.primaryColor} onChange={e => handleChange("primaryColor", e.target.value)} className="w-10 h-10 rounded border-0 cursor-pointer" />
                    <input type="text" value={config.primaryColor} onChange={e => handleChange("primaryColor", e.target.value)} className="flex-1 border-[rgba(255,255,255,0.08)] rounded-lg text-sm px-3 bg-[rgba(255,255,255,0.03)] text-[#FAFAFA]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Background Color</label>
                  <div className="flex gap-2">
                    <input type="color" value={config.backgroundColor} onChange={e => handleChange("backgroundColor", e.target.value)} className="w-10 h-10 rounded border-0 cursor-pointer" />
                    <input type="text" value={config.backgroundColor} onChange={e => handleChange("backgroundColor", e.target.value)} className="flex-1 border-[rgba(255,255,255,0.08)] rounded-lg text-sm px-3 bg-[rgba(255,255,255,0.03)] text-[#FAFAFA]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Visitor Bubble</label>
                  <div className="flex gap-2">
                    <input type="color" value={config.visitorBubbleColor} onChange={e => handleChange("visitorBubbleColor", e.target.value)} className="w-10 h-10 rounded border-0 cursor-pointer" />
                    <input type="text" value={config.visitorBubbleColor} onChange={e => handleChange("visitorBubbleColor", e.target.value)} className="flex-1 border-[rgba(255,255,255,0.08)] rounded-lg text-sm px-3 bg-[rgba(255,255,255,0.03)] text-[#FAFAFA]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Agent Bubble</label>
                  <div className="flex gap-2">
                    <input type="color" value={config.agentBubbleColor} onChange={e => handleChange("agentBubbleColor", e.target.value)} className="w-10 h-10 rounded border-0 cursor-pointer" />
                    <input type="text" value={config.agentBubbleColor} onChange={e => handleChange("agentBubbleColor", e.target.value)} className="flex-1 border-[rgba(255,255,255,0.08)] rounded-lg text-sm px-3 bg-[rgba(255,255,255,0.03)] text-[#FAFAFA]" />
                  </div>
                </div>
              </div>
            )}

            <div className="border-t border-[rgba(255,255,255,0.08)] pt-6 space-y-4">
              <h4 className="font-semibold text-gray-900">Glassmorphism Settings</h4>
              <div>
                <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Glass Blur ({config.glassBlur}px)</label>
                <input type="range" min="0" max="40" value={config.glassBlur} onChange={e => handleChange("glassBlur", parseInt(e.target.value))} className="w-full accent-[#4F46E5]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Background Opacity ({config.glassOpacity}%)</label>
                <input type="range" min="10" max="100" value={config.glassOpacity} onChange={e => handleChange("glassOpacity", parseInt(e.target.value))} className="w-full accent-[#4F46E5]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Border Radius ({config.borderRadius}px)</label>
                <input type="range" min="0" max="32" value={config.borderRadius} onChange={e => handleChange("borderRadius", parseInt(e.target.value))} className="w-full accent-[#4F46E5]" />
              </div>
            </div>
          </div>
        );
      
      case "Branding":
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div>
              <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Company Name</label>
              <input type="text" value={config.companyName} onChange={e => handleChange("companyName", e.target.value)} className="w-full border-[rgba(255,255,255,0.08)] rounded-lg text-sm p-2.5 border outline-none focus:border-[#4F46E5] bg-[rgba(255,255,255,0.03)] text-[#FAFAFA]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Widget Title</label>
              <input type="text" value={config.widgetTitle} onChange={e => handleChange("widgetTitle", e.target.value)} className="w-full border-[rgba(255,255,255,0.08)] rounded-lg text-sm p-2.5 border outline-none focus:border-[#4F46E5] bg-[rgba(255,255,255,0.03)] text-[#FAFAFA]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Welcome Message</label>
              <textarea value={config.welcomeMessage} onChange={e => handleChange("welcomeMessage", e.target.value)} className="w-full border-[rgba(255,255,255,0.08)] rounded-lg text-sm p-2.5 border outline-none focus:border-[#4F46E5] bg-[rgba(255,255,255,0.03)] text-[#FAFAFA] min-h-[80px]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Input Placeholder</label>
              <input type="text" value={config.placeholderText} onChange={e => handleChange("placeholderText", e.target.value)} className="w-full border-[rgba(255,255,255,0.08)] rounded-lg text-sm p-2.5 border outline-none focus:border-[#4F46E5] bg-[rgba(255,255,255,0.03)] text-[#FAFAFA]" />
            </div>
          </div>
        );

      case "Launcher":
        return (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div>
              <label className="block text-sm font-medium text-[#A1A1AA] mb-2">Position</label>
              <div className="flex gap-4">
                {["Bottom Right", "Bottom Left"].map(pos => (
                  <label key={pos} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="pos" checked={config.bubblePosition === pos} onChange={() => handleChange("bubblePosition", pos)} className="text-accent focus:ring-accent" />
                    <span className="text-sm">{pos}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Launcher Size ({config.bubbleSize}px)</label>
              <input type="range" min="48" max="80" value={config.bubbleSize} onChange={e => handleChange("bubbleSize", parseInt(e.target.value))} className="w-full accent-[#4F46E5]" />
            </div>
            <div className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.08)] mt-2">
              <span className="text-sm font-medium text-[#A1A1AA]">Show Unread Badge</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={config.unreadBadge} onChange={e => handleChange("unreadBadge", e.target.checked)} className="sr-only peer" />
                <div className="w-9 h-5 bg-[rgba(255,255,255,0.1)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#4F46E5]"></div>
              </label>
            </div>
          </div>
        );

      case "Chat Window":
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Width ({config.windowWidth}px)</label>
                <input type="range" min="300" max="450" value={config.windowWidth} onChange={e => handleChange("windowWidth", parseInt(e.target.value))} className="w-full accent-[#4F46E5]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#A1A1AA] mb-1">Height ({config.windowHeight}px)</label>
                <input type="range" min="400" max="800" value={config.windowHeight} onChange={e => handleChange("windowHeight", parseInt(e.target.value))} className="w-full accent-[#4F46E5]" />
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              {[
                { id: "showTimestamp", label: "Show Message Timestamps" },
                { id: "showTypingIndicator", label: "Show Typing Indicator" },
                { id: "showAgentAvatar", label: "Show Agent Avatars" },
              ].map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.08)]">
                  <span className="text-sm font-medium text-[#A1A1AA]">{item.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={(config as any)[item.id]} onChange={e => handleChange(item.id, e.target.checked)} className="sr-only peer" />
                    <div className="w-9 h-5 bg-[rgba(255,255,255,0.1)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#4F46E5]"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case "Behavior":
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
             {[
                { id: "autoOpen", label: "Auto-open on page load" },
                { id: "exitIntentPopup", label: "Open on exit intent" },
                { id: "darkMode", label: "Force Dark Mode" },
              ].map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-[rgba(255,255,255,0.03)] rounded-xl border border-[rgba(255,255,255,0.08)]">
                  <span className="text-sm font-medium text-gray-900">{item.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={(config as any)[item.id]} onChange={e => handleChange(item.id, e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-[rgba(255,255,255,0.1)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4F46E5]"></div>
                  </label>
                </div>
              ))}
          </div>
        );

      case "Installation":
        return (
          <div className="space-y-4 animate-in fade-in duration-300">
            <p className="text-sm text-[#A1A1AA]">Copy this code and paste it right before the closing <code>&lt;/body&gt;</code> tag of your website.</p>
            <div className="relative">
              <pre className="bg-gray-900 text-gray-300 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
{`<script
  src="${process.env.NEXT_PUBLIC_API_URL || "https://xiachat.onrender.com"}/public/widget.js"
  data-workspace-id="${workspaceId}"${!config.autoTheme ? `\n  data-theme-color="${config.primaryColor}"` : ''}>
</script>`}
              </pre>
              <button 
                onClick={() => {
                  const code = `<script\n  src="${process.env.NEXT_PUBLIC_API_URL || "https://xiachat.onrender.com"}/public/widget.js"\n  data-workspace-id="${workspaceId}"${!config.autoTheme ? `\n  data-theme-color="${config.primaryColor}"` : ''}>\n</script>`;
                  navigator.clipboard.writeText(code);
                  toast.success("Copied to clipboard!");
                }}
                className="absolute top-3 right-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
              >
                Copy Code
              </button>
            </div>
            
            <div className="mt-6 border border-[rgba(255,255,255,0.08)] rounded-xl p-4 bg-[rgba(255,255,255,0.03)]">
              <h4 className="font-bold text-[#FAFAFA] mb-2 text-sm flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Installation Guide
              </h4>
              <ul className="text-sm text-[#A1A1AA] space-y-2 ml-7 list-disc">
                <li>No backend changes needed.</li>
                <li>Your widget will automatically adopt your customized settings from this dashboard.</li>
                <li>Works perfectly on Wordpress, Shopify, React, Next.js, and raw HTML.</li>
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full bg-[#09090B] animate-in fade-in duration-500 relative overflow-y-auto lg:overflow-hidden">
      {/* LEFT: Editor */}
      <div className="w-full lg:w-[450px] flex flex-col border-b lg:border-b-0 lg:border-r border-[rgba(255,255,255,0.08)] h-auto lg:h-[calc(100vh-64px)] overflow-y-auto shrink-0">
        <div className="p-6 border-b border-[rgba(255,255,255,0.08)] flex justify-between items-center sticky top-0 bg-[#09090B]/80 backdrop-blur-md z-10">
          <div>
            <h2 className="text-xl font-bold text-[#FAFAFA]">Widget Customization</h2>
            <p className="text-xs text-[#A1A1AA] mt-1">Design your premium chat experience.</p>
          </div>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-[#4F46E5] text-white text-sm font-bold rounded-lg hover:bg-[#4F46E5]-hover transition-colors shadow-sm"
          >
            Save Changes
          </button>
        </div>

        <div className="flex overflow-x-auto border-b border-[rgba(255,255,255,0.08)] px-2 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? 'border-[#4F46E5] text-[#4F46E5]' : 'border-transparent text-[#A1A1AA] hover:text-[#A1A1AA]'}`}
            >
              <span>{tab.icon}</span> {tab.id}
            </button>
          ))}
        </div>

        <div className="p-6 flex-1">
          {renderTabContent()}
        </div>
      </div>

      {/* RIGHT: Live Preview */}
      <div className="flex-1 bg-[#09090B]/50 flex items-center justify-center relative overflow-hidden min-h-[600px] lg:min-h-0 lg:h-[calc(100vh-64px)]">
        
        <div className="absolute top-6 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 text-sm font-semibold text-[#A1A1AA] z-10">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          Live Preview
        </div>

        {/* MOCK WEBSITE BACKGROUND */}
        <div className="absolute inset-0 bg-white" style={{ background: config.darkMode ? '#111827' : '#FFFFFF', transition: 'background 0.3s' }}>
          {/* Faux Website Content */}
          <div className="max-w-4xl mx-auto mt-32 p-8 opacity-20 pointer-events-none">
             <div className="h-8 w-48 rounded bg-gray-400 mb-8"></div>
             <div className="h-4 w-full rounded bg-gray-400 mb-4"></div>
             <div className="h-4 w-3/4 rounded bg-gray-400 mb-4"></div>
             <div className="h-4 w-5/6 rounded bg-gray-400 mb-12"></div>
             <div className="grid grid-cols-3 gap-8">
               <div className="h-32 rounded bg-gray-400"></div>
               <div className="h-32 rounded bg-gray-400"></div>
               <div className="h-32 rounded bg-gray-400"></div>
             </div>
          </div>
        </div>

        {/* LIVE WIDGET RENDER */}
        <div className="absolute" style={{
          [config.bubblePosition === 'Bottom Right' ? 'right' : 'left']: '40px',
          bottom: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: config.bubblePosition === 'Bottom Right' ? 'flex-end' : 'flex-start'
        }}>
          
          {/* Chat Window */}
          <div style={{
            width: `${config.windowWidth}px`,
            height: `${config.windowHeight}px`,
            backgroundColor: `rgba(${config.darkMode ? '30,30,32' : '255,255,255'}, ${config.glassOpacity / 100})`,
            backdropFilter: `blur(${config.glassBlur}px) saturate(180%)`,
            WebkitBackdropFilter: `blur(${config.glassBlur}px) saturate(180%)`,
            borderRadius: `${config.borderRadius}px`,
            boxShadow: `0 8px 32px rgba(0,0,0,${config.shadowIntensity / 100})`,
            border: `1px solid ${config.darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            marginBottom: '20px',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}>
            {/* Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: `1px solid ${config.darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: config.darkMode ? '#fff' : '#111',
              fontWeight: 700
            }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_0_2px_rgba(16,185,129,0.2)]"></div>
                {config.widgetTitle}
              </div>
              <svg className="w-5 h-5 opacity-50 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto" style={{ color: config.darkMode ? '#fff' : '#111' }}>
              <div className="self-start max-w-[85%]">
                <div style={{
                  background: config.darkMode ? 'rgba(255,255,255,0.1)' : config.agentBubbleColor,
                  color: config.darkMode ? '#fff' : '#111',
                  padding: '12px 16px',
                  borderRadius: '20px 20px 20px 4px',
                  fontSize: '14.5px',
                  lineHeight: '1.5',
                  border: `1px solid ${config.darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`
                }}>
                  {config.welcomeMessage}
                </div>
                {config.showTimestamp && <span className="text-[10px] opacity-60 mt-1 block px-1">10:45 AM</span>}
              </div>

              <div className="self-end max-w-[85%]">
                <div style={{
                  background: config.autoTheme ? '#111' : config.visitorBubbleColor,
                  color: '#fff',
                  padding: '12px 16px',
                  borderRadius: '20px 20px 4px 20px',
                  fontSize: '14.5px',
                  lineHeight: '1.5',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}>
                  I need help with my account.
                </div>
                {config.showTimestamp && <span className="text-[10px] opacity-60 mt-1 block px-1 text-right">10:46 AM</span>}
              </div>

              {config.showTypingIndicator && (
                <div className="self-start mt-2">
                  <div style={{
                    background: config.darkMode ? 'rgba(255,255,255,0.1)' : config.agentBubbleColor,
                    padding: '14px 18px',
                    borderRadius: '20px 20px 20px 4px',
                    display: 'flex',
                    gap: '4px',
                    border: `1px solid ${config.darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`
                  }}>
                    <div className="w-1.5 h-1.5 rounded-full opacity-40" style={{ background: config.darkMode ? '#fff' : '#111' }}></div>
                    <div className="w-1.5 h-1.5 rounded-full opacity-40" style={{ background: config.darkMode ? '#fff' : '#111' }}></div>
                    <div className="w-1.5 h-1.5 rounded-full opacity-40" style={{ background: config.darkMode ? '#fff' : '#111' }}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div style={{
              padding: '16px 20px',
              borderTop: `1px solid ${config.darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}>
               <svg className="w-5 h-5 opacity-50 cursor-pointer" style={{ color: config.darkMode ? '#fff' : '#111' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
               <div style={{
                 flex: 1,
                 padding: '12px 16px',
                 border: `1px solid ${config.darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
                 borderRadius: '24px',
                 background: config.darkMode ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.6)',
                 color: config.darkMode ? '#fff' : '#111',
                 fontSize: '14px'
               }}>{config.placeholderText}</div>
               <button style={{
                 background: config.autoTheme ? '#111' : config.primaryColor,
                 color: 'white',
                 padding: '10px 16px',
                 borderRadius: '20px',
                 fontWeight: 600,
                 fontSize: '14px',
                 border: 'none'
               }}>Send</button>
            </div>
          </div>

          {/* Launcher */}
          <div style={{
            width: `${config.bubbleSize}px`,
            height: `${config.bubbleSize}px`,
            background: config.autoTheme ? '#111' : config.primaryColor,
            borderRadius: `${config.bubbleSize / 2}px`,
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            position: 'relative',
            cursor: 'pointer'
          }}>
             <svg viewBox="0 0 24 24" style={{ width: `${config.bubbleSize * 0.5}px`, height: `${config.bubbleSize * 0.5}px`, fill: 'currentColor' }}><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
             {config.unreadBadge && (
               <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">2</div>
             )}
          </div>
          
        </div>
      </div>
    </div>
  );
}


