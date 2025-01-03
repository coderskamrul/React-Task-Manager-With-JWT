//........................................................................
// import React, { useContext, useEffect, useState } from "react";
// import AddTaskForm from "./AddTaskForm";
// import { Link, useParams } from "react-router-dom";
// import { AuthContext } from "../../../Provider/AuthProvider";
// import useTaskManage from "../../../Hooks/useTaskManage";
// import useProjects from "../../../Hooks/useProjects";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import TaskCard from "./TaskCard";

// const TaskBoard = () => {
//   const { id } = useParams();
//   const [projects, isProjectLoading] = useProjects();
//   const [tasks, isTaskLoading, reFetchTask] = useTaskManage();
//   const { setCurrentProject } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const getTask = !isTaskLoading ? tasks : null;
//   const getProjects = !isProjectLoading
//     ? projects.find((project) => project.projectId === id)
//     : "";
//   //TODO: Refactor columns to be dynamic
//   const [columns, setColumns] = useState(getProjects?.column || []);

//   useEffect(() => {
//     if (getProjects) {
//       setColumns(getProjects.column || []);
//     }
//   }, [getProjects]);
//   // console.log('id - ', id);
//   // Set the current project context when projects are loaded
//   useEffect(() => {
//     if (getProjects) {
//       setCurrentProject(getProjects);
//       // console.log(getProjects);
//       // setColumns(getProjects.column);
//     }
//   }, [getProjects, setCurrentProject]);

//   // Update columns dynamically based on tasks
//   useEffect(() => {
//     if (getTask && Array.isArray(getTask)) {
//       // Map tasks to the appropriate column based on progress
//       const updatedColumns = columns && columns.map((column) => ({
//         ...column,
//         tasks: getTask
//           .filter((task) => task.progress === column.id && task.projectId === id)
//           .map((task) => ({
//             id: task._id,
//             taskId: task.taskId,
//             title: task.title,
//             priority: task.priority,
//             description: task.description,
//             date: task.date,
//             tags: task.tags,
//             assignees: task.assignedUsers,
//             progress: task.progress,
//           })),
//       }));

//       // Update state only if columns have changed
//       setColumns((prevColumns) => {
//         const areColumnsSame = JSON.stringify(prevColumns) === JSON.stringify(updatedColumns);
//         return areColumnsSame ? prevColumns : updatedColumns;
//       });
//     }
//     // console.log(getTask);

//   }, [getTask, columns, id]); // Dependency array excludes "columns" to avoid infinite loop


//   const handleAddColumn = async () => {

//     const { value: title } = await Swal.fire({
//       title: "Input title column",
//       input: "text",
//       inputLabel: "Your title column",
//       inputPlaceholder: "Enter your title column"
//     });
//     if (title) {

//       // Swal.fire(`Entered title: ${title}`);

//       // title id should be title in lowercase and replace space with '-'
//       const titleId = title.toLowerCase().replace(/\s+/g, "_");
//       const newColumn = {
//         id: titleId,
//         title,
//         tasks: []
//       };

//       axiosSecure.put(`/projects/${id}`, newColumn)
//         .then(res => {
//           console.log(res.data);
//           if (res.data.result.acknowledged) {
//             Swal.fire({
//               position: "top-end",
//               icon: "success",
//               title: "Column is created successfully",
//               showConfirmButton: false,
//               timer: 1500
//             });
//           }
//         })
//         .catch(err => {
//           console.error(err);
//         }
//         );




//     }

//   };



//   return (
//     <>
//       <div className="w-full">

//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-semibold capitalize">Tasks List</h2>
//           <button
//             type="button"
//             className="flex flex-row-reverse items-center gap-1 bg-blue-600 text-white rounded-md px-3 py-2"
//           >
//             <span className="" onClick={handleAddColumn}>Create Column</span>
//             {/* <button >Create Task</button> */}

//             <svg
//               stroke="currentColor"
//               fill="currentColor"
//               strokeWidth="0"
//               viewBox="0 0 512 512"
//               className="text-lg"
//               height="1em"
//               width="1em"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path d="M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z" />
//             </svg>
//           </button>
//           <button
//             type="button"
//             className="flex flex-row-reverse items-center gap-1 bg-blue-600 text-white rounded-md px-3 py-2"
//           >
//             <span className="" onClick={() => document.getElementById('my_modal_2').showModal()}>Create Task</span>
//             {/* <button >Create Task</button> */}

//             <svg
//               stroke="currentColor"
//               fill="currentColor"
//               strokeWidth="0"
//               viewBox="0 0 512 512"
//               className="text-lg"
//               height="1em"
//               width="1em"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path d="M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z" />
//             </svg>
//           </button>
//         </div>
//         <div className="w-full h-96 sm:px-0">
//           <div className="w-full mt-2">
//             <div className="py-1">
//               <div className="overflow-x-auto">
//                 <div className="flex gap-4 min-w-max">
//                   {columns && columns.map((column) => (
//                     // Column element starts here
//                     <div
//                       key={column.id}
//                       className="flex-none w-[300px] bg-gray-100 p-4 rounded-lg shadow-md h-[500px]"
//                     >
//                       <h2 className="text-lg font-semibold text-center mb-4 sticky top-0 bg-gray-100 py-2">
//                         {column.title}
//                       </h2>
//                       <div className="h-96 overflow-y-scroll scrollbar-thick scrollbar-thumb-blue-500 scrollbar-track-blue-100">
//                         {/* {console.log(column.tasks)} */}
//                         {column && column.tasks.map((task) => (
//                           <TaskCard key={task.id} task={task} projectId={id} />
//                         ))}
//                       </div>
//                     </div>
//                     // Column element End here
//                   ))}
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

