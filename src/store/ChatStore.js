import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import { useAuthStore } from "./AuthStore";

export const useChatStore = create((set, get) => ({
  selectedUser: {},
  messages: [],

  setSelectedUser: (id, name) => {
    set({ selectedUser: { id, name } });
  },
  fetchMessages: async (userId) => {
    const response = await axiosInstance.get(`chat/${userId}`);
    set({ messages: response.data.messages });
  },
  sendMessages: async (sendTo, message) => {
    const response = await axiosInstance.post(`chat/${sendTo}`, { message });
    if (response.status === 200) {
      set({ messages: [...get().messages, response.data] });
    }
  },
  addSocketMessage: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.on("message", (message) => {
        if (get().selectedUser.id !== message.sender) {
          return;
        }
        set({ messages: [...get().messages, message] });
      });
    } else {
      return "Socket is not connected";
    }
  },
  removeSocketMessage: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("message");
    }
  },
}));
