import React, { Component } from "react";
import "./dashboard.css";
import Chartkick from "react-chartkick";
import "chart.js";
import Confirmedchart from "./Confirmedchart";
import Statecard from "./Statecard";
import cough from "./Images/coughing__monochromatic.svg";
import MapChart from "./MapChart";
import { connect } from "react-redux";
Chartkick.options = {
  colors: ["#b00", "#666"],
};
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="dashContainer">
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
                  <p className="total-case-text">Recovered</p>
                  <p className="total-case-number">
                    {this.props.totalCases.recovered || "Loading..."}
                  </p>
                </div>
              </div>
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
                {/* <IndiaMap /> */}
                <div className="map-chart">
                  <MapChart />
                </div>
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
                              (element.recovered * 100) / element.confirmed
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
                  <Confirmedchart
                    label="Confirmed Cases"
                    color="#d48c06"
                    chatConfirmData={this.props.chatConfirmData}
                  />
                </div>
              </div>
              <div className="aw-card">
                <div className="total-case-chart">
                  <Confirmedchart
                    label="Recovered Cases"
                    color="#25ad11"
                    chatConfirmData={this.props.chartRecoveredData}
                  />
                </div>
              </div>{" "}
              <div className="aw-card">
                <div className="total-case-chart">
                  <Confirmedchart
                    label="Death Cases"
                    color="#d11111"
                    chatConfirmData={this.props.chartDeadData}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="dash-right-container">
            <div className="aw-card-news">
              <div className="aw-card-title">
                <p className="news-and-updates-t">NEWS & UPDATES</p>
              </div>

              <div className="news-card-cont" direction="up">
                {this.props.newsUpdate.length !== 0
                  ? this.props.newsUpdate.reverse().map((element) => {
                      return (
                        <div className="news-card">
                          <p
                            style={{
                              margin: "2% 0%",
                              color: "gray",
                            }}
                          >
                            About {element.timeHour} hour ago
                          </p>
                          <p>{element.update}</p>
                        </div>
                      );
                    })
                  : "Loading...."}
              </div>
            </div>
            <div className="awareness-card-who">
              <img src={cough} className="who-aware-img" alt="" />
              <div className="who-instructions-cont">
                <p className=" aw-card-title who-inst-title">
                  Preventions and Symptoms
                </p>
                <p className="hero-who-text">
                  Protect yourself and others around you by knowing the facts
                  and taking appropriate precautions.
                </p>
                <p className="read-more-text">
                  <a href="#"> Read More... </a>
                </p>
              </div>
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
    newsUpdate: state.newsUpdate,
    chatConfirmData: state.chatConfirmData,
    chartRecoveredData: state.chartRecoveredData,
    chartDeadData: state.chartDeadData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // fetchStateWise: () => dispatch(fetchStateWise()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
