import { useDroppable } from "@dnd-kit/core";
import { Issue } from "../types";
import TaskItem from "./TaskItem";

interface TasksProps {
  issueStatus: string;
  issues: Issue[];
  changeProgress: (id: string, action: string) => void;
  savingFlag: boolean;
}
const Tasks = ({
  issues,
  issueStatus,
  changeProgress,
  savingFlag,
}: TasksProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: issueStatus,
  });
  return (
    <div
      style={{
        flex: 1,
        border: "1px solid",
        borderColor: isOver ? "blue" : "#ccc",
        backgroundColor: isOver ? "#e0ffe0" : "#f4f4f4",
      }}
      ref={setNodeRef}
    >
      <div
        style={{
          height: "40px",
          backgroundColor: "grey",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h5>{issueStatus}</h5>
      </div>
      <div style={{ padding: 5 }}>
        {issues.map((data: Issue) => {
          return (
            <TaskItem
              key={data.id}
              taskData={data}
              issueStatus={issueStatus}
              changeProgress={changeProgress}
              savingFlag={savingFlag}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Tasks;
