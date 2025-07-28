import { Link } from "react-router-dom";
import "./Navigation.css";
const Navigation = () => {
  return (
    <nav
      style={{
        padding: "1rem",
        background: "#eee",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Link to="/board" className="pageHeader">
        Dashboard
      </Link>
      <Link to="/settings">Settings</Link>
    </nav>
  );
};
export default Navigation;
