import React from 'react';
import Chartkick, { LineChart } from 'react-chartkick';
import { connect } from 'react-redux';
// Chartkick.options = {
//   colors: [props.color, "orange"],
// };
function Confirmedchart(props) {
//     let data={}
// if (props.data) {
//     props.chartData.foreach(element => {
//         data[element.date] = element.totalconfirmed
//         // {(element.date) ,(element.totalconfirmed)}
//     }) 
//     console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",data);
// }

console.log(props.chartData);
    return (
      <LineChart
    
        zeros={false}
        colors={["#b8b8b8"]}
        width={"100%"}
        // xtitle={props.xtitle||"Date"} ytitle={props.ytitle||"No. of cases"}
        stacked={false}
        legend={true}
        label={props.label}
        curve={true}
        data={props.chatConfirmData}
      />
    );
}

const mapStateToProps = state => {
    return {
        // chatConfirmData: state.chatConfirmData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // fetchStateWise: () => dispatch(fetchStateWise())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Confirmedchart);
// export default Activechart;
