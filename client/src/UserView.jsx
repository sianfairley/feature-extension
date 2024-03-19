import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function UserView() {
  return (
    <div>
      <Navbar />
      <button>My details</button>

      <Link to="/UserViewEvents">
        <button>View events </button>
      </Link>
    </div>
  );
}
