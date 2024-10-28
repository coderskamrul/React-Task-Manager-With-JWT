import React from 'react'

const TaskAdd = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content lg:flex-row-reverse w-[40%]">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h2 className='text-3xl font-bold text-center py-4'>New Task</h2>
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input type="text" placeholder="Title" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image Link</span>
                            </label>
                            <input type="text" placeholder="Image Link" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea placeholder="Description" className="textarea textarea-bordered textarea-sm w-full max-w-xs"></textarea>
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn btn-primary" value="Create Task" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TaskAdd