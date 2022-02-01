import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardDepot from '../../containers/depot/dashborad.depot';
import { DepotParamList } from '../../@types/navigationTypes';
import QrScanScreen from '../../containers/depot/scan/qrScan.screen';
import BagScanScreen from '../../containers/depot/scan/bagScan.screen';
import ScanFind from '../../containers/depot/scan/scan.find';
import ScanDetail from '../../containers/depot/scan/scan.detail';
import CalculateScreen from '../../containers/depot/scan/CalculateScreen';
import CacluateDoen from '../../containers/depot/scan/cacluateDoen';
import DepotList from '../../containers/depot/list/depot.list';
import DepotDetail from '../../containers/depot/list/depot.detail';
import SettingPage from '../../containers/depot/setting.page';

const Stack = createNativeStackNavigator<DepotParamList>();

const StackDepot = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'HomeScreen'} component={DashboardDepot} options={{ headerShown: false }} />
            <Stack.Screen name={'QrScanScreen'} component={QrScanScreen} options={{ headerShown: false }} />
            <Stack.Screen name={'BagScanScreen'} component={BagScanScreen} options={{ headerShown: false }} />
            <Stack.Screen name={'ScanFind'} component={ScanFind} options={{ headerShown: false }} />
            <Stack.Screen name={'ScanDetail'} component={ScanDetail} options={{ headerShown: false }} />
            <Stack.Screen name={'CalculateScreen'} component={CalculateScreen} options={{ headerShown: false }} />
            <Stack.Screen name={'CalculateDone'} component={CacluateDoen} options={{ headerShown: false }} />
            <Stack.Screen name={'DepotList'} component={DepotList} options={{ headerShown: false }} />
            <Stack.Screen name={'DepotDetail'} component={DepotDetail} options={{ headerShown: false }} />
            <Stack.Screen name={'Setting'} component={SettingPage} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default StackDepot;
