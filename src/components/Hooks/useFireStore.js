import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { useReducer, useEffect, useState } from 'react';
import { db } from '../../firebase.config';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { ...state, isPending: true };
    case 'ADDED_DOCUMENT':
      return { ...state, document: action.payload, success: true };
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null };
    case 'UPDATED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };

    case 'ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const collectionRef = collection(db, collectionName);

  //This next function ensures that dispatch only occurs if the user does not cancel the process midway

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  //Add document function
  const addDocument = async (d) => {
    //d is the document to be added

    dispatch({ type: 'IS_PENDING' });

    try {
      await addDoc(collectionRef, d).then((res) => {
        console.log(res.firestore);
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
    }
  };

  //Delete Document Function

  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      deleteDoc(collectionRef, id).then(() => {
        dispatchIfNotCancelled({ type: 'DELETED_DOC' });
      });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message });
    }
  };

  //Update Document Function

  const updateDocument = async (id, updates) => {
    dispatch({ type: 'PENDING' });
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, updates);
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};
