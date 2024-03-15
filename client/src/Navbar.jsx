import { Link } from "react-router-dom";
import LogOut from "./Logout";

export default function Navbar() {
  return (
    <div>
      <span>
        <Link to={"/"} className="navbar-link">
          Home
        </Link>
      </span>
      <LogOut />
    </div>
  );
}
