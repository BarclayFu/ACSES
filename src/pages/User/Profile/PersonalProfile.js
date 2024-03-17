import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const [profile, setProfile] = useState(null);

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
        </div>
        {/* 可以添加更多的个人信息展示 */}
      </div>
    </div>
  );
};
