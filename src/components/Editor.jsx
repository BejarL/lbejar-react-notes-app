import { useEffect, useRef } from "react";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css"; // Import EasyMDE styles

export default function Editor({ tempNoteText, setTempNoteText }) {
  const easyMDEEditor = useRef(null);

  useEffect(() => {
    if (!easyMDEEditor.current) return;

    const easyMDE = new EasyMDE({
      element: easyMDEEditor.current,
      initialValue: tempNoteText,
      autoDownloadFontAwesome: false,
      minHeight: "80vh",
      status: false, // Disable the status bar
      toolbar: true, // Enable the toolbar
      spellChecker: false,
      forceSync: true,
      onChange: (instance) => {
        setTempNoteText(instance.value());
      },
    });

    // Clean up
    return () => {
      easyMDE.toTextArea();
      // Removed the line attempting to set easyMDE to null
    };
  }, [setTempNoteText]); // Dependency array includes setTempNoteText to ensure sync

  return (
    <section className="pane editor">
      <textarea ref={easyMDEEditor}></textarea>
    </section>
  );
}
