import React from "react";
import { Button, Card } from "react-bootstrap";

export default function Notebook({ type, name, imageUrl, createdAt }) {
  return (
    <Card
      bg="Light"
      style={{ width: "18rem", height: "10rem", margin: "10px" }}
      className="mb-2"
    >
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Text>
          {imageUrl ? (
            <Card.Img
              style={{ height: "2rem", width: "auto" }}
              src={imageUrl}
              alt="profile"
            />
          ) : null}
          {createdAt}
        </Card.Text>
        <Button variant="primary">Check out {`${type}`}</Button>
      </Card.Body>
    </Card>
  );
}
