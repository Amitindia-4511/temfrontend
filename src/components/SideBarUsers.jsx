import { useEffect, useState } from "react";
import { useChatStore } from "../store/ChatStore";
import { useAuthStore } from "../store/AuthStore";

const SideBarUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { setSelectedUser, selectedUser } = useChatStore();
  const { sideBarUsers, getSideBarUsers, authUser, getSearchedUsers } =
    useAuthStore();

  useEffect(() => {
    if (sideBarUsers.length === 0 && authUser) getSideBarUsers();
  }, []);

  useEffect(() => {
    if (sideBarUsers.length > 0) {
      setUsers(sideBarUsers);
    } else {
      console.log("Loading");
    }
    return () => {
      setUsers([]);
    };
  }, [sideBarUsers]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timeOutId);
  }, [search]);

  function handleChat({ id, name }) {
    setSelectedUser(id, name);
    // fetchMessages(users);
  }
  function setSearchQuery(event) {
    setSearch(event.target.value);
  }
  function handleSearch() {
    getSearchedUsers(debouncedSearch);
  }

  return (
    <aside className="bg-gray-950 p-3 min-md:w-2/12">
      <div className="mb-3">
        <input
          value={search}
          onChange={setSearchQuery}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="rounded-md h-9 text-center outline-none from-accent-content"
          type="text"
        />
      </div>
      {users.map((user) => {
        return (
          <button
            key={user._id}
            className={`w-full flex items-center ${
              user._id === selectedUser.id
                ? "bg-gray-700 border border-s-cyan-300 border-b-cyan-500 border-t-amber-500 border-e-amber-400"
                : "bg-zinc-900"
            } p-2 my-1.5 rounded-xl`}
            onClick={() => handleChat({ id: user._id, name: user.name })}
          >
            <div className="avatar online placeholder mx-3 ">
              <div className="bg-neutral text-neutral-content w-16 rounded-full">
                <span className="text-xl">{user?.name[0]}</span>
              </div>
            </div>
            <span className="text-xl max-md:hidden">{user?.name}</span>
          </button>
        );
      })}
    </aside>
  );
};

export default SideBarUsers;
