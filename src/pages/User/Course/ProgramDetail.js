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

  return (
    <div className="container mx-auto mt-1 sm:mt-5">
      {program.attributes.Cover.data && (
        <img
          src={`http://localhost:1337${program.attributes.Cover.data.attributes.url}`}
          alt={program.attributes.Title}
          style={{ width: '200px', height: '150px' }}
        />
      )}
      <h1 className="text-xl font-semibold text-gray-800">{program.attributes.Title}</h1>
      {/* 这里可以添加更多的program详情 */}
      <Session programId={programId} />
    </div>
  );
};
