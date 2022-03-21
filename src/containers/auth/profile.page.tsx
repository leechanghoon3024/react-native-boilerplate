import React, { useState } from 'react';
import { Box, Button, Flex, Heading, HStack, KeyboardAvoidingView, ScrollView, Text, useToast, VStack } from 'native-base';
import DefaultHeader from '../header/header.default';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthParamList } from '../../@types/navigationTypes';
import LabelInput from '../../components/customInput/Label.input';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Appearance, Platform, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { dateFormat, dateFormatNotTime } from '../../utils/times';
import MaskInput from '../../components/customInput/maskInput';
import SelectInput from '../../components/customInput/select.input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import useAxiosServices from '../../hooks/axiosHooks';
import { loginAction, profileSetting } from '../../store/authReducer';

const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required(`Please enter your firstName`),
    LastName: Yup.string().required(`Please enter your lastName`),
    email: Yup.string().email('Please enter a valid email').min(4, `email Too short`).required(`Please enter your email`),
    birthDate: Yup.string().required(`Please enter your birthdate`),
    mobile: Yup.string().required(`Please enter your Mobile`),
    gender: Yup.string().required(`Please enter your gender`),
});

const ProfilePage = () => {
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
            firstName: user?.userFirstName ?? '',
            LastName: user?.userName ?? '',
            email: user?.userEmail ?? user?.userId,
            birthDate: user?.userBirth,
            // birthDate: new Date('1993-06-29'),

            mobile: user?.userPhone ?? '',
            gender: user?.userGender ?? '',
        },
        onSubmit: async (value) => {
            console.log(value);
            await profileUpdate(value);
        },
    });
    console.log(errors);
    const { axiosService } = useAxiosServices();
    const [openBirth, setOpenBirth] = useState<boolean>(false);
    const toast = useToast();
    const navigation = useNavigation<NavigationProp<AuthParamList>>();
    const dispatch = useDispatch();
    const profileUpdate = async (value: any) => {
        try {
            const api = await axiosService.post('/users/app/profile/update', value);
            const { status } = api.data;
            if (status) {
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
                                        Update!
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
            <DefaultHeader navigation={navigation} />
            <Box pt={'10px'} px={5} flexGrow={1} safeAreaBottom justifyContent={'space-between'}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <Box alignItems={'flex-start'}>
                        <Heading fontFamily={'Arch'} fontWeight={'700'} fontSize={36}>
                            Profile
                        </Heading>
                        <VStack my={8} space={'8'} mb={18}>
                            <LabelInput
                                label={'First name'}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                                error={errors.firstName}
                                touched={touched.firstName}
                                onChangeText={handleChange('firstName')}
                                placeholder="FirstName"
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
                                label={'Email'}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                error={errors.email}
                                touched={touched.email}
                                onChangeText={handleChange('email')}
                                placeholder="email"
                            />
                            <TouchableOpacity
                                style={{ width: '100%' }}
                                onPress={() => {
                                    setOpenBirth(true);
                                }}
                            >
                                <LabelInput
                                    inter={() => setOpenBirth(true)}
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
                        </VStack>
                    </Box>
                    <Flex>
                        <Box justifyContent={'center'} alignItems={'center'}>
                            <Button onPress={() => handleSubmit()} variant={'shadowBasic'} bg={'blue.200'}>
                                <Text fontFamily={'Arch'} fontWeight={100} fontSize={22} color={'white.100'}>
                                    Save
                                </Text>
                            </Button>
                        </Box>
                    </Flex>
                    <Box mb={'40px'} />
                </KeyboardAwareScrollView>
            </Box>

            <DatePicker
                modal
                mode={'date'}
                open={openBirth}
                textColor={Appearance.getColorScheme() === 'dark' ? 'white' : 'black'}
                date={new Date(values.birthDate as any)}
                onConfirm={(date) => {
                    setOpenBirth(false);
                    setFieldValue('birthDate', dateFormatNotTime(date));
                }}
                onCancel={() => {
                    setOpenBirth(false);
                }}
            />
        </>
    );
};

export default ProfilePage;
