import React from "react";
import "./NotesSidebar.css";

// PUBLIC_INTERFACE
export default function NotesSidebar({ notes, selectedId, onSelect, onCreate }) {
  return (
    <aside className="NotesSidebar" aria-label="List of Notes">
      <div className="NotesSidebarHeader">
        <h2>Notes</h2>
        <button className="BtnPrimary" onClick={onCreate} title="New Note">
          ＋
        </button>
      </div>
      <ul className="NotesList">
        {notes.length === 0 && (
          <li className="NotesSidebarEmpty">No notes</li>
        )}
        {notes.map((note) => (
          <li
            key={note.id}
            className={`NotesListItem${note.id === selectedId ? " selected" : ""}`}
            onClick={() => onSelect(note.id)}
            tabIndex={0}
            aria-current={note.id === selectedId}
          >
            <strong className="NotesListItemTitle">
              {note.title || "Untitled Note"}
            </strong>
            <span className="NotesListItemDate">
              {new Date(note.updated || note.created).toLocaleDateString()}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
