import { connect } from "react-redux";

import Home from "./presenter";
import { actionCreators as timeActionCreator } from "../../redux/ducks/time";

const mapStateToProps = state => ({
  startSleepTimestamps: state.time.startSleepTimestamps,
  endSleepTimestamps: state.time.endSleepTimestamps,
});

const mapDispatchToProps = {
  doSaveStartSleep: timeActionCreator.doSaveStartSleep,
  doSaveEndSleep: timeActionCreator.doSaveEndSleep,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
