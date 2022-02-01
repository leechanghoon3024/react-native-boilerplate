import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Button, Image, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';

interface Props {
    value: number;
    index: number;
    bagValueHandler: (index, type) => void;
}
const plusIcon = require('../../assets/icons/plus-white.png');
const minusIcon = require('../../assets/icons/minus-white.png');
const reIcon = require('../../assets/icons/recycle.png');
const NumberInput = ({ value, bagValueHandler, index }: Props) => {
    const [a, b] = useState();
    const handler = (type: string) => {
        bagValueHandler(index, type);
    };
    return (
        <Box
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'100%'}
            borderWidth={1}
            borderRadius={100}
            borderColor={'black.100'}
            px={2}
        >
            <Box px={4} py={2} width={'100%'} alignItems={'center'} flexDirection={'row'}>
                <Box w={'15%'}>
                    <Image source={reIcon} alt={'reIcon'} />
                </Box>
                <Box w={'40%'} pl={2}>
                    <Text fontFamily={'Arch'} fontWeight={500} fontSize={'14px'} color={'black.100'}>
                        {value}
                    </Text>
                </Box>
                <Box w={'18%'} pr={2}>
                    <Text fontFamily={'Arch'} fontWeight={500} fontSize={'14px'} color={'gray.200'}>
                        Bags
                    </Text>
                </Box>
                <Box w={'20%'} flexDirection={'row'}>
                    <TouchableOpacity style={{ marginRight: 10 }} onPress={() => handler('up')}>
                        <Image source={plusIcon} alt={'pluseIcon'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handler('minus')}>
                        <Image source={minusIcon} alt={'pluseIcon'} />
                    </TouchableOpacity>
                </Box>
            </Box>
        </Box>
    );
};

export default NumberInput;
