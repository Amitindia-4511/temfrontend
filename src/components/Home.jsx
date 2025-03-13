// import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { TextHoverEffect } from "./ui/Home-ui-effect";
function Home() {
  return (
    <div className="flex flex-col content-center items-center justify-center">
      <TextHoverEffect text="AMIT" />
      <div>
        <Link to="/signup" className="btn btn-accent m-3 min-w-28">
          Register
        </Link>
        <Link to="/login" className="btn btn-secondary m-3 min-w-28">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Home;
