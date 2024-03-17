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
    // <div className="w-full" >
    //   {/* {program.attributes.Cover.data && (
    //     <img
    //       src={`http://localhost:1337${program.attributes.Cover.data.attributes.url}`}
    //       alt={program.attributes.Title}
    //       style={{ width: '200px', height: '150px' }}
    //     />
    //   )} */}
    //   <div className="w-full" style={{display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor:"#F8F8FF", borderRadius:10, padding:20, marginBottom:20}} >
    //     <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} className="flex flex-col w-full">
    //       <h1 className="text-xl font-semibold text-gray-800">{program.attributes.Title}</h1>
    //       <p className="mt-2 text-gray-600">{parseOverview(program.attributes.Overview)}</p>
    //       <div className="flex flex-row justify-center items-center space-x-4 mt-2">
    //         <span>Duration: {program.attributes.Duration}</span>
    //         <span>Audience: {program.attributes.Audience}</span>
    //         <span>Tags: {program.attributes.Tags}</span>
    //       </div>
    //     </div>
    //   </div>
    
    
    //   <div> 
    //   {/* 这里可以添加更多的program详情 */}
    //   <Session programId={programId} />
    //   </div>
    // </div>
    <div className="w-full bg-white" >
      {/* Program Cover Image */}
      {/* Uncomment if there is a cover image */}
      {/* {program.attributes.Cover.data && (
        <img
          className="object-cover w-52 h-40 mx-auto rounded-lg"
          src={`http://localhost:1337${program.attributes.Cover.data.attributes.url}`}
          alt={program.attributes.Title}
        />
      )} */}
      <div className="w-full bg-gray-100 p-6 rounded-lg shadow-md" >
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">{program.attributes.Title}</h1>
          <div className="p-8">
            <p className="text-gray-600 text-center text-justify"><span className="font-bold">Overview: </span> {parseOverview(program.attributes.Overview)}</p>
          </div>
          <div className="flex mt-4 space-x-3 justify-center">
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">Duration: {program.attributes.Duration}</span>
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">Audience: {program.attributes.Audience}</span>
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">Tags: {program.attributes.Tags}</span>
          </div>
        </div>
      </div>
      
      {/* More program details */}
      {/* <div className="mt-6"> 
        <Session programId={programId} />
      </div> */}
      <div className="mt-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Session Details</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            <Session programId={programId} />
          </ul>
        </div>
      </div>
    </div>

    
  );
};
