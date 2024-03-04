import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Session } from './Session';

export const ProgramDetail = () => {
  const [program, setProgram] = useState(null);
  const { programId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    fetch(`http://localhost:1337/api/programs/${programId}?populate=Cover,sessions`, {
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

  return (
    <div className="container mx-auto mt-1 border-blue-500 sm:mt-5" style={{ margin: "20px auto", maxWidth: 500, backgroundColor: "#fff",padding:20 }}>
      {/* {program.attributes.Cover.data && (
        <img
          src={`http://localhost:1337${program.attributes.Cover.data.attributes.url}`}
          alt={program.attributes.Title}
          style={{ width: '200px', height: '150px' }}
        />
      )} */}
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor:"#fff", borderRadius:10, padding:20, marginBottom:20}} >
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} className="flex flex-col">
          <h1 className="text-xl font-semibold text-gray-800">{program.attributes.Title}</h1>
          <p className="mt-2 text-gray-600">{parseOverview(program.attributes.Overview)}</p>
        <div>Duration: {program.attributes.Duration}</div>
        <div>Audience: {program.attributes.Audience}</div>
        <div>Tags: {program.attributes.Tags}</div>
        </div>
      </div>
      {/* 这里可以添加更多的program详情 */}
      <Session programId={programId} />
    </div>
  );
};
