import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { Box, HStack, Image, StatusBar, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import BackIcon from '../../assets/icons/back.icon';

interface Props {
    navigation: NavigationProp<any>;
    optional?: string;
    bg?: string;
}

const LeftArrow = require('../../assets/icons/LeftArrow.png');

const DefaultHeader = ({ navigation, optional, bg }: Props) => {
    return (
        <Box bg={bg ?? 'gray.100'} w={'100%'}>
            <Box safeAreaTop mt={'20px'} px={'30px'} bg={bg ?? 'gray.100'}>
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                    <TouchableOpacity
                        hitSlop={{
                            top: 20,
                            left: 20,
                            right: 20,
                            bottom: 20,
                        }}
                        onPress={() => (optional ? navigation.navigate(optional as never) : navigation.goBack())}
                    >
                        <BackIcon />
                    </TouchableOpacity>
                </HStack>
            </Box>
        </Box>
    );
};

export default DefaultHeader;
