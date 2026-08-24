import { LoaderCircle } from "lucide-react";

interface DashboardLoadingProps {
  label?: string;
}

export default function DashboardLoading({ label = "Loading dashboard" }: DashboardLoadingProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
          <LoaderCircle className="h-5 w-5 text-slate-600 animate-spin" />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-slate-700">{label}</p>
          <p className="text-[12px] text-slate-400 mt-1">Please wait a moment.</p>
        </div>
      </div>
    </div>
  );
}
