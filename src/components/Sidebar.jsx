// Define a functional component named 'Sidebar' that takes props as its argument.
export default function Sidebar(props) {
  // Map through the 'notes' array passed in via props to generate note elements.
  // For each note, a div is created with a unique key derived from the note's id.
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      {/* Each note has a title that can be clicked. The title's style changes if it is the currently selected note.
          onClick for the title div sets the current note id to the clicked note's id. */}
      <div
        className={`title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        }`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        {/* Display the first line of the note's body as the note title. */}
        <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
        {/* A button to delete the note. It stops the click event from propagating to avoid selecting the note when attempting to delete it. */}
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            props.deleteNote(note.id);
          }}
        >
          {/* Icon for the delete button. */}
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
    </div>
  ));

  // Return the JSX for the sidebar, including a header with a title and a button to add new notes,
  // followed by the list of note elements generated above.
  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        {/* Button to create a new note. */}
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      {/* Render the generated note elements within the sidebar. */}
      {noteElements}
    </section>
  );
}
