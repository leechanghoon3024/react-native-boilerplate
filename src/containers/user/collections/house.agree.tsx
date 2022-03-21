import React from 'react';
import { Text, Box, Center, Image, VStack, StatusBar } from 'native-base';
import { Ar18M, Ar28Bold } from '../../../themes/font.style';

const HouseImage = require('../../../assets/icons/houseImage.png');
const HouseAgree = () => {
    return (
        <Center p={4}>
            <StatusBar barStyle={'dark-content'} />
            <VStack justifyContent={'center'} alignItems={'center'} space={2}>
                <Image w={'185px'} h={'185px'} source={HouseImage} alt={'houseImage'} mb={10} />
                <Box justifyContent={'center'} alignItems={'center'}>
                    <Text {...Ar28Bold} color={'black.100'}>
                        Find a secure place
                    </Text>
                </Box>
                <Box justifyContent={'center'} alignItems={'center'}>
                    <Text {...Ar18M} textAlign={'center'} color={'gray.200'}>
                        Find a secure place to put your bag out and leave a detailed instruction when you book
                    </Text>
                </Box>
                <Box justifyContent={'center'} alignItems={'center'}>
                    <Text underline textAlign={'center'} color={'black.100'} fontFamily={'Arch'} fontWeight={700} fontSize={'16px'}></Text>
                </Box>
            </VStack>
        </Center>
    );
};

export default HouseAgree;
