import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from '@tanstack/react-query'

const useUsers = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: users = [], isLoading: usersLoading, isError: userIsError, refetch: usersRefetch } = useQuery({
        queryKey: ["users", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            return res.data.result;
        }
    })

    return [ users, usersLoading, userIsError, usersRefetch ];
    };

export default useUsers;