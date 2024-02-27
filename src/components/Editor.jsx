// Import necessary modules from React and styling for the markdown editor.
import React from "react";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
// Import Showdown to convert markdown into HTML.
import Showdown from "showdown";

// Define a functional component named 'Editor' that receives 'tempNoteText' and 'setTempNoteText' as props.
export default function Editor({ tempNoteText, setTempNoteText }) {
  // State hook for managing the currently selected tab in the editor ('write' or 'preview').
  const [selectedTab, setSelectedTab] = React.useState("write");

  // Create a new instance of Showdown.Converter to enable markdown to HTML conversion with some options enabled.
  const converter = new Showdown.Converter({
    tables: true, // Enable markdown tables.
    simplifiedAutoLink: true, // Automatically convert URLs into links.
    strikethrough: true, // Enable strikethrough syntax.
    tasklists: true, // Enable task list syntax.
  });

  // Render the component.
  return (
    <section className="pane editor">
      {/* ReactMde component for Markdown editing with various props configured. */}
      <ReactMde
        value={tempNoteText} // The current text of the note.
        onChange={setTempNoteText} // Function to call when the text changes, updating the state in the parent component.
        selectedTab={selectedTab} // The currently selected tab ('write' or 'preview').
        onTabChange={setSelectedTab} // Function to update the state when the tab changes.
        generateMarkdownPreview={(markdown) =>
          // A function to convert the markdown text to HTML for preview. It returns a promise that resolves to the HTML string.
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={80} // Minimum height of the editor component.
        heightUnits="vh" // Height unit for the editor, 'vh' represents a percentage of the viewport height.
      />
    </section>
  );
}
