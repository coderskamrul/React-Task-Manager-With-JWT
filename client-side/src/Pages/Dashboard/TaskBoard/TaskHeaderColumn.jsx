import React from 'react'

const TaskHeaderColumn = () => {
  return (
    <div className="w-full flex justify-between gap-4 py-4">
      {/* To Do Column */}
      <div className="w-full h-10 md:h-12 px-2 md:px-4 rounded bg-white flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4 rounded-full bg-blue-600"></div>
          <p className="text-sm md:text-base text-gray-600">To Do</p>
        </div>
        <button className="hidden md:block">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className="text-lg text-black"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z" />
          </svg>
        </button>
      </div>

      {/* In Progress Column */}
      <div className="w-full h-10 md:h-12 px-2 md:px-4 rounded bg-white flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4 rounded-full bg-yellow-600"></div>
          <p className="text-sm md:text-base text-gray-600">In Progress</p>
        </div>
        <button className="hidden md:block">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className="text-lg text-black"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z" />
          </svg>
        </button>
      </div>

      {/* Completed Column */}
      <div className="w-full h-10 md:h-12 px-2 md:px-4 rounded bg-white flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="w-4 h-4 rounded-full bg-green-600"></div>
          <p className="text-sm md:text-base text-gray-600">Completed</p>
        </div>
      </div>
    </div>
  )
}

export default TaskHeaderColumn