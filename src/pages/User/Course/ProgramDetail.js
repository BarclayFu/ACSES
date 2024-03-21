import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Session } from './Session';
import { GoArrowDown } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import { GoChevronDown } from "react-icons/go";

export const ProgramDetail = () => {
  const [program, setProgram] = useState(null);
  const { programId } = useParams();
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);

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


  const toggleExpand = () => { // Moved here
    setIsExpanded(!isExpanded);
  };

  const toggleOverview = () => {
    setIsOverviewExpanded(!isOverviewExpanded);
  };

  return (
    <div className="w-full bg-white flex">
      <div className="bg-white w-2/3" >
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
        

      <div className="w-full bg-white">
        <div className="mt-6 px-4 sm:px-6 lg:px-8">
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
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                  <li className="px-6 py-4">
                    <div className="flex justify-between">
                      <div className="text-sm font-medium text-gray-500">Title</div>
                      <div className="text-sm font-medium text-gray-500">Date Added</div>
                      <div className="text-sm font-medium text-gray-500">Resources</div>
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
      </div>

      <div className="bg-white w-1/3" >
              {/* <div className="flex mt-4 space-x-3 justify-center">
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">Duration: {program.attributes.Duration}</span>
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">Audience: {program.attributes.Audience}</span>
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">Tags: {program.attributes.Tags}</span>
            </div> */}
      </div>
    </div>

    

    
  );
};
