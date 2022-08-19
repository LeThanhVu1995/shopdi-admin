import React from 'react';

import { DatePicker, Form, Input, Button, Radio, Col, Row } from 'antd';

export default function ({ opened, setOpened, onCreateUser }) {
  if (!opened) return null;

  return (
    <div
      id="modal-item"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed top-0 ${
        opened ? 'bg-[#00000047]' : 'hidden'
      } left-0 right-0 z-50  w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full`}
    >
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full max-w-[800px] p-4 md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            onClick={() => {
              setOpened(false);
            }}
            className="absolute shadow-sm rounded-[8px] p-[1px] top-[15px] right-[-50px] translate-x-[-50%] translate-y-[-50%] z-50 bg-white cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 6L6 18"
                stroke="#1B1D21"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#1B1D21"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="flex flex-col gap-[16px] px-6 py-6 lg:px-8">
            <h3 className="text-[#1B1D21] text-[18px] font-medium mb-[18px]">
              Thông tin người dùng
            </h3>
            <Form
              wrapperCol={{ span: 24 }}
              onFinish={onCreateUser}
              layout="vertical"
              initialValues={{
                name: '',
                userName: '',
                password: '',
                avatar: '',
                birthday: '',
                gender: 1,
                phone: '',
                email: '',
              }}
            >
              <Form.Item name="name" label="Họ và Tên">
                <Input className="rounded-md w-full bg-white border-[#4D4D4D]" />
              </Form.Item>
              <Form.Item
                label="Username"
                name="userName"
                rules={[
                  {
                    required: true,
                    message: 'Xin vui lòng nhập tên đăng nhập',
                  },
                ]}
              >
                <Input className="rounded-md w-full p-2.5 border border-[#4D4D4D] bg-white" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Xin vui lòng nhập mật khẩu' },
                  () => ({
                    validator(_, value) {
                      const regexPwd =
                        // eslint-disable-next-line no-useless-escape
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])(?=.{8,})/;
                      if (regexPwd.test(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          'Password phải bao gồm 1 viết hoa 1 kí tự đặc biệt, 1 số nha dài 8 ký tự'
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password className="rounded-md w-full p-2.5 border border-[#4D4D4D] bg-white" />
              </Form.Item>
              <Form.Item name="birthday" label="Ngày Sinh">
                <DatePicker
                  format="YYYY-MM-DD"
                  className="rounded-md w-full p-2.5 border border-[#4D4D4D] bg-white"
                />
              </Form.Item>
              <Form.Item name="gender" label="Giới Tính">
                <Radio.Group>
                  <Radio value="1"> Nam </Radio>
                  <Radio value="2"> Nữ </Radio>
                  <Radio value="0"> Khác </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="phone" label="Số Điện Thoại">
                <Input className="rounded-md w-full bg-white border-[#4D4D4D]" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ type: 'email', message: 'Email ko đúng.' }]}
              >
                <Input className="rounded-md w-full bg-white border-[#4D4D4D]" />
              </Form.Item>
              <Form.Item name="avatar" label="Avatar">
                <Input className="rounded-md w-full bg-white border-[#4D4D4D]" />
              </Form.Item>
              <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Button
                    onClick={() => setOpened(false)}
                    className="bg-transparent text-black border hover:text-black hover:border-black border-black text-[14px] font-medium rounded-md w-[120px] h-[40px] mr-[8px]"
                  >
                    Hủy
                  </Button>
                  <Button
                    htmlType="submit"
                    className="bg-black hover:bg-black hover:text-white hover:border-black text-white text-[14px] font-medium rounded-md w-[120px] h-[40px]"
                  >
                    Thêm User
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
