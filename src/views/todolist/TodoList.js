import { message, Layout, Tabs, Row, Col } from "antd";
import { useEffect, useState } from "react";
import {
  GetTodoList,
  CreateTodo,
  UpdateTodo,
  DeleteTodo,
} from "../../shared/api/TodoAPI";
import TodoForm from "../todoform/TodoForm";
import TodoTab from "../todotab/TodoTab";
const { Content } = Layout;
const { TabPane } = Tabs;

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [activeTodos, setActiveTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const refreshTodos = () => {
    GetTodoList().then((json) => {
      setTodoList(json);
      setActiveTodos(json.filter((todo) => !todo.completed));
      setCompletedTodos(json.filter((todo) => todo.completed));
    });
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  const handleFormSubmit = (todo) => {
    console.log(todo);
    CreateTodo(todo);
    message.success("Todo created successfully!");
  };

  return (
    <Layout>
      <Content>
        <div className="todo-list">
          <Row>
            <Col>
              <TodoForm onFormSubmit={handleFormSubmit} />
              <br />
              <Tabs defaultActiveKey="active">
                <TabPane tab="All" key="all">
                  <TodoTab todos={todoList} />
                </TabPane>
                <TabPane tab="Active" key="active">
                  <TodoTab todos={activeTodos} />
                </TabPane>
                <TabPane tab="Completed" key="completed">
                  <TodoTab todos={completedTodos} />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default TodoList;
