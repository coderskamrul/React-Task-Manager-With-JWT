import React, { useState, useEffect, useRef } from 'react';

function DotedButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for detecting outside clicks

  const options = [
    { label: 'Add manual time', type: 'addTime' },
    { label: 'Edit task name', type: 'editName' },
    { label: 'Change List', type: 'changeList' },
    { label: 'Change Status', type: 'changeStatus' },
  ];

  const handleOptionClick = (type) => {
    // Perform actions based on the type
    switch (type) {
      case 'addTime':
        console.log('Adding manual time...');
        break;
      case 'editName':
        console.log('Editing task name...');
        break;
      case 'changeList':
        console.log('Changing list...');
        break;
      case 'changeStatus':
        console.log('Changing status...');
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
    // <div className="absolute top-3 right-3">
    //   <button
    //     onClick={() => setIsOpen(!isOpen)}
    //     className="text-gray-500 hover:text-gray-700 focus:outline-none"
    //   >
    //     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    //       <circle cx="5" cy="12" r="1.5" />
    //       <circle cx="12" cy="12" r="1.5" />
    //       <circle cx="19" cy="12" r="1.5" />
    //     </svg>
    //   </button>
    //   {isOpen && (
    //     <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
    //       <ul className="py-1">
    //         {options.map((option) => (
    //           <li
    //             key={option.type}
    //             className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
    //             onClick={() => handleOptionClick(option.type)}
    //           >
    //             {option.label}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   )}
    // </div>
<div className="absolute top-3 right-3" ref={dropdownRef}>
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
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
