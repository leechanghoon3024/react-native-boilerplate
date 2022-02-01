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
import { useNavigation } from '@react-navigation/native';
import DefaultHeader from '../header/header.default';
import SelectAccountSheet from '../../components/bottomSheet/selectAccount.sheet';
import useAxiosServices from '../../hooks/axiosHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginAction, profileSetting } from '../../store/authReducer';

const SingInSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email').min(4, `email Too short`).required(`Please enter your email`),
});
const mailIcon = require('../../assets/icons/sendMail.png');
const PasswordFind = () => {
    const { handleChange, handleBlur, handleSubmit, errors, touched, initialValues, resetForm, values } = useFormik({
        validationSchema: SingInSchema,
        initialValues: {
            email: '',
        },
        onSubmit: async (value) => {
            await joinHandler(value);
        },
    });
    const toast = useToast();
    const navigation = useNavigation<any>();
    const { axiosService } = useAxiosServices();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const joinHandler = async (value: { email: string }) => {
        const { email } = value;
        try {
            const api = await axiosService.post('/users/check/password/email', { email });
            const { status, data } = api.data;
            if (status) {
                await mailHandler(data, email);
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
            console.log(e);
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

    const mailHandler = (code, email) => {
        setShowModal(true);
        navigation.navigate('PasswordValidate', { code: String(code), email });
    };

    return (
        <>
            <Box alignItems={'center'}>
                <Box px={5} maxW={'400px'} safeArea flexGrow={1} justifyContent={'space-between'}>
                    <DefaultHeader navigation={navigation} />
                    <ScrollView>
                        <Box pb="10" alignItems={'center'} mt={20}>
                            <Heading mb={2} fontFamily={'Arch'} fontWeight={700} fontSize={'28px'}>
                                Forgot your password?
                            </Heading>
                            <Heading fontFamily={'Arch'} fontWeight={500} fontSize={'16px'}>
                                Enter your email to receive a verified Code
                            </Heading>
                        </Box>
                        <Center>
                            <Stack space={4} width={'100%'}>
                                <ErrorHelp errors={errors} />
                                <CustomInput
                                    value={values.email}
                                    error={errors.email}
                                    touched={touched.email}
                                    onChangeText={handleChange('email')}
                                    placeholder="Email address"
                                />
                            </Stack>
                        </Center>
                        <Center mt={'100px'}>
                            <Stack space={4} width={'100%'}>
                                <Button my={2} colorScheme={'blue.200'} onPress={() => handleSubmit()} variant={'basicButton'}>
                                    <HStack alignItems={'center'}>
                                        <Box alignItems={'center'} width={'100%'}>
                                            <Text color={'white.100'} fontFamily={'Arch'} fontWeight={'700'} fontSize={21}>
                                                Continue
                                            </Text>
                                        </Box>
                                    </HStack>
                                </Button>
                            </Stack>
                        </Center>
                    </ScrollView>
                    <Flex>
                        <Box justifyContent={'flex-end'}>
                            <Box justifyContent={'center'} alignContent={'center'} flexDirection={'row'}>
                                <Text fontFamily={'Arch'} fontWeight={'100'} fontSize={'17'}>
                                    Don't have an account?
                                </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SingUpScreen')}>
                                    <Text fontFamily={'Arch'} fontWeight={'700'} fontSize={'17'} ml={1}>
                                        Sign up
                                    </Text>
                                </TouchableOpacity>
                            </Box>
                        </Box>
                    </Flex>
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

export default PasswordFind;
