import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase.config';
import { doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthContext } from './Hooks/useAuthContext';
import { useFirestore } from './Hooks/useFireStore';

const JobDetails = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const { user } = useAuthContext();
  const { updateDocument } = useFirestore('entries');

  const jobUpdateHandler = async () => {
    const newDoc = {
      ...document,
      isCompleted: true,
      completedDate: serverTimestamp(),
    };
    updateDocument(id, newDoc).then(() => {
      console.log(`job ${id} Updated`);
    });
  };

  const markAsCollected = () => {
    const newDoc = {
      ...document,
      isCollected: true,
      collectDate: serverTimestamp(),
    };

    updateDocument(id, newDoc).then(() => {
      console.log(`job ${id} Collected`);
    });
  };

  const markAsPaid = () => {
    const newDoc = { ...document, isPaid: true, paidDate: serverTimestamp() };
    updateDocument(id, newDoc).then(() => {
      console.log(`Job ${id} is paid for`);
    });
  };

  useEffect(() => {
    const colRef = doc(db, 'entries', id);
    getDoc(colRef)
      .then((snapshot) => setDocument(snapshot.data()))
      .catch((err) => console.log(err.message));
  });
  return (
    <div className="text-left pl-10 mt-10">
      <h3 className=" text-black">Job Id: {id}</h3>
      <div className=" mt-6">
        <p className=" text-black my-2">
          Desc: <span className="text-purple-600">{document?.jobType}</span>
        </p>
        <p className=" text-black my-2">
          Imei: <span className="text-purple-600">{document?.imei}</span>
        </p>
        <p className=" text-black my-2">
          Added Date:{' '}
          <span className="text-purple-600">
            {document?.createdAt.toDate().toLocaleDateString()}
          </span>
        </p>
        <p className=" text-black my-2">
          Status:{' '}
          <span className="text-purple-600">
            {document?.isCompleted ? 'Completed' : 'Processing'}
          </span>
        </p>
      </div>
      <div>
        {document?.isCompleted && (
          <div>
            <p>
              Done date:
              <span className="text-purple-600">
                {document?.completedDate?.toDate().toLocaleDateString()}{' '}
                {document?.completedDate?.toDate().toLocaleTimeString()}
              </span>{' '}
            </p>
            {document?.isCollected && (
              <p>
                Collected Date:{' '}
                <span className="text-purple-600">
                  {document?.collectDate?.toDate().toLocaleDateString()}{' '}
                  {document?.collectDate?.toDate().toLocaleTimeString()}
                </span>
              </p>
            )}
            {document?.isPaid && (
              <p>
                Paid Date:{' '}
                <span className="text-purple-600">
                  {document?.paidDate?.toDate().toLocaleDateString()}{' '}
                  {document?.paidDate?.toDate().toLocaleTimeString()}
                </span>
              </p>
            )}
          </div>
        )}
      </div>

      {user.email === 'bitdoctrine@gmail.com' && (
        <div>
          {!document?.isCompleted && (
            <button
              onClick={jobUpdateHandler}
              className="m-4 ml-0 border-2 border-white p-2 rounded-lg text-white font-bold bg-purple-600"
            >
              mark as complete
            </button>
          )}

          {!document?.isCollected && document?.isCompleted && (
            <button
              onClick={markAsCollected}
              className="m-4 ml-0 border-2 border-white p-2 rounded-lg text-white font-bold bg-green-600"
            >
              mark as Collected
            </button>
          )}

          {!document?.isPaid && document?.isCollected && (
            <button
              onClick={markAsPaid}
              className="m-4 ml-0 border-2 border-white p-2 rounded-lg text-white font-bold bg-blue-600"
            >
              mark as Paid
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default JobDetails;
