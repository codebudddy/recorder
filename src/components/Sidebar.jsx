import React from 'react';
import Entry from './Entry';

const Sidebar = ({ jobs }) => {
  return (
    <div className="overflow-y-scroll scrollbar-hide h-[90vh]">
      <h3 className="text-2xl text-purple-700 ml-6"> Entries</h3>

      {jobs?.map((job) => (
        <Entry key={job.id} job={job} />
      ))}
    </div>
  );
};

export default Sidebar;
