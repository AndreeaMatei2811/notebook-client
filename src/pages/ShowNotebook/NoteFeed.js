import React from "react";
import { Card } from "react-bootstrap";
import { selectSpecificNotebook } from "../../store/Notebooks/selectors";

export default function NoteFeed({ title, content, date, type }) {
  return (
    <Card style={{ margin: "10px" }}>
      <Card.Header>{title}</Card.Header>
      <Card.Text>{content}</Card.Text>
      <Card.Footer>{new Date(date).toDateString()}</Card.Footer>
    </Card>
  );
}
