// src/data/initialChats.ts
import { Chat, Message } from "../types";
import { currentUser, contacts } from "./users";

const createMessage = (
  id: number,
  text: string,
  senderId: number,
  receiverId: number,
  isRead: boolean = true
): Message => ({
  id,
  text,
  sender: senderId === 1 ? currentUser : contacts.find(c => c.id === senderId)!,
  receiver: receiverId === 1 ? currentUser : contacts.find(c => c.id === receiverId)!,
  timestamp: new Date().toISOString(),
  isRead,
  isEdited: false,
});

export const initialChats: Chat[] = [
  {
    id: 1,
    user: contacts[1], // AI Problem Solver Bot
    messages: [
      createMessage(1, "🤖 Welcome to Telegram-like chat! I'm your AI Problem Solver. Try asking me:\n\n• 'Sort array [5,2,8,1,9]'\n• 'Calculate 15 * 4 + 7'\n• 'Debug this code'\n• 'Explain recursion'", 3, 1, true),
    ],
    unreadCount: 0,
    isPinned: true,
    isMuted: false,
  },
  {
    id: 2,
    user: contacts[0], // Alex
    messages: [
      createMessage(1, "Hey! Check out this sorting algorithm I wrote:", 2, 1, true),
      createMessage(2, "function quickSort(arr) { return arr.length <= 1 ? arr : [...quickSort(arr.filter(x => x < arr[0])), arr[0], ...quickSort(arr.filter(x => x > arr[0]))]; }", 2, 1, true),
      createMessage(3, "Nice! That's clean. Want to see it visualized?", 1, 2, true),
    ],
    unreadCount: 0,
    isPinned: false,
    isMuted: false,
  },
  {
    id: 3,
    user: contacts[2], // Sarah
    messages: [
      createMessage(1, "Having trouble with this React component...", 4, 1, true),
      createMessage(2, "What's the issue? Share your code.", 1, 4, true),
      createMessage(3, "The state isn't updating properly", 4, 1, false),
    ],
    unreadCount: 1,
    isPinned: false,
    isMuted: false,
  },
];