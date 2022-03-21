import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Box, Button, Image, Input, Pressable, Text } from 'native-base';
import { TouchableOpacity, Image as RNImage, TextInput } from 'react-native';
import { Ar18SbBlack, Ar19N } from '../../themes/font.style';

interface Props {
    value: number;
    index: number;
    bagValueHandler: (index: any, type: any) => void;
    bagValueHandler2: any;
}
const plusIcon = require('../../assets/icons/plus-white.png');
const minusIcon = require('../../assets/icons/minus-white.png');
const reIcon = require('../../assets/icons/recycle.png');
const NumberInput = ({ value, bagValueHandler, index, bagValueHandler2 }: Props) => {
    const [a, b] = useState();
    const handler = (type: string) => {
        bagValueHandler(index, type);
    };

    const bagValueHandlerInput = (text) => {
        bagValueHandler2(index, text);
    };

    const kRef = useRef<TextInput>();

    return (
        <Box
            bg={'white.100'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'100%'}
            borderWidth={1}
            borderRadius={100}
            borderColor={'black.100'}
            px={2}
            mb={4}
        >
            <Box px={1} py={2} width={'100%'} alignItems={'center'} flexDirection={'row'}>
                <Box ml={1} w={'15%'}>
                    <Image w={'30px'} h={'30px'} resizeMode={'contain'} source={reIcon} alt={'reIcon'} />
                </Box>
                <Box w={'40%'}>
                    <Input
                        ref={kRef}
                        {...Ar19N}
                        color={'black.100'}
                        borderWidth={0}
                        keyboardType={'numeric'}
                        value={String(value ?? 0)}
                        onChangeText={(text) => bagValueHandlerInput(text)}
                        hitSlop={{ top: 30, left: 30, right: 30, bottom: 30 }}
                    />
                </Box>
                <Pressable w={'18%'} pr={2} onPress={() => kRef.current?.focus()}>
                    <Text {...Ar18SbBlack} color={'gray.200'}>
                        Bags
                    </Text>
                </Pressable>
                <Box w={'20%'} flexDirection={'row'}>
                    <TouchableOpacity style={{ marginRight: 10 }} onPress={() => handler('minus')}>
                        <RNImage style={{ width: 34, height: 34, resizeMode: 'stretch' }} source={minusIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handler('up')}>
                        <RNImage style={{ width: 34, height: 34, resizeMode: 'contain' }} source={plusIcon} />
                    </TouchableOpacity>
                </Box>
            </Box>
        </Box>
    );
};

export default NumberInput;
