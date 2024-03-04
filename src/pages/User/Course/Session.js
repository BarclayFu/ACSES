import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Session = ({ programId }) => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    // fetch(`http://localhost:1337/api/sessions?populate=*&filters[program][id][$eq]=${programId}`, {
    fetch(`http://localhost:1337/api/sessions?populate=Cover,sessions&program=${programId}`, {
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
    <div>
      {sessions.map(session => (
        <div key={session.id} className="mb-6 p-4 border-2 border-gray-300 rounded-lg" onClick={() => handleSessionClick(session.id)}>
          <h2 className="text-lg font-semibold text-gray-800">{session.attributes.Title}</h2>
          <p className="text-gray-600">Duration: {session.attributes.Duration}</p>
          <p className="text-gray-600">Tags: {session.attributes.Tags}</p>
          <p className="text-gray-600">Audience: {session.attributes.Audience}</p>

        </div>
      ))}
    </div>
  );
};
