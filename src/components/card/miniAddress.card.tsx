import React from 'react';
import { addressListType } from '../../@types/userTypes';
import { Box, Button, Image, Popover, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addressChange } from '../../store/authReducer';

interface Props {
    address: addressListType;
    makeMain: (v: addressListType) => void;
}
const marker = require('../../assets/icons/address-pin.png');
const checked = require('../../assets/icons/checked.png');
const MiniAddressCard = ({ address, makeMain }: Props) => {
    return (
        <TouchableOpacity
            onPress={() => makeMain(address)}
            style={{
                marginVertical: 10,
                flexDirection: 'row',
                padding: 3,
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Box flexDirection={'row'} alignItems={'center'} w={'90%'}>
                <Image source={address.main === 0 ? marker : checked} alt={'title'} width={'30px'} height={'30px'} />
                <Box ml={4} alignItems={'center'} w={'80%'}>
                    <Text w={'100%'} numberOfLines={2} fontSize={'14px'} fontWeight={700} fontFamily={'Arch'} color={'black.100'}>
                        {address.address}
                    </Text>
                </Box>
            </Box>
        </TouchableOpacity>
    );
};

export default MiniAddressCard;
