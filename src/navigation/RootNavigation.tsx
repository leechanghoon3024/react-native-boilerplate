import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import DrawerUser from './Drawers/Drawer.user';
import StackAuth from './AuthStack/stack.auth';
import DrawerDriver from './Drawers/Drawer.driver';
import DrawerDepot from './Drawers/Drawer.depot';
import useAxiosServices from '../hooks/axiosHooks';
import { Box, Center, Spinner, Text, useToast } from 'native-base';
import { Alert, StyleSheet } from 'react-native';
import { loginAction, logoutAction, profileSetting, tokenSetting } from '../store/authReducer';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import FcmUser from '../components/fcm.user';

async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    return enabled;
}

const RootNavigation = () => {
    const { userRole, isLogin, appToken } = useSelector((state: RootState) => state.auth);
    const { isLoading } = useSelector((state: RootState) => state.common);
    const { axiosService, serviceToken } = useAxiosServices();
    const toast = useToast();
    const dispatch = useDispatch();
    useEffect(() => {
        getHeathCehck();
    }, []);
    const getHeathCehck = async () => {
        const check = await axiosService.get('/health/check');
        const pushEnabled = await requestUserPermission();
        if (pushEnabled) {
            const token = await messaging().getToken();
            dispatch(tokenSetting(token));
        } else {
            Alert.alert('IOS alarm is not on', 'Please allow notifications after going to settings > App');
        }
        await loginHandler();
    };
    const loginHandler = async () => {
        try {
            const getProfile = await axiosService.post('/users/app/profile', { appToken });
            const { data: profileData, status: profileStatus } = getProfile.data;
            if (profileStatus) {
                dispatch(profileSetting({ user: profileData, userRole: profileData.userRole }));
                dispatch(loginAction());
            } else {
                toast.show({
                    placement: 'top',
                    description: 'Complete',
                    render: () => {
                        return (
                            <Box
                                justifyContent={'center'}
                                alignContent={'center'}
                                w={'200px'}
                                bg="blue.200"
                                px="2"
                                py="2"
                                rounded="sm"
                                mb={5}
                            >
                                <Text color={'white.100'} textAlign={'center'}>
                                    Error
                                </Text>
                            </Box>
                        );
                    },
                });
            }
        } catch (e) {
            dispatch(logoutAction());
        } finally {
        }
    };

    return (
        <>
            <FcmUser />
            <NavigationContainer>
                {!isLogin ? (
                    <StackAuth />
                ) : userRole === 1 ? (
                    <DrawerUser />
                ) : userRole === 2 ? (
                    <DrawerDriver />
                ) : userRole === 3 ? (
                    <DrawerDepot />
                ) : (
                    <StackAuth />
                )}
            </NavigationContainer>
            {isLoading && (
                <Center style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(255,255,255,0.4)' }]}>
                    <Spinner size="lg" color="blue.200" />
                </Center>
            )}
        </>
    );
};

export default RootNavigation;
