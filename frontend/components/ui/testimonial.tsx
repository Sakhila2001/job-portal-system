import React from "react";
import { Quote } from "lucide-react";
import { Testimonial } from "@/lib/dummy-data";

interface TestimonialProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialProps) {
  return (
    <div className="bg-white border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all hover-lift relative overflow-hidden flex flex-col justify-between gap-6">
      {/* Decorative quote icon */}
      <span className="absolute right-4 top-4 text-slate-100 -z-0">
        <Quote className="h-16 w-16 fill-current" />
      </span>

      <div className="space-y-4 relative z-10">
        <p className="text-slate-600 text-sm italic leading-relaxed">
          "{testimonial.quote}"
        </p>
      </div>

      <div className="flex items-center gap-3 relative z-10 border-t border-slate-50 pt-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-2xl shadow-inner border border-blue-100 shrink-0">
          {testimonial.avatar}
        </span>
        <div>
          <h4 className="font-bold text-slate-900 text-sm leading-tight">{testimonial.name}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            {testimonial.role} at{" "}
            <span className="text-brand-primary font-semibold">{testimonial.company}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
