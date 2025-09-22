import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaComments, FaPaperPlane, FaTimes } from "react-icons/fa";
import "./ChatWidget.css";

export default function ChatWidget({
  title = "Chat with us",
  subtitle = "We typically reply within a few minutes",
  placeholder = "Type a message...",
  simulatedBotReply = true, // set false to disable simulated reply
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hello 👋 — welcome! How can we help you today?",
      time: new Date(),
    },
  ]);
  const [unread, setUnread] = useState(0);
  const [botTyping, setBotTyping] = useState(false);
  const widgetRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto scroll into view on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
    if (!open) {
      // if last message is from bot and widget is closed, count unread
      const last = messages[messages.length - 1];
      if (last && last.from === "bot") setUnread((u) => u + 1);
    }
  }, [messages, open]);

  // close on outside click
  useEffect(() => {
    function onDocClick(e) {
      if (widgetRef.current && !widgetRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // open resets unread
  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  // Toggle
  const toggleOpen = (e) => {
    e.stopPropagation();
    setOpen((o) => !o);
  };

  // Send message
  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    const userMsg = { from: "user", text, time: new Date() };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    if (!simulatedBotReply) return;

    // Simulate bot typing + reply
    setBotTyping(true);
    await delay(700 + Math.min(text.length * 20, 900));
    setMessages((m) => [
      ...m,
      { from: "bot", text: generateSmartReply(text), time: new Date() },
    ]);
    setBotTyping(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div ref={widgetRef} className="cwp-root">
      {/* Floating Button */}
      <div className="cwp-fab-wrapper" aria-hidden={open}>
        <button
          className="cwp-fab"
          onClick={toggleOpen}
          aria-label={open ? "Close chat" : "Open chat"}
        >
          <AnimatePresence mode="wait">
            {!open ? (
              <motion.span
                key="open"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="cwp-fab-icon"
              >
                <FaComments />
                {unread > 0 && <span className="cwp-fab-badge">{unread}</span>}
              </motion.span>
            ) : (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="cwp-fab-icon"
              >
                <FaTimes />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.aside
            className="cwp-panel"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-label="Chat widget"
            aria-modal="false"
          >
            <header className="cwp-header">
              <div className="cwp-header-left">
                <div className="cwp-avatar" aria-hidden>
                  {/* stylish avatar / mark */}
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                    <rect x="1" y="1" width="22" height="22" rx="6" fill="url(#g)"></rect>
                    <defs>
                      <linearGradient id="g" x1="0" x2="1">
                        <stop offset="0" stopColor="#6d4ddf" />
                        <stop offset="1" stopColor="#4f46e5" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div>
                  <div className="cwp-title">{title}</div>
                  <div className="cwp-subtitle">{subtitle}</div>
                </div>
              </div>

              <div className="cwp-header-right">
                <button
                  className="cwp-close"
                  aria-label="Close chat"
                  onClick={() => setOpen(false)}
                >
                  <FaTimes />
                </button>
              </div>
            </header>

            <div className="cwp-body">
              <div className="cwp-messages" aria-live="polite">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, delay: i * 0.02 }}
                    className={`cwp-message ${m.from === "bot" ? "bot" : "user"}`}
                  >
                    <div className="cwp-message-content">
                      <div className="cwp-message-text">{m.text}</div>
                      <div className="cwp-message-time">
                        {formatTime(m.time)}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {botTyping && (
                  <div className="cwp-message bot typing">
                    <div className="cwp-message-content">
                      <div className="cwp-typing">
                        <span /><span /><span />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <footer className="cwp-footer">
              <textarea
                className="cwp-input"
                placeholder={placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                aria-label="Type a message"
              />
              <button
                className="cwp-send"
                onClick={sendMessage}
                aria-label="Send message"
                title="Send"
              >
                <FaPaperPlane />
              </button>
            </footer>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

/* helpers */
function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

function formatTime(d) {
  if (!d) return "";
  const dt = new Date(d);
  let h = dt.getHours();
  const m = dt.getMinutes().toString().padStart(2, "0");
  const am = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m} ${am}`;
}

/* Very small simulated reply (replace with real API integration) */
function generateSmartReply(input) {
  const lower = input.toLowerCase();
  if (lower.includes("price") || lower.includes("fee")) {
    return "Our fees depend on the course — which course are you interested in?";
  }
  if (lower.includes("hello") || lower.includes("hi")) {
    return "Hi! 👋 How can we help you today?";
  }
  if (lower.includes("time") || lower.includes("when")) {
    return "Our office hours are Mon–Sat, 9:30 AM to 6:30 PM.";
  }
  return "Thanks for the message — we'll reply shortly. Meanwhile, can you share more details?";
}
