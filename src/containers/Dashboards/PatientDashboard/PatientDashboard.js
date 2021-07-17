import React from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../../store/action-creators/userModes";

class PatientDashboard extends React.Component {
  componentDidMount() {
    this.props.onSwitchToPatientUserMode();
  }

  render() {
    return <div>Patient Dashboard</div>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchToPatientUserMode: () =>
      dispatch(actionCreators.switchToPatientUserMode()),
  };
};

export default connect(null, mapDispatchToProps)(PatientDashboard);
