import React from 'react';
import { Box, Pressable, Text } from 'native-base';
import { TouchableOpacity, Image as RNImage } from 'react-native';
import BackGray from '../../../assets/icons/back.gray';
import { Ar18M, Ar21B } from '../../../themes/font.style';

interface Props {
    type: 0 | 1 | 2 | 3 | number;
    navigation: any;
}
const voucher = require('../../../assets/icons/voucher-icon.png');
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

const RedeemCard = ({ type, navigation }: Props) => {
    return (
        <Pressable onPress={() => navigation.navigate('RedeemSelectScreen')}>
            <Box h={'111px'} p={4} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Box flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <RNImage resizeMode={'contain'} style={{ width: 30, height: 30, marginRight: 0 }} source={imageCase(type)} />
                    <Box ml={'32px'}>
                        <Text {...Ar18M} color={'black.100'}>
                            {`Your active payout`}
                        </Text>
                        <Text {...Ar21B} color={'blue.200'}>
                            {`${textCase(type)}`}
                        </Text>
                    </Box>
                </Box>
                <Box justifyContent={'flex-end'} alignItems={'flex-end'}>
                    <TouchableOpacity onPress={() => navigation.navigate('RedeemSelectScreen')}>
                        <BackGray />
                    </TouchableOpacity>
                </Box>
            </Box>
        </Pressable>
    );
};

export default RedeemCard;
