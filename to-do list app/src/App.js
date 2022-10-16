import React, { useState } from "react";
import "./App.css";
const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }
    if (todo !== "") {
      //${todo}-${Date.now()} will generate unique id for each item
      //... is a spread operator
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handledelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };
  return (
    <div className="app">
      <div className="container">
        <h1>To-do List</h1>

        <form className="todoForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            placeholder="Write your To-do here.."
            onChange={(e) => setTodo(e.target.value)}
          />
          <button className="btn-submit" type="submit">
            {editId ? "Edit" : "Add"}
          </button>
        </form>

        <ul className="allTodos">
          {todos.map((t) => (
            <li className="singleTodo">
              <span className="todoText" key={t.id}>
                {t.todo}
              </span>
              <button className="btn-edit" onClick={() => handleEdit(t.id)}>
                Edit
              </button>
              <button className="btn-delete" onClick={() => handledelete(t.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
