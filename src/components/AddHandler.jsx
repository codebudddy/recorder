import React, { useState } from 'react';
import { db } from '../firebase.config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { newMappedImeiList } from '../data/imeiList';
import LoaderBtn from './LoaderBtn';
import { useAuthContext } from '././Hooks/useAuthContext';
import { useFirestore } from './Hooks/useFireStore';

const AddHandler = () => {
  const { user } = useAuthContext();
  const { addDocument } = useFirestore('entries');
  const [imei, setImei] = useState('');
  const [jobType, setJobType] = useState('mdm');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const entryObj = {
      jobType,
      imei,
      createdAt: serverTimestamp(),
      isCompleted: false,
      rejected: false,
      createdBy: 'Admin',
    };

    if (user?.email === 'bitdoctrine@gmail.com') {
      await addDocument(entryObj);
      resetFields();
      navigate('/');
    } else {
      alert('Only Admin Can Add Document To Database');
    }
  };

  const resetFields = () => {
    setImei('');
    setJobType('mdm');
  };

  const masSubmit = () => {
    setLoading(true);
    const colRef = collection(db, 'entries');
    newMappedImeiList.forEach((obj) => {
      addDoc(colRef, obj)
        .then(() => {
          console.log(`${obj.imei} Added`);
        })
        .catch((err) => {
          console.log(err.message);
        });
    });

    setLoading(false);
  };
  return (
    <div className="h-[50vh] sm:w-[50%] m-auto  p-10 bg-purple-600 text-white rounded-lg mt-10">
      <div className="block m-auto">
        <form onSubmit={handleSubmit}>
          <label htmlFor="jobtype" className="flex flex-col gap-1 mb-3">
            Job type:
            <select
              name="jobType"
              value={jobType}
              className="p-1 rounded-lg text-black"
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="mdm">Mdm</option>
              <option value="Network Unlock">Network Unlock</option>
            </select>
          </label>
          <label htmlFor="imei" className="flex flex-col gap-1 mb-3">
            Imei:
            <input
              onChange={(e) => setImei(e.target.value)}
              className="p-1 rounded-lg text-black"
              type="number"
              value={imei}
            />
          </label>
          <button
            disabled={!imei || !jobType}
            onClick={handleSubmit}
            type="button"
            className="p-2 border-2 border-blue-600 rounded-lg mt-4 hover:text-blue-600 transition-all duration-500 ease-in-out"
          >
            Add Entry
          </button>
        </form>
      </div>

      <div>
        {loading ? (
          <LoaderBtn />
        ) : (
          <button
            onClick={masSubmit}
            className="p-3 border-2 border-blue-600 rounded-lg mt-4"
          >
            Mas Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default AddHandler;
