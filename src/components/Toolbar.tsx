import { useEffect, useState } from "react";
import { useStore } from "../Store/StoreContext";
import { SortOption } from "../types";
import {
  allAssignees,
  allTags,
  priorities,
} from "../constants/commonConstants";
const Toolbar = () => {
  const {
    sortingOption,
    setSortingOption,
    setSearchBoxText,
    filterOption,
    setFilterOption,
  } = useStore();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearchBoxText(inputValue);
    }, 300);
    return () => clearTimeout(debounce);
  }, [inputValue, setSearchBoxText]);

  const onSortChange = (value: SortOption) => {
    setSortingOption(value);
  };

  return (
    <div
      style={{
        padding: "10px 20px",
        backgroundColor: "#f9f9f9",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
      }}
    >
      <input
        type="search"
        placeholder="Search by title or tag"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{
          padding: "6px 10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "200px",
        }}
      />
      <div>
        <label style={{ marginRight: "0.5rem", fontWeight: "bold" }}>
          Filter by Tag:
        </label>
        <select
          value={filterOption.tags}
          onChange={(e) =>
            setFilterOption({
              ...filterOption,
              tags: e.target.value === "none" ? "" : e.target.value,
            })
          }
        >
          <option value="none">None</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ marginRight: "0.5rem", fontWeight: "bold" }}>
          Filter by Assignee:
        </label>
        <select
          value={filterOption.assignees}
          onChange={(e) =>
            setFilterOption({
              ...filterOption,
              assignees: e.target.value === "none" ? "" : e.target.value,
            })
          }
        >
          <option value="none">None</option>
          {allAssignees.map((assignee) => (
            <option key={assignee} value={assignee}>
              {assignee}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label style={{ marginRight: "0.5rem", fontWeight: "bold" }}>
          Sort:
        </label>
        <select
          value={sortingOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          style={{
            padding: "6px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          {priorities.map((priority: string) => {
            return <option value={priority}>{priority}</option>;
          })}
        </select>
      </div>
    </div>
  );
};
export default Toolbar;
