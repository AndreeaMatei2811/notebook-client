import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function Notebook({
  type,
  notebookName,
  imageUrl,
  createdAt,
  userName,
  notebookId,
}) {
  const history = useHistory();

  const onClickRedirect = () => {
    history.push(`/show-notebook/${notebookId}`);
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
        {notebookName}
      </Typography>
      <CardContent>
        <div>
          {imageUrl ? (
            <Avatar style={{ marginLeft: 20 }} src={imageUrl} alt="profile" />
          ) : null}
          <div style={{ marginLeft: 20 }}>{userName}</div>
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
