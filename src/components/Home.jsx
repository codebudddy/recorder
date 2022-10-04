import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { useCollection } from './Hooks/useCollection';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const { document } = useCollection('entries');

  useEffect(() => {
    if (document) setJobs(document);
  }, [document]);

  return (
    <div className="flex justify-around ">
      <div className="hidden flex-1  sm:block mt-14 ml-10">
        <Sidebar jobs={jobs} />
      </div>
      <header className="mt-14 flex-1 ml-10 text-center w-full flex flex-col justify-start items-start">
        <h1 className="text-purple-600 text-2xl border-2 border-purple-600 p-1 rounded-lg mb-4">
          Entry Summary
        </h1>

        <h3 className="mb-4">
          <Link
            to={`/status/total`}
            className="text-blue-600 border-2 border-blue-600 rounded-lg p-1 "
          >
            {jobs.length} Total Jobs
          </Link>
        </h3>

        <h3 className="mb-4">
          <Link
            to={`/status/completed`}
            className="text-green-600 border-2 border-green-600 rounded-lg p-1 "
          >
            {jobs.filter((job) => job.isCompleted).length} Completed Jobs
          </Link>
        </h3>
        <h3 className="mb-4">
          <Link
            to={`/status/pending`}
            className="text-yellow-600 border-2 border-yellow-600 rounded-lg p-1 "
          >
            {jobs.filter((job) => !job.isCompleted).length} Pending Jobs
          </Link>
        </h3>

        {/* {jobs.map((job) => (
          <div key={job.id}>
            <p>{job.imei}</p>
          </div>
        ))} */}
      </header>
    </div>
  );
};

export default Home;
