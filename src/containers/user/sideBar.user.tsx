import React, { useState } from 'react';
import { Text, Box, VStack, Divider, Button, Image } from 'native-base';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { ImageBackground, Linking, TouchableOpacity, Image as RNImage } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutAction, profileSetting } from '../../store/authReducer';
import InfoModal from './confirm/info.modal';
import { Ar14Sb, Ar18M, Ar18SbBlack, Ar21B, Ar21N, Ar21R, Ar21Sb, Ar22M, La23N, La31B } from '../../themes/font.style';
import ModalWrapper from '../commons/modal/modal.wrapper';
import useAxiosServices from '../../hooks/axiosHooks';
import WebSheet from '../../components/bottomSheet/web.sheet';
const BackGround = require('../../assets/background/Sidebar_background.png');
const businessIcon = require('../../assets/icons/building.png');
const personalIcon = require('../../assets/icons/feedback.png');
const SideBarUser = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigation = useNavigation();
    const { axiosService } = useAxiosServices();
    const dispatch = useDispatch();
    const goToHandler = (name: string) => {
        navigation.navigate({ name } as any);
        navigation.dispatch(DrawerActions.closeDrawer());
    };
    const [webOpen, setOpen] = useState(false);

    const logOut = async () => {
        dispatch(logoutAction());
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
    };
    const openLink = async () => {
        setOpen(true);
        navigation.dispatch(DrawerActions.closeDrawer());
    };
    const [openInfo, setOpenInfo] = useState(false);

    const openCollection = () => {
        if (user?.profileCheck === 1 && user?.addressCheck === 1) {
            navigation.navigate('Collection' as never);
        } else {
            setOpenInfo(true);
        }
    };

    const [changeOpen, setChangeOpen] = useState(false);
    const onChangeType = async () => {
        const api = await axiosService.post('/users/app/account/change');
        const { data, status } = api.data;
        if (status) {
            dispatch(profileSetting({ user: data, userRole: data.userRole }));
        }
        setChangeOpen(false);
    };
    const accountId = () => {
        if (user.userType === 1) {
            return `AC-0${user?.idx}`;
        } else {
            return `AC-${9999 - user?.idx ?? 0}`;
        }
    };
    return (
        <>
            <Box style={{ flex: 1 }}>
                {/*<Image w={320} h={500} source={BackGround} position={'absolute'} zIndex={1} />*/}
                <RNImage source={BackGround} style={{ resizeMode: 'stretch', width: 280, height: 500, position: 'absolute', zIndex: 1 }} />
                <Box zIndex={2}>
                    <Box py={8} pb={'20px'} pt={'70px'} px={'26px'}>
                        <Box>
                            <Text {...La31B} color={'white.100'}>
                                Hi, {`${user?.userFirstName ?? 'User'}!`}
                            </Text>
                            <Text {...La23N} color={'gray.100'} opacity={0.8}>
                                {accountId()}
                            </Text>
                            <Button
                                variant={'basicButton'}
                                borderRadius={'38px'}
                                mt={'40px'}
                                bg={'white.100'}
                                h={'53px'}
                                onPress={() => openCollection()}
                            >
                                <Text {...Ar22M} color={'gray.300'}>
                                    Book a Collection
                                </Text>
                            </Button>
                        </Box>
                    </Box>
                    <Box bg={'white.100'}>
                        <Box>
                            <Box px={'30px'} pt={'16px'} pb={'16px'} justifyContent={'center'}>
                                <TouchableOpacity onPress={() => goToHandler('CollectionList')}>
                                    <Text {...Ar21B} color={'gray.300'}>
                                        Collections
                                    </Text>
                                </TouchableOpacity>
                            </Box>
                            <Divider />
                            <VStack px={'30px'} space={'16px'} py={'10px'} pb={'20px'}>
                                <TouchableOpacity onPress={() => goToHandler('ProfileUser')}>
                                    <Box justifyContent={'center'}>
                                        <Text {...Ar21R} color={'gray.300'}>
                                            Account
                                        </Text>
                                    </Box>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => goToHandler('RedeemScreen')}>
                                    <Box justifyContent={'center'}>
                                        <Text {...Ar21R} color={'gray.300'}>
                                            Redeem
                                        </Text>
                                    </Box>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => goToHandler('TransActionList')}>
                                    <Box justifyContent={'center'}>
                                        <Text {...Ar21R} color={'gray.300'}>
                                            Transactions
                                        </Text>
                                    </Box>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Address' as any)}>
                                    <Box justifyContent={'center'}>
                                        <Text {...Ar21R} color={'gray.300'}>
                                            Pickup address
                                        </Text>
                                    </Box>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('FeedPage' as any)}>
                                    <Box justifyContent={'center'}>
                                        <Text {...Ar21R} color={'gray.300'}>
                                            Feedback
                                        </Text>
                                    </Box>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('ShareScreen' as any)}>
                                    <Box justifyContent={'center'}>
                                        <Text {...Ar21R} color={'gray.300'}>
                                            Share RECAN
                                        </Text>
                                    </Box>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => openLink()}>
                                    <Box justifyContent={'center'}>
                                        <Text {...Ar21R} color={'gray.300'}>
                                            Contact us
                                        </Text>
                                    </Box>
                                </TouchableOpacity>
                            </VStack>

                            <Divider />
                            {/*<TouchableOpacity onPress={() => goToHandler('DrivingList')}>*/}
                            {/*    <Box px={5} py={4} pb={2} justifyContent={'center'}>*/}
                            {/*        <Text fontWeight={100} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>*/}
                            {/*            Business account*/}
                            {/*        </Text>*/}
                            {/*    </Box>*/}
                            {/*</TouchableOpacity>*/}
                            <TouchableOpacity onPress={() => setChangeOpen(true)}>
                                <Box px={'30px'} py={6} pb={2} justifyContent={'center'}>
                                    <Text {...Ar18SbBlack} color={'gray.300'}>
                                        {user?.userType !== 1 ? 'Personal account' : 'Business account'}
                                    </Text>
                                </Box>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => logOut()}>
                                <Box px={'30px'} py={4} pb={2} justifyContent={'center'}>
                                    <Text {...Ar18SbBlack} color={'gray.300'}>
                                        Sign out
                                    </Text>
                                </Box>
                            </TouchableOpacity>
                            <Box px={'30px'} py={1} pb={4} justifyContent={'center'}>
                                <Text {...Ar14Sb} color={'gray.200'}>
                                    v1.0
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <InfoModal open={openInfo} setOpen={setOpenInfo} />
            <ModalWrapper
                open={changeOpen}
                image={user?.userType === 2 ? personalIcon : businessIcon}
                onClose={() => setChangeOpen(false)}
                onHandler={[
                    { text: 'No', onPress: () => setChangeOpen(false), color: 'gray.200' },
                    { text: 'Change', onPress: onChangeType, color: 'blue.200' },
                ]}
                title={'Account Change'}
                content={
                    user?.userType === 1 ? 'Do you want to switch to a business account?' : 'Do you want to switch to a personal account?'
                }
            />
            <WebSheet open={webOpen} setOpen={setOpen} url={'https://www.recan.co/work-with-us'} />
        </>
    );
};

export default SideBarUser;
