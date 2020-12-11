import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
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
    <Card style={{ width: "20rem", height: "16rem", margin: "15px" }}>
      <Typography variant="h4" style={{ margin: 20 }}>
        {notebookName}
      </Typography>
      <CardContent>
        <div>
          {imageUrl ? (
            <img
              style={{ height: "1.5rem", width: "1.5rem", margin: 20 }}
              src={imageUrl}
              alt="profile"
            />
          ) : null}
          {userName}
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
