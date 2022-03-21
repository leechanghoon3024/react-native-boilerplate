import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Heading, IconButton, Text, useToast, Image, Pressable, Divider, HStack, StatusBar } from 'native-base';
import GoogleInput from './google.input';
import { useDebounce } from '../../hooks/useDebounce';
import HeaderBack from '../../containers/header/header.back';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { dateFormat } from '../../utils/times';
import SelectInput from '../customInput/select.input';
import SelectInput2 from '../customInput/select.input2';
import CustomInput from '../customInput/defaultInput';
import PasswordViewIcon from '../../assets/icons/passwordView.icon';
import useAxiosServices from '../../hooks/axiosHooks';
import { Ar17M, Ar18M, Ar18SbBlack, Ar21Sb, Ar22M, Ar36B } from '../../themes/font.style';
import DefaultDown from '../dropdown/default.down';
import { TransactionAddress, TransactionBAddress, TransactionBagCase } from '../../etc/bookStatusCase';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logoutAction, profileSetting } from '../../store/authReducer';
import GoogleMarker from './google.marker';
import { Keyboard, TouchableOpacity } from 'react-native';
import ModalWrapper from '../../containers/commons/modal/modal.wrapper';
import Toast from 'react-native-toast-message';
import { addressNullCheck } from '../../utils/gup';

const postcodeImage = require('../../assets/image/postcode.png');
const addressPin = require('../../assets/icons/address-pin.png');
const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const GOOGLE_API_KEY = 'AIzaSyAD_g8VuFlAZkj7aBSPBRicjeT3AQtdPQI';
export type PredictionType = {
    description: string;
    place_id: string;
    reference: string;
    matched_substrings: any[];
    tructured_formatting: Object;
    terms: Object[];
    types: string[];
};

const AddressSchema = Yup.object().shape({
    lat: Yup.string().required(`Please enter your firstName`),
    lot: Yup.string().required(`Please enter your lastName`),
    type: Yup.string().required(`Select your type of property`),
    typeText: Yup.string(),
});

const selectData = [
    { value: '1', label: 'House' },
    { value: '2', label: 'Townhouse' },
    { value: '3', label: 'Apartment' },
];

