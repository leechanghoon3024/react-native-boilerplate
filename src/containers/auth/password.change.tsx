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
import { useDispatch } from 'react-redux';
import { loginAction, profileSetting } from '../../store/authReducer';
import LabelInput from '../../components/customInput/Label.input';
import { AuthParamList } from '../../@types/navigationTypes';

const SingInSchema = Yup.object().shape({
    password: Yup.string().min(4, `passowrd Too short`).required(`Please enter your password`),
    passwordCheck: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
const mailIcon = require('../../assets/icons/sendMail.png');
const PasswordChange = () => {
    const { handleChange, handleBlur, handleSubmit, errors, touched, initialValues, resetForm, values } = useFormik({
        validationSchema: SingInSchema,
        initialValues: {
            password: '',
            passwordCheck: '',
        },
        onSubmit: async (value) => {
            await resetPassword();
        },
    });
    const toast = useToast();
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<AuthParamList, 'PasswordChange'>>();
    const email = route.params?.email;
    const { axiosService } = useAxiosServices();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const mailHandler = () => {
        navigation.navigate('LoginSelect');
    };

    const resetPassword = async () => {
        try {
            const api = await axiosService.post('/users/reset/password', {
                email,
                password: values.password,
                passwordCheck: values.passwordCheck,
            });
            const { status } = api.data;
            if (status) {
                mailHandler();
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
            <Box alignItems={'center'}>
                <Box px={5} maxW={'400px'} safeArea flexGrow={1} justifyContent={'space-between'}>
                    <DefaultHeader navigation={navigation} />
                    <ScrollView>
                        <Box pb="10" mt={20}>
                            <Heading mb={2} fontFamily={'Arch'} fontWeight={700} fontSize={'28px'}>
                                Reset password
                            </Heading>
                        </Box>
                        <Center>
                            <Stack space={8} width={'100%'}>
                                <LabelInput
                                    type={'password'}
                                    label={'New Password'}
                                    value={values.password}
                                    error={errors.password}
                                    touched={touched.password}
                                    onChangeText={handleChange('password')}
                                    placeholder="password"
                                />
                                <LabelInput
                                    type={'password'}
                                    label={'Confirm Check'}
                                    value={values.passwordCheck}
                                    error={errors.passwordCheck}
                                    touched={touched.passwordCheck}
                                    onChangeText={handleChange('passwordCheck')}
                                    placeholder="Confirm Check"
                                />
                            </Stack>
                        </Center>
                    </ScrollView>
                    <Center mt={'100px'}>
                        <Stack space={4} width={'100%'}>
                            <Button my={2} colorScheme={'blue.200'} onPress={() => handleSubmit()} variant={'basicButton'}>
                                <HStack alignItems={'center'}>
                                    <Box alignItems={'center'} width={'100%'}>
                                        <Text color={'white.100'} fontFamily={'Arch'} fontWeight={'700'} fontSize={21}>
                                            Reset
                                        </Text>
                                    </Box>
                                </HStack>
                            </Button>
                        </Stack>
                    </Center>
                </Box>
            </Box>
            <Modal p={0} isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.Body>
                        <Center>
                            <Image w={'100px'} h={'100px'} resizeMode={'contain'} source={mailIcon} alt={'houseimage'} />
                            <VStack space={2} mt={4} alignItems={'center'}>
                                <Text fontFamily={'Arch'} fontWeight={700} fontSize={'16px'}>
                                    Check your email
                                </Text>
                                <Text textAlign={'center'} fontFamily={'Arch'} fontWeight={700} fontSize={'12px'}>
                                    {'To reset your password, please\n' +
                                        'check your email and follow the\n' +
                                        'instruction to reset your password.\n'}
                                </Text>
                            </VStack>
                        </Center>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                borderRadius={0}
                                bg={'blue.200'}
                                w={'100%'}
                                variant="basicButton"
                                onPress={() => {
                                    setShowModal(false);
                                }}
                            >
                                <Text textAlign={'center'} fontFamily={'Arch'} fontWeight={700} fontSize={'16px'} color={'white.100'}>
                                    Got it!
                                </Text>
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    );
};

export default PasswordChange;
