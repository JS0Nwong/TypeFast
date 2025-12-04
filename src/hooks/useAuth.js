import { auth, db } from "../configs/firebase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, updateDoc, setDoc, increment } from "firebase/firestore";
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
      } else {
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

  const updateUserStats = async (wpm, accuracy, rawWpm, mode, selectedTime, wordsAmount) => {

    const validWordsAmount = [
      {10: 'ten'},
      {20: 'twenty'},
      {50: 'fifty'},
      {100: 'hundred'},
    ];
    const validTimeAmount = [
      {15: 'fifteen'},
      {30: 'thirty'},
      {60: 'sixty'},
      {120: 'two_minutes'},
    ]
    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userDocData = userDoc.data();
        const time = validTimeAmount[selectedTime];
        const words = validWordsAmount[wordsAmount];

        await updateDoc(userDocRef, {
          userStats: {
            ...userDocData.userStats,
            [mode]: {
              ...userDocData.userStats[mode],
              [mode === "time" ? selectedTime : wordsAmount]: {
                wpm: wpm,
                acc: accuracy,
              },
            },
            testTaken: increment(1),
          },
        });
      } else {
        await setDoc(userDocRef, {
          userStats: {
            time: {
              fifteen: {
                wpm: 0,
                acc: 0,
              },
              thirty: {
                wpm: 0,
                acc: 0,
              },
              sixty: {
                wpm: 0,
                acc: 0,
              },
              two_minutes: {
                wpm: 0,
                acc: 0,
              },
            },
            words: {
              ten: {
                wpm: 0,
                acc: 0,
              },
              twenty: {
                wpm: 0,
                acc: 0,
              },
              fifty: {
                wpm: 0,
                acc: 0,
              },
              hundred: {
                wpm: 0,
                acc: 0,
              },
            },
            wpm: wpm,
            rawWpm: rawWpm,
            accuracy: accuracy,
            testTaken: 1,
          },
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
    updateUserStats,
  };
};

export { useAuth };
