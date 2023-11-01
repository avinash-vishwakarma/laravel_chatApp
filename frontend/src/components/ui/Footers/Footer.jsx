import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-nav-area" id="footerNav">
      <div className="container px-0">
        {/* <!-- Footer Content --> */}
        <div className="footer-nav position-relative footer-style-two">
          <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
            <li>
              <Link to="/">
                <i className="bi bi-house"></i>
              </Link>
            </li>

            <li className="active">
              <Link to="/chats">
                <i className="bi bi-chat-dots"></i>
              </Link>
            </li>

            <li>
              <Link to="/user-profile">
                <i className="bi bi-person-circle"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
