import React, { useState } from 'react';

export default function ({ opened, setOpened }) {
  return (
    <div
      id="modal-item"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed top-0 ${
        opened ? 'bg-[#00000047]' : 'hidden'
      } left-0 right-0 z-50  w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full`}
    >
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full max-w-[400px] p-4 md:h-auto">
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
            <div className="flex flex-col justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="126"
                height="126"
                viewBox="0 0 126 126"
                fill="none"
              >
                <circle cx="63" cy="63" r="62" stroke="black" strokeWidth="2" />
                <ellipse
                  cx="62.9995"
                  cy="62.9999"
                  rx="44.561"
                  ry="44.561"
                  fill="#F8F8F8"
                />
                <path
                  d="M73.7562 56.8527H72.2196V49.1698C72.2196 46.7246 71.2483 44.3796 69.5193 42.6506C67.7903 40.9216 65.4453 39.9503 63.0001 39.9503C60.5549 39.9503 58.2099 40.9216 56.4809 42.6506C54.7519 44.3796 53.7806 46.7246 53.7806 49.1698V56.8527H52.244C50.6144 56.8545 49.0521 57.5026 47.8998 58.6549C46.7476 59.8072 46.0994 61.3695 46.0977 62.9991V79.9015C46.0994 81.5311 46.7476 83.0934 47.8998 84.2457C49.0521 85.3979 50.6144 86.0461 52.244 86.0478H73.7562C75.3858 86.0461 76.9481 85.3979 78.1003 84.2457C79.2526 83.0934 79.9008 81.5311 79.9025 79.9015V62.9991C79.9008 61.3695 79.2526 59.8072 78.1003 58.6549C76.9481 57.5026 75.3858 56.8545 73.7562 56.8527ZM69.1464 56.8527H56.8538V49.1698C56.8538 47.5397 57.5013 45.9764 58.654 44.8237C59.8066 43.671 61.37 43.0235 63.0001 43.0235C64.6302 43.0235 66.1936 43.671 67.3462 44.8237C68.4989 45.9764 69.1464 47.5397 69.1464 49.1698V56.8527Z"
                  fill="black"
                />
              </svg>
            </div>
            <p className="text-center font-semibold text-[18px] text-black">
              Quên mật khẩu
            </p>
            <p className="text-center font-normal text-[14px] text-black px-[20px]">
              Vui lòng liên hệ tới Hotline để được hỗ trợ lấy lại mật khẩu tài
              khoản của bạn
            </p>

            <button
              type="button"
              className="text-white h-[50px] font-semibold bg-black rounded-sm"
            >
              Liên hệ Hotline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
