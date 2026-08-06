import { Suspense } from "react";
import {ResultContent} from "@/components/ResultContent"
export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-100">
          <p className="text-sm text-slate-500">Loading result...</p>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}