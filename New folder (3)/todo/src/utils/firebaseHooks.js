// For async operations
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  getDoc,
  setDoc,
  onSnapshot,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { getAuth } from "firebase/auth";
import useStore from "../store";
import { useNavigate, useParams } from "react-router-dom";

const useFirebaseHooks = () => {
  const { addBoard, boards, setBoards, setCurrentBoard } = useStore();

  const getId = async() => {
    const { id } = useParams();
    const docRef = doc(db, `boardsMetadata/${id}`);
    try {
      const boardDoc = await getDoc(docRef).then((doc) => {
        if (doc.exists) {
          return doc.data().boardOwner;
        } else {
          return null;
        }
      })
      setCurrentBoard(boardDoc);
    } catch (error) {
      console.log(error)
    }
  };

  const navigate = useNavigate();
  const uid = auth?.currentUser !== null ? auth?.currentUser.uid : getId()
  const email = auth?.currentUser !== null ? auth?.currentUser.email : null

  // const {currentUser: {uid, email}} = getAuth()

  const boardColRef = collection(db, `users/${uid}/boards`);

  const createBoard = async ({ name, color, description }) => {
    try {
      const boardDoc = await addDoc(boardColRef, {
        name,
        color,
        description,
        createdAt: serverTimestamp(),
        isPubliclyViewable: false,
        isPubliclyEditable: false,
        sharedToUsers: [
          {
            email: email,
            canEdit: true,
            canView: true,
          },
        ],
        boardOwner: uid,
      });

      addBoard({
        name,
        color,
        description,
        createdAt: new Date().toLocaleString("en-US"),
        id: boardDoc.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBoard = async (id) => {
    try {
      const docRef = doc(db, `users/${uid}/boards/${id}`);
      await deleteDoc(docRef);

      const tBoards = boards.filter((board) => board.id !== id);
      setBoards(tBoards);
    } catch (error) {
      throw error;
    }
  };

  const getBoards = async (setLoading) => {
    try {
      const q = query(boardColRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const boards = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toLocaleString("en-US"),
      }));

      setBoards(boards);
    } catch (error) {
      console.log(error);
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  const getBoard = async (id) => {
    const docRef = doc(db, `users/${uid}/boardsData/${id}`);
    try {
      const doc = await getDoc(docRef);
      if (doc.exists) {
        return doc.data();
      } else return null;
    } catch (error) {
      throw error;
    }
  };

  const updateLabels = async (id, label) => {
    const docRef = doc(db, `users/${uid}/boardsData/${id}`);
    try {
      await updateDoc(docRef, {
        labels: arrayUnion(label),
      });
    } catch (error) {
      throw error;
    }
  };

  const updateBoard = async (id, tasks) => {
    const docRef = doc(db, `users/${uid}/boardsData/${id}`);
    try {
      await updateDoc(docRef, {
        columns: {
          ...tasks,
        },
        lastUpdated: serverTimestamp(),
      });
    } catch (error) {
      throw error;
    }
  };

  const updateColumnKeys = async (id, keys) => {
    const docRef = doc(db, `users/${uid}/boardsData/${id}`);
    try {
      await updateDoc(docRef, {
        orderBy: keys,
      });
    } catch (error) {
      throw error;
    }
  };

  const updateUsers = async (id, users) => {
    const docRef = doc(db, `users/${uid}/boards/${id}`);
    try {
      await updateDoc(docRef, {
        sharedToUsers: arrayUnion({
          canEdit: true,
          canView: true, 
          email: users,
        })
      })
    } catch (error) {
      throw error;
    }
  };

  const updateUserPermissionChange = async(id, userEmail, accessPermissions) =>{
    const docRef = doc(db, `users/${uid}/boards/${id}`)
    try {
      const docSnap = await getDoc(docRef)
      if(docSnap.exists) {
        const removePermissions = docSnap.data().sharedToUsers.filter((user) => user.email !== userEmail.email)
        const newPermissions = docSnap.data().sharedToUsers.filter((user) => user.email === userEmail.email)
        if(accessPermissions === 'edit') {
          newPermissions[0].canEdit = true
          newPermissions[0].canView = true
        }
        else {
          newPermissions[0].canView = true
          newPermissions[0].canEdit = false
        }
        await updateDoc(docRef, {
          sharedToUsers: [...removePermissions, ...newPermissions],
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateBoardEditPermissions = async (id, settings) => {
    const docRef = doc(db, `users/${uid}/boards/${id}`);
    const metadataDocRef = doc(db, `boardsMetadata/${id}`)
    try {
      await updateDoc(docRef, {
        isPubliclyEditable: settings,
        isPubliclyViewable: settings,
      });
      await updateDoc(metadataDocRef, {
        isPubliclyEditable: settings,
        isPubliclyViewable: settings,
      });
    } catch (error) {
      throw error;
    }
  };

  
  const updateBoardViewPermissions = async (id, settings) => {
    const docRef = doc(db, `users/${uid}/boards/${id}`);
    const metadataDocRef = doc(db, `boardsMetadata/${id}`)
    try {
      await updateDoc(docRef, {
        isPubliclyViewable: settings,
      });
      await updateDoc(metadataDocRef, {
        isPubliclyViewable: settings,
      });
    } catch (error) {
      throw error;
    }
  };

  return {
    createBoard,
    deleteBoard,
    getBoard,
    getBoards,
    updateBoard,
    updateColumnKeys,
    updateLabels,
    updateUsers,
    updateBoardEditPermissions,
    updateBoardViewPermissions,
    updateUserPermissionChange,
    uid,
    email,
  };
};

export default useFirebaseHooks;
