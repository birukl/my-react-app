// src/components/TelegramSidebar.tsx
import { useState } from "react";
import { Chat, User } from "../types";
import { currentUser } from "../data/users";

interface TelegramSidebarProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onNewChat: () => void;
}

export default function TelegramSidebar({ 
  chats, 
  selectedChat, 
  onSelectChat, 
  onNewChat 
}: TelegramSidebarProps) {
  const [search, setSearch] = useState("");

  const filteredChats = chats.filter(chat =>
    chat.user.firstName.toLowerCase().includes(search.toLowerCase()) ||
    chat.user.username.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "online": return "🟢";
      case "typing": return "✍️";
      default: return "⚫";
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-80 bg-gray-900 text-white flex flex-col h-screen">
      {/* User Profile Header */}
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src={currentUser.avatar} 
            alt="Your avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-semibold">{currentUser.firstName} {currentUser.lastName}</div>
            <div className="text-xs text-gray-400">@{currentUser.username}</div>
          </div>
        </div>
        <button 
          onClick={onNewChat}
          className="p-2 hover:bg-gray-800 rounded-full transition"
        >
          ✏️
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-800 text-white pl-8 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Chats List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`
              p-3 hover:bg-gray-800 cursor-pointer transition flex items-center gap-3
              ${selectedChat?.id === chat.id ? 'bg-gray-800' : ''}
            `}
          >
            {/* Avatar */}
            <div className="relative">
              <img 
                src={chat.user.avatar} 
                alt={chat.user.firstName}
                className="w-12 h-12 rounded-full"
              />
              <div className="absolute bottom-0 right-0 text-xs">
                {getStatusIcon(chat.user.status)}
              </div>
            </div>

            {/* Chat Info */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold truncate">
                  {chat.user.firstName} {chat.user.lastName}
                </h3>
                {chat.messages.length > 0 && (
                  <span className="text-xs text-gray-400">
                    {formatTime(chat.messages[chat.messages.length - 1].timestamp)}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400 truncate">
                  {chat.draft || (chat.messages[chat.messages.length - 1]?.text || "No messages")}
                </p>
                {chat.unreadCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                    {chat.unreadCount}
                  </span>
                )}
                {chat.isPinned && <span className="text-xs ml-1">📌</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}