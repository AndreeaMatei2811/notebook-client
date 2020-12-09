import React from "react";
import { Container, Jumbotron } from "react-bootstrap";

export default function NotebookHeader({ header, subheader }) {
  return (
    <Jumbotron>
      <Container>
        <h1>{header}</h1>
        <p>{subheader}</p>
      </Container>
    </Jumbotron>
  );
}
