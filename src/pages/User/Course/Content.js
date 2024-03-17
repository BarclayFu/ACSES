import React, { useState, useEffect } from 'react';
import { ContentDetail } from './ContentDetail';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleContentClick = (contentId) => {
    navigate(`/content/${contentId}`);
  };

  return (
    // <div>
    //   {contents.map(content => (
    //     <div key={content.id} className="mb-6 p-4 border-2 border-gray-300 rounded-lg" onClick={() => handleContentClick(content.id)}>
    //       <h1>{content.attributes.Title}</h1>
    //       <p>{content.attributes.Link}</p>
    //       {/* Display other content attributes here */}
    //     </div>
    //   ))}
    // </div>
    // <div>
    //   {contents.map(content => (
    //     <div key={content.id} style={{backgroundColor:"#fff"}} className="mb-6 p-4 border-2 border-gray-300 rounded-lg" onClick={() => handleContentClick(content.id)}>
    //       <h1 style={{ marginLeft: '60px' }}>{content.attributes.Type} - {content.attributes.Title}</h1>
    //       {content.attributes.Link.includes(".mp4") && <video style={{ width: '60%', height: 'auto', marginLeft: '60px' }} src={content.attributes.Link}></video>}
    //       {content.attributes.Link.includes(".pdf") && <div>{content.attributes.Link.split("/").pop()}</div>}
    //       {/* <p>{content.attributes.Link}</p > */}
    //       {/* Display other content attributes here */}
    //     </div>
    //   ))}
    // </div>
    <div>
      {contents.map(content => (
        <div key={content.id} className="mb-6 p-4 border border-gray-300 rounded-lg hover:shadow-md" style={{backgroundColor:"#fff"}} onClick={() => handleContentClick(content.id)}>
          <h1 className="text-xl font-semibold text-gray-800 ml-14 mb-4" style={{ textAlign: "center" }}>{content.attributes.Type} - {content.attributes.Title}</h1>
          {content.attributes.Link.includes(".mp4") && (
            <div className="flex justify-center">
              <video style={{ width: '60%', height: 'auto' }} src={content.attributes.Link} controls></video>
            </div>
          )}
          {content.attributes.Link.includes(".pdf") && (
            <a href={content.attributes.Link} className="text-blue-600 hover:text-blue-800 ml-14" target="_blank" rel="noreferrer">
              {content.attributes.Link.split("/").pop()}
            </a>
          )}
          {/* <p className="text-gray-600">{content.attributes.Link}</p> */}
          {/* Display other content attributes here */}
        </div>
      ))}
    </div>

  );
};

