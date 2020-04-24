import React, { Component } from 'react'
import "./testdata.css"
import Testcard from './Testcard'
import { connect } from 'react-redux'
class Testdata extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
          <div className="test-data-card-cont">
            {this.props.testData.length!==0?
           this.props.testData.map(element=>{
               return (
                 <Testcard
                   stateName={element.state}
                   totalTests={element.totaltested}
                   negative={element.negative}
                   positive={element.positive}
                   notConfirmed={element.unconfirmed}
                   source={element.source}
                 />
               );
           }):null 
        }
           
          </div>
        );
    }
}
const mapStateToProps = (state) => {
  return {

    testData: state.testData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // fetchStateWise: () => dispatch(fetchStateWise()),
    // fetchDistrictWise: (stateName) => dispatch(fetchDistrictWise(stateName)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Testdata);
// export default Testdata
