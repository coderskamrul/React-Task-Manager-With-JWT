import React, { useState } from 'react'
import axios from 'axios'

const TaskAdd = () => {

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    //Handle form submit 
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', e.target.title.value);
        formData.append('description', e.target.description.value);
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:5000/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <>
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content lg:flex-row-reverse w-[40%]">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h2 className='text-3xl font-bold text-center py-4'>New Task</h2>
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input type="text" placeholder="Title" name='title' className="input input-bordered" required />
                        </div>
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea placeholder="Description" name='description' className="textarea textarea-bordered textarea-sm w-full max-w-xs"></textarea>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Pick a file</span>
                            </div>
                            <input type="file" onChange={handleFileChange} className="file-input file-input-bordered w-full max-w-xs" />
                            <div className="label">
                            </div>
                        </div>

                        <div className="form-control mt-6">
                            <input type="submit" className="btn btn-primary" value="Create Task" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default TaskAdd