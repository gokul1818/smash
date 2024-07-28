import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import averageBadge from "../../assets/images/averageBadge.svg";
import beginnerBadge from "../../assets/images/beginerBadge.svg";
import dummyImg from "../../assets/images/dummyImg.svg";
import proBadge from "../../assets/images/proBadge.svg";
import Button from "../../components/buttonComponent";
import TextInput from "../../components/textInputcomponent";
import { utf8ToBase64 } from '../../helpers';
import { RootState } from '../../redux/store';
import "./styles.css";
import SubscriptionCard from "../../components/subscriptionCard";
const Profile: React.FC = () => {
  const [to, setTo] = useState('');
  const [editProfile, setEditProfile] = useState(true)
  const COLORS = ['#090335', "#1355D2"];
  const userData = useSelector((state: RootState) => state.auth.user);

  const getCurrentMonthDays = () => {
    const currentDate = new Date(); // Get current date object
    const currentMonth = currentDate.getMonth(); // Get current month (0-indexed)
    const currentYear = currentDate.getFullYear(); // Get current year
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    return lastDayOfMonth;
  };
  const duedata = [
    { name: 'Month', value: getCurrentMonthDays() - 5 },
    { name: 'Bill Due Date ', value: 5 }
  ];
  const sendSMS = () => {

    const encryptedPhoneNumber = utf8ToBase64(to)
    const appLink = `https://smash-sigma.vercel.app/add-user?phone=${encryptedPhoneNumber}`;
    const encodedAppLink = encodeURIComponent(appLink);
    const smsUri = `sms:${to}?body=${encodedAppLink}`;
    window.open(smsUri);
  };

  return (
    <div className="profile-container p-4 mb-5">
      <div className=' position-relative'>
        <img src={"pro" === "pro" ? proBadge : "average" === "average" ? averageBadge : beginnerBadge} alt="badge" />
        <img src={dummyImg} className='avaliable-profile-car-img' alt="img" />
      </div>
      <p className="profile-label fs-24 primarygrey-color mt-3">
        {userData?.name}
      </p>
      <div className=" d-flex  flex-column align-self-center  justify-content-center mt-3" style={{ width: "300px" }}>
        <div className="d-flex w-100 justify-content-between ">
          <p className="profile-label w-50 primarygrey-color">
            Name
          </p>
          {/* <p className=" w-50 fs-18 mb-0 ubuntu-regular primarygrey-color">
            ROCKYBOY
          </p> */}
          <div className="w-50">

            <TextInput
              type="text"
              onChange={() => { }}
              value={userData?.name}
              primary={false}
              disabled={editProfile}
              className="pb-3 "
              placeholder="Enter name"

            />
          </div>
        </div>

        <div className="d-flex w-100 justify-content-between ">
          <p className="profile-label  w-50 primarygrey-color">
            Phone No
          </p>
          <div className="w-50">

            <TextInput
              type="number"
              onChange={() => { }}
              value={userData?.phoneNumber}
              primary={false}
              className="pb-3 "
              disabled={true}

            />
          </div>
        </div>
        <div className="d-flex w-100 justify-content-between ">
          <p className="profile-label w-50 primarygrey-color">
            Blood Group
          </p>
          <div className="w-50">
            <TextInput
              type="text"
              onChange={() => { }}
              value={userData?.bloodGroup}

              primary={false}
              disabled={editProfile}
              className="pb-3 "
              placeholder="Enter Blood group"
            />
          </div>
        </div>
      </div>
      {/* <Button
        label={!editProfile ? "Update Profile" : "Edit Profile"}
        height="50px"
        width="300px"
        onClick={() => { setEditProfile(!editProfile) }}
        secondaryBtn={true}
        primaryBtn={false}
      /> */}
      {!userData?.isAdmin ?
        <SubscriptionCard />
        :
        <div className="add-new-user-admin my-4">
          <TextInput
            type="number"
            onChange={(e) => { setTo(e) }}
            value={to}
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
            onClick={() => sendSMS()} />
        </div>}


    </div>
  );
};

export default Profile;
