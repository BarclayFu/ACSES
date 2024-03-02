import React, { useState, useEffect } from 'react';

export const Content = ({ sessionId }) => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    fetch(`http://localhost:1337/api/contents?populate=*&filters[session][id][$eq]=${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // 打印数据看看是否正确返回
      setContents(data.data);
    })
    .catch(error => console.error('Error fetching content:', error));
  }, [sessionId]);


  return (
    <div>
      {contents.map(content => (
        <div key={content.id} className="mb-6 p-4 border-2 border-gray-300 rounded-lg">
          <h1>{content.attributes.Title}</h1>
          <p>{content.attributes.Link}</p>
          {/* Display other content attributes here */}
        </div>
      ))}
    </div>
  );
};

