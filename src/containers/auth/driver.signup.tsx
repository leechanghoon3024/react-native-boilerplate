import React, { useState } from 'react';
import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    HStack,
    IconButton,
    Image,
    KeyboardAvoidingView,
    Modal,
    ScrollView,
    Text,
    useToast,
    VStack,
} from 'native-base';
import DefaultHeader from '../header/header.default';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthParamList } from '../../@types/navigationTypes';
import LabelInput from '../../components/customInput/Label.input';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Platform, TouchableOpacity, Image as RNImage, Appearance } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { dateFormat } from '../../utils/times';
import MaskInput from '../../components/customInput/maskInput';
import SelectInput from '../../components/customInput/select.input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import useAxiosServices, { baseUrl } from '../../hooks/axiosHooks';
import { loginAction, profileSetting } from '../../store/authReducer';
import DriverLoginHeader from '../header/driver.loginHeader';
import ImagePicker from 'react-native-image-crop-picker';
import PasswordViewIcon from '../../assets/icons/passwordView.icon';
import { loadingAction } from '../../store/commonReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LibImage = require('../../assets/icons/photo.png');
const CameraImage = require('../../assets/icons/camera.png');

const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required(`Please enter your firstName`),
    LastName: Yup.string().required(`Please enter your lastName`),
    email: Yup.string().email('Please enter a valid email').min(4, `email Too short`).required(`Please enter your email`),
    birthDate: Yup.string().required(`Please enter your birthdate`),
    mobile: Yup.string().required(`Please enter your Mobile`),
    gender: Yup.string().required(`Please enter your gender`),
    password: Yup.string().min(4, `Password Too short`).required(`Please enter your password`),
    passwordCheck: Yup.string().oneOf([Yup.ref('password'), null], "Password doesn't match"),
});
const checked = require('../../assets/icons/checked.png');
const passwordIcon = require('../../assets/icons/password.png');
const DriverSignup = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const {
        isValid,
        setTouched,
        setFieldTouched,
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        initialValues,
        resetForm,
        values,
    } = useFormik({
        validationSchema: ProfileSchema,
        initialValues: {
            firstName: '',
            LastName: '',
            email: '',
            birthDate: '',
            mobile: '',
            gender: '',
            password: '',
            passwordCheck: '',
        },
        onSubmit: async (value) => {
            console.log(value);
            await profileUpdate(value);
        },
    });
    const [modalComplete, setModalComplete] = useState(false);
    const { axiosService } = useAxiosServices();
    const [openBirth, setOpenBirth] = useState<boolean>(false);
    const toast = useToast();
    const navigation = useNavigation<NavigationProp<AuthParamList>>();
    const dispatch = useDispatch();
    const profileUpdate = async (value: any) => {
        try {
            for (const row of photo) {
                if (!row) {
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
                                        Driver License Upload please
                                    </Text>
                                </Box>
                            );
                        },
                    });
                    return;
                }
            }
            const api = await axiosService.post('/users/app/driver/sign', value);
            const { status, idx } = api.data;
            if (status) {
                await imageSave(idx);
                setModalComplete(true);
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
                                    Error!
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

    const imageSave = async (id: number) => {
        dispatch(loadingAction());
        const form = new FormData();
        for (const row of photo) {
            const { path, mime } = row;
            const type = mime.split('/')[1] ? mime.split('/')[1] : 'jpg';
            const imageData = {
                uri: path,
                type: mime,
                name: `driver_${id}.` + type,
            };
            form.append(`file`, imageData as any);
        }
        form.append('id', id as any);
        const api = await fetch(`${baseUrl}/users/app/driver/sign/upload`, {
            method: 'POST',
            body: form,
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        const result = await api.json();
        dispatch(loadingAction());
        return result.status;
    };

    const [photo, setPhoto] = useState<any>([null, null]);
    const photoInsert = (data: any) => {
        const temp = [...photo];
        if (temp[0]) {
            setPhoto([...[temp[0], data]]);
        } else {
            setPhoto([...[data, temp[1]]]);
        }
    };
    const photoDelete = (i: any) => {
        const temp = [...photo];
        if (i === 0) {
            setPhoto([...[null, temp[1]]]);
        } else {
            setPhoto([...[temp[0], null]]);
        }
    };

    const photoHandler = async (type: 'pick' | 'camera') => {
        if (type === 'pick') {
            await ImagePicker.openPicker({
                width: 600,
                height: 600,
                compressImageQuality: 0.5,
            }).then((image) => {
                setPhoto([]);
                photoInsert(image);
            });
        } else {
            await ImagePicker.openCamera({
                width: 600,
                height: 600,
                compressImageQuality: 0.5,
            }).then((image) => {
                photoInsert(image);
            });
        }
    };
    const [passwordView, setPasswordView] = useState(false);
    const [passwordView2, setPasswordView2] = useState(false);

    return (
        <>
            <DriverLoginHeader navigation={navigation} />
            <Box px={5} flexGrow={1} safeAreaBottom justifyContent={'space-between'}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <Box mt={16} alignItems={'flex-start'}>
                        <Heading ml={4} mb={6} fontFamily={'Arch'} fontWeight={'700'} fontSize={'24px'}>
                            Sign up RECAN Driver
                        </Heading>
                        <VStack my={8} space={6} mb={18}>
                            <LabelInput
                                label={'Email'}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                error={errors.email}
                                touched={touched.email}
                                onChangeText={handleChange('email')}
                                placeholder="email"
                            />
                            <LabelInput
                                label={'Password'}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                error={errors.password}
                                touched={touched.password}
                                onChangeText={handleChange('password')}
                                placeholder="Password"
                                type={passwordView ? 'text' : 'password'}
                                InputRightElement={
                                    <IconButton
                                        onPress={() => setPasswordView((p) => !p)}
                                        _pressed={{ bg: 'transfer', opacity: 0.5 }}
                                        icon={<PasswordViewIcon color={'#ACACAC'} boolean={passwordView} />}
                                    />
                                }
                            />
                            <LabelInput
                                label={'Password Check'}
                                onBlur={handleBlur('passwordCheck')}
                                value={values.passwordCheck}
                                error={errors.passwordCheck}
                                touched={touched.passwordCheck}
                                onChangeText={handleChange('passwordCheck')}
                                placeholder="Confrim password "
                                type={passwordView2 ? 'text' : 'password'}
                                InputRightElement={
                                    <IconButton
                                        onPress={() => setPasswordView2((p) => !p)}
                                        _pressed={{ bg: 'transfer', opacity: 0.5 }}
                                        icon={<PasswordViewIcon color={'#ACACAC'} boolean={passwordView2} />}
                                    />
                                }
                            />

                            <LabelInput
                                label={'Last name'}
                                onBlur={handleBlur('Lastname')}
                                value={values.LastName}
                                error={errors.LastName}
                                touched={touched.LastName}
                                onChangeText={handleChange('LastName')}
                                placeholder="LastName"
                            />
                            <LabelInput
                                label={'First name'}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                                error={errors.firstName}
                                touched={touched.firstName}
                                onChangeText={handleChange('firstName')}
                                placeholder="FirstName"
                            />

                            <TouchableOpacity
                                onPress={() => {
                                    setOpenBirth(true);
                                }}
                            >
                                <LabelInput
                                    isDisabled={true}
                                    label={'BirthDate'}
                                    value={values.birthDate}
                                    error={errors.birthDate}
                                    touched={touched.birthDate}
                                    onChangeText={handleChange('birthDate')}
                                    placeholder="BirthDate"
                                />
                            </TouchableOpacity>
                            <SelectInput
                                valueName={'gender'}
                                label={'Gender'}
                                value={values.gender}
                                error={errors.gender}
                                touched={touched.gender}
                                setFieldValue={setFieldValue}
                                placeholder="gender"
                            />
                            {/*@ts-ignore*/}
                            <MaskInput
                                onBlur={handleBlur('mobile')}
                                label={'Mobile'}
                                type={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]}
                                value={values.mobile}
                                error={errors.mobile}
                                touched={touched.mobile}
                                setFieldValue={setFieldValue}
                                placeholder="email"
                            />
                            <Box ml={2}>
                                <Text fontFamily={'Arch'} fontWeight={500} fontSize={'17px'} color={'blue.200'}>
                                    Driver’s License
                                </Text>
                                <Text fontFamily={'Arch'} fontWeight={300} fontSize={'15px'}>
                                    Upload your valid driver’s license both sides.
                                </Text>
                                <Box mt={6} mb={0} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                                    <Box justifyContent={'center'} alignItems={'center'}>
                                        <Button
                                            onPress={() => photoHandler('camera')}
                                            variant={'basicButton'}
                                            w={'100px'}
                                            h={'50px'}
                                            borderColor={'black.100'}
                                            borderWidth={'1'}
                                        >
                                            <Image
                                                style={{ width: 30, height: 30, resizeMode: 'contain' }}
                                                source={CameraImage}
                                                alt={'LibImage'}
                                            />
                                        </Button>
                                        <Text fontFamily={'Arch'} fontWeight={500} fontSize={'17px'} color={'blue.200'}>
                                            Take a photo
                                        </Text>
                                    </Box>
                                    <Box ml={6} justifyContent={'center'} alignItems={'center'}>
                                        <Button
                                            onPress={() => photoHandler('pick')}
                                            variant={'basicButton'}
                                            w={'100px'}
                                            h={'50px'}
                                            borderColor={'black.100'}
                                            borderWidth={'1'}
                                        >
                                            <Image
                                                style={{ width: 30, height: 30, resizeMode: 'contain' }}
                                                source={LibImage}
                                                alt={'LibImage'}
                                            />
                                        </Button>
                                        <Text fontFamily={'Arch'} fontWeight={500} fontSize={'17px'} color={'blue.200'}>
                                            Choose Image
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>

                            <Box flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                                {photo[0] ? (
                                    <TouchableOpacity onPress={() => photoDelete(0)}>
                                        <RNImage
                                            source={{ uri: photo[0].path }}
                                            style={{ width: 133, height: 84, resizeMode: 'stretch' }}
                                        />
                                    </TouchableOpacity>
                                ) : (
                                    <Box w={'133px'} h={'84px'} bg={'gray.200'} />
                                )}
                                {photo[1] ? (
                                    <TouchableOpacity style={{ marginLeft: 18 }} onPress={() => photoDelete(1)}>
                                        <RNImage
                                            source={{ uri: photo[1].path }}
                                            style={{ width: 133, height: 84, resizeMode: 'stretch' }}
                                        />
                                    </TouchableOpacity>
                                ) : (
                                    <Box ml={6} w={'133px'} h={'84px'} bg={'gray.200'} />
                                )}
                            </Box>
                        </VStack>
                        <Box w={'100%'} my={6} mt={20} alignItems={'center'}>
                            <Text width={'90%'} fontFamily={'Arch'} fontWeight={500} fontSize={'15px'} color={'gray.300'}>
                                By proceeding, I agree that Uber, its affiliates and/or representatives may contact me (including by
                                automatic telephone dialling system, SMS and email) at the contact details on file with my account,
                                including for marketing purposes. I understand that this is not a requirement to use Uber's services and
                                that I may opt out of these communications by following the instructions in the message. I have also read
                                and understand the Privacy Notice.
                            </Text>
                        </Box>
                    </Box>
                    <Flex mb={10}>
                        <Box justifyContent={'center'} alignItems={'center'}>
                            <Button onPress={() => handleSubmit()} variant={'shadowBasic'} bg={'blue.200'}>
                                <Text fontFamily={'Arch'} fontWeight={100} fontSize={22} color={'white.100'}>
                                    Sign up to RECAN Driver
                                </Text>
                            </Button>
                        </Box>
                    </Flex>
                    <Box justifyContent={'flex-end'}>
                        <Box justifyContent={'center'} alignContent={'center'} flexDirection={'row'}>
                            <Text fontFamily={'Arch'} fontWeight={'100'} fontSize={'17'}>
                                have an account?
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('LoginSelect')}>
                                <Text fontFamily={'Arch'} fontWeight={'700'} fontSize={'17'} ml={1}>
                                    Sign in
                                </Text>
                            </TouchableOpacity>
                        </Box>
                    </Box>
                    <Box mb={40} />
                </KeyboardAwareScrollView>
            </Box>
            <Modal isOpen={modalComplete} onClose={() => setModalComplete(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header> </Modal.Header>
                    <Modal.Body>
                        <Center>
                            <Image w={'100px'} h={'100px'} resizeMode={'contain'} source={checked} alt={'houseimage'} />
                            <VStack space={2} mt={4} alignItems={'center'}>
                                <Text fontFamily={'Arch'} fontWeight={700} fontSize={'16px'}>
                                    Awesome!
                                </Text>
                                <Text textAlign={'center'} fontFamily={'Arch'} fontWeight={700} fontSize={'12px'}>
                                    {'Your application has been received,\n' + 'one of RECAN staff will contact you\n' + 'shortly.\n'}
                                </Text>
                            </VStack>
                        </Center>
                    </Modal.Body>
                    <Modal.Footer p={0} bottom={-5}>
                        <Button.Group space={0}>
                            <Button
                                borderRadius={0}
                                bg={'blue.200'}
                                w={'100%'}
                                variant="basicButton"
                                onPress={() => {
                                    navigation.navigate('LoginSelect');
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

            <DatePicker
                modal
                mode={'date'}
                open={openBirth}
                date={new Date()}
                textColor={Appearance.getColorScheme() === 'dark' ? 'white' : 'black'}
                onConfirm={(date) => {
                    setOpenBirth(false);
                    setFieldValue('birthDate', dateFormat(date));
                }}
                onCancel={() => {
                    setOpenBirth(false);
                }}
            />
        </>
    );
};

export default DriverSignup;
