/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { Box, Button, Center, HStack, Image, NativeBaseProvider, View, VStack } from 'native-base';
import { WebView } from 'react-native-webview';
import theme from './themes';
import { Provider } from 'react-redux';
import { store } from './store';
import RootNavigation from './navigation/RootNavigation';

const Logo = require('./assets/logo/recan-colour-logo.png');
const BackGroundImage = require('./assets/background/background1.png');

const config = {
    dependencies: {
        'linear-gradient': require('react-native-linear-gradient').default,
    },
};
const App = () => {
    return (
        <NativeBaseProvider theme={theme} config={config}>
            <Provider store={store}>
                <RootNavigation />
            </Provider>
        </NativeBaseProvider>
    );
};
export default App;
