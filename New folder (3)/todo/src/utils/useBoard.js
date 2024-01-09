import { useState, useEffect } from 'react'
import {
    collection,
    getDocs,
    doc,
    onSnapshot,
    query,
  } from "firebase/firestore";
  import { db } from "../firebase";
  import { getAuth } from "firebase/auth";
  import useStore from "../store";

const useBoard = (uid, id) => {
    const [tasks, setTasks] = useState(null)
    const [columns, setColumns] = useState(null)
    const [final, setFinal] = useState(null)
    const [lastUpdatedTimestamp, setLastUpdated] = useState(null)

    useEffect(() => {
      const docRef = collection(db, `users/${uid}/boardsData/${id}/tasks`);
      return onSnapshot(docRef, (snapshot) => {
        const docs = []
        snapshot.forEach((doc) => {
          docs.push(doc.data().tasks)
          console.log(doc.data().tasks)
        })
        setTasks(docs)
      })
    }, [uid, id])

    useEffect(() => {
      const docRef = collection(db, `users/${uid}/boardsData/${id}/columns`);
      onSnapshot(docRef, (snapshot) => {
        const docs = []
        snapshot.forEach((doc) => {
          docs.push(doc.data().columns)
          console.log(doc.data().columns)
        })
        setColumns(docs)
      });
    }, [uid, id]);


    useEffect(() => {
        if (tasks && columns) {
            const entries = Object.fromEntries((
                Object.entries(tasks).sort(([, a], [, b]) => a.id - b.id)
            ))
            setFinal(entries)
        }
    }, [tasks, columns])

    return { initialData: final, setInitialData: setFinal, lastUpdatedTimestamp }

}

export default useBoard