import axios from 'axios'
import React, { useEffect } from 'react'
import SingleTask from './SingleTask';

const TaskView = () => {
    const [tasks, setTasks] = React.useState([]);
    //i want to show all the tasks here using axios using 'http://localhost:5000/upload-image'
    useEffect(() => {
        axios.get('http://localhost:5000/upload-image')
            .then(res => {
                console.log(res.data);
                setTasks(res.data.result);
            })
            .catch(err => {
                console.error(err);
            }
        );
    },[])
    console.log(tasks);
    return (
        <>
        <h2 className='text-3xl text-center font-bold p-8'>Task Lists</h2>
        <div className='flex flex-wrap justify-center gap-8 max-w-7xl mx-auto'>
           {
                tasks.map((task) => {
                     return <SingleTask key={task._id} task={task} />
                })
           }
        </div>
        </>
    )
}

export default TaskView