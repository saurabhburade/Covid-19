// import * as React from "react";
// import { render } from "react-dom";
// import { Chart } from "react-google-charts";
// import { connect } from "react-redux";

// // const data = [
// //     ["Country", "Popularity"],
// //     ["Germany", 200],
// //     ["United States", 300],
// //     ["Brazil", 400],
// //     ["Canada", 500],
// //     ["France", 600],
// //     ["RU", 700]
// // ];




// // let DataArray = []
// // arr.forEach(element => {
// //     if (element.state !== 'Total') {
// //      const   arrayToPush = [element.state, parseInt(element.active), parseInt(element.confirmed)]
// //         DataArray.push(arrayToPush)
// //     }
// // })
// class IndiaMap extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             data: [['State', 'Active cases']]
//         }
//     }
//     componentDidMount() {
//     //     const fun = async () => {
//     //         const result = await fetch("https://api.covid19india.org/data.json")
//     //         const res = await result.json()
//     //         return res
//     //     }

//     //     fun().then(resp => {
//     //       const  arr = resp.statewise
//     //         console.log("arr", arr, resp);
//     //         let DataArray = []
            
//     //         for (let index = 0; index < arr.length; index++) {
//     //             const element = arr[index];
//     //                        if (element.state !== 'Total') {
//     //                 console.log(element.state);
//     //                 DataArray.push([element.state, parseInt(element.active)])

//     //             }else{
//     //                            continue
//     //             }
                
//     //         }

//     //          this.setState({
//     //        data: [...this.state.data, ...DataArray]
//     //    })
       

//     //     })
//     //   console.log(object);
//     }
//     render() {
//         console.log("props", this.props.mapData);
//         return (
//           <div className="map-india-container">
//             <div className="map-india-details-cont">
//               <p className="map-title-outer">COVID-19 Affected States</p>
//             </div>
//             <div
       
//             >
//               <Chart
//                 className="in-map"
//                 chartEvents={[
//                   {
//                     eventName: "select",
//                     callback: ({ chartWrapper }) => {
//                       const chart = chartWrapper.getChart();
//                       const selection = chart.getSelection();
//                       if (selection.length === 0) return;
//                       const region = this.state.data[selection[0].row + 1];
//                       console.log("Selected : " + region);
//                     },
//                   },
//                 ]}
//                 chartType="GeoChart"
//                 width="auto"
//                 data={this.props.mapData}
//                 options={{
//                   region: "IN", // Africa
//                   resolution: "provinces", //If you want to display provinces in India
//                   colorAxis: {
//                     colors: ["#FCB8B8", "red"],
//                   },
//                 }}
//               />{" "}
//             </div>
//           </div>
//         );
//     }
// }

// const mapStateToProps = state => {
//     return {
//         mapData: state.mapData
//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         // fetchStateWise: () => dispatch(fetchStateWise())
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(IndiaMap);
// // export default IndiaMap
      {
        /* <div className="zoom-btns">
        <button className="plus-btn" onClick={setzoomLevel(zoomLevel + 1)}>
          +
        </button>
        <button
          className="minus-btn"
          onClick={() => {
            if (zoomLevel !== 0) {
              setzoomLevel(zoomLevel - 1);
            }
          }}
        >
          +
        </button>
      </div> */
      }