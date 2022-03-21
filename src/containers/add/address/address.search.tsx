import React from 'react';

import { Box, Button, Heading, Image, Popover, Text, VStack } from 'native-base';
import HeaderBack from '../../header/header.back';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { addressListType } from '../../../@types/userTypes';

interface Props {
    address: addressListType;
}
const marker = require('../../assets/icons/address-pin.png');
const dotHorizen = require('../../assets/icons/dotHorizon.png');
const checked = require('../../assets/icons/checked.png.png');
const AddressSearchAdd = () => {
    const navigation = useNavigation();
    return (
        <Box flex={1} safeArea px={4} py={4}>
            <HeaderBack navigation={navigation} />
            <Heading my={4} mt={6} fontFamily={'Arch'} fontWeight={900} fontSize={'30px'}>
                {'Address info'}
            </Heading>
            <Box p={2} flex={1} pt={4}>
                <GooglePlacesAutocomplete
                    placeholder="Search"
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: 'AIzaSyDB_ZJ7zJSMFO0nD5XCYghXpT-hxCvR1Y4',
                        language: 'en',
                    }}
                />
            </Box>
            <Box flexDirection={'row'} w={'100%'} justifyContent={'space-between'}>
                <Button
                    onPress={() => console.log('d')}
                    _disabled={{ bg: 'gray.100' }}
                    width={'100%'}
                    variant={'basicButton'}
                    bg={'blue.200'}
                >
                    <Text fontSize={'18px'} fontWeight={100} fontFamily={'Arch'} color={'white.100'}>
                        Add
                    </Text>
                </Button>
            </Box>
        </Box>
    );
};

export default AddressSearchAdd;
