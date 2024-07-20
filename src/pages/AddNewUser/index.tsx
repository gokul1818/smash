import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttonComponent";
import "./styles.css"
import TextInput from "../../components/textInputcomponent";
interface AddNewUserProps {
}

const AddNewUser: React.FC<AddNewUserProps> = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/home");
  };

  return (
    <div className="landing-container p-3">
      <div className="add-new-user-admin ">
        <TextInput
          type="number"
          onChange={(e) => { }}
          // value={to}
          placeholder="Enter Phone Number"
          className=" "
          inputLabel="Phone Number"
        />

        <Button
          label="Send SMS"
          height="50px"
          width="100px"
          className="mt-3 "
          secondaryBtn={true}
          primaryBtn={false}
          onClick={() => { }} />
      </div>
    </div>
  );
};

export default AddNewUser;
