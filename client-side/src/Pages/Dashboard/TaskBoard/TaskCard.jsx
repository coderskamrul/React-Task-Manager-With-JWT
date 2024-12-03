import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import TaskPopup from "./TaskPopup";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useTaskManage from "../../../Hooks/useTaskManage";
import DotedButton from "../Projects/DotedButton";

const TaskCard = ({ task, projectId }) => {
  const [searchParams] = useSearchParams(); // Get search params from URL
  const navigate = useNavigate(); // For navigating programmatically
  const taskIdFromUrl = searchParams.get("taskid"); // Extract taskid from query
  const isPopupOpen = taskIdFromUrl === String(task.taskId); // Check if popup should be open
  const [popupVisible, setPopupVisible] = useState(isPopupOpen);
  const { currentProject } = useAuth();
  const getColumn = currentProject?.column;
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosSecure = useAxiosSecure();
  const [tasks, isTaskLoading, reFetchTask] = useTaskManage();
  const closePopup = () => {
    setPopupVisible(false);
    navigate(`/dashboard/projects/tasks/${projectId}`); // Navigate back to tasks list when popup closes
  };
  const handleProgressChange = (progress) => {
    if (progress != "") {
      const progressData = { taskId: task.taskId, progress: progress };
      axiosSecure.put(`/task/edit`, progressData)
        .then((res) => {
          console.log(res.data);
          reFetchTask();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const DottedButtonOptions = [
    { label: 'Add manual time', type: 'addManualTimeTask' },
    { label: 'Edit task name', type: 'editTaskName' },
    { label: 'Add Due Time', type: 'addDueTimeTask' },
    { label: 'Delete', type: 'deleteTask' },
  ];

  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="flex relative justify-normal items-center mb-2">
          <span
            className="text-gray-500 font-bold border cursor-pointer rounded-md text-[10px] border-gray-300 mr-4 px-2 py-1 text-xs"
            onClick={() => {
              navigator.clipboard.writeText(task.taskId) // Copy to clipboard
                .then(() => {
                  alert("ID is copied"); // Show alert
                })
                .catch((err) => {
                  console.error("Failed to copy text to clipboard: ", err); // Handle error
                });
            }}
          >
            {task.taskId}
          </span>

          {/* <span className="text-gray-500 text-xs">{task.date}</span> */}
          <select
            id="selectProgress"
            {...register("progress")}
            className="max-w-fit border border-gray-300 text-[10px] rounded-lg h-[23px] px-1 text-sm"
            defaultValue={task.progress}
            onChange={(e) => handleProgressChange(e.target.value)}
          >
            {
              getColumn && getColumn.map((column) => {
                return (
                  <option key={column.id} value={column.id}>
                    {column.title}
                  </option>
                );
              })
            }
          </select>

          <DotedButton options={DottedButtonOptions} top={0} right={0} cardId={task.taskId} />
        </div>
        <Link
          to={`/dashboard/projects/tasks/${projectId}?taskid=${task.taskId}`} // Add taskid to URL
          onClick={() => setPopupVisible(true)} // Open popup when the title is clicked
        >
          <h3 className="font-semibold text-gray-800 mb-1">{task.title}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3">{task.description}</p>
        <div className="flex space-x-1 mb-2">
          {
          // task.assignees && task.assignees.map((assignee, index) => (
              // <span
              //   key={index}
              //   className="bg-blue-500 text-white rounded-full h-6 w-6 flex items-center capitalize justify-center text-xs"
              // >
              //   {assignee[0]}
              // </span>
              // ssss
              <div className="flex -space-x-2">
                {task.assignees && task.assignees.slice(0, 1).map(assignee => (
                  <span
                  key={assignee[0]}
                className="bg-blue-500 text-white rounded-full h-6 w-6 flex items-center capitalize justify-center text-xs"
              >
                {assignee[0]}
              </span>
                ))}
                {task.assignees.length >= 1 && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                    +{task.assignees.length - 1}
                  </div>
                )}
              </div>

              //eeee
            // ))
            }
        </div>
        <div className="text-sm text-blue-600 bg-blue-100 rounded-full px-2 py-1 inline-block mb-3">
          {task.tags[0]}
        </div>
        <button className="text-blue-500 text-sm font-medium mt-2">Add Subtask</button>
      </div>

      {/* Render the popup if it's visible */}
      {popupVisible && <TaskPopup task={task} onClose={closePopup} />}
    </div>
  );
};

export default TaskCard;
