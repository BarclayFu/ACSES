import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    fetch('https://pretty-prosperity-17e0b1a4eb.strapiapp.com/api/users/me?populate=Avatar&populate=Background', { // 修改这个URL为你的API地址
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

  const togglePasswordReset = () => {
    setShowPasswordReset(!showPasswordReset); // 切换显示状态
  };
  
  const resetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }
    const token = localStorage.getItem('jwt');
    axios.post('https://pretty-prosperity-17e0b1a4eb.strapiapp.com/api/auth/change-password', {
      currentPassword: currentPassword,
      password: newPassword,
      passwordConfirmation: confirmPassword,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      alert('Successfully changed password.');
    })
    .catch(error => {
      console.error('Error', error.response);
      alert(error.response.data.error.message || 'Error, please try again.');
    });
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  const avatarUrl = `${profile.Avatar.url}`;
  const backgroundUrl = `${profile.Background.url}`;


  return (
    <div className="container mx-auto my-5 ">
      <div className="rounded-lg shadow-lg " style={{ backgroundImage: `url(${backgroundUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="flex flex-col items-center justify-center p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          {profile.Avatar && (
            <img
              src={`${profile.Avatar.url}`}
              alt="Profile"
              className="rounded-full"
              style={{ width: '100px', height: '100px' }}
            />
          )}
          <h1 className="text-2xl font-semibold">{profile.username}</h1>
          <p className="text-gray-600">{profile.email}</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={togglePasswordReset}>
            Reset Password / Hide
          </button>

          {showPasswordReset && (
            <div className="mt-4 flex flex-col items-center">
              <input
                className="mt-2 p-2 border rounded"
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
              />
              <input
                className="mt-2 p-2 border rounded"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              <input
                className="mt-2 p-2 border rounded"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={resetPassword}
              >
                Confirm
              </button>
            </div>
          )}
        </div>
        {/* 可以添加更多的个人信息展示 */}
      </div>
    </div>
  );
};
