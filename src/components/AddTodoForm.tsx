'use client';
import React from 'react';
import { Button, Form, Input } from 'antd';
import { addTodo } from '@/redux/features/todo-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';


const AddTodoForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = (values: any) => {
    dispatch(addTodo({ id: Date.now(), name: values.task, type: values.type, done: false }));
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    task?: string;
    type?: string; // Add the type field
  };

  return (
    <Form
      form={form}
      name="add-todo-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        name="task"
        rules={[{ required: true, message: 'Please input your task!' }]}
      >
        <Input placeholder="Enter your task" />
      </Form.Item>

      <Form.Item<FieldType>
        name="type"
        rules={[{ required: true, message: 'Please input the task type!' }]}
      >
        <Input placeholder="Enter the task type" />
      </Form.Item>

      <Form.Item className="text-center">
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddTodoForm;
