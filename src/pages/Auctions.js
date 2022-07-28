import { useEffect, useMemo, useState } from 'react';
import HiddenPriceService from '../api/hidden-price-service';
import { useUI } from '../hook/useUI';

const hiddenPriceService = new HiddenPriceService();

function Auctions() {
  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const { setLoading, loading } = useUI();
  const [pageSize, setPageSize] = useState(12);
  const [totalRecord, setTotalRecord] = useState(0);

  const totalPages = useMemo(() => {
    return Math.floor(totalRecord / pageSize) + 1;
  }, [totalRecord, pageSize]);

  useEffect(() => {
    if (page < 1) return;

    (async () => {
      try {
        setLoading(true);
        const { data, totalRecord } =
          await hiddenPriceService.actGetHiddenPriceTransactions({
            page,
            pageSize,
            keyword: '',
          });
        setTotalRecord(totalRecord);
        setTransactions(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [page, pageSize]);

  const renderedRows = () => {
    console.log(transactions);
    if (!transactions || !transactions.length) return null;

    return transactions.map(
      ({
        deposit,
        name,
        payment,
        point,
        price,
        remain,
        sku,
        storeName,
        thumnails,
        total,
        turnover,
      }) => (
        <tr className="bg-white border-b">
          <th className="px-2 py-2 ">
            <div className="border border-gray-300 border-solid p-[4px] max-w-[50px]">
              <img
                src={thumnails}
                alt="trans-img"
                style={{ width: '25px', height: '25px' }}
              />
            </div>
          </th>
          <td className="px-[4px] py-2">{name}</td>
          <td className="px-[4px] py-2">{sku}</td>
          <td className="px-[4px] py-2">{price}</td>
          <td className="px-[4px] py-2">{total}</td>
          <td className="px-[4px] py-2">{deposit}</td>
          <td className="px-[4px] py-2">{payment}</td>
          <td className="px-[4px] py-2">{remain}</td>
          <td className="px-[4px] py-2">{point}</td>
          <td className="px-[4px] py-2">{turnover}</td>
          <td className="px-[4px] py-2">{storeName}</td>
          <td className="px-2 py-2 text-right">
            <button type="button" className="group">
              <svg
                style={{ display: 'initial' }}
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M9 9.75C9.41421 9.75 9.75 9.41421 9.75 9C9.75 8.58579 9.41421 8.25 9 8.25C8.58579 8.25 8.25 8.58579 8.25 9C8.25 9.41421 8.58579 9.75 9 9.75Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 4.5C9.41421 4.5 9.75 4.16421 9.75 3.75C9.75 3.33579 9.41421 3 9 3C8.58579 3 8.25 3.33579 8.25 3.75C8.25 4.16421 8.58579 4.5 9 4.5Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 15C9.41421 15 9.75 14.6642 9.75 14.25C9.75 13.8358 9.41421 13.5 9 13.5C8.58579 13.5 8.25 13.8358 8.25 14.25C8.25 14.6642 8.58579 15 9 15Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </td>
        </tr>
      )
    );
  };

  return (
    <>
      <div
        style={{ minHeight: 'calc(100% - 200px)' }}
        className="bg-white mt-[24px] mr-[22px] rounded-[12px]"
      >
        <div className="px-[24px] py-[15px]">
          <h3 className="font-medium text-black text-[18px]">Phiên Đấu Giá</h3>
          <div className="flex justify-between items-center flex-row mt-[23px]">
            <div className="flex flex-row gap-[16px]">
              <div className="rounded-[16px] bg-[#F5F5F5] px-[16px] w-[300px] flex items-center">
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
                  className="bg-transparent focus-visible:outline-none px-[8px] text-[14px] font-normal border-0 focus:shadow-none"
                />
              </div>
            </div>
          </div>

          <div
            style={{ height: 'calc(100vh - 340px)' }}
            className="mt-[30px] relative overflow-x-auto shadow-md sm:rounded-lg"
          >
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-2 py-2">
                    Hình Ảnh
                  </th>
                  <th scope="col" className="px-6 py-2">
                    Tên
                  </th>
                  <th scope="col" className="px-6 py-2">
                    SKU
                  </th>
                  <th scope="col" className="px-6 py-2">
                    Giá bán
                  </th>
                  <th scope="col" className="px-6 py-2">
                    Tổng SP
                  </th>
                  <th scope="col" className="px-6 py-2">
                    Đã đặt cọc
                  </th>
                  <th scope="col" className="px-6 py-2 ">
                    Đã thanh toán
                  </th>
                  <th scope="col" className="px-6 py-2 ">
                    Còn lại
                  </th>
                  <th scope="col" className="px-6 py-2 ">
                    Số xu thu được
                  </th>
                  <th scope="col" className="px-6 py-2 ">
                    Doanh số
                  </th>
                  <th scope="col" className="px-6 py-2 ">
                    Cửa hàng
                  </th>
                  <th scope="col" className="px-6 py-2  text-right">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>{renderedRows()}</tbody>
            </table>
          </div>
        </div>
      </div>

      <nav aria-label="">
        <ul className="flex justify-end mr-[22px] mt-[16px] gap-[8px] items-center">
          <li>
            <button
              onClick={() => {
                if (page === 1) return;
                setPage(page - 1);
              }}
              type="button"
              className="py-2 px-3 ml-0 leading-tight text-black bg-white rounded-md font-bold"
            >
              {'<'}
            </button>
          </li>

          <li>
            <button
              type="button"
              className="py-2 px-3 leading-tight  bg-black text-white rounded-md"
            >
              {page}
            </button>
          </li>
          <span className="text-black">{`of ${totalPages}`}</span>
          {totalPages && page !== totalPages ? (
            <li>
              <button
                onClick={() => setPage(page + 1)}
                type="button"
                className="py-2 px-3 leading-tight text-black bg-white rounded-md font-bold"
              >
                {'>'}
              </button>
            </li>
          ) : null}
        </ul>
      </nav>
    </>
  );
}

export default Auctions;
