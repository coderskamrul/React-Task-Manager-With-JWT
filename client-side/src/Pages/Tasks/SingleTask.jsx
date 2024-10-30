import React from 'react'

const SingleTask = ({task}) => {
    console.log(task);
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={`../../../public/images/${task.image}`}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {task.title}
                    <div className="badge badge-secondary">{task.status}</div>
                </h2>
                <p>{task.description.length > 100 ? `${task.description.substring(0, 100)}...` : task.description}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                </div>
            </div>
        </div>
    )
}

export default SingleTask