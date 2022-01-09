import React, { useState } from "react";
import Comment from "./Comment";
import { nanoid } from "nanoid";
import { ThreadsType, CommentType } from "./type";
import "./App.css";

const Thread = () => {
  const threadsData = [
    {
      id: "u38qgh3hg3",
      content: "Start 2022 with JS Algorithm & Data Structures",
      likeCount: 0,
      comments: [
        {
          id: "tey78ayt7a8eyga",
          content: "Kalau sudah siap berkabar aja ya",
          likeCount: 0,
          replies: [
            {
              id: "gye7a8gy7e8a",
              content: "Oyisam wkwk",
              likeCount: 0,
            },
          ],
        },
      ],
    },
    {
      id: "47847874",
      content: "I don't know what to do",
      likeCount: 0,
      comments: [
        {
          id: "tey78ayt74874a8eyga",
          content: "Sotewe Coyyy",
          likeCount: 0,
          replies: [
            {
              id: "gye7a28278gy7e8a",
              content: "Oyisam wkwk",
              likeCount: 0,
            },
          ],
        },
        {
          id: "tey78ayt7487ddd4a8eyga",
          content: "Yuhuuu epribadeh",
          likeCount: 0,
          replies: [
            {
              id: "gye7a28278gdddy7e8a",
              content: "Awokwowkowok",
              likeCount: 0,
            },
          ],
        },
      ],
    },
  ];

  const [threads, setThreads] = useState<ThreadsType[]>(threadsData);
  const [threadValue, setThreadValue] = useState<string>("");

  const handleLikePost = () => {};

  const handleNewThread = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13 && threadValue !== "") {
      const addThread = [
        {
          id: nanoid(),
          content: threadValue,
          likeCount: 0,
          comments: [],
        },
      ];
      setThreads([...threads, ...addThread]);
      setThreadValue("");
    }
  };

  const handleDeleteThread = (threadId: string) => {
    setThreads(threads.filter((thread) => thread.id !== threadId));
  };

  const handleNewComment = (
    targetThread: ThreadsType,
    commentContent: string
  ) => {
    const newCreatedComment = {
      id: nanoid(),
      content: commentContent,
      likeCount: 0,
      replies: [
        {
          id: nanoid(),
          content: "",
          likeCount: 0,
        },
      ],
    };

    const threadComments = [...targetThread.comments, newCreatedComment];

    const newThreads = [...threads];
    const threadToBeUpdated = newThreads.findIndex(
      (thread) => thread.id === targetThread.id
    );

    newThreads[threadToBeUpdated] = {
      ...targetThread,
      comments: threadComments,
    };

    setThreads(newThreads);
  };

  const handleNewReply = (
    targetedComment: CommentType,
    replyContent: string
  ) => {
    const newCreatedReply = {
      id: nanoid(),
      content: replyContent,
      likeCount: 0,
    };

    const updatedReplies = [...targetedComment.replies, newCreatedReply];

    // Copy existing comment
    const getTheComment = threads.map((thread) => {
      return thread.comments.find(
        (comment) => comment.id === targetedComment.id
      );
    });

    // Get the index of the comment
    const commentToBeUpdated = getTheComment.findIndex(
      (comment) => comment?.id === targetedComment.id
    );

    // Update the comment based on the index
    getTheComment[commentToBeUpdated] = {
      ...targetedComment,
      replies: updatedReplies,
    };

    // Final Comment
    const newCreatedComment = getTheComment[commentToBeUpdated];
    if (!newCreatedComment) return;

    // Find the targeted thread
    const updatedThread = threads.filter((thread) => {
      return thread.comments.includes(targetedComment);
    });

    // Find the index of comment that needs to be updated of the whole comment
    const getCommentIndex = updatedThread[0].comments.findIndex(
      (comment) => comment.id === targetedComment.id
    );

    // Assign the value of old comment with the new ones
    updatedThread[0].comments[getCommentIndex] = newCreatedComment;

    // Copy Existing thread
    const currentThread = [...threads];

    // Find the targeted thread
    const getTheThreadIndex = threads.findIndex(
      (thread) => thread.id === updatedThread[0].id
    );

    // Assign the old thread with the new ones
    currentThread[getTheThreadIndex] = updatedThread[0];

    setThreads(currentThread);
  };

  return (
    <div>
      <div className="App">
        <input
          type="text"
          style={{ height: 40, width: 300, marginRight: 10 }}
          value={threadValue}
          onChange={(event) => setThreadValue(event.target.value)}
          onKeyDown={handleNewThread}
        />
      </div>

      <div
        style={{
          marginTop: "40px",
          width: 820,
          paddingBottom: 60,
        }}
      >
        <div
          style={{
            border: "3px solid #00B5D8",
            borderRadius: 10,
            padding: 16,
            marginTop: 20,
          }}
        >
          {threads.map((thread, index) => (
            <div key={thread.id}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h1 style={{ marginRight: 10 }}>{thread.content}</h1>
                <button onClick={handleLikePost}>{thread.likeCount}</button>
              </div>

              <div style={{ paddingBottom: 20 }}>
                <button
                  onClick={() => {
                    handleDeleteThread(thread.id);
                  }}
                  style={{
                    background: "red",
                    color: "white",
                    padding: 6,
                    fontWeight: "bold",
                  }}
                >
                  Delete This Thread
                </button>
              </div>

              <Comment
                thread={thread}
                handleAddComment={handleNewComment}
                handleNewReply={handleNewReply}
              />

              <hr style={{ border: "4px solid #ED64A6" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Thread;
