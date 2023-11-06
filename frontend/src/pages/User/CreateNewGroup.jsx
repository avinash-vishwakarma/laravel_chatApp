import React, { useEffect, useRef } from "react";
import TextInput from "../../components/ui/Form/TextInput";
import Button from "../../components/ui/Genral/Button";
import useSendRequest from "../../hooks/useSendRequest";
import SingleUserCard from "../../components/ui/Card/SingleUserCard";

const CreateNewGroup = () => {
  const nameInputRef = useRef();
  const searchInputRef = useRef();
  const [
    SearchUserRequest,
    SearchUserIsLoding,
    SearchUserResponse,
    SearchUserErrors,
  ] = useSendRequest();

  const createGroupClickHandler = () => {};

  const findUserSubmitHandler = (e) => {
    e.preventDefault();
    SearchUserRequest({
      url: `/api/find-user?search=${searchInputRef.current.value}`,
      method: "get",
    });
  };

  const userSelectHandler = (user) => {
    console.log(user);
  };

  useEffect(() => {
    console.log(SearchUserResponse);
  }, [SearchUserResponse]);

  return (
    <div className="container">
      <div className="card mb-2">
        <div className="card-body">
          <div className="form-group text-start mb-3">
            <label className="form-label">Enter Group Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter Group Name"
              ref={nameInputRef}
            />
          </div>
        </div>
      </div>

      <div className="card mb-2">
        <div className="card-body">
          <div className="element-heading">
            <h6 className="ps-1">Add User To group</h6>
          </div>

          <div className="chat-search-box mb-4">
            {/* <!-- Search Form --> */}
            <form onSubmit={findUserSubmitHandler}>
              <div className="input-group">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search users"
                  aria-describedby="searchbox"
                  name="search"
                  ref={searchInputRef}
                />
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>

          <div className="element-heading">
            <h6 className="ps-1">Search Result</h6>
          </div>

          {SearchUserIsLoding && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          <div style={{ maxHeight: "40vh", overflowY: "scroll" }}>
            <div className="ps-0 chat-user-list">
              {SearchUserResponse?.data?.map((user) => {
                return (
                  <SingleUserCard
                    key={user.id}
                    {...user}
                    onChatSelect={userSelectHandler.bind(null, user)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Button
        type="button"
        btnType="primary"
        btnclassName="w-100"
        onClick={createGroupClickHandler}
      >
        Create Group
      </Button>
    </div>
  );
};

export default CreateNewGroup;
