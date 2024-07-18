import React from "react";
import beginnerBadge from "../../assets/images/beginerBadge.svg";
import streaks from "../../assets/images/streaksGrp.svg";
import "./styles.css";

import Button from "../../components/buttonComponent";

const Profile: React.FC = () => {
  return (
    <div className="profile-container p-4">

      <div className="align-self-center w-50 justify-content-center">
        <div className="d-flex justify-content-between ">
          <p className="profile-label primarygrey-color">
            Name 
          </p>
          <p className="profile-label primarygrey-color">
            Ben Ten
          </p>
        </div>
        <div className="d-flex justify-content-between ">
          <p className="profile-label primarygrey-color">
            Name 
          </p>
          <p className="profile-label primarygrey-color">
            Ben Ten
          </p>
        </div>
        <div className="d-flex justify-content-between ">
          <p className="profile-label primarygrey-color">
            Name 
          </p>
          <p className="profile-label primarygrey-color">
            Ben Ten
          </p>
        </div>
      </div>
      <div className="align-self-center mt-10">
        <Button
          label="Edit Profile"
          // onClick={handleNavigate}
          height="50px"
          width="300px"
          secondaryBtn={true}
          primaryBtn={false}
        />
      </div>
    </div>
  );
};

export default Profile;
