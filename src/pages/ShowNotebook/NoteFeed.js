import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from "@material-ui/core";
import React from "react";
import RenderNoteEditor from "../../components/Notes/RenderNoteEditor";

export default function NoteFeed({ title, content, date, type }) {
  return (
    <div>
      <Card style={{ margin: "10px" }}>
        <CardContent>
          <Typography variant="subtitle1">{title}</Typography>
          <div className="textnotes_note">
            <RenderNoteEditor content={content} />
          </div>
          <div>
            <Typography>
              {new Date(date).toDateString()}
              <span style={{ marginLeft: "15px" }}>
                {" "}
                <Chip label={type} />
              </span>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
