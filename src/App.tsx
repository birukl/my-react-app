import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { chats as initialChats } from "./data/chats";

export default function App() {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [chats, setChats] = useState(initialChats);

  // Function to add new messages
  const handleSendMessage = (chatId: number, messageText: string) => {
    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId 
          ? { 
              ...chat, 
              messages: [...chat.messages, newMessage],
              lastMessage: messageText,
              timestamp: new Date().toISOString()
            }
          : chat
      )
    );

    // Auto-response from AI after 1 second
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: getAIResponse(messageText),
        sender: "assistant",
        timestamp: new Date().toISOString(),
      };
      
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === chatId 
            ? { ...chat, messages: [...chat.messages, aiResponse] }
            : chat
        )
      );
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        chats={chats} 
        onSelectChat={setSelectedChat}
        selectedChatId={selectedChat?.id}
      />
      <ChatWindow 
        chat={selectedChat} 
        onSendMessage={handleSendMessage}
      />
<p>dsfs</div>
      <div> love burra</div>
    </div>
  );
}

// AI Problem Solver Function
function getAIResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  
  // Sorting arrays
  if (msg.includes("sort") && msg.match(/\d+/g)) {
    const numbers = msg.match(/\d+/g)?.map(Number) || [5, 2, 8, 1, 9];
    const sorted = [...numbers].sort((a,b) => a-b);
    return `🔢 **Sorted Array**\n\nInput: [${numbers.join(", ")}]\nOutput: [${sorted.join(", ")}]\n\n\`\`\`javascript\nconst arr = [${numbers.join(", ")}];\nconst sorted = arr.sort((a,b) => a-b);\nconsole.log(sorted); // [${sorted.join(", ")}]\n\`\`\``;
  }
  
  // Factorial
  if (msg.includes("factorial")) {
    const n = parseInt(msg.match(/\d+/)?.[0] || "5");
    const fact = (num: number): number => num <= 1 ? 1 : num * fact(num-1);
    return `🧮 **Factorial of ${n}**\n\n${n}! = ${fact(n)}\n\n\`\`\`javascript\nfunction factorial(n) {\n  if(n <= 1) return 1;\n  return n * factorial(n-1);\n}\n\nfactorial(${n}); // ${fact(n)}\n\`\`\``;
  }
  
  // Math calculations
  if (msg.includes("calculate") || msg.match(/[0-9][+\-*/][0-9]/)) {
    try {
      const match = msg.match(/[0-9+\-*/()]+/);
      if (match) {
        const result = eval(match[0]);
        return `🧮 **Calculation**\n\n${match[0]} = ${result}\n\n\`\`\`javascript\nconst result = ${match[0]};\nconsole.log(result); // ${result}\n\`\`\``;
      }
    } catch(e) {}
    return "📐 Try: 'calculate 5+3' or '15 * 4'";
  }
  
  // Debugging
  if (msg.includes("debug") || msg.includes("error")) {
    return `🐛 **Debugging Tips**\n\n**Common issues & solutions:**\n\n1️⃣ **Undefined variables**\n\`\`\`javascript\n// ❌ Wrong\nconsole.log(x);\n\n// ✅ Correct\nlet x = 10;\nconsole.log(x);\n\`\`\`\n\n2️⃣ **Missing brackets**\n\`\`\`javascript\n// ❌ Wrong\nif(true {\n  console.log("hello");\n}\n\n// ✅ Correct\nif(true) {\n  console.log("hello");\n}\n\`\`\`\n\n3️⃣ **Async issues**\n\`\`\`javascript\n// Use async/await or .then()\nasync function getData() {\n  const response = await fetch(url);\n  return response.json();\n}\n\`\`\`\n\n**Need specific help? Share your code!**`;
  }
  
  // Greetings
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return "👋 Hello! I'm your AI Problem Solver.\n\n**Try asking me:**\n• 'Sort array 5,2,8,1,9'\n• 'Factorial of 6'\n• 'Calculate 15 * 4 + 7'\n• 'Debug my code'\n\nI'll give you step-by-step solutions! 💡";
  }
  
  // Help
  if (msg.includes("help") || msg.includes("what can you do")) {
    return "🤖 **AI Problem Solver - Help Menu**\n\n**Commands I understand:**\n\n📊 **Sorting**\n• 'Sort array 5,2,8,1,9'\n• 'Sort these numbers: 10, 3, 7, 2'\n\n🧮 **Math**\n• 'Calculate 15 * 4 + 7'\n• 'Factorial of 6'\n• '5 + 3 * 2'\n\n🐛 **Debugging**\n• 'Debug my code'\n• 'Fix this error'\n\n💬 **General**\n• 'Hello'\n• 'Help'\n\n**Just type naturally and I'll help!** 🚀";
  }
  
  // Default response
  return `🤖 **AI Assistant**\n\nI can help you with:\n• 🔢 Sorting arrays\n• 🧮 Math calculations  \n• 📐 Factorials\n• 🐛 Debugging code\n\n**Try these examples:**\n\`\`\`\n"Sort array 5,2,8,1,9"\n"Calculate 15 * 4 + 7"\n"Factorial of 6"\n"Debug my code"\n\`\`\`\n\nWhat would you like help with?`;
}