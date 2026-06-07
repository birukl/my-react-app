interface Chat {
  id: number;
  title: string;
  lastMessage: string;
  timestamp: string;
  messages: any[];
}

interface SidebarProps {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
  selectedChatId?: number;
}

export default function Sidebar({ chats, onSelectChat, selectedChatId }: SidebarProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffHours < 1) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffHours < 24) {
      return `${Math.floor(diffHours)}h ago`;
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600">
        <h1 className="text-xl font-bold text-white">💬 Telegram Sim</h1>
        <p className="text-sm text-blue-100 mt-1">AI Problem Solver</p>
      </div>
      
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`
              p-4 border-b border-gray-100 cursor-pointer transition-all duration-200
              ${selectedChatId === chat.id 
                ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                : 'hover:bg-gray-50'
              }
            `}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className={`
                  w-2 h-2 rounded-full
                  ${chat.id === 1 ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}
                `}></div>
                <h3 className={`font-semibold ${selectedChatId === chat.id ? 'text-blue-600' : 'text-gray-800'}`}>
                  {chat.title}
                </h3>
              </div>
              <span className="text-xs text-gray-400">
                {formatTime(chat.timestamp)}
              </span>
            </div>
            <p className="text-sm text-gray-500 truncate mt-1">
              {chat.lastMessage}
            </p>
            {chat.id === 1 && (
              <div className="mt-1">
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                  🤖 AI Bot
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500 text-center space-y-1">
          <p>✨ Telegram Simulation</p>
          <p className="text-gray-400">Click any chat to start</p>
        </div>
      </div>
    </div>
  );
}