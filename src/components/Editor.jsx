import React from "react";
import PropTypes from "prop-types";
import ReactMde from "react-mde";
import Showdown from "showdown";

const Editor = ({ currentNote, updateNote }) => {
  const [selectedTab, setSelectedTab] = React.useState("write");

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <section className="pane editor">
      <ReactMde
        value={currentNote.body}
        onChange={updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={80}
        heightUnits="vh"
      />
    </section>
  );
};

Editor.propTypes = {
  currentNote: PropTypes.shape({
    body: PropTypes.string.isRequired,
  }).isRequired,
  updateNote: PropTypes.func.isRequired,
};

export default Editor;