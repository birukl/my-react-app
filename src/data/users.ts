// src/data/users.ts
import { User } from "../types";

export const currentUser: User = {
  id: 1,
  username: "you",
  firstName: "Your",
  lastName: "Name",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
  phone: "+1234567890",
  status: "online",
};

export const contacts: User[] = [
  {
    id: 2,
    username: "alex_coder",
    firstName: "Alex",
    lastName: "Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    phone: "+1987654321",
    status: "online",
  },
  {
    id: 3,
    username: "problem_solver_bot",
    firstName: "🤖 AI",
    lastName: "Problem Solver",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Bot",
    phone: "+0000000000",
    status: "online",
  },
  {
    id: 4,
    username: "sarah_dev",
    firstName: "Sarah",
    lastName: "Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    phone: "+1122334455",
    status: "offline",
    lastSeen: "2024-01-15T10:30:00Z",
  },
  {
    id: 5,
    username: "mike_designer",
    firstName: "Mike",
    lastName: "Rodriguez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    phone: "+1555666777",
    status: "typing",
  },
];