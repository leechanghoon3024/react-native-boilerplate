import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { Box, HStack, Image, Modal, Text, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
import BackIcon from '../../assets/icons/back.icon';
import CloseIcon from '../../assets/icons/close.icon';
import { Ar18SbBlack } from '../../themes/font.style';

interface Props {
    navigation: NavigationProp<any>;
    optional?: any;
    backOption?: boolean;
    modalHandler?: (type: 'ok' | 'close' | 'complete') => void;
    step?: number;
}

const Close = require('../../assets/icons/Close.png');

const CollectionHeader = ({ step, navigation, optional, backOption, modalHandler }: Props) => {
    return (
        <Box bg={'white.100'}>
            <Box bg={'white.100'} safeAreaTop px={'18px'} mt={'17px'}>
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
                        onPress={() => (optional ? optional() : navigation.goBack())}
                    >
                        <BackIcon />
                    </TouchableOpacity>
                    <Box flexDirection={'row'} alignItems={'center'}>
                        {step === 5 && (
                            <TouchableOpacity
                                hitSlop={{ top: 20, left: 20, right: 30, bottom: 20 }}
                                style={{ marginRight: 20 }}
                                onPress={() => (modalHandler ? modalHandler('close') : null)}
                            >
                                <Text {...Ar18SbBlack} color={'blue.200'}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={() => navigation.navigate('Main' as never)}>
                            <CloseIcon />
                        </TouchableOpacity>
                    </Box>
                </HStack>
            </Box>
        </Box>
    );
};

export default CollectionHeader;
