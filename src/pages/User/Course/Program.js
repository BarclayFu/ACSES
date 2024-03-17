import React, { useState, useEffect } from 'react';
// import {Session} from '../Course/Session';
import { useNavigate } from 'react-router-dom';

export const Program = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    fetch('http://localhost:1337/api/programs?populate=Cover', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setPrograms(data.data);
    })
    .catch(error => console.error('Error fetching programs:', error));
  }, []);

  // 解析Overview中的内容
  const parseOverview = (overview) => {
    return overview.map((block) => {
      if (block.type === 'paragraph') {
        return block.children.map((child) => child.text).join('');
      }
      return '';
    }).join('\n');
  };

  const navigate = useNavigate();

  const handleProgramClick = (programId) => {
    navigate(`/programs/${programId}`);
  };


  return (
<div class="container mx-auto">
<div class="my-5">
  <h1 class="capitalize text-xl font-medium">Published Courses</h1>
</div>

<div class="container mx-auto flex flex-wrap -mx-2 gap-4"  >
  {programs.map(program => (
    <div key={program.id} className="p-4 border-2 border-blue-500 rounded-lg w-1/4 mb-2 md:mb-4" onClick={() => handleProgramClick(program.id)}>
      {program.attributes.Cover.data && (
        <img
          src={`http://localhost:1337${program.attributes.Cover.data.attributes.url}`}
          alt={program.attributes.Title}
          style={{ width: '240px', height: '150px' }}
        />
      )}
      <h1 className="text-xl font-semibold text-gray-800">{program.attributes.Title}</h1>
      {/* <p className="mt-2 text-gray-600">{parseOverview(program.attributes.Overview)}</p> */}
      <div className="mt-4">
        {/* <p>Duration: <span className="text-gray-600">{program.attributes.Duration}</span></p> */}
        <p>Tags: <span className="text-gray-600">{program.attributes.Tags}</span></p>
        {/* <p>Audience: <span className="text-gray-600">{program.attributes.Audience}</span></p>
        <p>Focus Area: <span className="text-gray-600">{program.attributes.FocusArea}</span></p> */}
        {/* 其他属性 */}
      </div>
    </div>
  ))}
</div>
</div>



  );
};



