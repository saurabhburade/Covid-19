import React, { useState } from "react";
import "./about.css";
import "./mapchart.css";
import about from "./Images/Artboard_1.svg";
import { FiGithub } from "react-icons/fi";
import { FaLinkedin, FaInstagram, FaFacebookF } from "react-icons/fa";

// import MapChart from "./MapChart";
// import ReactTooltip from "react-tooltip";
// import StateMapChart from "./StateMapChart";

function About() {


  return (
    <div className="about-cont">

      <div className="credentials-cont">
        <div className="author-card">
          <div>
            <p className="dev-by">Developed by</p>
            <p className="author-name">Saurabh Burade</p>
          </div>
          <div className="author-links">
            <a href="https://github.com/saurabhburade">
              <span className="auth-social-icon">
                <FiGithub />{" "}
              </span>
            </a>
            <a href="https://www.linkedin.com/in/saurabh-burade-8371ab182/">
              <span className="auth-social-icon">
                <FaLinkedin />{" "}
              </span>
            </a>{" "}
            <a href="https://www.instagram.com/saurabh_burade/">
              <span className="auth-social-icon">
                <FaInstagram />{" "}
              </span>
            </a>{" "}
            <a href="https://www.facebook.com/princesaurabh121">
              <span className="auth-social-icon">
                <FaFacebookF />
              </span>
            </a>
          </div>
        </div>
        <div className="author-card">
          <div>
            <p className="dev-by">API by</p>
            <p className="author-name">Covid19 India</p>
          </div>
          <div className="author-links">
            <a
              className="git-project-link"
              href="https://github.com/covid19india/covid19india-react"
            >
              <span>
                {" "}
                <FiGithub />
              </span>{" "}
              <span>Github Project</span>
            </a>
          </div>
        </div>
      </div>
      <div className="about-image-cont">
        <img src={about} alt="aa" className="about-img" />
      </div>
    </div>
    // <div className="map-chart">
    //   <StateMapChart />
    // </div>
  );
}

export default About;
