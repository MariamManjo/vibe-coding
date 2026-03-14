import { Suspense } from "react";
import AccountContent from "./AccountContent";

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[#9945FF] animate-spin" />
        </div>
      }
    >
      <AccountContent />
    </Suspense>
  );
}
