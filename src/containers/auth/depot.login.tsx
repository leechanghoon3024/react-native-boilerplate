import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { loginAction, profileSetting } from '../../store/authReducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DriverLoginHeader from '../header/driver.loginHeader';
import LabelInput from '../../components/customInput/Label.input';
import DepotLoginHeader from '../header/depot.header';

const SingInSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email').min(4, `email Too short`).required(`Please enter your email`),
    password: Yup.string().min(4, `Password Too short`).required(`Please enter your password`),
});
const paypalIcon = require('../../assets/icons/paypal.png');
const passwordView = require('../../assets/icons/password.png');
const DepotLogin = () => {
    const { handleChange, handleBlur, handleSubmit, errors, touched, initialValues, resetForm, values } = useFormik({
        validationSchema: SingInSchema,
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (value) => {
            await joinHandler(value);
        },
    });
    const toast = useToast();
    const navigation = useNavigation<any>();
    const { axiosService } = useAxiosServices();
    const dispatch = useDispatch();
    const joinHandler = async (value: { email: string; password: string }) => {
        const { email, password } = value;
        try {
            const api = await axiosService.post('/users/login/depot', { username: email, password });
            const { data } = api.data;
            const { result, accessToken, refreshToken, user } = data;
            if (!result) {
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
                                    This Account can't log in.
                                </Text>
                            </Box>
                        );
                    },
                });
                return;
            }
            await AsyncStorage.setItem('accessToken', accessToken);
            await AsyncStorage.setItem('refreshToken', refreshToken);
            const getProfile = await axiosService.post('/users/app/profile');
            const { data: profileData, status: profileStatus } = getProfile.data;
            if (profileStatus) {
                dispatch(profileSetting({ user: profileData, userRole: profileData.userRole }));
                dispatch(loginAction());
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
                                    Hello!
                                </Text>
                            </Box>
                        );
                    },
                });
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

    return (
        <>
            <Box flex={1}>
                <DepotLoginHeader navigation={navigation} backOption={true} />
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
                    <Box px={5} maxW={'400px'} safeArea flexGrow={1} justifyContent={'space-between'}>
                        <Box mb={'40px'} mt={'40px'} alignItems={'center'}>
                            <Heading fontFamily={'Arch'} fontWeight={700} fontSize={36}>
                                Depot Login
                            </Heading>
                        </Box>
                        <Center>
                            <Stack space={8} width={'100%'}>
                                <ErrorHelp errors={errors} />
                                <LabelInput
                                    color={'blue.100'}
                                    label={'Depot ID'}
                                    value={values.email}
                                    error={errors.email}
                                    touched={touched.email}
                                    onChangeText={handleChange('email')}
                                    placeholder="Email"
                                />
                                <LabelInput
                                    color={'blue.100'}
                                    label={'Password'}
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
                                <Box alignItems={'center'} mt={3} mb={5}>
                                    <TouchableOpacity onPress={() => navigation.navigate('PassWordFind')}>
                                        <Text fontFamily={'Arch'} fontWeight={'700'} underline>
                                            Forgot your password?
                                        </Text>
                                    </TouchableOpacity>
                                </Box>
                            </Stack>
                        </Center>
                        <Box flex={1}>
                            <Stack space={2} width={'100%'}>
                                <Button my={2} colorScheme={'blue.100'} onPress={() => handleSubmit()} variant={'basicButton'}>
                                    <HStack alignItems={'center'}>
                                        <Box alignItems={'center'} width={'100%'}>
                                            <Text color={'white.100'} fontFamily={'Arch'} fontWeight={'700'} fontSize={21}>
                                                Login
                                            </Text>
                                        </Box>
                                    </HStack>
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </KeyboardAwareScrollView>
            </Box>
        </>
    );
};

export default DepotLogin;
