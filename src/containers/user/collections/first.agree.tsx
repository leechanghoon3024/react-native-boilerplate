import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Box, Center, Image, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import CollectionHeader from '../../header/header.collection';
import FirstContent from './first.content';
import Swiper from 'react-native-swiper';
import HouseAgree from './house.agree';
import { Ar22M } from '../../../themes/font.style';
import { TouchableOpacity } from 'react-native-gesture-handler';

const colorLogo = require('../../../assets/logo/recan-colour-logo.png');

const FirstAgree = () => {
    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const swiperRef = useRef<Swiper>(null);
    useEffect(() => {
        setIndex(0);
    }, []);
    const swiperHandler = () => {
        if (index === 0) {
            setIndex(1);
        } else {
            navigation.navigate('DoneView' as never);
        }
    };
    console.log(index);
    return (
        <>
            <CollectionHeader navigation={navigation} />
            <Box bg={'white.100'} flex={1} safeAreaBottom p={4}>
                <Box alignItems={'center'}>
                    <Image w={'120px'} h={'35px'} resizeMode={'contain'} source={colorLogo} alt={'colorlogo'} />
                </Box>
                <Box flex={1} alignItems={'center'} justifyContent={'center'}>
                    {index === 0 ? (
                        <Center flex={1}>
                            <FirstContent />
                        </Center>
                    ) : (
                        <Center flex={1}>
                            <HouseAgree />
                        </Center>
                    )}
                    <Box flexDirection={'row'} mb={4}>
                        {[0, 1].map((v) => (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: v === index ? '#222' : 'rgba(0,0,0,.2)',
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    marginLeft: 3,
                                    marginRight: 3,
                                    marginTop: 3,
                                    marginBottom: 3,
                                }}
                            />
                        ))}
                    </Box>

                    <Box flexDirection={'row'} w={'100%'} justifyContent={'space-between'}>
                        <Button
                            onPress={() => navigation.navigate('Main' as never)}
                            borderColor={'gray.200'}
                            borderWidth={1}
                            width={'48%'}
                            variant={'basicButton'}
                            bg={'white.100'}
                        >
                            <Text {...Ar22M} color={'black.100'}>
                                No
                            </Text>
                        </Button>
                        <Button onPress={() => swiperHandler()} width={'48%'} variant={'basicButton'} bg={'blue.200'}>
                            <Text {...Ar22M} color={'white.100'}>
                                Yes
                            </Text>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default FirstAgree;
