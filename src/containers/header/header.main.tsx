import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { Box, HStack, Image, Text } from 'native-base';
import { Linking, TouchableOpacity } from 'react-native';
import MenuIcon from '../../assets/icons/menu.icon';
import HelpIcon from '../../assets/icons/help.icon';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserParamList } from '../../@types/navigationTypes';

interface Props {
    navigation: any;
    optional?: string;
}

const MainLogo = require('../../assets/icons/mainLogo.png');
const MainHeader = ({ navigation, optional }: Props) => {
    const openLink = async (url) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
    };
    return (
        <Box>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <MenuIcon />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image source={MainLogo} alt={'mainLogo'} top={1} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openLink('https://recan.co')}>
                    <HelpIcon />
                </TouchableOpacity>
            </HStack>
        </Box>
    );
};

export default MainHeader;
