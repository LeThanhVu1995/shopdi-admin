import React from 'react';
import svgCoin from '../../assets/images/coin.svg';

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
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-full max-w-[1000px] p-4 md:h-auto">
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
            <div className="list-item-coin">
              <h3 className="font-medium text-black text-[18px] not-italic mb-[18px]">
                Chi Tiết Phiên Đấu Giá
              </h3>
              <div className="flex flex-col gap-[16px]">
                <div
                  style={{ background: 'rgba(0, 73, 198, 0.05)' }}
                  className="flex flex-row justify-start py-[8px] px-[16px] gap-[16px] rounded-[12px] items-center"
                >
                  <div className="flex flex-1 flex-col items-start justify-center gap-[8px]">
                    <span className="text-black text-[16px] font-normal">
                      0123fgiue98hc89doi
                    </span>

                    <span className="text-[#858585] text-[14px] font-normal not-italic">
                      15-07-2022 I 08:30:02
                    </span>
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <span className="text-[20px] text-[#03A86C] font-medium not-italic text-right">
                      24.999.0000
                    </span>
                    <div className="flex flex-row gap-[8px] justify-end relative">
                      <span className="text-black font-medium text-[12px] block absolute top-[50%] right-[0px] translate-x-[-40%] translate-y-[-50%] text-center">
                        Giá Cuối
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="72"
                        height="28"
                        viewBox="0 0 72 28"
                        fill="none"
                      >
                        <path
                          d="M0 0H72L64.5714 14L72 28H0V0Z"
                          fill="url(#paint0_linear_210_6711)"
                        />

                        <defs>
                          <linearGradient
                            id="paint0_linear_210_6711"
                            x1="13.5807"
                            y1="5.2821"
                            x2="26.0202"
                            y2="37.2651"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#BDA25F" />
                            <stop offset="0.07" stopColor="#C3AB65" />
                            <stop offset="0.33" stopColor="#D9CA79" />
                            <stop offset="0.52" stopColor="#E1D285" />
                            <stop offset="0.73" stopColor="#D9CA79" />
                            <stop offset="1" stopColor="#BDA25F" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <div
                  style={{ background: 'rgba(0, 73, 198, 0.05)' }}
                  className="flex flex-row justify-start py-[8px] px-[16px] gap-[16px] rounded-[12px] items-center"
                >
                  <div className="flex flex-1 flex-col items-start justify-center gap-[8px]">
                    <span className="text-black text-[16px] font-normal">
                      0123fgiue98hc89doi
                    </span>

                    <span className="text-[#858585] text-[14px] font-normal not-italic">
                      15-07-2022 I 08:30:02
                    </span>
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <span className="text-[20px] text-black font-medium not-italic text-right">
                      24.999.0000
                    </span>
                    <div className="flex flex-row gap-[8px] justify-end">
                      <span className="text-black font-medium">-120</span>
                      <img src={svgCoin} alt="coin" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
