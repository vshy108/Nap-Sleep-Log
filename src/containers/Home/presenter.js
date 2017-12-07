// @flow
import React from 'react';
import { ScrollView, Button, Text, Alert, View, TouchableOpacity } from 'react-native';
import styles from './style';
import { displayDateTime } from '../../common/handleNumber';

type Props = {
  doSaveStartSleep: Function,
  doSaveEndSleep: Function,
  startSleepTimestamps: Array<number>,
  endSleepTimestamps: Array<number>,
  doRemoveStartSleep: Function,
  doRemoveEndSleep: Function,
  doNavigateTimeChange: Function,
  doSetEditIndex: Function,
};

class Home extends React.Component<Props> {
  static navigationOptions = () => ({
    title: `Home`,
  });

  handleRemoveStartSleep = () => {
    const { startSleepTimestamps } = this.props;
    if (startSleepTimestamps.length) {
      Alert.alert(
        'Remove Start Sleep',
        `${displayDateTime(startSleepTimestamps[startSleepTimestamps.length - 1])}`,
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
        'Remove End Sleep',
        `${displayDateTime(endSleepTimestamps[endSleepTimestamps.length - 1])}`,
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
    // return the conversion result only to increase reusability
    return `${hours} hours ${minutes} minutes`;
  }

  handleTimeChange(index: number) {
    this.props.doSetEditIndex(index);
    this.props.doNavigateTimeChange();
  }

  renderCheckTimestampLengthText() {
    const { startSleepTimestamps, endSleepTimestamps } = this.props;
    let displayText = '';
    const startLength = startSleepTimestamps.length;
    const endLength = endSleepTimestamps.length;
    if (endLength === 0) {
      displayText = `Last sleep duration
        00 hours 00 minutes`;
    } else {
      const lastStart = startSleepTimestamps[startLength - (startLength === endLength + 1 ? 2 : 1)];
      const lastEnd = endSleepTimestamps[endLength - 1];
      displayText = `Last sleep duration
        ${this.calculateTimeDifference(lastEnd - lastStart)}`;
    }
    return <Text>{displayText}</Text>;
  }

  renderSleepingStatusText() {
    const { startSleepTimestamps, endSleepTimestamps } = this.props;
    let displayText = '';
    const startLength = startSleepTimestamps.length;
    const endLength = endSleepTimestamps.length;
    if (startLength > endLength) {
      displayText = 'Sleeping';
    } else {
      displayText = 'Awake';
    }
    return (
      <Text>
        {`Status:
        ${displayText}`}
      </Text>
    );
  }

  renderTotalAndAverageSleepingTimeText() {
    const { startSleepTimestamps, endSleepTimestamps } = this.props;
    const startLength = startSleepTimestamps.length;
    const endLength = endSleepTimestamps.length;
    if (startLength && endLength) {
      let total = 0;
      const effectiveStartLength = startLength > endLength ? startLength - 1 : startLength;
      for (let i = 0; i < effectiveStartLength; i += 1) {
        total += endSleepTimestamps[i] - startSleepTimestamps[i];
      }
      return [
        <Text key="total">
          {`Total sleeping time:
        ${this.calculateTimeDifference(total)}`}
        </Text>,
        <Text key="average">
          {`Average sleeping time:
        ${this.calculateTimeDifference(total / endSleepTimestamps.length)}`}
        </Text>,
      ];
    }
    return [
      <Text key="total">
        {`Total sleeping time:
        00 hours 00 minutes`}
      </Text>,
      <Text key="average">
        {`Average sleeping time:
        00 hours 00 minutes`}
      </Text>,
    ];
  }

  // latest one at top
  renderSleepTimesCard() {
    const { startSleepTimestamps, endSleepTimestamps } = this.props;
    const startLength = startSleepTimestamps.length;
    const endLength = endSleepTimestamps.length;
    if (endLength === 0) {
      if (startLength === 1) {
        return (
          <TouchableOpacity key={0} onPress={() => this.handleTimeChange(0)}>
            <View style={styles.cardContainer}>
              <Text>Start: {displayDateTime(startSleepTimestamps[0])}</Text>
            </View>
          </TouchableOpacity>
        );
      }
      return null;
    } else if (startLength === endLength + 1) {
      const cardsView = [];
      for (let i = 0; i < endLength; i += 1) {
        cardsView.push(
          <TouchableOpacity key={i} onPress={() => this.handleTimeChange(i)}>
            <View style={styles.cardContainer}>
              <Text>Start: {displayDateTime(startSleepTimestamps[i])}</Text>
              <Text>End: {displayDateTime(endSleepTimestamps[i])}</Text>
              <Text>
                Slept:{' '}
                {this.calculateTimeDifference(endSleepTimestamps[i] - startSleepTimestamps[i])}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }
      cardsView.push(
        <TouchableOpacity key={endLength} onPress={() => this.handleTimeChange(endLength)}>
          <View style={styles.cardContainer}>
            <Text>Start: {displayDateTime(startSleepTimestamps[endLength])}</Text>
          </View>
        </TouchableOpacity>
      );
      cardsView.reverse();
      return cardsView;
    }
    const cardsView = this.props.startSleepTimestamps.map((timestamp, index) => (
      <TouchableOpacity key={index} onPress={() => this.handleTimeChange(index)}>
        <View style={styles.cardContainer}>
          <Text>Start: {displayDateTime(timestamp)}</Text>
          <Text>End: {displayDateTime(endSleepTimestamps[index])}</Text>
          <Text>
            Slept:{' '}
            {this.calculateTimeDifference(endSleepTimestamps[index] - startSleepTimestamps[index])}
          </Text>
        </View>
      </TouchableOpacity>
    ));
    cardsView.reverse();
    return cardsView;
  }

  render() {
    const { startSleepTimestamps, endSleepTimestamps } = this.props;
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        {this.renderSleepingStatusText()}
        <Text>{`Total days:
          ${endSleepTimestamps.length}`}</Text>
        {this.renderCheckTimestampLengthText()}
        {this.renderTotalAndAverageSleepingTimeText()}
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
        {this.renderSleepTimesCard()}
      </ScrollView>
    );
  }
}
export default Home;
