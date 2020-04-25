import React, { Component, Fragment } from 'react'
import { TiThListOutline } from "react-icons/ti";
import covidIcon from "./Images/06.svg";
import { Link } from 'react-router-dom';
import { MdViewList } from "react-icons/md";
import { GiDrippingTube } from "react-icons/gi";
import { FiInfo } from "react-icons/fi";
class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: "",
    };
  }
  setDashboardActive = () => {
    this.setState({
      active: "dashboard",
    });
  };
  setDistrictwiseActive = () => {
    this.setState({
      active: "districtwise",
    });
  };
  setTestDataActive = () => {
    this.setState({
      active: "testdata",
    });
  };
  setAboutActive = () => {
    this.setState({
      active: "about",
    });
  };
  setHomeActive=()=>{
    this.setState({
      active: "",
    });
  }
  render() {
    return (
      <Fragment>
        <div className="dash-menu-container">
          <Link
            to={"/"}
            className="menu-item-covid"
            onClick={this.setHomeActive}
          >
            {/* < className="covid-icon" /> */}
            <img className="covid-icon" src={covidIcon} alt="covid" />
            <p className="logo-name">COVID-19</p>
          </Link>
          <div className="menu-right-cont">
            {/* <div className="menu-item"> */}
            <Link
              onClick={this.setDashboardActive}
              className="menu-item"
              // style={active}
              style={
                this.state.active === "dashboard"
                  ? { background: "#f5f3f2" }
                  : {}
              }
              to={"/dashboard"}
            >
              <TiThListOutline className="menu-icon" /> <span>Dashboard</span>
            </Link>
            {/* </div> */}
            <Link
              className="menu-item"
              style={
                this.state.active === "districtwise"
                  ? { background: "#f5f3f2" }
                  : {}
              }
              onClick={this.setDistrictwiseActive}
              to={"/districtwise"}
            >
              <MdViewList className="menu-icon" /> <span>Districtwise</span>
            </Link>
            <Link
              className="menu-item"
              style={
                this.state.active === "testdata"
                  ? { background: "#f5f3f2" }
                  : {}
              }
              onClick={this.setTestDataActive}
              to={"/testdata"}
            >
              <GiDrippingTube className="menu-icon" /> <span>Test-Data</span>
            </Link>
            <Link
              className="menu-item"
              style={
                this.state.active === "about" ? { background: "#f5f3f2" } : {}
              }
              onClick={this.setAboutActive}
              to={"/about"}
            >
              <FiInfo className="menu-icon" /> <span>About</span>
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Header
