import { useCallback, useEffect, useRef, useState } from "react";
import { VscSend } from "react-icons/vsc";
import { useChatStore } from "../store/ChatStore";
import { useAuthStore } from "../store/AuthStore";
import { formateDateAndTime } from "../lib/utils";

function ChatContent() {
  const [sendMessage, setSendMessages] = useState("");
  const autoScroll = useRef(null);
  const {
    selectedUser,
    sendMessages,
    addSocketMessage,
    messages,
    fetchMessages,
    removeSocketMessage,
  } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    fetchMessages(selectedUser.id);
  }, [selectedUser.id, fetchMessages]);

  useEffect(() => {
    addSocketMessage();
    return () => {
      removeSocketMessage();
    };
  }, [addSocketMessage, removeSocketMessage]);

  function setSendMessage(event) {
    const message = event.target.value;
    setSendMessages(message);
  }

  const handleSendMessages = useCallback(() => {
    sendMessages(selectedUser.id, sendMessage);
    setSendMessages("");
  }, [sendMessages, selectedUser.id, sendMessage]);

  useEffect(() => {
    if (messages.length === 0) return;
    autoScroll.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="bg-zinc-900 h-screen overflow-y-auto rounded-md shadow-lg p-3">
      {/* /!* Chat Messages *! */}
      {messages.map((message) => {
        const selfSender = message.sender === authUser.user.id;
        // console.log("Message ID:", message._id);
        return (
          <div
            key={message._id}
            className={`chat ${selfSender ? "chat-end" : "chat-start"}`}
            ref={autoScroll}
          >
            <div className="chat-image avatar placeholder ">
              <div className="bg-neutral text-neutral-content w-14 rounded-full">
                {selectedUser && (
                  <span className="text-xl">
                    {selfSender ? authUser.user.name[0] : selectedUser.name[0]}
                  </span>
                )}
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="">{formateDateAndTime(message.createdAt)}</time>
            </div>
            <div className="chat-bubble flex">{message.message}</div>
          </div>
        );
      })}

      <div className="flex">
        <input
          type="text"
          className="w-full p-3 outline-none rounded-lg border border-zinc-700"
          placeholder="Type a message..."
          onChange={setSendMessage}
          value={sendMessage}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSendMessages();
            }
          }}
        />
        <button
          className="rounded-md bg-stone-950 p-2 mx-1"
          onClick={handleSendMessages}
        >
          <VscSend className="text-3xl" />
        </button>
      </div>
    </div>
  );
}

export default ChatContent;
