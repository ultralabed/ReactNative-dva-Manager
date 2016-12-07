import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import SplashScreen from './components/SplashScreen';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';
import { connect } from 'dva/mobile';

class RouterComponent extends Component {
  render() {
    return (
      <Router sceneStyle={{ paddingTop: 65 }}>
        <Scene key="screen">
          <Scene key="splash" component={SplashScreen} hideNavBar={true} initial/>
        </Scene>
        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Please Login" initial/>
        </Scene>
        <Scene key="main">
          <Scene 
            key="employeeList"
            component={EmployeeList}
            title="Employees"
            onRight={() => Actions.employeeCreate()}
            rightTitle="Add"
            onLeft={() => this.props.dispatch({ type: 'auth/logoutUser' })}
            leftTitle="Logout"
            initial
          />
          <Scene 
            key="employeeCreate"
            component={EmployeeCreate}
            title="Employee"
          />
          <Scene
            key="employeeEdit"
            component={EmployeeEdit}
            title="Edit Employee"
          />
          </Scene>
      </Router>
    );
  };
};

export default connect()(RouterComponent);
