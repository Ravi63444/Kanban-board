import { useDraggable } from "@dnd-kit/core";
import { IssueStatusEnum } from "../constants/commonConstants";
import { Issue } from "../types";
import { Link } from "react-router-dom";
import "../pages/Board.css";
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
    display: "flex",
    justifyContent: "space-between",
  };
  return (
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
          className="navBtn"
          // style={{
          //   backgroundColor: "#eee",
          //   border: "none ",
          //   height: "30px",
          //   width: "30px",
          //   borderRadius: "50%",
          //   cursor: "pointer",
          // }}
        >
          &larr;
        </button>
      )}
      <Link
        key={taskData.id}
        to={`/issue/${taskData.id}`}
        className="issueDetails"
        // style={{
        //   textDecoration: "none",
        //   color: "inherit",
        //   width: "80%",
        //   border: "1px solid",
        //   borderRadius: "4px",
        //   display: "flex",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   padding: "10px 0",
        // }}
      >
        {taskData.title}
      </Link>
      {issueStatus !== IssueStatusEnum.Done && (
        <button
          onPointerDown={(e) => e.stopPropagation()}
          disabled={savingFlag}
          onClick={() => changeProgress(taskData.id, "forward")}
          className="navBtn"
          // style={{
          //   border: "none ",
          //   height: "30px",
          //   width: "30px",
          //   borderRadius: "50%",
          //   cursor: "pointer",
          // }}
        >
          &rarr;
        </button>
      )}
    </div>
  );
};
export default TaskItem;
