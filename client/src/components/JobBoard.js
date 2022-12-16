import { useJobs } from '../graphql/hooks';
import JobList from './JobList';

function JobBoard() {
  const { jobs, loading, error } = useJobs();

  return (
    <>
      {error && <p>Something went wrong.</p>}
      {loading && <p>Loading...</p>}
      {jobs && (
        <div>
          <h1 className="title">Job Board</h1>
          <JobList jobs={jobs} />
        </div>
      )}
    </>
  );
}

export default JobBoard;
