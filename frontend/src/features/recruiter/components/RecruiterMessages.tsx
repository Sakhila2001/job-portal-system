"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Search, MessageSquare, Archive } from "lucide-react";
import { MessageThread, Message } from "@/lib/types";

interface Props {
  threads: MessageThread[];
  onThreadsChange: (threads: MessageThread[]) => void;
}

type InboxTab = "all" | "unread" | "archived";

export default function RecruiterMessages({ threads, onThreadsChange }: Props) {
  const [activeThreadId, setActiveThreadId] = useState<string | null>(threads[0]?.id ?? null);
  const [tab, setTab] = useState<InboxTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [composeDraft, setComposeDraft] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId) ?? null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread?.messages.length]);

  const openThread = (threadId: string) => {
    setActiveThreadId(threadId);
    onThreadsChange(
      threads.map((t) =>
        t.id === threadId
          ? { ...t, unreadCount: 0, messages: t.messages.map((m) => ({ ...m, isRead: true })) }
          : t
      )
    );
  };

  const sendMessage = () => {
    if (!composeDraft.trim() || !activeThreadId) return;
    const newMsg: Message = {
      id: `msg-new-${Date.now()}`,
      senderId: "recruiter",
      senderName: "JPS Employer",
      text: composeDraft.trim(),
      timestamp: "Just now",
      isRead: true,
    };
    onThreadsChange(
      threads.map((t) =>
        t.id === activeThreadId
          ? { ...t, messages: [...t.messages, newMsg], lastMessage: newMsg.text, lastMessageTime: "Just now" }
          : t
      )
    );
    setComposeDraft("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const filteredThreads = threads.filter((t) => {
    if (tab === "unread" && t.unreadCount === 0) return false;
    if (tab === "archived" && !t.isArchived) return false;
    if (tab !== "archived" && t.isArchived) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.candidateName.toLowerCase().includes(q) ||
        t.jobTitle.toLowerCase().includes(q) ||
        t.lastMessage.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalUnread = threads.reduce((s, t) => s + t.unreadCount, 0);

  return (
    <div
      className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col"
      style={{ height: "500px" }}
    >
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-slate-700" />
          <h4 className="text-[13px] font-bold text-slate-900">Messages</h4>
          {totalUnread > 0 && (
            <span className="px-1.5 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded-full leading-none">
              {totalUnread}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Thread list */}
        <div className="w-44 border-r border-slate-100 flex flex-col shrink-0">
          {/* Search */}
          <div className="px-3 pt-2.5 pb-2 border-b border-slate-50">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 pr-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900/10"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-100 shrink-0">
            {(["all", "unread", "archived"] as InboxTab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-1.5 text-[9px] font-extrabold uppercase tracking-widest transition-colors ${
                  tab === t
                    ? "text-slate-900 border-b-2 border-slate-900"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Thread items */}
          <div className="flex-1 overflow-y-auto">
            {filteredThreads.length === 0 ? (
              <div className="p-4 text-center text-[11px] text-slate-400">No conversations</div>
            ) : (
              filteredThreads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => openThread(thread.id)}
                  className={`w-full text-left px-3 py-3 border-b border-slate-50 transition-colors hover:bg-slate-50 ${
                    activeThreadId === thread.id ? "bg-slate-50" : ""
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700 shrink-0">
                      {thread.candidateInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-[11px] font-bold text-slate-900 truncate">{thread.candidateName}</p>
                        {thread.unreadCount > 0 && (
                          <span className="shrink-0 w-4 h-4 bg-slate-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                            {thread.unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 truncate font-medium">{thread.jobTitle}</p>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">{thread.lastMessage}</p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat pane */}
        {activeThread ? (
          <div className="flex-1 flex flex-col min-w-0">
            {/* Thread header */}
            <div className="px-4 py-2.5 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700 shrink-0">
                  {activeThread.candidateInitials}
                </div>
                <div>
                  <p className="text-[12px] font-bold text-slate-900">{activeThread.candidateName}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{activeThread.jobTitle}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {activeThread.messages.map((msg) => {
                const isRecruiter = msg.senderId === "recruiter";
                return (
                  <div key={msg.id} className={`flex flex-col ${isRecruiter ? "items-end" : "items-start"}`}>
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-2xl text-[12px] leading-relaxed font-medium ${
                        isRecruiter
                          ? "bg-slate-900 text-white rounded-tr-sm"
                          : "bg-slate-100 text-slate-800 rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono mt-0.5 px-1">{msg.timestamp}</span>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Compose */}
            <div className="px-3 py-2.5 border-t border-slate-100 shrink-0 flex items-end gap-2">
              <textarea
                rows={2}
                value={composeDraft}
                onChange={(e) => setComposeDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Write a message... (Enter to send)"
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] font-medium text-slate-900 resize-none focus:outline-none focus:ring-1 focus:ring-slate-900/10 focus:border-slate-400 transition placeholder:text-slate-400"
              />
              <button
                onClick={sendMessage}
                disabled={!composeDraft.trim()}
                className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:bg-slate-300 transition active:scale-95 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <div className="text-center space-y-2">
              <MessageSquare className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-[12px] font-medium">Select a conversation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
