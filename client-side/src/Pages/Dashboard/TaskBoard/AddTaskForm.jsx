import React, { useContext, useEffect, useState } from "react";
import { get, useForm } from "react-hook-form";
import Modal from "../../../Components/Modal";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUsers from "../../../Hooks/useUsers";
import MultiSelectDropdown from "../../../Components/MultiSelectDropdown";
import Swal from 'sweetalert2';
import useTaskManage from "../../../Hooks/useTaskManage";

// import {useFormHandler} from "../../../Hooks/useFormHandler";

const AddTaskForm = () => {

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [usersOptions, setUsersOptions] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const { currentProject } = useContext(AuthContext);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [users] = useUsers();
    const [ tasks, isTaskLoading, refetch ] = useTaskManage();
    // console.dir(currentProject);
    const getColumn = currentProject?.column;
    const getTags = currentProject?.tags;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    //TODO: Add tags to the Project Schema and fetch them here dynamic from the database and project wise
    const tagOptions = getTags && getTags?.map((tag) => { return { key: tag.key, value: tag.value }; });
    console.log(tagOptions);

    // const usersOptions = ["User 1", "User 2", "User 3", "User 4"];
    useEffect(() => {
        if (users.length > 0) {
            const getUsers = users.map((user) => {
                return {
                    key: user.email,
                    value: user.name,
                };
            });
            setUsersOptions(getUsers);
        }
    }, [users]);



    //   const { onSubmit, isLoading } = useFormHandler(
    //     (data) => axios.post("/api/tasks", data),
    //     ["tasks"] // Query key to refetch
    //   );
    console.log(currentProject?.projectId);
    const submitHandler = (data) => {
        // onSubmit(data);
        const taskData = {
            ...data,
            projectId: currentProject?.projectId,
            tags: selectedTags,
            assignedUsers: selectedUsers,
            createdBy: user?.email,
        };
        // console.log(taskData);
        axiosSecure.post("/tasks", taskData)
            .then(res => {
                console.log(res.data);
                if( res.data.result.acknowledged ) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Task is created successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            })
            .catch(err => {
                console.error(err);
            });


        // console.log(taskData);
        reset(); // Reset form after successful submission
        setSelectedUsers([]); // Reset selected users
    };

    return (
        <Modal
            content={
                <form
                    className="max-w-lg mx-auto p-2 space-y-4"
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <h2 className="text-2xl font-semibold text-center">Add Task</h2>

                    {/* Title Field */}
                    <div className="flex flex-col">
                        <label htmlFor="title" className="mb-1 font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            id="title"
                            {...register("title", { required: "Title is required" })}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                            placeholder="Enter task title"
                        />
                        {errors.title && (
                            <span className="text-red-500 text-sm">{errors.title.message}</span>
                        )}
                    </div>

                    {/* Description Field */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="description"
                            className="mb-1 font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            {...register("description", {
                                required: "Description is required",
                            })}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                            placeholder="Enter task description"
                            rows="2"
                        ></textarea>
                        {errors.description && (
                            <span className="text-red-500 text-sm">
                                {errors.description.message}
                            </span>
                        )}
                    </div>

                    {/* Priority Field */}
                    <div className="flex flex-col">
                        <label htmlFor="priority" className="mb-1 font-medium text-gray-700">
                            Priority
                        </label>
                        <select
                            id="priority"
                            {...register("priority")}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* Progress Field */}
                    <div className="flex flex-col">
                        <label htmlFor="priority" className="mb-1 font-medium text-gray-700">
                            Progress
                        </label>
                        <select
                            id="priority"
                            {...register("progress")}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
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
                            {/* <option value="backlog">Backlog</option>
                            <option value="todo">ToDo</option>
                            <option value="inProgress">In Progress</option>
                            <option value="completed">Completed</option> */}
                        </select>
                    </div>

                     {/* Multi-Select for Tags */}
                     <div className="flex flex-col">
                        <label htmlFor="users" className="mb-1 font-medium text-gray-700">
                        Tags
                        </label>
                        <MultiSelectDropdown
                            options={tagOptions}
                            selectedItems={selectedTags}
                            onChange={setSelectedTags}
                        />
                    </div>

                    {/* Multi-Select for Users */}
                    <div className="flex flex-col">
                        <label htmlFor="users" className="mb-1 font-medium text-gray-700">
                            Assign Users
                        </label>
                        <MultiSelectDropdown
                            options={usersOptions}
                            selectedItems={selectedUsers}
                            onChange={setSelectedUsers}
                        />
                    </div>

                    {/* Date Field */}
                    <div className="flex flex-col">
                        <label htmlFor="date" className="mb-1 font-medium text-gray-700">
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            {...register("date", { required: "Date is required" })}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                        />
                        {errors.date && (
                            <span className="text-red-500 text-sm">{errors.date.message}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`px-6 py-2 font-semibold text-white rounded-md bg-blue-500 hover:bg-blue-600"}`}
                        >
                            {"Add Task"}
                        </button>
                    </div>
                </form>
            }
        />
    );
};

export default AddTaskForm;
