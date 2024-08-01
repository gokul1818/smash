import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { updateAllUserDetails } from "../redux/reducer/userSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/reducer/authSlice";

export const fetchAllUserData = (dispatch) => {
  const usersRef = collection(db, "users");

  // Subscribe to changes in the 'users' collection
  const unsubscribe = onSnapshot(
    usersRef,
    (snapshot) => {
      const userDataArray = [];
      snapshot.forEach((doc) => {
        if (doc.exists()) {
          const userData = {
            ...doc.data(), // Spread the document data into a new object
            userId: doc.id, // Include the document ID as userId
          };
          userDataArray.push(userData); // Collect each user's data into an array
        } else {
          console.log("No such document!");
        }
      });

      // Dispatch action to update Redux state with array of user data
      dispatch(updateAllUserDetails(userDataArray));
    },
    (error) => {
      // Handle errors from Firestore snapshot listener
      console.error("Error fetching users:", error);
    }
  );

  // Function to unsubscribe from Firestore snapshot listener
  return () => unsubscribe();
};

export const useFetchUserData = (userId) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) {
      setError("User ID not found");
      setLoading(false);
      return;
    }

    const userDocRef = doc(db, "users", userId);

    const unsubscribe = onSnapshot(
      userDocRef,
      (doc) => {
        if (doc.exists()) {
          const data = {
            ...doc.data(),
            userId: doc.id,
          };
          setUserData(data);
          dispatch(login(data)); // Dispatch login action with fetched user data
        } else {
          setError("No such document!");
        }
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Cleanup on unmount or userId change
  }, [userId, dispatch]);

  return { userData, loading, error };
};

export const updateUserScores = async (userId, score, userData) => {
  try {
    // Reference to the specific user document
    const userRef = doc(db, "users", userId);

    // Safeguard to handle undefined or null values in userData
    const todayMatchPlayed = userData?.todayMatchPlayed ?? 0;
    const played = userData?.played ?? 0;

    await updateDoc(userRef, {
      score: score,
      todayMatchPlayed: todayMatchPlayed + 1,
      played: played + 1,
      lastMatchPlayed: new Date().toISOString(),
    });

    console.log("User scores updated successfully");
  } catch (error) {
    console.error("Error updating user scores:", error);
    // Consider additional error handling or reporting
  }
};
