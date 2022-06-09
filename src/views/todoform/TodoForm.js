import { Form, Row, Col, Button, Input } from "antd";

const TodoForm = ({ onFormSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    onFormSubmit({
      name: form.getFieldsValue("name"),
    });

    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Row>
        <Col>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Required field!" }]}
          >
            <Input placeholder="Enter task name" />
          </Form.Item>
        </Col>
        <Col>
          <Button type="primary" htmlType="submit">
            Add Todo
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TodoForm;
