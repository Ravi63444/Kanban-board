import { Link } from "react-router-dom";
import { Issue } from "../types";
import { useStore } from "../Store/StoreContext";

const Sidebar = () => {
  const { recentAccessed } = useStore();

  return (
    <div style={{ width: "15%" }}>
      <h2 className="text-lg font-semibold mb-4">Recently Accessed</h2>
      <ul className="space-y-2">
        {recentAccessed.map((issue: Issue) => (
          <li key={issue.id}>
            <Link
              to={`/issue/${issue.id}`}
              className="text-sm text-blue-600 hover:underline"
            >
              {issue.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Sidebar;
