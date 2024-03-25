import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Content } from './Content';
import { GoChevronRight } from "react-icons/go";
import { GoChevronDown } from "react-icons/go";

export const SessionDetail = () => {
  const [session, setSession] = useState(null);
  const { sessionId } = useParams();
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(true);
  const [isDiscussionTopicsExpanded, setIsDiscussionTopicsExpanded] = useState(true);
  const [isObjecitveExpanded, setIsObjectiveExpanded] = useState(true);
  const [isAlignmentExpanded, setIsAlignmentExpanded] = useState(true);

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


  const renderDiscussionTopics = (discussionTopics) => {
    return discussionTopics.map((topic, index) => {
      // 对于标题类型
      if (topic.type === 'heading') {
        const HeadingTag = `h${topic.level}`; // 根据 level 创建对应的标题标签
        return <HeadingTag key={index}>{topic.children.map(child => child.text).join('')}</HeadingTag>;
      }
  
      // 对于段落类型
      if (topic.type === 'paragraph') {
        return <p key={index}>{topic.children.map(child => child.text).join('')}</p>;
      }
  
      // 对于无序列表类型
      if (topic.type === 'list' && topic.format === 'unordered') {
        return (
          <ul key={index} style={{ listStyleType: 'disc', paddingLeft: '1em' }}>
            {topic.children.map((listItem, listItemIndex) => (
              <li key={listItemIndex}>
                {listItem.children.map(child => child.text)}
              </li>
            ))}
          </ul>
        );
      }
  
      // 可以添加其他类型的处理方式
      return null;
    });
  };



  const renderActivities = (activities) => {
    return activities.map((activity, index) => {
      // 对于段落类型
      if (activity.type === 'paragraph') {
        return <p key={index}>{activity.children.map(child => child.text).join('')}</p>;
      }
  
      // 对于标题类型
      if (activity.type === 'heading') {
        const HeadingTag = `h${activity.level}`; // 根据 level 创建对应的标题标签
        return <HeadingTag key={index}>{activity.children.map(child => child.text).join('')}</HeadingTag>;
      }
  
      // 可以添加其他类型的处理方式
      return null;
    });
  };


  const renderAlignment = (alignment) => {
    return alignment.map((item, index) => {
      // 对于段落类型
      if (item.type === 'paragraph') {
        return (
          <p key={index}>
            {item.children.map((child, childIndex) => {
              // 检查文本是否需要加粗
              return child.bold ? <strong key={childIndex}>{child.text}</strong> : <span key={childIndex}>{child.text}</span>;
            })}
          </p>
        );
      }
  
      // 可以添加其他类型的处理方式
      return null;
    });
  };
  
  
  

  const toggleOverview = () => {
    setIsOverviewExpanded(!isOverviewExpanded);
  };

  const toggleDiscussionTopics = () => {
    setIsDiscussionTopicsExpanded(!isDiscussionTopicsExpanded);
  };

  const toggleObjective = () => {
    setIsObjectiveExpanded(!isObjecitveExpanded);
  };

  const toggleAlignment = () => {
    setIsAlignmentExpanded(!isAlignmentExpanded); // 切换状态
  };
  

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full bg-[#ffffff] flex container" style={{margin:"auto",borderRadius:20,overflow:"hidden",marginTop:20,marginBottom:20}}>
      
      {/* 这里可以展示更多的content详情 */}
      <div className="bg-[#ffffff] w-2/3" >
        <div style={{ borderRadius:10,padding:20,marginBottom:20 }}>
          {/* <div style={{ fontWeight: "bold", textAlign: "center", fontSize: "1.5rem", marginBottom: "10px" }}>{session.attributes.Title}</div> */}
          
          {/* 
          <div>Tags: {session.attributes.Tags}</div>
          <div>Duration: {session.attributes.Duration}</div>
          <div>Audience: {session.attributes.Audience}</div> */}
          
          <div>
            <div className="mb-2">
              <button 
                onClick={toggleOverview}
                className="text-lg  flex items-center justify-start w-full"
              >
                {isOverviewExpanded ? <GoChevronDown className="mr-2" />  : <GoChevronRight className="mr-2" />} {/* 添加一个展开/折叠的指示器 */}
                <span>Overview</span>
              </button>
              {isOverviewExpanded && ( // 根据 isOverviewExpanded 状态条件渲染内容
                <div className="mt-2 ml-4 text-gray-700">
                  {renderOverview(session.attributes.Overview)}
                </div>
              )}
            </div>
          </div>



          <div>
            <div className="mb-2">
              <button 
                onClick={toggleDiscussionTopics}
                className=" text-lg flex items-center justify-start w-full"
              >
                {isDiscussionTopicsExpanded ? <GoChevronDown className="mr-2" />  : <GoChevronRight className="mr-2" />} {/* 添加一个展开/折叠的指示器 */}
                <span>Discussion Topics</span>
              </button>
              {isDiscussionTopicsExpanded && ( 
                <div className="mt-2 ml-4 text-gray-700">
                  {renderDiscussionTopics(session.attributes.DiscussionTopics)}
                </div>
              )}
            </div>
          </div>


          <div>
            <div className="mb-2">
              <button 
                onClick={toggleDiscussionTopics}
                className="text-lg flex items-center justify-start w-full"
              >
                {isDiscussionTopicsExpanded ? <GoChevronDown className="mr-2" />  : <GoChevronRight className="mr-2" />} {/* 添加一个展开/折叠的指示器 */}
                <span>Activities</span>
              </button>
              {isDiscussionTopicsExpanded && ( 
                <div className="mt-2 ml-4 text-gray-700">
                  {renderActivities(session.attributes.Activities)}
                </div>
              )}
            </div>
          </div>



          <Content sessionId={sessionId} />

        </div>
      </div>

      <div className="bg-[#ffffff] w-1/3 mr-20 ml-30" >
        <div className="p-4 my-4 rounded-lg shadow bg-[#f6f6f6] ml-30" style={{ padding: '10px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div className="mb-2">
            <button
              onClick={toggleObjective}
              className=" text-md  flex items-center justify-start w-full"
              style={{ fontSize: '14px' }} // 修改字体大小
            >
              {isObjecitveExpanded ? <GoChevronDown className="mr-2" /> : <GoChevronRight className="mr-2" />}
              <span>Objective</span>
            </button>
            {isObjecitveExpanded && (
              <ul className="list-disc mt-2 ml-8 text-gray-700" style={{ fontSize: '14px' }}> {/* 修改字体大小 */}
                {renderObjectives(session.attributes.Objectives)}
              </ul>
            )}
          </div>
        </div>



        <div className="p-4 my-4 rounded-lg shadow bg-[#f6f6f6] ml-30" style={{ padding: '10px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div className="mb-2">
            <button 
              onClick={toggleAlignment}
              className=" text-lg  flex items-center justify-start w-full"
              style={{ fontSize: '14px' }} // 修改字体大小
            >
              {isAlignmentExpanded ? <GoChevronDown className="mr-2" /> : <GoChevronRight className="mr-2" />} {/* 展开/折叠指示 */}
              <span>Alignment</span>
            </button>
            {isAlignmentExpanded && (
              <ul className="list-disc mt-2 ml-8 text-gray-700" style={{ fontSize: '14px' }}>
                {renderAlignment(session.attributes.Alignment)}
              </ul>
            )}
          </div>
        </div>



      </div>

    </div>
  );
};
