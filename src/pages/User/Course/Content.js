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
      <div className="bg-[#ffffff]" >
        <div className="p-4 my-4 rounded-lg">
          <div className="mb-2">
            <strong className="font-normal text-lg">Resources</strong>



            <div className="grid grid-cols-3 gap-4"></div>
              {contents.map(content => (
                <div key={content.id} className="mb-6 p-4 border border-gray-300 rounded-lg hover:shadow-md flex flex-col" style={{width:300,height:200,marginTop:10,justifyContent:"center"}} onClick={() => handleContentClick(content.id)}>
                  <h1 className="text-xl font-semibold text-gray-800 ml-2 mb-4" style={{ textAlign: "left" }}>{content.attributes.Type} - {content.attributes.Title}</h1>
                  {content.attributes.Link.includes(".mp4") && (
                    <div className="flex justify-center">
                      {/* <video style={{ width: '60%', height: 'auto' }} src={content.attributes.Link} controls></video> */}
                    </div>
                  )}
                  
                </div>
              ))}
            
          </div>
        </div>
      </div>
    </div>

  );
};

