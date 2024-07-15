import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttonComponent";

interface LandingProps {
  hideNavBar?: boolean;
}

const Landing: React.FC<LandingProps> = ({ hideNavBar }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/home");
  };

  return (
    <div className="text-center min-h-screen flex flex-col justify-center items-center bg-gray-100">
      {!hideNavBar && (
        <header className="bg-blue-500 p-6 w-full text-center">
          <h1 className="text-4xl font-bold text-black">
            Welcome to Smash Badminton Login
          </h1>
        </header>
      )}

      <Button
        label="Go to Landing Page"
        onClick={handleNavigate}
        className="mt-4 bg-gray-100"
      />
    </div>
  );
};

export default Landing;
