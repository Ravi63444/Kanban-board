import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import { IssueDetailPage } from "./pages/IssueDetailPage";
import { SettingsPage } from "./pages/SettingsPage";
import Navigation from "./components/Navigation";
import "./App.css";
import { ToolboxProvider } from "./Store/StoreContext";
import Toolbar from "./components/Toolbar";

export const App = () => {
  return (
    <Router>
      <ToolboxProvider>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Navigation />
          <Toolbar />
          <div style={{ flex: 1, minHeight: 0 }}>
            <Routes>
              <Route path="/board" element={<BoardPage />} />
              <Route path="/issue/:id" element={<IssueDetailPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/board" />} />
            </Routes>
          </div>
        </div>
      </ToolboxProvider>
    </Router>
  );
};
