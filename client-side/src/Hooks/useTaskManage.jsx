import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from '@tanstack/react-query'

const useTaskManage = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {refetch, data: tasks =[], isLoading: isTaskLoading, isError } = useQuery({
        queryKey: ["tasks", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/dashboard/projects/tasks?email=${user?.email}`);
            return res.data.result;
        }
    })

    return [ tasks, isTaskLoading, refetch, isError ];
    };

export default useTaskManage;