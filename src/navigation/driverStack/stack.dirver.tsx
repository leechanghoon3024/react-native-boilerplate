import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardDriver from '../../containers/driver/dashboard.dirver';
import DriverList from '../../containers/driver/driver.List';
import { DriverParamList } from '../../@types/navigationTypes';
import DriverView from '../../containers/driver/driver.view';
import CameraView from '../../containers/driver/camera.view';
import ProfilePage from '../../containers/auth/profile.page';
import DriverPickScreen from '../../containers/driver/pick/driver.pickScreen';
import DriverCollection from '../../containers/driver/collection/driver.collection';
import HistoryScreen from '../../containers/driver/pick/history.screen';

const Stack = createNativeStackNavigator<DriverParamList>();

const StackDriver = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'HomeScreen'} component={DashboardDriver} options={{ headerShown: false }} />
            <Stack.Screen name={'WaitList'} component={DriverList} initialParams={{ title: 'WaitList' }} options={{ headerShown: false }} />
            <Stack.Screen name={'ProfileDriver'} component={ProfilePage} options={{ headerShown: false }} />
            <Stack.Screen name={'PickList'} component={DriverPickScreen} options={{ headerShown: false }} />
            <Stack.Screen name={'HistoryScreen'} component={HistoryScreen} options={{ headerShown: false }} />
            <Stack.Screen name={'DriverCollection'} component={DriverCollection} options={{ headerShown: false }} />

            <Stack.Screen
                name={'DrivingList'}
                component={DriverList}
                initialParams={{ title: 'DrivingList' }}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={'CompleteList'}
                initialParams={{ title: 'CompleteList' }}
                component={DriverList}
                options={{ headerShown: false }}
            />
            <Stack.Screen name={'DriverView'} component={DriverView} options={{ headerShown: false }} />
            <Stack.Screen name={'Qrcode'} component={CameraView} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default StackDriver;
