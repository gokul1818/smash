import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttonComponent";
import TextInput from "../../components/textInputcomponent";
import player from "../../assets/images/player.png";
import "./styles.css";
interface LoginProps {
  hideNavBar?: boolean;
}

const Login: React.FC<LoginProps> = ({ hideNavBar }) => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleNavigate = () => {
    navigate("/landing");
  };

  return (
    <div className="text-center min-h-screen flex flex-col justify-center items-center bg-red">
      {!hideNavBar && (
        <header className="bg-blue-500 p-6 w-full text-center">
          <img src={player} alt="login-logo" className="login-logo" />
          <h1 className="smash">Smash Badminton</h1>
        </header>
      )}

      <div className="mt-8 w-full max-w-md">
        <TextInput
          type="phone"
          value={mobile}
          onChange={setMobile}
          placeholder="Enter your mobile number"
          className="mb-4 w-full"
        />
        <TextInput
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          className="mb-4 w-full"
        />
      </div>
      <Button
        label="Login"
        onClick={handleNavigate}
        className="mt-4"
        height="40px"
        width="120px"
      />
    </div>
  );
};

export default Login;
