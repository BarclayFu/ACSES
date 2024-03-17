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
 
  // 递归地渲染列表项
  const renderListItems = (items) => {
    return items.map((item, index) => {
      if (item.type === 'list-item') {
        return <li key={index} style={{ listStyleType: 'disc', marginLeft: '20px' }}>{renderListItems(item.children)}</li>;
      }
      return item.text;
    });
  };

  // 渲染 objectives 中的每一项（可能是列表或段落）
  const renderObjectivesItem = (item) => {
    if (item.type === 'list') {
      return item.format === 'unordered' ? <ul style={{ paddingLeft: 0 }}>{renderListItems(item.children)}</ul>
                                         : <ol>{renderListItems(item.children)}</ol>;
    } else if (item.type === 'paragraph') {
      return <p>{item.children.map(child => child.text)}</p>;
    }
  };

  // 渲染 objectives
  const renderObjectives = (objectives) => {
    return objectives.map((item, index) => renderObjectivesItem(item));
  };


  // 解析并渲染 overview
  const renderOverview = (overview) => {
    return overview.map((paragraph, index) => {
      return <p key={index}>{paragraph.children.map(child => child.text)}</p>;
    });
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full bg-white" >
      
      {/* 这里可以展示更多的content详情 */}
      <div style={{ backgroundColor: "#fff",borderRadius:10,padding:20,marginBottom:20 }}>
        <div style={{ fontWeight: "bold", textAlign: "center", fontSize: "1.5rem", marginBottom: "10px" }}>{session.attributes.Title}</div>
        <Content sessionId={sessionId} />
        {/* 
        <div>Tags: {session.attributes.Tags}</div>
        <div>Duration: {session.attributes.Duration}</div>
        <div>Audience: {session.attributes.Audience}</div> */}
        <div className="bg-white p-4 my-4 rounded-lg shadow">
          <div className="mb-2">
            <strong className="font-bold text-lg text-blue-700">Overview:</strong>
            <div className="mt-2 ml-4 text-gray-700">{renderOverview(session.attributes.Overview)}</div>
          </div>
        </div>

        <div className="bg-white p-4 my-4 rounded-lg shadow">
          <div className="mb-2">
            <strong className="font-bold text-lg text-blue-700">Objective:</strong>
            <ul className="list-disc mt-2 ml-8 text-gray-700">
              {renderObjectives(session.attributes.Objectives)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
