// @flow
import { combineEpics } from 'redux-observable';
// import { Observable } from "rxjs";

// *** Actions ***
const SAVE_START_SLEEP = 'time/SAVE_START_SLEEP';
const SAVE_END_SLEEP = 'time/SAVE_END_SLEEP';
const REMOVE_START_SLEEP = 'time/REMOVE_START_SLEEP';
const REMOVE_END_SLEEP = 'time/REMOVE_END_SLEEP';
const SET_EDIT_INDEX = 'time/SET_EDIT_INDEX';
const EDIT_TIMESTAMP = 'time/EDIT_TIMESTAMP';

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

const doSetEditIndex = (index: number) => ({
  type: SET_EDIT_INDEX,
  index,
});

const doEditTimestamp = (timestamp: number, selectedIndex: number, isStart: boolean) => ({
  type: EDIT_TIMESTAMP,
  timestamp,
  selectedIndex,
  isStart,
});

// *** Functions called by Epics ***

// *** Epics ***

// *** Initial state ***
const initialState = {
  startSleepTimestamps: [],
  endSleepTimestamps: [],
  selectedIndex: -1,
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
          state.startSleepTimestamps.length - 1
        ),
      };

    case REMOVE_END_SLEEP:
      return {
        ...state,
        endSleepTimestamps: state.endSleepTimestamps.slice(0, state.endSleepTimestamps.length - 1),
      };

    case SET_EDIT_INDEX:
      return {
        ...state,
        selectedIndex: action.index,
      };

    case EDIT_TIMESTAMP: {
      if (action.isStart) {
        const newStartSleepTimestamps = [
          ...state.startSleepTimestamps.slice(0, action.selectedIndex),
          action.timestamp,
          ...state.startSleepTimestamps.slice(action.selectedIndex + 1),
        ];
        return {
          ...state,
          startSleepTimestamps: newStartSleepTimestamps,
        };
      }
      const newEndSleepTimestamps = [
        ...state.endSleepTimestamps.slice(0, action.selectedIndex),
        action.timestamp,
        ...state.endSleepTimestamps.slice(action.selectedIndex + 1),
      ];
      return {
        ...state,
        endSleepTimestamps: newEndSleepTimestamps,
      };
    }

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
  doSetEditIndex,
  doEditTimestamp,
};
const epics = combineEpics();

export { actionTypes, actionCreators, epics };
