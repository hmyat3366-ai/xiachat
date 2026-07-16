import React from "react";

export const ChannelIcon = ({ type, sourceUrl }: { type: string, sourceUrl?: string }) => {
  switch (type) {
    case "whatsapp":
      return <span className="bg-green-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">WhatsApp</span>;
    case "messenger":
      return <span className="bg-blue-600 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Messenger</span>;
    case "email":
      return <span className="bg-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Email</span>;
    case "web":
    default:
      return <span className="bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">{sourceUrl && sourceUrl !== 'web' ? sourceUrl : "Web Chat"}</span>;
  }
};
