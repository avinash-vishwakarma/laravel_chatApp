import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TextInput from "../../components/ui/Form/TextInput";
import TextArea from "../../components/ui/Form/TextArea";
import useSendRequest from "../../hooks/useSendRequest";
import Button from "../../components/ui/Genral/Button";
import Alert from "../../components/ui/Form/Alert";
import Modal from "../../components/ui/Modal";
import ProfileModel from "../../components/Functional/ProfileModel";

const Profile = () => {
  const user = useSelector((store) => store.auth.user);
  const [request, isLoading, response, error] = useSendRequest();
  const [showModel, setShowModel] = useState(false);

  const updateDetailsSubmitHandler = async (e) => {
    e.preventDefault();
    const updateFromData = new FormData(e.target);

    request({
      url: "api/user",
      method: "post",
      data: updateFromData,
      headers: {
        "Content-Type": "multipart/formdata",
      },
    });
  };

  const profileChangeHandler = () => {
    setShowModel(true);
  };

  // const selectOptions = [
  //   { value: "male", label: "Male" },
  //   { value: "female", label: "Female" },
  //   { value: "none", label: "Rather Not Tell" },
  // ];

  useEffect(() => {
    console.log(response);
  }, [response]);

  return (
    <div className="container">
      {/* <!-- User Information--> */}
      <div className="card user-info-card mb-3">
        <div className="card-body d-flex align-items-center">
          <div
            className="user-profile me-3 position-relative"
            onClick={profileChangeHandler}
          >
            <img
              src={`http://127.0.0.1:8000/images/user-profile-images/${
                user.details?.image
                  ? user.details?.image
                  : "place-holder-image.jpg"
              }`}
              alt=""
            />
            <i className="bi bi-pencil-fill text-primary" />
          </div>
          <Modal
            show={showModel}
            onCloseHandler={setShowModel.bind(null, false)}
          >
            <ProfileModel onCloseHandler={setShowModel.bind(null, false)} />
          </Modal>

          <div className="user-info">
            <div className="d-flex align-items-center">
              <h5 className="mb-1">{user.name}</h5>
              <span className="badge bg-success ms-2 rounded-pill">Online</span>
            </div>
            <p className="mb-0">{user.email}</p>
          </div>
        </div>
      </div>

      {/* <!-- User Meta Data--> */}
      <div className="card user-data-card">
        <div className="card-body">
          {/* <Model show /> */}

          <Alert error={error} success={response?.data?.message} />

          <form onSubmit={updateDetailsSubmitHandler}>
            <TextArea
              name="bio"
              placeholder="Express Yourself so that the world can see who you are"
              title="Bio"
              value={user.details?.bio}
            />

            <TextInput
              name="name"
              placeholder="User Name"
              title="Full Name"
              value={user.name}
            />

            <Button
              isLoading={isLoading}
              btnclassName="w-100"
              btnType="success"
              type="submit"
            >
              Update details
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
