import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackDepot from '../depotStack/stack.depot';

const Drawer = createDrawerNavigator();

const DrawerDepot = () => {
    return (
        <Drawer.Navigator initialRouteName="Home" screenOptions={{ gestureEnabled: false }}>
            <Drawer.Screen name="Drawer-Driver" component={StackDepot} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
};

export default DrawerDepot;
