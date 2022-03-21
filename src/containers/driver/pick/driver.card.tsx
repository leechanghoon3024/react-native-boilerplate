import React from 'react';
import { Box, Image, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { collectionTypes } from '../../../@types/collection.types';
import { timeFind } from '../../../utils/times';
import BackGray from '../../../assets/icons/back.gray';

const marker = require('../../../assets/icons/address-pin.png');
const calnder = require('../../../assets/icons/datepicker.png');
const arrow = require('../../../assets/icons/back-gray.png');

interface Props {
    navigation: any;
    value: collectionTypes;
}

const DriverCard = ({ navigation, value }: Props) => {
    return (
        <Box flexDirection={'row'} alignItems={'center'} shadow={1} bg={'white.100'} my={2} p={4} borderRadius={14}>
            <Box>
                <Box flexDirection={'row'} alignItems={'center'} my={1}>
                    <Image mr={2} source={marker} width={'30px'} height={'30px'} alt={'markder'} />
                    <Text w={'80%'} numberOfLines={1} fontSize={'16px'} fontFamily={'Arch'} fontWeight={300}>
                        {value.address}
                    </Text>
                </Box>
                <Box flexDirection={'row'} alignItems={'center'} my={1}>
                    <Image mr={2} source={calnder} width={'30px'} height={'30px'} alt={'markder'} />
                    <Text w={'80%'} numberOfLines={1} fontSize={'16px'} fontFamily={'Arch'} fontWeight={300}>
                        {value.pickDate} {timeFind(value.pickTime)}
                    </Text>
                </Box>
            </Box>
            <Box>
                <TouchableOpacity onPress={() => navigation.navigate('DriverCollection', { idx: value.idx })}>
                    <BackGray />
                </TouchableOpacity>
            </Box>
        </Box>
    );
};

export default DriverCard;
