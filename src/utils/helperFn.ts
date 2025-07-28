import { FilterOption, Issue } from "../types";

export function calculatePriorityScore(data:Issue): number {
  const severityScore = data.severity * 10;
  const createdDate = new Date(data.createdAt);
  const now = new Date();
  const daysSinceCreated = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  const userDefinedRank = data.userDefinedRank ?? 0;

  return severityScore + (-1 * daysSinceCreated) + userDefinedRank;
}

export function applyFilters(issues: Issue[], searchText: string, filter: FilterOption) {
  return issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchText.toLowerCase()) ||
      issue.tags.some((tag) => tag.toLowerCase().includes(searchText.toLowerCase()));

    const matchesTags =
      !filter.tags || issue.tags.includes(filter.tags);

    const matchesAssignees =
      !filter.assignees || issue.assignee === filter.assignees;

    return matchesSearch && matchesTags && matchesAssignees;
  });
}

export function applySorting(issues: Issue[], sortingOption: string) {
  const sorted = [...issues];
  if (sortingOption === "priority") {
    sorted.sort((a, b) => {
      const scoreA = calculatePriorityScore(a);
      const scoreB = calculatePriorityScore(b);
      return scoreB !== scoreA
        ? scoreB - scoreA
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } else if (sortingOption === "newest") {
    sorted.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (sortingOption === "oldest") {
    sorted.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }
  return sorted;
}


