import React from 'react';
import { View, Text, Box, Center, Image, Button, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import CollectionHeader from '../../header/header.collection';

const colorLogo = require('../../../assets/icons/colorLogo.png');
const CheckImage = require('../../../assets/icons/checked.png');
const DoneView = () => {
    const navigation = useNavigation();
    return (
        <Box flex={1} safeArea p={4}>
            <CollectionHeader navigation={navigation} />
            <Box alignItems={'center'}>
                <Image source={colorLogo} alt={'colorlogo'} />
            </Box>
            <Box flex={1} alignItems={'center'} justifyContent={'center'}>
                <Center p={4} flex={1}>
                    <VStack justifyContent={'center'} alignItems={'center'} space={4}>
                        <Image source={CheckImage} alt={'houseImage'} mb={10} />
                        <Box justifyContent={'center'} alignItems={'center'}>
                            <Text fontFamily={'Arch'} fontWeight={700} fontSize={'26px'}>
                                Great!
                            </Text>
                        </Box>
                        <Box justifyContent={'center'} alignItems={'center'}>
                            <Text textAlign={'center'} color={'gray.200'} fontFamily={'Arch'} fontWeight={700} fontSize={'16px'}>
                                You are ready to book your collection
                            </Text>
                        </Box>
                    </VStack>
                </Center>
                <Box flexDirection={'row'} w={'100%'} justifyContent={'center'}>
                    <Button
                        onPress={() => navigation.navigate('MainCollection' as never)}
                        width={'100%'}
                        variant={'basicButton'}
                        bg={'blue.200'}
                    >
                        <Text fontSize={'18px'} fontWeight={100} fontFamily={'Arch'} color={'white.100'}>
                            Next
                        </Text>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default DoneView;
