import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { Card, CardSection, Input, Button, Confirm } from './common';
import { connect } from 'dva/mobile';
import { text } from 'react-native-communications';


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
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="Jane"
            value={name}
            onChangeText={value => dispatch({ type: 'employees/employeeName', payload: value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder="555-555-5555"
            value={phone}
            onChangeText={value => dispatch({ type: 'employees/employeePhone', payload: value })}
          />
        </CardSection>

        <CardSection style={pickerCardSection}>
          <Text style={pickerLabelStyle}>Select Shift</Text>
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
        </CardSection>

        <CardSection>
          <Button
            onPress={this.onButtonPress.bind(this)}
          >
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button
            onPress={this.onTextPress.bind(this)}
          >
            Text Schedule
          </Button>
        </CardSection>

        <CardSection>
          <Button
            onPress={() => this.setState({ showModal: !this.state.showModal })}
          >
            Fire Employee
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
           Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}

const styles = {
  pickerCardSection: {
    flexDirection: 'column',
  },
  pickerLabelStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStateToProps = ({ employees }) => {
  const { name, phone, shift } = employees;

  return { name, phone, shift };
};

export default connect(mapStateToProps)(EmployeeCreate);
