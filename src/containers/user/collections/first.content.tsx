import React from 'react';
import { Text, Box, Center, Image, VStack } from 'native-base';

const HouseImage = require('../../../assets/icons/recImage.png');
const FirstContent = () => {
    return (
        <Center p={4}>
            <VStack justifyContent={'center'} alignItems={'center'} space={4}>
                <Image source={HouseImage} alt={'houseImage'} mb={10} />
                <Box justifyContent={'center'} alignItems={'center'}>
                    <Text fontFamily={'Arch'} fontWeight={700} fontSize={'26px'}>
                        100 eligible containers
                    </Text>
                </Box>
                <Box justifyContent={'center'} alignItems={'center'}>
                    <Text textAlign={'center'} color={'gray.200'} fontFamily={'Arch'} fontWeight={700} fontSize={'16px'}>
                        Make sure your bag is full with more than 100 eligible containers (you can crush cans, plastic bottles and poppers).
                    </Text>
                </Box>
                <Box justifyContent={'center'} alignItems={'center'}>
                    <Text underline textAlign={'center'} color={'black.100'} fontFamily={'Arch'} fontWeight={700} fontSize={'16px'}>
                        Eligible locations
                    </Text>
                </Box>
            </VStack>
        </Center>
    );
};

export default FirstContent;