//........................................................................ New Draggable Task ........................................................................

import React, { useContext, useEffect, useState, useRef } from "react";
import AddTaskForm from "./AddTaskForm";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import useTaskManage from "../../../Hooks/useTaskManage";
import useProjects from "../../../Hooks/useProjects";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import TaskCard from "./TaskCard";

const initialBoard = {
  columns: [
    {
      id: 'backlog',
      title: 'Backlog',
      tasks: [
        { id: '1', title: 'Company website redesign.', priority: 'Low', comments: 1, attachments: 2, assignee: { avatar: '/placeholder.svg', name: 'John Doe' } },
        { id: '2', title: 'Mobile app login process prototype.', priority: 'High', comments: 10, attachments: 4, assignee: { avatar: '/placeholder.svg', name: 'Jane Smith' } },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        { id: '3', title: 'User research for new feature', priority: 'Medium', comments: 5, attachments: 1, assignee: { avatar: '/placeholder.svg', name: 'Alice Johnson' } },
      ],
    },
    {
      id: 'in-review',
      title: 'In Review',
      tasks: [
        { id: '4', title: 'Dashboard layout redesign.', priority: 'High', comments: 13, attachments: 2, assignee: { avatar: '/placeholder.svg', name: 'Bob Wilson' } },
        { id: '5', title: 'Social media posts', priority: 'Low', comments: 0, attachments: 0, assignee: { avatar: '/placeholder.svg', name: 'Charlie Brown' } },
      ],
    },
    {
      id: 'completed',
      title: 'Completed',
      tasks: [
        { id: '6', title: 'Navigation designs', priority: 'Medium', comments: 0, attachments: 0, assignee: { avatar: '/placeholder.svg', name: 'Diana Prince' } },
        { id: '7', title: 'Create style guide based on previous feedback', priority: 'High', comments: 5, attachments: 2, assignee: { avatar: '/placeholder.svg', name: 'Eve Adams' } },
      ],
    },
  ],
};

