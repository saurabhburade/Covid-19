import React from 'react';

function Testcard(props) {
    return (
      <div className="test-data-card">
        <p className="test-data-title">{props.stateName}</p>
        <div className="test-data-detail">
          <p className="total-tests">
            <span>Total Tests</span> <span>{props.totalTests}</span>
          </p>
          <p className="test-positive">
            <span>Negative</span> <span>{props.negative}</span>
          </p>
          <p className="test-negative">
            <span>Positive</span> <span>{props.positive}</span>
          </p>
          <p className="test-not-confm">
            <span>Not Confirmed</span> <span>{props.notConfirmed}</span>
          </p>
          <p className="source">
            <span> Source </span>
            <span>
              <a href={props.source}>Here</a>
            </span>
          </p>
        </div>
      </div>
    );
}

export default Testcard;
