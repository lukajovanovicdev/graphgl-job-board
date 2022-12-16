import { JOBS_QUERY, JOB_QUERY } from '../graphql/queries';
import { useQuery } from '@apollo/client';

export const useJobs = () => {
  const { data, loading, error } = useQuery(JOBS_QUERY, { fetchPolicy: 'network-only' });
  return {
    jobs: data?.jobs,
    loading,
    error: !!error,
  };
};

export const useJob = (id) => {
  const { data, loading, error } = useQuery(JOB_QUERY, { variables: { id } });
  return {
    job: data?.job,
    loading,
    error: !!error,
  };
};