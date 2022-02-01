import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackDriver from '../driverStack/stack.dirver';
import SideBarDriver from '../../containers/driver/sideBar.driver';

const Drawer = createDrawerNavigator();

const DrawerDriver = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerType: 'front',
                drawerStyle: {
                    width: 300,
                },
            }}
            initialRouteName="Home"
            drawerContent={() => <SideBarDriver />}
        >
            <Drawer.Screen name="Drawer-Driver" component={StackDriver} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
};

export default DrawerDriver;
