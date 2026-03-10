"use client";

import { Button, Form, Input, Card, message } from 'antd';
import { SendOutlined } from '@ant-design/icons';

export default function CreateArticlePage() {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Дані форми:', values);
    message.success('Статтю успішно створено (імітація)!');
    form.resetFields();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
        <Card 
        title={<span className="text-slate-700">Нова публікація</span>}
        className="rounded-3xl border-none shadow-xl shadow-slate-200/50"
        >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark="optional"
        >
          <Form.Item
            label="Назва статті"
            name="title"
            rules={[{ required: true, message: 'Будь ласка, введіть назву!' }]}
          >
            <Input placeholder="Введіть заголовок..." size="large" />
          </Form.Item>

          <Form.Item
            label="Текст статті"
            name="content"
            rules={[{ required: true, message: 'Текст не може бути порожнім!' }]}
          >
            <Input.TextArea rows={6} placeholder="Про що ваша стаття?" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              icon={<SendOutlined />}
              size="large"
              className="bg-poly-primary h-auto py-2 px-8" 
            >
              Опублікувати
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}