import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function UserView() {
  return (
    <div>
      <Navbar />
      <div>User view</div>
      <button>My details</button>
      <button>
        <Link to={"UserViewEvents"}>View events</Link>
      </button>
    </div>
  );
}
