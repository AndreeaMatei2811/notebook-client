import React from "react";
import { Card } from "react-bootstrap";
import RenderNoteEditor from "../../components/Notes/RenderNoteEditor";
import { selectSpecificNotebook } from "../../store/Notebooks/selectors";

export default function NoteFeed({ title, content, date, type }) {
  return (
    <Card style={{ margin: "10px" }}>
      <Card.Header>{title}</Card.Header>
      <Card.Text>
        <div className="textnotes_note">
          <RenderNoteEditor content={content} />
        </div>
      </Card.Text>
      <Card.Footer>{new Date(date).toDateString()}</Card.Footer>
    </Card>
  );
}
