import React from "react";
import "./TopNav.css";

// PUBLIC_INTERFACE
export default function TopNav({ onCreateNote, theme, toggleTheme }) {
  return (
    <header className="TopNav">
      <h1 className="TopNavTitle">My Notes</h1>
      <nav className="TopNavActions">
        <button className="BtnPrimary" onClick={onCreateNote} title="New Note">
          ＋ New
        </button>
        <button className="ThemeToggleBtn" onClick={toggleTheme} title="Toggle Light/Dark Mode">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </nav>
    </header>
  );
}
