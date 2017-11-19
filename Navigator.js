// @flow
import React from "react";
import { BackHandler } from "react-native";
import { connect } from "react-redux";
import {
  addNavigationHelpers,
  NavigationActions,
  StackNavigator,
} from "react-navigation";
import type { NavigationState } from "react-navigation/src/TypeDefinition";

import HomeScreen from "./containers/Home";

export const Navigator = StackNavigator({
  Home: { screen: HomeScreen },
});

type Props = {
  nav: NavigationState,
  dispatch: Function,
};

class NavigatorWithState extends React.Component<Props> {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBack);
  }

  onBack = () => {
    const backAction = NavigationActions.back();
    const nav = Navigator.router.getStateForAction(backAction, this.props.nav);
    if (nav && nav !== this.props.nav) {
      this.props.dispatch(backAction);
      return true;
    }
    return false;
  };

  render() {
    return (
      <Navigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({ nav: state.nav });

export default connect(mapStateToProps)(NavigatorWithState);
