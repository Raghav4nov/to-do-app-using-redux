import React, { useState, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, deleteTodo, clearTodos } from "./todoSlice";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./transitions.css";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

function App() {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [undoTodo, setUndoTodo] = useState(null); // store deleted todo for undo

  const todos = useSelector((state) => state.todos.list);
  const dispatch = useDispatch();

  // Pre-create refs for animations
  const nodeRefs = todos.reduce((acc, todo) => {
    acc[todo.id] = acc[todo.id] || createRef();
    return acc;
  }, {});

  const handleAdd = () => {
    if (text.trim() === "") return;
    dispatch(addTodo(text));
    setText("");
  };

  const handleDelete = (todo) => {
    dispatch(deleteTodo(todo.id));
    setUndoTodo(todo); // store for undo
    setTimeout(() => setUndoTodo(null), 5000); // 5s undo
  };

  const handleUndo = () => {
    if (undoTodo) {
      dispatch(addTodo(undoTodo.text));
      setUndoTodo(null);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className={`animated-gradient min-h-screen flex items-center justify-center p-6 transition-colors duration-500 ${darkMode ? "dark" : ""}`}>
      <div className={`transition-colors duration-500 rounded-3xl p-6 w-full max-w-md shadow-2xl
          ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>

        {/* Header + Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-extrabold flex-1 text-center">To-Do App</h1>
          <div className="ml-4 flex items-center">
            <span className="mr-2 text-sm">{darkMode ? "Dark" : "Light"}</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-14 h-7 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-500 flex items-center p-1"
            >
              <span
                className={`absolute w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-500 ease-in-out flex items-center justify-center ${
                  darkMode ? "translate-x-7" : "translate-x-0"
                }`}
              >
                {darkMode ? (
                  <MoonIcon className="w-4 h-4 text-gray-800" />
                ) : (
                  <SunIcon className="w-4 h-4 text-yellow-400" />
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Input */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
            className={`flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 ${
              darkMode ? "border-gray-600 bg-gray-700 text-white focus:ring-blue-500" 
                       : "border-gray-300 bg-white text-gray-800 focus:ring-blue-500"
            }`}
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        {/* Todo List with animations */}
        <TransitionGroup component="ul" className="space-y-2 mb-4">
          {filteredTodos.map((todo) => (
            <CSSTransition key={todo.id} timeout={300} classNames="todo" nodeRef={nodeRefs[todo.id]}>
              <li
                ref={nodeRefs[todo.id]}
                className={`flex items-center justify-between rounded-xl shadow-sm px-4 py-2 transition ${
                  darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                {editingId === todo.id ? (
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={() => {
                      dispatch(deleteTodo(todo.id));
                      dispatch(addTodo(editingText));
                      setEditingId(null);
                      setEditingText("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(deleteTodo(todo.id));
                        dispatch(addTodo(editingText));
                        setEditingId(null);
                        setEditingText("");
                      }
                    }}
                    autoFocus
                    className="flex-1 px-2 py-1 rounded"
                  />
                ) : (
                  <span
                    onDoubleClick={() => { setEditingId(todo.id); setEditingText(todo.text); }}
                    onClick={() => dispatch(toggleTodo(todo.id))}
                    className={`flex-1 cursor-pointer select-none transform transition-all duration-300 ease-in-out ${
                      todo.completed ? "line-through text-gray-400 scale-95 opacity-70" : "scale-100 opacity-100"
                    }`}
                  >
                    {todo.text}
                  </span>
                )}
                <button
                  onClick={() => handleDelete(todo)}
                  className="text-red-500 hover:text-red-700 transition ml-2"
                >
                  ✕
                </button>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>

        {/* Footer */}
        <div className="flex items-center justify-between mb-4 text-gray-600 text-sm">
          <span>{activeCount} {activeCount === 1 ? "task" : "tasks"} left</span>
          <div className="flex gap-2">
            {["all", "active", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full border transition-all duration-300 ease-in-out ${
                  filter === f
                    ? "bg-blue-500 text-white border-blue-500 shadow-md"
                    : darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Undo button */}
        {undoTodo && (
          <div className="mb-4 text-center">
            <button
              onClick={handleUndo}
              className="px-4 py-2 bg-yellow-400 text-white rounded-xl hover:bg-yellow-500 transition"
            >
              Undo Delete
            </button>
          </div>
        )}

        {/* Clear All Button */}
        {todos.length > 0 && (
          <button
            onClick={() => dispatch(clearTodos())}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
