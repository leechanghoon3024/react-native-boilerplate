import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Image as RNImage } from 'react-native';
import { Box, Button, Divider, Image, Pressable, StatusBar, Text, useToast } from 'native-base';
import HeaderOnlyBack from '../../header/header.onBack';
import { TouchableOpacity } from 'react-native';
import useAxiosServices from '../../../hooks/axiosHooks';
import { logoutAction, payoutChange } from '../../../store/authReducer';
import { Ar17N, Ar19N, Ar21B, Ar21N, Ar36B } from '../../../themes/font.style';
import InfoModal from '../confirm/info.modal';
import InputModal from '../../commons/modal/input.modal';
import BankSheet from '../../../components/bottomSheet/bank.sheet';
import { SubNumberHandler, textSizing } from '../../../utils/gup';
import BackGray from '../../../assets/icons/back.gray';
const voucher = require('../../../assets/icons/voucher-icon.png');
const arrow = require('../../../assets/icons/back-gray.png');
const recanShop = require('../../../assets/recan-shop.png');
const sampleImage = require('../../../assets/sample-image.png');
const check = require('../../../assets/icons/simpleCheck.png');
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
    const [paypalOpen, setPaypalOpen] = useState(false);
    const [bankOpen, setBankOpen] = useState(false);

    const modalSwitch = async (type: 1 | 2) => {
        if (type === 1) {
            if (user?.paypal) {
                await payoutUpdate(1);
                setPaypalOpen(true);
            } else {
                await payoutUpdate(3);
                setBankOpen(true);
            }
        }
    };

    const payoutUpdate = async (type: any) => {
        if (type === 1 || type === 3) {
            toast.show({
                placement: 'bottom',
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

    const getMyDonatin = async () => {
        const api = await axiosService.post('charity/my');
        const { data, status } = api.data;
        console.log(api);
        if (status) {
            console.log(data);
            setTitle(data);
        }
    };

    const [title, setTitle] = useState(null);
    useEffect(() => {
        getMyDonatin();
    }, []);

    const checkFontStyle = (value: string | null | undefined) => {
        if (!value) {
            return {
                ...Ar17N,
                color: 'gray.200',
            };
        } else {
            return {
                ...Ar17N,
                color: 'gray.300',
            };
        }
    };

    const CheckIconPayout = (value: boolean) => {
        if (!value) {
            return <BackGray />;
        } else {
            return <RNImage style={{ width: 27, height: 27, left: 10 }} source={check} />;
        }
    };

    return (
        <>
            <StatusBar barStyle={'light-content'} />
            <Box flex={1} bg={'white.100'}>
                <Box bg={'blue.200'}>
                    <Box safeAreaTop p={2} pb={'35px'}>
                        <HeaderOnlyBack navigation={navigation} />
                        <Box px={6} w={'100%'} justifyContent={'flex-start'} alignItems={'flex-start'}>
                            <Text mt={8} {...Ar36B} color={'white.100'}>
                                {`My payout`}
                            </Text>
                        </Box>
                    </Box>
                </Box>
                <Box px={6} my={4}>
                    <Pressable
                        onPress={() => setPaypalOpen(true)}
                        p={4}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        alignItems={'flex-start'}
                    >
                        <Box w={'70%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                            <Image top={1} w={'29px'} h={'29px'} source={paypalIcon} alt={'voucher'} mr={6} />
                            <Box>
                                <Text {...Ar21B} color={'black.100'} mb={'18px'}>{`Paypal`}</Text>
                                <Text {...checkFontStyle(user?.paypal)}>{user?.paypal ?? 'Get your refund via your PayPal'}</Text>
                            </Box>
                        </Box>
                        <Box top={2}>
                            <TouchableOpacity onPress={() => null}>{CheckIconPayout(user?.payType === 1)}</TouchableOpacity>
                        </Box>
                    </Pressable>
                    <Divider />
                    <Pressable
                        onPress={() => navigation.navigate('RedeemCharitied' as never)}
                        p={4}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        alignItems={'flex-start'}
                    >
                        <Box flexDirection={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                            <Image top={1} w={'29px'} h={'29px'} source={donateIcon} alt={'voucher'} mr={6} />
                            <Box>
                                <Text {...Ar21B} color={'black.100'} mb={'18px'}>{`Donation`}</Text>
                                <Text {...checkFontStyle(title)}>{title ?? 'Browse available charities'}</Text>
                            </Box>
                        </Box>
                        <Box top={2}>
                            <TouchableOpacity onPress={() => null}>{CheckIconPayout(user?.payType === 2)}</TouchableOpacity>
                        </Box>
                    </Pressable>
                    <Divider />
                    <Pressable
                        onPress={() => payoutUpdate(0)}
                        p={4}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        alignItems={'flex-start'}
                    >
                        <Box w={'70%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                            <Image top={1} w={'29px'} h={'29px'} source={voucher} alt={'voucher'} mr={6} />
                            <Box>
                                <Text {...Ar21B} color={'black.100'} mb={'18px'}>{`Vocher`}</Text>
                                <Text {...checkFontStyle('vo')}>
                                    {'You will need at least $10.00 of available funds to request a GiftPay eGift card.'}
                                </Text>
                            </Box>
                        </Box>
                        <Box top={2}>
                            <TouchableOpacity onPress={() => payoutUpdate(0)}>{CheckIconPayout(user?.payType === 0)}</TouchableOpacity>
                        </Box>
                    </Pressable>
                    <Divider />
                    <Pressable
                        onPress={() => setBankOpen(true)}
                        p={4}
                        flexDirection={'row'}
                        justifyContent={'space-between'}
                        alignItems={'flex-start'}
                    >
                        <Box w={'70%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                            <Image top={1} w={'29px'} h={'29px'} source={bankIcon} alt={'voucher'} mr={6} />
                            <Box>
                                <Text {...Ar21B} color={'black.100'} mb={'18px'}>{`Bank Transfer`}</Text>
                                <Text {...checkFontStyle(user?.bankNumber)}>
                                    {' '}
                                    {textSizing(user?.bankName, 15) ?? 'Link your bank account'}
                                </Text>
                                <Text {...checkFontStyle(user?.bankNumber)}> {SubNumberHandler(user?.bankNumber)}</Text>
                            </Box>
                        </Box>
                        <Box top={2}>
                            <TouchableOpacity onPress={() => setBankOpen(true)}>{CheckIconPayout(user?.payType === 3)}</TouchableOpacity>
                        </Box>
                    </Pressable>
                    <Divider />
                </Box>
            </Box>
            <InputModal title={'PayPal'} type={1} onClose={() => setPaypalOpen(false)} open={paypalOpen} />
            <BankSheet open={bankOpen} setOpen={setBankOpen} />
            {/*<InputModal title={'Bank'} type={2} onClose={() => setBankOpen(false)} open={bankOpen} />*/}
        </>
    );
};

export default RedeemSelect;
