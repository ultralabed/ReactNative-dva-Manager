import React from 'react';
import { AppRegistry } from 'react-native';
import Router from './src/Router';
import dva, { connect } from 'dva/mobile';
import authModel from './src/models/auth';
import employeeModel from './src/models/employee';

const app = dva();

app.model(authModel);
app.model(employeeModel);

app.router(() => <Router />);

AppRegistry.registerComponent('dvaReactNativeManager', () => app.start());
