import React, { useState, useEffect, useCallback } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import {scaleLinear } from "d3-scale";
import "./statemap.css"
import { connect } from "react-redux";
import { csvfy } from "./jsonToCsv";
import * as d3 from "d3"
import { MP_TOPO, MH_TOPO } from "../TopoJSON/StateWiseTopoJson";
// import axios from "axios";
// import { unwind } from "json2csv/transforms";
// const { writeFileSync } = require("");


const StateMapChart = (props) => {
    console.log("  csvfy()", csvfy());
  const [selectedMapDetail, setselectedMapDetail] = useState({
    state: "",
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
const [StateMapData, setStateMapData] = useState(
 {}
);
const [zoomLevel, setzoomLevel] = useState(1)
const [StateCenter, setStateCenter] = useState([78.9629, 22.5937]);
console.log("StateMapData", StateMapData);
// if (selectedStateCode.toUpperCase()==="MP") {
//    geoUrl =
//     // "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
//     // "https://www.covid19india.org/maps/india.json";
//     //   "https://raw.githubusercontent.com/varunon9/india-choropleth-javascript/master/src/india.topo.json";
//     MP_TOPO;  
// }else{
//    geoUrl =
//      // "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
//      // "https://www.covid19india.org/maps/india.json";
//      //   "https://raw.githubusercontent.com/varunon9/india-choropleth-javascript/master/src/india.topo.json";
//      MP_TOPO;  
// }

  

useEffect(() => {
  const stateSelected = props.stateDistricts.find((el) => {
    return el.statecode === props.selectedStateCode.toUpperCase();
  });
  setData(stateSelected.districtData);
  setStateMapData(props.selectedStateMapData);
  setStateCenter(props.selectedStateMapData.center);
  console.log("props.selectedStateMapData", props.selectedStateMapData);
  console.log("stateSelected.districtData", stateSelected.districtData);
}, [props.selectedStateCode, props.selectedStateMapData]);
const geoUrl =
  StateMapData.topo || "https://www.covid19india.org/maps/india.json";
       // https://www.bls.gov/lau/
 
  
  // if (props.selectedStateMapData) {
  //   console.log("object", props.selectedStateMapData);
  //  setStateMapData(props.selectedStateMapData);
  // }
  

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
      {/* <div className="zoom-btns">
        <button
          className="plus-btn"
          onClick={() => {setzoomLevel(zoomLevel + 1)
              console.log("zoomLevel", zoomLevel);
          
          }}
        >
          +
        </button>
        <button
          className="minus-btn"
          onClick={() => {
            if (zoomLevel> 1) {
              setzoomLevel(zoomLevel - 1);
              console.log("zoomLevel", zoomLevel);
            }
          }}
        >
          +
        </button>
      </div> */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 4000 * StateMapData.scaleZoom||1,
          center: StateCenter,
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const cur = data.find((s) => {
                // console.log("s, geo.district", s, geo);
                // return s["districtData"][0].district === geo.properties.district});
                return s.district === geo.properties.district;
              });
              // console.log("cur", cur, cur ? typeof cur.confirmed : "not");
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={cur ? colorScale(parseInt(cur.confirmed)) : "#ffff"}
                  style={geographyStyle}
                  // title="Hello"
                  stroke="#6d6d6d"
                  strokeWidth={0.5}
                  onClick={() => {
                    if (cur) {
                      console.log(cur);
                      setselectedMapDetail({
                        state: cur.district,
                        confirmed: cur.confirmed,
                        active: cur.active,
                        recovered: cur.recovered,
                        deaths: cur.deceased,
                      });
                    }
                    console.log("selectedMapDetail", selectedMapDetail);
                  }}
                  onMouseLeave={() => {
                    if (cur) {
                      setselectedMapDetail({});
                    }
                    console.log("selectedMapDetail", selectedMapDetail);
                  }}
                ></Geography>
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <div className="map-scale"></div>
      {selectedMapDetail.state ? (
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
    selectedStateCode: state.selectedStateCode,
    selectedStateMapData: state.selectedStateMapData,
    stateDistricts: state.stateDistricts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // fetchStateWise: () => dispatch(fetchStateWise()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StateMapChart);
// export default MapChart;
