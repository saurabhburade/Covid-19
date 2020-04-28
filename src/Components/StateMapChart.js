import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import {scaleLinear } from "d3-scale";

import { connect } from "react-redux";
import { csvfy } from "./jsonToCsv";
import * as d3 from "d3"
// import axios from "axios";
// import { unwind } from "json2csv/transforms";
// const { writeFileSync } = require("");

const geoUrl =
  // "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
  // "https://www.covid19india.org/maps/india.json";
  //   "https://raw.githubusercontent.com/varunon9/india-choropleth-javascript/master/src/india.topo.json";
  "https://www.covid19india.org/maps/maharashtra.json";

const StateMapChart = (props) => {
    console.log("  csvfy()", csvfy());
  const [selectedMapDetail, setselectedMapDetail] = useState({
    state: "Hover State",
    confirmed: 0,
    active: 0,
    recovered: 0,
    deaths: 0,
  });
  const maxArr = props.stateData.map((el) => {
    console.log("parseInt(el.confirmed)", parseInt(el.confirmed));
    if (el.state !== "Total") {
      return parseInt(el.confirmed);
    } else {
      return 0;
    }
  });
  const maxLimit = Math.max(...maxArr);
  console.log("maxArr");
  const colorScale = scaleLinear()
    .domain([0, 700])
    .range(["#f7f7f7", "#782618"]);

  const [data, setData] = useState([]);
  // const [content, setContent] = useState("");
const [selectedStateCode, setselectedStateCode] = useState(
  props.selectedStateCode
);

  
  

useEffect(() => {
  d3.json("https://api.covid19india.org/v2/state_district_wise.json")
    .then((counties) => {
      console.log("counties", counties);
      const stateSelected = counties.find((el) => {
        return el.statecode === selectedStateCode.toUpperCase();
      });
      setData(stateSelected.districtData);
    })
    .catch((err) => console.log(err));
}, [props.selectedStateCode]);

       // https://www.bls.gov/lau/
 
  
  
  

  const geographyStyle = {
    default: {
      outline: "none",
      cursor: "pointer",
    },
    hover: {
      fill: "#c9cc",
      transition: "all 400ms",
      outline: "none",
      cursor: "pointer",
    },
    pressed: {
      outline: "none",
      cursor: "pointer",
    },
  };
  function mapClick(geo, cur) {
    console.log(geo, cur);
  }
  

  return (
    <>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 4000,
          center: [77.0629, 18.5937],
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const cur = data.find((s) =>{
                  
                console.log("s, geo.district", s, geo);
                // return s["districtData"][0].district === geo.properties.district});
                return s.district === geo.properties.district;});
              console.log("cur", cur, cur ? typeof cur.confirmed : "not");
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={cur ? colorScale(parseInt(cur.confirmed)) : "#cfff"}
                  style={geographyStyle}
                  // title="Hello"
                  stroke="#6d6d6d"
                  strokeWidth={0.2}
                  // onClick={() => {
                  //   if (cur) {
                  //     setselectedMapDetail({
                  //       state: cur.State,
                  //       confirmed: cur.Confirmed,
                  //       active: cur.Active,
                  //       recovered: cur.Recovered,
                  //       deaths: cur.Deaths,
                  //     });
                  //   }
                  //   console.log("selectedMapDetail", selectedMapDetail);
                  // }}
                  // onMouseLeave={() => {
                  //   if (cur) {
                  //     setselectedMapDetail({});
                  //   }
                  //   console.log("selectedMapDetail", selectedMapDetail);
                  // }}
                ></Geography>
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <div className="map-scale"></div>
      {selectedMapDetail.confirmed ? (
        <div className="selected-map-details">
          <p className="selected-map-title">
            <span>{selectedMapDetail.state}</span>
          </p>
          <p>
            <span> Confirmed </span> <span>{selectedMapDetail.confirmed}</span>
          </p>{" "}
          <p>
            <span> Active </span> <span>{selectedMapDetail.active}</span>
          </p>
          <p>
            <span> Recovered </span> <span>{selectedMapDetail.recovered}</span>
          </p>
          <p>
            <span> Deaths </span> <span>{selectedMapDetail.deaths}</span>
          </p>
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    totalCases: state.setTotalCases,
    stateData: state.stateData,
    selectedStateCode:state.selectedStateCode
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // fetchStateWise: () => dispatch(fetchStateWise()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StateMapChart);
// export default MapChart;
