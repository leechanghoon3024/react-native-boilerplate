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
import CustomInput from '../../components/customInput/defaultInput';
import ErrorHelp from '../../components/customInput/error.help';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthParamList } from '../../@types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import DefaultHeader from '../header/header.default';
import SelectAccountSheet from '../../components/bottomSheet/selectAccount.sheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useAxiosServices from '../../hooks/axiosHooks';

const SingInSchema = Yup.object().shape({
    accountType: Yup.string().required('Please select account Type'),
    email: Yup.string().email('Please enter a valid email').min(4, `Password Too short`).required(`Please enter your email`),
    password: Yup.string().min(4, `Password Too short`).required(`Please enter your password`),
    passwordCheck: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
const passwordView = require('../../assets/icons/password.png');
const LoginSingUp = () => {
    const toast = useToast();
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
    console.log('touched', touched);
    const goToEmailValidateScreen = (code: number, email: string, password: string) => {
        navigation.navigate('EmailValidate', { email, password, code });
    };
    const submit = async (value) => {
        try {
            const { email, passwordCheck, password } = value;
            const api = await axiosService.post('users/check/email', { email, passwordCheck, password });
            const { status, data } = api.data;
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
    return (
        <>
            <Box alignItems={'center'}>
                <Box px={5} maxW={'400px'} safeArea flexGrow={1} justifyContent={'space-between'}>
                    <DefaultHeader navigation={navigation} />
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                        <Box pb="20" alignItems={'center'} mt={10}>
                            <Center mb={10}>
                                <Heading fontFamily={'Arch'} fontWeight={700} fontSize={36}>
                                    Sign up
                                </Heading>
                            </Center>
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
                                            icon={
                                                view ? (
                                                    <Image alt={'password'} source={passwordView} />
                                                ) : (
                                                    <PasswordViewIcon color={'#ACACAC'} />
                                                )
                                            }
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
                                            icon={
                                                view2 ? (
                                                    <Image alt={'password'} source={passwordView} />
                                                ) : (
                                                    <PasswordViewIcon color={'#ACACAC'} />
                                                )
                                            }
                                        />
                                    }
                                    placeholder="passwordCheck"
                                />
                            </Stack>
                        </Center>
                        <Center mt={12}>
                            <Stack space={4} width={'100%'}>
                                <Button my={2} colorScheme={'blue.200'} onPress={() => handleSubmit()} variant={'basicButton'}>
                                    <HStack alignItems={'center'}>
                                        <Box alignItems={'center'} width={'100%'}>
                                            <Text color={'white.100'} fontFamily={'Arch'} fontWeight={'700'} fontSize={21}>
                                                Verify Email
                                            </Text>
                                        </Box>
                                    </HStack>
                                </Button>
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
                                        onPress={() => console.log('ddd')}
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
                                        onPress={() => console.log('ddd')}
                                        variant={'basicButton'}
                                    >
                                        <HStack alignItems={'center'}>
                                            <FaceBookIcon />
                                        </HStack>
                                    </Button>
                                    <Button
                                        w={'30%'}
                                        my={2}
                                        colorScheme={'black.100'}
                                        onPress={() => console.log('ddd')}
                                        variant={'basicButton'}
                                    >
                                        <HStack alignItems={'center'}>
                                            <AppleIcon />
                                        </HStack>
                                    </Button>
                                </Stack>
                            </Stack>
                        </Center>
                    </KeyboardAwareScrollView>
                    <Box>
                        <Box justifyContent={'flex-end'}>
                            <Box justifyContent={'center'} alignContent={'center'} flexDirection={'row'}>
                                <Text fontFamily={'Arch'} fontWeight={'100'} fontSize={'17'}>
                                    Have an account?
                                </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SingInScreen')}>
                                    <Text fontFamily={'Arch'} fontWeight={'700'} fontSize={'17'} ml={1}>
                                        Sign in
                                    </Text>
                                </TouchableOpacity>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <SelectAccountSheet open={sheetOpen} onHandler={setSheetOpen} inputHandler={inputHandler} />
        </>
    );
};

export default LoginSingUp;
