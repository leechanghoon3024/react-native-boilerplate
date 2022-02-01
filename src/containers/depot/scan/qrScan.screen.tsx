import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, HStack, Image, Text } from 'native-base';
import PickSheet from '../../components/bottomSheet/pick.sheet';
import { CameraScreen } from 'react-native-camera-kit';
import { Alert, TouchableOpacity } from 'react-native';
import useAxiosServices from '../../../hooks/axiosHooks';
import CheckSheet from '../../../components/bottomSheet/check.sheet';
const LeftArrow = require('../../../assets/icons/back-white.png');

const QrScanScreen = () => {
    const navigation = useNavigation();
    const [code, setCode] = useState('');
    const [sheetOpen, setSheetOpen] = useState(false);
    const cameraRef = useRef<CameraScreen>();
    const { axiosService } = useAxiosServices();
    const goToHandler = () => {
        setSheetOpen((p) => !p);
        navigation.navigate('BagScanScreen', { code: 'AAAA-002' });
    };
    const getCode = async (v) => {
        setCode(v);
        setSheetOpen(true);
    };
    const getAccept = async () => {
        try {
            setSheetOpen(false);
            const api = await axiosService.post('/pick/depot/codeCheck', { code });
            const { status, data } = api.data;
            if (status) {
                navigation.navigate('BagScanScreen', { code, idx: data });
            } else {
                Alert.alert(data);
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <>
            <Box flex={1} my={2}>
                <Box w={'100%'} h={'100%'}>
                    <Box safeArea safeAreaBottom={0} bg={'blue.100'}>
                        <HStack alignItems={'center'} justifyContent={'space-between'}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Image source={LeftArrow} alt={'leftArrow'} />
                            </TouchableOpacity>
                        </HStack>
                    </Box>
                    <CameraScreen
                        scanBarcode={true}
                        showFrame={true}
                        onReadCode={(event) => getCode(event.nativeEvent.codeStringValue)} // optional
                        hideControls={true}
                    />
                </Box>
            </Box>
            <CheckSheet open={sheetOpen} onHandler={setSheetOpen} getAccept={getAccept} code={code} />
        </>
    );
};

export default QrScanScreen;
