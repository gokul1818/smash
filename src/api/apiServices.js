import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { updateAllUserDetails } from "../redux/reducer/userSlice";

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
