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
import theme from './src/themes';
import { Text } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ImageBackground, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import RootNavigation from './src/navigation/RootNavigation';
import Toast from 'react-native-toast-message';
import FcmUser from './src/components/fcm.user';

const toastConfig = {
    success: ({ title, content }: any) => (
        <View style={[ToastStyle.container]}>
            <Text style={[{ width: 350 }]}>{title}</Text>
            <Text style={[{ width: 350 }]}>{content}</Text>
        </View>
    ),
    error: () => {},
    info: () => {},
    any_custom_type: () => {},
};

const App = () => {
    return (
        <NativeBaseProvider theme={theme}>
            <Provider store={store}>
                <RootNavigation />
            </Provider>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </NativeBaseProvider>
    );
};

const shadow = {
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
};

const ToastStyle = StyleSheet.create({
    container: {
        ...shadow,
        borderRadius: 18,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: 368,
        height: 70,
        backgroundColor: '#222222E6',
        flexDirection: 'row',
    },
});

export default App;
