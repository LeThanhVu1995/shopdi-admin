import { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

import avatar from '../../assets/images/male.jpg';
import { useAuth } from '../../hook/useAuth';

function Main() {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { pathname } = useLocation();

  const [opened, setOpened] = useState(true);

  const onSignout = async () => {
    await signout();
    navigate('/sign-in', { replace: true });
  };

  return (
    <div className="flex min-h-[100vh]">
      <aside
        className={`${
          opened ? 'w-[264px]' : 'w-[80px]'
        } relative transition-all duration-500`}
        aria-label="Sidebar"
      >
        <button
          type="button"
          className={`absolute right-[-20px] top-[20px] cursor-pointer transition-all duration-500 ${
            !opened ? '' : 'rotate-180'
          } `}
          onClick={() => setOpened(!opened)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <circle cx="20" cy="20" r="20" fill="#F5F5F9" />
            <circle
              cx="20"
              cy="20"
              r="13"
              fill="url(#paint0_linear_397_3239)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.8968 14L15.7144 20L21.8968 26L23.4286 24.5134L18.778 20L23.4286 15.4866L21.8968 14Z"
              fill="white"
            />
            <defs>
              <linearGradient
                id="paint0_linear_397_3239"
                x1="20"
                y1="7"
                x2="20"
                y2="33"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFE25A" />
                <stop offset="1" stopColor="#F7C102" />
              </linearGradient>
            </defs>
          </svg>
        </button>
        <div className="overflow-y-auto py-4 px-3 bg-[#374756] min-h-[100vh]">
          <div className="mb-[26px] flex">
            <svg
              className="cursor-pointer group "
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
            >
              <path
                className="group-hover:stroke-[#FDD116] transition duration-75"
                d="M8.3335 11.6666H31.6668"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-[#FDD116] transition duration-75"
                d="M8.3335 20H25.0002"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                className="group-hover:stroke-[#FDD116] transition duration-75"
                d="M8.3335 28.3334H18.3335"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <ul className="space-y-2">
            {/* <li>
              <a
                href="#"
                className="flex relative items-center px-[12px] py-[12px] text-[14px] font-medium text-[#E0E0E0] rounded-lg group hover:bg-[#1A1F37] "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30"
                  fill="white"
                  className="w-[30px] h-[30px] text-gray-500 transition duration-75 group-hover:fill-[#FDD116]"
                >
                  <path d="M14.25 14.2491H4.5V4.49915H14.25V14.2491Z" />
                  <path d="M25.5 14.2491H15.75V4.49915H25.5V14.2491Z" />
                  <path d="M14.25 25.5005H4.5V15.7505H14.25V25.5005Z" />
                  <path d="M25.5 25.5005H15.75V15.7505H25.5V25.5005Z" />
                </svg>
                <span className="ml-3">Tổng quan</span>
                <div className="w-1 h-[100%] rounded-l-[5px] top-0 bg-[#FDD116] transition duration-75 opacity-0 group-hover:opacity-100 absolute right-[-12px]" />
              </a>
            </li> */}
            <li>
              <button
                type="button"
                onClick={() => navigate('/users', { replace: true })}
                href="#"
                className={`flex relative items-center px-[12px] py-[12px] text-[14px] font-medium w-full text-[#E0E0E0] rounded-lg group ${
                  pathname.indexOf('users') !== -1 ? 'bg-[#1A1F37]' : ''
                } `}
              >
                <svg
                  className={`w-[30px] h-[30px] text-gray-500 transition duration-75 ${
                    pathname.indexOf('users') !== -1 ? 'fill-[#FDD116]' : ''
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30"
                  fill="white"
                >
                  <path d="M18.5925 6.0267C17.6804 5.04186 16.4063 4.49951 15 4.49951C13.5863 4.49951 12.308 5.03857 11.4 6.01732C10.4822 7.00685 10.035 8.3517 10.14 9.80388C10.3482 12.6689 12.5283 14.9995 15 14.9995C17.4718 14.9995 19.6482 12.6694 19.8596 9.80482C19.966 8.36576 19.516 7.02373 18.5925 6.0267Z" />
                  <path d="M23.2498 25.4985H6.74978C6.53381 25.5013 6.31993 25.456 6.1237 25.3657C5.92747 25.2755 5.75383 25.1426 5.6154 24.9768C5.31072 24.6126 5.1879 24.1153 5.27884 23.6123C5.67447 21.4176 6.90915 19.574 8.84978 18.2798C10.5738 17.1309 12.7577 16.4985 14.9998 16.4985C17.2418 16.4985 19.4257 17.1313 21.1498 18.2798C23.0904 19.5735 24.3251 21.4171 24.7207 23.6118C24.8116 24.1148 24.6888 24.6121 24.3841 24.9763C24.2458 25.1422 24.0721 25.2752 23.8759 25.3655C23.6797 25.4558 23.4658 25.5013 23.2498 25.4985Z" />
                </svg>
                {opened ? (
                  <>
                    <span className="ml-3 whitespace-nowrap">Người dùng</span>
                    <div
                      className={`w-1 h-[100%] rounded-l-[5px] top-0 bg-[#FDD116] transition duration-75 opacity-0  ${
                        pathname.indexOf('users') !== -1 ? 'opacity-100' : ''
                      }  absolute right-[-12px]`}
                    />
                  </>
                ) : null}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => navigate('/products', { replace: true })}
                href="#"
                className={`flex relative items-center px-[12px] py-[12px] text-[14px] font-medium w-full text-[#E0E0E0] rounded-lg group ${
                  pathname.indexOf('products') !== -1 ? 'bg-[#1A1F37]' : ''
                } `}
              >
                <svg
                  className={`w-[30px] h-[30px] text-gray-500 transition duration-75 ${
                    pathname.indexOf('products') !== -1 ? 'fill-[#FDD116]' : ''
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30"
                  fill="white"
                >
                  <path d="M25.5 10.0312L15 5.25L4.5 10.0312L15 14.9062L25.5 10.0312Z" />
                  <path d="M14.9864 21.4189L8.19844 18.3158L4.5 19.9682L15 24.7494L25.5 19.9682L21.8114 18.3135L14.9864 21.4189Z" />
                  <path d="M25.5 14.9994L21.9595 13.4277L15.0047 16.6212L8.03109 13.4258L4.5 14.9994L15 19.7806L25.5 14.9994Z" />
                </svg>
                {opened ? (
                  <>
                    <span className="ml-3 whitespace-nowrap">Sản Phẩm</span>
                    <div
                      className={`w-1 h-[100%] rounded-l-[5px] top-0 bg-[#FDD116] transition duration-75 opacity-0  ${
                        pathname.indexOf('products') !== -1 ? 'opacity-100' : ''
                      }  absolute right-[-12px]`}
                    />
                  </>
                ) : null}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => navigate('/auctions', { replace: true })}
                href="#"
                className={`flex relative items-center px-[12px] py-[12px] text-[14px] font-medium w-full text-[#E0E0E0] rounded-lg group ${
                  pathname.indexOf('auctions') !== -1 ||
                  pathname.indexOf('history') !== -1
                    ? 'bg-[#1A1F37]'
                    : ''
                } `}
              >
                <svg
                  className={`w-[30px] h-[30px] text-gray-500 transition duration-75 ${
                    pathname.indexOf('auctions') !== -1 ||
                    pathname.indexOf('history') !== -1
                      ? 'fill-[#FDD116]'
                      : ''
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30"
                  fill="white"
                >
                  <path d="M14.25 25.5002V23.793C10.5248 23.5784 8.26172 21.6593 8.25 18.7502H11.625C11.708 19.9849 12.7434 20.9276 14.25 21.094V16.5002L12.9952 16.1721C10.1358 15.5074 8.60578 13.857 8.60578 11.3871C8.60578 8.47571 10.6912 6.56649 14.25 6.28149V4.50024H15.75V6.28149C19.3777 6.57681 21.3281 8.5193 21.375 11.2502H18C17.9644 10.1224 17.258 9.21634 15.75 9.09399V13.4065L17.1947 13.7477C20.2317 14.4124 21.75 15.9846 21.75 18.5627C21.75 21.5787 19.6997 23.5259 15.75 23.7809V25.5002H14.25ZM14.25 13.1252V9.09399C12.9567 9.16524 12.0342 9.95977 12.0342 11.0876C12.0342 12.1329 12.8025 12.8163 14.25 13.1252ZM15.75 16.7815V21.094C17.5383 21.0218 18.3928 20.2071 18.3928 18.9485C18.3928 17.7963 17.5383 17.0205 15.75 16.7815Z" />
                </svg>
                {opened ? (
                  <>
                    <span className="ml-3 whitespace-nowrap">Phiên Unlock</span>
                    <div
                      className={`w-1 h-[100%] rounded-l-[5px] top-0 bg-[#FDD116] transition duration-75 opacity-0  ${
                        pathname.indexOf('auctions') !== -1 ||
                        pathname.indexOf('history') !== -1
                          ? 'opacity-100'
                          : ''
                      }  absolute right-[-12px]`}
                    />
                  </>
                ) : null}
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <div className="flex flex-col flex-1 pl-[22px] bg-[#F0F3F6]">
        <div className="header flex flex-row items-center justify-between bg-white rounded-b-[8px] p-[16px]">
          <div className="rounded-[16px] bg-[#F5F5F5] py-[8px] px-[16px] w-[320px] flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M10.3636 3.00061C8.90721 3.00061 7.48354 3.43248 6.2726 4.2416C5.06167 5.05072 4.11786 6.20076 3.56052 7.54628C3.00319 8.8918 2.85737 10.3724 3.14149 11.8008C3.42562 13.2292 4.12693 14.5412 5.15675 15.571C6.18657 16.6009 7.49863 17.3022 8.92703 17.5863C10.3554 17.8704 11.836 17.7246 13.1815 17.1673C14.527 16.6099 15.6771 15.6661 16.4862 14.4552C17.2953 13.2443 17.7272 11.8206 17.7272 10.3642C17.7271 8.41129 16.9512 6.53841 15.5703 5.15749C14.1894 3.77658 12.3165 3.00073 10.3636 3.00061V3.00061Z"
                stroke="black"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
              <path
                d="M15.8574 15.8573L21.0001 21"
                stroke="black"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
            </svg>
            <input
              placeholder="Tìm Kiếm"
              type="text"
              className="bg-transparent border-0 focus-visible:outline-none px-[8px] text-[14px] font-normal"
            />
          </div>
          <div className="menu-layout">
            <div className="flex flex-row gap-[48px]">
              <div className="relative mt-[10px]">
                <span
                  style={{
                    background:
                      'linear-gradient(0deg, #FF544D 0%, #FF754C 100%)',
                  }}
                  className="absolute w-[20px] h-[20px] text-[12px] text-white rounded-full flex right-[-8px] top-[-8px] justify-center items-center"
                >
                  4
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19.875 4.5011H4.125C3.08947 4.5011 2.25 5.34056 2.25 6.3761V17.6261C2.25 18.6616 3.08947 19.5011 4.125 19.5011H19.875C20.9105 19.5011 21.75 18.6616 21.75 17.6261V6.3761C21.75 5.34056 20.9105 4.5011 19.875 4.5011Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.25 7.50134L12 12.7513L18.75 7.50134"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="relative mt-[10px]">
                <span
                  style={{
                    background:
                      'linear-gradient(0deg, #FF544D 0%, #FF754C 100%)',
                  }}
                  className="absolute w-[20px] h-[20px] text-[12px] text-white rounded-full flex right-[-8px] top-[-8px] justify-center items-center"
                >
                  4
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20.0472 16.4729C18.8435 14.9996 17.9936 14.2496 17.9936 10.1879C17.9936 6.46838 16.0943 5.14323 14.531 4.49963C14.3233 4.41432 14.1279 4.21838 14.0646 4.0051C13.7904 3.07182 13.0216 2.24963 11.9997 2.24963C10.9779 2.24963 10.2086 3.07229 9.93724 4.00604C9.87396 4.22166 9.67849 4.41432 9.47083 4.49963C7.90568 5.14416 6.00818 6.46463 6.00818 10.1879C6.00584 14.2496 5.15599 14.9996 3.95224 16.4729C3.45349 17.0832 3.89037 17.9996 4.76271 17.9996H19.2415C20.1091 17.9996 20.5432 17.0804 20.0472 16.4729Z"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 17.9988V18.7488C15 19.5444 14.6839 20.3075 14.1213 20.8701C13.5587 21.4327 12.7956 21.7488 12 21.7488C11.2043 21.7488 10.4413 21.4327 9.87868 20.8701C9.31607 20.3075 9 19.5444 9 18.7488V17.9988"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-row gap-[8px] items-center relative group">
                <div className="absolute group-hover:flex hidden flex-col bg-gray-50 py-[8px] items-center rounded-[8px] px-[16px] top-[60px] left-[-10px] translate-x-[-70%] translate-y-[-50%]">
                  <button
                    onClick={onSignout}
                    type="button"
                    className="text-white bg-black shadow-sm rounded-md py-[8px] w-[120px] text-[14px] font-normal block"
                  >
                    Logout
                  </button>
                </div>
                <img
                  src={user?.avatar ? user?.avatar : avatar}
                  className="rounded-full"
                  alt="avatar"
                  width="30"
                  height="30"
                />
                <div className="flex flex-col">
                  <h5 className="text-black text-[14px] font-semibold">
                    {user?.name || ''}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default Main;
