import React, {useState} from "react";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

import "./App.css";

function App() {
  const [typedInTodo, setTypedInTodo] = useState("");
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  function completeTodo(todoIndex) {
    const pendingTask = pendingTodos[todoIndex];
    setCompletedTodos([...completedTodos, pendingTask]);
    deleteTodo(todoIndex, "pending");
  }

  function deleteTodo(todoIndex, targetSection) {
    const targetList = targetSection === "pending" ? pendingTodos : completedTodos;
    const setter = targetSection === "pending" ? setPendingTodos : setCompletedTodos;
    const filteredTodos = targetList.filter((_, index) => todoIndex !== index);
    setter(filteredTodos);
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && typedInTodo.trim()) {
      setPendingTodos([...pendingTodos, typedInTodo]);
      setTypedInTodo("");
    }
  }

  return (
    <div className="app-todo">
      <h1>Todo</h1>
      <input
        type="text"
        placeholder="Add todo..."
        value={typedInTodo}
        onChange={(event) => setTypedInTodo(event.target.value)}
        onKeyDown={onKeyDown}
      />
      <div className="sectionsContainer">
        <div className="todoContainer">
          <h2
            className={
              pendingTodos.length > 0
                ? "boldSectionTitle"
                : "dimmedSectionTitle"
            }
          >
            Pending
          </h2>
          <div>
            {pendingTodos.map((todo, index) => (
              <div key={index} className="todoItem">
                <p>{todo}</p>
                <div className="buttonsSection">
                  <button
                    className="transparent completeButton"
                    onClick={() => completeTodo(index)}
                  >
                    <CheckOutlined className="icon"/>
                  </button>
                  <button
                    className="transparent deleteButton"
                    onClick={() => deleteTodo(index, "pending")}
                  >
                    <CloseOutlined className="icon"/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="todoContainer">
          <h2
            className={
              completedTodos.length > 0
                ? "boldSectionTitle"
                : "dimmedSectionTitle"
            }
          >
            Completed
          </h2>
          <div>
            {completedTodos.map((todo, index) => (
              <div key={index} className="todoItem">
                <p>{todo}</p>
                <div className="buttonsSection">
                  <button
                    className="transparent deleteButton"
                    onClick={() => deleteTodo(index)}
                  >
                    <CloseOutlined className="icon"/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;