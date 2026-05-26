import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (task.trim() === "") return;
    setTodos([...todos, { text: task, completed: false }]);
    setTask("");
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const progress = todos.length ? (completedCount / todos.length) * 100 : 0;

  return (
    <div className="app">
      <div className="dashboard">

        {/* Header */}
        <div className="header">
          <h1>Task Dashboard</h1>
          <p>Manage your daily work efficiently</p>
        </div>

        {/* Progress */}
        <div className="progress-section">
          <div className="progress-text">
            <span>Progress</span>
            <span>{completedCount}/{todos.length}</span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Input */}
        <div className="input-card">
          <div className="input-wrapper">
            <span className="input-icon">✎</span>
            <input
              type="text"
              placeholder="Write a new task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>

          <button onClick={addTodo}>+ Add Task</button>
        </div>

        {/* Task Section */}
        <div className="tasks-section">
          {todos.length === 0 ? (
            <div className="empty-state">
              <p>No tasks available</p>
              <span>Add your first task to get started</span>
            </div>
          ) : (
            todos.map((todo, index) => (
              <div
                className={`task-card ${todo.completed ? "done-card" : ""}`}
                key={index}
              >
                <div className="task-left">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(index)}
                  />
                  <span className={todo.completed ? "completed" : ""}>
                    {todo.text}
                  </span>
                </div>

                <button onClick={() => deleteTodo(index)}>Delete</button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="stat-box">
            <h3>{todos.length}</h3>
            <p>Total Tasks</p>
          </div>

          <div className="stat-box">
            <h3>{completedCount}</h3>
            <p>Completed</p>
          </div>

          <div className="stat-box">
            <h3>{todos.length - completedCount}</h3>
            <p>Remaining</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;