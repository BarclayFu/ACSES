import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export const ContentDetail = () => {
  const [detail, setDetail] = useState(null);
  const { contentId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    fetch(`http://localhost:1337/api/contents/${contentId}?populate=Material`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // 打印数据看看是否正确返回
      setDetail(data.data);
    })
    .catch(error => console.error('Error fetching content detail:', error));
  }, [contentId]);
  
  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mb-6 p-4 border-2 border-blue-500 rounded-lg">
      <h1>{detail.attributes.Title}</h1>
      <h1>{detail.attributes.Link}</h1>

      <video controls>
        <source src={`http://localhost:1337${detail.attributes.Material.data[0].attributes.url}`} type="video/mp4" />
      </video>
    </div>
  );
};
