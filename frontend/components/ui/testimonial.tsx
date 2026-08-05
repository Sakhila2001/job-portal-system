import React from "react";
import { Quote } from "lucide-react";
import { Testimonial } from "@/lib/dummy-data";

interface TestimonialProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialProps) {
  return (
    <div className="bg-white border border-slate-100 p-6 rounded-lg transition-all hover:border-slate-200 hover:shadow-xs relative overflow-hidden flex flex-col justify-between gap-5">
      {/* Extremely faint decorative quote icon */}
      <span className="absolute right-4 top-4 text-slate-100 -z-0 opacity-60">
        <Quote className="h-12 w-12 fill-current" />
      </span>

      <div className="space-y-3 relative z-10">
        <p className="text-slate-600 text-sm leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-3 relative z-10 border-t border-slate-50 pt-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl shrink-0 border border-slate-200">
          {testimonial.avatar}
        </span>
        <div>
          <h4 className="font-semibold text-slate-900 text-sm leading-tight">{testimonial.name}</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            {testimonial.role} at{" "}
            <span className="text-slate-700 font-medium">{testimonial.company}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
