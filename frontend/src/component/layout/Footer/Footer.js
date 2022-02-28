import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>Download this App</h4>
        <p>Download our app and PlayStore</p>
        <img src={playStore} />
        <img src={appStore} />
      </div>
      <div className="midFooter">
        <h1>BUDSTORE</h1>
        <p>We Deliver the best Products</p>
        <p>Copyrights 2020 &copy; BudStore </p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="#">Instagram</a>
        <a href="#">Youtube</a>
        <a href="#">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
