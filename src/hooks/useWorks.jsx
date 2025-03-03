import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useWorks = () => {
  // tan stack query
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { refetch, data: workData = [] } = useQuery({
    queryKey: ['work', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/work-sheets?email=${user.email}`);
      return res.data;
    },
  });
  return [workData, refetch];
};

export default useWorks;
