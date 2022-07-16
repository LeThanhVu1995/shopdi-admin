import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  message,
} from 'antd';
import signinbg from 'assets/images/img-signin.jpg';
import { useAuth } from '../hook/useAuth';

const { Title } = Typography;
const { Footer, Content } = Layout;

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const onFinish = async (values) => {
    const { email } = values;

    try {
      setLoading(true);
      const result = await resetPassword(email);
      console.log(result);
      message.success('Please check your mail to change new password');
    } catch (err) {
      console.error(err);
      message.error('There is some errors to reset password your email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="layout-default layout-signin">
      <Content className="signin">
        <Row gutter={[24, 0]} justify="space-around">
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 7, offset: 2 }}
            md={{ span: 12 }}
          >
            <Title className="mb-15">Reset Password</Title>
            <Title className="font-regular text-muted" level={5}>
              Enter your email to reset
            </Title>
            <Form onFinish={onFinish} layout="vertical" className="row-col">
              <Form.Item
                className="username"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                  loading={loading}
                >
                  RESET PASSWORD
                </Button>
              </Form.Item>
              <div className="flex justify-content-between">
                <p className="font-semibold text-muted">
                  {'Already have an account? '}
                  <Link to="/sign-in" className="text-dark font-bold">
                    Sign In
                  </Link>
                </p>
              </div>
            </Form>
          </Col>
          <Col
            className="sign-img"
            style={{ padding: 12 }}
            xs={{ span: 24 }}
            lg={{ span: 13 }}
            md={{ span: 12 }}
          >
            <img src={signinbg} alt="" />
          </Col>
        </Row>
      </Content>
      <Footer>
        <p className="copyright">
          Copyright © 2022 by<a href="#">Minisoft</a>
        </p>
      </Footer>
    </Layout>
  );
}
