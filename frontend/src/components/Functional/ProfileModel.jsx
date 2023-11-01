import React, { useState } from "react";
import Modal from "../ui/Modal";
import { useDispatch, useSelector } from "react-redux";
import CropImageContainer from "./CropImageContainer";
import axios from "axios";
import { setUserDetails } from "../../app/stateSlice/authStateSlice";

const ProfileModel = ({ onCloseHandler }) => {
  const [profileImage, setProfileImage] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);
  const userImage = useSelector((store) => store.auth.user.details?.image);
  const [cropper, setCropper] = useState(null);
  const dispatch = useDispatch();

  const profileInputHandler = (e) => {
    const uploadImageFile = e.target.files[0];
    setUploadImage(uploadImageFile);
  };

  const cropImageHandler = () => {
    console.log("Image Cropping...");
    cropper.getCroppedCanvas().toBlob((blob) => {
      const croppedFormData = new FormData();
      croppedFormData.append("image", blob);
      axios.postForm("/api/user?image=1", croppedFormData).then((response) => {
        // close the model
        onCloseHandler();
        // update the details in store auth
        dispatch(setUserDetails(response.data));
      });
    });
  };

  const OptionsButtons = (
    <>
      <button
        className="btn btn-primary w-100 mb-4"
        onClick={setProfileImage.bind(null, true)}
      >
        Show Profile Image
      </button>
      <label htmlFor="user-profile-input" className="btn btn-success w-100">
        Update Profile Image
      </label>
      <input
        type="file"
        id="user-profile-input"
        className="d-none"
        onChange={profileInputHandler}
      />
    </>
  );

  const UserProfileImage = (
    <img
      className="w-100"
      src={`${
        import.meta.env.VITE_REACT_APP_API_BASE_URL
      }/images/user-profile-images/${userImage || "place-holder-image.jpg"}`}
    />
  );

  return (
    <>
      <Modal.Header onCloseHandler={onCloseHandler}>
        Profile Image Options
      </Modal.Header>
      <Modal.Body>
        {!uploadImage && (profileImage ? UserProfileImage : OptionsButtons)}
        {uploadImage && (
          <CropImageContainer setCropper={setCropper} imageFile={uploadImage} />
        )}
      </Modal.Body>
      {uploadImage && (
        <Modal.Footer>
          <button className="btn btn-danger" onClick={onCloseHandler}>
            Cancle
          </button>
          <button className="btn btn-success" onClick={cropImageHandler}>
            Crop & Upload
          </button>
        </Modal.Footer>
      )}
    </>
  );
};

export default ProfileModel;
