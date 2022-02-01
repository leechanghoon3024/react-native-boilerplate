import React from 'react';
import { View, Text, Box, Center, Image, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import CollectionHeader from '../../header/header.collection';
import FirstContent from './first.content';
import Swiper from 'react-native-swiper';
import HouseAgree from './house.agree';

const colorLogo = require('../../../assets/icons/colorLogo.png');

const FirstAgree = () => {
    const navigation = useNavigation();
    return (
        <Box flex={1} safeArea p={4}>
            <CollectionHeader navigation={navigation} />
            <Box alignItems={'center'}>
                <Image source={colorLogo} alt={'colorlogo'} />
            </Box>
            <Box flex={1} alignItems={'center'} justifyContent={'center'}>
                <Swiper>
                    <Center flex={1}>
                        <FirstContent />
                    </Center>
                    <Center flex={1}>
                        <HouseAgree />
                    </Center>
                </Swiper>
                <Box flexDirection={'row'} w={'100%'} justifyContent={'space-between'}>
                    <Button
                        onPress={() => navigation.navigate('Main' as never)}
                        borderColor={'gray.200'}
                        borderWidth={1}
                        width={'48%'}
                        variant={'basicButton'}
                        bg={'white.100'}
                    >
                        <Text fontSize={'18px'} fontWeight={100} fontFamily={'Arch'}>
                            No
                        </Text>
                    </Button>
                    <Button onPress={() => navigation.navigate('DoneView' as never)} width={'48%'} variant={'basicButton'} bg={'blue.200'}>
                        <Text fontSize={'18px'} fontWeight={100} fontFamily={'Arch'} color={'white.100'}>
                            Yes
                        </Text>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default FirstAgree;
