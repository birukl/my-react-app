import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "assistant";
  timestamp: string;
}

interface Chat {
  id: number;
  title: string;
  messages: Message[];
}

interface ChatWindowProps {
  chat: Chat | null;
  onSendMessage: (chatId: number, text: string) => void;
}

export default function ChatWindow({ chat, onSendMessage }: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  useEffect(() => {
    if (chat) {
      inputRef.current?.focus();
    }
  }, [chat]);

  const handleSend = () => {
    if (!message.trim() || !chat) return;
    onSendMessage(chat.id, message);
    setMessage("");
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMessageText = (text: string) => {
    // Convert markdown code blocks
    let formatted = text.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
      return `<pre class="bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto my-2 text-xs"><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`;
    });
    
    // Convert bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
    
    // Convert line breaks
    formatted = formatted.replace(/\n/g, '<br/>');
    
    return formatted;
  };

  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center max-w-md px-6">
          <div className="text-8xl mb-6 animate-bounce">💬</div>
          <h2 className="text-3xl font-bold text-gray-700 mb-2">Telegram Simulation</h2>
          <p className="text-gray-500 mb-6">Select a chat to start messaging</p>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🤖</span>
              <h3 className="font-semibold text-gray-800">AI Problem Solver Demo</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Try these commands with the AI Bot:</p>
            <div className="space-y-2 text-xs font-mono">
              <div className="bg-gray-100 p-2 rounded">📊 "Sort array 5,2,8,1,9"</div>
              <div className="bg-gray-100 p-2 rounded">🧮 "Factorial of 6"</div>
              <div className="bg-gray-100 p-2 rounded">📐 "Calculate 15 * 4 + 7"</div>
              <div className="bg-gray-100 p-2 rounded">🐛 "Debug my code"</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className={`
            w-3 h-3 rounded-full
            ${chat.id === 1 ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}
          `}></div>
          <div>
            <h2 className="font-semibold text-gray-800 text-lg">{chat.title}</h2>
            <p className="text-xs text-gray-500">
              {chat.id === 1 ? '🤖 Online • AI Problem Solver' : 'Click to start chatting'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chat.messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div
              className={`
                max-w-[75%] rounded-2xl px-4 py-2 shadow-sm
                ${msg.sender === "user" 
                  ? "bg-blue-500 text-white rounded-br-none" 
                  : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                }
              `}
            >
              <div 
                className="whitespace-pre-wrap text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatMessageText(msg.text) }}
              />
              <div className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-gray-400"}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {msg.sender === "user" && (
                  <span className="ml-1">✓✓</span>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white rounded-2xl px-4 py-2 rounded-bl-none border border-gray-200">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setIsTyping(e.target.value.length > 0);
              }}
              onKeyPress={handleKeyPress}
              placeholder={
                chat.id === 1 
                  ? "Ask me to sort, calculate, or debug... Try 'Sort array 5,2,8,1,9'" 
                  : "Type a message..."
              }
              rows={1}
              className="w-full resize-none border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`
              px-6 py-2 rounded-xl font-semibold transition-all duration-200
              ${message.trim() 
                ? "bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105 shadow-md" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            Send →
          </button>
        </div>
        {chat.id === 1 && (
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-400">
              💡 Try: "Sort array 5,2,8,1,9" | "Factorial of 6" | "Calculate 15*4+7"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
  }
`;
document.head.appendChild(style);