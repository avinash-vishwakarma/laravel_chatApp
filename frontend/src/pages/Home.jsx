import React from "react";
import MyImage from "./Avinashvishwakarma.png";
const Home = () => {
  return (
    <>
      <div className="container">
        <div className="card card-round mb-4">
          <div className="card-body d-flex align-items-center direction-rtl">
            <div className="card-img-wrap">
              <img src={MyImage} alt="" />
            </div>
            <div className="card-content">
              <h5 className="mb-3">
                Application Developed By Avinash Vishwakarma
              </h5>
              <a
                className="btn btn-info rounded-pill"
                href="https://github.com/avinash-vishwakarma"
              >
                <i className="bi bi-github mx-2"></i>Git Hub
              </a>
            </div>
          </div>
        </div>

        <div
          className="card bg-primary bg-img"
          style={{ backgroundImage: "url('img/core-img/2.png')" }}
        >
          <div className="card-body p-5 direction-rtl">
            <i className="bi bi-chat-right-dots-fill text-white mb-3 display-2"></i>
            <h2 className="text-white">Welcome To Laravel Chat app</h2>
            <p className="text-white mb-0">
              This Chat app utilizes Laravel , React js , Websockets .
              <p className="text-white mb-0">
                To make a seamless communication{" "}
              </p>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
