// src/context/SortContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FilterOption, Issue, SortOption, ToolbarContextType } from "../types";
import { mockFetchIssues } from "../utils/api";

const ToolboxContext = createContext<ToolbarContextType | undefined>(undefined);

export const ToolboxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sortingOption, setSortingOption] = useState<SortOption>("priority");
  const [searchBoxText, setSearchBoxText] = useState<string>("");
  const [filterOption, setFilterOption] = useState<FilterOption>({
    tags: "",
    assignees: "",
  });
  const [issues, setIssues] = useState<Issue[]>([]);
  const [recentAccessed, setRecentAccessed] = useState<Issue[]>([]);

  // Optional localStorage persistence
  useEffect(() => {
    const loadIssues = async () => {
      const local = localStorage.getItem("issues");
      const localRecent = localStorage.getItem("recentIssues");
      const parsed = local ? JSON.parse(local) : null;
      const parsedRecent = localRecent ? JSON.parse(localRecent) : null;
      if (Array.isArray(parsed) && parsed.length > 0) {
        setIssues(parsed);
      } else {
        const response: Issue[] = (await mockFetchIssues()) as Issue[];
        setIssues(response);
        localStorage.setItem("issues", JSON.stringify(response));
      }
      Array.isArray(parsedRecent) &&
        parsedRecent.length > 0 &&
        setRecentAccessed(parsedRecent);
    };
    loadIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    issues?.length > 0 &&
      localStorage.setItem("issues", JSON.stringify(issues));
  }, [issues]);

  useEffect(() => {
    recentAccessed?.length > 0 &&
      localStorage.setItem("recentIssues", JSON.stringify(recentAccessed));
  }, [recentAccessed]);

  const getIssueById = useCallback(
    (id: string) => issues.find((issue) => issue.id === id),
    [issues]
  );

  const updateIssue = useCallback((updatedIssue: Issue) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === updatedIssue.id ? { ...updatedIssue } : issue
      )
    );
  }, []);
  const updateRecentAccessed = useCallback((recentIssue: Issue) => {
    setRecentAccessed((prev) => {
      const existing = prev.filter((i) => i.id !== recentIssue.id);
      const updated = [recentIssue, ...existing];
      return updated.slice(0, 5); // Max 5
    });
  }, []);
  const contextValue = useMemo(
    () => ({
      sortingOption,
      setSortingOption,
      searchBoxText,
      setSearchBoxText,
      filterOption,
      setFilterOption,
      issues,
      setIssues,
      getIssueById,
      updateIssue,
      recentAccessed,
      updateRecentAccessed,
    }),
    [
      sortingOption,
      searchBoxText,
      filterOption,
      issues,
      getIssueById,
      updateIssue,
      recentAccessed,
      updateRecentAccessed,
    ]
  );
  return (
    <ToolboxContext.Provider value={contextValue}>
      {children}
    </ToolboxContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(ToolboxContext);
  if (!context)
    throw new Error("useSort must be used within a ToolboxProvider");
  return context;
};
