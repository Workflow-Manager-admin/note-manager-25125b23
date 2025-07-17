import React, { useState, useEffect } from "react";
import "./App.css";
import NotesSidebar from "./components/NotesSidebar";
import NoteEditor from "./components/NoteEditor";
import NoteViewer from "./components/NoteViewer";
import TopNav from "./components/TopNav";

// Utility for localstorage, can be replaced with API later
function getStoredNotes() {
  // PUBLIC_INTERFACE
  const notes = localStorage.getItem("user-notes");
  if (!notes) return [];
  try {
    return JSON.parse(notes);
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
function saveNotes(notes) {
  localStorage.setItem("user-notes", JSON.stringify(notes));
}

// PUBLIC_INTERFACE
export default function App() {
  // Notes is an array: { id, title, body, created, updated }
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [mode, setMode] = useState("view"); // 'view' | 'edit' | 'new'
  const [theme, setTheme] = useState("light");

  // Effect to load notes from localstorage on mount
  useEffect(() => {
    setNotes(getStoredNotes());
  }, []);

  // Effect to store notes changes
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // Effect to handle theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const handleCreateNote = () => {
    setMode("new");
    setSelectedNoteId(null);
  };

  // PUBLIC_INTERFACE
  const handleSaveNote = (note) => {
    let updatedNotes;
    if (mode === "new") {
      const newNote = {
        ...note,
        id: Date.now().toString(),
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      };
      updatedNotes = [newNote, ...notes];
      setSelectedNoteId(newNote.id);
      setMode("view");
    } else if (mode === "edit") {
      updatedNotes = notes.map((n) =>
        n.id === note.id ? { ...note, updated: new Date().toISOString() } : n
      );
      setSelectedNoteId(note.id);
      setMode("view");
    }
    setNotes(updatedNotes);
  };

  // PUBLIC_INTERFACE
  const handleEditNote = (noteId) => {
    setSelectedNoteId(noteId);
    setMode("edit");
  };

  // PUBLIC_INTERFACE
  const handleDeleteNote = (noteId) => {
    if (!window.confirm("Delete this note? This cannot be undone.")) return;
    setNotes(notes.filter((n) => n.id !== noteId));
    // If the current deleted note is selected, show next note or none
    if (selectedNoteId === noteId) {
      const next = notes.find((n) => n.id !== noteId);
      setSelectedNoteId(next ? next.id : null);
      setMode("view");
    }
  };

  // PUBLIC_INTERFACE
  const handleSelectNote = (noteId) => {
    setSelectedNoteId(noteId);
    setMode("view");
  };

  // PUBLIC_INTERFACE
  const getSelectedNote = () =>
    notes.find((note) => note.id === selectedNoteId) || null;

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  return (
    <div className="NotesAppRoot">
      <TopNav onCreateNote={handleCreateNote} theme={theme} toggleTheme={toggleTheme} />
      <div className="NotesMain">
        <NotesSidebar
          notes={notes}
          selectedId={selectedNoteId}
          onSelect={handleSelectNote}
          onCreate={handleCreateNote}
        />

        <div className="NotesContent">
          {mode === "new" && (
            <NoteEditor
              saveLabel="Create"
              onSave={handleSaveNote}
              onCancel={() => setMode("view")}
              note={null}
            />
          )}
          {mode === "edit" && getSelectedNote() && (
            <NoteEditor
              saveLabel="Save"
              onSave={handleSaveNote}
              onCancel={() => setMode("view")}
              note={getSelectedNote()}
            />
          )}
          {mode === "view" && getSelectedNote() && (
            <NoteViewer
              note={getSelectedNote()}
              onEdit={() => handleEditNote(selectedNoteId)}
              onDelete={() => handleDeleteNote(selectedNoteId)}
            />
          )}
          {mode === "view" && !getSelectedNote() && (
            <div className="NotesEmptyState">
              <p>No note selected.</p>
              <button className="BtnPrimary" onClick={handleCreateNote}>Create your first note</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
