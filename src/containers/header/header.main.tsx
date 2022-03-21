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
    setOpenLink?: any;
}

const MainLogo = require('../../assets/icons/mainLogo.png');
const MainHeader = ({ navigation, optional, setOpenLink }: Props) => {
    const openLink = async (url: any) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        }
    };
    // openLink('https://recan.co')
    return (
        <Box mt={'14px'} mx={'14px'}>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <MenuIcon />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Image width={'78px'} h={'21px'} resizeMode={'contain'} source={MainLogo} alt={'mainLogo'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOpenLink(true)}>
                    <HelpIcon />
                </TouchableOpacity>
            </HStack>
        </Box>
    );
};

export default MainHeader;
