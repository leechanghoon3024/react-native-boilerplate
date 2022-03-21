import React from 'react';
import { Button, View, Text, Box, VStack, Center, Divider, Image } from 'native-base';
import { DriverStackParamList } from '../../@types/navigationTypes';
import { ImageBackground, TouchableOpacity, Image as RNImage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logoutAction } from '../../store/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BackGround = require('../../assets/background/Sidebar_background.png');
const DriverLogo = require('../../assets/icons/driver-logo.png');
const SideBarDriver = () => {
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
    return (
        <Box style={{ flex: 1 }}>
            <RNImage source={BackGround} style={{ resizeMode: 'stretch', width: 300, height: 500, position: 'absolute', zIndex: 1 }} />
            <Box zIndex={2}>
                <Box py={0} pt={'70px'} px={8}>
                    <Box mb={10} justifyContent={'flex-end'} alignItems={'flex-end'}>
                        <Image h={'50px'} w={'100px'} source={DriverLogo} alt={'driver'} />
                    </Box>
                    <Box>
                        <Box>
                            <Text fontWeight={700} fontSize={'31px'} fontFamily={'Lato'} color={'white.100'}>
                                {`Hi, ${user?.userName}!`}
                            </Text>
                            <Text fontWeight={'500'} fontSize={'23px'} fontFamily={'Lato'} color={'gray.200'}></Text>
                            {/*<Button mt={'80px'} variant={'basicButton'} bg={'white.100'}>*/}
                            {/*    <Text fontWeight={'500'} fontSize={'20px'} fontFamily={'Lato'} color={'black.100'}>*/}
                            {/*        Book a Collection*/}
                            {/*    </Text>*/}
                            {/*</Button>*/}
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box flex={1} zIndex={2} bg={'white.100'}>
                <VStack>
                    <Box px={10} py={5}>
                        <TouchableOpacity onPress={() => goToHandler('PickList')}>
                            <Text fontWeight={700} fontSize={'21px'} fontFamily={'Arch'} color={'black.300'}>
                                Collections
                            </Text>
                        </TouchableOpacity>
                    </Box>
                    <Divider />
                    <TouchableOpacity onPress={() => goToHandler('ProfileDriver')}>
                        <Box px={10} py={5} justifyContent={'space-between'} flexDirection={'row'}>
                            <Text fontWeight={100} fontSize={'21px'} fontFamily={'Arch'} color={'gray.300'}>
                                Profile
                            </Text>
                        </Box>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => goToHandler('HistoryScreen')}>
                        <Box px={10} py={5} justifyContent={'space-between'} flexDirection={'row'}>
                            <Text fontWeight={100} fontSize={'21px'} fontFamily={'Arch'} color={'gray.300'}>
                                History
                            </Text>
                        </Box>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => goToHandler('CompleteList')}>
                        <Box px={10} py={5} justifyContent={'space-between'} flexDirection={'row'}>
                            <Text fontWeight={100} fontSize={'21px'} fontFamily={'Arch'} color={'gray.300'}>
                                Help
                            </Text>
                        </Box>
                    </TouchableOpacity>
                </VStack>
            </Box>
            <Divider />
            <Box safeAreaBottom p={4} px={6} pb={10}>
                <TouchableOpacity onPress={() => logOut()}>
                    <Box justifyContent={'space-between'} flexDirection={'row'}>
                        <Text fontWeight={600} fontSize={'18px'} fontFamily={'Arch'} color={'gray.300'}>
                            Sign out
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>
        </Box>
    );
};

export default SideBarDriver;
