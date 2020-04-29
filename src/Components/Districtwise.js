import React, { Component, Fragment } from "react";
import "./dashboard.css";
import Chartkick from "react-chartkick";
import "chart.js";
import { connect } from "react-redux";
import { fetchDistrictWise } from "../Redux/ActionCreator";
import Confirmedchart from "./Confirmedchart";
import Statecard from "./Statecard";
import cough from "./Images/coughing__monochromatic.svg";
import MapChart from "./MapChart";
import StateMapChart from "./StateMapChart";
Chartkick.options = {
  colors: ["#b00", "#666"],

};
class Districtwise extends Component {
  constructor(props) {
    
    super(props);
// console.log("district");
    this.state = {
      selectedState: "Total",
    };
  }

  selectStateHandle = (e) => {
    // console.log(e.target.value);
    this.setState({
      selectedState: e.target.value,
    });
  };
  searchClick = () => {
    if (this.state.selectedState !== "Total") {
      this.props.fetchDistrictWise(this.state.selectedState);
    }
  };
  render() {
    return (
      <div className="dashContainer">
        <div className="search-state">
          <select
            name="Selected State"
            id="select-state"
            onChange={this.selectStateHandle}
            placeholder="Select State"
          >
            <option value="Total">Select State</option>
            {this.props.stateData.length !== 0
              ? this.props.stateData.map((element) => {
                  if (element.state !== "Total") {
                    return (
                      <option value={element.state}>{element.state}</option>
                    );
                  }
                })
              : null}
          </select>
          <div className="search-btn-cont">
            <button className="searchDistrict-btn" onClick={this.searchClick}>
              Search
            </button>
          </div>
        </div>
        <div className="dash-material-container">
          <div className="dash-left-container">
            <div className="total-container">
              <div className="total-cases-card">
                <div className="total-cases-detail">
                  <p className="total-case-text">Active Cases</p>
                  <p className="total-case-number">
                    {this.props.selectedStateTotal.active
                      ? this.props.selectedStateTotal.active
                      : this.props.totalCases.active || "Loading..."}
                  </p>
                </div>
              </div>
              <div className="total-cases-card">
                <div className="total-cases-detail">
                  <p className="total-case-text">Confirmed Cases</p>
                  <p className="total-case-number">
                    {this.props.selectedStateTotal.confirmed
                      ? this.props.selectedStateTotal.confirmed
                      : this.props.totalCases.confirmed || "Loading..."}
                  </p>
                </div>
              </div>{" "}
              <div className="total-cases-card">
                <div className="total-cases-detail">
                  <p className="total-case-text">Recovered</p>
                  <p className="total-case-number">
                    {this.props.selectedStateTotal.recovered
                      ? this.props.selectedStateTotal.recovered
                      : this.props.totalCases.recovered || "Loading..."}
                  </p>
                </div>
              </div>
              <div className="total-cases-card">
                <div className="total-cases-detail">
                  <p className="total-case-text">Deaths</p>
                  <p className="total-case-number">
                    {this.props.selectedStateTotal.deaths
                      ? this.props.selectedStateTotal.deaths
                      : this.props.totalCases.deaths || "Loading..."}
                  </p>
                </div>
              </div>
            </div>
            <div className="map-and-details-container">
              <div className="map">
                <div className="map-chart">
                  {this.props.selectedStateCode ? (
                    <StateMapChart />
                  ) : (
                    <MapChart />
                  )}
                </div>{" "}
              </div>
              <div className="map-state-district-container">
                <p className="map-state-district-container-title map-title-outer">
                  {this.props.selectedStateTotal.recovered
                    ? "Districts"
                    : "States" || "Loading..."}
                </p>
                <div className="state-data-card-container">
                  {Object.keys(this.props.districtWiseData).length !== 0
                    ? Object.keys(this.props.districtWiseData).map(
                        (element) => {
                          return (
                            <Statecard
                              percentage={parseInt(
                                (this.props.districtWiseData[element]
                                  .recovered *
                                  100) /
                                  this.props.districtWiseData[element].confirmed
                              )}
                              Confirmed={
                                this.props.districtWiseData[element].confirmed
                              }
                              Active={
                                this.props.districtWiseData[element].active
                              }
                              Recovered={
                                this.props.districtWiseData[element].recovered
                              }
                              Deaths={
                                this.props.districtWiseData[element].deceased
                              }
                              State={element}
                            />
                          );
                        }
                      )
                    : this.props.stateData.length !== 0
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
              {this.props.selectedStateTotal.recovered ? (
                <Fragment>
                  {" "}
                  <div className="aw-card">
                    <div className="total-case-chart">
                      <Confirmedchart
                        label="Confirmed Cases"
                        color="#d48c06"
                        chatConfirmData={this.props.dailyConfirmed}
                      />
                    </div>
                  </div>
                  <div className="aw-card">
                    <div className="total-case-chart">
                      <Confirmedchart
                        label="Death Cases"
                        color="#d11111"
                        chatConfirmData={this.props.dailyDead}
                      />
                    </div>
                  </div>
                </Fragment>
              ) : null}
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
    selectedStateTotal: state.selectedStateTotal,
    districtWiseData: state.districtWiseData,
    dailyConfirmed: state.dailyConfirmed,
    dailyDead: state.dailyDead,
    selectedStateCode:state.selectedStateCode
    
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchDistrictWise: (stateName) => dispatch(fetchDistrictWise(stateName)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Districtwise);
