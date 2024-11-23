import React, { useState, useRef, useEffect } from "react";

const MultiSelectDropdown = ({ options = [], selectedItems = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown container

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (key, value) => {
    // Select or deselect items based on the 'key'
    const updatedItems = selectedItems.includes(key)
      ? selectedItems.filter((item) => item !== key)
      : [...selectedItems, key];
    onChange(updatedItems); // Call the parent function to update state
  };

  const handleRemoveItem = (key) => {
    const updatedItems = selectedItems.filter((item) => item !== key);
    onChange(updatedItems); // Call the parent function to update state
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Dropdown trigger */}
      <div
        className="border border-gray-300 px-4 py-2 rounded-md cursor-pointer flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <div className="flex flex-wrap gap-2">
          {selectedItems.length > 0 ? (
            selectedItems.map((key, index) => {
              const selectedOption = options.find(option => option.key === key);
              return (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm"
                >
                  <span>{selectedOption?.value}</span>
                  <button
                    type="button"
                    className="ml-1 text-blue-700 hover:text-blue-900"
                    onClick={() => handleRemoveItem(key)}
                  >
                    ✕
                  </button>
                </div>
              );
            })
          ) : (
            <span className="text-gray-400">Select items</span>
          )}
        </div>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div
          className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-md max-h-48 overflow-y-auto transition duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {options.map((option) => (
            <div
              key={option.key}
              className={`px-4 py-2 flex items-center cursor-pointer ${
                selectedItems.includes(option.key)
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleSelect(option.key, option.value)}
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(option.key)}
                onChange={() => handleSelect(option.key, option.value)}
                className="mr-2"
              />
              <span>{option.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
