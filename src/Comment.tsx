import React, { useState } from "react";
import Reply from "./Reply";
import { CommentType, ThreadsType, ReplyType } from "./type";

const Comment = ({
  thread,
  handleAddComment,
  handleNewReply,
}: {
  thread: ThreadsType;
  handleAddComment: (thread: ThreadsType, commentContent: string) => void;
  handleNewReply: (targetedComment: CommentType, replyContent: string) => void;
}) => {
  const [commentValue, setCommentValue] = useState<string>("");

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
        key={thread.id}
      >
        <p style={{ marginRight: 10, marginLeft: 10, color: "red" }}>Comment</p>
        <input
          type="text"
          value={commentValue}
          onChange={(event) => setCommentValue(event.target.value)}
        />
        <button
          onClick={() => {
            handleAddComment(thread, commentValue);
            setCommentValue("");
          }}
          disabled={commentValue === ""}
        >
          Add Comment
        </button>
      </div>

      <hr style={{ border: "2px solid #805AD5" }} />

      <div style={{ paddingLeft: 20 }}>
        {thread.comments.map((comment, index) => (
          <div key={comment.id}>
            <div
              style={{ display: "flex", alignItems: "center" }}
              key={comment.id}
            >
              <p style={{ marginRight: 10 }}>{comment.content}</p>
              <button>{comment.likeCount}</button>
            </div>

            <hr />

            <Reply comment={comment} handleAddReply={handleNewReply} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
