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
import { ImageBackground } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import RootNavigation from './src/navigation/RootNavigation';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Logo = require('./src/assets/logo/recan-colour-logo.png');
const BackGroundImage = require('./src/assets/background/background1.png');
function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

const LogoScreen = () => {
    return (
        <ImageBackground style={{ flex: 1 }} source={BackGroundImage} resizeMode={'stretch'}>
            <Center flex={1} px="3">
                <Image source={Logo} alt="Alternate Text" width={210} height={60} />
            </Center>
        </ImageBackground>
    );
};

const TestScreen = () => {
    return (
        <Box bg="primary.600" py="4" px="3" my="10" rounded="md" alignSelf="center" width={375} maxWidth="100%">
            <HStack justifyContent="space-between">
                <VStack space="2">
                    <Text fontFamily="Arch" fontWeight={900} fontStyle="normal" fontSize={20}>
                        Typography
                    </Text>
                    <Text fontFamily="Lato" fontWeight={900} fontStyle="normal" fontSize={20}>
                        Typography
                    </Text>
                </VStack>
            </HStack>
        </Box>
    );
};

const App = () => {
    return (
        <NativeBaseProvider theme={theme}>
            <Provider store={store}>
                <RootNavigation />
            </Provider>
        </NativeBaseProvider>
    );
};
export default App;
