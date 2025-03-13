import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import SideBarUsers from "./SideBarUsers";
import NoChatSelected from "./NoChatSelected.jsx";
import { useChatStore } from "../store/ChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import ChatContent from "./ChatContent.jsx";
import { useAuthStore } from "../store/AuthStore.js";

function Messege() {
  const [chats, setChats] = useState([]);
  const { messages, selectedUser, fetchMessages } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (messages) {
      setChats(messages);
    } else {
      console.log("Loading");
    }
  }, [messages]);

  return (
    <>
      <Navbar currentPage="message" />
      <div className="flex">
        <SideBarUsers />
        <div className="flex-1 me-1">
          {selectedUser.id ? (
            <>
              <ChatHeader />
              <ChatContent />
            </>
          ) : (
            <NoChatSelected />
          )}
        </div>
      </div>
    </>
  );
}

export default Messege;
