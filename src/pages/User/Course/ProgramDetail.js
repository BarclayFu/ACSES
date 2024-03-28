import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Session } from './Session';
import { GoChevronRight } from "react-icons/go";
import { GoChevronDown } from "react-icons/go";

export const ProgramDetail = () => {
  const [program, setProgram] = useState(null);
  const { programId } = useParams();
  const [isExpanded, setIsExpanded] = useState(true)
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(true);
  const [isWhatIncludedExpanded, setIsWhatIncludedExpanded] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    fetch(`https://pretty-prosperity-17e0b1a4eb.strapiapp.com/api/programs/${programId}?populate=Cover,sessions`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setProgram(data.data);
    })
    .catch(error => console.error('Error fetching program details:', error));
  }, [programId]);

  if (!program) {
    return <div>Loading...</div>;
  }

  const parseOverview = (overview) => {
    return overview.map((block) => {
      if (block.type === 'paragraph') {
        return block.children.map((child) => child.text).join('');
      }
      return '';
    }).join('\n');
  };

  const parseWhatIncluded = (whatIncluded) => {
    return whatIncluded.map(block => {
      // 对于段落类型
      if (block.type === 'paragraph') {
        return <p>{block.children.map(child => child.text).join('')}</p>;
      }
  
      // 对于无序列表类型
      if (block.type === 'list' && block.format === 'unordered') {
        return (
          <ul style={{ listStyleType: 'disc', paddingLeft: '1em' }}>
            {block.children.map(listItem => (
              <li key={listItem.children[0].text}>
                {listItem.children.map(child => child.text)}
              </li>
            ))}
          </ul>
        );
      }
  
      // 其他类型可以根据需要添加
    });
  };
  

  const parseSkill = (skill) => {
    return skill.map((skill, index) => {
      // 对于标题类型
      if (skill.type === 'heading') {
        const Tag = `h${skill.level}`; // 根据 level 创建对应级别的标题标签
        return <Tag key={index} style={{fontSize:15,fontWeight:"bold",marginBottom:20,marginTop:20}}>{skill.children.map(child => child.text).join('')}</Tag>;
      }
  
      // 对于段落类型
      if (skill.type === 'paragraph') {
        return <p key={index}>{skill.children.map(child => child.text).join('')}</p>;
      }
  
      // 对于无序列表类型
      if (skill.type === 'list' && skill.format === 'unordered') {
        return (
          <ul key={index} style={{ listStyleType: 'disc', paddingLeft: '1em' }}>
            {skill.children.map((listItem, listItemIndex) => (
              <li key={listItemIndex} style={{marginTop:10}}>
                {listItem.children.map(child => child.text)}
              </li>
            ))}
          </ul>
        );
      }
  
      // 其他类型可以根据需要添加
      return null;
    });
  };
  
  


  const toggleExpand = () => { // Moved here
    setIsExpanded(!isExpanded);
  };

  const toggleOverview = () => {
    setIsOverviewExpanded(!isOverviewExpanded);
  };

  const toggleWhatIncluded = () => {
    setIsWhatIncludedExpanded(!isWhatIncludedExpanded);
  };

  return (
    <div className="w-full bg-[#ffffff] flex container" style={{margin:"auto",borderRadius:20,overflow:"hidden",marginTop:20,marginBottom:20}}>
      <div className="bg-[#ffffff] w-2/3" >
        <div className="p-6">
          <div className="flex flex-col items-center w-full">
            <div className="flex justify-between items-center w-full">
              <button
                onClick={toggleOverview}
                className="w-full flex items-center justify-start text-xl text-gray-600 mb-4"
              >
                {isOverviewExpanded ? <GoChevronDown className="mr-2" /> : <GoChevronRight className="mr-2" />}
                <span>Overview</span>
              </button>
            </div>
            {isOverviewExpanded && (
              <p className="text-gray-600 text-center text-justify">
                {parseOverview(program.attributes.Overview)}
              </p>
            )}
          </div>
        </div>


        <div className="p-6">
          <div className="flex flex-col items-center w-full">
            <div className="flex justify-between items-center w-full">
              <button
                onClick={toggleWhatIncluded}
                className="w-full flex items-center justify-start text-xl text-gray-600 mb-4"
              >
                {isWhatIncludedExpanded ? <GoChevronDown className="mr-2" /> : <GoChevronRight className="mr-2" />}
                <span>What's Included</span>
              </button>
            </div>
            {isWhatIncludedExpanded && (
              <p className="text-gray-600 text-center text-justify">
                {parseWhatIncluded(program.attributes.WhatIncluded)}
              </p>
            )}
          </div>
        </div>
        

        
          <div className="p-6">
            <div className="flex justify-between items-center">
              <button
                className="w-full flex items-center justify-start text-xl text-gray-600 mb-4"
                onClick={toggleExpand}
              >
                {isExpanded ? <GoChevronDown /> : <GoChevronRight />}
                <span className="text-xl text-gray-600 block mb-2 leading-loose">Resources</span> 
              </button>
            </div>

              {isExpanded && (
                <div className="bg-[#ffffff] overflow-hidden sm:rounded-lg">
                  <ul className="divide-y divide-gray-200">
                    <li className="px-6 py-4">
                      <div className="flex justify-between">
                        <div className="w-1/3 text-sm font-medium text-gray-500 text-left">Title</div>
                        <div className="w-1/3 text-sm font-medium text-gray-500 text-center">Duration</div>
                        <div className="w-1/3 text-sm font-medium text-gray-500 text-center">Tag</div>
                      </div>
                    </li>
                    <li>
                      <Session programId={programId} />
                    </li>
                  </ul>
                </div>
              )}
          </div>
        
      </div>

      <div className="bg-[#F0F3FB] w-1/3"  style={{margin:20,borderRadius:20}}>
        <div className="p-6">
          <p style={{fontWeight:"bold",fontSize:20,marginBottom:20}}>Skills</p>
          {parseSkill(program.attributes.Skill)}
        </div>
      </div>
    </div>

    

    
  );
};
