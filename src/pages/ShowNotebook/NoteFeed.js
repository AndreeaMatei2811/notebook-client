import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import React from "react";
import RenderNoteEditor from "../../components/Notes/RenderNoteEditor";

export default function NoteFeed({ title, content, date, type }) {
  return (
    <div>
      <Card style={{ margin: "10px" }}>
        <CardHeader>{title}</CardHeader>
        <CardContent>
          <div className="textnotes_note">
            <RenderNoteEditor content={content} />
          </div>
          <div>
            <Typography>{new Date(date).toDateString()}</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
