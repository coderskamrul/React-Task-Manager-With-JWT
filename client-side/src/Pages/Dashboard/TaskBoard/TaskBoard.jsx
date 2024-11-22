import React, { useContext } from "react";
import AddTaskForm from "./AddTaskForm";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
const TaskBoard = ( ) => {
  const { id } = useParams();

  const {projects, setCurrentProject} = useContext(AuthContext);
  const currentProject = projects.find((project) => project.projectId === id);
  console.log(projects);
  console.log(currentProject);
  console.log(id);
  setCurrentProject(currentProject);
  
  const tasks = {
    todo: [
      {
        id: 1,
        title: "Test task",
        priority: "High",
        description: "Task manager YouTube tutorial",
        date: "9-Feb-2024",
        tags: ["tutorial"],
        assignees: ["AJ", "JS", "CA"],
      },
      {
        id: 1,
        title: "Test task",
        priority: "High",
        description: "Task manager YouTube tutorial",
        date: "9-Feb-2024",
        tags: ["tutorial"],
        assignees: ["AJ", "JS", "CA"],
      },
      {
        id: 1,
        title: "Test task",
        priority: "High",
        description: "Task manager YouTube tutorial",
        date: "9-Feb-2024",
        tags: ["tutorial"],
        assignees: ["AJ", "JS", "CA"],
      },
      {
        id: 1,
        title: "Test task",
        priority: "High",
        description: "Task manager YouTube tutorial",
        date: "9-Feb-2024",
        tags: ["tutorial"],
        assignees: ["AJ", "JS", "CA"],
      },
      // Add more To Do tasks as needed
    ],
    inProgress: [
      {
        id: 2,
        title: "Test task",
        priority: "High",
        description: "Task manager YouTube tutorial",
        date: "9-Feb-2024",
        tags: ["tutorial"],
        assignees: ["AJ", "JS", "CA"],
      },
      // Add more In Progress tasks as needed
    ],
    backlog: [
      {
        id: 2,
        title: "Test task",
        priority: "High",
        description: "Task manager YouTube tutorial",
        date: "9-Feb-2024",
        tags: ["tutorial"],
        assignees: ["AJ", "JS", "CA"],
      },
      // Add more In Progress tasks as needed
    ],
    completed: [
      {
        id: 3,
        title: "Test task",
        priority: "High",
        description: "Task manager YouTube tutorial",
        date: "9-Feb-2024",
        tags: ["tutorial"],
        assignees: ["AJ", "JS", "CA"],
      },
      // Add more Completed tasks as needed
    ],
  };

  const TaskCard = ({ task }) => (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-red-600 font-bold text-xs">HIGH PRIORITY</span>
        <span className="text-gray-500 text-xs">{task.date}</span>
      </div>
      <h3 className="font-semibold text-gray-800 mb-1">{task.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
        <span>0</span> {/* Placeholder for icon */}
        <span>2</span> {/* Placeholder for icon */}
        <span>0/1</span> {/* Placeholder for icon */}
      </div>
      <div className="flex space-x-1 mb-2">
        {task.assignees.map((assignee, index) => (
          <span
            key={index}
            className="bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs"
          >
            {assignee}
          </span>
        ))}
      </div>
      <div className="text-sm text-blue-600 bg-blue-100 rounded-full px-2 py-1 inline-block mb-3">
        {task.tags[0]}
      </div>
      <button className="text-blue-500 text-sm font-medium mt-2">Add Subtask</button>
    </div>
  );

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
        <span>List View</span>
    </button>
        </div>
    <div className='w-full mt-2'>
           
           










    <div className="py-4">
      {/* Wrapper for horizontal scroll on small screens */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {/* Backlog Column */}
          <div className="flex-none w-[300px] bg-gray-100 p-4 rounded-lg shadow-md h-[500px]">
            <h2 className="text-lg font-semibold text-center mb-4 sticky top-0 bg-gray-100 py-2">
              Backlog
            </h2>
            <div className="h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
              {tasks.backlog.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>

          {/* To Do Column */}
          <div className="flex-none w-[300px] bg-gray-100 p-4 rounded-lg shadow-md h-[500px]">
            <h2 className="text-lg font-semibold text-center mb-4 sticky top-0 bg-gray-100 py-2">
              To Do
            </h2>
            <div className="h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
              {tasks.todo.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="flex-none w-[300px] bg-gray-100 p-4 rounded-lg shadow-md h-[500px]">
            <h2 className="text-lg font-semibold text-center mb-4 sticky top-0 bg-gray-100 py-2">
              In Progress
            </h2>
            <div className="h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
              {tasks.inProgress.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>

          {/* Completed Column */}
          <div className="flex-none w-[300px] bg-gray-100 p-4 rounded-lg shadow-md h-[500px]">
            <h2 className="text-lg font-semibold text-center mb-4 sticky top-0 bg-gray-100 py-2">
              Completed
            </h2>
            <div className="h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
              {tasks.completed.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>








    </div>
    </div>
</div>
<AddTaskForm />
</>
    
  );
};

export default TaskBoard;
