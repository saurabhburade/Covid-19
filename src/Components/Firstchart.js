import React, { Component, createRef } from 'react'
import {select} from 'd3'
import * as d3 from 'd3'
// import { legend } from "@d3/color-legend";
// import node from "./diagram";
import rd3 from "react-d3-library";
const RD3Component = rd3.Component;
       const svgRef = createRef();
// const  node = require('./diagram');
var node = document.createElement("div");

class Firstchart extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }
componentWillMount(){
          const  data=[50,20,30,40,50,60,70]
          
 const svg = select(node).append("svg").attr("width", 500).attr("height", 500);
 var path = d3.geoPath();
 var projection = d3
   .geoMercator()
   .scale(70)
   .center([0, 20])
   .translate([500 / 2, 500 / 2]);
//  svg
//    .selectAll("cirlcle")
//    .data(data)
//    .join(
//      (enter) =>
//        enter
//          .append("circle")
//          .attr("r", (value) => value)
//          .attr("stroke", "black")
//          .attr("width", 100)
//          .attr("height", 100)
//          .attr("cx", (value) => value * 2)
//          .attr("cy", (value) => value * 2),
//      (update) => update.attr("class", "updated"),
//      (exit) => exit.remove()
//    );
svg.append(path)
svg.selectAll("path").data(data).join(
  
  
)


}
    render() {

       console.log(svgRef);
        return (
          <div>
            <svg>
              <path
                d="M0,150,100,100,30,50"
                stroke="blue"
                fill="none"
              />
            </svg>
            <RD3Component data={node} />
          </div>
        );
    }
}

export default Firstchart
