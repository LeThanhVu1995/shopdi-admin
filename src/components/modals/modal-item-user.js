import React, { useState } from 'react';

export default function ({
  opened,
  setOpened,
  onItemClick = function () {},
  showNotify = false,
  showUser = false,
  showCoin = false,
  showHistory = false,
  showAuction = false,
  showHistoryAuction = false,
}) {
  return (
    <div
      id="modal-item"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed top-0 ${
        opened ? 'bg-[#00000047]' : 'hidden'
      } left-0 right-0 z-50  w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full`}
    >
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full max-w-[300px] p-4 md:h-auto">
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
            {showNotify ? (
              <button
                onClick={() => onItemClick('__NOTIFY')}
                type="submit"
                className="w-full text-gray-500 bg-white shadow-lg focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Gửi Thông Báo
              </button>
            ) : null}
            {showUser ? (
              <button
                onClick={() => onItemClick('__USER')}
                type="submit"
                className="w-full text-gray-500 bg-white shadow-lg focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Thông tin người dùng
              </button>
            ) : null}
            {showCoin ? (
              <button
                onClick={() => onItemClick('__DEPOSIT')}
                type="submit"
                className="w-full text-gray-500 bg-white shadow-lg focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Nạp Thêm Xu
              </button>
            ) : null}
            {showHistory ? (
              <button
                onClick={() => onItemClick('__HISTORY')}
                type="submit"
                className="w-full text-gray-500 bg-white shadow-lg focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Lịch sử giao dịch
              </button>
            ) : null}
            {showAuction ? (
              <button
                onClick={() => onItemClick('__SETUP_AUCTION')}
                type="submit"
                className="w-full text-gray-500 bg-white shadow-lg focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Thiết lập phiên đấu giá
              </button>
            ) : null}
            {showHistoryAuction ? (
              <button
                onClick={() => onItemClick('__HISTORY_AUCTION')}
                type="submit"
                className="w-full text-gray-500 bg-white shadow-lg focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Lịch sử phiên đấu giá
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
