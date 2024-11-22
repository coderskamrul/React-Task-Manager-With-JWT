import React, { useState } from 'react'
import Modal from '../../../Components/Modal';
import axios from 'axios';

const AddProjectForm = () => {
    // {
    //     "_id": "ObjectId('proj1')",
    //     "name": "Project A",
    //     "description": "This is a sample project",
    //     "startDate": "2024-01-01",
    //     "endDate": "2024-06-01",
    //     "status": "Active",
    //     "tasks": ["ObjectId('task1')", "ObjectId('task2')"]
    //   }

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "medium",
        assignedUsers: [],
        startDate: "",
        endDate: "",
    });

    const tagsOptions = ["Bug Fix", "New Feature", "User Issue"];
    const usersOptions = ["User 1", "User 2", "User 3", "User 4"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUsersChange = (e) => {
        const value = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData({ ...formData, assignedUsers: value });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("Form Data Submitted:", formData);
    // };

    // file uoload code start
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formProjectData = new FormData();
        formProjectData.append('title', formData.title);
        formProjectData.append('description', formData.description);
        formProjectData.append('priority', formData.priority);
        formProjectData.append('assignedUsers', formData.assignedUsers);
        formProjectData.append('startDate', formData.startDate);
        formProjectData.append('endDate', formData.endDate);
        formProjectData.append('image', file);

        try {
            const response = await axios.post('http://localhost:5000/projects', formProjectData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file:', error.response ? error.response.data : error.message);
        }
        //     console.log("Form Data Submitted:", formProjectData);
    };
    // file uoload code end


    const renderAddTaskForm = () => {
        return (
            <form
                className="max-w-lg mx-auto p-2 space-y-4"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-semibold text-center">Add Projects</h2>

                {/* Title Field */}
                <div className="flex flex-col">
                    <label htmlFor="title" className="mb-1 font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                        placeholder="Enter task title"
                        required
                    />
                </div>

                {/* Description Field */}
                <div className="flex flex-col">
                    <label htmlFor="description" className="mb-1 font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                        placeholder="Enter task description"
                        rows="1"
                        required
                    ></textarea>
                </div>

                {/* Priority and Assigned Users Fields in One Row */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Priority Field */}
                    <div className="flex flex-col flex-1">
                        <label htmlFor="priority" className="mb-1 font-medium text-gray-700">Priority</label>
                        <select
                            name="priority"
                            id="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* Assigned Users Field */}
                    <div className="flex flex-col flex-1">
                        <label htmlFor="assignedUsers" className="mb-1 font-medium text-gray-700">Assign Users</label>
                        <select
                            name="assignedUsers"
                            id="assignedUsers"
                            value={formData.assignedUsers}
                            onChange={handleUsersChange}
                            multiple
                            className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                        >
                            {usersOptions.map((user, index) => (
                                <option key={index} value={user}>
                                    {user}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Start Date and End Date Fields in One Row */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Start Date Field */}
                    <div className="flex flex-col flex-1">
                        <label htmlFor="startDate" className="mb-1 font-medium text-gray-700">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            id="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>
                    {/* End Date Field */}
                    <div className="flex flex-col flex-1">
                        <label htmlFor="endDate" className="mb-1 font-medium text-gray-700">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            id="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>
                </div>

                {/* File Fields */}
                <div className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Pick a file</span>
                    </div>
                    <input type="file" onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs" />
                    <div className="label">
                    </div>
                </div>
                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-6 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Add Projects
                    </button>
                </div>
            </form>
        )
    }
    return (
        <>
            {<Modal content={renderAddTaskForm()} />}
        </>
    )
}

export default AddProjectForm