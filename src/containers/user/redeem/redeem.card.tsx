import React from 'react';
import { Box, Image, Text } from 'native-base';
import { TouchableOpacity, Image as RNImage } from 'react-native';

interface Props {
    type: 0 | 1 | 2 | 3;
    navigation: any;
}
const voucher = require('../../../assets/icons/voucher-icon.png');
const arrow = require('../../../assets/icons/back-gray.png');
const recanShop = require('../../../assets/recan-shop.png');
const sampleImage = require('../../../assets/sample-image.png');
const check = require('../../../assets/icons/checked.png');
const unCheck = require('../../../assets/icons/unChecked.png');
const donateIcon = require('../../../assets/icons/donate-icon.png');
const paypalIcon = require('../../../assets/icons/paypal-icon.png');
const bankIcon = require('../../../assets/icons/bank-icon.png');

const imageCase = (type) => {
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

const textCase = (type) => {
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
        <Box p={4} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Box flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <RNImage
                    resizeMode={'contain'}
                    style={{ width: 30, height: 30, marginRight: 10 }}
                    source={imageCase(type)}
                    alt={'voucher'}
                />
                <Box>
                    <Text fontWeight={700} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                        {`Your active payout`}
                    </Text>
                    <Text fontWeight={700} fontSize={'18px'} fontFamily={'Arch'} color={'blue.300'}>
                        {`${textCase(type)}`}
                    </Text>
                </Box>
            </Box>
            <Box justifyContent={'flex-end'} alignItems={'flex-end'}>
                <TouchableOpacity onPress={() => navigation.navigate('RedeemSelectScreen')}>
                    <Image source={arrow} alt={'voucher'} />
                </TouchableOpacity>
            </Box>
        </Box>
    );
};

export default RedeemCard;
