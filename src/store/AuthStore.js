import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import { toast } from "react-toastify";
import { persist } from "zustand/middleware";
import io from "socket.io-client";
import { redirect } from "react-router-dom";
import { server } from "../constants/config";

const BASE_URL = "https://tempbackend-47ip.onrender.com";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      isCheckingAuth: true,
      isSigningUp: false,
      isLoging: false,
      loggedOut: false,
      sideBarUsers: [],
      socket: null,

      login: async (userData) => {
        try {
          set({ isLoging: true });
          const response = await axiosInstance.post("auth/login", userData, {
            withCredentials: true,
          });

          if (response.status === 200) {
            set({ authUser: response.data });
            toast.success(response.data.message);
            get().connectSocket();
            set({ isLoging: false });
            redirect("/message");
          } else {
            toast.error("Login failed");
          }
        } catch (error) {
          console.error(error);
          toast.error("Login Failed in catch");
        }
      },
      logout: async () => {
        try {
          const response = await axiosInstance.post(
            "auth/logout",
            {},
            {
              withCredentials: true,
            }
          );

          if (response.status === 200) {
            set({ loggedOut: true });
            toast.success(response.data.message);
            get().disconnectSocket();
            localStorage.clear();
            set({ authUser: null });
            set({ sideBarUsers: [] });
          }
        } catch (error) {
          toast.error("Error while logout", error);
        }
      },
      getSideBarUsers: async () => {
        const users = await axiosInstance.get("auth/getusers");
        // console.log("Fetched users:", users.data);
        set({ sideBarUsers: users.data });
      },
      getSearchedUsers: async (debouncedSearch) => {
        const response = await axiosInstance.get(
          `auth/searchusers?query=${debouncedSearch}`
        );
        if (response.status === 200 && response.data) {
          set({
            sideBarUsers: [
              ...get().sideBarUsers,
              ...response.data.filter(
                (user) =>
                  !get().sideBarUsers.some(
                    (existingUser) => existingUser._id === user._id
                  )
              ),
            ],
          });
        }
      },
      connectSocket: () => {
        const { authUser } = get();
        if (!authUser) {
          return "User not authenticated";
        } else if (get().socket?.connected) {
          return "Socket already connected";
        }
        if (authUser.user.id) {
          const socket = new io(BASE_URL, {
            query: {
              userId: authUser.user.id,
            },
          });
          set({ socket });
        }
      },
      disconnectSocket: () => {
        if (get().socket?.connected) {
          get().socket.disconnect();
        }
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({
        authUser: state.authUser,
      }),
    }
  )
);

// Re-establish socket connection on initialization if user is authenticated
const { authUser, connectSocket } = useAuthStore.getState();
if (authUser) {
  connectSocket();
}
