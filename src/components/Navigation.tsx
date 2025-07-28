import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <Link to="/board" style={{ marginRight: "1rem" }}>
        Board
      </Link>
      <Link to="/settings">Settings</Link>
    </nav>
  );
};
export default Navigation;
