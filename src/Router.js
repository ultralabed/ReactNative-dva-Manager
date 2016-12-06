import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

class RouterComponent extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDdkeyJhBUM9Z3OUiY3cAmsS1UwtSH1ziI',
      authDomain: 'manager-443ae.firebaseapp.com',
      databaseURL: 'https://manager-443ae.firebaseio.com',
      storageBucket: 'manager-443ae.appspot.com',
      messagingSenderId: '858458307799'
    });
  }

  render() {
    return (
      <Router sceneStyle={{ paddingTop: 65 }}>
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

export default RouterComponent;
