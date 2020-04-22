import React from 'react';
import Chartkick, { LineChart } from 'react-chartkick';
import { connect } from 'react-redux';
Chartkick.options = {
    colors: ["#fff0", "orange"]
}
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
            colors={["#b2c2bf"]}
                width={"100%"}
            xtitle="Time" ytitle="No of Cases"
                stacked={false}
                legend={true}   
            label="Total Confirmed Cases"
            curve={true}
                data={props.chatConfirmData}
            />
     
    )
}

const mapStateToProps = state => {
    return {
        chatConfirmData: state.chatConfirmData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // fetchStateWise: () => dispatch(fetchStateWise())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Confirmedchart);
// export default Activechart;
