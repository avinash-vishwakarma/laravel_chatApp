import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import BackDrop from "../BackDrop";
import NavSliderLink from "./NavSliderLink";
import { useSelector } from "react-redux";
import MyImage from "../../../pages/Avinashvishwakarma.png";

// Helpers

const NavSlider = ({ showSlider, closeSlider }) => {
  const [sliderClass, setSliderClass] = useState("");

  const auth = useSelector((store) => store.auth);

  useEffect(() => {
    if (showSlider) {
      setSliderClass("showing");
      setTimeout(() => {
        setSliderClass("show");
      }, 300);
    } else {
      if (sliderClass === "") return;
      setSliderClass("hiding");
      setTimeout(() => {
        setSliderClass("");
      }, 300);
    }
  }, [showSlider]);

  return (
    <>
      <div
        className={`offcanvas offcanvas-start ${sliderClass}`}
        id="affanOffcanvas"
        data-bs-scroll="true"
        aria-labelledby="affanOffcanvsLabel"
      >
        <button
          className="btn-close btn-close-white text-reset"
          type="button"
          onClick={closeSlider}
        ></button>

        <div className="offcanvas-body p-0">
          <div className="sidenav-wrapper">
            {/* <!-- Sidenav Profile --> */}
            <div className="sidenav-profile bg-gradient">
              <div className="sidenav-style1"></div>

              {/* <!-- User Thumbnail --> */}
              <div className="user-profile">
                <img src={MyImage} alt="" />
              </div>

              {/* <!-- User Info --> */}
              <div className="user-info">
                <h6 className="user-name mb-0">Avinash Vishwakarma</h6>
                <span>Full Stack Developer</span>
              </div>
            </div>

            {/* <!-- Sidenav Nav --> */}
            <ul className="sidenav-nav ps-0">
              <NavSliderLink to="/" icon="bi bi-house" text="Homes" />

              {!auth.isLogin && (
                <NavSliderLink
                  to="/login"
                  icon="bi bi-box-arrow-in-right"
                  text="Login"
                />
              )}
              {!auth.isLogin && (
                <NavSliderLink
                  to="/register"
                  icon="bi bi-box-arrow-in-right"
                  text="Register"
                />
              )}

              {auth.isLogin && (
                <>
                  <NavSliderLink
                    to="/chats"
                    icon="bi bi-chat-left-text-fill"
                    text="Chats"
                  />

                  <NavSliderLink
                    to="/logout"
                    icon="bi bi-box-arrow-in-left"
                    text="logout"
                  />
                </>
              )}
            </ul>
            {/* <!-- Copyright Info --> */}
            <div className="copyright-info">
              <p>
                <span id="copyrightYear"></span>
                &copy; Made by <a href="#">Avinash Vishwakarma</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <BackDrop showBackDrop={showSlider} onBackDropClick={closeSlider} />
    </>
  );
};

export default NavSlider;
