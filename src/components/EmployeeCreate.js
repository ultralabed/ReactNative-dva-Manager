import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { Card, CardSection, Input, Button } from './common';
import { connect } from 'dva/mobile';

class EmployeeCreate extends Component {
  componentWillMount() {
    setTimeout(() => {
      this.props.dispatch({ type: 'employees/employeeCreateClear' });
    }, 0);
  }

  render() {
    const { name, phone, shift, dispatch } = this.props;
    console.log(this.props);
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
            onPress={() =>  dispatch({ type: 'employees/employeeCreate', payload: { name, phone, shift: shift || 'Monday' } })}
          >
            Create
          </Button>
        </CardSection>
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
