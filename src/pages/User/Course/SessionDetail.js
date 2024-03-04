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
    <div
      className="mb-6 p-4 border-2 border-blue-500 rounded-lg"
      style={{ margin: "20px auto",maxWidth:500,backgroundColor:"#fff" }}
    >
      
      {/* 这里可以展示更多的content详情 */}
      <div style={{ backgroundColor: "#fff",borderRadius:10,padding:20,marginBottom:20 }}>
      <div style={{ fontWeight: "bold",marginBottom:10 }}>{session.attributes.Title}</div>
        <div>Tags: {session.attributes.Tags}</div>
        <div>Duration: {session.attributes.Duration}</div>
        <div>Objective: {session.attributes.Objective}</div>
        <div>Audience: {session.attributes.Audience}</div>
      </div>

      <Content sessionId={sessionId} />
    </div>
  );
};
