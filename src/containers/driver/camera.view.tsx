import React, { useEffect, useRef, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Box, Button, HStack, Image, Text, useToast } from 'native-base';
import PickSheet from '../../components/bottomSheet/pick.sheet';
import { CameraScreen } from 'react-native-camera-kit';
import { Alert, TouchableOpacity } from 'react-native';
import DetailSheet from '../../components/bottomSheet/detail.sheet';
import useAxiosServices from '../../hooks/axiosHooks';
import { DriverParamList } from '../../@types/navigationTypes';
import CameraSheet from '../../components/bottomSheet/camera.sheet';
import BackIcon from '../../assets/icons/back.icon';

const LeftArrow = require('../../assets/icons/back-white.png');
const CameraView = () => {
    const route = useRoute<RouteProp<DriverParamList, 'Qrcode'>>();
    const { idx, address, customer } = route.params;
    const navigation = useNavigation();
    const { axiosService } = useAxiosServices();
    const [sheetOpen, setSheetOpen] = useState(false);
    const [code, setCode] = useState('');
    const cameraRef = useRef<CameraScreen>();
    const [apiCode, setApiCode] = useState(false);
    const toast = useToast();
    const getAccept = async () => {
        try {
            setSheetOpen(false);
            const api = await axiosService.post('/pick/driver/code/accept', { idx, code });
            const { status, data } = api.data;
            if (status) {
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
                                    {data}
                                </Text>
                            </Box>
                        );
                    },
                });
                navigation.goBack();
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
                                bg="red.100"
                                px="2"
                                py="2"
                                rounded="sm"
                                mb={5}
                            >
                                <Text color={'white.100'} textAlign={'center'}>
                                    {data}
                                </Text>
                            </Box>
                        );
                    },
                });
            }
        } catch (e) {}
    };

    const getCode = async (v: any) => {
        setCode(v);
        setSheetOpen(true);
    };

    return (
        <>
            <Box flex={1} my={2}>
                <Box w={'100%'} h={'100%'}>
                    <Box safeAreaTop bg={'blue.200'} px={2} pb={2}>
                        <HStack alignItems={'center'} justifyContent={'space-between'}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <BackIcon color={'#fff'} />
                            </TouchableOpacity>
                            <Box flexDirection={'row'} alignItems={'center'}>
                                {/*{step === 5 && (*/}
                                {/*    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => modalHandler('close')}>*/}
                                {/*        <Text fontFamily={'Arch'} fontWeight={500} fontSize={'14px'} color={'blue.200'}>*/}
                                {/*            Cancel*/}
                                {/*        </Text>*/}
                                {/*    </TouchableOpacity>*/}
                                {/*)}*/}
                            </Box>
                        </HStack>
                    </Box>
                    {/*@ts-ignore*/}
                    <CameraScreen
                        scanBarcode={true}
                        showFrame={true}
                        onReadCode={(event) => {
                            getCode(event.nativeEvent.codeStringValue);
                        }} // optional
                        hideControls={true}
                    />
                </Box>
                <CameraSheet
                    address={address}
                    code={code}
                    customer={customer}
                    open={sheetOpen}
                    onHandler={setSheetOpen}
                    navigation={navigation}
                    getAccept={getAccept}
                />
            </Box>
        </>
    );
};

export default CameraView;
