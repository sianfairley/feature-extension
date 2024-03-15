import { Link } from "react-router-dom";
import LogOut from "./Logout";

export default function Navbar() {
  return (
    <div>
      <button>
        <Link to={"/"} className="navbar-link">
          {" "}
          Home
        </Link>
      </button>

      <LogOut />
    </div>
  );
}
