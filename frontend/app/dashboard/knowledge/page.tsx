"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KnowledgeBaseRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/settings?tab=knowledge");
  }, [router]);

  return (
    <div className="flex-1 flex items-center justify-center bg-white h-[100dvh]">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        <p className="text-sm text-gray-500 font-medium">Redirecting to Settings...</p>
      </div>
    </div>
  );
}
