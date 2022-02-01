import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Heading, Image, Popover, Text, useToast, VStack } from 'native-base';
import HeaderBack from '../../header/header.back';
import { useNavigation } from '@react-navigation/native';
import { addressListType } from '../../../@types/userTypes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddressCard from '../../../components/card/address.card';
import useAxiosServices from '../../../hooks/axiosHooks';
const marker = require('../../../assets/icons/address-pin.png');
const dotHorizen = require('../../../assets/icons/dotHorizon.png');
const AddressInfo = () => {
    const toast = useToast();
    const { axiosService } = useAxiosServices();
    const navigation = useNavigation();
    const [mainList, setMainList] = useState<addressListType[]>([]);
    const [subList, setSubList] = useState<addressListType[]>([]);

    useEffect(() => {
        const _unsubscribe = navigation.addListener('focus', async () => {
            await getAddressList();
        });
        return _unsubscribe;
    }, []);

    const getAddressList = async () => {
        try {
            const api = await axiosService.post('/users/app/address/list');
            const { status, main, sub } = api.data;
            if (status) {
                setMainList([...main]);
                setSubList([...sub]);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const mainSelect = async (idx) => {
        try {
            const api = await axiosService.post('/users/app/address/mainCheck', { addressNumber: idx });
            const { status } = api.data;
            if (status) {
                await getAddressList();
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Box flex={1} safeArea px={4} py={4}>
            <HeaderBack navigation={navigation} />
            <Heading my={4} mt={6} fontFamily={'Arch'} fontWeight={900} fontSize={'30px'}>
                {'Pickup address'}
            </Heading>
            <Box p={2} flex={1} pt={4}>
                <VStack>
                    {mainList.map((v, i) => (
                        <AddressCard makeMain={mainSelect} key={`address_card_${i}`} address={v} />
                    ))}
                </VStack>
                <Divider />
                <VStack>
                    {subList.map((v, i) => (
                        <AddressCard makeMain={mainSelect} key={`address_card_${i}`} address={v} />
                    ))}
                </VStack>
            </Box>
            <Box flexDirection={'row'} w={'100%'} justifyContent={'space-between'}>
                <Button
                    onPress={() => navigation.navigate('AddressSearch' as never)}
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
export default AddressInfo;
