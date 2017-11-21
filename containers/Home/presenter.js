// @flow
import React from 'react';
import { ScrollView, Button, Text, Alert } from 'react-native';
import Moment from 'moment';
import styles from './style';

type Props = {
  doSaveStartSleep: Function,
  doSaveEndSleep: Function,
  startSleepTimestamps: Array<number>,
  endSleepTimestamps: Array<number>,
  doRemoveStartSleep: Function,
  doRemoveEndSleep: Function,
};

class Home extends React.Component<Props> {
  static navigationOptions = () => ({
    title: `Home`,
  });

  displayDateTime(timestamp: number) {
    return Moment(timestamp)
      .utcOffset(8)
      .format('YYYY-MM-DD(ddd) hh:mm(A) Z');
  }

  handleRemoveStartSleep = () => {
    const { startSleepTimestamps } = this.props;
    if (startSleepTimestamps.length) {
      Alert.alert(
        'Remove Start Sleep',
        `${this.displayDateTime(startSleepTimestamps[startSleepTimestamps.length - 1])}`,
        [
          { text: 'OK', onPress: () => this.props.doRemoveStartSleep() },
          { text: 'Cancel', onPress: () => {} },
        ],
        {
          cancelable: true,
        }
      );
    }
  };

  handleRemoveStopSleep = () => {
    const { endSleepTimestamps } = this.props;
    // avoid removal item from empty array
    if (endSleepTimestamps.length) {
      Alert.alert(
        'Remove Start Sleep',
        `${this.displayDateTime(endSleepTimestamps[endSleepTimestamps.length - 1])}`,
        [
          { text: 'OK', onPress: () => this.props.doRemoveEndSleep() },
          { text: 'Cancel', onPress: () => {} },
        ],
        {
          cancelable: true,
        }
      );
    }
  };

  calculateTimeDifference(difference: number) {
    const truncateMilliseconds = Math.floor(difference / 1000);
    let hours = Math.floor(truncateMilliseconds / 3600);
    let minutes = Math.floor((truncateMilliseconds % 3600) / 60);

    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return `Last sleep duration
    ${hours} hours ${minutes} minutes`;
  }

  renderCheckTimestampLengthText() {
    const { startSleepTimestamps, endSleepTimestamps } = this.props;
    let displayText = '';
    const startLength = startSleepTimestamps.length;
    const endLength = endSleepTimestamps.length;
    if (startLength > endLength) {
      displayText = 'Oh Yeah, you are sleeping';
    } else if (startLength < endLength) {
      displayText = 'Oh No! how come u can end sleep without started sleeping?';
    } else if (startLength === 0 && endLength === 0) {
      displayText = '';
    } else {
      const lastStart = startSleepTimestamps[startLength - 1];
      const lastEnd = endSleepTimestamps[endLength - 1];
      displayText = this.calculateTimeDifference(lastEnd - lastStart);
    }
    return <Text>{displayText}</Text>;
  }

  render() {
    const { startSleepTimestamps, endSleepTimestamps } = this.props;
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <Text>Start sleep timestamps</Text>
        {this.props.startSleepTimestamps.map(timestamp => (
          <Text key={timestamp}>{this.displayDateTime(timestamp)}</Text>
        ))}
        <Text>End sleep timestamps</Text>
        {this.props.endSleepTimestamps.map(timestamp => (
          <Text key={timestamp}>{this.displayDateTime(timestamp)}</Text>
        ))}
        {startSleepTimestamps.length === endSleepTimestamps.length && [
          <Button
            key="Start Sleep"
            title="Start Sleep"
            onPress={() => this.props.doSaveStartSleep(Date.now())}
          />,
          <Button
            key="Remove Last End Sleep"
            title="Remove Last End Sleep"
            onPress={this.handleRemoveStopSleep}
          />,
        ]}
        {startSleepTimestamps.length === endSleepTimestamps.length + 1 && [
          <Button
            key="End Sleep"
            title="End Sleep"
            onPress={() => this.props.doSaveEndSleep(Date.now())}
          />,
          <Button
            key="Remove Last Start Sleep"
            title="Remove Last Start Sleep"
            onPress={this.handleRemoveStartSleep}
          />,
        ]}
        {this.renderCheckTimestampLengthText()}
      </ScrollView>
    );
  }
}
export default Home;
