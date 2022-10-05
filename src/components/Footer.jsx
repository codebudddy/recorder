import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCollection } from './Hooks/useCollection';

const Footer = () => {
  const { document } = useCollection('entries');
  const [collected, setCollected] = useState(null);
  const [paid, setPaid] = useState(null);

  const Totalbalance = collected?.length * 4000;
  const unpaid = document?.filter((doc) => !doc?.isPaid && doc.isCollected);

  useEffect(() => {
    const collectedCol = document?.filter((doc) => doc.isCollected);
    const PaidCol = document?.filter((doc) => doc.isPaid);
    setPaid(PaidCol);
    setCollected(collectedCol);
  }, [document]);

  return (
    <div className="absolute bottom-0 z-10 bg-slate-100 w-full flex justify-start items-center flex-wrap">
      <h3 className="m-4 text-center font-bold text-xl">
        <Link
          to={`/status/collected`}
          className="text-blue-600 border-2 border-blue-600 rounded-lg p-2 "
        >
          Collected:{' '}
          <span className=" text-blue-600 rounded-full">
            {collected?.length}
          </span>
        </Link>
      </h3>
      <h3 className="m-4 text-center font-bold text-xl">
        <Link
          to={`/status/paid`}
          className="text-green-600 border-2 border-green-600 rounded-lg p-2 "
        >
          Paid:{' '}
          <span className=" text-green-600 rounded-full">
            {paid?.length * 4000}
          </span>
        </Link>
      </h3>
      <h3 className="m-4 text-center font-bold text-xl">
        <Link
          to={`/status/collected`}
          className="text-yellow-600 border-2 border-yellow-600 rounded-lg p-2 "
        >
          Total :{' '}
          <span className=" text-yellow-600 rounded-full">#{Totalbalance}</span>
        </Link>
      </h3>
      <h3 className="m-4 text-center font-bold text-xl">
        <Link
          to={`/status/unpaid`}
          className="text-red-600 border-2 border-red-600 rounded-lg p-2 "
        >
          Unpaid :{' '}
          <span className=" text-red-600 rounded-full">
            #{unpaid?.length * 4000}
          </span>
        </Link>
      </h3>
    </div>
  );
};

export default Footer;
