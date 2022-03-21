import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Text,
    Center,
    Input,
    Stack,
    IconButton,
    Button,
    HStack,
    Divider,
    ScrollView,
    Image,
    Heading,
    useToast,
} from 'native-base';
import PasswordViewIcon from '../../assets/icons/passwordView.icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GoogleIcon from '../../assets/icons/google.icon';
import FaceBookIcon from '../../assets/icons/facebook.icon';
import AppleIcon from '../../assets/icons/apple.icon';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ErrorHelp from '../../components/customInput/error.help';
import CustomInput from '../../components/customInput/defaultInput';
import { useNavigation } from '@react-navigation/native';
import DefaultHeader from '../header/header.default';
import SelectAccountSheet from '../../components/bottomSheet/selectAccount.sheet';
import useAxiosServices from '../../hooks/axiosHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, profileSetting } from '../../store/authReducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ar36B } from '../../themes/font.style';
import { Dimensions } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import jwtDecode from 'jwt-decode';
import { RootState } from '../../store';
import JoinSelect from '../../components/bottomSheet/join.select';
import PaypalSheet from '../../components/bottomSheet/paypal.sheet';
import { loadingEndAction } from '../../store/commonReducer';

const SingInSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email').min(4, `email Too short`).required(`Please enter your email`),
    password: Yup.string()
        .min(8, `This password is too short. It must contain at least 8 characters.`)
        .required(`Please enter your password`),
});
const paypalIcon = require('../../assets/icons/paypal.png');
const passwordView = require('../../assets/icons/password.png');
const { width } = Dimensions.get('window');
const LoginSignIn = () => {
    const { appToken } = useSelector((state: RootState) => state.auth);
    const { handleChange, handleBlur, handleSubmit, errors, touched, initialValues, resetForm, values } = useFormik({
        validationSchema: SingInSchema,
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (value) => {
            await joinHandler({ id: value.email, email: '', password: value.password });
        },
    });
    const toast = useToast();
    const navigation = useNavigation<any>();
    const { axiosService } = useAxiosServices();
    const dispatch = useDispatch();

    const joinHandler = async (value: { id: string; email: string; password: string }) => {
        const { email, password, id } = value;
        try {
            const api = await axiosService.post('/users/login', { username: id, password });
            const { data } = api.data;
            const { result, accessToken, refreshToken, user } = data;
            await AsyncStorage.setItem('accessToken', accessToken);
            await AsyncStorage.setItem('refreshToken', refreshToken);
            const getProfile = await axiosService.post('/users/app/profile', { appToken });
            const { data: profileData, status: profileStatus } = getProfile.data;
            if (profileStatus) {
                dispatch(profileSetting({ user: profileData, userRole: profileData.userRole }));
                dispatch(loginAction());
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
                placement: 'top',
                description: 'Complete',
                render: () => {
                    return (
                        <Box justifyContent={'center'} alignContent={'center'} w={'200px'} bg="blue.200" px="2" py="2" rounded="sm" mb={5}>
                            <Text color={'white.100'} textAlign={'center'}>
                                Check your Email and password
                            </Text>
                        </Box>
                    );
                },
            });
        }
    };

    const [view, setView] = useState(false);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '834335995654-8t7m74uchbk5c4ogd2nr0k7bg7p53bbv.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        });
    }, []);

    const loginHandler = async (value: { id; email: string; password: string }, type) => {
        const { id, email, password } = value;
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
            // @ts-ignore
            const { sub, email } = jwtDecode(appleAuthRequestResponse.identityToken as any);
            await loginHandler({ id: sub, email: email, password: sub }, 3);
        }
    };

    const [paypalOpen, setPaypalOpen] = useState(false);

    return (
        <>
            <Box flex={1} bg={'white.100'}>
                <DefaultHeader navigation={navigation} bg={'white.100'} />
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
                    <Box flex={1} px={'30px'} maxW={'414px'} safeAreaBottom flexGrow={1} justifyContent={'space-between'}>
                        <Box mb={'95px'} mt={'28.62px'} alignItems={'center'}>
                            <Heading {...Ar36B} color={'black.100'}>
                                Sign in
                            </Heading>
                        </Box>
                        <Center>
                            <Box width={'100%'}>
                                <ErrorHelp errors={errors} />
                                <CustomInput
                                    value={values.email}
                                    error={errors.email}
                                    touched={touched.email}
                                    onChangeText={handleChange('email')}
                                    placeholder="Email"
                                />
                                <Box mb={'16px'} />
                                <CustomInput
                                    value={values.password}
                                    error={errors.password}
                                    touched={touched.password}
                                    onChangeText={handleChange('password')}
                                    type={view ? 'text' : 'password'}
                                    InputRightElement={
                                        <IconButton
                                            onPress={() => setView((p) => !p)}
                                            _pressed={{ bg: 'transfer', opacity: 0.5 }}
                                            icon={<PasswordViewIcon color={'#ACACAC'} boolean={view} />}
                                        />
                                    }
                                    placeholder="Password"
                                />
                                <Box mb={'13px'} />
                                <Box alignItems={'flex-end'}>
                                    <TouchableOpacity onPress={() => navigation.navigate('PassWordFind')}>
                                        <Text fontFamily={'Arch'} fontWeight={'700'} underline fontSize={'12px'}>
                                            Forgot your password?
                                        </Text>
                                    </TouchableOpacity>
                                </Box>
                            </Box>
                        </Center>
                        <Box flex={1} mt={'70px'}>
                            <Box width={'100%'}>
                                <Button my={2} colorScheme={'blue.200'} onPress={() => handleSubmit()} variant={'basicButton'}>
                                    <HStack alignItems={'center'}>
                                        <Box alignItems={'center'} width={'100%'}>
                                            <Text color={'white.100'} fontFamily={'Arch'} fontWeight={'700'} fontSize={'20px'}>
                                                Sign in
                                            </Text>
                                        </Box>
                                    </HStack>
                                </Button>
                                <Box my={'15px'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} width={'100%'}>
                                    <Divider bg={'black.100'} mx="1" orientation={'horizontal'} width={'30%'} borderWidth={0.5} />
                                    <Box>
                                        <Text fontFamily={'Arch'} fontWeight={400} fontSize={'15px'}>
                                            Or Sign in with
                                        </Text>
                                    </Box>
                                    <Divider bg={'black.100'} mx="1" orientation={'horizontal'} width={'30%'} borderWidth={0.5} />
                                </Box>
                                <Stack
                                    space={4}
                                    flexDirection={'row'}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                    width={'100%'}
                                >
                                    <Button
                                        w={'31%'}
                                        h={'56px'}
                                        my={2}
                                        colorScheme={'blue.200'}
                                        onPress={() => snsLoginWithGoogle()}
                                        variant={'basicButton'}
                                    >
                                        <HStack alignItems={'center'}>
                                            <GoogleIcon />
                                        </HStack>
                                    </Button>
                                    <Button
                                        w={'31%'}
                                        my={2}
                                        colorScheme={'blue.300'}
                                        onPress={() => setPaypalOpen(true)}
                                        variant={'basicButton'}
                                    >
                                        <HStack alignItems={'center'}>
                                            <Image
                                                resizeMode={'contain'}
                                                height={'30px'}
                                                width={'30px'}
                                                mt={1}
                                                source={paypalIcon}
                                                alt={'paypalIcon'}
                                            />
                                        </HStack>
                                    </Button>
                                    <Button
                                        w={'31%'}
                                        my={2}
                                        colorScheme={'black.100'}
                                        onPress={() => snsLoginWithApple()}
                                        variant={'basicButton'}
                                    >
                                        <HStack mb={1} alignItems={'center'}>
                                            <AppleIcon />
                                        </HStack>
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </KeyboardAwareScrollView>
                <Flex safeAreaBottom top={2}>
                    <Box justifyContent={'flex-end'}>
                        <Box justifyContent={'center'} alignContent={'center'} flexDirection={'row'}>
                            <Text fontFamily={'Arch'} fontWeight={'100'} fontSize={'15px'}>
                                Don't have an account?
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SingUpScreen')}>
                                <Text fontFamily={'Arch'} fontWeight={'700'} fontSize={'15px'} ml={1} color={'black.100'}>
                                    Sign up
                                </Text>
                            </TouchableOpacity>
                        </Box>
                    </Box>
                </Flex>
            </Box>
            <PaypalSheet open={paypalOpen} setOpen={setPaypalOpen} />
            <JoinSelect open={selectOpen} onHandler={setSelectOpen} inputHandler={openAndJoin} value={tempType} />
        </>
    );
};

export default LoginSignIn;
