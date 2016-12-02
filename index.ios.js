import React from 'react';
import { AppRegistry } from 'react-native';
import Router from './src/Router';
import dva, { connect } from 'dva/mobile';
import testModel from './src/models/test';

const app = dva();

app.model(testModel);

app.router(() => <Router />);

AppRegistry.registerComponent('dvaReactNativeManager', () => app.start());
