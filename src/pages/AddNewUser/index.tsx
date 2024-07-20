import CryptoJS from "crypto-js";
import { addDoc, collection } from "firebase/firestore"; // Import Firestore functions
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import toast notifications
import Button from "../../components/buttonComponent";
import TextInput from "../../components/textInputcomponent";
import { db } from "../../firebaseconfig"; 
import "./styles.css"// Import Firebase instance
interface AddNewUserProps { }

const AddNewUser: React.FC<AddNewUserProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [decryptedPhoneNumber, setDecryptedPhoneNumber] = useState<string>("");
  const [encryptedPhoneNumber, setEncryptedPhoneNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [bloodGroup, setBloodGroup] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [slot, setSlot] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [password, setPassword] = useState<any>("");


  useEffect(() => {
    // Extract encrypted phone number from query parameter 'phone'
    const queryParams = new URLSearchParams(location.search);
    const encryptedPhone = queryParams.get("phone");
    if (encryptedPhone) {
      setEncryptedPhoneNumber(encryptedPhone);
    } else {
      // Handle case where 'phone' parameter is missing or invalid
      console.error("No encrypted phone number found in URL");
    }
  }, [location]);

  useEffect(() => {
    // Decrypt phone number when 'encryptedPhoneNumber' changes
    if (encryptedPhoneNumber) {
      try {
        const decryptedPhone = CryptoJS.AES.decrypt(
          encryptedPhoneNumber,
          "secret_key"
        ).toString(CryptoJS.enc.Utf8);
        setDecryptedPhoneNumber(decryptedPhone);
      } catch (error) {
        console.error("Error decrypting phone number:", error);
        // Handle decryption error, e.g., display an error message
        setDecryptedPhoneNumber(""); // Clear the decrypted phone number
      }
    }
  }, [encryptedPhoneNumber]);

  const navigateToHome = () => {
    navigate("/home");
  };

  const handleAddNewUser = async () => {
    // Form validation
    if (!name || !age || !bloodGroup || !level || !slot || !time || !decryptedPhoneNumber || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    const encryptedPassword = CryptoJS.AES.encrypt(password, "secret_key").toString();

    // Prepare data object
    const newUser = {
      name: name,
      age: age,
      bloodGroup: bloodGroup,
      level: level,
      slot: slot,
      time: time,
      phoneNumber: decryptedPhoneNumber,
      timestamp: new Date().toISOString(),
      password: encryptedPassword// Include timestamp as ISO string
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
      setTime("");
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
          type="text"
          onChange={(e) => setBloodGroup(e)}
          value={bloodGroup}
          placeholder="Enter Blood Group"
          className=""
          inputLabel="Blood Group"
        />
        <TextInput
          type="text"
          onChange={(e) => setLevel(e)}
          value={level}
          placeholder="Enter Level"
          className=""
          inputLabel="Level"
        />
        <TextInput
          type="text"
          onChange={(e) => setSlot(e)}
          value={slot}
          placeholder="Enter Slot"
          className=""
          inputLabel="Slot"
        />
        <TextInput
          type="text"
          onChange={(e) => setTime(e)}
          value={time}
          placeholder="Enter Time"
          className=""
          inputLabel="Time"
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
          type="text"
          onChange={(e) => { setPassword(e) }}
          value={password}
          disabled
          placeholder="Enter Password"
          className=""
          inputLabel="Password"
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
