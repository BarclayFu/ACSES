import React, { useState, useEffect } from 'react';
import { ContentDetail } from './ContentDetail';
import { useNavigate } from 'react-router-dom';

export const Content = ({ sessionId }) => {
  const [contents, setContents] = useState([]);
  

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    fetch(`https://pretty-prosperity-17e0b1a4eb.strapiapp.com/api/contents?populate=*&filters[session][id][$eq]=${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setContents(data.data);
    })
    .catch(error => console.error('Error fetching content:', error));
  }, [sessionId]);
  const navigate = useNavigate();

  const handleContentClick = (contentId) => {
    navigate(`/content/${contentId}`);
  };

  return (
    <div>
      <div className="bg-[#ffffff]" >
        <div className="p-4 my-4 rounded-lg">
          <div className="mb-2">
            <strong className="font-normal text-lg">Resources</strong>

            <div className="grid grid-cols-2 gap-4">
            {contents && contents.length > 0 ? 
            (contents.map(content => (
              <div key={content.id} className="max-w-sm rounded overflow-hidden shadow-lg my-2">
                <img 
                   className="w-[500px] h-[200px] object-cover" 
                  src={`${content.attributes.Cover.data.attributes.url}`} 
                  alt={content.attributes.Title} 
                />
                <div className="px-6 py-4" style={{ height: '150px', overflowY: 'auto' }}>
                  <div className="font-bold text-xl mb-2">{content.attributes.Type} - {content.attributes.Title}</div>
                  {/* 可以在这里添加一个简短的描述 */}
                  <p className="text-gray-700 text-base">
                    {content.attributes.Description}
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  {content.attributes.Type === 'Video' && (
                    <button 
                      className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                      onClick={() => handleContentClick(content.id)}
                      style={{ width: '120px' }}
                    >
                      <i className="far fa-eye"></i> Watch
                    </button>
                  )}
                  {content.attributes.Type === 'PDF' && (
                    <button 
                      className="inline-block bg-green-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                      onClick={() => handleContentClick(content.id)}
                      style={{ width: '120px' }} 
                    >
                      <i className="fas fa-book"></i> Read
                    </button>
                  )}
                  {content.attributes.Type === 'PowerPoint' && (
                    <button 
                      className="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                      onClick={() => handleContentClick(content.id)}
                      style={{ width: '120px' }} 
                    >
                      <i className="fas fa-download"></i> Download
                    </button>
                  )}

                  {content.attributes.Type === 'Word' && (
                    <button 
                      className="inline-block bg-purple-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                      onClick={() => handleContentClick(content.id)}
                      style={{ width: '120px' }} 
                    >
                      <i className="fas fa-file-word"></i> Open
                    </button>
                  )}
                </div>
              </div>
            ))):(
              <p>No resources available.</p>
            )}

            </div>
          </div>
        </div>
      </div>
    </div>

  );
};
