import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Session组件
export const Session = ({ sessionId, grade }) => {
  const [sessionData, setSessionData] = useState(null);

  // 从后端获取会话数据
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/sessions/${sessionId}?grade=${grade}`);
      setSessionData(result.data);
    };

    fetchData();
  }, [sessionId, grade]);

  if (!sessionData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{sessionData.title}</h2>
      <p>{sessionData.overview}</p>
      {/* 其他会话内容 */}
    </div>
  );
};