const GoogleSearchAdd = () => {
    const toast = useToast();
    const { axiosService } = useAxiosServices();
    const { params } = useRoute();

    const idx = params?.idx;

    const dispatch = useDispatch();
    const user = useSelector((user: RootState) => user.auth.user);
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
        validationSchema: AddressSchema,
        initialValues: {
            lat: '',
            lot: '',
            type: '',
            typeText: '',
        },
        onSubmit: async (value) => {
            console.log(value);
            modify ? await updateApi(value) : await insertApi(value);
        },
    });

    const [search, setSearch] = useState({ term: '', fetchPredictions: false });
    const [predictions, setPredictions] = useState<PredictionType[]>([]);
    const [showPredictions, setShowPredictions] = useState<boolean>(false);
    const [selectAddress, setSelectAddress] = useState(false);
    const [addressName, setAddressName] = useState({ address: '', addressMore: '', postcode: '' });
    const [postCodeList, setPostCodeList] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const getPostCodeList = async () => {
        const api = await axiosService.post('/pick/location/postcode');
        const { status, data } = api.data;
        console.log(data);
        if (status) {
            setPostCodeList([...data]);
        }
    };

    const onChangeText = async () => {
        try {
            if (search.term.trim() === '') return;
            if (!search.fetchPredictions) return;
            const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_API_KEY}&input=${search.term}&components=country:AU`;

            const result = await axios.request({
                method: 'post',
                url: apiUrl,
            });
            if (result) {
                const {
                    data: { predictions },
                } = result;
                setPredictions(predictions);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const insertApi = async (value: any) => {
        const { lat, lot, type, typeText } = value;
        const { addressMore, address, postcode } = addressName;

        try {
            const api = await axiosService.post('/users/app/address/insert', {
                lot,
                lat,
                type,
                moreText: typeText,
                address,
                addressMore,
                postcode,
            });
            const { status } = api.data;
            if (status) {
                await addressChangeProfileGet();
            } else {
                Toast.show({
                    type: 'error',
                    // @ts-ignore
                    text1: String('Error'),
                });
            }
        } catch (e) {
            console.log(e);
        }
    };
    const updateApi = async (value: any) => {
        const { lat, lot, type, typeText } = value;
        const { addressMore, address, postcode } = addressName;

        try {
            const api = await axiosService.post('/users/app/address/update', {
                idx,
                lot,
                lat,
                type,
                moreText: typeText,
                address,
                addressMore,
                postcode,
            });
            const { status } = api.data;
            if (status) {
                await addressChangeProfileGet();
                navigation.goBack();
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
        }
    };
    useDebounce(onChangeText, 1000, [search.term]);

    const formattingAddress = (address_components) => {
        if (!address_components) {
            return {
                address: '',
                addressMore: '',
                postcode: '',
            };
        }
        let addressString = '';
        let moreString = '';
        let postcode = '';
        const componentForm = {
            street_number: ['long_name', 'main'],
            route: ['long_name', 'main'],
            locality: ['long_name', 'main'],
            sublocality_level_1: ['long_name', 'main'],
            administrative_area_level_1: ['short_name', 'more'],
            administrative_area_level_2: ['short_name', 'more'],
            postal_code: ['short_name', 'no'],
        };
        for (let i = 0; i < address_components.length; i++) {
            // warning this only gets the first type of the component. E.g. 'sublocality_level_1'
            const addressType = address_components[i].types[0];
            if (componentForm[addressType]) {
                const [addressText, type] = componentForm[addressType];
                const val = address_components[i][addressText];
                if (type === 'main') {
                    addressString += '' + val + ', ';
                }
                if (type === 'more') {
                    moreString += '' + val + ', ';
                }
                if (type === 'no') {
                    postcode += val;
                }
            }
        }

        return {
            address: addressString.replace(/,\s*$/, ''),
            addressMore: moreString.replace(/,\s*$/, ''),
            postcode,
        };
    };

    const onPredictionTapped = async (placeId: string, description: string) => {
        const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/details/json?key=${GOOGLE_API_KEY}&place_id=${placeId}`;
        try {
            const result = await axios.request({
                method: 'post',
                url: apiUrl,
            });
            if (result) {
                const {
                    data: {
                        result: {
                            address_components,
                            geometry: { location },
                        },
                    },
                } = result;

                const { lat, lng } = location;
                const addressData = formattingAddress(address_components);
                console.log(postCodeList);
                console.log(addressData);
                if (postCodeList.includes(addressData.postcode ?? '')) {
                    setAddressName({ ...addressData });
                    setFieldValue('lat', lat);
                    setFieldValue('lot', lng);
                    setShowPredictions(false);
                    setSelectAddress(true);
                    setSearch((p) => ({ ...p, term: description }));
                } else {
                    Keyboard.dismiss();
                    setModalOpen(true);
                    setShowPredictions(false);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };
    const navigation = useNavigation();
    const saveCheck = () => {
        let check = false;
        if (values.type === '') {
            check = true;
        }
        if (search.term === '') {
            check = true;
        }
        if (values.lot === '') {
            check = true;
        }
        if (values.lat === '') {
            check = true;
        }
        console.log('cehck', check);
        return check;
    };

    const typePickHandler = (index: number, typeValue: any) => {
        setFieldValue('type', typeValue);
        setShowMoreText(typeValue === 3);
    };
    const [showMoreText, setShowMoreText] = useState(false);

    const [step, setStep] = useState(1);

    useEffect(() => {
        if (idx) {
            setStep(2);
            setModify(true);
            getAddressInfo();
        }
        getPostCodeList();
    }, [idx]);

    const [modify, setModify] = useState(false);

    const getAddressInfo = async () => {
        const api = await axiosService.post('/users/app/address/info', { idx });
        const { data, status } = api.data;
        if (status) {
            const { address, addressMore, moreText, lat, lot, type, postcode } = data;
            setSelectAddress(true);
            setAddressName({ address, addressMore, postcode });
            setFieldValue('type', type);
            setFieldValue('typeText', moreText);
            setFieldValue('lat', lat);
            setFieldValue('lot', lot);
            setShowMoreText(type === '3');
            setSearch({ term: address, fetchPredictions: false });
        }
    };
    const [removeOpen, setRemoveOpen] = useState(false);
    const addressChangeProfileGet = async () => {
        const getProfile = await axiosService.post('/users/app/profile');
        const { data: profileData, status: profileStatus } = getProfile.data;
        if (profileStatus) {
            dispatch(profileSetting({ user: profileData, userRole: profileData.userRole }));
            if (user.addressCheck === 1) {
                navigation.goBack();
            }
        }
    };
    const deleteAddressComplete = async () => {
        try {
            const api = await axiosService.post('/users/app/address/delete', { idx: idx });
            const { status } = api.data;
            if (status) {
                await addressChangeProfileGet();
            }
        } catch (e) {
            console.log(e);
        } finally {
            setRemoveOpen(false);
        }
    };
    return (
        <>
            <Box flex={1} safeArea py={4} bg={'white.100'}>
                <StatusBar barStyle={'dark-content'} />
                <Box px={'18px'} bg={'white.100'} alignItems={'flex-end'} justifyContent={'flex-end'}>
                    <TouchableOpacity onPress={() => dispatch(logoutAction())}>
                        <Text {...Ar18M} color={'blue.300'}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </Box>

                {step === 1 ? (
                    <>
                        <Box my={4} flex={1} pt={'30px'} px={'20px'}>
                            <Heading mx={'10px'} mb={'66.3px'} fontFamily={'Arch'} fontWeight={900} fontSize={'30px'} color={'black.100'}>
                                {'Pickup address'}
                            </Heading>
                            {selectAddress ? (
                                <Pressable onPress={() => setSelectAddress(false)}>
                                    <Box flexDirection={'row'} w={'100%'} pb={'20px'}>
                                        <Box w={'20%'} alignItems={'center'} justifyContent={'center'}>
                                            <Image source={addressPin} w={'24px'} h={'30px'} alt={'123'} />
                                        </Box>
                                        <Box w={'80%'}>
                                            <Text {...Ar18SbBlack}>{addressName.address}</Text>
                                            <Text {...Ar18M} color={'gray.300'}>
                                                {addressName.addressMore}
                                                {addressNullCheck(addressName.postcode)}
                                            </Text>
                                        </Box>
                                    </Box>
                                </Pressable>
                            ) : (
                                <GoogleInput
                                    onFocus={setShowPredictions}
                                    value={search.term}
                                    onChangeText={(text) => {
                                        console.log(text);
                                        setSearch({ term: text, fetchPredictions: true });
                                        onChangeText();
                                    }}
                                    showPredictions={showPredictions}
                                    predictions={predictions}
                                    onPredictionTapped={onPredictionTapped}
                                />
                            )}
                            <Box mt={4} />
                            {selectAddress && (
                                <>
                                    <DefaultDown
                                        value={values.type === '' ? 5 : values.type}
                                        defaultButtonText={'Type of property'}
                                        data={[1, 2, 3]}
                                        index={1}
                                        switchAction={user?.userType === 1 ? TransactionAddress : TransactionBAddress}
                                        bagValueHandler={typePickHandler}
                                    />
                                    {showMoreText && (
                                        <CustomInput
                                            {...Ar18SbBlack}
                                            value={values.typeText}
                                            error={errors.typeText}
                                            touched={touched.typeText}
                                            onChangeText={handleChange('typeText')}
                                            placeholder={user.userType === 1 ? 'Unit no' : 'Floor no'}
                                        />
                                    )}
                                </>
                            )}
                        </Box>
                        <Box flexDirection={'row'} w={'100%'} justifyContent={'space-between'} px={'30px'}>
                            <Button
                                disabled={saveCheck()}
                                onPress={() => (!saveCheck() ? setStep(2) : null)}
                                _disabled={{ bg: 'gray.100' }}
                                width={'100%'}
                                variant={'basicButton'}
                                shadow={8}
                                bg={saveCheck() ? 'gray.200' : 'blue.200'}
                            >
                                <Text {...Ar22M} color={'white.100'}>
                                    Continue
                                </Text>
                            </Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Box my={4} flex={1} pt={'30px'}>
                            <Heading mx={'20px'} mb={'12.3px'} {...Ar36B} color={'black.100'}>
                                {'Address info'}
                            </Heading>
                            <Box px={-10} alignSelf={'stretch'} zIndex={1} flex={1} maxH={'200px'} h={'200px'}>
                                <GoogleMarker marker={[{ lat: values.lat, lot: values.lot }]} />
                            </Box>
                            <Box px={'20px'} pt={'20px'}>
                                <Pressable
                                    onPress={() => setStep(1)}
                                    _pressed={{ opacity: 0.5 }}
                                    flexDirection={'row'}
                                    w={'100%'}
                                    pb={'20px'}
                                >
                                    <Box w={'20%'} alignItems={'center'} justifyContent={'center'}>
                                        <Image source={addressPin} w={'38px'} h={'38px'} alt={'123'} />
                                    </Box>
                                    <Box w={'80%'}>
                                        <Text {...Ar18SbBlack}>{addressName.address}</Text>
                                        <Text {...Ar18M} color={'gray.300'}>
                                            {addressName.addressMore}
                                            {addressNullCheck(addressName.postcode)}
                                        </Text>
                                    </Box>
                                </Pressable>
                                <Box flexDirection={'row'} w={'100%'} py={'20px'} pb={'30px'} pl={'20px'}>
                                    <Box w={'80%'}>
                                        <Text {...Ar18M} color={'gray.300'}>
                                            {'Type of property'}
                                        </Text>
                                        <Text {...Ar18SbBlack}>
                                            {user?.userType === 1
                                                ? TransactionAddress(Number(values.type) ?? 0)
                                                : TransactionBAddress(Number(values.type) ?? 0)}
                                        </Text>
                                    </Box>
                                    <Pressable w={'20%'} alignItems={'center'} justifyContent={'center'} onPress={() => setStep(1)}>
                                        <Box>
                                            <Text {...Ar17M} color={'#4C4C4C'}>
                                                Edit
                                            </Text>
                                        </Box>
                                    </Pressable>
                                </Box>
                                <Divider />
                                {showMoreText && (
                                    <>
                                        <Box flexDirection={'row'} w={'100%'} py={'20px'} pl={'20px'}>
                                            <Box w={'80%'}>
                                                <Text {...Ar18M} color={'gray.300'}>
                                                    {user.userType === 1 ? 'Unit no' : 'Floor no'}
                                                </Text>
                                                <Text {...Ar18SbBlack}>{values.typeText}</Text>
                                            </Box>
                                            <Pressable w={'20%'} alignItems={'center'} justifyContent={'center'} onPress={() => setStep(1)}>
                                                <Box>
                                                    <Text {...Ar17M} color={'#4C4C4C'}>
                                                        Edit
                                                    </Text>
                                                </Box>
                                            </Pressable>
                                        </Box>
                                        <Divider />
                                    </>
                                )}
                            </Box>
                        </Box>
                        <Box flexDirection={'row'} w={'100%'} justifyContent={'space-between'} px={'30px'}>
                            <Button
                                disabled={saveCheck()}
                                onPress={() => handleSubmit()}
                                _disabled={{ bg: 'gray.100' }}
                                width={'100%'}
                                variant={'basicButton'}
                                shadow={8}
                                bg={saveCheck() ? 'gray.200' : 'blue.200'}
                            >
                                <Text {...Ar22M} color={'white.100'}>
                                    {modify ? 'Update' : 'Save and Continue'}
                                </Text>
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
            <ModalWrapper
                open={removeOpen}
                onClose={() => setRemoveOpen(false)}
                onHandler={[
                    { text: 'Cancel', onPress: () => setRemoveOpen(false), color: 'gray.200' },
                    { text: 'Remove', onPress: deleteAddressComplete, color: 'blue.200' },
                ]}
                title={'Are you sure?'}
                content={'Are you sure you want to\n' + 'remove this location?'}
            />
            <ModalWrapper
                image={postcodeImage}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onHandler={[{ text: 'Got it!', onPress: () => setModalOpen(false), color: 'blue.200' }]}
                title={'Sorry...'}
                content={'Not available in your area right now. Please confirm the available location for pickup.'}
            />
        </>
    );
};

export default GoogleSearchAdd;
