import React, { useState } from 'react';
import { Actionsheet, Box, Center, Divider, Spinner, Text, VStack } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MiniAddressCard from '../card/miniAddress.card';
import { ActivityIndicator, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import BackIcon from '../../assets/icons/back.icon';
import CloseIcon from '../../assets/icons/close.icon';
import WebView from 'react-native-webview';

interface Props {
    open: boolean;
    setOpen: any;
    url: string;
    option?: boolean;
}
const { width, height } = Dimensions.get('window');
const barHeight = 10;
const WebSheet = ({ open, setOpen, url, option }: Props) => {
    const [loading, setLoading] = useState(true);
    return (
        <Actionsheet maxHeight={height} borderRadius={0} hideDragIndicator={true} isOpen={open} onClose={() => setOpen(false)}>
            <Actionsheet.Content maxHeight={height - 40} borderTopRadius={0} p={0}>
                <Box w={'100%'} height={'800px'}>
                    <Box m={4} flexDirection={'row'} justifyContent={option ? 'flex-start' : 'flex-end'} alignItems={'center'}>
                        <TouchableOpacity
                            style={{ bottom: 5 }}
                            hitSlop={{ top: 30, left: 30, right: 30, bottom: 30 }}
                            onPress={() => setOpen(false)}
                        >
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
                        onLoad={() => setLoading(false)}
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: url }}
                    />
                </Box>
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default WebSheet;
