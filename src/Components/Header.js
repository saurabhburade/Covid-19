import React, { Component, Fragment } from 'react'
import { TiThListOutline } from "react-icons/ti";
import covidIcon from "./Images/06.svg";
import { Link } from 'react-router-dom';
import { MdViewList } from "react-icons/md";
import { GiDrippingTube } from "react-icons/gi";
import { FiInfo } from "react-icons/fi";
class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
          <Fragment>
            <div className="dash-menu-container">
              <div className="menu-item-covid">
                {/* < className="covid-icon" /> */}
                <img className="covid-icon" src={covidIcon} alt="covid" />
              </div>
              <div className="menu-right-cont">
                {/* <div className="menu-item"> */}
                <Link
                  className="menu-item" 
                  // style={window.location.pathname === "/dashboard"?`${background}:black`:""}
                  to={"/dashboard"}
                >
                  <TiThListOutline className="menu-icon" />{" "}
                  <span>Dashboard</span>
                </Link>
                {/* </div> */}
                <Link className="menu-item" to={"/districtwise"}>
                  <MdViewList className="menu-icon" /> <span>Districtwise</span>
                </Link>
                <Link className="menu-item" to={"/testdata"}>
                  <GiDrippingTube className="menu-icon" />{" "}
                  <span>Test-Data</span>
                </Link>
                <Link className="menu-item" to={"/district"}>
                  <FiInfo className="menu-icon" /> <span>About</span>
                </Link>
              </div>
            </div>
          </Fragment>
        );
    }
}

export default Header
