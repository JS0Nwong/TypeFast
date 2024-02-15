import { auth } from "../configs/firebase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useBoundStore } from "../utils/stores/boundStore";
const useAuth = () => {
  const provider = new GoogleAuthProvider()
  const navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated } = useBoundStore();

  const emailAndPassAuth = async (isLogin, username, password) => {
    try {
      isLogin
        ? await signInWithEmailAndPassword(auth, username, password)
        : await createUserWithEmailAndPassword(auth, email, password);
      navigate("/account");
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };
  const popUpAuth = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/account");
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    emailAndPassAuth,
    popUpAuth,
  };
};

export { useAuth };
