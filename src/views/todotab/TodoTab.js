import { List } from "antd";
import TodoItem from "../todoitem/TodoItem";

const TodoTab = ({ todos, onTodoRemoval }) => {
  return (
    <>
      <List
        datasource={todos}
        renderItem={(todo) => (
          <TodoItem todo={todo} onTodoRemoval={onTodoRemoval} />
        )}
        pagination={{ position: "bottom", pageSize: 10 }}
      ></List>
    </>
  );
};

export default TodoTab;
