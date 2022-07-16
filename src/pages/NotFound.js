import { Result } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';

export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Link
          type="primary"
          className="ant-btn ant-btn-primary ant-btn-lg"
          to="/dashboard"
        >
          Back Home
        </Link>
      }
    />
  );
}
