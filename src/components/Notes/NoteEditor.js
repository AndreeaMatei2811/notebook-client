import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  // convertFromRaw,
  convertToRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addNoteToNotebook } from "../../store/Notebooks/actions";
import "./NoteEditor.scss";

export default function RichEditorExample() {
  const { notebookId } = useParams();
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  function focus() {
    editorRef.current.focus();
  }

  function handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  }

  function mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  function toggleBlockType(blockType) {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  }

  function toggleInlineStyle(inlineStyle) {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  }

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = "RichEditor-editor";
  var contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  }

  const raw = convertToRaw(contentState);
  const rawContent = JSON.stringify(raw);
  const backToRaw = JSON.parse(rawContent);
  console.log("backtoraw", backToRaw);
  console.log("normal raw", raw);
  console.log("rawcontent", rawContent);

  // console.log("displayRaw", rawContent);

  const [noteTitle, setNoteTitle] = useState("");

  function handleTitleChange(event) {
    event.preventDefault();
    setNoteTitle(event.target.value);
  }

  function onSaveButtonClick(title, content) {
    console.log("this note:");
    console.log("what is the title", title);
    console.log("what is the content", content);
    dispatch(addNoteToNotebook(notebookId, title, content));
  }

  return (
    <div className="NoteEditor">
      <div className="RichEditor-root">
        <div className="NoteEditor-noteTitle">
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Note Title"
            value={noteTitle}
            onChange={handleTitleChange}
          />
        </div>
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
        <div className={className} onClick={focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={mapKeyToEditorCommand}
            onChange={setEditorState}
            placeholder="Start typing your note..."
            ref={editorRef}
            spellCheck={true}
          />
        </div>
      </div>
      <div className="saveNoteButton" style={{ margin: 20 }}>
        <Button
          variant="secondary"
          onClick={() => {
            onSaveButtonClick(noteTitle, rawContent);
          }}
        >
          Save Note
        </Button>
      </div>
    </div>
  );
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

function StyleButton(props) {
  const _onToggle = (e) => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  let className = "RichEditor-styleButton";
  if (props.active) {
    className += " RichEditor-activeButton";
  }

  return (
    <span className={className} onMouseDown={_onToggle}>
      {props.label}
    </span>
  );
}

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
