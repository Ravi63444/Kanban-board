import { useDraggable } from "@dnd-kit/core";
import { IssueStatusEnum } from "../constants/commonConstants";
import { Issue } from "../types";
import { Link } from "react-router-dom";

interface TaskItemProps {
  taskData: Issue;
  issueStatus: string;
  changeProgress: (id: string, action: string) => void;
  savingFlag: boolean;
}
const TaskItem = ({
  taskData,
  issueStatus,
  changeProgress,
  savingFlag,
}: TaskItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: taskData.id,
  });
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    padding: "8px",
    marginBottom: "8px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "grab",
  };
  return (
    <Link
      key={taskData.id}
      to={`/issue/${taskData.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        key={taskData.id}
        style={style}
        {...attributes}
        {...listeners}
        ref={setNodeRef}
      >
        {issueStatus !== IssueStatusEnum.Backlog && (
          <button
            onPointerDown={(e) => e.stopPropagation()}
            disabled={savingFlag}
            onClick={() => changeProgress(taskData.id, "back")}
            style={{
              backgroundColor: "#eee",
              border: "none ",
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            &larr;
          </button>
        )}
        {taskData.title}
        {issueStatus !== IssueStatusEnum.Done && (
          <button
            onPointerDown={(e) => e.stopPropagation()}
            disabled={savingFlag}
            onClick={() => changeProgress(taskData.id, "forward")}
            style={{
              border: "none ",
              height: "30px",
              width: "30px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            &rarr;
          </button>
        )}
      </div>
    </Link>
  );
};
export default TaskItem;
