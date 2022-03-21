import React, { ReactElement } from 'react';
import { AppRegistry, Platform } from 'react-native';
import RootC from './App';
export function App(): ReactElement {
    return <RootC />;
}

AppRegistry.registerComponent('recanapplication', () => App);
if (Platform.OS === 'web') {
    AppRegistry.runApplication('recanapplication', {
        rootTag: document.getElementById('app'),
    });
}
