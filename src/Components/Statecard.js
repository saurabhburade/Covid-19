import React, { Fragment } from "react";
import { connect } from "react-redux";

function Statecard(props) {
  return (
    <Fragment>
      <div className="state-data-card">
        <div className="recovery-ratio-cont" title="Recovery Percent">
          <p className="recovery-percent">
            {isNaN(props.percentage) ? 0 : props.percentage}%
          </p>
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
  );
}

const mapStateToProps = (state) => {
  return {
    stateData: state.stateData,
  };
};

export default connect(mapStateToProps, null)(Statecard);
// export default Activechart;
