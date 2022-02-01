import React from 'react';
import { Button, View, Text, Box, VStack, Center, Divider, Image } from 'native-base';
import { DriverStackParamList } from '../../@types/navigationTypes';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logoutAction } from '../../store/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BackGround = require('../../assets/background/driver-background.png');
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
            <ImageBackground source={BackGround} resizeMode={'stretch'}>
                <Box p={4} px={6}>
                    <Box safeArea justifyContent={'flex-end'} alignItems={'flex-end'}>
                        <Image source={DriverLogo} alt={'driver'} />
                    </Box>
                    <Box>
                        <Box>
                            <Text width={'80%'} fontWeight={'700'} fontSize={'31px'} fontFamily={'Arch'} color={'white.100'}>
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
            </ImageBackground>

            <Box flex={1}>
                <VStack space={2}>
                    <Box px={10} py={5}>
                        <TouchableOpacity onPress={() => goToHandler('PickList')}>
                            <Text fontWeight={500} fontSize={'20px'} fontFamily={'Arch'} color={'black.100'}>
                                Collections
                            </Text>
                        </TouchableOpacity>
                    </Box>
                    <Divider />
                    <TouchableOpacity onPress={() => goToHandler('ProfileDriver')}>
                        <Box px={10} py={5} justifyContent={'space-between'} flexDirection={'row'}>
                            <Text fontWeight={100} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                Profile
                            </Text>
                        </Box>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => goToHandler('HistoryScreen')}>
                        <Box px={10} py={5} justifyContent={'space-between'} flexDirection={'row'}>
                            <Text fontWeight={100} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                History
                            </Text>
                        </Box>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => goToHandler('CompleteList')}>
                        <Box px={10} py={5} justifyContent={'space-between'} flexDirection={'row'}>
                            <Text fontWeight={100} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                Help
                            </Text>
                        </Box>
                    </TouchableOpacity>
                </VStack>
            </Box>
            <Divider />
            <Box safeArea p={4} px={6}>
                <TouchableOpacity onPress={() => logOut()}>
                    <Box justifyContent={'space-between'} flexDirection={'row'}>
                        <Text fontWeight={100} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                            Sing out
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>
        </Box>
    );
};

export default SideBarDriver;
