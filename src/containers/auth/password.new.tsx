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
    Modal,
    VStack,
    KeyboardAvoidingView,
    StatusBar,
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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import DefaultHeader from '../header/header.default';
import SelectAccountSheet from '../../components/bottomSheet/selectAccount.sheet';
import useAxiosServices from '../../hooks/axiosHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, profileSetting } from '../../store/authReducer';
import LabelInput from '../../components/customInput/Label.input';
import { AuthParamList } from '../../@types/navigationTypes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ar36B } from '../../themes/font.style';
import { RootState } from '../../store';

const SingInSchema = Yup.object().shape({
    current: Yup.string()
        .min(8, `This password is too short. It must contain at least 8 characters.`)
        .required(`Please enter your current password`),
    password: Yup.string()
        .min(8, `This password is too short. It must contain at least 8 characters.`)
        .required(`Please enter your password`),
    passwordCheck: Yup.string().oneOf([Yup.ref('password'), null], "Password doesn't match"),
});
const mailIcon = require('../../assets/icons/checked.png');
const PasswordNew = () => {
    const { handleChange, handleBlur, handleSubmit, errors, touched, initialValues, resetForm, values } = useFormik({
        validationSchema: SingInSchema,
        initialValues: {
            current: '',
            password: '',
            passwordCheck: '',
        },
        onSubmit: async (value) => {
            await resetPassword();
        },
    });
    const toast = useToast();
    const navigation = useNavigation<any>();
    const { axiosService } = useAxiosServices();
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    const resetPassword = async () => {
        try {
            const api = await axiosService.post('/users/app/reset/password', {
                current: values.current,
                password: values.password,
                passwordCheck: values.passwordCheck,
            });
            const { status, data } = api.data;
            if (status) {
                setShowModal(true);
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
                                    {data}
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
                                Error
                            </Text>
                        </Box>
                    );
                },
            });
        }
    };

    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <DefaultHeader navigation={navigation} />
            <Box flex={1} safeAreaBottom>
                <Box px={'30px'} maxW={'400px'} flexGrow={1} justifyContent={'space-between'}>
                    <KeyboardAvoidingView flex={1}>
                        <Box pb="10" mt={10}>
                            <Heading mb={2} {...Ar36B} color={'black.100'}>
                                Reset password
                            </Heading>
                        </Box>
                        <Center>
                            <Stack space={8} width={'100%'}>
                                <LabelInput
                                    type={show ? 'text' : 'password'}
                                    label={'Current Password'}
                                    value={values.current}
                                    error={errors.current}
                                    touched={touched.current}
                                    onChangeText={handleChange('current')}
                                    placeholder=""
                                    InputRightElement={
                                        <IconButton
                                            style={{ right: 10 }}
                                            onPress={() => setShow((p) => !p)}
                                            _pressed={{ bg: 'transfer', opacity: 0.5 }}
                                            icon={<PasswordViewIcon color={'#ACACAC'} boolean={show} />}
                                        />
                                    }
                                />
                                <LabelInput
                                    type={show2 ? 'text' : 'password'}
                                    label={'New Password'}
                                    value={values.password}
                                    error={errors.password}
                                    touched={touched.password}
                                    onChangeText={handleChange('password')}
                                    placeholder=""
                                    InputRightElement={
                                        <IconButton
                                            style={{ right: 10 }}
                                            onPress={() => setShow2((p) => !p)}
                                            _pressed={{ bg: 'transfer', opacity: 0.5 }}
                                            icon={<PasswordViewIcon color={'#ACACAC'} boolean={show2} />}
                                        />
                                    }
                                />
                                <LabelInput
                                    type={show3 ? 'text' : 'password'}
                                    label={'Confirm Password'}
                                    value={values.passwordCheck}
                                    error={errors.passwordCheck}
                                    touched={touched.passwordCheck}
                                    onChangeText={handleChange('passwordCheck')}
                                    placeholder=""
                                    InputRightElement={
                                        <IconButton
                                            style={{ right: 10 }}
                                            onPress={() => setShow3((p) => !p)}
                                            _pressed={{ bg: 'transfer', opacity: 0.5 }}
                                            icon={<PasswordViewIcon color={'#ACACAC'} boolean={show3} />}
                                        />
                                    }
                                />
                            </Stack>
                        </Center>
                    </KeyboardAvoidingView>
                    <Center>
                        <Button my={2} colorScheme={'blue.200'} onPress={() => handleSubmit()} variant={'basicButton'}>
                            <HStack alignItems={'center'}>
                                <Box alignItems={'center'} width={'100%'}>
                                    <Text color={'white.100'} fontFamily={'Arch'} fontWeight={'700'} fontSize={'19px'}>
                                        Update
                                    </Text>
                                </Box>
                            </HStack>
                        </Button>
                    </Center>
                </Box>
            </Box>
            <Modal p={0} isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px" borderRadius={10}>
                    <Modal.Body mt={10}>
                        <Center>
                            <Image w={'100px'} h={'100px'} resizeMode={'contain'} source={mailIcon} alt={'houseimage'} />
                            <VStack space={2} mt={4} alignItems={'center'}>
                                <Text fontFamily={'Arch'} fontWeight={700} fontSize={'23px'} color={'black.100'}>
                                    Password Reset
                                </Text>
                                <Text textAlign={'center'} fontFamily={'Arch'} fontWeight={200} fontSize={'15px'}>
                                    {'Your password has been reset \n' + 'successfully'}
                                </Text>
                            </VStack>
                        </Center>
                    </Modal.Body>
                    <Modal.Footer bg={'blue.200'} bottom={-5}>
                        <Button.Group space={2}>
                            <Button
                                borderRadius={0}
                                bg={'blue.200'}
                                w={'100%'}
                                variant="basicButton"
                                onPress={() => {
                                    navigation.goBack();
                                    setShowModal(false);
                                }}
                            >
                                <Text textAlign={'center'} fontFamily={'Arch'} fontWeight={700} fontSize={'20px'} color={'white.100'}>
                                    OK
                                </Text>
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    );
};

export default PasswordNew;
