import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from './Hooks/useAuthContext';
import { GoVerified } from 'react-icons/go';

const Entry = ({ job }) => {
  const { user } = useAuthContext();
  return (
    <Link to={`/jobs/${job.id}`}>
      <div className="m-6 bg-gradient-to-bl from-blue-600 to-purple-600 text-white font-bold p-4 rounded-2xl cursor-pointer flex flex-col gap-2 shadow-md">
        <h3>
          <span>
            {job.createdAt?.toDate().toLocaleDateString()}{' '}
            <span>{job.createdAt?.toDate().toLocaleTimeString()}</span>{' '}
          </span>
        </h3>
        <h2>{job.imei} </h2>
        <div>
          {job.isCompleted && (
            <span className="mt-2 text-green-300 flex items-center gap-10">
              <span className="flex items-center gap-2" >
                Done: <GoVerified />
              </span>
              {job?.isCollected && <span> Collected</span>}
            </span>
          )}
        </div>
        {user?.email === 'bitdoctrine@gmail.com' && (
          <div className="flex justify-between items-center"></div>
        )}
      </div>
    </Link>
  );
};

export default Entry;
