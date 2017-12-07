import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Home from './presenter';
import { actionCreators as timeActionCreator } from '../../redux/ducks/time';

const mapStateToProps = state => ({
  startSleepTimestamps: state.time.startSleepTimestamps,
  endSleepTimestamps: state.time.endSleepTimestamps,
});

const doNavigateTimeChange = () => NavigationActions.navigate({ routeName: 'TimeChange' });

const mapDispatchToProps = {
  doSaveStartSleep: timeActionCreator.doSaveStartSleep,
  doSaveEndSleep: timeActionCreator.doSaveEndSleep,
  doRemoveStartSleep: timeActionCreator.doRemoveStartSleep,
  doRemoveEndSleep: timeActionCreator.doRemoveEndSleep,
  doNavigateTimeChange,
  doSetEditIndex: timeActionCreator.doSetEditIndex,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
