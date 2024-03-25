import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Page, Document } from '@react-pdf/renderer';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
    <div
      className="mb-6 p-4 border-2 border-blue-500 rounded-lg"
      style={{ margin: "20px auto", maxWidth: 1080}}
    >
      <h1>{detail.attributes.Title}</h1>

      {detail.attributes.Type === 'Video' && (
         <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
         <video
           controls
           style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
         >
           <source
             src={`http://localhost:1337${detail.attributes.Material.data[0].attributes.url}`}
             type="video/mp4"
           />
         </video>
       </div>
      )}

      {detail.attributes.Type === 'Document' && (
        <div>
          <iframe
            src={`http://localhost:1337${detail.attributes.Material.data[0].attributes.url}`}
            width="100%"
            height="600px"
            title="PDF Viewer"
          ></iframe>
          <a href={`http://localhost:1337${detail.attributes.Material.data[0].attributes.url}`} target="_blank">View PDF</a>
        </div>
        
      )}


    </div>
  );
};
