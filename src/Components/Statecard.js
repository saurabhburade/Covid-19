import React, { Fragment } from 'react';
// import Chartkick, { LineChart } from 'react-chartkick';
import { connect } from 'react-redux';
// Chartkick.options = {
//     colors: ["#fff0", "orange"]
// }
function Statecard(props) {

    return (
        <Fragment>


            <div className="state-data-card">
                <div className="recovery-ratio-cont" title="Recovery Percent">
                    <p className="recovery-percent">{isNaN(props.percentage) ? 0 : props.percentage}%</p>
                </div>
                <div className="state-data">
    <p className="state-name">{props.State}</p>
                    <p className="state-confirmed-recovered">
    <span>Confirmed {props.Confirmed}</span>
                        <span>Active {props.Active}</span>

                        <span>Recovered {props.Recovered}</span>
                        <span>Deaths {props.Deaths}</span>
                    </p>
                </div>
            </div>
        </Fragment>


    )
}

const mapStateToProps = state => {
    return {
        stateData: state.stateData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // fetchStateWise: () => dispatch(fetchStateWise())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Statecard);
// export default Activechart;
