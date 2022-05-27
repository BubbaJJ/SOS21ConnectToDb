import { useState } from "react";
import { GetTodoById } from "../../shared/api/TodoAPI";
import Moment from "moment";

const TodoItem = () => {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState({});
  const [updatedTodo, setUpdatedTodo] = useState({});
  const [todoFound, setTodoFound] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handleSubmit = async () => {
    let data = await GetTodoById(value);
    setEditMode(false);
    if (data.status !== 404) {
      setTodo(data);
      setUpdatedTodo(data);
      setTodoFound(true);
    } else {
      setTodoFound(false);
    }
  };

  const handleInputChange = (event) => {
    setUpdatedTodo((updatedTodo) => ({
      ...updatedTodo,
      [event.target.name]: event.target.value,
    }));
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
              <th></th>
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
              <td>
                <button onClick={() => setEditMode(true)}>Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
        {editMode ? (
          <div>
            <h1>Edit task</h1>
            <form>
              <table>
                <thead>
                  <tr>
                    <th colSpan="2">{todo.name}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Task name:</td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        defaultValue={todo.name}
                        onChange={(event) => handleInputChange(event)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Completed:</td>
                    <td>
                      <input
                        type="checkbox"
                        name="completed"
                        value={updatedTodo.completed}
                        onChange={(event) => handleInputChange(event)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Date added:</td>
                    <td>
                      <input
                        type="date"
                        name="dateAdded"
                        value={Moment(todo.dateAdded).format("yyyy-MM-DD")}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Date due:</td>
                    <td>
                      <input
                        type="date"
                        name="dueDate"
                        defaultValue={Moment(todo.dueDate).format("yyyy-MM-DD")}
                        onChange={(event) => handleInputChange(event)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Date finished:</td>
                    <td>
                      <input
                        type="date"
                        name="dateFinished"
                        value={
                          updatedTodo.dateFinished
                            ? Moment(updatedTodo.dateFinished).format(
                                "yyyy-MM-DD"
                              )
                            : ""
                        }
                        onChange={(event) => handleInputChange(event)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <button type="submit">Save</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        ) : (
          <></>
        )}
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
