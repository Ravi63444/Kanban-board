import React, { useEffect, useMemo, useRef, useState } from "react";
import { Issue, IssueStatus } from "../types";
import Tasks from "../components/Tasks";
import { IssueStatusEnum } from "../constants/commonConstants";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useStore } from "../Store/StoreContext";
import { applyFilters, applySorting } from "../utils/helperFn";
import Sidebar from "../components/Sidebar";
const BoardPage = () => {
  const { sortingOption, searchBoxText, filterOption, issues, setIssues } =
    useStore();
  const [savingFlag, setSavingFlag] = useState<boolean>(false);
  const [backupIssues, setBackupIssues] = useState<Issue[]>([]);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const undoTimeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      if (undoTimeoutId.current) clearTimeout(undoTimeoutId.current);
    };
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const draggedTaskId = active?.id as string;
    const newStatus = over?.id as IssueStatus;
    const draggedTaskStatus = issues.find(
      (data: Issue) => data.id === draggedTaskId
    )?.status;

    //preventing unnecessary drops
    if (draggedTaskStatus === newStatus) return;

    clearAllTimeouts();
    const clonedIssues = JSON.parse(JSON.stringify(issues));
    setBackupIssues(clonedIssues);
    setSavingFlag(true);
    setIssues((issues: Issue[]) =>
      issues.map((issue: Issue) =>
        issue.id === draggedTaskId ? { ...issue, status: newStatus } : issue
      )
    );
    undoTimeoutId.current = setTimeout(() => {
      setSavingFlag(false);
    }, 5000);
  };
  const clearAllTimeouts = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
    if (undoTimeoutId.current) {
      clearTimeout(undoTimeoutId.current);
      undoTimeoutId.current = null;
    }
  };
  const changeStatus = (id: string, action: string) => {
    const updatedIssues = issues.map((issue) =>
      issue.id === id
        ? {
            ...issue,
            status:
              issue.status === IssueStatusEnum.InProgress
                ? action === "back"
                  ? IssueStatusEnum.Backlog
                  : IssueStatusEnum.Done
                : IssueStatusEnum.InProgress,
          }
        : issue
    );
    setIssues(updatedIssues);
  };
  const changeProgress = (id: string, action: string) => {
    clearAllTimeouts();
    const clonedIssues = JSON.parse(JSON.stringify(issues));
    setBackupIssues(clonedIssues);
    setSavingFlag(true);
    timeoutId.current = setTimeout(() => {
      changeStatus(id, action);
      timeoutId.current = null;
      undoTimeoutId.current = setTimeout(() => {
        setSavingFlag(false);
      }, 5000);
    }, 500);
  };
  const handleUndo = () => {
    setIssues([...backupIssues]);
    clearAllTimeouts();
    setBackupIssues([]);
    setSavingFlag(false);
  };
  const filteredSorted = useMemo(() => {
    return applySorting(
      applyFilters(issues, searchBoxText, filterOption),
      sortingOption
    );
  }, [issues, searchBoxText, filterOption, sortingOption]);

  const backlog = useMemo(
    () => filteredSorted.filter((i) => i.status === "Backlog"),
    [filteredSorted]
  );
  const inProgress = useMemo(
    () => filteredSorted.filter((i) => i.status === "In Progress"),
    [filteredSorted]
  );
  const done = useMemo(
    () => filteredSorted.filter((i) => i.status === "Done"),
    [filteredSorted]
  );
  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <Sidebar />
      <DndContext onDragEnd={savingFlag ? undefined : handleDragEnd}>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            height: "100%",
            padding: "0 10px",
            justifyContent: "center",
            flex: 1,
          }}
        >
          {savingFlag && (
            <div
              style={{
                backgroundColor: "#333",
                color: "#fff",
                padding: "0.5rem 1rem",
                position: "absolute", // or relative
                bottom: 0,
                left: 0,
                width: "100%",
                textAlign: "center",
              }}
            >
              <span className="spinner" /> Saving...
              <button onClick={handleUndo}>Undo</button>
            </div>
          )}
          <Tasks
            issueStatus={IssueStatusEnum.Backlog}
            issues={backlog}
            changeProgress={changeProgress}
            savingFlag={savingFlag}
          />
          <Tasks
            issueStatus={IssueStatusEnum.InProgress}
            issues={inProgress}
            changeProgress={changeProgress}
            savingFlag={savingFlag}
          />
          <Tasks
            issueStatus={IssueStatusEnum.Done}
            issues={done}
            changeProgress={changeProgress}
            savingFlag={savingFlag}
          />
        </div>
      </DndContext>
    </div>
  );
};
export default BoardPage;
