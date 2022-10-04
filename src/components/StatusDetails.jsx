import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useCollection } from './Hooks/useCollection';

const StatusDetails = () => {
  const { document } = useCollection('entries');
  const { status } = useParams();
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    if (document) {
      if (status === 'total') {
        setDocuments(document);
      } else if (status === 'completed') {
        setDocuments(document.filter((entry) => entry.isCompleted));
      } else if (status === 'pending') {
        setDocuments(document.filter((entry) => !entry.isCompleted));
      } else if (status === 'paid') {
        setDocuments(document.filter((entry) => entry.isPaid));
      } else if (status === 'unpaid') {
        setDocuments(
          document.filter((entry) => !entry.isPaid && entry.isCollected)
        );
      } else {
        setDocuments(document.filter((entry) => entry.isCollected));
      }
    }
  }, [document, status]);

  return (
    <div className="w-[90%] md:w-[50%] m-auto">
      <Sidebar jobs={documents} />
    </div>
  );
};

export default StatusDetails;
