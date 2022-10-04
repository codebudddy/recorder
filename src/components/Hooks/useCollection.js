import { useEffect, useState, useRef } from 'react';
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../firebase.config';

export const useCollection = (collectionName, _query, _sort) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  //if we do not use a useRef hook, there will be infinite loop in useEffect hook and we do not want that
  //_query is an array and is different on every funtion call

  const queryString = useRef(_query).current;
  const sortString = useRef(_sort).current;

  useEffect(() => {
    let collectionRef = collection(db, collectionName);

    // if (queryString && !sortString) {
    //   collectionRef = query(collectionRef, where(queryString));
    // } else if (!queryString && sortString) {
    //   collectionRef = query(collectionRef, orderBy(sortString));
    // } else if (queryString && sortString) {
    //   collectionRef = query(
    //     collectionRef,
    //     where(queryString, orderBy(sortString))
    //   );
    // } else if (!queryString && !sortString) {
    //   collectionRef = query(collectionName);
    // }

    let q = query(collectionRef, orderBy('createdAt', 'desc'));
    onSnapshot(
      q,
      (snapshot) => {
        let data = [];
        snapshot.docs.forEach((doc) =>
          data.push({ ...doc.data(), id: doc.id })
        );
        setDocument(data);
      },
      (err) => setError(err)
    );
  }, [collectionName, queryString, sortString]);

  return { error, document };
};
