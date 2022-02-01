import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Image as RNImage } from 'react-native';
import { Box, Button, Divider, Image, Text, useToast } from 'native-base';
import HeaderOnlyBack from '../../header/header.onBack';
import { TouchableOpacity } from 'react-native';
import useAxiosServices from '../../../hooks/axiosHooks';
import { logoutAction, payoutChange } from '../../../store/authReducer';
const voucher = require('../../../assets/icons/voucher-icon.png');
const arrow = require('../../../assets/icons/back-gray.png');
const recanShop = require('../../../assets/recan-shop.png');
const sampleImage = require('../../../assets/sample-image.png');
const check = require('../../../assets/icons/checked.png');
const unCheck = require('../../../assets/icons/unChecked.png');
const donateIcon = require('../../../assets/icons/donate-icon.png');
const paypalIcon = require('../../../assets/icons/paypal-icon.png');
const bankIcon = require('../../../assets/icons/bank-icon.png');
const sampleData = [
    { title: 'Bottles for Brushies', image: sampleImage, subTitle: 'Queensland Trust for Nature' },
    { title: 'Bottles for Brushies', image: sampleImage, subTitle: 'Queensland Trust for Nature' },
    { title: 'Bottles for Brushies', image: sampleImage, subTitle: 'Queensland Trust for Nature' },
];
const RedeemSelect = () => {
    const navigation = useNavigation();
    const { axiosService } = useAxiosServices();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const toast = useToast();

    const payoutUpdate = async (type) => {
        if (type === 1 || type === 3) {
            toast.show({
                placement: 'top',
                description: 'Complete',
                render: () => {
                    return (
                        <Box justifyContent={'center'} alignContent={'center'} w={'200px'} bg="blue.200" px="2" py="2" rounded="sm" mb={5}>
                            <Text color={'white.100'} textAlign={'center'}>
                                {'Sorry Ready for Service'}
                            </Text>
                        </Box>
                    );
                },
            });
            return;
        }

        try {
            const api = await axiosService.post('/users/payout/update', { type });
            const { status } = api.data;
            if (status) {
                dispatch(payoutChange({ payType: type }));
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
                                    {'Update'}
                                </Text>
                            </Box>
                        );
                    },
                });
            }
        } catch (e) {}
    };

    return (
        <Box flex={1}>
            <Box bg={'blue.200'}>
                <Box safeArea p={2}>
                    <HeaderOnlyBack navigation={navigation} />
                    <Box px={6} w={'100%'} justifyContent={'flex-start'} alignItems={'flex-start'}>
                        <Text mt={8} fontWeight={700} fontSize={'30px'} fontFamily={'Lato'} color={'white.100'}>
                            {`My payout`}
                        </Text>
                    </Box>
                </Box>
            </Box>
            <Box px={6} my={4}>
                <Box p={4} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Box flexDirection={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                        <Image source={paypalIcon} alt={'voucher'} mr={6} />
                        <Box>
                            <Text fontWeight={700} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                {`Paypal`}
                            </Text>
                            <Text fontWeight={700} fontSize={'14px'} fontFamily={'Arch'} color={'gray.200'}>
                                {`Ready for service`}
                            </Text>
                        </Box>
                    </Box>
                    <Box justifyContent={'flex-end'} alignItems={'flex-end'}>
                        <TouchableOpacity onPress={() => payoutUpdate(1)}>
                            <RNImage style={{ width: 30, height: 30 }} source={user?.payType === 1 ? check : unCheck} alt={'voucher'} />
                        </TouchableOpacity>
                    </Box>
                </Box>
                <Box p={4} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Box w={'40%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                        <Image source={donateIcon} alt={'voucher'} mr={6} />
                        <Box>
                            <Text fontWeight={700} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                {`Donnation`}
                            </Text>
                            {/*<Text fontWeight={700} fontSize={'14px'} fontFamily={'Arch'} color={'gray.200'}>*/}
                            {/*    {`N/A`}*/}
                            {/*</Text>*/}
                        </Box>
                    </Box>
                    <Box justifyContent={'flex-end'} alignItems={'flex-end'}>
                        <TouchableOpacity onPress={() => payoutUpdate(2)}>
                            <RNImage style={{ width: 30, height: 30 }} source={user?.payType === 2 ? check : unCheck} alt={'voucher'} />
                        </TouchableOpacity>
                    </Box>
                </Box>
                <Box p={4} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Box w={'40%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                        <Image source={voucher} alt={'voucher'} mr={6} />
                        <Box>
                            <Text w={'50%'} fontWeight={700} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                {`Vocher`}
                            </Text>
                            <Text w={'40%'} numberOfLines={4} fontWeight={700} fontSize={'14px'} fontFamily={'Arch'} color={'gray.200'}>
                                {`You will need at least $10.00 of available funds to request a GiftPay eGift card.`}
                            </Text>
                        </Box>
                    </Box>
                    <Box justifyContent={'flex-end'} alignItems={'flex-end'}>
                        <TouchableOpacity onPress={() => payoutUpdate(0)}>
                            <RNImage style={{ width: 30, height: 30 }} source={user?.payType === 0 ? check : unCheck} alt={'voucher'} />
                        </TouchableOpacity>
                    </Box>
                </Box>
                <Box p={4} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Box w={'40%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                        <Image source={bankIcon} alt={'voucher'} mr={6} />
                        <Box>
                            <Text fontWeight={700} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                {`Bank Transfer`}
                            </Text>
                            <Text fontWeight={700} fontSize={'14px'} fontFamily={'Arch'} color={'gray.200'}>
                                {`Ready for service`}
                            </Text>
                        </Box>
                    </Box>
                    <Box justifyContent={'flex-end'} alignItems={'flex-end'}>
                        <TouchableOpacity onPress={() => payoutUpdate(3)}>
                            <RNImage style={{ width: 30, height: 30 }} source={user?.payType === 3 ? check : unCheck} alt={'voucher'} />
                        </TouchableOpacity>
                    </Box>
                </Box>
                <Divider />
            </Box>
        </Box>
    );
};

export default RedeemSelect;
