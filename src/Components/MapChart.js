import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import {scaleLinear } from "d3-scale";
import { csv } from "d3-fetch";
import { connect } from "react-redux";

const geoUrl =
  // "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
  "https://www.covid19india.org/maps/india.json";
  // "https://raw.githubusercontent.com/varunon9/india-choropleth-javascript/master/src/india.topo.json";

const MapChart = (props) => {
  const [selectedMapDetail, setselectedMapDetail] = useState({
    state: "Hover State",
    confirmed: 0,
    active: 0,
    recovered: 0,
    deaths: 0,
  });
  const maxArr = props.stateData.map((el) => {
    // console.log("parseInt(el.confirmed)", parseInt(el.confirmed));
    if (el.state !== "Total") {
      return parseInt(el.confirmed);
    } else {
      return 0;
    }
  });
  const maxLimit = Math.max(...maxArr);
  // console.log("maxArr");
  const colorScale = scaleLinear()
    .domain([0, maxLimit])
    .range(["#ffedea", "#782618"]);

  const [data, setData] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    // https://www.bls.gov/lau/
    csv("https://api.covid19india.org/csv/latest/state_wise.csv").then(
      (counties) => {
        setData(counties);
        // console.log("object",counties);
      }
    );
  }, []);
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

  return (
    <>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1000,
          center: [78.9629, 22.5937],
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              
              const cur = data.find((s) => {
                // console.log("s geo india",s,geo);
                return s.State === geo.properties.st_nm;
              });
              // console.log(
              //   "cur",
              //   cur
              //     /? "conf in " +
              //         parseInt(cur.Confirmed) +
              //         "conf  " +
              //         cur.Confirmed
              //     : null
              // );
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={cur ? colorScale(parseInt(cur.Confirmed)) : "#ffff"}
                  style={geographyStyle}
                  stroke="#6d6d6d"
                  strokeWidth={0.2}
                  onClick={() => {
                    if (cur) {
                      setselectedMapDetail({
                        state: cur.State,
                        confirmed: cur.Confirmed,
                        active: cur.Active,
                        recovered: cur.Recovered,
                        deaths: cur.Deaths,
                      });
                    }
                    // console.log("selectedMapDetail", selectedMapDetail);
                  }}
                  onMouseLeave={() => {
                    if (cur) {
                      setselectedMapDetail({});
                    }
                    // console.log("selectedMapDetail", selectedMapDetail);
                  }}
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // fetchStateWise: () => dispatch(fetchStateWise()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MapChart);
// export default MapChart;
