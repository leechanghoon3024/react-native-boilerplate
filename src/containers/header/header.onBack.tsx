import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { Box, HStack, Image, Modal, Text, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import BackIcon from '../../assets/icons/back.icon';

interface Props {
    navigation: NavigationProp<any>;
    optional?: any;
    backOption?: boolean;
}

const LeftArrow = require('../../assets/icons/back-white.png');
const Arrow = require('../../assets/icons/LeftArrow.png');
const Close = require('../../assets/icons/Close.png');

const HeaderOnlyBack = ({ navigation, optional, backOption }: Props) => {
    return (
        <>
            <Box px={'19px'} mt={'20px'}>
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                    <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 30, left: 30, right: 30, bottom: 30 }}>
                        <BackIcon color={backOption ? '#222' : '#fff'} />
                    </TouchableOpacity>
                    <Box flexDirection={'row'} alignItems={'center'}>
                        {/*{step === 5 && (*/}
                        {/*    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => modalHandler('close')}>*/}
                        {/*        <Text fontFamily={'Arch'} fontWeight={500} fontSize={'14px'} color={'blue.200'}>*/}
                        {/*            Cancel*/}
                        {/*        </Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*)}*/}
                    </Box>
                </HStack>
            </Box>
        </>
    );
};

export default HeaderOnlyBack;
