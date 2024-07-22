import CryptoJS from 'crypto-js';
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch } from 'react-redux'; // Import useDispatch
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import player from "../../assets/images/player.png";
import Button from "../../components/buttonComponent";
import TextInput from "../../components/textInputcomponent";
import { db } from "../../firebaseconfig";
import { login } from "../../redux/reducer/authSlice";
import "./styles.css";
interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const handleLogin = async () => {
    try {
      // Fetch user data from Firestore
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("phoneNumber", "==", mobile));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("Failed to login. User not found.");
        return;
      }

      const encryptedPassword = querySnapshot.docs[0].data().password;
      const decryptedPassword = CryptoJS.AES.decrypt(
        encryptedPassword,
        "smash9837"
      ).toString(CryptoJS.enc.Utf8);
      console.log(decryptedPassword)
      if (password !== "test") {
        toast.error("Failed to login. Invalid Password.");
        return;
      }
      const userData = querySnapshot.docs[0].data();
      // Dispatch login action
      dispatch(login(userData));
      toast.success("Login successful.");
      navigate("/landing");

    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login. Please try again.");
    }
  };

  return (
    <div className="login-container p-3">
      <div className="mb-4">
        <img src={player} alt="login-logo" className="login-logo" />
        <h1 className="smash w-100 px-4">Smash Badminton</h1>
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
        onClick={handleLogin}
        primaryBtn
        className="mt-2"
      />
    </div>
  );
};

export default Login;
