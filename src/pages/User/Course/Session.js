import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Session = ({ programId }) => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    fetch(`http://localhost:1337/api/sessions?populate=*&filters[program][id][$eq]=${programId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setSessions(data.data);
    })
    .catch(error => console.error('Error fetching sessions:', error));
  }, [programId]);

  // 这里可以添加更多的解析函数，例如解析objectives等
  const handleSessionClick = (sessionId) => {
    navigate(`/programs/${programId}/sessions/${sessionId}`);
  };

  return (
  <div >
    {sessions.map(session => (
      <div
        key={session.id}
        className="mb-2 p-4 transition duration-300 ease-in-out hover:shadow-lg hover:border-transparent border-b border-gray-200" // Changed mb-6 to mb-2
        // onClick={() => handleSessionClick(session.id)}
      >
        <li className="px-6 py-0 flex justify-between">
          <div className="text-sm font-medium text-blue-500" onClick={() => handleSessionClick(session.id)}>{session.attributes.Title}</div>
          <div className="text-sm font-medium text-gray-500">{session.attributes.Duration}</div>
          <div className="text-sm font-medium text-gray-500">
            {session.attributes.Tags.split(',').map(tag => (
              <span key={tag} >
                {tag.trim()}
              </span>
            ))}
          </div>
        </li>
      </div>
    ))}
  </div>


  );
};
