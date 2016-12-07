import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';
import { connect } from 'dva/mobile';
import { Actions } from 'react-native-router-flux';
import { ListView, List, ActivityIndicator, WhiteSpace } from 'antd-mobile';


class EmployeeList extends Component {
  componentWillMount() {
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be render with
    //this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ employeeList }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employeeList);
  }

  renderRow(employee) {
    const Item = List.Item;

    return (
      <Item
        onClick={() => Actions.employeeEdit({ employee })}
        extra="More"
        arrow="horizontal"
        >
          {employee.name}
      </Item>
    );
  }

  render(dispatch) {
    return (
      <ScrollView>
        <ListView 
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
        { this.props.isLoading ?
          <View>
            <WhiteSpace />
            <ActivityIndicator text="Fetching Employee List" />
            <WhiteSpace />
          </View>
          :
          null
        }
      </ScrollView>
    );
  }
};

const mapStateToProps = ({ employees }) => {
  const { isLoading } = employees;
  const employeeList = _.map(employees.employeeList, (val, uid) => {
    return { ...val, uid };
  });
  return {
    employeeList,
    isLoading,
  };
};

export default  connect(mapStateToProps)(EmployeeList);
