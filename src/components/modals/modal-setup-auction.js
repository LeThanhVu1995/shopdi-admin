import React, { useState, useMemo } from 'react';
import moment from 'moment';

import {
  DatePicker,
  Form,
  Button,
  Col,
  Row,
  InputNumber,
  Menu,
  Select,
} from 'antd';

export default function ({
  opened,
  setOpened,
  changeSessionDeposite,
  productSelected,
}) {
  if (!opened) return null;

  const fieldsProduct = useMemo(() => {
    return [
      {
        name: ['startingPrice'],
        value: 0,
      },
      {
        name: ['viewPrice'],
        value: 0,
      },
      {
        name: ['depositPrice'],
        value: '0',
      },
      {
        name: ['discountPercent'],
        value: 20,
      },
      {
        name: ['fromDate'],
        value: moment(new Date()),
      },
      {
        name: ['toDate'],
        value: moment(new Date()),
      },
      {
        name: ['quantity'],
        value: 1,
      },
      {
        name: ['minDepositPrice'],
        value: 0,
      },
      {
        name: ['minPrice'],
        value: 7000000,
      },
    ];
  }, [productSelected]);

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
            <Form
              onFinish={changeSessionDeposite}
              wrapperCol={{ span: 24 }}
              layout="vertical"
              fields={fieldsProduct}
            >
              <div className="flex flex-row justify-between items-center">
                <h3 className="text-[#1B1D21] text-[18px] font-medium mb-[18px]">
                  Thiết lập phiên đấu giá
                </h3>
                <Form.Item initialValue="1" name="type">
                  <Select
                    style={{ width: 200 }}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                  >
                    <Select.Option value="1">Xem Giá Liên Tục</Select.Option>
                    <Select.Option value="2">Giữ 25s</Select.Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item name="startingPrice" label="Giá Bắt Đầu Phiên">
                <InputNumber
                  formatter={(value) => {
                    return `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                  }}
                  parser={(value) => {
                    return value.replace(/\$\s?|(,*)/g, '').replace('đ', '');
                  }}
                  className="rounded-md w-full bg-white"
                />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Form.Item name="viewPrice" label="Số Xu Để Xem Giá">
                    <InputNumber
                      formatter={(value) => {
                        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                      }}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      className="rounded-md w-full bg-white"
                      addonAfter={
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <ellipse
                            cx="12"
                            cy="12.6875"
                            rx="11"
                            ry="10.3125"
                            fill="url(#paint0_linear_264_807)"
                          />
                          <ellipse
                            cx="12"
                            cy="11.3125"
                            rx="11"
                            ry="10.3125"
                            fill="url(#paint1_linear_264_807)"
                          />
                          <path
                            d="M17.6839 9.34059H13.9783C12.8312 9.34059 11.7326 8.85779 10.9311 8.00178C10.8638 7.92996 10.7469 7.97978 10.7469 8.08024V12.6949C10.7469 12.9352 10.4685 13.0556 10.3058 12.8854L6.77325 9.19861C5.40733 7.77304 6.37549 5.33496 8.30742 5.33496H13.0038C13.7683 5.33496 14.5022 5.65212 15.0431 6.21588L17.7873 9.08113C17.8784 9.17702 17.8135 9.34059 17.6839 9.34059Z"
                            fill="url(#paint2_linear_264_807)"
                          />
                          <path
                            d="M15.6566 17.8668H10.961C10.1957 17.8668 9.4614 17.5496 8.92005 16.9846L6.17628 14.121C6.0844 14.0251 6.14963 13.8615 6.2793 13.8615H9.97889C11.1256 13.8615 12.2239 14.3443 13.025 15.2008C13.0922 15.2726 13.2091 15.2232 13.2091 15.1227L13.2155 10.506C13.2159 10.2661 13.4939 10.1461 13.6566 10.3159L17.0543 13.862L17.1903 14.0039C18.5559 15.4291 17.5885 17.8668 15.6566 17.8668Z"
                            fill="url(#paint3_linear_264_807)"
                          />
                          <path
                            d="M17.6836 8.67213H13.9781C12.8309 8.67213 11.7323 8.18933 10.9308 7.33332C10.8636 7.26151 10.7467 7.31132 10.7467 7.41178V12.0264C10.7467 12.2668 10.4682 12.3872 10.3055 12.217L6.77301 8.53015C5.40709 7.10459 6.37524 4.6665 8.30717 4.6665H13.0036C13.7681 4.6665 14.5019 4.98367 15.0429 5.54742L17.7871 8.41267C17.8781 8.50857 17.8133 8.67213 17.6836 8.67213Z"
                            fill="black"
                          />
                          <path
                            d="M15.6563 17.1983H10.9607C10.1954 17.1983 9.46116 16.8811 8.91981 16.3161L6.17604 13.4525C6.08416 13.3566 6.14939 13.1931 6.27906 13.1931H9.97865C11.1254 13.1931 12.2236 13.6759 13.0247 14.5323C13.0919 14.6041 13.2089 14.5547 13.2089 14.4543L13.2152 9.83756C13.2156 9.59761 13.4937 9.47764 13.6564 9.64743L17.0541 13.1935L17.1901 13.3355C18.5556 14.7606 17.5882 17.1983 15.6563 17.1983Z"
                            fill="black"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_264_807"
                              x1="1"
                              y1="12.6884"
                              x2="23.0012"
                              y2="12.6884"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#A47A1E" />
                              <stop offset="0.23" stopColor="#D3A84C" />
                              <stop offset="0.41" stopColor="#FFEC94" />
                              <stop offset="0.59" stopColor="#E6BE69" />
                              <stop offset="0.77" stopColor="#FFD87C" />
                              <stop offset="1" stopColor="#B58F3E" />
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_264_807"
                              x1="4.66667"
                              y1="5.125"
                              x2="18.4167"
                              y2="19.3333"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#A47A1E" />
                              <stop offset="0.23" stopColor="#D3A84C" />
                              <stop offset="0.41" stopColor="#FFEC94" />
                              <stop offset="0.59" stopColor="#E6BE69" />
                              <stop offset="0.77" stopColor="#FFD87C" />
                              <stop offset="1" stopColor="#B58F3E" />
                            </linearGradient>
                            <linearGradient
                              id="paint2_linear_264_807"
                              x1="6.13403"
                              y1="9.15037"
                              x2="17.8305"
                              y2="9.15037"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#A47A1E" />
                              <stop offset="0.23" stopColor="#D3A84C" />
                              <stop offset="0.41" stopColor="#FFEC94" />
                              <stop offset="0.59" stopColor="#E6BE69" />
                              <stop offset="0.77" stopColor="#FFD87C" />
                              <stop offset="1" stopColor="#B58F3E" />
                            </linearGradient>
                            <linearGradient
                              id="paint3_linear_264_807"
                              x1="6.1333"
                              y1="14.0519"
                              x2="17.8301"
                              y2="14.0519"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#A47A1E" />
                              <stop offset="0.23" stopColor="#D3A84C" />
                              <stop offset="0.41" stopColor="#FFEC94" />
                              <stop offset="0.59" stopColor="#E6BE69" />
                              <stop offset="0.77" stopColor="#FFD87C" />
                              <stop offset="1" stopColor="#B58F3E" />
                            </linearGradient>
                          </defs>
                        </svg>
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="depositPrice" label="Số Xu Để Đặt Cọc">
                    <InputNumber
                      formatter={(value) => {
                        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                      }}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      className="rounded-md w-full bg-white"
                      addonAfter={
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <ellipse
                            cx="12"
                            cy="12.6875"
                            rx="11"
                            ry="10.3125"
                            fill="url(#paint0_linear_264_807)"
                          />
                          <ellipse
                            cx="12"
                            cy="11.3125"
                            rx="11"
                            ry="10.3125"
                            fill="url(#paint1_linear_264_807)"
                          />
                          <path
                            d="M17.6839 9.34059H13.9783C12.8312 9.34059 11.7326 8.85779 10.9311 8.00178C10.8638 7.92996 10.7469 7.97978 10.7469 8.08024V12.6949C10.7469 12.9352 10.4685 13.0556 10.3058 12.8854L6.77325 9.19861C5.40733 7.77304 6.37549 5.33496 8.30742 5.33496H13.0038C13.7683 5.33496 14.5022 5.65212 15.0431 6.21588L17.7873 9.08113C17.8784 9.17702 17.8135 9.34059 17.6839 9.34059Z"
                            fill="url(#paint2_linear_264_807)"
                          />
                          <path
                            d="M15.6566 17.8668H10.961C10.1957 17.8668 9.4614 17.5496 8.92005 16.9846L6.17628 14.121C6.0844 14.0251 6.14963 13.8615 6.2793 13.8615H9.97889C11.1256 13.8615 12.2239 14.3443 13.025 15.2008C13.0922 15.2726 13.2091 15.2232 13.2091 15.1227L13.2155 10.506C13.2159 10.2661 13.4939 10.1461 13.6566 10.3159L17.0543 13.862L17.1903 14.0039C18.5559 15.4291 17.5885 17.8668 15.6566 17.8668Z"
                            fill="url(#paint3_linear_264_807)"
                          />
                          <path
                            d="M17.6836 8.67213H13.9781C12.8309 8.67213 11.7323 8.18933 10.9308 7.33332C10.8636 7.26151 10.7467 7.31132 10.7467 7.41178V12.0264C10.7467 12.2668 10.4682 12.3872 10.3055 12.217L6.77301 8.53015C5.40709 7.10459 6.37524 4.6665 8.30717 4.6665H13.0036C13.7681 4.6665 14.5019 4.98367 15.0429 5.54742L17.7871 8.41267C17.8781 8.50857 17.8133 8.67213 17.6836 8.67213Z"
                            fill="black"
                          />
                          <path
                            d="M15.6563 17.1983H10.9607C10.1954 17.1983 9.46116 16.8811 8.91981 16.3161L6.17604 13.4525C6.08416 13.3566 6.14939 13.1931 6.27906 13.1931H9.97865C11.1254 13.1931 12.2236 13.6759 13.0247 14.5323C13.0919 14.6041 13.2089 14.5547 13.2089 14.4543L13.2152 9.83756C13.2156 9.59761 13.4937 9.47764 13.6564 9.64743L17.0541 13.1935L17.1901 13.3355C18.5556 14.7606 17.5882 17.1983 15.6563 17.1983Z"
                            fill="black"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_264_807"
                              x1="1"
                              y1="12.6884"
                              x2="23.0012"
                              y2="12.6884"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#A47A1E" />
                              <stop offset="0.23" stopColor="#D3A84C" />
                              <stop offset="0.41" stopColor="#FFEC94" />
                              <stop offset="0.59" stopColor="#E6BE69" />
                              <stop offset="0.77" stopColor="#FFD87C" />
                              <stop offset="1" stopColor="#B58F3E" />
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_264_807"
                              x1="4.66667"
                              y1="5.125"
                              x2="18.4167"
                              y2="19.3333"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#A47A1E" />
                              <stop offset="0.23" stopColor="#D3A84C" />
                              <stop offset="0.41" stopColor="#FFEC94" />
                              <stop offset="0.59" stopColor="#E6BE69" />
                              <stop offset="0.77" stopColor="#FFD87C" />
                              <stop offset="1" stopColor="#B58F3E" />
                            </linearGradient>
                            <linearGradient
                              id="paint2_linear_264_807"
                              x1="6.13403"
                              y1="9.15037"
                              x2="17.8305"
                              y2="9.15037"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#A47A1E" />
                              <stop offset="0.23" stopColor="#D3A84C" />
                              <stop offset="0.41" stopColor="#FFEC94" />
                              <stop offset="0.59" stopColor="#E6BE69" />
                              <stop offset="0.77" stopColor="#FFD87C" />
                              <stop offset="1" stopColor="#B58F3E" />
                            </linearGradient>
                            <linearGradient
                              id="paint3_linear_264_807"
                              x1="6.1333"
                              y1="14.0519"
                              x2="17.8301"
                              y2="14.0519"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#A47A1E" />
                              <stop offset="0.23" stopColor="#D3A84C" />
                              <stop offset="0.41" stopColor="#FFEC94" />
                              <stop offset="0.59" stopColor="#E6BE69" />
                              <stop offset="0.77" stopColor="#FFD87C" />
                              <stop offset="1" stopColor="#B58F3E" />
                            </linearGradient>
                          </defs>
                        </svg>
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="discountPercent"
                    label="% Giảm (mặc định 20%)"
                  >
                    <InputNumber
                      formatter={(value) => {
                        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                      }}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                      className="rounded-md w-full bg-white"
                      addonAfter="%"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item name="fromDate" label="Thời gian bắt đầu">
                    <DatePicker
                      format="HH:mm:ss YYYY-MM-DD"
                      showTime
                      placeholder=""
                      className="rounded-md w-full bg-white"
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="toDate" label="Thời gian kết thúc">
                    <DatePicker
                      format="HH:mm:ss YYYY-MM-DD"
                      showTime
                      placeholder=""
                      className="rounded-md w-full bg-white"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="quantity" label="Số lượng sản phẩm trong phiên">
                <InputNumber className="rounded-md w-full bg-white" />
              </Form.Item>
              <Form.Item
                name="minDepositPrice"
                label="Ngưỡng giá bắt đầu đặt cọc"
              >
                <InputNumber
                  formatter={(value) => {
                    return `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                  }}
                  parser={(value) => {
                    return value.replace(/\$\s?|(,*)/g, '').replace('đ', '');
                  }}
                  className="rounded-md w-full bg-white"
                />
              </Form.Item>
              <Form.Item name="minPrice" label="Ngưỡng giá tối thiểu">
                <InputNumber
                  formatter={(value) => {
                    return `${value}đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                  }}
                  parser={(value) => {
                    return value.replace(/\$\s?|(,*)/g, '').replace('đ', '');
                  }}
                  className="rounded-md w-full bg-white"
                />
              </Form.Item>

              <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <Button className="bg-transparent text-black border hover:text-black hover:border-black border-black text-[14px] font-medium rounded-md w-[120px] h-[40px] mr-[8px]">
                    Hủy
                  </Button>
                  <Button
                    htmlType="submit"
                    className="bg-black  active:bg-black active:border-black active:text-white focus:bg-black focus:border-black hover:bg-black hover:text-white hover:border-black text-white text-[14px] font-medium rounded-md w-[120px] h-[40px]"
                  >
                    Lưu Thay Đổi
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
