import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: newItem,
      isCompleted: false
    };
    setTodos([...todos, newTodo]);
    setNewItem("");
  };

  const handleToggleCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id) => {
    setIsEditing(id);
    setEditText(todos.find((todo) => todo.id === id).text);
  };

  const handleSaveEdit = (id) => {
    if (!editText.trim()) {
      return;
    }
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setIsEditing(null);
    setEditText("");
  };
  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditText("");
  };

  return (
    // Testing:

    // <div className="app">
    //   <form onSubmit={handleAddTodo} className="new-item-form">
    //     <label htmlFor="new-item-input" className="new-item-label">New item</label>
    //     <input
    //       id="new-item-input"
    //       className="new-item-input"
    //       type="text"
    //       value={newItem}
    //       onChange={(e) => setNewItem(e.target.value)} />
    //     <button type="submit" className="btn">Add</button>
    //   </form>

    //   <h1 className="header">Todo List</h1>
    //   <ul>
    //     {todos.map((todo) => (
    //       <li key={todo.id} className={todo.isCompleted ? 'completed' : ''}>
    //         {isEditing === todo.id ? (
    //           <div>
    //             <input
    //               type="text"
    //               value={editText}
    //               onChange={(e) => setEditText(e.target.value)} />
    //             <button className="btn btn-save" onClick={() => handleSaveEdit(todo.id)}>Save</button>
    //             <button className="btn btn-cancel" onClick={handleCancelEdit}>Cancel</button>
    //           </div>
    //         ) : (

    <div className="app bg-gray-600 min-h-screen flex flex-col justify-center items-center">
      <form onSubmit={handleAddTodo} className="new-item-form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <label htmlFor="new-item-input" className="block text-gray-700 text-4xl font-extrabold ">New item</label>
        <input
          id="new-item-input"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" variant ="contained">Add</button>
      </form>

      <h1 className="header text-2xl font-bold underline">Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={`list-item ${todo.isCompleted ? 'line-through' : ''} bg-white flex items-center shadow-lg mb-2 p-4 rounded decoration-red-900`}>
            {isEditing === todo.id ? (
              <div className="edit-form flex">
                <input
                  type="text"
                  className="edit-text flex-1 p-2 border rounded"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button className="btn btn-save" onClick={() => handleSaveEdit(todo.id)}>Save</button>
                <button className="btn btn-cancel" onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div className="todo-container flex justify-between items-center">
                <label className="todo-label flex items-center">
                 <input
                    type="checkbox"
                    className="todo-checkbox mr-2"
                    checked={todo.isCompleted}
                    onChange={() => handleToggleCompletion(todo.id)}
                />
                  <span className="todo-text">{todo.text}</span>
                </label>
               <div>
               <button className="btn-alert bg-amber-500 hover:bg-yellow-700 text-white py-2 px-4 rounded-l" onClick={() => handleEditTodo(todo.id)}>Edit</button>
               <button className="btn-danger bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-r" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
