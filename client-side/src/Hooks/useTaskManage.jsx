import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTaskManage = () => {
    const { user } = useAuth;
    const axiosSecure = useAxiosSecure();
    const { data: tasks =[], isLoading, isError, refetch } = useQuery({
        queryKey: ["tasks", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks?email=${user?.email}`);
            return res.data;
        }
    })

    return [ tasks, isLoading, isError, refetch ];
    };

export default useTaskManage;