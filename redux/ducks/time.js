// @flow
import { combineEpics } from 'redux-observable';
// import { Observable } from "rxjs";

// *** Actions ***
const SAVE_START_SLEEP = 'time/SAVE_START_SLEEP';
const SAVE_END_SLEEP = 'time/SAVE_END_SLEEP';
const REMOVE_START_SLEEP = 'time/REMOVE_START_SLEEP';
const REMOVE_END_SLEEP = 'time/REMOVE_END_SLEEP';

// *** Action Creators ***
const doSaveStartSleep = (timestamp: number) => ({
  type: SAVE_START_SLEEP,
  timestamp,
});

const doSaveEndSleep = (timestamp: number) => ({
  type: SAVE_END_SLEEP,
  timestamp,
});

const doRemoveStartSleep = () => ({
  type: REMOVE_START_SLEEP,
});

const doRemoveEndSleep = () => ({
  type: REMOVE_END_SLEEP,
});

// *** Functions called by Epics ***

// *** Epics ***

// *** Initial state ***
const initialState = {
  startSleepTimestamps: [],
  endSleepTimestamps: [],
};

// *** Reducer ***
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_START_SLEEP:
      return {
        ...state,
        startSleepTimestamps: [...state.startSleepTimestamps, action.timestamp],
      };

    case SAVE_END_SLEEP:
      return {
        ...state,
        endSleepTimestamps: [...state.endSleepTimestamps, action.timestamp],
      };

    case REMOVE_START_SLEEP:
      return {
        ...state,
        startSleepTimestamps: state.startSleepTimestamps.slice(
          0,
          state.startSleepTimestamps.length - 1,
        ),
      };

    case REMOVE_END_SLEEP:
      return {
        ...state,
        endSleepTimestamps: state.endSleepTimestamps.slice(0, state.endSleepTimestamps.length - 1),
      };

    default:
      return state;
  }
}

const actionTypes = {};
const actionCreators = {
  doSaveStartSleep,
  doSaveEndSleep,
  doRemoveStartSleep,
  doRemoveEndSleep,
};
const epics = combineEpics();

export { actionTypes, actionCreators, epics };
