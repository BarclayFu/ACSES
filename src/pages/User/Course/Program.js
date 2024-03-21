import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Program = () => {
  const [programs, setPrograms] = useState([]);
  const [grades, setGrades] = useState([]);
  const [focusAreas, setFocusAreas] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('Audience'); // 默认选中'All'
  const [selectedFocusArea, setSelectedFocusArea] = useState('Focus Area');

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    fetch('http://localhost:1337/api/programs', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      const allGrades = Array.from(new Set(data.data.map(program => program.attributes.Audience).filter(audience => audience)));
      const allFocusAreas = Array.from(new Set(data.data.map(program => program.attributes.FocusArea).filter(focusArea => focusArea)));

      setGrades(['Audience', ...allGrades]);
      setFocusAreas(['Focus Area', ...allFocusAreas]);
    })
    .catch(error => console.error('Error fetching filter options:', error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    let url = 'http://localhost:1337/api/programs?populate=Cover';

    if (selectedGrade !== 'Audience') {
      url += `&filters[Audience][$eq]=${selectedGrade}`;
    }
    if (selectedFocusArea !== 'Focus Area') {
      url += `&filters[FocusArea][$eq]=${selectedFocusArea}`;
    }

    fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setPrograms(data.data);
    })
    .catch(error => console.error('Error fetching programs:', error));
  }, [selectedGrade, selectedFocusArea]);
  
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

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
  };

  const handleFocusAreaChange = (event) => {
    setSelectedFocusArea(event.target.value);
  };

  return (
    
    <div className="container mx-auto p-5 ">
             {/* Grade和FocusArea下拉框 */}
        <div className="mb-4">
          <select value={selectedGrade} onChange={handleGradeChange} className="p-2 border border-gray-300 rounded mr-2">
            {grades.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
          <select value={selectedFocusArea} onChange={handleFocusAreaChange} className="p-2 border border-gray-300 rounded">
            {focusAreas.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>
      <h1 className="text-2xl font-semibold mb-6">Resources</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {programs.map(program => (
          <div key={program.id}
               className="flex bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden" 
               style={{ height: '100px' }} // 设置一个固定高度
               onClick={() => handleProgramClick(program.id)}>
            <div className="p-3 flex flex-col justify-between" style={{ width: '66.66%' }}>
              <h2 className="font-medium text-sm">{program.attributes.Title}</h2>
              <p className="text-xs">{program.attributes.Description}</p>
            </div>
            {program.attributes.Cover.data && (
              <div className="w-1/3">
                <img
                  className="object-cover h-full w-full" // 图片覆盖整个容器区域
                  src={`http://localhost:1337${program.attributes.Cover.data.attributes.url}`}
                  alt={program.attributes.Title}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  
  
}
