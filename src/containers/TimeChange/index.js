import { connect } from 'react-redux';

import TimeChange from './presenter';
import { actionCreators as timeActionCreator } from '../../redux/ducks/time';

const mapStateToProps = state => ({
  startSleepTimestamps: state.time.startSleepTimestamps,
  endSleepTimestamps: state.time.endSleepTimestamps,
  selectedIndex: state.time.selectedIndex,
});

const mapDispatchToProps = {
  doEditTimestamp: timeActionCreator.doEditTimestamp,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeChange);
