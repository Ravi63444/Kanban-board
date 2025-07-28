import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../Store/StoreContext";
import "./IssueDetailPage.css"; // Optional for custom styling
import { Issue } from "../types";

export const IssueDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getIssueById, updateIssue, updateRecentAccessed } = useStore();
  const issue = getIssueById(id as string);

  useEffect(() => {
    issue && updateRecentAccessed(issue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issue]);

  const gotoHomePage = () => {
    navigate("/board");
  };
  const markAsResolved = (issue: Issue) => {
    const updatedIssue = { ...issue };
    updatedIssue.status = "Done";
    updateIssue(updatedIssue);
    gotoHomePage();
  };

  if (!issue) {
    return (
      <div className="container">
        <h2>Issue not found</h2>
        <button onClick={gotoHomePage}>Go Back</button>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="header">
        <h1>{issue.title}</h1>
        {issue && issue.status === "In Progress" && (
          <button
            className="resolved-Btn"
            onClick={() => markAsResolved(issue)}
          >
            Mark as Resolved
          </button>
        )}
      </div>
      <hr />
      <div className="field">
        <strong>Priority:</strong>
        <span className={`pill ${issue.priority}`}>{issue.priority}</span>
      </div>

      <div className="field">
        <strong>Status:</strong>
        <span className="pill">{issue.status}</span>
      </div>

      {issue.assignee && (
        <div className="field">
          <strong>Assignee:</strong>
          <span>{issue.assignee}</span>
        </div>
      )}

      {issue.tags?.length > 0 && (
        <div className="field">
          <strong>Tags:</strong>
          <div className="tag-list">
            {issue.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="field">
        <strong>Created At:</strong>
        <span>{new Date(issue.createdAt).toLocaleString()}</span>
      </div>

      <button className="back-btn" onClick={() => navigate("/board")}>
        Back to Board
      </button>
    </div>
  );
};
