// import React, { useContext, useEffect, useState } from "react";
// import AddTaskForm from "./AddTaskForm";
// import { useParams } from "react-router-dom";
// import { AuthContext } from "../../../Provider/AuthProvider";
// import useTaskManage from "../../../Hooks/useTaskManage";
// import useProjects from "../../../Hooks/useProjects";
// const TaskBoard = () => {

//   const { id } = useParams();
//   const [ projects, isProjectLoading ] = useProjects();
//   const [tasks, isTaskLoading] = useTaskManage();
//   const { setCurrentProject } = useContext(AuthContext);
//   const getTask = !isTaskLoading ? tasks : null;
//   const getProjects = !isProjectLoading ? projects.find((project) => project.projectId === id) : '';

//   useEffect(() => {
//     if (getProjects) {
//       setCurrentProject(getProjects);
//     }
//   }, [projects, getProjects]);

//   console.dir(getProjects);

//   const tasksData = {
//     todo: [],
//     inProgress: [],
//     backlog: [],
//     completed: []
//   };

//   if (getTask && Array.isArray(getTask)) {
//     getTask.forEach(task => {
//       const formattedTask = {
//         id: task._id, // Use _id as id
//         title: task.title,
//         priority: task.priority,
//         description: task.description,
//         date: task.date,
//         tags: task.tags,
//         assignees: task.assignedUsers
//       };

//       if (tasksData[task.progress]) {
//         // Push the formatted task to the corresponding progress array if id === task.projectId
//         if (task.projectId === id) {
//           tasksData[task.progress].push(formattedTask);
//         }
//       }
//     });
//   } else {
//     console.warn("getTask is null, undefined, or not an array.");
//   }


//   console.dir(getTask);

//   const TaskCard = ({ task }) => (
//     <div className="bg-white p-4 rounded-lg shadow-md mb-4">
//       <div className="flex justify-between items-center mb-2">
//         <span className="text-red-600 font-bold text-xs">HIGH PRIORITY</span>
//         <span className="text-gray-500 text-xs">{task.date}</span>
//       </div>
//       <h3 className="font-semibold text-gray-800 mb-1">{task.title}</h3>
//       <p className="text-gray-600 text-sm mb-3">{task.description}</p>
//       <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
//         <span>0</span> {/* Placeholder for icon */}
//         <span>2</span> {/* Placeholder for icon */}
//         <span>0/1</span> {/* Placeholder for icon */}
//       </div>
//       <div className="flex space-x-1 mb-2">
//         {task.assignees.map((assignee, index) => (
//           <span
//             key={index}
//             className="bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs"
//           >
//             {assignee}
//           </span>
//         ))}
//       </div>
//       <div className="text-sm text-blue-600 bg-blue-100 rounded-full px-2 py-1 inline-block mb-3">
//         {task.tags[0]}
//       </div>
//       <button className="text-blue-500 text-sm font-medium mt-2">Add Subtask</button>
//     </div>
//   );

//   return (
//     <>
//       <div className='w-full'>
        // <div className="flex items-center justify-between">
        //   <h2 className="text-2xl font-semibold capitalize">Tasks</h2>
        //   <button
        //     type="button"
        //     className="flex flex-row-reverse items-center gap-1 bg-blue-600 text-white rounded-md px-3 py-2"
        //   >
        //     <span className="" onClick={() => document.getElementById('my_modal_2').showModal()}>Create Task</span>
        //     {/* <button >Create Task</button> */}

        //     <svg
        //       stroke="currentColor"
        //       fill="currentColor"
        //       strokeWidth="0"
        //       viewBox="0 0 512 512"
        //       className="text-lg"
        //       height="1em"
        //       width="1em"
        //       xmlns="http://www.w3.org/2000/svg"
        //     >
        //       <path d="M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z" />
        //     </svg>
        //   </button>
        // </div>
//         <div className='w-full h-96 sm:px-0'>
//           <div className='w-full mt-2'>

//             <div className="py-1">
//               {/* Wrapper for horizontal scroll on small screens */}
//               <div className="overflow-x-auto">
//                 <div className="flex gap-4 min-w-max">
//                   {/* Backlog Column */}
//                   <div className="flex-none w-[300px] bg-gray-100 p-4 rounded-lg shadow-md h-[500px]">
//                     <h2 className="text-lg font-semibold text-center mb-4 sticky top-0 bg-gray-100 py-2">
//                       Backlog
//                     </h2>
//                     <div className="h-96 overflow-y-scroll scrollbar-thick scrollbar-thumb-blue-500 scrollbar-track-blue-100">
//                       {tasksData.backlog.map((task) => (
//                         <TaskCard key={task.id} task={task} />
//                       ))}
//                     </div>
//                   </div>

//                   {/* To Do Column */}
//                   <div className="flex-none w-[300px] bg-gray-100 p-4 rounded-lg shadow-md h-[500px]">
//                     <h2 className="text-lg font-semibold text-center mb-4 sticky top-0 bg-gray-100 py-2">
//                       To Do
//                     </h2>
//                     <div className="h-96 overflow-y-scroll scrollbar-thick scrollbar-thumb-blue-500 scrollbar-track-blue-100">
//                       {tasksData.todo.map((task) => (
//                         <TaskCard key={task.id} task={task} />
//                       ))}
//                     </div>
//                   </div>

