"use client";

import React, { useState, useEffect } from "react";

export default function AIAgentSettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [workspaceId, setWorkspaceId] = useState("");
  const [message, setMessage] = useState("");

  const [aiEnabled, setAiEnabled] = useState(false);
  const [aiModel, setAiModel] = useState("llama-3-8b-free");
  const [aiApiKey, setAiApiKey] = useState("");
  const [aiSystemPrompt, setAiSystemPrompt] = useState('နင်က Customer Support AI Assistant ဖြစ်တယ်။ Customer ကို ယဉ်ယဉ်ကျေးကျေး မြန်မာလို ပြန်နှုတ်ဆက်ပါ။ Customer မေးတာတွေကို ဖြေပေးပါ။ မဖြေနိုင်ရင် "Admin မကြာခင် ပြန်လည်ဖြေကြားပေးပါလိမ့်မယ်ရှင်၊ ခဏလေး စောင့်ဆိုင်းပေးပါနော်" လို့ ပြောပြီး စောင့်ခိုင်းပါ။');
  const [workspaceData, setWorkspaceData] = useState<any>(null);

  const isModelFree = (modelName: string) => {
    return modelName && (modelName.includes('free') || modelName.includes('llama') || modelName.includes('gemma') || modelName.includes('qwen') || modelName.includes('laguna'));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.workspaces && user.workspaces.length > 0) {
        setWorkspaceId(user.workspaces[0]);
      }
    }
  }, []);

  useEffect(() => {
    if (!workspaceId) return;
    const token = localStorage.getItem("token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://xiachat.onrender.com"}/api/workspaces/${workspaceId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setWorkspaceData(data.data);
          let currentModel = data.data.aiModel || "llama-3-8b-free";
          const isFree = currentModel.includes('free') || currentModel.includes('llama') || currentModel.includes('gemma') || currentModel.includes('qwen') || currentModel.includes('laguna');
          
          if (!isFree) {
            currentModel = "llama-3-8b-free";
          }
          
          const hasAccess = data.data.plan === 'pro' || isModelFree(currentModel);
          
          if (!hasAccess) {
            setAiEnabled(false);
          } else {
            setAiEnabled(data.data.aiEnabled || false);
          }
          setAiModel(currentModel);
          setAiApiKey(data.data.aiApiKey || "");
          if (data.data.aiSystemPrompt) {
            setAiSystemPrompt(data.data.aiSystemPrompt);
          }
        }
      })
      .finally(() => setIsLoading(false));
  }, [workspaceId]);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://xiachat.onrender.com"}/api/workspaces/${workspaceId}/ai-settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ aiEnabled, aiModel, aiApiKey, aiSystemPrompt })
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Settings saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(data.error || "Failed to save settings.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-8 text-gray-500 font-medium">Loading AI Settings...</div>;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#09090B] overflow-y-auto font-sans">
      <div className="px-4 sm:px-8 py-4 sm:py-6 bg-[#09090B]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.08)] sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-[#FAFAFA] tracking-tight">AI Agent Configuration</h1>
        <p className="text-sm text-[#A1A1AA] mt-1">Setup your AI Assistant to answer customer queries automatically.</p>
      </div>

      <div className="p-4 sm:p-8 max-w-4xl">
        {message && (
          <div className="mb-6 p-4 bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)] rounded-xl text-green-400 text-sm font-semibold flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {message}
          </div>
        )}

        <div className="bg-[rgba(255,255,255,0.03)] rounded-2xl shadow-sm border border-[rgba(255,255,255,0.08)] overflow-hidden mb-8">
          {/* Toggle Section */}
          <div className="p-4 sm:p-6 border-b border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[rgba(255,255,255,0.02)] transition-colors">
            <div>
              <h2 className="text-base font-bold text-[#FAFAFA] flex flex-wrap items-center gap-2">
                Enable AI Auto-Pilot
                {workspaceData?.plan !== 'pro' && !isModelFree(aiModel) && (
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">PRO PLAN ONLY</span>
                )}
                {isModelFree(aiModel) && (
                  <span className="bg-green-500/20 text-green-400 text-[9px] font-bold px-1.5 py-0.5 rounded-sm border border-green-500/30">FREE MODEL ACTIVE</span>
                )}
              </h2>
              <p className="text-sm text-[#A1A1AA] mt-0.5">When enabled, AI will automatically reply to visitors.</p>
            </div>
            <label className={`relative inline-flex items-center ${workspaceData?.plan === 'pro' || isModelFree(aiModel) ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}>
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={aiEnabled} 
                disabled={!(workspaceData?.plan === 'pro' || isModelFree(aiModel))}
                onChange={(e) => setAiEnabled(e.target.checked)} 
              />
              <div className="w-11 h-6 bg-[rgba(255,255,255,0.1)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4F46E5]"></div>
            </label>
          </div>

          <div className={`p-4 sm:p-6 space-y-6 ${!aiEnabled ? 'opacity-50 pointer-events-none grayscale-[50%]' : ''} transition-all`}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* API Key */}
              <div>
                <label className="block text-sm font-bold text-[#FAFAFA] mb-2">OpenAI API Key</label>
                <input 
                  type="password"
                  value={aiApiKey}
                  onChange={(e) => setAiApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] text-[#FAFAFA] font-mono placeholder:text-[#A1A1AA]"
                />
                <p className="text-[11px] text-[#A1A1AA] mt-2">Your API key is securely stored and never shared.</p>
              </div>

              {/* Model Select */}
              <div>
                <label className="block text-sm font-bold text-[#FAFAFA] mb-2">AI Model</label>
                <div className="relative">
                  <select style={{colorScheme:"dark"}} 
                    value={aiModel}
                    onChange={(e) => {
                      const newModel = e.target.value;
                      setAiModel(newModel);
                      if (workspaceData?.plan !== 'pro' && !isModelFree(newModel)) {
                        setAiEnabled(false);
                      }
                    }}
                    className="w-full px-4 py-2.5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] text-[#FAFAFA] appearance-none font-medium"
                  >
                    <option value="llama-3-8b-free">Llama 3 8B Instruct (Free)</option>
                    <option value="gemma-2-9b-free">Gemma 2 9B Instruct (Free)</option>
                    <option value="qwen-2.5-7b-free">Qwen 2.5 7B Instruct (Free)</option>
                    <option value="laguna-m-1-free">Laguna M.1 (Free)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#A1A1AA]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-[rgba(255,255,255,0.06)]" />

            {/* System Prompt */}
            <div>
              <label className="block text-sm font-bold text-[#FAFAFA] mb-2 flex justify-between items-end">
                System Prompt (Instructions)
                <button className="text-[11px] text-[#4F46E5] hover:underline font-semibold">Load Template</button>
              </label>
              <textarea 
                rows={6}
                value={aiSystemPrompt}
                onChange={(e) => setAiSystemPrompt(e.target.value)}
                placeholder="You are a helpful customer support assistant..."
                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/50 focus:border-[#4F46E5] resize-none text-[#FAFAFA] leading-relaxed placeholder:text-[#A1A1AA]"
              />
              <div className="mt-3 bg-[rgba(79,70,229,0.1)] border border-[rgba(79,70,229,0.2)] rounded-lg p-3">
                <p className="text-xs text-[#818CF8] font-medium">
                  <strong>💡 Tip:</strong> Tell the AI exactly how you want it to behave. For example: 
                  <span className="italic block mt-1 opacity-80">&quot;Always reply in Burmese unless asked in English. Keep answers short and polite. Do not offer discounts.&quot;</span>
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pb-8">
          <button className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-[#A1A1AA] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl hover:bg-[rgba(255,255,255,0.06)] transition-colors shadow-sm text-center">
            Reset to Default
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#4F46E5] text-white text-sm font-bold rounded-xl hover:bg-[#4338CA] transition-colors shadow-lg shadow-[rgba(79,70,229,0.2)] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSaving && <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
            Save Settings
          </button>
        </div>

      </div>
    </div>
  );
}

