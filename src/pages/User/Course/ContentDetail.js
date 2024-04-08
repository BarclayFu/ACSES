import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Page, Document } from '@react-pdf/renderer';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
function getWordViewerUrl(wordUrl) {
  return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(wordUrl)}`;
}

export const ContentDetail = () => {
  const [detail, setDetail] = useState(null);
  const { contentId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    fetch(`https://pretty-prosperity-17e0b1a4eb.strapiapp.com/api/contents/${contentId}?populate=Material`, {
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
      <h1><strong>{detail.attributes.Title}</strong></h1>

      {detail.attributes.Type === 'Video' && (
         <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
         <video
           controls
           style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
         >
           <source
             src={`${detail.attributes.Material.data[0].attributes.url}`}
             type="video/mp4"
           />
         </video>
       </div>
      )}

      {detail.attributes.Type === 'PDF' && (
        <div>
          <iframe
            src={`${detail.attributes.Material.data[0].attributes.url}`}
            width="100%"
            height="600px"
            title="PDF Viewer"
          ></iframe>
          <button className="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
          <a href={`${detail.attributes.Material.data[0].attributes.url}`} target="_blank">View PDF in new tab</a>
          </button>
        </div>
        
      )}

      {detail.attributes.Type === 'Word' && (
        <div>
          <iframe
            src={getWordViewerUrl(detail.attributes.Material.data[0].attributes.url)}
            width="100%"
            height="600px"
            title="Word Viewer"
          ></iframe>
        </div>
      )}

      {detail.attributes.Type === 'PowerPoint' && (
        <div>
          <iframe
            src={getWordViewerUrl(detail.attributes.Material.data[0].attributes.url)}
            width="100%"
            height="600px"
          ></iframe>
        </div>
      )}



    </div>
  );
};
