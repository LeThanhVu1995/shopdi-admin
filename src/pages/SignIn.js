import React, { useState } from 'react';
import { message } from 'antd';

import signinbg from '../assets/images/banner_left.png';
import emailicon from '../assets/images/email.svg';
import eyeicon from '../assets/images/eye.svg';
import lockicon from '../assets/images/lock.svg';
import { useAuth } from '../hook/useAuth';
import { useUI } from '../hook/useUI';
import ModalForgetPass from '../components/modals/modal-forget-pass';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signin } = useAuth();
  const { setLoading } = useUI();
  const [openedForget, setOpenedForget] = useState(false);

  const onSignin = async () => {
    try {
      if (!username || !password) return;
      setLoading(true);
      const { status, message: mes } = await signin(username, password);
      if (status) {
        message.success('Đăng nhập thành công');
      } else {
        message.error(
          mes === 'Password incorrect' ? 'Mật khẩu không đúng' : mes
        );
      }
    } catch (err) {
      message.error('Đăng nhập thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-[100vh] bg-white">
      <ModalForgetPass opened={openedForget} setOpened={setOpenedForget} />
      <div className="grid grid-cols-2">
        <img
          src={signinbg}
          className="object-cover min-h-[100vh]"
          alt="signin"
        />
        <div className="flex items-center justify-center">
          <form className="w-[400px]" autoComplete="off">
            <h1 className="text-black font-medium text-[28px] text-left mb-[8px]">
              Đăng Nhập
            </h1>
            <h5 className="mb-[40px] font-[400] text-[16px] text-black">
              Shopdi chào mừng bạn đã quay lại!
            </h5>
            <div className="border-[#1A1A1A] border-solid border-[1px] rounded-[8px] p-[8px] flex flex-row items-center">
              <img src={emailicon} alt="email" />
              <input
                onChange={(e) => setUsername(e.target.value || '')}
                autoComplete="off"
                placeholder="Tên Đăng Nhập"
                type="text"
                value={username || ''}
                className="bg-transparent border-none text-[#858585] text-[16px] font-[400] active:bg-transparent focus-visible:outline-none pl-[8px] flex-1"
              />
            </div>
            <div className="border-[#1A1A1A] border-solid border-[1px] rounded-[8px] p-[8px] flex flex-row mt-[16px] items-center">
              <img src={lockicon} alt="email" />
              <input
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onSignin();
                  }
                }}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật Khẩu"
                autoComplete="off"
                value={password || ''}
                type={showPassword ? 'text' : 'password'}
                className="bg-transparent border-none text-[#858585] text-[16px] autofill:bg-black font-[400] active:bg-transparent focus-visible:outline-none pl-[8px] flex-1"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img src={eyeicon} alt="email" className="cursor-pointer" />
              </button>
            </div>
            <div className="flex flex-row mt-[16px] mb-[40px] items-center justify-start">
              <input type="checkbox" />
              <label className="font-normal text-[14px] pl-[8px]">
                Nhớ mật khẩu
              </label>
            </div>
            <button
              onClick={onSignin}
              type="button"
              className="text-white p-[16px] font-bold text-[16px] bg-black rounded-[8px] w-full mb-[40px]"
            >
              Đăng Nhập
            </button>
            <div className="flex items-center justify-center">
              <button
                onClick={() => setOpenedForget(true)}
                type="button"
                className="text-[#0049C6] text-[16px] font-medium"
              >
                Quên Mật Khẩu ?
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
