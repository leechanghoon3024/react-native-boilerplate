import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { Box, HStack, Image, Modal, Text, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';

interface Props {
    navigation: NavigationProp<any>;
    optional?: any;
    backOption?: boolean;
    modalHandler?: (type: 'ok' | 'close' | 'complete') => void;
    step: number;
}

const LeftArrow = require('../../assets/icons/LeftArrow.png');
const Close = require('../../assets/icons/Close.png');

const CollectionHeader = ({ step, navigation, optional, backOption, modalHandler }: Props) => {
    return (
        <>
            <Box>
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                    <TouchableOpacity onPress={() => (optional ? optional() : navigation.goBack())}>
                        <Image source={LeftArrow} alt={'leftArrow'} />
                    </TouchableOpacity>
                    <Box flexDirection={'row'} alignItems={'center'}>
                        {step === 5 && (
                            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => modalHandler('close')}>
                                <Text fontFamily={'Arch'} fontWeight={500} fontSize={'14px'} color={'blue.200'}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={() => navigation.navigate('Main' as never)}>
                            <Image source={Close} alt={'Close'} />
                        </TouchableOpacity>
                    </Box>
                </HStack>
            </Box>
        </>
    );
};

export default CollectionHeader;
