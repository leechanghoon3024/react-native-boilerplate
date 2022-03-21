import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, Heading, Image, Popover, ScrollView, StatusBar, Text, useToast, VStack } from 'native-base';
import HeaderBack from '../../header/header.back';
import { useNavigation } from '@react-navigation/native';
import { addressListType } from '../../../@types/userTypes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddressCard from '../../../components/card/address.card';
import useAxiosServices from '../../../hooks/axiosHooks';
import ModalWrapper from '../../commons/modal/modal.wrapper';
import { Ar16Sb, Ar18M, Ar22M, Ar25SbBlack, Ar36B } from '../../../themes/font.style';
import { useDispatch } from 'react-redux';
import { loginAction, profileSetting } from '../../../store/authReducer';
const marker = require('../../../assets/icons/address-pin.png');
const dotHorizen = require('../../../assets/icons/dotHorizon.png');
const AddressInfoAdd = () => {
    const toast = useToast();
    const { axiosService } = useAxiosServices();
    const navigation = useNavigation();
    const dispatch = useDispatch();
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

    const [removeOpen, setRemoveOpen] = useState(false);
    const [target, setTarget] = useState(0);

    const deleteAddress = async (idx: number) => {
        setTarget(idx);
        setRemoveOpen(true);
    };

    const deleteAddressComplete = async () => {
        try {
            const api = await axiosService.post('/users/app/address/delete', { idx: target });
            const { status } = api.data;
            if (status) {
                await getAddressList();
                await addressChangeProfileGet();
            }
        } catch (e) {
            console.log(e);
        } finally {
            setRemoveOpen(false);
            setTarget(0);
        }
    };

    const mainSelect = async (idx: any) => {
        try {
            const api = await axiosService.post('/users/app/address/mainCheck', { addressNumber: idx });
            const { status } = api.data;
            if (status) {
                await getAddressList();
                await addressChangeProfileGet();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const addressChangeProfileGet = async () => {
        const getProfile = await axiosService.post('/users/app/profile');
        const { data: profileData, status: profileStatus } = getProfile.data;
        if (profileStatus) {
            dispatch(profileSetting({ user: profileData, userRole: profileData.userRole }));
        }
    };

    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <Box flex={1} safeArea px={'30px'} py={4} bg={'white.100'}>
                <Heading my={4} mt={'50px'} {...Ar36B} fontSize={'30px'}>
                    {'Pickup address'}
                </Heading>
                <Box flex={1} pt={4}>
                    <VStack>
                        {mainList.map((v, i) => (
                            <AddressCard
                                main={true}
                                makeMain={mainSelect}
                                key={`address_card_${i}`}
                                address={v}
                                deleteAddress={deleteAddress}
                            />
                        ))}
                    </VStack>
                    {mainList.length !== 0 && subList.length !== 0 && <Divider />}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <VStack>
                            {mainList.length === 0 && subList.length === 0 && (
                                <Box alignItems={'center'} my={'30px'}>
                                    <Text {...Ar16Sb}>Please search for the address and add it.</Text>
                                </Box>
                            )}
                            {subList.map((v, i) => (
                                <AddressCard makeMain={mainSelect} key={`address_card_${i}`} address={v} deleteAddress={deleteAddress} />
                            ))}
                        </VStack>
                    </ScrollView>
                </Box>
                <Box flexDirection={'row'} w={'100%'} justifyContent={'space-between'}>
                    <Button
                        onPress={() => navigation.navigate('AddressSearch' as never)}
                        _disabled={{ bg: 'gray.100' }}
                        width={'100%'}
                        variant={'basicButton'}
                        bg={'blue.200'}
                        shadow={8}
                    >
                        <Text {...Ar22M} color={'white.100'}>
                            Add
                        </Text>
                    </Button>
                </Box>
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
        </>
    );
};
export default AddressInfoAdd;
