import { Link } from "react-router-dom";
// import HomePage from "./HomePage";

export default function Error() {
  return (
    <div>
      <p>
        Oops! We couldn't find that. Let's take you <Link to={"/"}>home.</Link>
      </p>
    </div>
  );
}
