import data from "../data/data.js";
import { FaUserAlt } from "react-icons/fa";


export default function Users() {
  return (
    <div>
      {data.map((data) => {
        return (
          <div className="flex gap-5 p-5" key={data.name}>
            <FaUserAlt />
            <h1>{data.name}</h1>
          </div>
        );
      })}
    </div>
  );
}
