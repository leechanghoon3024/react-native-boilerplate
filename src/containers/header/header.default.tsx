import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { Box, HStack, Image, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';

interface Props {
    navigation: NavigationProp<any>;
    optional?: string;
}

const LeftArrow = require('../../assets/icons/LeftArrow.png');

const DefaultHeader = ({ navigation, optional }: Props) => {
    return (
        <Box mt={2}>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
                <TouchableOpacity onPress={() => (optional ? navigation.navigate(optional as never) : navigation.goBack())}>
                    <Image source={LeftArrow} alt={'leftArrow'} />
                </TouchableOpacity>
            </HStack>
        </Box>
    );
};

export default DefaultHeader;
