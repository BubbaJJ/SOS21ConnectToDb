import { Tag, List, Button, Tooltip, Switch, Popconfirm } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

const TodoItem = ({ todo, onTodoRemoval, onTodoToggle }) => {
  return (
    <List.Item
      actions={[
        <Tooltip title={todo.completed ? "Incomplete" : "Complete"}></Tooltip>,
        <Popconfirm
          title="Confirm deletion"
          onConfirm={() => onTodoRemoval(todo)}
        >
          <Button type="primary">Remove</Button>
        </Popconfirm>,
      ]}
      key={todo.id}
    >
      <div>
        <Tag color={todo.completed ? "green" : "red"}>{todo.name}</Tag>
      </div>
    </List.Item>
  );
};

export default TodoItem;
