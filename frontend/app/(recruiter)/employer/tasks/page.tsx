"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { useRecruiterOverview } from "@/hooks/useRecruiterOverview";
import { getRecruiterNavItems } from "@/lib/recruiter-nav";
import { Plus, Trash2, Check, X } from "lucide-react";

interface TaskItem {
  id: string;
  label: string;
  dueDate?: string;
  completed: boolean;
  priority?: string;
}

export default function RecruiterTasksPage() {
  const { tasks: initialTasks } = useRecruiterOverview();

  const [tasks, setTasks] = useState<TaskItem[]>([
    ...initialTasks,
    { id: "task-4", label: "Review campaign budget report", dueDate: "Aug 10", completed: false, priority: "medium" },
    { id: "task-5", label: "Update company profile page", dueDate: "Aug 12", completed: true, priority: "low" },
    { id: "task-6", label: "Send offer letter to Sujata K.", dueDate: "Aug 7", completed: false, priority: "high" },
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTask, setNewTask] = useState({ label: "", dueDate: "", priority: "medium" });

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.label.trim()) return;
    setTasks((prev) => [
      {
        id: `task-${Date.now()}`,
        label: newTask.label.trim(),
        dueDate: newTask.dueDate || undefined,
        completed: false,
        priority: newTask.priority,
      },
      ...prev,
    ]);
    setNewTask({ label: "", dueDate: "", priority: "medium" });
    setIsAddOpen(false);
  };

  const open = tasks.filter((t) => !t.completed);
  const done = tasks.filter((t) => t.completed);

  const priorityBadge = (p: string) => {
    const colors: Record<string, string> = {
      high: "text-rose-700 bg-rose-50 border-rose-200",
      medium: "text-amber-700 bg-amber-50 border-amber-200",
      low: "text-slate-500 bg-slate-50 border-slate-200",
    };
    return (
      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${colors[p] || colors.medium}`}>
        {p}
      </span>
    );
  };

  return (
    <DashboardShell
      brandTitle="JPS"
      brandSubtitle="Employer Dashboard"
      navItems={getRecruiterNavItems("/employer/tasks", tasks.length)}
      searchPlaceholder="Search tasks..."
      userAvatarText="JE"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div>
            <h1 className="text-[20px] font-bold text-slate-900 tracking-tight">Tasks & Approvals</h1>
            <p className="text-[13px] text-slate-500 mt-0.5">Manage recruiter action items, pending approvals, and follow-ups</p>
          </div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 rounded-lg transition shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </button>
        </div>

        {/* Add Task Modal */}
        {isAddOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50" onClick={() => setIsAddOpen(false)}>
            <div onClick={(e) => e.stopPropagation()} className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-slate-900" />
                  <h3 className="text-[16px] font-bold text-slate-900">Add New Task</h3>
                </div>
                <button onClick={() => setIsAddOpen(false)} className="text-slate-400 hover:text-slate-900"><X className="h-5 w-5" /></button>
              </div>

              <form onSubmit={handleAddTask} className="space-y-4 text-[13px]">
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold text-slate-700">Task Description *</label>
                  <input
                    type="text" required placeholder="e.g. Review John's application for Backend Developer"
                    value={newTask.label} onChange={(e) => setNewTask({ ...newTask, label: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[12px] font-semibold text-slate-700">Due Date</label>
                    <input
                      type="date"
                      value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 font-medium focus:outline-none focus:border-slate-400 transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[12px] font-semibold text-slate-700">Priority</label>
                    <select
                      value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-slate-900 font-medium focus:outline-none focus:border-slate-400 transition"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 text-[12px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition">Cancel</button>
                  <button type="submit" className="px-4 py-2 text-[12px] font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition">Add Task</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Open Tasks */}
          <div className="space-y-3">
            <h3 className="text-[13px] font-semibold text-slate-700 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Open Tasks <span className="font-mono text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded text-[10px]">{open.length}</span>
            </h3>
            {open.map((task) => (
              <div key={task.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <button onClick={() => toggleTask(task.id)} className="mt-0.5 h-4 w-4 rounded border-2 border-slate-300 hover:border-slate-900 transition shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-slate-900 truncate">{task.label}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {task.dueDate && <p className="text-[11px] font-mono text-slate-400">Due: {task.dueDate}</p>}
                      {(task as any).priority && priorityBadge((task as any).priority)}
                    </div>
                  </div>
                </div>
                <button onClick={() => deleteTask(task.id)} className="p-1 text-slate-300 hover:text-rose-500 transition shrink-0">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            {open.length === 0 && (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-6 text-center">
                <p className="text-[13px] text-slate-400 font-medium">No open tasks — you&apos;re all caught up!</p>
              </div>
            )}
          </div>

          {/* Completed Tasks */}
          <div className="space-y-3">
            <h3 className="text-[13px] font-semibold text-slate-700 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Completed <span className="font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-[10px]">{done.length}</span>
            </h3>
            {done.map((task) => (
              <div key={task.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start justify-between gap-3 opacity-70">
                <div className="flex items-start gap-3 min-w-0">
                  <button onClick={() => toggleTask(task.id)} className="mt-0.5 h-4 w-4 rounded border-2 border-emerald-500 bg-emerald-500 flex items-center justify-center shrink-0">
                    <Check className="h-2.5 w-2.5 text-white" />
                  </button>
                  <p className="text-[13px] text-slate-500 line-through truncate">{task.label}</p>
                </div>
                <button onClick={() => deleteTask(task.id)} className="p-1 text-slate-300 hover:text-rose-500 transition shrink-0">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
