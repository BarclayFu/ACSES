import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Content } from './Content';

export const SessionDetail = () => {
  const [session, setSession] = useState(null);
  const { sessionId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    fetch(`http://localhost:1337/api/sessions/${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setSession(data.data);
    })
    .catch(error => console.error('Error fetching session details:', error));
  }, [sessionId]);

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mb-6 p-4 border-2 border-blue-500 rounded-lg">
      <h1>{session.attributes.Title}</h1>
      {/* 这里可以展示更多的content详情 */}
      <h2>Tags: {session.attributes.Tags}</h2>
      <h2>Duration: {session.attributes.Duration}</h2>
      <h2>Objective: {session.attributes.Objective}</h2>
      <h2>Audience: {session.attributes.Audience}</h2>
      <Content sessionId={sessionId} />
    </div>
  );
};
