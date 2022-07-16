import React, { useCallback, useEffect, useState } from 'react';
import { emptyArray } from '../../core/utils';

import { useUI } from '../../hook/useUI';

export default function ({ opened, setOpened }) {
  if (!opened) return null;

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const [tabActive, setTabActive] = useState(0);
  const [filterText, setFilterText] = useState('');
  const [filterDate, setFilterDate] = useState('ALL');
  const { loading, setLoading } = useUI();

  const [usersHistory, setUsersHistory] = useState([]);

  const randomUsers = useCallback(() => {
    return (async () =>
      new Promise((rs) => {
        setTimeout(() => {
          const users = [];
          for (let i = 0; i < 100; i += 1) {
            users.push({
              phone: getRndInteger(1000000000, 9999999999),
              email: i + 'nguyenvana@gmail.com',
              point: getRndInteger(100, 5000),
            });
          }

          rs(users);
        }, 3000);
      }))();
  }, [tabActive, filterText, filterDate]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const users = await randomUsers();
        setUsersHistory(users);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [tabActive, filterText, filterDate]);

  const renderRows = () => {
    if (emptyArray(usersHistory)) return null;

    return usersHistory.map((user) => (
      <tr className="bg-white border-b">
        <td className="px-6 py-2">{user.phone}</td>
        <td className="px-6 py-2">{user.email}</td>
        <td className="px-6 py-2">{user.point}</td>
      </tr>
    ));
  };

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
            <div className="flex flex-row bg-[#f5f5f5] rounded-lg p-[8px]">
              <div className="flex flex-1 justify-center items-center cursor-pointer">
                <button
                  onClick={() => setTabActive(0)}
                  type="button"
                  className={`${
                    tabActive === 0 ? 'bg-white' : ''
                  } text-black rounded-lg w-full text-center py-[8px] block`}
                >
                  Đã Nạp
                </button>
              </div>
              <div className="flex flex-1 justify-center items-center cursor-pointer">
                <button
                  onClick={() => setTabActive(1)}
                  type="button"
                  className={`${
                    tabActive === 1 ? 'bg-white' : ''
                  } text-black rounded-lg w-full text-center py-[8px] block`}
                >
                  Đã Dùng
                </button>
              </div>
              <div className="flex flex-1 justify-center items-center cursor-pointer">
                <button
                  onClick={() => setTabActive(2)}
                  type="button"
                  className={`${
                    tabActive === 2 ? 'bg-white' : ''
                  } text-black rounded-lg w-full text-center py-[8px] block`}
                >
                  Đã Chuyển
                </button>
              </div>
              <div className="flex flex-1 justify-center items-center cursor-pointer">
                <button
                  onClick={() => setTabActive(3)}
                  type="button"
                  className={`${
                    tabActive === 3 ? 'bg-white' : ''
                  } text-black rounded-lg w-full text-center py-[8px] block`}
                >
                  Đã Nhận
                </button>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="rounded-[16px] bg-[#F5F5F5] px-[8px] w-[260px] flex items-center">
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
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  placeholder="Tìm Kiếm"
                  type="text"
                  className="bg-transparent border-0 focus-visible:outline-none px-[8px] text-[14px] font-normal"
                />
              </div>
              <div className="flex flex-row bg-[#f5f5f5] rounded-[16px] p-[8px] gap-[12px]">
                <button
                  onClick={() => setFilterDate('ALL')}
                  type="button"
                  className={`${
                    filterDate === 'ALL' ? 'bg-[white]' : 'bg-transparent'
                  } rounded-[16px] px-[8px] text-[#808191] text-[12px]`}
                >
                  Tất Cả
                </button>
                <button
                  type="button"
                  onClick={() => setFilterDate('0')}
                  className={`${
                    filterDate === '0' ? 'bg-[white]' : 'bg-transparent'
                  } rounded-[16px] px-[8px] text-[#808191] text-[12px]`}
                >
                  Hôm Nay
                </button>
                <button
                  type="button"
                  onClick={() => setFilterDate('3')}
                  className={`${
                    filterDate === '3' ? 'bg-[white]' : 'bg-transparent'
                  } rounded-[16px] px-[8px] text-[#808191] text-[12px]`}
                >
                  3 Ngày
                </button>
                <button
                  type="button"
                  onClick={() => setFilterDate('7')}
                  className={`${
                    filterDate === '7' ? 'bg-[white]' : 'bg-transparent'
                  } rounded-[16px] px-[8px] text-[#808191] text-[12px]`}
                >
                  7 Ngày
                </button>
                <button
                  type="button"
                  onClick={() => setFilterDate('30')}
                  className={`${
                    filterDate === '30' ? 'bg-[white]' : 'bg-transparent'
                  } rounded-[16px] px-[8px] text-[#808191] text-[12px]`}
                >
                  30 Ngày
                </button>
                <button
                  type="button"
                  onClick={() => setFilterDate('60')}
                  className={`${
                    filterDate === '60' ? 'bg-[white]' : 'bg-transparent'
                  } rounded-[16px] px-[8px] text-[#808191] text-[12px]`}
                >
                  Tháng
                </button>
                <button
                  type="button"
                  onClick={() => setFilterDate('365')}
                  className={`${
                    filterDate === '365' ? 'bg-[white]' : 'bg-transparent'
                  } rounded-[16px] px-[8px] text-[#808191] text-[12px]`}
                >
                  Năm
                </button>
                <button type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M13 1.99995H12.5V1.51402C12.5 1.24495 12.2931 1.01402 12.0241 1.00058C11.9565 0.997322 11.8889 1.00782 11.8255 1.03145C11.762 1.05508 11.7041 1.09133 11.6551 1.13802C11.6061 1.18471 11.5671 1.24087 11.5404 1.30308C11.5138 1.36529 11.5 1.43227 11.5 1.49995V1.99995H4.5V1.51402C4.5 1.24495 4.29312 1.01402 4.02406 1.00058C3.95646 0.997322 3.88889 1.00782 3.82547 1.03145C3.76204 1.05508 3.70407 1.09133 3.65507 1.13802C3.60608 1.18471 3.56707 1.24087 3.54041 1.30308C3.51375 1.36529 3.50001 1.43227 3.5 1.49995V1.99995H3C2.46957 1.99995 1.96086 2.21067 1.58579 2.58574C1.21071 2.96081 1 3.46952 1 3.99995V13C1 13.5304 1.21071 14.0391 1.58579 14.4142C1.96086 14.7892 2.46957 15 3 15H13C13.5304 15 14.0391 14.7892 14.4142 14.4142C14.7893 14.0391 15 13.5304 15 13V3.99995C15 3.46952 14.7893 2.96081 14.4142 2.58574C14.0391 2.21067 13.5304 1.99995 13 1.99995ZM4.25 13C4.10166 13 3.95666 12.956 3.83332 12.8736C3.70998 12.7911 3.61386 12.674 3.55709 12.537C3.50032 12.3999 3.48547 12.2491 3.51441 12.1036C3.54335 11.9581 3.61478 11.8245 3.71967 11.7196C3.82456 11.6147 3.9582 11.5433 4.10368 11.5144C4.24917 11.4854 4.39997 11.5003 4.53701 11.557C4.67406 11.6138 4.79119 11.7099 4.8736 11.8333C4.95601 11.9566 5 12.1016 5 12.25C5 12.4489 4.92098 12.6396 4.78033 12.7803C4.63968 12.9209 4.44891 13 4.25 13ZM4.25 10.5C4.10166 10.5 3.95666 10.456 3.83332 10.3736C3.70998 10.2911 3.61386 10.174 3.55709 10.037C3.50032 9.89992 3.48547 9.74912 3.51441 9.60363C3.54335 9.45815 3.61478 9.32451 3.71967 9.21962C3.82456 9.11473 3.9582 9.0433 4.10368 9.01436C4.24917 8.98542 4.39997 9.00028 4.53701 9.05704C4.67406 9.11381 4.79119 9.20994 4.8736 9.33327C4.95601 9.45661 5 9.60162 5 9.74995C5 9.94886 4.92098 10.1396 4.78033 10.2803C4.63968 10.4209 4.44891 10.5 4.25 10.5ZM6.75 13C6.60166 13 6.45666 12.956 6.33332 12.8736C6.20998 12.7911 6.11385 12.674 6.05709 12.537C6.00032 12.3999 5.98547 12.2491 6.01441 12.1036C6.04335 11.9581 6.11478 11.8245 6.21967 11.7196C6.32456 11.6147 6.45819 11.5433 6.60368 11.5144C6.74917 11.4854 6.89997 11.5003 7.03701 11.557C7.17406 11.6138 7.29119 11.7099 7.3736 11.8333C7.45601 11.9566 7.5 12.1016 7.5 12.25C7.5 12.4489 7.42098 12.6396 7.28033 12.7803C7.13968 12.9209 6.94891 13 6.75 13ZM6.75 10.5C6.60166 10.5 6.45666 10.456 6.33332 10.3736C6.20998 10.2911 6.11385 10.174 6.05709 10.037C6.00032 9.89992 5.98547 9.74912 6.01441 9.60363C6.04335 9.45815 6.11478 9.32451 6.21967 9.21962C6.32456 9.11473 6.45819 9.0433 6.60368 9.01436C6.74917 8.98542 6.89997 9.00028 7.03701 9.05704C7.17406 9.11381 7.29119 9.20994 7.3736 9.33327C7.45601 9.45661 7.5 9.60162 7.5 9.74995C7.5 9.94886 7.42098 10.1396 7.28033 10.2803C7.13968 10.4209 6.94891 10.5 6.75 10.5ZM9.25 13C9.10166 13 8.95666 12.956 8.83332 12.8736C8.70998 12.7911 8.61385 12.674 8.55709 12.537C8.50032 12.3999 8.48547 12.2491 8.51441 12.1036C8.54335 11.9581 8.61478 11.8245 8.71967 11.7196C8.82456 11.6147 8.95819 11.5433 9.10368 11.5144C9.24917 11.4854 9.39997 11.5003 9.53701 11.557C9.67405 11.6138 9.79119 11.7099 9.8736 11.8333C9.95601 11.9566 10 12.1016 10 12.25C10 12.4489 9.92098 12.6396 9.78033 12.7803C9.63968 12.9209 9.44891 13 9.25 13ZM9.25 10.5C9.10166 10.5 8.95666 10.456 8.83332 10.3736C8.70998 10.2911 8.61385 10.174 8.55709 10.037C8.50032 9.89992 8.48547 9.74912 8.51441 9.60363C8.54335 9.45815 8.61478 9.32451 8.71967 9.21962C8.82456 9.11473 8.95819 9.0433 9.10368 9.01436C9.24917 8.98542 9.39997 9.00028 9.53701 9.05704C9.67405 9.11381 9.79119 9.20994 9.8736 9.33327C9.95601 9.45661 10 9.60162 10 9.74995C10 9.94886 9.92098 10.1396 9.78033 10.2803C9.63968 10.4209 9.44891 10.5 9.25 10.5ZM9.25 7.99995C9.10166 7.99995 8.95666 7.95597 8.83332 7.87355C8.70998 7.79114 8.61385 7.67401 8.55709 7.53696C8.50032 7.39992 8.48547 7.24912 8.51441 7.10363C8.54335 6.95815 8.61478 6.82451 8.71967 6.71962C8.82456 6.61473 8.95819 6.5433 9.10368 6.51436C9.24917 6.48542 9.39997 6.50028 9.53701 6.55704C9.67405 6.61381 9.79119 6.70994 9.8736 6.83327C9.95601 6.95661 10 7.10162 10 7.24995C10 7.44886 9.92098 7.63963 9.78033 7.78028C9.63968 7.92093 9.44891 7.99995 9.25 7.99995ZM11.75 10.5C11.6017 10.5 11.4567 10.456 11.3333 10.3736C11.21 10.2911 11.1139 10.174 11.0571 10.037C11.0003 9.89992 10.9855 9.74912 11.0144 9.60363C11.0433 9.45815 11.1148 9.32451 11.2197 9.21962C11.3246 9.11473 11.4582 9.0433 11.6037 9.01436C11.7492 8.98542 11.9 9.00028 12.037 9.05704C12.1741 9.11381 12.2912 9.20994 12.3736 9.33327C12.456 9.45661 12.5 9.60162 12.5 9.74995C12.5 9.94886 12.421 10.1396 12.2803 10.2803C12.1397 10.4209 11.9489 10.5 11.75 10.5ZM11.75 7.99995C11.6017 7.99995 11.4567 7.95597 11.3333 7.87355C11.21 7.79114 11.1139 7.67401 11.0571 7.53696C11.0003 7.39992 10.9855 7.24912 11.0144 7.10363C11.0433 6.95815 11.1148 6.82451 11.2197 6.71962C11.3246 6.61473 11.4582 6.5433 11.6037 6.51436C11.7492 6.48542 11.9 6.50028 12.037 6.55704C12.1741 6.61381 12.2912 6.70994 12.3736 6.83327C12.456 6.95661 12.5 7.10162 12.5 7.24995C12.5 7.44886 12.421 7.63963 12.2803 7.78028C12.1397 7.92093 11.9489 7.99995 11.75 7.99995ZM14 4.24995V4.74995C14 4.81626 13.9737 4.87985 13.9268 4.92673C13.8799 4.97361 13.8163 4.99995 13.75 4.99995H2.25C2.1837 4.99995 2.12011 4.97361 2.07322 4.92673C2.02634 4.87985 2 4.81626 2 4.74995V3.99995C2.00074 3.73497 2.10634 3.48104 2.29371 3.29367C2.48109 3.10629 2.73501 3.0007 3 2.99995H13C13.265 3.0007 13.5189 3.10629 13.7063 3.29367C13.8937 3.48104 13.9993 3.73497 14 3.99995V4.24995Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-[30px] relative overflow-x-auto shadow-md sm:rounded-lg h-[700px]">
              <table className="w-full text-sm text-left text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                  <tr>
                    <th scope="col" className="px-2 py-3">
                      Số Điện Thoại
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Số Xu
                    </th>
                  </tr>
                </thead>
                <tbody>{renderRows()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
