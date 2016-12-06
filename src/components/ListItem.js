import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { CardSection } from './common';
import { connect } from 'dva/mobile';
import { Actions } from 'react-native-router-flux';

class ListItem extends Component {
  render() {
    const { name } = this.props.employee;
    return (
      <TouchableWithoutFeedback onPress={() => Actions.employeeEdit({ employee: this.props.employee })}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default connect()(ListItem);
