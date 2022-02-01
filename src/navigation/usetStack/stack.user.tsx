import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardUser from '../../containers/user/dashboard.user';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FirstAgree from '../../containers/user/collections/first.agree';
import { View } from 'native-base';
import DoneView from '../../containers/user/collections/done.view';
import MainCollection from '../../containers/user/collections/main.collection';
import AddressInfo from '../../containers/user/address/address.info';
import AddressSearch from '../../containers/user/address/address.search';
import ProfilePage from '../../containers/auth/profile.page';
import GoogleSearch from '../../components/map/google.search';
import DetailCollection from '../../containers/user/collections/detail.collection';
import RedeemMain from '../../containers/user/redeem/redeem.main';
import RedeemSelect from '../../containers/user/redeem/redeem.select';
import RedeemCharitied from '../../containers/user/redeem/redeem.charitied';
import CharityDetail from '../../containers/user/redeem/charity.detail';
import PayoutDetail from '../../containers/user/redeem/payout.detail';
import CollectionList from '../../containers/user/collections/collection.list';
import TransActionList from '../../containers/user/transaction/transaction.list';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const DashBoardUser = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'Home'} component={DashboardUser} options={{ headerShown: false }} />
            <Stack.Screen name={'ProfileUser'} component={ProfilePage} options={{ headerShown: false }} />
            <Stack.Screen name={'DetailScreen'} component={DetailCollection} options={{ headerShown: false }} />
            <Stack.Screen name={'RedeemScreen'} component={RedeemMain} options={{ headerShown: false }} />
            <Stack.Screen name={'RedeemSelectScreen'} component={RedeemSelect} options={{ headerShown: false }} />
            <Stack.Screen name={'RedeemCharitied'} component={RedeemCharitied} options={{ headerShown: false }} />
            <Stack.Screen name={'CharityDetail'} component={CharityDetail} options={{ headerShown: false }} />
            <Stack.Screen name={'PayoutDetail'} component={PayoutDetail} options={{ headerShown: false }} />
            <Stack.Screen name={'CollectionList'} component={CollectionList} options={{ headerShown: false }} />
            <Stack.Screen name={'TransActionList'} component={TransActionList} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

const CollectionUser = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'FirstAgree'} component={FirstAgree} options={{ headerShown: false }} />
            <Stack.Screen name={'DoneView'} component={DoneView} options={{ headerShown: false }} />
            <Stack.Screen name={'MainCollection'} component={MainCollection} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

const AddressUser = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'AddressInfo'} component={AddressInfo} options={{ headerShown: false }} />
            <Stack.Screen name={'AddressSearch'} component={GoogleSearch} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};
const StackUser = () => {
    return (
        <Tab.Navigator initialRouteName={'Main'} tabBar={() => <View />} screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Main" component={DashBoardUser} />
            <Tab.Screen name="Collection" component={CollectionUser} />
            <Tab.Screen name="Address" component={AddressUser} />
        </Tab.Navigator>
    );
};
export default StackUser;
