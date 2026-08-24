"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select option",
  icon,
  className = "",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find currently selected label
  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectOption = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left text-sm text-slate-800 focus:outline-none cursor-pointer bg-transparent py-1 group"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {icon && <span className="text-slate-400 group-hover:text-brand-primary transition-colors shrink-0">{icon}</span>}
          <span className="truncate font-medium">{displayLabel}</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-brand-primary" : ""
          }`}
        />
      </button>

      {/* Dropdown Options List */}
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-3 min-w-[200px] bg-white border border-slate-100 rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.12)] p-2 animate-in fade-in slide-in-from-top-2 duration-200 origin-top-left">
          <style>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <ul 
            className="max-h-60 overflow-y-auto space-y-0.5 no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    onClick={() => handleSelectOption(option.value)}
                    className={`flex items-center justify-between w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isSelected
                        ? "bg-brand-primary/10 text-brand-primary"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check className="h-4 w-4 text-brand-primary shrink-0" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
