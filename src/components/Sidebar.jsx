function Sidebar(PropTypes) {
  const noteElements = PropTypes.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${
          note.id === PropTypes.currentNote.id ? "selected-note" : ""
        }`}
        onClick={() => PropTypes.setCurrentNoteId(note.id)}
      >
        <h4 className="text-snippet">Note {index + 1}</h4>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={PropTypes.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}
export default Sidebar;
