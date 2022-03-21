import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Image, Button, HStack, Center, ScrollView, useToast, StatusBar } from 'native-base';
import GoogleIcon from '../../assets/icons/google.icon';
import FaceBookIcon from '../../assets/icons/facebook.icon';
import AppleIcon from '../../assets/icons/apple.icon';
import EmailIcon from '../../assets/icons/Email.icon';
import { AuthParamList } from '../../@types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Ar10r, Ar15R, Ar21B, Ar21N } from '../../themes/font.style';

import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import useAxiosServices from '../../hooks/axiosHooks';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginAction, profileSetting } from '../../store/authReducer';

import appleAuth from '@invertase/react-native-apple-authentication';
import jwtDecode from 'jwt-decode';
import WebSheet from '../../components/bottomSheet/web.sheet';
import { RootState } from '../../store';
import JoinSelect from '../../components/bottomSheet/join.select';
import PaypalSheet from '../../components/bottomSheet/paypal.sheet';
import { loadingEndAction } from '../../store/commonReducer';

const Logo = require('../../assets/logo/recan-colour-logo.png');
const payPal = require('../../assets/icons/paypal.png');
const LoginSelectScreen = () => {
    const toast = useToast();
    const { navigate } = useNavigation();
    const { appToken } = useSelector((state: RootState) => state.auth);
    // const { navigation } = useNavigation<AuthStackParamList<'LoginSelect'>>();
    const readyForService = () => {
        toast.show({
            placement: 'top',
            description: 'Complete',
            render: () => {
                return (
                    <Box justifyContent={'center'} alignContent={'center'} w={'200px'} bg="blue.200" px="2" py="2" rounded="sm" mb={5}>
                        <Text color={'white.100'} textAlign={'center'}>
                            Sorry, Ready for service
                        </Text>
                    </Box>
                );
            },
        });
    };

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '834335995654-8t7m74uchbk5c4ogd2nr0k7bg7p53bbv.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        });
    }, []);

    const { axiosService } = useAxiosServices();
    const dispatch = useDispatch();

    const loginHandler = async (value: { id: string; email: string; password: string }, type) => {
        const { email, password, id } = value;
        try {
            const api = await axiosService.post('/users/login/sns', { username: id, password });
            const { data } = api.data;
            const { accessToken, refreshToken } = data;
            await AsyncStorage.setItem('accessToken', accessToken);
            await AsyncStorage.setItem('refreshToken', refreshToken);
            const getProfile = await axiosService.post('/users/app/profile', { appToken });
            const { data: profileData, status: profileStatus } = getProfile.data;
            if (profileStatus) {
                dispatch(profileSetting({ user: profileData, userRole: profileData.userRole }));
                dispatch(loginAction());
            } else {
                toast.show({
                    placement: 'bottom',
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
            setSelectOpen(true);
            setTempEmail(email);
            setTempId(id);
            setTempType(type);
        } finally {
        }
    };

    const [tempEmail, setTempEmail] = useState('');
    const [tempId, setTempId] = useState('');

    const [tempType, setTempType] = useState('1');
    const [selectOpen, setSelectOpen] = useState(false);

    const openAndJoin = async (accountType) => {
        const confrim = selectOpen;
        if (confrim) {
            dispatch(loadingEndAction());
            setSelectOpen(false);
            await join(tempId, tempEmail, tempType, accountType);
        }
    };

    const snsLoginWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const { id, email } = userInfo.user;
            await loginHandler({ id, email, password: id }, 2);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };
    const loginJoinHandler = async (value: { email: string; password: string }) => {
        const { email, password } = value;
        try {
            const api = await axiosService.post('/users/login/sns', { username: email, password });
            const { data } = api.data;
            const { accessToken, refreshToken } = data;
            await AsyncStorage.setItem('accessToken', accessToken);
            await AsyncStorage.setItem('refreshToken', refreshToken);
            const getProfile = await axiosService.post('/users/app/profile', { appToken });
            const { data: profileData, status: profileStatus } = getProfile.data;
            if (profileStatus) {
                dispatch(profileSetting({ user: profileData, userRole: profileData.userRole }));
                dispatch(loginAction());
            } else {
                toast.show({
                    placement: 'bottom',
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
            console.log(e);
            toast.show({
                placement: 'bottom',
                description: 'Complete',
                render: () => {
                    return (
                        <Box justifyContent={'center'} alignContent={'center'} w={'200px'} bg="blue.200" px="2" py="2" rounded="sm" mb={5}>
                            <Text color={'white.100'} textAlign={'center'}>
                                Not a registered member. Please sign up and proceed.
                            </Text>
                        </Box>
                    );
                },
            });
        }
    };

    const join = async (id: any, email, type, accountType) => {
        try {
            const api = await axiosService.post('/users/join/simple/sns', {
                email: email,
                password: id,
                id: id,
                type,
                accountType,
            });
            const { status, data } = api;
            if (!status) {
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
            } else {
                await loginJoinHandler({ email: id, password: id });
            }
        } catch (e) {
            toast.show({
                placement: 'top',
                description: 'Complete',
                render: () => {
                    return (
                        <Box justifyContent={'center'} alignContent={'center'} w={'200px'} bg="blue.200" px="2" py="2" rounded="sm" mb={5}>
                            <Text color={'white.100'} textAlign={'center'}>
                                {e}
                            </Text>
                        </Box>
                    );
                },
            });
        } finally {
            setSelectOpen(false);
        }
    };
    const snsLoginWithApple = async () => {
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL],
        });

        // get current authentication state for user
        // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

        // use credentialState response to ensure the user is authenticated
        if (credentialState === appleAuth.State.AUTHORIZED) {
            console.log(appleAuthRequestResponse.identityToken);
            // @ts-ignore
            const { sub, email } = jwtDecode(appleAuthRequestResponse.identityToken as any);
            await loginHandler({ id: sub, email: email, password: sub }, 2);
        }
    };
    const [webOpen, setWebOpen] = useState(false);
    const [paypalOpen, setPaypalOpen] = useState(false);
    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <Box flex="1" flexGrow={1} justifyContent={'space-between'} safeArea bg={'white.100'}>
                <Box w={'100%'}>
                    <Box mt={'160px'} mb={'110px'} alignItems={'center'}>
                        <Image source={Logo} alt="Alternate Text" left={1} width={'188px'} height={'52px'} resizeMode={'contain'} />
                    </Box>
                    <VStack w={'100%'} px={'28px'}>
                        <Button
                            h={'56px'}
                            mb={'14px'}
                            colorScheme={'blue.200'}
                            onPress={() => snsLoginWithGoogle()}
                            variant={'basicButton'}
                        >
                            <HStack alignItems={'center'}>
                                <Box position={'absolute'} width={'100%'} ml={2}>
                                    <GoogleIcon />
                                </Box>
                                <Box alignItems={'center'} width={'100%'} left={1}>
                                    <Text {...Ar21B} color={'white.100'}>
                                        Continue with Google
                                    </Text>
                                </Box>
                            </HStack>
                        </Button>
                        <Button h={'56px'} mb={'14px'} colorScheme={'blue.300'} onPress={() => setPaypalOpen(true)} variant={'basicButton'}>
                            <HStack alignItems={'center'}>
                                <Box position={'absolute'} width={'100%'} ml={1}>
                                    <Image top={1} resizeMode={'contain'} height={'30px'} width={'30px'} source={payPal} alt={'paypal'} />
                                </Box>
                                <Box alignItems={'center'} width={'100%'} left={1}>
                                    <Text {...Ar21B} color={'white.100'}>
                                        Continue with Paypal
                                    </Text>
                                </Box>
                            </HStack>
                        </Button>
                        <Button
                            h={'56px'}
                            mb={'14px'}
                            colorScheme={'black.100'}
                            onPress={() => snsLoginWithApple()}
                            variant={'basicButton'}
                        >
                            <HStack alignItems={'center'}>
                                <Box position={'absolute'} width={'100%'} ml={2}>
                                    <AppleIcon />
                                </Box>
                                <Box alignItems={'center'} width={'100%'} left={1}>
                                    <Text {...Ar21B} color={'white.100'}>
                                        Continue with Apple
                                    </Text>
                                </Box>
                            </HStack>
                        </Button>
                        <Button
                            h={'56px'}
                            mb={'14px'}
                            colorScheme={'blue.100'}
                            onPress={() => navigate('SingUpScreen' as any)}
                            variant={'basicButton'}
                        >
                            <HStack alignItems={'center'}>
                                <Box position={'absolute'} width={'100%'} ml={2}>
                                    <EmailIcon />
                                </Box>
                                <Box alignItems={'center'} width={'100%'} left={-1}>
                                    <Text {...Ar21B} color={'white.100'}>
                                        Sign up with Email
                                    </Text>
                                </Box>
                            </HStack>
                        </Button>

                        <Box flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                            <Text {...Ar10r} color={'gray.300'}>
                                By signing up, you agree to our
                            </Text>
                            <TouchableOpacity
                                onPress={() => setWebOpen(true)}
                                style={{
                                    marginHorizontal: 4,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text {...Ar10r} underline color={'gray.300'}>
                                    Terms
                                </Text>
                            </TouchableOpacity>
                            <Text {...Ar10r} color={'gray.300'}>
                                of Service and
                            </Text>
                            <TouchableOpacity
                                onPress={() => setWebOpen(true)}
                                style={{
                                    marginHorizontal: 4,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text {...Ar10r} underline color={'gray.300'}>
                                    Privacy Policy
                                </Text>
                            </TouchableOpacity>
                        </Box>
                    </VStack>
                </Box>

                <Box px={'28px'} alignItems={'center'} w={'100%'} bottom={0} safeArea>
                    <Text color={'gray.300'} {...Ar15R}>
                        Have an account?
                    </Text>
                    {/*@ts-ignore*/}
                    <Button
                        h={'56px'}
                        mt={1}
                        my={2}
                        colorScheme={'gray.100'}
                        onPress={() => navigate('SingInScreen')}
                        variant={'basicButton'}
                    >
                        <HStack alignItems={'center'}>
                            <Box alignItems={'center'} width={'100%'}>
                                <Text color={'black.100'} fontFamily={'Arch'} fontWeight={'700'} fontSize={20}>
                                    Sign in
                                </Text>
                            </Box>
                        </HStack>
                    </Button>
                </Box>
            </Box>
            <JoinSelect open={selectOpen} onHandler={setSelectOpen} inputHandler={openAndJoin} value={tempType} />
            <WebSheet open={webOpen} setOpen={setWebOpen} url={'https://recan.co'} />
            <PaypalSheet open={paypalOpen} setOpen={setPaypalOpen} />
        </>
    );
};

export default LoginSelectScreen;
