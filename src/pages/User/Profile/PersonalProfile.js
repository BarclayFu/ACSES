import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    fetch('http://localhost:1337/api/users/me?populate=Avatar&populate=Background', { // 修改这个URL为你的API地址
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setProfile(data);
    })
    .catch(error => console.error('Error fetching profile:', error));
  }, []);
  
  const resetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert('新密码和确认密码不匹配。');
      return;
    }
    const token = localStorage.getItem('jwt');
    axios.post('http://localhost:1337/api/auth/change-password', {
      currentPassword: currentPassword,
      password: newPassword,
      passwordConfirmation: confirmPassword,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      alert('密码已成功更改。');
    })
    .catch(error => {
      console.error('更改密码时发生错误:', error.response);
      alert(error.response.data.error.message || '更改密码时发生错误，请稍后再试。');
    });
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  const avatarUrl = `http://localhost:1337${profile.Avatar.url}`;
  const backgroundUrl = `http://localhost:1337${profile.Background.url}`;


  return (
    <div className="container mx-auto my-5">
      <div className="rounded-lg shadow-lg" style={{ backgroundImage: `url(${backgroundUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="flex flex-col items-center justify-center p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          {profile.Avatar && (
            <img
              src={`http://localhost:1337${profile.Avatar.url}`}
              alt="Profile"
              className="rounded-full"
              style={{ width: '100px', height: '100px' }}
            />
          )}
          <h1 className="text-2xl font-semibold">{profile.username}</h1>
          <p className="text-gray-600">{profile.email}</p>
          <input 
            type="password" 
            placeholder="Current Password" 
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="New Password" 
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={resetPassword}>
            Reset Password
          </button>
        </div>
        {/* 可以添加更多的个人信息展示 */}
      </div>
    </div>
  );
};
