import React from "react";
import "./NoteViewer.css";

// PUBLIC_INTERFACE
export default function NoteViewer({ note, onEdit, onDelete }) {
  if (!note) return null;
  return (
    <div className="NoteViewer">
      <div className="NoteViewerHeader">
        <h2 className="NoteViewerTitle">{note.title || "Untitled Note"}</h2>
        <div className="NoteViewerActions">
          <button className="BtnSecondary" onClick={onEdit}>Edit</button>
          <button className="BtnDanger" onClick={onDelete}>Delete</button>
        </div>
      </div>
      <div className="NoteViewerBody">
        <pre>{note.body}</pre>
      </div>
      <div className="NoteViewerMeta">
        <span>
          Created: {new Date(note.created).toLocaleString()}
        </span>
        <span>
          Last updated: {new Date(note.updated).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
