// src/types.ts
export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
  phone: string;
  status: "online" | "offline" | "typing";
  lastSeen?: string;
}

export interface Message {
  id: number;
  text: string;
  sender: User;
  receiver: User;
  timestamp: string;
  isRead: boolean;
  isEdited: boolean;
  replyTo?: Message;
  media?: {
    type: "image" | "video" | "file";
    url: string;
    name: string;
  };
  reactions?: {
    like: number;
    love: number;
    laugh: number;
  };
}

export interface Chat {
  id: number;
  user: User;
  messages: Message[];
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  draft?: string;
}

export interface ProblemSolverState {
  isOpen: boolean;
  query: string;
  solution: string;
  isLoading: boolean;
}