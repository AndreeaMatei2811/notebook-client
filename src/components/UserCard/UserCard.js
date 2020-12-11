import {
  Avatar,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import React from "react";

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
      style={{
        width: "22rem",
        height: "16rem",
        margin: "15px",
        paddingTop: 10,
      }}
    >
      <Typography variant="h4" style={{ marginLeft: 20 }}>
        {name}
      </Typography>
      <CardContent>
        <div>
          {imageUrl ? (
            <Avatar style={{ marginLeft: 20 }} src={imageUrl} alt="profile" />
          ) : null}
          <div style={{ marginLeft: 20 }}>{createdAt}</div>
        </div>
        <Button
          style={{ margin: "10px" }}
          onClick={() => onClickRedirect()}
          size="sm"
          color="primary"
          variant="contained"
        >
          Check out {`${type}`}
        </Button>
        <div style={{ margin: "10px" }}>{createdAt}</div>
      </CardContent>
    </Card>
  );
}
