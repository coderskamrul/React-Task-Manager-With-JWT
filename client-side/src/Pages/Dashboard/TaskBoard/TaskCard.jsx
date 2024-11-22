import React from 'react';

const TaskCard = () => {
  return (
    <div className="w-full h-fit bg-white shadow-md p-4 rounded">
      <div className="w-full flex justify-between">
        <div className="flex flex-1 gap-1 items-center text-sm font-medium text-red-600">
          <span className="text-lg">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M6 17.59L7.41 19 12 14.42 16.59 19 18 17.59l-6-6z"></path>
              <path d="m6 11 1.41 1.41L12 7.83l4.59 4.58L18 11l-6-6z"></path>
            </svg>
          </span>
          <span className="uppercase">High Priority</span>
        </div>
        <div>
          <div className="relative inline-block text-left">
            <button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600" type="button" aria-haspopup="menu" aria-expanded="false">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-600"></div>
        <h4 className="line-clamp-1 text-black">Test task</h4>
      </div>
      <span className="text-sm text-gray-600">9-Feb-2024</span>
      <div className="w-full border-t border-gray-200 my-2"></div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 2c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3.586L12 21.414 15.414 18H19c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2H5zm14 14h-4.414L12 18.586 9.414 16H5V4h14v12z"></path>
              <path d="M7 7h10v2H7zm0 4h7v2H7z"></path>
            </svg>
            <span>0</span>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 0 1 5 0v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5a2.5 2.5 0 0 0 5 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"></path>
            </svg>
            <span>2</span>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path>
            </svg>
            <span>0/1</span>
          </div>
        </div>
        <div className="flex flex-row-reverse">
          <div className="w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600">
            <div className="px-4">
              <div className="relative">
                <button className="group inline-flex items-center outline-none" type="button" aria-expanded="false">
                  <span>CA</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-yellow-600">
            <div className="px-4">
              <div className="relative">
                <button className="group inline-flex items-center outline-none" type="button" aria-expanded="false">
                  <span>JS</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-red-600">
            <div className="px-4">
              <div className="relative">
                <button className="group inline-flex items-center outline-none" type="button" aria-expanded="false">
                  <span>AJ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 border-t border-gray-200">
        <h5 className="text-base line-clamp-1 text-black">Task manager youtube tutorial</h5>
        <div className="p-4 space-x-8">
          <span className="text-sm text-gray-600">9-Feb-2024</span>
          <span className="bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium">tutorial</span>
        </div>
      </div>
      <div className="w-full pb-2">
        <button className="w-full flex gap-4 items-center text-sm text-gray-500 font-semibold disabled:cursor-not-allowed disabled:text-gray-300">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z"></path>
          </svg>
          <span>ADD SUBTASK</span>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;