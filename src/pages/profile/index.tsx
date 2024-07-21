import * as CryptoJS from 'crypto-js';
import React, { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import averageBadge from "../../assets/images/averageBadge.svg";
import beginnerBadge from "../../assets/images/beginerBadge.svg";
import dummyImg from "../../assets/images/dummyImg.svg";
import proBadge from "../../assets/images/proBadge.svg";
import Button from "../../components/buttonComponent";
import TextInput from "../../components/textInputcomponent";
import "./styles.css";
const Profile: React.FC = () => {
  const [to, setTo] = useState('');
  const COLORS = ['#090335', "#1355D2"];
  const getCurrentMonthDays = () => {
    const currentDate = new Date(); // Get current date object
    const currentMonth = currentDate.getMonth(); // Get current month (0-indexed)
    const currentYear = currentDate.getFullYear(); // Get current year

    // Set date to 0 of next month to get the last day of the current month
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    return lastDayOfMonth;
  };
  const duedata = [
    { name: 'Month', value: getCurrentMonthDays() - 5 },
    { name: 'Bill Due Date ', value: 5 }
  ];
  const sendSMS = () => {

    const encryptedPhoneNumber = CryptoJS.AES.encrypt(JSON.stringify(to), "smash9837").toString();
    // const appLink = `https://smash-badminton-ts.vercel.app/add-user?phone=${encryptedPhoneNumber}`;
    const appLink = `https://3d74-2405-201-e020-d999-b0ff-c70b-87ed-f353.ngrok-free.app/add-user?phone=${encryptedPhoneNumber}`;
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
        ROCKYBOY
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
              value={"RockyBoy"}
              primary={false}
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
              value={"878783333"}
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
              value={"o+ve"}
              primary={false}
              className="pb-3 "
              placeholder="Enter Blood group"
            />
          </div>
        </div>
      </div>
      <Button
        label="Edit Profile"
        height="50px"
        width="300px"
        secondaryBtn={true}
        primaryBtn={false}
      />
      <div className="subscription-card-conatiner my-5 text-center ">
        <p className='akaya-style black-color text-center fs-24 mb-0'>
          subscription
        </p>
        <div className='d-flex flex-wrap text-center align-tems-center justify-content-center'>
          <p className='ubuntu-medium black-color text-center  mb-0 '>
            You have played a total
          </p>
          <p className='mb-0 ms-1 dark-blue  ubuntu-bold'>
            24 match
          </p>
          <p className='ubuntu-medium black-color  mb-0  '>
            this month!
          </p>
        </div>
        <ResponsiveContainer width={100} height={100}>
          <PieChart width={100} height={100}>
            <Pie
              data={duedata}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={50}
              innerRadius={40}
              fill="#8884d8"
              label
            >
              {duedata.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className='d-flex subscription-card-date align-items-center'>
          <p className='audiowide-regular black-color fs-24 mb-0  '>
            5
          </p>
          <p className='audiowide-regular E4-black-color  mb-0  '>
            /31
          </p>
        </div>
      </div>
      <div className="add-new-user-admin ">
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
      </div>


    </div>
  );
};

export default Profile;
