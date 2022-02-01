import React from 'react';
import { Dimensions, ImageBackground } from 'react-native';
import { VStack, Text, Box, Center, Image, ScrollView, Fab, Icon } from 'native-base';
import { AuthParamList, DriverParamList, UserParamList, UserStackParamList } from '../../@types/navigationTypes';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import DefaultHeader from '../header/header.default';
import MainHeader from '../header/header.main';
import CustomTabView from '../../components/tab.view';
import TabDriver from '../../components/tab.driver';
import TableDriver from '../commons/table.driver';

const BackGroundImage = require('../../assets/background/background1.png');
const MoneyFlow = require('../../assets/icons/moneyFlow.png');

const { width, height } = Dimensions.get('window');

const DriverList = () => {
    const route = useRoute<RouteProp<DriverParamList, 'WaitList'>>();
    const navigation = useNavigation<NavigationProp<UserParamList>>();
    return (
        <ImageBackground source={BackGroundImage} style={{ flex: 1 }}>
            <Box safeArea flex={1} m={3}>
                <MainHeader navigation={navigation} />
                <Center py={'20px'}>
                    <Text fontSize={'24px'} fontFamily={'Lato'} fontWeight={700} color={'white.100'}>
                        {route.params?.title}
                    </Text>
                </Center>
                <TableDriver />
            </Box>
        </ImageBackground>
    );
};

export default DriverList;
