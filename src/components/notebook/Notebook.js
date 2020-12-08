import React from "react";
import { Button, Card } from "react-bootstrap";

export default function Notebook(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        {/* <Card.Text></Card.Text> */}
        <Button variant="primary">Check notebook</Button>
      </Card.Body>
    </Card>
  );
}
