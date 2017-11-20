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

  render() {
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
        <Button title="Start Sleep" onPress={() => this.props.doSaveStartSleep(Date.now())} />
        <Button title="End Sleep" onPress={() => this.props.doSaveEndSleep(Date.now())} />
        <Button title="Remove Last Start Sleep" onPress={this.handleRemoveStartSleep} />
        <Button title="Remove Last End Sleep" onPress={this.handleRemoveStopSleep} />
      </ScrollView>
    );
  }
}
export default Home;
