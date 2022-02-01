import React, { useState } from 'react';
import { Text, Box, VStack, Divider, Button } from 'native-base';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { ImageBackground, Linking, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutAction } from '../../store/authReducer';
import InfoModal from './confirm/info.modal';
const BackGround = require('../../assets/background/background1.png');
const SideBarUser = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const goToHandler = (name: string) => {
        navigation.navigate({ name } as any);
        navigation.dispatch(DrawerActions.closeDrawer());
    };

    const logOut = async () => {
        dispatch(logoutAction());
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
    };
    const openLink = async () => {
        const supported = await Linking.canOpenURL('https://www.recan.co/work-with-us');
        if (supported) {
            await Linking.openURL('https://www.recan.co/work-with-us');
        }
    };
    const [openInfo, setOpenInfo] = useState(false);

    const openCollection = () => {
        if (user?.profileCheck === 1 && user?.addressCheck === 1) {
            navigation.navigate('Collection' as never);
        } else {
            setOpenInfo(true);
        }
    };
    return (
        <>
            <Box style={{ flex: 1 }}>
                <ImageBackground source={BackGround} resizeMode={'stretch'}>
                    <Box py={10} pt={'100px'} px={5}>
                        <Box>
                            <Text fontWeight={700} fontSize={'28px'} fontFamily={'Arch'} color={'white.100'}>
                                Hi, {`${user?.userName ?? 'User'}`}
                            </Text>
                            <Text fontWeight={500} fontSize={'20px'} fontFamily={'Lato'} color={'gray.100'}>
                                {/*00-00001*/}
                            </Text>
                            <Button mt={'40px'} variant={'basicButton'} bg={'white.100'} onPress={() => openCollection()}>
                                <Text fontWeight={500} fontSize={'20px'} fontFamily={'Lato'} color={'black.100'}>
                                    Book a Collection
                                </Text>
                            </Button>
                        </Box>
                    </Box>
                    <Box bg={'white.100'}>
                        <VStack space={2}>
                            <Box px={5} py={4} pb={2} justifyContent={'center'}>
                                <TouchableOpacity onPress={() => goToHandler('CollectionList')}>
                                    <Text fontWeight={700} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                        Collections
                                    </Text>
                                </TouchableOpacity>
                            </Box>
                            <Divider />
                            <TouchableOpacity onPress={() => goToHandler('ProfileUser')}>
                                <Box px={5} py={4} pb={2} justifyContent={'center'}>
                                    <Text fontWeight={100} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                        Account
                                    </Text>
                                </Box>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => goToHandler('RedeemScreen')}>
                                <Box px={5} py={4} pb={2} justifyContent={'center'}>
                                    <Text fontWeight={100} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                        Redeem
                                    </Text>
                                </Box>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => goToHandler('TransActionList')}>
                                <Box px={5} py={4} pb={2} justifyContent={'center'}>
                                    <Text fontWeight={100} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                        Transactions
                                    </Text>
                                </Box>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Address')}>
                                <Box px={5} py={4} pb={2} justifyContent={'center'}>
                                    <Text fontWeight={100} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                        Pickup address
                                    </Text>
                                </Box>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openLink()}>
                                <Box px={5} py={4} pb={2} justifyContent={'center'}>
                                    <Text fontWeight={100} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                        Contact us
                                    </Text>
                                </Box>
                            </TouchableOpacity>
                            <Divider />
                            {/*<TouchableOpacity onPress={() => goToHandler('DrivingList')}>*/}
                            {/*    <Box px={5} py={4} pb={2} justifyContent={'center'}>*/}
                            {/*        <Text fontWeight={100} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>*/}
                            {/*            Business account*/}
                            {/*        </Text>*/}
                            {/*    </Box>*/}
                            {/*</TouchableOpacity>*/}
                            <TouchableOpacity onPress={() => logOut()}>
                                <Box px={5} py={4} pb={2} justifyContent={'center'}>
                                    <Text fontWeight={100} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                        Sign out
                                    </Text>
                                </Box>
                            </TouchableOpacity>
                        </VStack>
                    </Box>
                </ImageBackground>
            </Box>
            <InfoModal open={openInfo} setOpen={setOpenInfo} />
        </>
    );
};

export default SideBarUser;
