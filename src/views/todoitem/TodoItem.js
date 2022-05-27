import { useState } from "react";
import { GetTodoById } from "../../shared/api/TodoAPI";
import Moment from "moment";

const TodoItem = () => {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState({});
  const [todoFound, setTodoFound] = useState(false);
  const handleSubmit = async () => {
    let data = await GetTodoById(value);
    if (data.status !== 404) {
      setTodo(data);
      setTodoFound(true);
    } else {
      setTodoFound(false);
    }
  };

  if (todoFound) {
    return (
      <div>
        <input
          type="text"
          placeholder="Enter id"
          onChange={(event) => setValue(event.target.value)}
        />
        <button onClick={() => handleSubmit()}>Find</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Completed</th>
              <th>Date added</th>
              <th>Due date</th>
              <th>{todo.dateFinished ? "Date finished" : null}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{todo.id}</td>
              <td>{todo.name}</td>
              <td>{todo.completed ? "Yes" : "No"}</td>
              <td>{Moment(todo.dateAdded).format("MMM Do YYYY")}</td>
              <td>{Moment(todo.dueDate).format("MMM Do YYYY")}</td>
              <td>
                {todo.dateFinished
                  ? Moment(todo.dateFinished).format("MMM Do YYYY")
                  : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <input
          type="text"
          placeholder="Enter id"
          onChange={(event) => setValue(event.target.value)}
        />
        <button onClick={() => handleSubmit()}>Find</button>
      </div>
    );
  }
};

export default TodoItem;
