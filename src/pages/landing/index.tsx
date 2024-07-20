import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttonComponent";
import "./styles.css"
interface LandingProps {
}

const Landing: React.FC<LandingProps> = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/home");
  };

  return (
    <div className="landing-container p-3">
      <Button
        label="Start Match"
        onClick={handleNavigate}
        className=""
        primaryBtn
      />
      <p className="or-text">
        OR
      </p>
      <Button
        label="Just Login"
        onClick={handleNavigate}
        className=""
        primaryBtn
      />
    </div>
  );
};

export default Landing;
