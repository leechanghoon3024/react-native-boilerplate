import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { Box, HStack, Image, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import MenuIcon from '../../assets/icons/menu.icon';
import HelpIcon from '../../assets/icons/help.icon';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserParamList } from '../../@types/navigationTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Props {
    navigation: any;
    optional?: string;
}

const MainLogo = require('../../assets/icons/mainLogo.png');
const DriverHeader = ({ navigation, optional }: Props) => {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <Box>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <MenuIcon />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => (optional ? navigation.navigate(optional as never) : navigation.goBack())}>
                    <Box alignItems={'flex-end'}>
                        <Text fontSize={'16px'} fontFamily={'Arch'} fontWeight={400} color={'white.100'}>
                            Welcome
                        </Text>
                        <Text fontSize={'16px'} fontFamily={'Arch'} fontWeight={400} color={'white.100'}>
                            {user?.userName}
                        </Text>
                    </Box>
                </TouchableOpacity>
            </HStack>
        </Box>
    );
};

export default DriverHeader;
