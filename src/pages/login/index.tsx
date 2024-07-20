import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttonComponent";
import TextInput from "../../components/textInputcomponent";
import player from "../../assets/images/player.png";
import "./styles.css";
interface LoginProps {
}

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleNavigate = () => {
    navigate("/landing");
  };

  return (
    <div className="login-container p-3 ">
      <div className="mb-4">
        <img src={player} alt="login-logo" className="login-logo" />
        <h1 className="smash w-100 px-4 ">Smash Badminton</h1>
      </div>
      <div className="w-100 px-3">
        <TextInput
          type="phone"
          value={mobile}
          inputLabel="phone number"
          onChange={setMobile}
          placeholder="Enter your mobile number"
          className="mb-2 "
        />
        <TextInput
          type="password"
          value={password}
          inputLabel="password"
          onChange={setPassword}
          placeholder="Enter your password"
          className="mb-2 "
        />
      </div>
      <Button
        label="Login"
        onClick={handleNavigate}
        primaryBtn
        className={"mt-2"}

      />
    </div>
  );
};

export default Login;
