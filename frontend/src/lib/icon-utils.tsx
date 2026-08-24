import React from "react";
import { Zap, Globe, Diamond, Atom, Layers, Briefcase, HeartPulse, Home, GraduationCap, Dumbbell, Car, Coffee, ShieldCheck, HelpCircle } from "lucide-react";

export function getCompanyLogo(companyName: string, className = "h-5 w-5 text-slate-600") {
  const name = companyName.toLowerCase();
  if (name.includes("energizer")) {
    return <Zap className={className} strokeWidth={2} />;
  }
  if (name.includes("tcs") || name.includes("tata")) {
    return <Globe className={className} strokeWidth={2} />;
  }
  if (name.includes("infosys")) {
    return <Diamond className={className} strokeWidth={2} />;
  }
  if (name.includes("cognizant")) {
    return <Atom className={className} strokeWidth={2} />;
  }
  if (name.includes("schneider")) {
    return <Layers className={className} strokeWidth={2} />;
  }
  return <Briefcase className={className} strokeWidth={2} />;
}

export function getBenefitIcon(iconStr: string, titleStr: string, className = "h-5 w-5 text-slate-500") {
  const title = titleStr.toLowerCase();
  const icon = iconStr;
  
  if (icon === "🏥" || title.includes("health") || title.includes("medical") || title.includes("insurance")) {
    return <HeartPulse className={className} />;
  }
  if (icon === "🏠" || title.includes("home") || title.includes("flexible") || title.includes("remote")) {
    return <Home className={className} />;
  }
  if (icon === "🎓" || title.includes("learning") || title.includes("training") || title.includes("education")) {
    return <GraduationCap className={className} />;
  }
  if (icon === "🏋️" || title.includes("wellness") || title.includes("gym") || title.includes("fitness")) {
    return <Dumbbell className={className} />;
  }
  if (icon === "🚌" || title.includes("cab") || title.includes("travel") || title.includes("transport")) {
    return <Car className={className} />;
  }
  if (icon === "🍕" || title.includes("cafeteria") || title.includes("meal") || title.includes("food")) {
    return <Coffee className={className} />;
  }
  if (icon === "🛡️" || title.includes("security") || title.includes("stable")) {
    return <ShieldCheck className={className} />;
  }
  return <HelpCircle className={className} />;
}
