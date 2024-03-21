import { auth, db } from "../configs/firebase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { useBoundStore } from "../utils/stores/boundStore";
const useAuth = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useBoundStore();

  const emailAndPassAuth = async (isLogin, email, password, username) => {
    try {
      isLogin
        ? await signInWithEmailAndPassword(auth, username, password)
        : await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              return updateProfile(userCredential.user, {
                displayName: username,
              });
            })
            .catch((error) => console.log(error));
      setIsAuthenticated(true);
      navigate("/account");
    } catch (error) {
      console.log(error);
    }
  };
  const popUpAuth = async () => {
    try {
      await signInWithPopup(auth, provider);
      setIsAuthenticated(true);
      navigate("/account");
    } catch (error) {
      console.log(error);
    }
  };
  const editUserProfile = async (
    bioInfo,
    keyboardInfo,
    instagramLink,
    youtubeLink,
    xLink
  ) => {
    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        await updateDoc(userDocRef, {
          bio: bioInfo,
          keyboard: keyboardInfo,
          instagram: instagramLink,
          youtube: youtubeLink,
          twitter: xLink,
        });
      }
      else {
        await setDoc(userDocRef, {
          bio: bioInfo,
          keyboard: keyboardInfo,
          instagram: instagramLink,
          youtube: youtubeLink,
          twitter: xLink,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    emailAndPassAuth,
    popUpAuth,
    editUserProfile,
  };
};

export { useAuth };
