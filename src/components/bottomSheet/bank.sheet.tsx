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
import { useDispatch } from 'react-redux';
import { profileSetting } from '../../store/authReducer';

interface Props {
    open: boolean;
    setOpen: any;
    account?: string;
}
const { width, height } = Dimensions.get('window');

const BankSheet = ({ open, setOpen, account }: Props) => {
    const [authUrl, setAuthUrl] = useState('https://go.sandbox.split.cash/invite_contact/recan?');
    const [loading, setLoading] = useState(true);
    const { axiosService } = useAxiosServices();
    const dispatch = useDispatch();
    const testing = () => {
        setAuthUrl('https://go.sandbox.split.cash/invite_contact/recan?contact_id=3179e421-3a26-460b-9aed-a51610f0c348');
    };
    const handler = async (url) => {
        const result = GUP('contact_id', url);
        if (result) {
            const TEMP = '3179e421-3a26-460b-9aed-a51610f0c348';
            const api = await axiosService.post('/users/app/bank/update', { id: TEMP });
            const { status, data } = api.data;
            if (status) {
                dispatch(profileSetting({ user: data, userRole: data.userRole }));
                setOpen(false);
            }
        }
    };
    return (
        <Actionsheet maxHeight={height} borderRadius={0} hideDragIndicator={true} isOpen={open} onClose={() => setOpen(false)}>
            <Actionsheet.Content maxHeight={height - 40} borderTopRadius={0}>
                <Box w={'100%'} height={'800px'}>
                    <Box p={2} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Text />
                        <TouchableOpacity onPress={() => setOpen(false)} onLongPress={() => testing()}>
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

export default BankSheet;
