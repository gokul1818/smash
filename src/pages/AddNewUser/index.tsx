import { addDoc, collection, getDocs, query, where } from "firebase/firestore"; // Import Firestore functions
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast notifications
import Button from "../../components/buttonComponent";
import TextInput from "../../components/textInputcomponent";
import { db } from "../../firebaseconfig";
import { base64ToUtf8, utf8ToBase64 } from '../../helpers';
import "./styles.css"; // Import Firebase instance
interface AddNewUserProps { }

const AddNewUser: React.FC<AddNewUserProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [decryptedPhoneNumber, setDecryptedPhoneNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [bloodGroup, setBloodGroup] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [slot, setSlot] = useState<string>("");
  const [password, setPassword] = useState<any>("");
  const [showPassword, setShowPassword] = useState<Boolean>(true);

  const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const levelOptions = ["Pro", "Beginner", "Average"];
  const slotOptions = [
    "5:00 to 6:00 am",
    "6:00 to 7:00 am",
    "7:00 to 8:00 am",
    "8:00 to 9:00 am",
    "9:00 to 10:00 am",
    // "10:00 to 11:00 am",
    // "11:00 to 12:00 pm",
    // "12:00 to 1:00 pm",
    // "1:00 to 2:00 pm",
    // "2:00 to 3:00 pm",
    // "3:00 to 4:00 pm",
    "4:00 to 5:00 pm",
    "5:00 to 6:00 pm",
    "6:00 to 7:00 pm",
    "7:00 to 8:00 pm",
    "8:00 to 9:00 pm",
    "9:00 to 10:00 pm",
    "10:00 to 11:00 pm",


  ];





  useEffect(() => {
    // Extract encrypted phone number from query parameter 'phone'
    const queryParams = new URLSearchParams(location.search);
    const encryptedPhone = queryParams.get("phone");

    if (encryptedPhone) {

      try {
        const decryptedPhone = base64ToUtf8(encryptedPhone)
        console.log(decryptedPhone)
        setDecryptedPhoneNumber(decryptedPhone);
      } catch (error) {
        console.error("Error decrypting phone number:", error);
        // Handle decryption error, e.g., display an error message
        setDecryptedPhoneNumber(""); // Clear the decrypted phone number
      }
    }
  }, [location]);

  const navigateToHome = () => {
    navigate("/home");
  };

  const handleAddNewUser = async () => {
    // Form validation
    if (!name || !age || !bloodGroup || !level || !slot || !decryptedPhoneNumber || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    // Check if phone number already exists
    const phoneExists = await checkPhoneExists(decryptedPhoneNumber);
    if (phoneExists) {
      toast.error("Phone number already exists. Please use a different phone number.");
      return;
    }


    const encryptedPassword = utf8ToBase64(password);

    // Prepare data object
    const newUser = {
      name: name,
      age: age,
      bloodGroup: bloodGroup,
      level: level,
      slot: slot,
      phoneNumber: decryptedPhoneNumber,
      isAdmin: false,
      timestamp: new Date().toISOString(),
      password: encryptedPassword,
      streaks: 0,
      score: 0,
      readyMatch: false,
      lastLogin: new Date().toISOString(),
      billDue: new Date().toISOString(),
      played: 0,
      todayMatchPlayed: 0

    };

    try {
      // Add new user data to Firestore
      const docRef = await addDoc(collection(db, "users"), newUser);
      console.log("Document written with ID: ", docRef.id);

      // Reset form fields after successful submission
      setName("");
      setAge(undefined);
      setBloodGroup("");
      setLevel("");
      setSlot("");
      setDecryptedPhoneNumber("");
      setPassword("")
      toast.success("User added successfully!");

      // Navigate to home page or any other desired route
      navigateToHome();
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to add user. Please try again.");
    }
  };


  const checkPhoneExists = async (phoneNumber: string) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("phoneNumber", "==", phoneNumber));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking phone number existence:", error);
      return false; // Return false on error to avoid unintended behavior
    }
  };

  
  return (
    <div className="adduser-container p-3">
      <div className="add-new-user-container">
        <TextInput
          type="text"
          onChange={(e) => setName(e)}
          value={name}
          placeholder="Enter Name"
          className=""
          inputLabel="Name"
        />
        <TextInput
          type="number"
          onChange={(e) => setAge(parseInt(e))}
          value={age || ""}
          placeholder="Enter Age"
          className=""
          inputLabel="Age"
        />
        <TextInput
          type="select"
          onChange={(e) => setBloodGroup(e)}
          value={bloodGroup}
          placeholder="Enter Blood Group"
          className=""
          inputLabel="Blood Group"
          options={bloodGroupOptions}
        />
        <TextInput
          type="select"
          onChange={(e) => setLevel(e)}
          value={level}
          placeholder="Enter Level"
          className=""
          inputLabel="Level"
          options={levelOptions}

        />
        <TextInput
          type="select"
          onChange={(e) => setSlot(e)}
          value={slot}
          placeholder="Enter Slot"
          className=""
          inputLabel="Slot"
          options={slotOptions}
        />
        <TextInput
          type="number"
          onChange={(e) => { }}
          value={decryptedPhoneNumber}
          disabled
          placeholder="Enter Phone Number"
          className=""
          inputLabel="Phone Number"
        />
        <TextInput
          type={showPassword ? "password" : "text"}
          onChange={(e) => { setPassword(e) }}
          value={password}
          placeholder="Enter Password"
          className=""
          inputLabel="Password"
          isPassword={true}
          handleClickShowPassword={() => setShowPassword(!showPassword)}
        />

        <Button
          label="Sign Up"
          height="50px"
          width="100px"
          className="mt-3"
          secondaryBtn={true}
          primaryBtn={false}
          onClick={handleAddNewUser}
        />
      </div>
    </div>
  );
};

export default AddNewUser;
