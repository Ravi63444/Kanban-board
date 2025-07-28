import { Link } from "react-router-dom";
import { Issue } from "../types";
import { useStore } from "../Store/StoreContext";
import "./Sidebar.css";
const Sidebar = () => {
  const { recentAccessed } = useStore();

  return (
    <div className="sidebarWrapper">
      <h2 className="sidebarHeader">Recently Accessed</h2>
      <ul className="space-y-2">
        {recentAccessed.map((issue: Issue) => (
          <li key={issue.id}>
            <Link to={`/issue/${issue.id}`} className="recentIssue-className">
              {issue.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;
