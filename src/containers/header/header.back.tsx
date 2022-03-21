import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { Box, HStack, Image, Modal, Text, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
import BackIcon from '../../assets/icons/back.icon';
import CloseIcon from '../../assets/icons/close.icon';

interface Props {
    navigation: NavigationProp<any>;
    optional?: any;
    backOption?: boolean;
    noClose?: boolean;
}

const LeftArrow = require('../../assets/icons/LeftArrow.png');
const Close = require('../../assets/icons/Close.png');

const HeaderBack = ({ navigation, optional, backOption, noClose }: Props) => {
    return (
        <>
            <Box>
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                    <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}>
                        <BackIcon />
                    </TouchableOpacity>
                    <Box flexDirection={'row'} alignItems={'center'}>
                        {/*{step === 5 && (*/}
                        {/*    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => modalHandler('close')}>*/}
                        {/*        <Text fontFamily={'Arch'} fontWeight={500} fontSize={'14px'} color={'blue.200'}>*/}
                        {/*            Cancel*/}
                        {/*        </Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*)}*/}
                        {!noClose && (
                            <TouchableOpacity onPress={() => navigation.navigate('Main' as never)}>
                                <CloseIcon />
                            </TouchableOpacity>
                        )}
                    </Box>
                </HStack>
            </Box>
        </>
    );
};

export default HeaderBack;