//                   {/* In Progress Column */}
//                   <div className="flex-none w-[300px] bg-gray-100 p-4 rounded-lg shadow-md h-[500px]">
//                     <h2 className="text-lg font-semibold text-center mb-4 sticky top-0 bg-gray-100 py-2">
//                       In Progress
//                     </h2>
//                     <div className="h-96 overflow-y-scroll scrollbar-thick scrollbar-thumb-blue-500 scrollbar-track-blue-100">
//                       {tasksData.inProgress.map((task) => (
//                         <TaskCard key={task.id} task={task} />
//                       ))}
//                     </div>
//                   </div>

//                   {/* Completed Column */}
//                   <div className="flex-none w-[300px] bg-gray-100 p-4 rounded-lg shadow-md h-[500px]">
//                     <h2 className="text-lg font-semibold text-center mb-4 sticky top-0 bg-gray-100 py-2">
//                       Completed
//                     </h2>
//                     <div className="h-96 overflow-y-scroll scrollbar-thick scrollbar-thumb-blue-500 scrollbar-track-blue-100">
//                       {tasksData.completed.map((task) => (
//                         <TaskCard key={task.id} task={task} />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//       <AddTaskForm />
//     </>

//   );
// };

// export default TaskBoard;
//........................................................................
import React, { useContext, useEffect, useState } from "react";
import AddTaskForm from "./AddTaskForm";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import useTaskManage from "../../../Hooks/useTaskManage";
import useProjects from "../../../Hooks/useProjects";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const TaskBoard = () => {
  const { id } = useParams();
  const [projects, isProjectLoading] = useProjects();
  const [tasks, isTaskLoading] = useTaskManage();
  const { setCurrentProject } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const getTask = !isTaskLoading ? tasks : null;
  const getProjects = !isProjectLoading
  ? projects.find((project) => project.projectId === id)
  : "";
  //TODO: Refactor columns to be dynamic
  const [columns, setColumns] = useState(getProjects?.column);

  // Set the current project context when projects are loaded
  useEffect(() => {
    if (getProjects) {
      setCurrentProject(getProjects);
      // console.log(getProjects.column);
      // setColumns(getProjects.column);
    }
  }, [getProjects, setCurrentProject]);

  // Update columns dynamically based on tasks
  useEffect(() => {
    if (getTask && Array.isArray(getTask)) {
      // Map tasks to the appropriate column based on progress
      const updatedColumns = columns.map((column) => ({
        ...column,
        tasks: getTask
          .filter((task) => task.progress === column.id && task.projectId === id)
          .map((task) => ({
            id: task._id,
            title: task.title,
            priority: task.priority,
            description: task.description,
            date: task.date,
            tags: task.tags,
            assignees: task.assignedUsers,
          })),
      }));

      // Update state only if columns have changed
      setColumns((prevColumns) => {
        const areColumnsSame = JSON.stringify(prevColumns) === JSON.stringify(updatedColumns);
        return areColumnsSame ? prevColumns : updatedColumns;
      });
    }
  }, [getTask, id]); // Dependency array excludes "columns" to avoid infinite loop

  // Function to add a new column dynamically
  const addColumn = (title) => {
    const newColumn = {
      id: title.toLowerCase().replace(/\s+/g, "-"),
      title,
      tasks: [],
    };
    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  const handleAddColumn = async () => {
    
    const { value: title } = await Swal.fire({
      title: "Input title column",
      input: "text",
      inputLabel: "Your title column",
      inputPlaceholder: "Enter your title column"
    });
    if (title) {

      // Swal.fire(`Entered title: ${title}`);

      // title id should be title in lowercase and replace space with '-'
      const titleId = title.toLowerCase().replace(/\s+/g, "_");
      const newColumn = {
        id: titleId,
        title,
        tasks: []
      };

      axiosSecure.put(`/projects/${id}`, newColumn)
        .then(res => {
          console.log(res.data);
          if (res.data.result.acknowledged) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Column is created successfully",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        .catch(err => {
          console.error(err);
        }
      );




    }

  };

  const TaskCard = ({ task }) => (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-red-600 font-bold text-xs">{task.priority}</span>
        <span className="text-gray-500 text-xs">{task.date}</span>
      </div>
      <h3 className="font-semibold text-gray-800 mb-1">{task.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
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
    <div className="w-full">

    <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold capitalize">Tasks</h2>
          <button
            type="button"
            className="flex flex-row-reverse items-center gap-1 bg-blue-600 text-white rounded-md px-3 py-2"
          >
            <span className="" onClick={handleAddColumn}>Create Column</span>
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

      <div className="w-full h-96 sm:px-0">
        <div className="w-full mt-2">
          <div className="py-1">
            <div className="overflow-x-auto">
              <div className="flex gap-4 min-w-max">
                {columns.map((column) => (
                  <div
                    key={column.id}
                    className="flex-none w-[300px] bg-gray-100 p-4 rounded-lg shadow-md h-[500px]"
                  >
                    <h2 className="text-lg font-semibold text-center mb-4 sticky top-0 bg-gray-100 py-2">
                      {column.title}
                    </h2>
                    <div className="h-96 overflow-y-scroll scrollbar-thick scrollbar-thumb-blue-500 scrollbar-track-blue-100">
                      {column.tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  const title = prompt("Enter column title:");
                  if (title) addColumn(title);
                }}
              >
                Add Column
              </button>
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
