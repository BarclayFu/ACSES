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
    <div
      className="mb-6 p-4 border-2 border-blue-500 rounded-lg"
      style={{ margin: "20px auto",maxWidth:500,backgroundColor:"#fff" }}
    >
      
      {/* 这里可以展示更多的content详情 */}
      <div style={{ backgroundColor: "#fff",borderRadius:10,padding:20,marginBottom:20 }}>
      <div style={{ fontWeight: "bold",marginBottom:10 }}>{session.attributes.Title}</div>
      <div>
          <strong>Overview:</strong>
          {renderOverview(session.attributes.Overview)}
        </div>
        <div>Tags: {session.attributes.Tags}</div>
        <div>Duration: {session.attributes.Duration}</div>
        <div>
          <strong>Objective:</strong>
          <ul>{renderObjectives(session.attributes.Objectives)}</ul>
        </div>
        <div>Audience: {session.attributes.Audience}</div>
      </div>

      <Content sessionId={sessionId} />
    </div>
  );
};