const TaskNewCard = ({ task, columnTitle, onDragStart }) => {
  const priorityColors = {
    Low: 'bg-blue-100 text-blue-700',
    Medium: 'bg-green-100 text-green-700',
    High: 'bg-red-100 text-red-700',
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id, 'task')}
      className="bg-white rounded-lg shadow-sm p-4 cursor-move mb-2"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[task.priority]}`}>
            {task.priority} Priority
          </span>
          <span className="text-xs text-gray-500">{columnTitle}</span>
        </div>
        <h3 className="font-medium text-sm">{task.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              <span className="text-xs text-gray-500">{task.comments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
              </svg>
              <span className="text-xs text-gray-500">{'hello'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Column = ({ column, tasks, onDragStart, onDragOver, onDrop, id }) => {
  return (
    <div
      className="h-[36rem] flex-none w-[300px] rounded-lg"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div
        className="p-4 font-medium border-b bg-white rounded-t-lg cursor-move"
        draggable
        onDragStart={(e) => onDragStart(e, column.id, 'column')}
      >
        <h2>{column.title}</h2>
      </div>
      <div className="h-96 overflow-y-scroll scrollbar-thick scrollbar-thumb-blue-500 scrollbar-track-blue-100">
        {tasks.map((task) => (
          // <TaskNewCard key={task.id} task={task} columnTitle={column.title} onDragStart={onDragStart} />
          <TaskCard key={task.id} task={task} projectId={id} columnTitle={column.title} onDragStart={onDragStart} />
        ))}
      </div>
    </div>
  );
};

const AddTaskDialog = ({ isOpen, onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({
      title,
      priority,
      comments: 0,
      attachments: 0,
      assignee: { avatar: '/placeholder.svg', name: 'John Doe' },
    });
    setTitle('');
    setPriority('Low');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Task Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter task title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <div className="mt-2 space-y-2">
              {['Low', 'Medium', 'High'].map((p) => (
                <label key={p} className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    value={p}
                    checked={priority === p}
                    onChange={() => setPriority(p)}
                    className="form-radio h-4 w-4 text-indigo-600"
                  />
                  <span className="ml-2">{p}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TaskBoard = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedType, setDraggedType] = useState(null);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState(null);

  //old task start
  const { id } = useParams();
  const [projects, isProjectLoading] = useProjects();
  const [tasks, isTaskLoading, reFetchTask] = useTaskManage();
  const { setCurrentProject } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const getTask = !isTaskLoading ? tasks : null;
  const getProjects = !isProjectLoading
    ? projects.find((project) => project.projectId === id)
    : "";
  //TODO: Refactor columns to be dynamic
  const [columns, setColumns] = useState(getProjects?.column || []);
  const [board, setBoard] = useState({ columns: columns || [] });
  console.dir(board);
  // console.log(columns);

  useEffect(() => {
    if (getProjects) {
      const projectColumns = getProjects.column || [];
      setColumns(projectColumns);
      setBoard({ columns: projectColumns });
    }
  }, [getProjects]);
  // console.log('id - ', id);
  // Set the current project context when projects are loaded
  useEffect(() => {
    if (getProjects) {
      setCurrentProject(getProjects);
      // console.log(getProjects);
      // setColumns(getProjects.column);
    }
  }, [getProjects, setCurrentProject]);

  // Update columns dynamically based on tasks
  useEffect(() => {
    if (getTask && Array.isArray(getTask)) {
      // Map tasks to the appropriate column based on progress
      const updatedColumns = columns && columns.map((column) => ({
        ...column,
        tasks: getTask
          .filter((task) => task.progress === column.id && task.projectId === id)
          .map((task) => ({
            id: task._id,
            taskId: task.taskId,
            title: task.title,
            priority: task.priority,
            description: task.description,
            date: task.date,
            tags: task.tags,
            assignees: task.assignedUsers,
            progress: task.progress,
          })),
      }));

      // Update state only if columns have changed
      setColumns((prevColumns) => {
        const areColumnsSame = JSON.stringify(prevColumns) === JSON.stringify(updatedColumns);
        return areColumnsSame ? prevColumns : updatedColumns;
      });

      setBoard((prevBoard) => {
        const areBoardsSame = JSON.stringify(prevBoard.columns) === JSON.stringify(updatedColumns);
        return areBoardsSame ? prevBoard : { ...prevBoard, columns: updatedColumns };
      });
    }
    // console.log(getTask);

  }, [getTask, columns, id]); // Dependency array excludes "columns" to avoid infinite loop


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



  //old task end
  const handleDragStart = (e, itemId, type) => {
    setDraggedItem(itemId);
    setDraggedType(type);
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    const draggedItemId = e.dataTransfer.getData('text');

    if (draggedType === 'task') {
      const updatedBoard = { ...board };
      let task;
      let sourceColumnId;

      // Find and remove the task from its original column
      for (const column of updatedBoard.columns) {
        const taskIndex = column.tasks.findIndex(t => t.id === draggedItemId);
        if (taskIndex !== -1) {
          task = column.tasks[taskIndex];
          sourceColumnId = column.id;
          column.tasks.splice(taskIndex, 1);
          break;
        }
      }

      if (task) {
        const targetColumn = updatedBoard.columns.find(c => c.id === targetColumnId);
        if (targetColumn) {
          // If dropping on the same column, insert at the drop position
          if (sourceColumnId === targetColumnId) {
            const dropIndex = targetColumn.tasks.length;
            targetColumn.tasks.splice(dropIndex, 0, task);
          } else {
            // If dropping on a different column, add to the end
            task.columnTitle = targetColumn.title;
            targetColumn.tasks.push(task);
          }
        }
      }

      setBoard(updatedBoard);
    } else if (draggedType === 'column') {
      const updatedColumns = [...board.columns];
      const draggedColumnIndex = updatedColumns.findIndex(c => c.id === draggedItemId);
      const targetColumnIndex = updatedColumns.findIndex(c => c.id === targetColumnId);

      if (draggedColumnIndex !== -1 && targetColumnIndex !== -1) {
        const [draggedColumn] = updatedColumns.splice(draggedColumnIndex, 1);
        updatedColumns.splice(targetColumnIndex, 0, draggedColumn);
        setBoard({ ...board, columns: updatedColumns });
      }
    }

    setDraggedItem(null);
    setDraggedType(null);
  };

  const handleAddTask = (columnId) => {
    setActiveColumn(columnId);
    setIsAddTaskOpen(true);
  };

  const onAddTask = (taskData) => {
    if (activeColumn) {
      const newTask = {
        ...taskData,
        id: Math.random().toString(36).substr(2, 9),
        columnTitle: board.columns.find(col => col.id === activeColumn).title
      };
      setBoard((prevBoard) => ({
        ...prevBoard,
        columns: prevBoard.columns.map((column) =>
          column.id === activeColumn
            ? { ...column, tasks: [...column.tasks, newTask] }
            : column
        ),
      }));
    }
    setIsAddTaskOpen(false);
  };

  return (
      <>
        <div className="w-full sm:px-0">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold capitalize">Tasks List</h2>
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
        
          <div className="w-full mt-2">
            <div className='py-1' >
              <div className='overflow-x-auto h-screen' >
                <div className="flex justify-center gap-4 min-w-max">
                  {board.columns.map((column) => (
                    <Column
                      key={column.id}
                      column={column}
                      tasks={column.tasks}
                      onDragStart={handleDragStart}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      id={id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <AddTaskDialog
            isOpen={isAddTaskOpen}
            onClose={() => setIsAddTaskOpen(false)}
            onAddTask={onAddTask}
          />
        </div>
        <AddTaskForm />
        </>
  );
};

export default TaskBoard;

