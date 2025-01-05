import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from '@tanstack/react-query';
import useUsers from "./useUsers";

const useProjects = () => {
    const { user } = useAuth();
    const [users, usersLoading] = useUsers(); // Destructure `isLoading` from `useUsers`
    const axiosSecure = useAxiosSecure();

    // Find the current user after users are loaded
    const currentUser = !usersLoading ? users.find(u => u.email === user?.email) : null;

    const { data: projects = [], isLoading: isProjectLoading, isError, refetch: reFetchProject } = useQuery({
        queryKey: ["projects", user?.email, currentUser?.role],
        enabled: !!user?.email && !!currentUser, // Only fetch when user and currentUser are available
        queryFn: async () => {
            const res = await axiosSecure.get(`/dashboard/projects?email=${user?.email}&role=${currentUser?.role}`);
            return res.data.result;
        }
    });

    return [projects, isProjectLoading, reFetchProject || usersLoading, isError];
};

export default useProjects;

// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";
// import { useQuery } from '@tanstack/react-query'
// import useUsers from "./useUsers";
// import { useEffect, useState } from "react";

// const useProjects = () => {
//     const { user } = useAuth();
//     const [users] = useUsers();
    
//     const currentUser = users.find(u => u.email === user?.email);
//     console.log(currentUser?.role);
//     const axiosSecure = useAxiosSecure();
//     // console.log(user?.email);
//     const { data: projects = [], isLoading, isError, refetch } = useQuery({
//         queryKey: ["projects", user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/dashboard/projects?email=${user?.email}&role=${currentUser?.role}`);
//             return res.data.result;
//         }
//     })

//     return [ projects, isLoading, isError, refetch ];
//     };

// export default useProjects;