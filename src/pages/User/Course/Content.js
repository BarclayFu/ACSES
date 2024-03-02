import React, { useState, useEffect } from 'react';

export const Content = ({ sessionId }) => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    fetch(`http://localhost:1337/api/contents?filters[session][id][$eq]=${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => setContents(data.data))
    .catch(error => console.error('Error fetching content:', error));
  }, [sessionId]);

  return (
    <div>
      {contents.map(content => (
        <div key={content.id}>
          <h3>{content.attributes.title}</h3>
          <p>{content.attributes.description}</p>
          {/* Display other content attributes here */}
        </div>
      ))}
    </div>
  );
};

