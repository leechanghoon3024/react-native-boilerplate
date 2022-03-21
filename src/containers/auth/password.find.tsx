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
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ErrorHelp from '../../components/customInput/error.help';
import CustomInput from '../../components/customInput/defaultInput';
import { useNavigation } from '@react-navigation/native';
import DefaultHeader from '../header/header.default';
import useAxiosServices from '../../hooks/axiosHooks';
import { useDispatch } from 'react-redux';
import { Ar17R, Ar25SbBlack, Ar28BoldBlack } from '../../themes/font.style';

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
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const mailHandler = (code: any, email: any) => {
        setShowModal(true);
        setCode(code);
        setEmail(email);
    };

    return (
        <>
            <DefaultHeader navigation={navigation} bg={'white.100'} />
            <Box bg={'white.100'} px={5} maxW={'400px'} safeAreaBottom flexGrow={1} justifyContent={'space-between'}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Box px={3} pt={'50px'} pb="10" alignItems={'flex-start'} mt={10}>
                        <Heading {...Ar28BoldBlack} mb={2}>
                            Forgot your password?
                        </Heading>
                        <Heading {...Ar17R} color={'black.100'}>
                            Enter your email to receive a verified Code
                        </Heading>
                    </Box>
                    <Box px={3}>
                        <Stack width={'100%'}>
                            <ErrorHelp errors={errors} />
                            <CustomInput
                                value={values.email}
                                error={errors.email}
                                touched={touched.email}
                                onChangeText={handleChange('email')}
                                placeholder="Email address"
                            />
                        </Stack>
                    </Box>
                    <Center mt={'100px'} px={3}>
                        <Stack width={'100%'}>
                            <Button h={'56px'} my={2} colorScheme={'blue.200'} onPress={() => handleSubmit()} variant={'basicButton'}>
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
            </Box>

            <Modal p={0} isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px" borderRadius={10}>
                    <Modal.Body>
                        <Center mt={10}>
                            <Image w={'100px'} h={'100px'} resizeMode={'contain'} source={mailIcon} alt={'houseimage'} />
                            <VStack space={2} mt={4} alignItems={'center'}>
                                <Text fontFamily={'Arch'} fontWeight={700} fontSize={'21px'} color={'black.100'}>
                                    Check your email
                                </Text>
                                <Text textAlign={'center'} fontFamily={'Arch'} fontWeight={700} fontSize={'14px'} color={'black.100'}>
                                    {'To reset your password, please\n' +
                                        'check your email and follow the\n' +
                                        'instruction to reset your password.\n'}
                                </Text>
                            </VStack>
                        </Center>
                    </Modal.Body>
                    <Modal.Footer p={0} bg={'blue.200'}>
                        <Button.Group>
                            <Button
                                borderRadius={0}
                                bg={'blue.200'}
                                w={'100%'}
                                variant="basicButton"
                                onPress={() => {
                                    setShowModal(false);
                                    navigation.navigate('PasswordValidate', { code: String(code), email });
                                }}
                            >
                                <Text textAlign={'center'} {...Ar25SbBlack} color={'white.100'}>
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
