import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { notesCollection, db } from "../firebase";

export default function App() {
  // State hooks for managing notes, the current note ID, and temporary note text for the editor.
  const [notes, setNotes] = React.useState([]);
  const [currentNoteId, setCurrentNoteId] = React.useState("");
  const [tempNoteText, setTempNoteText] = React.useState("");

  // Find the current note based on the currentNoteId or default to the first note.
  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

  // Sort notes by their updatedAt timestamp to show the most recently updated notes first.
  const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt);

  // Effect hook to listen for changes in the Firestore collection and update local state.
  React.useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
      const notesArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(notesArr);
    });
    return unsubscribe; // Cleanup function to unsubscribe from the snapshot listener.
  }, []);

  // Effect hook to set the current note ID to the first note's ID when notes are loaded or updated.
  React.useEffect(() => {
    if (!currentNoteId && notes.length > 0) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes]);

  // Effect hook to update the temporary note text in the editor when the current note changes.
  React.useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.body);
    }
  }, [currentNote]);

  // Effect hook to debounce note updates to Firestore, triggering an update after typing has paused for 500ms.
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentNote && tempNoteText !== currentNote.body) {
        updateNote(tempNoteText);
      }
    }, 500);
    return () => clearTimeout(timeoutId); // Cleanup function to clear the timeout.
  }, [tempNoteText, currentNote]);

  // Function to create a new note in Firestore and set it as the current note.
  async function createNewNote() {
    // New note object with placeholders for body and timestamps.
    const newNote = {
      body: "# Type your markdown note's title here",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    // Add the new note to Firestore and set its ID as the current note ID.
    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  }

  // Function to update the current note's body and updatedAt timestamp in Firestore.
  async function updateNote(text) {
    const docRef = doc(db, "notes", currentNoteId);
    await setDoc(
      docRef,
      { body: text, updatedAt: Date.now() },
      { merge: true }
    );
  }

  // Function to delete a note from Firestore based on its ID.
  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId);
    await deleteDoc(docRef);
  }

  // The JSX layout for the application, using `react-split` for a resizable sidebar and editor, and handling the case where there are no notes.
  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={sortedNotes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          <Editor
            tempNoteText={tempNoteText}
            setTempNoteText={setTempNoteText}
          />
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
