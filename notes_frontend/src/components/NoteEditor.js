import React, { useState } from "react";
import "./NoteEditor.css";

// PUBLIC_INTERFACE
export default function NoteEditor({ note, onSave, onCancel, saveLabel }) {
  const [title, setTitle] = useState(note ? note.title : "");
  const [body, setBody] = useState(note ? note.body : "");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() && !body.trim()) {
      alert("A note cannot be empty.");
      return;
    }
    onSave({
      ...note,
      title: title.trim(),
      body: body.trim(),
    });
  }

  return (
    <form className="NoteEditor" onSubmit={handleSubmit}>
      <input
        className="NoteTitleInput"
        type="text"
        value={title}
        placeholder="Note title"
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        maxLength={80}
        aria-label="Note Title"
      />
      <textarea
        className="NoteBodyInput"
        value={body}
        placeholder="Start typing your note..."
        onChange={(e) => setBody(e.target.value)}
        rows={10}
        aria-label="Note Body"
      />
      <div className="NoteEditorActions">
        <button type="submit" className="BtnPrimary">{saveLabel || "Save"}</button>
        <button type="button" className="BtnSecondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
