'use client';
import React from 'react';
import { Button, Form, Input } from 'antd';
import { addProduct } from '@/redux/features/product-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';

const AddProductForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = (values: any) => {
    dispatch(addProduct({ id: Date.now(), name: values.task, type: values.type, done: false }));
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
      name="add-Product-form"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        name="task"
        rules={[{ required: true, message: 'Enter Name of Product' }]}
      >
        <Input placeholder="Enter Name of Product" />
      </Form.Item>

      <Form.Item<FieldType>
        name="type"
        rules={[{ required: true, message: 'Enter Type of Product' }]}
      >
        <Input placeholder="Enter Type of Product" />
      </Form.Item>

      <Form.Item className="text-center">
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProductForm;
