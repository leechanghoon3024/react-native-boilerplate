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
import { loginAction, logoutAction, profileSetting } from '../../store/authReducer';
import BackIcon from '../../assets/icons/back.icon';
import { Ar18M, Ar18SbBlack, Ar21Sb, Ar36B } from '../../themes/font.style';
import ProfileCard from '../commons/profile.card';
import BackGray from '../../assets/icons/back.gray';

const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required(`Please enter your First name`),
    email: Yup.string().email('Please enter a valid email').min(4, `email Too short`).required(`Please enter your email`),
    birthDate: Yup.string().required(`Please enter your Birthdate`),
    mobile: Yup.string().required(`Please enter your Mobile`),
    gender: Yup.string().required(`Please enter your gender`),
});

const ProfileAddUser = () => {
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

    const { axiosService } = useAxiosServices();
    const [openBirth, setOpenBirth] = useState<boolean>(false);
    const [edit, setEdit] = useState(true);
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
                                Error
                            </Text>
                        </Box>
                    );
                },
            });
        } finally {
            setEdit(false);
        }
    };
    return (
        <Box bg={'white.100'}>
            <Box safeAreaTop px={'18px'} bg={'white.100'} alignItems={'flex-end'} justifyContent={'flex-end'}>
                <TouchableOpacity onPress={() => dispatch(logoutAction())}>
                    <Text {...Ar18M} color={'blue.300'}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </Box>
            <Box px={'24px'} flexGrow={1} safeAreaBottom justifyContent={'space-between'}>
                <KeyboardAwareScrollView style={{ paddingTop: edit ? 30 : -10 }} showsVerticalScrollIndicator={false}>
                    <Box alignItems={'flex-start'}>
                        {edit && (
                            <Heading ml={'14px'} {...Ar36B}>
                                Profile
                            </Heading>
                        )}

                        {edit ? (
                            <VStack my={8} space={'8'} mb={18}>
                                <LabelInput
                                    bg={'white.100'}
                                    label={'First name'}
                                    onBlur={handleBlur('firstName')}
                                    value={values.firstName}
                                    error={errors.firstName}
                                    touched={touched.firstName}
                                    onChangeText={handleChange('firstName')}
                                    placeholder="First name"
                                />
                                <LabelInput
                                    bg={'white.100'}
                                    label={'Last name'}
                                    onBlur={handleBlur('Lastname')}
                                    value={values.LastName}
                                    error={errors.LastName}
                                    touched={touched.LastName}
                                    onChangeText={handleChange('LastName')}
                                    placeholder="Last name"
                                />
                                <LabelInput
                                    bg={'white.100'}
                                    label={'Email'}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    error={errors.email}
                                    touched={touched.email}
                                    onChangeText={handleChange('email')}
                                    placeholder="Email"
                                />
                                <TouchableOpacity
                                    style={{ width: '100%' }}
                                    onPress={() => {
                                        setOpenBirth(true);
                                    }}
                                >
                                    <LabelInput
                                        bg={'white.100'}
                                        inter={() => setOpenBirth(true)}
                                        isDisabled={true}
                                        label={'Birth date'}
                                        value={values.birthDate}
                                        error={errors.birthDate}
                                        touched={touched.birthDate}
                                        onChangeText={handleChange('birthDate')}
                                        placeholder="Birth date"
                                    />
                                </TouchableOpacity>
                                <SelectInput
                                    bg={'white.100'}
                                    valueName={'gender'}
                                    label={'Gender'}
                                    value={values.gender}
                                    error={errors.gender}
                                    touched={touched.gender}
                                    setFieldValue={setFieldValue}
                                    placeholder="Gender"
                                />
                                {/*@ts-ignore*/}
                                <MaskInput
                                    bg={'white.100'}
                                    onBlur={handleBlur('mobile')}
                                    label={'Phone'}
                                    type={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]}
                                    value={values.mobile}
                                    error={errors.mobile}
                                    touched={touched.mobile}
                                    setFieldValue={setFieldValue}
                                    placeholder="0400 000 000"
                                />
                            </VStack>
                        ) : (
                            <VStack my={8} space={'8'} mb={18} ml={'14px'}>
                                <ProfileCard value={values.firstName} label={'First name'} />
                                <ProfileCard value={values.LastName} label={'Last name'} />
                                <ProfileCard value={values.email} label={'Email'} />
                                {user?.snsType !== 1 && (
                                    <Box
                                        pb={'30px'}
                                        flexDirection={'row'}
                                        justifyContent={'space-between'}
                                        alignItems={'center'}
                                        width={'100%'}
                                        borderColor={'gray.100'}
                                        borderBottomWidth={0.5}
                                    >
                                        <TouchableOpacity
                                            hitSlop={{
                                                top: 20,
                                                left: 20,
                                                right: 20,
                                                bottom: 20,
                                            }}
                                            style={{ width: '100%' }}
                                            onPress={() => navigation.navigate('PasswordNew' as never)}
                                        >
                                            <Box w={'100%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                                <Box>
                                                    <Text {...Ar18M} color={'blue.200'}>
                                                        Reset Password
                                                    </Text>
                                                </Box>
                                                <Box>
                                                    <BackGray color={'#4C4C4C'} />
                                                </Box>
                                            </Box>
                                        </TouchableOpacity>
                                    </Box>
                                )}

                                <ProfileCard value={values.birthDate} label={'Birthdate'} />
                                <ProfileCard
                                    value={values.gender === 1 ? 'Male' : values.gender === 2 ? 'Female' : 'Non-binary'}
                                    label={'Gender'}
                                />
                                <ProfileCard value={values.mobile} label={'Mobile'} />
                            </VStack>
                        )}
                    </Box>
                    {edit && (
                        <Flex mb={10}>
                            <Box justifyContent={'center'} alignItems={'center'}>
                                <Button onPress={() => handleSubmit()} variant={'dButton'} bg={'blue.200'}>
                                    <Text fontFamily={'Arch'} fontWeight={100} fontSize={22} color={'white.100'}>
                                        {'Save'}
                                    </Text>
                                </Button>
                            </Box>
                        </Flex>
                    )}
                    <Box mb={200} />
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
        </Box>
    );
};

export default ProfileAddUser;
