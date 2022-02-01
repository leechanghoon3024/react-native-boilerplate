import React from 'react';
import { Box, Image, Text } from 'native-base';
import { TouchableOpacity, Image as RNImage } from 'react-native';

interface Props {
    type: number;
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

const PlainCase = (type) => {
    switch (type) {
        case 0:
            return 'You will need at least $10.00 of available funds to request a GiftPay eGift card.';
        case 1:
            return 'ready for service';
        case 2:
            return 'Credit will be used with the selected donation.';
        case 3:
            return 'ready for service';
        default:
            return 'You will need at least $10.00 of available funds to request a GiftPay eGift card.';
    }
};

const RedeemCard2 = ({ type, navigation }: Props) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('RedeemSelectScreen')}>
            <Box p={4} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Box w={'40%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'flex-start'}>
                    <RNImage
                        resizeMode={'contain'}
                        style={{ width: 30, height: 30, marginRight: 25 }}
                        source={imageCase(type)}
                        alt={'voucher'}
                    />
                    <Box>
                        <Text w={'40%'} fontWeight={700} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                            {`${textCase(type)}`}
                        </Text>
                        <Text w={'40%'} numberOfLines={4} fontWeight={700} fontSize={'14px'} fontFamily={'Arch'} color={'gray.200'}>
                            {`${PlainCase(type)}`}
                        </Text>
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
