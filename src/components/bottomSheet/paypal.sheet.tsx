import React, { useState } from 'react';
import { Actionsheet, Box, Center, Divider, Spinner, Text, VStack } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MiniAddressCard from '../card/miniAddress.card';
import { ActivityIndicator, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import BackIcon from '../../assets/icons/back.icon';
import CloseIcon from '../../assets/icons/close.icon';
import WebView from 'react-native-webview';
import { GUP } from '../../utils/gup';
import useAxiosServices from '../../hooks/axiosHooks';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, profileSetting } from '../../store/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../../store';

interface Props {
    open: boolean;
    setOpen: any;
    account?: string;
}
const { width, height } = Dimensions.get('window');

const paypalUrl =
    'https://www.sandbox.paypal.com/signin/authorize?flowEntry=static&client_id=AZGiiuz7QtNs3E-EroUOjpTm34-Y6K6ASqrFshw3XdcoY1b6eDt9VIx6dQVSul16kc39yI7POEFnrjUd&scope=openid email&redirect_uri=https://recan-dev.mirable.cc/paypal';

const PaypalSheet = ({ open, setOpen, account }: Props) => {
    const [authUrl, setAuthUrl] = useState(paypalUrl);
    const [loading, setLoading] = useState(true);
    const { axiosService } = useAxiosServices();
    const dispatch = useDispatch();
    const { appToken } = useSelector((state: RootState) => state.auth);
    const handler = async (url) => {
        const code = GUP('code', url);
        console.log('RESULT', code);
        if (code) {
            try {
                const api = await axiosService.post('/users/login/paypal', { code: code });
                const { result, data } = api.data;
                console.log('Echeck1');
                if (result) {
                    const { accessToken, refreshToken } = data;
                    await AsyncStorage.setItem('accessToken', accessToken);
                    await AsyncStorage.setItem('refreshToken', refreshToken);
                    const getProfile = await axiosService.post('/users/app/profile', { appToken });
                    const { data: profileData, status: profileStatus } = getProfile.data;
                    dispatch(profileSetting({ user: profileData, userRole: profileData.userRole }));
                    dispatch(loginAction());
                    setOpen(false);
                }
            } catch (e) {
                console.log(e);
            }
        }
    };
    return (
        <Actionsheet maxHeight={height} borderRadius={0} hideDragIndicator={true} isOpen={open} onClose={() => setOpen(false)}>
            <Actionsheet.Content maxHeight={height - 40} borderTopRadius={0}>
                <Box w={'100%'} height={'800px'}>
                    <Box p={2} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Text />
                        <TouchableOpacity onPress={() => setOpen(false)}>
                            <CloseIcon />
                        </TouchableOpacity>
                    </Box>
                    <WebView
                        startInLoadingState={true}
                        renderLoading={() => {
                            return (
                                <Center style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(255,255,255,0.4)' }]}>
                                    <Spinner size="lg" color="blue.200" />
                                </Center>
                            );
                        }}
                        onNavigationStateChange={({ url }) => {
                            console.log('current_path', url);
                            handler(url);
                        }}
                        onLoad={() => setLoading(false)}
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: authUrl }}
                    />
                </Box>
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default PaypalSheet;
