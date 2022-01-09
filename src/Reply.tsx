import React, { useState } from "react";
import { CommentType } from "./type";

export const Reply = ({
  comment,
  handleAddReply,
}: {
  comment: CommentType;
  handleAddReply: (targetedComment: CommentType, replyContent: string) => void;
}) => {
  const [replyValue, setReplyValue] = useState<string>("");

  return (
    <div style={{ paddingLeft: 30 }}>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p
            style={{
              marginRight: 10,
              marginLeft: 10,
              color: "red",
            }}
          >
            Reply
          </p>
          <input
            type="text"
            value={replyValue}
            onChange={(event) => setReplyValue(event.target.value)}
          />
          <button
            onClick={() => {
              handleAddReply(comment, replyValue);
              setReplyValue("");
            }}
            disabled={replyValue === ""}
          >
            Add Reply
          </button>
        </div>
        {comment.replies.map((reply) => (
          <div style={{ display: "flex", alignItems: "center" }} key={reply.id}>
            <p style={{ marginRight: 10 }}>{reply.content}</p>
            {reply.content !== "" && <button>{reply.likeCount}</button>}
          </div>
        ))}
        <hr />
      </div>
    </div>
  );
};

export default Reply;
