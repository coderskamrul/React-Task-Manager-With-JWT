import React, { useContext, useEffect, useState } from 'react'
import Project from './Project'
import AddProjectForm from './AddProjectForm'
import axios from 'axios';
import { AuthContext } from '../../../Provider/AuthProvider';

const Projects = () => {

    const {projects} = useContext(AuthContext);
    // useEffect(() => {
    //     axios.get('http://localhost:5000/projects', {withCredentials: true})
    //         .then(res => {
    //             console.log(res.data); 
    //             setProjects(res.data.result);
    //             setCurrentProject(res.data.result);
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         }
    //     );
    // },[])
    // console.log(projects);
    return (
        <>
            <div className="px-4">
                <div className="my-5">
                    {/* <h2 className="text-lg font-semibold text-gray-900">Projects</h2> */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold capitalize">Projects</h2>
                        <button
                            type="button"
                            className="flex flex-row-reverse items-center gap-1 bg-blue-600 text-white rounded-md px-3 py-2"
                        >
                            <span className="" onClick={() => document.getElementById('my_modal_2').showModal()}>Add Project</span>
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
                <div className="grid sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
                    {/* Project Component */}
                    {
                        projects.map((project) => {
                            return <Project key={project._id} project={project} />
                        })
                    }
                </div>
            </div>
            <AddProjectForm />
        </>
    )
}

export default Projects