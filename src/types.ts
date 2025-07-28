export type IssueStatus = 'Backlog' | 'In Progress' | 'Done';
export type IssuePriority = 'low' | 'medium' | 'high';
export type IssueSeverity = 1 | 2 | 3 | 4 | 5;
export type SortOption = "priority" | "newest" | "oldest";
export interface Issue {
    "id": string,
    "title": string,
    "status": IssueStatus,
    "priority": IssuePriority,
    "severity": IssueSeverity,
    "createdAt": string,
    "assignee": string,
    "tags": string[],
    "userDefinedRank":number,
}


export type FilterOption = {
  tags: string;
  assignees: string;
};
export interface ToolbarContextType {
  sortingOption: SortOption;
  setSortingOption: (value: SortOption) => void;
  searchBoxText: string;
  setSearchBoxText: (value: string) => void;
  filterOption: FilterOption;
  setFilterOption: (value: FilterOption) => void;
  issues: Issue[];
  setIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
  getIssueById: (id: string) => Issue | undefined;
  updateIssue: (updatedIssue: Issue) => void;
  recentAccessed:Issue[];
  updateRecentAccessed:(recentIssue:Issue)=>void;
}