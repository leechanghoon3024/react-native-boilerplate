import React from 'react';
import { View, Text, Box, Center, Image, Button, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import CollectionHeader from '../../header/header.collection';
import { Ar18M, Ar22M } from '../../../themes/font.style';

const colorLogo = require('../../../assets/logo/recan-colour-logo.png');
const CheckImage = require('../../../assets/icons/checked.png');
const DoneView = () => {
    const navigation = useNavigation();
    return (
        <>
            <CollectionHeader navigation={navigation} />
            <Box bg={'white.100'} flex={1} safeAreaBottom p={4}>
                <Box alignItems={'center'}>
                    <Image w={'123px'} h={'43px'} resizeMode={'contain'} source={colorLogo} alt={'colorlogo'} />
                </Box>
                <Box flex={1} justifyContent={'center'}>
                    <Box mt={'115px'} p={4} flex={1}>
                        <VStack justifyContent={'center'} alignItems={'center'}>
                            <Image w={'195px'} h={'195px'} resizeMode={'contain'} source={CheckImage} alt={'houseImage'} mb={10} />
                            <Box mt={'30px'} justifyContent={'center'} alignItems={'center'}>
                                <Text fontFamily={'Arch'} fontWeight={700} fontSize={'26px'}>
                                    Great!
                                </Text>
                            </Box>
                            <Box mt={'13px'} justifyContent={'center'} alignItems={'center'}>
                                <Text textAlign={'center'} {...Ar18M} color={'gray.200'}>
                                    You are ready to book your collection
                                </Text>
                            </Box>
                        </VStack>
                    </Box>
                    <Box flexDirection={'row'} w={'100%'} justifyContent={'center'}>
                        <Button
                            shadow={8}
                            onPress={() => navigation.navigate('MainCollection' as never)}
                            width={'100%'}
                            variant={'basicButton'}
                            bg={'blue.200'}
                        >
                            <Text {...Ar22M} color={'white.100'}>
                                Next
                            </Text>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default DoneView;
