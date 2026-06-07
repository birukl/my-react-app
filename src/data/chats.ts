export interface Message {
  id: number;
  text: string;
  sender: "user" | "assistant";
  timestamp: string;
}

export interface Chat {
  id: number;
  title: string;
  lastMessage: string;
  timestamp: string;
  messages: Message[];
}

export const chats: Chat[] = [
  {
    id: 1,
    title: "🤖 AI Problem Solver",
    lastMessage: "Try asking me to sort an array!",
    timestamp: new Date().toISOString(),
    messages: [
      {
        id: 1,
        text: "👋 **Hello! I'm your AI Problem Solver**\n\nI can help you with:\n\n📊 **Sorting arrays**\n• Try: \"Sort array 5,2,8,1,9\"\n\n🧮 **Math calculations**\n• Try: \"Calculate 15 * 4 + 7\"\n\n📐 **Factorials**\n• Try: \"Factorial of 6\"\n\n🐛 **Debugging**\n• Try: \"Debug my code\"\n\n**What would you like help with?** 🚀",
        sender: "assistant",
        timestamp: new Date().toISOString(),
      },
    ],
  },
  {
    id: 2,
    title: "💻 Coding Group",
    lastMessage: "Anyone want to review my code?",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    messages: [
      {
        id: 1,
        text: "Hey everyone! Working on a sorting algorithm for my project",
        sender: "user",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: 2,
        text: "Nice! What approach are you using? Quick sort or merge sort?",
        sender: "assistant",
        timestamp: new Date(Date.now() - 7000000).toISOString(),
      },
      {
        id: 3,
        text: "I'm trying bubble sort first to understand the concept",
        sender: "user",
        timestamp: new Date(Date.now() - 6800000).toISOString(),
      },
      {
        id: 4,
        text: "Good choice! Bubble sort is great for learning. Try: 'Sort array 5,2,8,1,9' with the AI bot to see it in action!",
        sender: "assistant",
        timestamp: new Date(Date.now() - 6600000).toISOString(),
      },
    ],
  },
  {
    id: 3,
    title: "📚 Study Group",
    lastMessage: "Understanding recursion concepts...",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    messages: [
      {
        id: 1,
        text: "Can someone explain recursion in simple terms?",
        sender: "user",
        timestamp: new Date(Date.now() - 90000000).toISOString(),
      },
      {
        id: 2,
        text: "Recursion is when a function calls itself! Try 'Factorial of 5' with the AI bot - it shows the recursion tree",
        sender: "assistant",
        timestamp: new Date(Date.now() - 89000000).toISOString(),
      },
    ],
  },
];