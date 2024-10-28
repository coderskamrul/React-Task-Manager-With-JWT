import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Let's Create a Task</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary"><Link to={'/task-create'}>Create Task</Link></button>
                </div>
            </div>
        </div>
    )
}

export default Home