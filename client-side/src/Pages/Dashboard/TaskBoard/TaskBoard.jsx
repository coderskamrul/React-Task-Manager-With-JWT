import React, { useContext, useEffect, useState, useRef } from "react";
import AddTaskForm from "./AddTaskForm";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import useTaskManage from "../../../Hooks/useTaskManage";
import useProjects from "../../../Hooks/useProjects";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import TaskColumn from "./TaskColumn";
import Skeleton from "../../../Components/Skeleton";


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
  const [projects, isProjectLoading, reFetchProject] = useProjects();
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

  useEffect(() => {
    if (getProjects) {
      const projectColumns = getProjects.column || [];
      setColumns(projectColumns);
      setBoard({ columns: projectColumns });
    }
  }, [getProjects]);
  useEffect(() => {
    if (getProjects) {
      setCurrentProject(getProjects);
    }
  }, [getProjects, setCurrentProject]);

  // Update columns dynamically based on tasks
  const mergeTasks = (columns) => {
    return columns.reduce((acc, column) => {
      if (column.tasks && column.tasks.length > 0) {
        acc = acc.concat(column.tasks);
      }
      return acc;
    }, []);
  };
  useEffect(() => {
    if (getProjects?.column) {
      const updatedColumns = getProjects.column && getProjects.column.map((column) => ({
        ...column,
        tasks: mergeTasks(getProjects.column)
          .filter((task) => task.progress === column.id && task.projectId === id)
          .map((task) => ({
            id: task.id,
            projectId: task.projectId,
            taskId: task.taskId,
            title: task.title,
            priority: task.priority,
            description: task.description,
            date: task.date,
            tags: task.tags,
            assignedUsers: task.assignedUsers,
            progress: task.progress,
            createdBy: task.createdBy,
            created_at: task.created_at,
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

  }, [columns, id]); // Dependency array excludes "columns" to avoid infinite loop


  const handleAddColumn = async () => {
    const { value: title } = await Swal.fire({
      title: "Input title column",
      input: "text",
      inputLabel: "Your title column",
      inputPlaceholder: "Enter your title column"
    });
    if (title) {
      // title id should be title in lowercase and replace space with '-'
      const titleId = title.toLowerCase().replace(/\s+/g, "_");
      const newColumn = {
        id: titleId,
        title,
        tasks: []
      };

      axiosSecure.put(`/projects/${id}`, newColumn)
        .then(res => {
          // console.log(res.data);
          if (res.data.result.acknowledged) {
            reFetchProject();
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

    const updateColumnsInBackend = async (updatedColumns) => {
      try {
        console.log('Updating columns in backend');
        const res = await axiosSecure.put(`/projects/${id}/columns`, updatedColumns);
        console.log('API call response:', res.data);
        if (res.data.result) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Update successful",
            showConfirmButton: false,
            timer: 1500
          });
        }
      } catch (err) {
        console.log('API call error:', err);
      }
    };

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

            // Call the API endpoint only when the task is moved to a different column
            updateColumnsInBackend(updatedBoard.columns);
          }
        }
      }

      setBoard(updatedBoard);
    } else if (draggedType === 'column') {
      const updatedColumns = [...board.columns];
      const draggedColumnIndex = updatedColumns.findIndex(c => c.id === draggedItemId);
      const targetColumnIndex = updatedColumns.findIndex(c => c.id === targetColumnId);

      if (draggedColumnIndex !== -1 && targetColumnIndex !== -1 && draggedColumnIndex !== targetColumnIndex) {
        const [draggedColumn] = updatedColumns.splice(draggedColumnIndex, 1);
        updatedColumns.splice(targetColumnIndex, 0, draggedColumn);
        setBoard({ ...board, columns: updatedColumns });

        // Call the API endpoint when a column is moved
        updateColumnsInBackend(updatedColumns);
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

  //@TODO Searching is Not Working Fixed Later
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    console.log(searchValue);
    const updatedColumns = getProjects.column.map((column) => ({
      ...column,
      tasks: column.tasks.filter((task) => task.title.toLowerCase().includes(searchValue)),
    }));
    setColumns([]);
    setBoard({ columns: [] });

  }
  return (
    <>
      <div className="w-full sm:px-0">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold capitalize">Tasks List</h2>
          <input onChange={handleSearch} type="text" name="search" id="" />
          <div className="flex items-center gap-4">
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
        </div>
        {console.log(board.columns)}
        {
          isProjectLoading ? <Skeleton />
            :
            <div className="w-full mt-2">
              <div className='py-1' >
                <div className='overflow-x-auto h-screen' >
                  <div className="flex justify-center gap-4 min-w-max">
                    {board.columns && board.columns.map((column) => (
                      <TaskColumn
                        key={column.id}
                        column={column}
                        tasks={column.tasks}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        id={id}
                      />
                    ))
                    }
                  </div>
                </div>
              </div>
            </div>
        }

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

