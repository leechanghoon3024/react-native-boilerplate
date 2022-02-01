import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackUser from '../usetStack/stack.user';
import SideBarDriver from '../../containers/driver/sideBar.driver';
import SideBarUser from '../../containers/user/sideBar.user';

const Drawer = createDrawerNavigator();

const DrawerUser = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerType: 'front',
                drawerStyle: {
                    width: 300,
                },
            }}
            initialRouteName="Home"
            drawerContent={() => <SideBarUser />}
        >
            <Drawer.Screen name="Home" component={StackUser} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
};

export default DrawerUser;
