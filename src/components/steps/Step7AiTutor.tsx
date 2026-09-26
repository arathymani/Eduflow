import React, { useState } from 'react';
import { AiChatMessage } from '../../types';
import { INITIAL_AI_CHAT } from '../../mock/initialData';
import { Bot, Send, Sparkles, User, Lightbulb, ArrowRight, CornerDownRight } from 'lucide-react';

interface Step7Props {
  onComplete: () => void;
}

export const Step7AiTutor: React.FC<Step7Props> = ({ onComplete }) => {
  const [messages, setMessages] = useState<AiChatMessage[]>(INITIAL_AI_CHAT);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const predefinedResponses: Record<string, string> = {
    analogy: "Imagine kicking a soccer ball ⚽ across the pitch. As soon as your foot connects, gravity starts decelerating its vertical climb. At the apex, its vertical velocity is zero for an instant, before accelerating downward. That graceful curve is an inverted parabola y = -ax² + bx! The roots are where the ball was kicked and where it hits the grass.",
    shortcut: "Here is the Rapid 3-Step Trinomial Hack ⚡:\n1. Multiply 'a' and 'c' to get Product P = a·c.\n2. Find two numbers whose product is P and sum is 'b'.\n3. Divide both numbers by 'a' and flip signs to get the roots instantly!",
    negative: "When D = b² - 4ac < 0, you would have to take the square root of a negative number! In the real number plane, that means the curve simply never touches or crosses the x-axis—it floats entirely above (or below) the ground. In mathematics, we use the imaginary unit 'i = √(-1)' to describe these solutions.",
    challenge: "Here is a quick brain teaser for you 🎯: If a parabola y = x² - 4x + c has its vertex exactly touching the x-axis, what must the value of c be? (Hint: when roots are equal, D = 0!)",
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newMsg: AiChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "That's an insightful question! When you think about it from first principles, quadratic behavior arises whenever the rate of change itself changes linearly. What part of the equation would you like to explore next?";

      const lower = text.toLowerCase();
      if (lower.includes('analogy') || lower.includes('parabolas') || lower.includes('basketball')) {
        replyText = predefinedResponses.analogy;
      } else if (lower.includes('shortcut') || lower.includes('factoring') || lower.includes('step')) {
        replyText = predefinedResponses.shortcut;
      } else if (lower.includes('negative') || lower.includes('discriminant')) {
        replyText = predefinedResponses.negative;
      } else if (lower.includes('challenge') || lower.includes('question')) {
        replyText = predefinedResponses.challenge;
      }

      const botReply: AiChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'tutor',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow p-6 rounded-3xl border border-brand-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/30 animate-pulse-glow">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-bold border border-brand-500/30">
                Nova AI Socratic Tutor
              </span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Online 24/7
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-0.5">Personalized Concept Conversation</h2>
          </div>
        </div>

        <button
          onClick={onComplete}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-md transition"
        >
          <span>Skip to Adaptive Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Log */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-slate-800 h-[440px] flex flex-col justify-between overflow-hidden">
        <div className="overflow-y-auto space-y-4 pr-2 max-h-[340px]">
          {messages.map((m) => {
            const isBot = m.sender === 'tutor';

            return (
              <div
                key={m.id}
                className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0 text-sm shadow">
                    🤖
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-2 text-xs sm:text-sm ${
                  isBot
                    ? 'bg-slate-800/90 border border-slate-700 text-slate-100 shadow-md'
                    : 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                }`}>
                  <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                  <span className={`text-[10px] block text-right ${isBot ? 'text-slate-400' : 'text-brand-200'}`}>
                    {m.timestamp}
                  </span>

                  {/* Quick replies inside first message */}
                  {m.quickReplies && (
                    <div className="pt-2 border-t border-slate-700/60 flex flex-wrap gap-1.5">
                      {m.quickReplies.map((qr, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(qr)}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-brand-700 text-brand-200 border border-brand-500/30 transition text-left"
                        >
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {!isBot && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 text-sm shadow">
                    🚀
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0 text-sm">
                🤖
              </div>
              <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-bounce [animation-delay:0.4s]" />
                <span>Nova is generating an intuitive explanation...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputVal)}
            placeholder="Ask Nova anything (e.g., 'Give me a mnemonic', 'Why is vertex at -b/2a?')..."
            className="flex-1 px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button
            onClick={() => handleSend(inputVal)}
            disabled={!inputVal.trim() || isTyping}
            className="p-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Concepts solidified? Test how difficulty adapts in real-time in the next step!</span>
        </div>
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition"
        >
          <span>Take Adaptive Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
