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
    // <div>
    //   {sessions.map(session => (
    //     <div key={session.id} className="mb-6 p-4 border-2 border-gray-300 rounded-lg" onClick={() => handleSessionClick(session.id)}>
    //       <h2 className="text-lg font-semibold text-gray-800">{session.attributes.Title}</h2>
    //       <p className="text-gray-600">Duration: {session.attributes.Duration}</p>
    //       <p className="text-gray-600">Tags: {session.attributes.Tags}</p>
    //       {/* <p className="text-gray-600">Audience: {session.attributes.Audience}</p> */}
    //     </div>
    //   ))}
    // </div>
    <div>
  {sessions.map(session => (
    <div
      key={session.id}
      className="mb-6 p-4 border border-gray-300 rounded-lg transition duration-300 ease-in-out hover:shadow-lg hover:border-transparent"
      onClick={() => handleSessionClick(session.id)}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{session.attributes.Title}</h2>
      <div className="flex items-center text-gray-600 mb-1">
        <i className="fas fa-clock mr-2"></i>
        <span>Duration: {session.attributes.Duration}</span>
      </div>
      <div className="flex flex-wrap items-center">
        {session.attributes.Tags.split(',').map(tag => (
          <span key={tag} className="mr-2 mb-2 bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
            {tag.trim()}
          </span>
        ))}
      </div>
      {/* 如果您决定显示观众信息，请取消此行的注释 */}
      {/* <p className="text-gray-600">观众: {session.attributes.Audience}</p> */}
    </div>
  ))}
</div>

  );
};
