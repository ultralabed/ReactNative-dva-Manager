import React, { Component } from 'react';
import { Picker, Text, View } from 'react-native';
import { Confirm } from '../components/common';
import { connect } from 'dva/mobile';
import { text } from 'react-native-communications';
import { Button, WingBlank, InputItem, List, WhiteSpace } from 'antd-mobile';


class EmployeeCreate extends Component {
  state = { showModal: false }

  componentWillMount() {
    setTimeout(() => {
      this.props.dispatch({ type: 'employees/employeeName', payload: this.props.employee.name });
      this.props.dispatch({ type: 'employees/employeePhone', payload: this.props.employee.phone });
      this.props.dispatch({ type: 'employees/employeeShift', payload: this.props.employee.shift });
    }, 0);
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.dispatch({ type: 'employees/employeeSave', payload: { name, phone, shift, uid: this.props.employee.uid } });
  }

  onTextPress() {
    const { phone, shift } = this.props;

    text(phone, `Your upcoming shift is on ${shift}`);
  }

  onAccept() {
    this.props.dispatch({ type: 'employees/employeeDelete', payload: { uid: this.props.employee.uid } });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    const { name, phone, shift, dispatch } = this.props;
    const { pickerLabelStyle, pickerCardSection } = styles;
    
    return (
      <View>
        <List>
          <InputItem
            clear
            value={name}
            onChange={value => dispatch({ type: 'employees/employeeName', payload: value })}
            placeholder="Jane"
            labelNumber={7}
          >Name
          </InputItem>
          <InputItem
            clear
            value={phone}
            onChange={value => dispatch({ type: 'employees/employeePhone', payload: value })}
            placeholder="555-555-5555"
            labelNumber={7}
          >Phone
          </InputItem>

          <Text style={pickerLabelStyle}>Select Shift</Text>
          <WingBlank style={pickerCardSection}>
            <Picker
              selectedValue={shift}
              onValueChange={value => dispatch({ type: 'employees/employeeShift', payload: value })}
            >
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednesday" value="Wednesday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Friday" value="Friday" />
              <Picker.Item label="Saturday" value="Saturday" />
              <Picker.Item label="Sunday" value="Sunday" />
            </Picker>
          </WingBlank>

          <WhiteSpace />
          <WingBlank>
            <Button
              onClick={this.onButtonPress.bind(this)}
              type="primary">
                Save Changes
            </Button>
          </WingBlank>
          <WhiteSpace />

          <WhiteSpace />
          <WingBlank>
            <Button
              onClick={this.onTextPress.bind(this)}
              type="ghost">
                Text Schedule
            </Button>
          </WingBlank>
          <WhiteSpace />

          <WhiteSpace />
          <WingBlank>
            <Button
              onClick={() => this.setState({ showModal: !this.state.showModal })}
              type="warning">
                Fire Employee
            </Button>
          </WingBlank>
          <WhiteSpace />
        </List>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
           Are you sure you want to delete this?
        </Confirm>
      </View>
    );
  }
}

const styles = {
  pickerCardSection: {
    flexDirection: 'column',
  },
  pickerLabelStyle: {
    fontSize: 18,
    paddingLeft: 15,
    paddingTop: 5,
  }
};

const mapStateToProps = ({ employees }) => {
  const { name, phone, shift } = employees;

  return { name, phone, shift };
};

export default connect(mapStateToProps)(EmployeeCreate);
