import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <span>
        <Link to={"/"} className="navbar-link">
          Home
        </Link>
      </span>
    </div>
  );
}
