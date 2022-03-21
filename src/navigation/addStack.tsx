import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileAdd from '../containers/add/profile.add';
import AddressInfo from '../containers/user/address/address.info';
import GoogleSearch from '../components/map/google.searchAdd';

const Stack = createNativeStackNavigator();

const AddStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'Profile'} component={ProfileAdd} options={{ headerShown: false }} />
            <Stack.Screen name={'AddressInfo'} component={AddressInfo} options={{ headerShown: false }} />
            <Stack.Screen name={'AddressSearch'} component={GoogleSearch} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};
