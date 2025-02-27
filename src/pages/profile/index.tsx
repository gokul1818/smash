import imageCompression from "browser-image-compression";
import React, { useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// firebase 
import { doc, updateDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "@firebase/storage"; import { db, storage } from "../../firebaseconfig";

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
import edit from "../../assets/images/edit.png";
import proBadge from "../../assets/images/proBadge.svg";
import dummyImg from "../../assets/images/dummyImg.svg";
// styles
import { login } from "../../redux/reducer/authSlice";
import "./styles.css";

// default values

const Profile: React.FC = () => {
  // selector
  const userData = useSelector((state: RootState) => state.auth.user);
  // states
  const dispatch = useDispatch()
  const [to, setTo] = useState("");
  const [editProfile, setEditProfile] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // -------------------- FUNCTIONALITIES -------------------- //


  const sendSMS = () => {
    const encryptedPhoneNumber = utf8ToBase64(to);
    const appLink = `https://smashbadminton.vercel.app/add-user?phone=${encryptedPhoneNumber}`;
    const encodedAppLink = encodeURIComponent(appLink);
    const smsUri = `sms:${to}?body=${encodedAppLink}`;
    window.open(smsUri);
  };

  interface FirebaseError extends Error {
    code: string;
  }

  const handleUpdate = async () => {
    if (selectedFile) {
      setIsLoading(true);
      try {
        // Get a reference to the user's document
        const userDocRef = doc(db, "users", userData?.userId);

       

        // Get the current profile picture URL
        const oldProfilePicUrl = userData?.profilePic;

        // If there's an old profile picture, delete it
        if (oldProfilePicUrl) {
          const oldProfilePicRef = ref(storage, oldProfilePicUrl);
          try {
            await deleteObject(oldProfilePicRef);
          } catch (error) {
            const deleteError = error as FirebaseError; // Type assertion
            // Handle cases where the object does not exist or other errors
            if (deleteError.code === 'storage/object-not-found') {
              console.warn("Old profile picture does not exist, skipping delete.");
            } else {
              console.error("Error deleting old profile picture: ", deleteError);
            }
          }
        }

        // Create a storage reference for the new file using the user's name
        const newProfilePicRef = ref(storage, `uploads/${userData?.name}.jpg`); // Adjust the file name and format as needed

        // Upload the new file
        const snapshot = await uploadBytes(newProfilePicRef, selectedFile);

        // Get the download URL of the new file
        const url = await getDownloadURL(snapshot.ref);

        // Update the user's profile picture URL in Firestore
        await updateDoc(userDocRef, { profilePic: url });

        // Update the Redux state with the new profile picture URL
        dispatch(login({ ...userData, profilePic: url }));

        // Reset loading state and close the modal
        setIsLoading(false);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error uploading file: ", error);
        setIsLoading(false);
      }
    }
  };

  const handleFileSelect = async (file: File) => {
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        setSelectedFile(compressedFile);
      } catch (error) {
        console.error("Error compressing file: ", error);
      }
    }
  };

  // -------------------- RENDER UI -------------------- //
  return (
    <div className="profile-container p-4 mb-5">
      <div className=" position-relative">
        <img
          src={
            userData?.level === "Pro"
              ? proBadge
              : userData?.level === "Average"
                ? averageBadge
                : beginnerBadge
          }
          alt="badge"
        />
        <img src={userData?.profilePic|| dummyImg} className="avaliable-profile-car-img" alt="img" />
        <img
          src={edit}
          alt="edit"
          className="profile-edit-icon"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <p className="profile-label fs-24 primarygrey-color audiowide-regular mt-3">
        {userData?.name}
      </p>
      <div
        className=" d-flex  flex-column align-self-center  justify-content-center mt-3"
        style={{ width: "300px" }}
      >
        <div className="d-flex w-100 justify-content-between align-items-center m-0">
          <p className="profile-label w-50 primarygrey-color">Name</p>
          <div className="w-50">
            <TextInput
              type="text"
              onChange={() => { }}
              value={userData?.name}
              primary={false}
              disabled={editProfile}
              className="pb-3"
              placeholder="Enter name"
            />
          </div>
        </div>

        <div className="d-flex w-100 justify-content-between align-items-center m-0">
          <p className="profile-label  w-50 primarygrey-color">Phone No</p>
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
        <div className="d-flex w-100 justify-content-between align-items-center m-0">
          <p className="profile-label w-50 primarygrey-color">Blood Group</p>
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
      {!userData?.isAdmin ? (
        <SubscriptionCard />
      ) : (
        <div className="add-new-user-admin my-4">
          <p className="profile-label w-100  text-center black-color">Add New User </p>

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
          loading={isLoading}
        />
      </ModalComponent>
    </div>
  );
};

export default Profile;
