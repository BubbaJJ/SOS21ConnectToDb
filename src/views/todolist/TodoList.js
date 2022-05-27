import {
  GetTodoList,
  CreateTodo,
  DeleteTodo,
  GetTodoById,
} from "../../shared/api/TodoAPI";
import "./TodoList.css";
import { useState, useEffect } from "react";
import TodoForm from "../todoform/TodoForm";
import TodoItem from "../todoitem/TodoItem";
import Moment from "moment"; // Paket för formattering av bl.a. datum och tid.

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);

  const GetTodoListItems = async () => {
    let data = await GetTodoList(); // Hämtar alla Todo items.
    setTodoList(data); // Tilldelar data till todoList.
  };

  const handleFormSubmit = (todo) => {
    CreateTodo(todo); // Skickar en ny todo till vårat  API.
    alert("Todo created!");
  };

  const handleDeleteTodo = (todo) => {
    DeleteTodo(todo); // Tar bort en todo.
    alert("Todo deleted!");
  };

  useEffect(() => {
    GetTodoListItems(); // Hämtar alla Todo items när sidan laddar.
  }, []); // [] gör att det endast körs en gång.

  return (
    <div className="main-div">
      <h1>Add new todo</h1>
      {/* Formulär för att lägga till nya todo items. */}
      <TodoForm onFormSubmit={handleFormSubmit} />
      <h1>All todo Items</h1>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Completed</th>
            <th>Date added</th>
            <th>Due date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todoList.map(
            // Loopar igenom todoList och skapar en tabellrad för varje item.
            (todo) => (
              <tr key={todo.id}>
                <td>{todo.name}</td>
                {/* Om todo.completed är true så ska "Yes" skrivas ut, annars ska "No" skrivas ut. */}
                <td>{todo.completed ? "Yes" : "No"}</td>
                <td>{Moment(todo.dateAdded).format("MMM Do YYYY")}</td>
                <td>{Moment(todo.dueDate).format("MMM Do YYYY")}</td>
                <td>
                  <button
                    onClick={() => {
                      handleDeleteTodo(todo);
                      GetTodoListItems();
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <h1>Find todo by id</h1>
      <TodoItem />
    </div>
  );
};

export default TodoList;
