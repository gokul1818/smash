import React from "react";
import "./styles.css";
import averageBadge from "../../assets/images/averageBadge.svg";
import beginnerBadge from "../../assets/images/beginerBadge.svg";
import Button from "../../components/buttonComponent";
import proBadge from "../../assets/images/proBadge.svg";
import dummyImg from "../../assets/images/dummyImg.svg";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import TextInput from "../../components/textInputcomponent";
const Profile: React.FC = () => {
  const COLORS = ['#090335', "#1355D2"];;
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
    const phoneNumber = encodeURIComponent(973733363);
    const messageBody = encodeURIComponent("dgg");

    // Construct the SMS URI
    const smsUri = `sms:${phoneNumber}?body=${messageBody}`;

    // Open default SMS app
    window.open(smsUri);
  };

  return (
    <div className="profile-container p-4">
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
            />
          </div>
        </div>
      </div>
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
            {/* <Legend /> */}
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

      <Button
        label="Send SMS"
        height="50px"
        width="300px"
        secondaryBtn={true}
        primaryBtn={false}
        onClick={() => sendSMS()} />

      <div className="profile-btn-container">
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
