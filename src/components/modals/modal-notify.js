import React, { useState } from 'react';

export default function ({ opened, setOpened, onSendMessage }) {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  return (
    <div
      id="modal-item"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed top-0 ${
        opened ? 'bg-[#00000047]' : 'hidden'
      } left-0 right-0 z-50  w-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full`}
    >
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full max-w-[500px] p-4 md:h-auto">
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
              Nội dung thông báo
            </h3>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value || '')}
            />
            <textarea
              id="w3review"
              name="w3review"
              rows="4"
              cols="50"
              onChange={(e) => setText(e.target.value)}
              value={text}
              className="rounded-md text-black"
            />
            <div className="flex justify-end">
              <button
                onClick={async () => {
                  await onSendMessage(title, text);
                  setText('');
                  setTitle('');
                }}
                type="button"
                className="bg-black text-white rounded-[8px] px-[16px] py-[8px] w-[160px]"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
