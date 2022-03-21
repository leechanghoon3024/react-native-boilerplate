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
import CustomInput from '../../components/customInput/defaultInput';
import ErrorHelp from '../../components/customInput/error.help';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthParamList } from '../../@types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import DefaultHeader from '../header/header.default';
import SelectAccountSheet from '../../components/bottomSheet/selectAccount.sheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useAxiosServices from '../../hooks/axiosHooks';
import { Ar17B, Ar17M, Ar17R, Ar36B } from '../../themes/font.style';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginAction, profileSetting } from '../../store/authReducer';
import appleAuth from '@invertase/react-native-apple-authentication';
import jwtDecode from 'jwt-decode';
import { RootState } from '../../store';
import JoinSelect from '../../components/bottomSheet/join.select';
import PaypalSheet from '../../components/bottomSheet/paypal.sheet';
import { loadingEndAction } from '../../store/commonReducer';
import Toast from 'react-native-toast-message';

const SingInSchema = Yup.object().shape({
    accountType: Yup.string().required('Please select account Type'),
    email: Yup.string().email('Please enter a valid email').min(4, `Password Too short`).required(`Please enter your email`),
    password: Yup.string()
        .min(8, `This password is too short. It must contain at least 8 characters.`)
        .required(`Please enter your password`),
    passwordCheck: Yup.string().oneOf([Yup.ref('password'), null], "Password doesn't match"),
});
const passwordView = require('../../assets/icons/password.png');
const paypalIcon = require('../../assets/icons/paypal.png');
const LoginSingUp = () => {
    const toast = useToast();
    const { appToken } = useSelector((state: RootState) => state.auth);
    const { axiosService } = useAxiosServices();
    const { handleChange, errors, touched, values, setValues, setFieldValue, handleSubmit } = useFormik({
        validationSchema: SingInSchema,
        initialValues: {
            accountType: '',
            email: '',
            password: '',
            passwordCheck: '',
        },
        onSubmit: async (value) => {
            submit(value);
        },
    });
    const navigation = useNavigation<any>();
    const [sheetOpen, setSheetOpen] = useState(false);
    const inputHandler = async (type: 1 | 2) => {
        await setFieldValue('accountType', type === 1 ? 'Personal' : 'Company');
        setSheetOpen(false);
    };
    const goToEmailValidateScreen = (code: number, email: string, password: string) => {
        navigation.navigate('EmailValidate', { email, password, code, accountType: values.accountType });
    };
    const submit = async (value: any) => {
        try {
            const { email, passwordCheck, password } = value;
            const api = await axiosService.post('users/check/email', { email, passwordCheck, password });
            const { status, data } = api.data;
            if (!status) {
                Toast.show({
                    type: 'info',
                    text1: data,
                });
            } else {
                goToEmailValidateScreen(data, email, password);
            }
        } catch (e) {
            toast.show({
                placement: 'top',
                description: 'Complete',
                render: () => {
                    return (
                        <Box justifyContent={'center'} alignContent={'center'} w={'200px'} bg="blue.200" px="2" py="2" rounded="sm" mb={5}>
                            <Text color={'white.100'} textAlign={'center'}>
                                Error.
                            </Text>
                        </Box>
                    );
                },
            });
        }
    };
    const [view, setView] = useState(false);
    const [view2, setView2] = useState(false);

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '834335995654-8t7m74uchbk5c4ogd2nr0k7bg7p53bbv.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        });
    }, []);

    const dispatch = useDispatch();

    const loginHandler = async (value: { email: string; password: string }) => {
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

    const snsLoginWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const { id, email } = userInfo.user;
            setSelectOpen(true);
            setTempId(id);
            setTempEmail(email);
            setTempType('2');
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
    const join = async (id: any, email, type, accountType) => {
        try {
            const api = await axiosService.post('/users/join/simple/sns', {
                email: email,
                password: id,
                id: id,
                type,
                accountType,
            });

            const { status, data } = api.data;
            console.log('DATA, ', data);
            if (status) {
                await loginHandler({ email: id, password: id });
            } else {
                Toast.show({
                    type: 'info',
                    text1: data,
                });
            }
        } catch (e) {
        } finally {
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
            setSelectOpen(true);
            setTempId(sub);
            setTempEmail(email);
            setTempType('3');
        }
    };
    const [tempId, setTempId] = useState('');
    const [tempEmail, setTempEmail] = useState('');
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
    const [paypalOpen, setPaypalOpen] = useState(false);
    return (
        <>
            <Box flex={1} bg={'white.100'} alignItems={'center'}>
                <DefaultHeader navigation={navigation} bg={'white.100'} />
                <Box flex={1} px={'30px'} maxW={'414px'} flexGrow={1} justifyContent={'space-between'}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                        <Box mb={'50px'} mt={'28.62px'} alignItems={'center'}>
                            <Heading {...Ar36B} color={'black.100'}>
                                Sign up
                            </Heading>
                        </Box>
                        <Center>
                            <Stack space={4} width={'100%'}>
                                <ErrorHelp errors={errors} />
                                <TouchableOpacity onPress={() => setSheetOpen(true)}>
                                    <CustomInput
                                        isDisabled={true}
                                        value={values.accountType}
                                        error={errors.accountType}
                                        touched={touched.accountType}
                                        onChangeText={handleChange('accountType')}
                                        placeholder="Account Type"
                                    />
                                </TouchableOpacity>
                                <CustomInput
                                    value={values.email}
                                    error={errors.email}
                                    touched={touched.email}
                                    onChangeText={handleChange('email')}
                                    placeholder="Email"
                                />
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
                                <CustomInput
                                    value={values.passwordCheck}
                                    error={errors.passwordCheck}
                                    touched={touched.passwordCheck}
                                    onChangeText={handleChange('passwordCheck')}
                                    type={view2 ? 'text' : 'password'}
                                    InputRightElement={
                                        <IconButton
                                            onPress={() => setView2((p) => !p)}
                                            _pressed={{ bg: 'transfer', opacity: 0.5 }}
                                            icon={<PasswordViewIcon color={'#ACACAC'} boolean={view2} />}
                                        />
                                    }
                                    placeholder="Confirm password"
                                />
                            </Stack>
                        </Center>
                        <Box mt={12}>
                            <Box width={'100%'}>
                                <Button h={'56px'} my={2} colorScheme={'blue.200'} onPress={() => handleSubmit()} variant={'basicButton'}>
                                    <HStack alignItems={'center'}>
                                        <Box alignItems={'center'} width={'100%'}>
                                            <Text color={'white.100'} fontFamily={'Arch'} fontWeight={'700'} fontSize={21}>
                                                Sign up
                                            </Text>
                                        </Box>
                                    </HStack>
                                </Button>
                                <Box my={'15px'} flexDirection={'row'} alignItems={'center'} justifyContent={'center'} width={'100%'}>
                                    <Divider bg={'black.100'} mx="1" orientation={'horizontal'} width={'30%'} borderWidth={0.5} />
                                    <Box>
                                        <Text fontFamily={'Arch'} fontWeight={400} fontSize={'15px'}>
                                            Or Sign up with
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
                                        w={'30%'}
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
                                        w={'30%'}
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
                                        w={'30%'}
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
                    </KeyboardAwareScrollView>
                </Box>
                <Box safeAreaBottom>
                    <Box justifyContent={'flex-end'}>
                        <Box justifyContent={'center'} alignContent={'center'} flexDirection={'row'}>
                            <Text {...Ar17R}>Have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SingInScreen')}>
                                <Text {...Ar17B} ml={1}>
                                    Sign in
                                </Text>
                            </TouchableOpacity>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <PaypalSheet open={paypalOpen} setOpen={setPaypalOpen} />
            <JoinSelect open={selectOpen} onHandler={setSelectOpen} inputHandler={openAndJoin} value={tempType} />
            <SelectAccountSheet value={values.accountType} open={sheetOpen} onHandler={setSheetOpen} inputHandler={inputHandler} />
        </>
    );
};

export default LoginSingUp;
