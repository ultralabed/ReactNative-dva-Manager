import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import dva, { connect } from 'dva/mobile';
import testModel from './src/models/test';

const app = dva();

app.model(testModel);

app.router(() => <App />);

AppRegistry.registerComponent('dvaReactNativeManager', () => app.start());
