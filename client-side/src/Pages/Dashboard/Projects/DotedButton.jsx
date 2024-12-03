import React, { useState, useEffect, useRef } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useTaskManage from '../../../Hooks/useTaskManage';

function DotedButton( {options = [], top, right, cardId } ) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for detecting outside clicks
  const axiosSecure = useAxiosSecure();
  const [ tasks, isTaskLoading, reFetchTask ] = useTaskManage();
  const handleOptionClick = (type) => {
    // Perform actions based on the type
    switch (type) {
      //Add Case For Projects
      case 'editProjectName':
        console.log('editProjectName...', cardId);
        break;
      case 'addDueTimeProject':
        console.log('addDueTimeProject...');
        break;
      case 'deleteProject':
        console.log('deleteProject...');
        break;
      //Add Case For Tasks
      case 'addManualTimeTask':
        console.log('addManualTimeTask...', cardId);
        break;
      case 'editTaskName':
        console.log('editTaskName...');
        break;
      case 'addDueTimeTask':
        console.log('addDueTimeTask...');
        break;
      case 'deleteTask':
        console.log('deleteTask...');
        axiosSecure.delete(`/task/delete/${cardId}`)
          .then((res) => {
            console.log(res.data);
            reFetchTask();
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      default:
        console.log('Unknown action');
    }
    setIsOpen(false); // Close the menu after clicking an option
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // Close the dropdown if clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`absolute top-${top} right-${right} `} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="5" cy="12" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="19" cy="12" r="1.5" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.type}
                className="px-2 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick(option.type)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DotedButton;
