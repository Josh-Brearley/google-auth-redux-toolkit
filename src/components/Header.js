import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

// 568620157131-60adffddhdld8l3uhr106b15l93p3mhb.apps.googleusercontent.com

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        StreamCompany
      </Link>

      <div className="right menu">
        <Link to="/" className="item">
          All Streams
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
