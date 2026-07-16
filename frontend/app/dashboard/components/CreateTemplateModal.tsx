import React from "react";

interface Props {
  showCreateReplyModal: boolean;
  setShowCreateReplyModal: (show: boolean) => void;
  newShortcut: string;
  setNewShortcut: (shortcut: string) => void;
  newTitle: string;
  setNewTitle: (title: string) => void;
  newContent: string;
  setNewContent: (content: string) => void;
  handleCreateReply: () => void;
}

export const CreateTemplateModal = ({
  showCreateReplyModal,
  setShowCreateReplyModal,
  newShortcut,
  setNewShortcut,
  newTitle,
  setNewTitle,
  newContent,
  setNewContent,
  handleCreateReply
}: Props) => {
  if (!showCreateReplyModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-900">Create Chat Template</h3>
          <button onClick={() => setShowCreateReplyModal(false)} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Shortcut Command</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400 font-mono text-sm">/</span>
              <input 
                type="text" 
                placeholder="e.g. refund" 
                value={newShortcut.replace("/", "")}
                onChange={(e) => setNewShortcut(e.target.value)}
                className="w-full pl-7 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Template Title</label>
            <input 
              type="text" 
              placeholder="e.g. Refund Policy" 
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Message Content</label>
            <textarea 
              rows={4}
              placeholder="Type the full message here..." 
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
            />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
          <button 
            onClick={() => setShowCreateReplyModal(false)}
            className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleCreateReply}
            disabled={!newShortcut || !newTitle || !newContent}
            className="px-4 py-2 bg-accent text-white text-sm font-bold rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50"
          >
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
};
