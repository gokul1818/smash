import React, { useState } from "react";

// redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// firebase 
import { doc, updateDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { db, storage } from "../../firebaseconfig";

// components
import Button from "../../components/buttonComponent";
import ModalComponent from "../../components/modal";
import SubscriptionCard from "../../components/subscriptionCard";
import TextInput from "../../components/textInputcomponent";
import UploadDocumentField from "../../components/uploadField";

// helpers
import { utf8ToBase64 } from "../../helpers";

// images
import averageBadge from "../../assets/images/averageBadge.svg";
import beginnerBadge from "../../assets/images/beginerBadge.svg";
import dummyImg from "../../assets/images/dummyImg.svg";
import edit from "../../assets/images/edit.png";
import proBadge from "../../assets/images/proBadge.svg";

// styles
import "./styles.css";

// default values
const COLORS = ["#090335", "#1355D2"];

const Profile: React.FC = () => {
  // selector
  const userData = useSelector((state: RootState) => state.auth.user);
  // states
  const [to, setTo] = useState("");
  const [editProfile, setEditProfile] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  // -------------------- FUNCTIONALITIES -------------------- //
  const getCurrentMonthDays = () => {
    const currentDate = new Date(); // Get current date object
    const currentMonth = currentDate.getMonth(); // Get current month (0-indexed)
    const currentYear = currentDate.getFullYear(); // Get current year
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    return lastDayOfMonth;
  };

  const sendSMS = () => {
    const encryptedPhoneNumber = utf8ToBase64(to);
    const appLink = `https://smash-sigma.vercel.app/add-user?phone=${encryptedPhoneNumber}`;
    const encodedAppLink = encodeURIComponent(appLink);
    const smsUri = `sms:${to}?body=${encodedAppLink}`;
    window.open(smsUri);
  };

  const updateUserReady = async () => {
    const userDocRef = doc(db, "users", userData?.userId);

    try {
      await updateDoc(userDocRef, {
        profilePic: "",
      });
    } catch (error) {
      console.error("Error updating user readiness:", error);
    }
  };

  const duedata = [
    { name: "Month", value: getCurrentMonthDays() - 5 },
    { name: "Bill Due Date ", value: 5 },
  ];

  const handleUpdate = async () => {
    if (selectedFile) {
      setIsLoading(true);
      try {
        // Create a storage reference
        const storageRef = ref(storage, `uploads/${selectedFile.name}`);
        
        // Upload the file
        const snapshot = await uploadBytes(storageRef, selectedFile);

        // Get the download URL
        const url = await getDownloadURL(snapshot.ref);
        setDownloadURL(url);

        // Update the user profile picture URL in Firestore
        const userDocRef = doc(db, "users", userData?.userId);
        await updateDoc(userDocRef, { profilePic: url });

        setIsLoading(false);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error uploading file: ", error);
        setIsLoading(false);
      }
    }
  };

  const handleFileSelect = () => {};
  // -------------------- RENDER UI -------------------- //
  return (
    <div className="profile-container p-4 mb-5">
      <div className=" position-relative">
        <img
          src={
            "pro" === "pro"
              ? proBadge
              : "average" === "average"
              ? averageBadge
              : beginnerBadge
          }
          alt="badge"
        />
        <img src={dummyImg} className="avaliable-profile-car-img" alt="img" />
      </div>
      <img
        src={edit}
        alt="edit"
        className="edit"
        onClick={() => setIsModalOpen(true)}
      />
      <p className="profile-label fs-24 primarygrey-color mt-3">
        {userData?.name}
      </p>
      <div
        className=" d-flex  flex-column align-self-center  justify-content-center mt-3"
        style={{ width: "300px" }}
      >
        <div className="d-flex w-100 justify-content-between ">
          <p className="profile-label w-50 primarygrey-color">Name</p>
          <div className="w-50">
            <TextInput
              type="text"
              onChange={() => {}}
              value={userData?.name}
              primary={false}
              disabled={editProfile}
              className="pb-3 "
              placeholder="Enter name"
            />
          </div>
        </div>

        <div className="d-flex w-100 justify-content-between ">
          <p className="profile-label  w-50 primarygrey-color">Phone No</p>
          <div className="w-50">
            <TextInput
              type="number"
              onChange={() => {}}
              value={userData?.phoneNumber}
              primary={false}
              className="pb-3 "
              disabled={true}
            />
          </div>
        </div>
        <div className="d-flex w-100 justify-content-between ">
          <p className="profile-label w-50 primarygrey-color">Blood Group</p>
          <div className="w-50">
            <TextInput
              type="text"
              onChange={() => {}}
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
      {!userData?.isAdmin ? (
        <SubscriptionCard />
      ) : (
        <div className="add-new-user-admin my-4">
          <TextInput
            type="number"
            onChange={(e) => {
              setTo(e);
            }}
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
            onClick={() => sendSMS()}
          />
        </div>
      )}
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        modalTitle="Upload New Image"
      >
        <UploadDocumentField
          onFileSelect={handleFileSelect}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
        <Button
          label="Update"
          height="50px"
          width="90%"
          className="mt-3 "
          secondaryBtn={true}
          primaryBtn={false}
          onClick={() => handleUpdate()}
        />
      </ModalComponent>
    </div>
  );
};

export default Profile;
