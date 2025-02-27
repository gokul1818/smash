import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import smashLogo from "../../assets/images/smashLogo.svg";
import Button from "../../components/buttonComponent";
import TextInput from "../../components/textInputcomponent";
import { db } from "../../firebaseconfig";
import { base64ToUtf8, utf8ToBase64 } from "../../helpers/index";
import { login } from "../../redux/reducer/authSlice";
import "./styles.css";
interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true); 
    try {
      // Fetch user data from Firestore
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("phoneNumber", "==", mobile));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("Failed to login. User not found.");
        setIsLoading(false);
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const encryptedPassword = userDoc.data().password;

      // Decrypt password (ensure base64ToUtf8 is defined and properly imported)
      const decryptedPassword = base64ToUtf8(encryptedPassword);

      if (password !== decryptedPassword) {
        toast.error("Failed to login. Invalid password.");
        setPassword("");
        setIsLoading(false);
        return;
      }

      const userData = {
        ...userDoc.data(),
        userId: userDoc.id,
        lastMatchPlayed: userDoc.data().lastMatchPlayed,
      };

      const date = new Date(userData?.lastMatchPlayed);
      const dateOnly = date.toLocaleDateString();
      const now = new Date();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const year = now.getFullYear();
      const formattedDate = `${month}/${day}/${year}`;
      if (formattedDate !== dateOnly) {
        await updateDoc(doc(db, "users", userDoc.id), {
          lastLogin: now.toISOString(),
          lastMatchPlayed: now.toISOString(),
          todayMatchPlayed: 0,
        });
      } else {
        await updateDoc(doc(db, "users", userDoc.id), {
          lastLogin: now.toISOString(),
        });
      }

      dispatch(login(userData));
      toast.success("Login successful.");
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login. Please try again.");
      setIsLoading(false); 
    }
  };

  return (
    <div className="login-container p-3">
      <div className="mb-4">
        <img src={smashLogo} alt="login-logo" className="login-logo" />
        <h1 className="smash w-100 px-4">Login</h1>
      </div>
      <div className="px-3">
        <TextInput
          type="number"
          value={mobile}
          inputLabel="Phone Number"
          onChange={(e) => setMobile(e)}
          placeholder="Enter your mobile number"
          className="mb-2"
        />
        <TextInput
          type={showPassword ? "password" : "text"}
          value={password}
          inputLabel="Password"
          onChange={(e) => setPassword(e)}
          placeholder="Enter your password"
          className="mb-2"
          isPassword
          handleClickShowPassword={() => setShowPassword(!showPassword)}
        />
      </div>
      <Button
        label="Login"
        onClick={() => handleLogin()}
        primaryBtn
        className="mt-2"
        loading={isLoading}
      />
    </div>
  );
};

export default Login;
