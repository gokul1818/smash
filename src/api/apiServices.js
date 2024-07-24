import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react"; // Import useEffect hook from React
import { login } from "../redux/reducer/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { db } from "../firebaseconfig";
import { updateAllUserDetails } from "../redux/reducer/userSlice";

export const useFetchUserData = (userId) => {
  // const userId = useAppSelector((state) => state.auth.user.userId); // Access userId from Redux store
  const dispatch = useAppDispatch(); // Get dispatch function from Redux store

  useEffect(() => {
    if (!userId) {
      console.error("User ID not found in Redux store.");
      return;
    }

    const userDocRef = doc(db, "users", userId);

    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userData = {
          ...doc.data(),
          userId: doc.id,
        };
        console.log("User data:", userData);
        dispatch(login(userData)); // Dispatch login action with fetched user data
      } else {
        console.log("No such document!");
      }
    });

    // Unsubscribe from snapshot listener when component unmounts or when userId changes
    return () => unsubscribe();
  }, [userId, dispatch]); // useEffect dependencies: userId and dispatch function
};
export const fetchAllUserData = (dispatch) => {
  const usersRef = collection(db, "users");

  const unsubscribe = onSnapshot(usersRef, (snapshot) => {
    const userDataArray = [];
    snapshot.forEach((doc) => {
      if (doc.exists()) {
        const userData = {
          ...doc.data(),
          userId: doc.id,
        };
        userDataArray.push(userData);
      } else {
        console.log("No such document!");
      }
    });

    // Dispatch action to update Redux state with array of user data
    dispatch(updateAllUserDetails(userDataArray));
  });

  // Unsubscribe from snapshot listener when component unmounts or when no longer needed
  return () => unsubscribe();
};
