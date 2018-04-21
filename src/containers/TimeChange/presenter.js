// @flow
import React from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import styles from './style';
import { displayDateTime } from '../../common/handleNumber';

type Props = {
  startSleepTimestamps: Array<number>,
  endSleepTimestamps: Array<number>,
  selectedIndex: number,
  doEditTimestamp: Function,
};
type State = { isDateTimePickerVisible: boolean, isStart: boolean };

class TimeChange extends React.Component<Props, State> {
  static navigationOptions = () => ({
    title: 'Time Change',
  });

  state = {
    isDateTimePickerVisible: false,
    isStart: true,
  };

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleShowTimePicker = (isStart: boolean) => {
    this.setState({
      isDateTimePickerVisible: true,
      isStart,
    });
  };

  handleDatePicked = (date: Date) => {
    const { isStart } = this.state;
    const { selectedIndex, startSleepTimestamps, endSleepTimestamps } = this.props;
    const newTimestamp = date.getTime();
    if (
      isStart &&
      endSleepTimestamps.length > selectedIndex &&
      newTimestamp > endSleepTimestamps[selectedIndex]
    ) {
      Alert.alert(
        'Larger than end time',
        'Please adjust to approriate start time.',
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: true }
      );
    } else if (!isStart && startSleepTimestamps[selectedIndex] > newTimestamp) {
      Alert.alert(
        'Smaller than start time',
        'Please adjust to approriate end time.',
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: true }
      );
    } else if (newTimestamp > Date.now()) {
      Alert.alert(
        'Larger than current time',
        'Please adjust to approriate end time.',
        [{ text: 'OK', onPress: () => {} }],
        { cancelable: true }
      );
    } else {
      this.props.doEditTimestamp(newTimestamp, selectedIndex, isStart);
    }
    this.hideDateTimePicker();
  };

  render() {
    let datetimeSelected;
    const { startSleepTimestamps, selectedIndex, endSleepTimestamps } = this.props;
    const { isStart } = this.state;
    const startTimestamp = startSleepTimestamps[selectedIndex];
    const endTimestamp = endSleepTimestamps[selectedIndex];
    if (isStart) {
      datetimeSelected = new Date(startTimestamp);
    } else {
      datetimeSelected = new Date(endTimestamp);
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.handleShowTimePicker(true)}>
          <View style={styles.button}>
            <Text>Edit start time: {displayDateTime(startTimestamp)}</Text>
          </View>
        </TouchableOpacity>
        {endTimestamp && (
          <TouchableOpacity onPress={() => this.handleShowTimePicker(false)}>
            <View style={styles.button}>
              <Text>Edit end time: {displayDateTime(endTimestamp)}</Text>
            </View>
          </TouchableOpacity>
        )}
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode="datetime"
          date={datetimeSelected}
          is24Hour={false}
        />
      </View>
    );
  }
}
export default TimeChange;
