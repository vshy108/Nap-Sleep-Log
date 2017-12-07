import { Navigator } from '../../../Navigator';

const { getActionForPathAndParams, getStateForAction } = Navigator.router;

const homePage = getActionForPathAndParams('Home');
const initialState = getStateForAction(homePage);

export default function reducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    default:
      nextState = getStateForAction(action, state);
      break;
  }

  return nextState || state;
}
