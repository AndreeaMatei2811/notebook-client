import React from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function UserCard({
  type,
  name,
  imageUrl,
  createdAt,
  studentId,
}) {
  const history = useHistory();

  const onClickRedirect = () => {
    history.push(`/notebook/student/${studentId}`);
  };

  return (
    <Card
      bg="Light"
      style={{ width: "18rem", height: "12rem", margin: "10px" }}
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
        <Button onClick={() => onClickRedirect()} variant="primary">
          Check out {`${type}`}
        </Button>
      </Card.Body>
      <Card.Footer style={{ height: "1rem", fontSize: "12px" }}>
        <div style={{ marginTop: "-10px" }}>{createdAt}</div>
      </Card.Footer>
    </Card>
  );
}
