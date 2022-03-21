import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackUser from '../usetStack/stack.user';
import SideBarDriver from '../../containers/driver/sideBar.driver';
import SideBarUser from '../../containers/user/sideBar.user';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileAdd from '../../containers/add/profile.add';
import AddressInfo from '../../containers/user/address/address.info';
import GoogleSearch from '../../components/map/google.search';
import AddressInfoAdd from '../../containers/add/address/address.info';
import GoogleSearchAdd from '../../components/map/google.searchAdd';

const Drawer = createDrawerNavigator();
const useInitialRender = () => {
    const [isInitialRender, setIsInitialRender] = React.useState(false);

    if (!isInitialRender) {
        setTimeout(() => setIsInitialRender(true), 2000);
        return true;
    }
    return false;
};

const Stack = createNativeStackNavigator();

const RootUser = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigation = useNavigation();
    const check = user?.userType === 1 ? user?.profileCheck === 1 : user?.businessCheck === 1;
    const addressCheck = user?.addressCheck === 1;
    console.log('addressCheck', addressCheck);
    if (!check) {
        return (
            <Stack.Navigator>
                <Stack.Screen name={'Profile'} component={ProfileAdd} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
    if (!addressCheck) {
        return (
            <Stack.Navigator>
                <Stack.Screen name={'AddressSearch'} component={GoogleSearchAdd} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
    return <DrawerUser />;
};

const DrawerUser = () => {
    const isInitialRender = useInitialRender();

    return (
        <Drawer.Navigator
            screenOptions={{
                swipeEnabled: false,
                drawerType: 'front',
                drawerStyle: {
                    width: isInitialRender ? 0 : 280,
                },
            }}
            initialRouteName="Home"
            drawerContent={() => (isInitialRender ? null : <SideBarUser />)}
        >
            <Drawer.Screen name="2" component={StackUser} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
};

export default RootUser;
