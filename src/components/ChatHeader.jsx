import { useChatStore } from "../store/ChatStore";

function ChatHeader() {
  const { setSelectedUser, selectedUser } = useChatStore();
  return (
    <div className="bg-zinc-800 h-14 flex  justify-around items-center rounded-s-xl">
      <h1 className="font-bold">{selectedUser.name}</h1>
      {/* <button
        onClick={() => {
          setSelectedUser({ id: null });
        }}
        className="font-extrabold size-5"
      >
        X
      </button> */}
    </div>
  );
}

export default ChatHeader;
