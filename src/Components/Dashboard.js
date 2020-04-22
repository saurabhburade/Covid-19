import React, { Component } from "react";
import "./dashboard.css";
import { FaBeer } from "react-icons/fa";
import { TiThListOutline } from "react-icons/ti";
import Chartkick, { LineChart, PieChart } from "react-chartkick";
import "chart.js";
import covidIcon from "./Images/06.svg";
import IndiaMap from "./IndiaMap";
import { connect } from "react-redux";
import { fetchStateWise } from "../Redux/ActionCreator";
import Chart from "react-google-charts";
import Confirmedchart from "./Confirmedchart";
import Statecard from "./Statecard";

Chartkick.options = {
  colors: ["#b00", "#666"],

  //   scales: {
  //     yAxes: [
  //       {
  //         gridLines: {
  //           drawBorder: false,
  //         },
  //       },
  //     ],
  //   },
  //   scales: {
  //     xAxes: [
  //       {
  //         ticks: {
  //           display: false, //this will remove only the label
  //         },
  //       },
  //     ],
  //   },
};
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    this.props.fetchStateWise();
  }
  render() {
    return (
      <div className="dashContainer">
        <div className="dash-menu-container">
          <div className="menu-item-covid">
            {/* < className="covid-icon" /> */}
            <img className="covid-icon" src={covidIcon} alt="covid" />
          </div>
          <div className="menu-right-cont">
            <div className="menu-item">
              <TiThListOutline className="menu-icon" /> <span>Dashboard</span>
            </div>
            <div className="menu-item">
              <TiThListOutline className="menu-icon" /> <span>Hello</span>
            </div>{" "}
            <div className="menu-item">
              <TiThListOutline className="menu-icon" /> <span>Hello</span>
            </div>{" "}
            <div className="menu-item">
              <TiThListOutline className="menu-icon" /> <span>Hello</span>
            </div>{" "}
            <div className="menu-item">
              <TiThListOutline className="menu-icon" /> <span>Hello</span>
            </div>
          </div>
        </div>
        <div className="dash-material-container">
          <div className="dash-left-container">
            <div className="total-container">
              <div className="total-cases-card">
                <div className="total-cases-detail">
                  <p className="total-case-text">Active Cases</p>
                  <p className="total-case-number">
                    {this.props.totalCases.active || "Loading..."}
                  </p>
                </div>
                {/* <div className="total-case-chart"> */}
                {/* <Chart
                    width={"10em"}
                    height={"100%"}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ["x", "y"],
                      [0, 0],
                      [1, 10],
                      [2, 0],
                      [3, 10],
                    ]}
                    options={{
                      legend: "none",
                    }}
                  /> */}
                {/* <Confirmedchart /> */}
                {/* </div> */}
              </div>
              <div className="total-cases-card">
                <div className="total-cases-detail">
                  <p className="total-case-text">Confirmed Cases</p>
                  <p className="total-case-number">
                    {this.props.totalCases.confirmed || "Loading..."}
                  </p>
                </div>
              </div>{" "}
              <div className="total-cases-card">
                <div className="total-cases-detail">
                  <p className="total-case-text">Deaths</p>
                  <p className="total-case-number">
                    {this.props.totalCases.deaths || "Loading..."}
                  </p>
                </div>
              </div>
            </div>
            <div className="map-and-details-container">
              <div className="map">
                <IndiaMap />
              </div>
              <div className="map-state-district-container">
                <p className="map-state-district-container-title map-title-outer">
                  States
                </p>
                <div className="state-data-card-container">
                  {this.props.stateData.length !== 0
                    ? this.props.stateData.map((element) => {
                        return (
                          <Statecard
                            percentage={parseInt(
                              element.confirmed / element.recovered
                            )}
                            Confirmed={element.confirmed}
                            Active={element.active}
                            Recovered={element.recovered}
                            Deaths={element.deaths}
                            State={element.state}
                          />
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
            <div className="awareness-container">
              <div className="aw-card">
                <div className="total-case-chart">
                  <Confirmedchart />
                </div>
              </div>
            </div>
          </div>
          <div className="dash-right-container">
            <div className="aw-card">
              <div className="aw-card-title">
                <p className="news-and-updates-t">NEWS & UPDATES</p>
              </div>

              <marquee className="news-card-cont" direction="up">
                <div className="news-card">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>{" "}
                <div className="news-card">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div className="news-card">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>{" "}
                <div className="news-card">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>{" "}
                <div className="news-card">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>{" "}
                <div className="news-card">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </marquee>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    totalCases: state.setTotalCases,
    stateData: state.stateData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchStateWise: () => dispatch(fetchStateWise()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
