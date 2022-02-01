import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Heading, IconButton, Text, useToast } from 'native-base';
import GoogleInput from './google.input';
import { useDebounce } from '../../hooks/useDebounce';
import HeaderBack from '../../containers/header/header.back';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { dateFormat } from '../../utils/times';
import SelectInput from '../customInput/select.input';
import SelectInput2 from '../customInput/select.input2';
import CustomInput from '../customInput/defaultInput';
import PasswordViewIcon from '../../assets/icons/passwordView.icon';
import useAxiosServices from '../../hooks/axiosHooks';
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
    typeText: Yup.string().required(`Please enter your lastName`),
});

const selectData = [
    { value: '1', label: 'House' },
    { value: '2', label: 'Townhouse' },
    { value: '3', label: 'Apartment' },
];

const GoogleSearch = () => {
    const toast = useToast();
    const { axiosService } = useAxiosServices();
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
            await insertApi(value);
        },
    });

    const [search, setSearch] = useState({ term: '', fetchPredictions: false });
    const [predictions, setPredictions] = useState<PredictionType[]>([]);
    const [showPredictions, setShowPredictions] = useState<boolean>(false);
    const onChangeText = async () => {
        try {
            if (search.term.trim() === '') return;
            if (!search.fetchPredictions) return;
            console.log('d24');
            const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_API_KEY}&input=${search.term}`;

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

    const insertApi = async (value) => {
        const { lat, lot, type, typeText } = value;
        const address = search.term;
        try {
            const api = await axiosService.post('/users/app/address/insert', { lot, lat, type, moreText: typeText, address });
            const { status } = api.data;
            if (status) {
                navigation.navigate('AddressInfo' as never);
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
                                    Complete!
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
            console.log(e);
            toast.show({
                placement: 'top',
                description: 'Complete',
                render: () => {
                    return (
                        <Box justifyContent={'center'} alignContent={'center'} w={'200px'} bg="blue.200" px="2" py="2" rounded="sm" mb={5}>
                            <Text color={'white.100'} textAlign={'center'}>
                                Complete!
                            </Text>
                        </Box>
                    );
                },
            });
        }
    };

    useDebounce(onChangeText, 1000, [search.term]);

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
                            geometry: { location },
                        },
                    },
                } = result;
                const { lat, lng } = location;
                setFieldValue('lat', lat);
                setFieldValue('lot', lng);
                console.log(lat, lng);
                setShowPredictions(false);
                setSearch((p) => ({ ...p, term: description }));
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
    return (
        <>
            <Box flex={1} safeArea px={4} py={4}>
                <HeaderBack navigation={navigation} />
                <Heading my={4} mt={6} fontFamily={'Arch'} fontWeight={900} fontSize={'30px'}>
                    {'Pickup Address'}
                </Heading>
                <Box p={2} flex={1} pt={4}>
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
                    <SelectInput2
                        selectData={selectData}
                        valueName={'type'}
                        label={'Gender'}
                        value={values.type}
                        error={errors.type}
                        touched={touched.type}
                        setFieldValue={setFieldValue}
                        placeholder="Type of property"
                    />
                    <Box mt={2}>
                        <CustomInput
                            value={values.typeText}
                            error={errors.typeText}
                            touched={touched.typeText}
                            onChangeText={handleChange('typeText')}
                            placeholder="Detailed address"
                        />
                    </Box>
                </Box>
                <Box flexDirection={'row'} w={'100%'} justifyContent={'space-between'}>
                    <Button
                        disabled={saveCheck()}
                        onPress={() => handleSubmit()}
                        _disabled={{ bg: 'gray.100' }}
                        width={'100%'}
                        variant={'basicButton'}
                        bg={saveCheck() ? 'gray.300' : 'blue.200'}
                    >
                        <Text fontSize={'18px'} fontWeight={100} fontFamily={'Arch'} color={'white.100'}>
                            Save
                        </Text>
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default GoogleSearch;
