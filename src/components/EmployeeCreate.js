import React, { Component } from 'react';
import { Picker, Text, View } from 'react-native';
import { connect } from 'dva/mobile';
import { Button, WingBlank, InputItem, List, WhiteSpace, } from 'antd-mobile';

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
              onClick={() => dispatch({ type: 'employees/employeeCreate', payload: { name, phone, shift: shift || 'Monday' } })}
              type="primary">
                Create
            </Button>
          </WingBlank>
        </List>
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
