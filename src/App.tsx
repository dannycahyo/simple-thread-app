import React from "react";
import Thread from "./Thread";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <div>
          <h1>What Are You Thinking About?</h1>
        </div>
      </div>
      <div className="App">
        <Thread />
      </div>
    </>
  );
}

export default App;
