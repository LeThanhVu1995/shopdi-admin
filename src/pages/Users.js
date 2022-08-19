import { message } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { UserService, NotificationService } from '../api';
import ModalDeposite from '../components/modals/modal-deposite';
import ModalHistory from '../components/modals/modal-history';
import ModalItem from '../components/modals/modal-item-user';
import ModalNotify from '../components/modals/modal-notify';
import ModalUserInfo from '../components/modals/modal-user-info';
import { emptyArray } from '../core/utils';

import profilavatar from '../assets/images/male.jpg';
import { useUI } from '../hook/useUI';
import ModalAddUser from '../components/modals/modal-add-user';

const userService = new UserService();
const notificationService = new NotificationService();

function Home() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const { setLoading, loading } = useUI();
  const [sizePage, setSizePage] = useState(12);

  const [itemModal, setItemModal] = useState(false);
  const [notifyModal, setNotifyModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [depositeModal, setDepositeModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const [userAddModal, setUserAddModal] = useState(false);

  const totalPages = useMemo(() => {
    if (emptyArray(users)) return 0;
    return Math.floor(users.length / sizePage) + 1;
  }, [users]);

  const usersPage = useMemo(() => {
    const startIndex = (page - 1) * sizePage;
    let endIndex = startIndex + sizePage;
    if (endIndex > user.length - 1) endIndex = users.length - 1;

    return users.filter((user, index) => {
      if (index >= startIndex && index < endIndex) return user;
      return null;
    });
  }, [users, page]);

  const updateItemUser = useCallback(
    (userId, userData) => {
      const userIndex = users.findIndex((user) => user.userId === userId);
      if (userIndex !== -1) {
        const usersUpdate = [...users];
        usersUpdate[userIndex] = { ...usersUpdate[userIndex], ...userData };
        setUsers(usersUpdate);
      }
    },
    [users]
  );

  const userSelected = useMemo(() => {
    return user;
  }, [user]);

  const mappingUsersTable = useCallback((users) => {
    return users.map((user) => ({ ...user, check: false }));
  }, []);

  const [_filter, _setFilter] = useState({
    search: '',
    country: '',
    company: '',
  });

  const { search, country, company } = useMemo(() => {
    return _filter;
  }, [_filter]);

  const [countries, setCountries] = useState([]);
  const [companies, setCompanies] = useState([]);

  const setFilter = useCallback((filterData) => {
    _setFilter({ ..._filter, ...filterData });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data: users } = await userService.actGetUsers();
        setUsers(mappingUsersTable(users) || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const renderOptions = (datas, selectedValue) => {
    if (emptyArray(datas)) datas = [];

    datas.push({ id: '', value: 'Tất Cả' });

    return datas.map(({ id, value }) => (
      <option selected={id === selectedValue} value={id}>
        {value}
      </option>
    ));
  };

  const renderPages = () => {
    return (
      <li>
        <button
          type="button"
          className="py-2 px-3 leading-tight  bg-black text-white rounded-md"
        >
          {page}
        </button>
      </li>
    );
  };

  const onActSendMessage = async (title, content) => {
    try {
      if (!content) return;
      setLoading(true);
      const role = !user ? 1 : 2;

      const params = {
        role,
        phone: null,
        title,
        contents: content,
        apiKey: 'c6fdcc72-caee-4f1b-a272-7be9b60d57d0',
      };

      if (role === 2) {
        const { phone } = user;
        if (!phone) {
          message.info('Bạn chưa cập nhật số điện thoại. Vui lòng cập nhật');
          return;
        }
        params.phone = phone;
      }

      const { status, data } =
        await notificationService.actPostNotificationPush(params);

      if (status) {
        message.info('Send message success');
      } else {
        message.error('Some happen error when send message');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getSex = (gender) => {
    if (gender === 2) {
      return 'Nữ';
    }

    if (gender === 1) {
      return 'Nam';
    }

    return 'Khác';
  };

  const renderRows = () => {
    if (emptyArray(usersPage)) return null;

    return usersPage.map(
      ({
        userId,
        avatar,
        name,
        phone,
        gender,
        birthDay,
        walletCode,
        email,
        point,
        check,
      }) => (
        <tr>
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 ">
            <div className="flex items-center">
              <input
                onChange={(e) => {
                  updateItemUser(userId, { check: e.target.checked });
                }}
                id="checkbox"
                type="checkbox"
                value={check}
                className="form-checkbox  w-4 h-4 text-black bg-gray-100 rounded border-gray-300 focus:ring-black"
              />
            </div>
          </th>

          <td className="px-6 py-2">
            <div className="border border-gray-300 border-solid p-[4px] max-w-[40px]">
              <img
                src={avatar || profilavatar}
                className="w-[40px] border border-1"
                alt="img-products"
              />
            </div>
          </td>
          <td className="px-6 py-2">{name}</td>
          <td className="px-6 py-2">{email}</td>
          <td className="px-6 py-2">{phone}</td>
          <td className="px-6 py-2">{point}</td>
          <td className="px-6 py-2">{getSex(gender)}</td>
          <td className="px-6 py-2">{birthDay}</td>
          <td className="px-6 py-2">{walletCode}</td>
          <td className="px-6 py-2">{userId}</td>
          <td className="px-6 py-2 text-right">
            <button
              type="button"
              className="group"
              onClick={() => {
                setUser({
                  userId,
                  avatar,
                  name,
                  phone,
                  gender,
                  birthDay,
                  walletCode,
                  email,
                  point,
                });
                setItemModal(true);
              }}
            >
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

  const onActDepositeCoin = async (coin) => {
    try {
      setLoading(true);
      const { phone } = user;
      const { status, mess } = await userService.actGetUsersToPup({
        phone,
        amount: coin,
      });

      if (status) {
        message.success('Bạn đã nạp xu thành công');
        setDepositeModal(false);
        const { data: users } = await userService.actGetUsers();
        setUsers(mappingUsersTable(users) || []);
      } else {
        message.error(mess);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onActCreateUser = async (values) => {
    try {
      setLoading(true);
      const params = {
        ...values,
        birthDay: values.birthday ? values.birthday.format('DD/MM/YYYY') : '',
      };

      delete params.birthday;

      const { status, message: mess } = await userService.actPostUserAdmin(
        params
      );

      if (status) {
        message.success('Bạn đã tạo thành công người đùng admin');
        setUserAddModal(false);
        const { data: users } = await userService.actGetUsers();
        setUsers(mappingUsersTable(users) || []);
      } else {
        message.error(mess);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onActEditUser = async (values) => {
    try {
      setLoading(true);

      const { userId } = user;

      const { status, message: mess } = await userService.actPostUserProfile({
        name: values.name,
        email: values.email,
        id: userId,
        gender: values.gender,
        birthDay: values.birthday ? values.birthday.format('DD/MM/YYYY') : '',
      });

      if (status) {
        message.success('Bạn đã cập nhật người dùng thành công');
        setUserModal(false);
        const { data: users } = await userService.actGetUsers();
        setUsers(mappingUsersTable(users) || []);
      } else {
        message.error(mess);
      }

      console.log(values);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onOptionsClick = useCallback((name) => {
    setItemModal(false);

    if (name === '__NOTIFY') {
      setNotifyModal(true);
    }

    if (name === '__USER') {
      setUserModal(true);
    }

    if (name === '__DEPOSIT') {
      setDepositeModal(true);
    }

    if (name === '__HISTORY') {
      setHistoryModal(true);
    }
  }, []);
  return (
    <>
      <ModalAddUser
        opened={userAddModal}
        setOpened={setUserAddModal}
        onCreateUser={onActCreateUser}
      />
      <ModalHistory opened={historyModal} setOpened={setHistoryModal} />
      <ModalDeposite
        opened={depositeModal}
        setOpened={setDepositeModal}
        onActDeposite={onActDepositeCoin}
      />
      <ModalNotify
        opened={notifyModal}
        setOpened={setNotifyModal}
        onSendMessage={onActSendMessage}
      />
      <ModalUserInfo
        opened={userModal}
        setOpened={setUserModal}
        user={userSelected}
        onEditUser={onActEditUser}
      />
      <ModalItem
        showNotify
        showUser
        showCoin
        showHistory
        opened={itemModal}
        setOpened={setItemModal}
        onItemClick={onOptionsClick}
      />
      <div
        style={{ minHeight: 'calc(100% - 200px)' }}
        className="bg-white mt-[24px] mr-[22px] rounded-[12px]"
      >
        <div className="px-[24px] py-[15px]">
          <h3 className="font-medium text-black text-[18px]">
            Danh Sách Người Dùng
          </h3>
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
                  value={search}
                  onChange={(e) => setFilter({ search: e.target.value })}
                  className="bg-transparent focus-visible:outline-none px-[8px] text-[14px] font-normal border-0 focus:shadow-none"
                />
              </div>
              <select
                value={country || ''}
                onChange={(e) => setFilter({ country: e.target.value })}
                id="countries"
                className="bg-[#F5F5F5] border border-[#F5F5F5] text-sm rounded-[16px] focus:outline-none focus:ring-[#F5F5F5] focus:border-[#F5F5F5] block w-[150px] p-2.5"
              >
                {renderOptions(countries, country)}
              </select>
              <select
                value={company || ''}
                onChange={(e) => setFilter({ company: e.target.value })}
                id="countries"
                className="bg-[#F5F5F5] border border-[#F5F5F5] text-sm rounded-[16px] focus:outline-none focus:ring-[#F5F5F5] focus:border-[#F5F5F5] block p-2.5 w-[200px]"
              >
                {renderOptions(companies, company)}
              </select>
            </div>
            <div className="flex flex-row gap-[8px]">
              <button
                onClick={() => setUserAddModal(true)}
                type="button"
                className="group rotate-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  className="bi bi-plus"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                    fill="#FDD116"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => {
                  setNotifyModal(true);
                  setUser(null);
                }}
                className="flex rounded-[12px] bg-black py-[12px] px-[24px] items-center justify-center gap-[8px] text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M18.4766 1.52647C18.3488 1.39869 18.1868 1.31057 18.01 1.27273C17.8333 1.23489 17.6494 1.24894 17.4805 1.31318L1.85433 7.22764H1.8512C1.67103 7.29693 1.51664 7.42016 1.40912 7.58048C1.30161 7.7408 1.2462 7.93041 1.25047 8.1234C1.25475 8.31639 1.31849 8.50336 1.433 8.65877C1.54751 8.81417 1.7072 8.93044 1.89026 8.9917L1.90628 8.99678L7.26956 11.287C7.37417 11.3188 7.48528 11.3225 7.59179 11.2979C7.69831 11.2733 7.79651 11.2212 7.87659 11.1468L16.4844 3.12607C16.5101 3.10043 16.5405 3.08008 16.574 3.0662C16.6075 3.05232 16.6434 3.04517 16.6797 3.04517C16.716 3.04517 16.7519 3.05232 16.7854 3.0662C16.8189 3.08008 16.8494 3.10043 16.875 3.12607C16.9007 3.15172 16.921 3.18217 16.9349 3.21568C16.9488 3.2492 16.9559 3.28511 16.9559 3.32139C16.9559 3.35766 16.9488 3.39358 16.9349 3.42709C16.921 3.4606 16.9007 3.49105 16.875 3.5167L8.85393 12.1206C8.77951 12.2007 8.7274 12.2989 8.70279 12.4054C8.67818 12.5119 8.68194 12.623 8.7137 12.7276L11.0047 18.094C11.0071 18.1019 11.0094 18.1089 11.0121 18.1163C11.1371 18.4784 11.4535 18.7339 11.836 18.7511C11.8528 18.7511 11.8586 18.7511 11.875 18.7511C12.0681 18.7522 12.257 18.6952 12.4172 18.5875C12.5775 18.4798 12.7016 18.3263 12.7735 18.1472L18.6871 2.52529C18.7523 2.35626 18.7671 2.17197 18.7297 1.99471C18.6924 1.81745 18.6044 1.65481 18.4766 1.52647Z"
                    fill="white"
                  />
                </svg>
                <span>Gửi Broadcast</span>
              </button>
            </div>
          </div>

          <div
            style={{ height: 'calc(100vh - 340px)' }}
            className="mt-[30px] relative overflow-x-auto shadow-md sm:rounded-lg"
          >
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Check</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Hình Ảnh
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Họ Tên
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số Điện Thoại
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số Xu
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Giới Tính
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ngày Sinh
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ví
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mã
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>{renderRows()}</tbody>
            </table>
          </div>
        </div>
      </div>

      <nav aria-label="">
        <ul className="flex justify-end mr-[22px] mt-[16px] gap-[8px] items-center">
          {page !== 1 ? (
            <li>
              <button
                onClick={() => setPage(page - 1)}
                type="button"
                className="py-2 px-3 ml-0 leading-tight text-black bg-white rounded-md font-bold"
              >
                {'<'}
              </button>
            </li>
          ) : null}

          {renderPages()}
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

export default Home;
