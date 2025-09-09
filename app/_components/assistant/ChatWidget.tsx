"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { askAssistant } from "@/services/assistantApi";
import { MessageSquare, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Msg {
  role: "user" | "assistant";
  text: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Hi! I'm your AI assistant. Ask me anything about this site or building your portfolio." },
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function onSend() {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setLoading(true);
    try {
      const res = await askAssistant(text);
      const reply = res?.reply ?? res?.error ?? "Sorry, I couldn't respond.";
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", text: "Error contacting assistant. Please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onSend();
    }
  }

  // Add a pulsing animation that runs continuously
  const [isPulsing, setIsPulsing] = useState(true);
  
  // Stop pulsing after first interaction or after 2 minutes
  useEffect(() => {
    const timer = setTimeout(() => setIsPulsing(false), 120000); // 2 minutes
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      setIsPulsing(false); // Stop pulsing when dialog is opened
    }}>
      <DialogTrigger asChild>
        <motion.div
          className="fixed bottom-4 right-4 z-50"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: isPulsing ? [0, -5, 0] : 0,
          }}
          transition={{ 
            y: { 
              repeat: isPulsing ? Infinity : 0, 
              duration: 1.5,
              ease: "easeInOut"
            },
            scale: { duration: 0.2 }
          }}
        >
          <Button
            aria-label="Open Assistant"
            className={cn(
              "h-12 w-12 rounded-full shadow-lg transition-all duration-300",
              isPulsing && "ring-2 ring-offset-2 ring-blue-500"
            )}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-md">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle>AI Assistant</DialogTitle>
        </DialogHeader>
        <div className="flex h-[60vh] flex-col">
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-2 space-y-3 thin-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`${m.role === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block max-w-[85%] rounded-md px-3 py-2 text-sm whitespace-pre-wrap ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-left">
                <div className="inline-flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
          </div>
          <div className="border-t p-3">
            <div className="flex items-end gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type your question... (Ctrl/Cmd+Enter to send)"
                className="min-h-[44px] max-h-40"
              />
              <Button onClick={onSend} disabled={loading || !input.trim()}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
