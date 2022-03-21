import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { Box, HStack, Image, Modal, Text, Button } from 'native-base';
import { TouchableOpacity, Image as RNImage } from 'react-native';
import BackIcon from '../../assets/icons/back.icon';
import CloseIcon from '../../assets/icons/close.icon';

interface Props {
    navigation: NavigationProp<any>;
    optional?: any;
    backOption?: boolean;
}

const LeftArrow = require('../../assets/icons/LeftArrow.png');
const Logo = require('../../assets/logo/depotlogo.png');

const DepotLoginHeader = ({ navigation, optional, backOption }: Props) => {
    return (
        <>
            <Box safeAreaTop mt={2} px={6}>
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                    {backOption ? (
                        <Box />
                    ) : (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <BackIcon />
                        </TouchableOpacity>
                    )}

                    <Box flexDirection={'row'} alignItems={'center'}>
                        {/*{step === 5 && (*/}
                        {/*    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => modalHandler('close')}>*/}
                        {/*        <Text fontFamily={'Arch'} fontWeight={500} fontSize={'14px'} color={'blue.200'}>*/}
                        {/*            Cancel*/}
                        {/*        </Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*)}*/}
                        <TouchableOpacity onPress={() => navigation.navigate('Main' as never)}>
                            <RNImage source={Logo} style={{ width: 80, height: 40 }} />
                        </TouchableOpacity>
                    </Box>
                </HStack>
            </Box>
        </>
    );
};

export default DepotLoginHeader;
