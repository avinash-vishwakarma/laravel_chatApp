import axios from "axios";
import React, { useRef, useState } from "react";
import SingleUserCard from "../../components/ui/Card/SingleUserCard";
import { useNavigate } from "react-router-dom";

const FindUser = () => {
  const inputRef = useRef();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const userSubmitHandler = async (e) => {
    e.preventDefault();

    const inputValue = inputRef.current.value;
    try {
      const response = await axios.get(`/api/find-user?search=${inputValue}`);
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onChatSelect = async (id) => {
    // send a creat new chat
    const chatFormData = new FormData();
    chatFormData.append("users", id);
    chatFormData.append("type", "single");
    const { data } = await axios.postForm("/api/create", chatFormData);
    navigate(`/chat/${data.conversation_id}`, {
      replace: true,
    });
  };

  return (
    <div className="container">
      <div className="card mb-2">
        <div className="card-body p-2">
          <div className="chat-search-box">
            {/* <!-- Search Form --> */}
            <form onSubmit={userSubmitHandler}>
              <div className="input-group">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search users"
                  aria-describedby="searchbox"
                  name="search"
                  ref={inputRef}
                />
                <button type="submit" className="btn btn-primary">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="element-heading">
        <h6 className="ps-1">Search Result</h6>
      </div>

      <div className="ps-0 chat-user-list">
        {users.map((user) => (
          <SingleUserCard key={user.id} {...user} onChatSelect={onChatSelect} />
        ))}
      </div>
    </div>
  );
};

export default FindUser;
