import React from 'react'
import useUsers from '../../../Hooks/useUsers'

function Users() {

    const [ users, usersLoading, userIsError, usersRefetch ] = useUsers();
    return (
        <>
            <div className="overflow-x-auto mt-6">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='bg-blue-600 text-white'>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='m-4'>
                        {/* row 1 */}
                        {!usersLoading && users.map((user) => {  
                            
                            return (
                                <tr className='bg-white'>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                {/* <div className='p-6 bg-blue-600 rounded text-white'> <span className='wsx-dev'>K</span> </div> */}
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td> {user.email} </td>
                                <td> {user.role} </td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">Edit</button>
                                    <button className="btn btn-ghost btn-xs">Delete</button>
                                </th>
                            </tr>
                            )
                        }) }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Users