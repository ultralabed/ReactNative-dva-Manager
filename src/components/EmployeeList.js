import _ from 'lodash';
import React, { Component } from 'react';
import {
  Text,
  ListView,
} from 'react-native';
import { connect } from 'dva/mobile';
import { Card, CardSection, Input, Button, Spinner } from './common';
import ListItem from './ListItem';

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

    return <ListItem employee={employee} />;
  }

  render(dispatch) {
    return (
      <Card>
        <ListView 
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
        <CardSection>
          { this.props.isLoading ? <Spinner size='large'/> : null }
        </CardSection>
      </Card>
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
