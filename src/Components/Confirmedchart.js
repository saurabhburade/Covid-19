import React from 'react';
import Chartkick, { LineChart } from 'react-chartkick';
import { connect } from 'react-redux';

function Confirmedchart(props) {


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


export default Confirmedchart;
// export default Activechart;
