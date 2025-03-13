import { Link } from "react-router-dom";

function Authenticate() {
  return (
    <>
      <Link to="/signup">Register</Link>
      <Link to="/login">Login</Link>
    </>
  );
}
export default Authenticate;
