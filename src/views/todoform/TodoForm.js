import { useState } from "react";

const TodoForm = ({ onFormSubmit }) => {
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    onFormSubmit({ name: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add todo name"
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoForm;
