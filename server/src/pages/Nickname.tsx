import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import MainButton from '../components/MainButton';

const Nickname: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');
  const [nicknameSuccess, setNicknameSuccess] = useState<string>('');
  const [nicknameError, setNicknameError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameError(''); // 입력할 때마다 에러 메시지를 초기화
    setNicknameSuccess(''); // 입력할 때마다 성공 메시지를 초기화
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/nicknames/', { nickname });
      console.log('Nickname registered successfully:', response.data);
      setNicknameSuccess('닉네임이 성공적으로 생성되었습니다.');
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setNicknameError('중복된 닉네임입니다. 다른 닉네임을 입력해주세요.');
      } else {
        console.error('Error registering nickname:', error);
        setNicknameError('닉네임 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className='flex-shrink-0'>
      <NavBar />
      </div>
      <div className="flex flex-1 justify-center items-center bg-black">
        <div className='flex flex-col justify-center items-center w-3/12 gap-3'>
          <div className='flex'>
            <div className="font-PR_BO text-3xl text-white whitespace-nowrap">닉네임 입력</div>
            <div className="ml-2 font-PR_BO text-3xl text-red">*</div>
          </div>
          <input
            type="text"
            value={nickname}
            onChange={handleChange}
            className="rounded-lg border border-green-Light text-green-Light font-PR_L w-full h-[44px] bg-black px-3"
          />
          {nicknameError && (
              <div className="mt-2 text-sm text-red">{nicknameError}</div>
            )}
            {nicknameSuccess && (
              <div className="mt-2 text-sm text-green-Normal">{nicknameSuccess}</div>
            )}
          <div className='w-full mt-4 h-[40px]'>
            <Link to="/mainchoose">
              <MainButton value='확인' onClick={handleSubmit}/>
            </Link>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Nickname;