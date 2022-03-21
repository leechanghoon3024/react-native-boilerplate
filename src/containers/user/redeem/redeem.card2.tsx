import React, { useEffect, useState } from 'react';
import { Box, Image, Text } from 'native-base';
import { TouchableOpacity, Image as RNImage } from 'react-native';
import { Ar17N, Ar18M, Ar19N, Ar21B } from '../../../themes/font.style';
import useAxiosServices from '../../../hooks/axiosHooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { SubNumberHandler } from '../../../utils/gup';

interface Props {
    type: number;
    navigation: any;
}
const voucher = require('../../../assets/icons/voucher-icon.png');
const check = require('../../../assets/icons/simpleCheck.png');

const donateIcon = require('../../../assets/icons/donate-icon.png');
const paypalIcon = require('../../../assets/icons/paypal-icon.png');
const bankIcon = require('../../../assets/icons/bank-icon.png');

const imageCase = (type: any) => {
    switch (type) {
        case 0:
            return voucher;
        case 1:
            return paypalIcon;
        case 2:
            return donateIcon;
        case 3:
            return bankIcon;
        default:
            return voucher;
    }
};

const textCase = (type: any) => {
    switch (type) {
        case 0:
            return 'Voucher';
        case 1:
            return 'Paypal';
        case 2:
            return 'Donate';
        case 3:
            return 'Bank Transfer';
        default:
            return 'Voucher';
    }
};

const RedeemCard2 = ({ type, navigation }: Props) => {
    const { axiosService } = useAxiosServices();
    const [title, setTitle] = useState('');
    const getMyDonatin = async () => {
        const api = await axiosService.post('charity/my');
        const { data, status } = api.data;
        if (status) {
            setTitle(data);
        }
    };

    useEffect(() => {
        getMyDonatin();
    }, []);
    const user = useSelector((state: RootState) => state.auth.user);
    const PlainCase = (type: any) => {
        switch (type) {
            case 0:
                return 'You will need at least $10.00 of available funds to request a GiftPay eGift card.';
            case 1:
                return user?.paypal ?? '';
            case 2:
                return title;
            case 3:
                return SubNumberHandler(user?.bankNumber) ?? '';
            default:
                return 'You will need at least $10.00 of available funds to request a GiftPay eGift card.';
        }
    };
    return (
        <TouchableOpacity onPress={() => navigation.navigate('RedeemSelectScreen')}>
            <Box py={'10px'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                <Box flexDirection={'row'} w={'70%'}>
                    <RNImage resizeMode={'contain'} style={{ width: 30, height: 30, marginRight: 25 }} source={imageCase(type)} />
                    <Box flexDirection={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                        <Box>
                            <Text w={'100%'} {...Ar21B} color={'black.100'} pb={'10px'}>
                                {`${textCase(type)}`}
                            </Text>
                            <Text numberOfLines={4} {...Ar18M} color={'gray.300'}>
                                {`${PlainCase(type)}`}
                            </Text>
                        </Box>
                    </Box>
                </Box>
                <Box justifyContent={'flex-end'} alignItems={'flex-end'}>
                    <Image w={'30px'} h={'30px'} source={check} alt={'voucher'} />
                </Box>
            </Box>
        </TouchableOpacity>
    );
};

export default RedeemCard2;
