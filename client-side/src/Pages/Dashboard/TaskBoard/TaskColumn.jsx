import React from 'react'
import TaskCard from './TaskCard'
import TaskHeaderColumn from './TaskHeaderColumn'
import AddTaskForm from './AddTaskForm'

const TaskColumn = () => {
  return (
    <>
        <div className='w-full'>
            <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold capitalize">Tasks</h2>
        <button
            type="button"
            className="flex flex-row-reverse items-center gap-1 bg-blue-600 text-white rounded-md px-3 py-2"
        >
            <span className="" onClick={() => document.getElementById('my_modal_2').showModal()}>Create Task</span>
            {/* <button >Create Task</button> */}

            <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className="text-lg"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path d="M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z" />
            </svg>
        </button>
            </div>
            <div className='w-full px-1 sm:px-0'>
                <div className="flex space-x-6 rounded-xl p-1" role="tablist" aria-orientation="horizontal">
            <button
                className="w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white text-blue-700 border-b-2 border-blue-600"
                id="headlessui-tabs-tab-:rcf:"
                role="tab"
                type="button"
                aria-selected="true"
                tabIndex="0"
                data-headlessui-state="selected"
            >
                <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                >
                <g fillRule="evenodd">
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"></path>
                </g>
                </svg>
                <span>Board View</span>
            </button>
            <button
                className="w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-white text-gray-800 hover:text-blue-800"
                id="headlessui-tabs-tab-:rch:"
                role="tab"
                type="button"
                aria-selected="false"
                tabIndex="-1"
                data-headlessui-state=""
            >
                <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path>
                </svg>
                <span>List Viewk</span>
            </button>
                </div>
            <div className='w-full mt-2'>
                        {/* <!-- Task Board --> */}
                        {/* <div className="p-8"> */}
                            <TaskHeaderColumn />
                        {/* </div> */}
                    <div className='class="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10"'>
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                    </div>
            </div>
            </div>
        </div>
        <AddTaskForm />
    </>
  )
}

export default TaskColumn