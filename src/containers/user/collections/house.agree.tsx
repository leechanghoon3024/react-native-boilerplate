import React from 'react';
import { Text, Box, Center, Image, VStack } from 'native-base';

const HouseImage = require('../../../assets/icons/houseImage.png');
const HouseAgree = () => {
    return (
        <Center p={4}>
            <VStack justifyContent={'center'} alignItems={'center'} space={4}>
                <Image source={HouseImage} alt={'houseImage'} mb={10} />
                <Box justifyContent={'center'} alignItems={'center'}>
                    <Text fontFamily={'Arch'} fontWeight={700} fontSize={'26px'}>
                        Find a secure place
                    </Text>
                </Box>
                <Box justifyContent={'center'} alignItems={'center'}>
                    <Text textAlign={'center'} color={'gray.200'} fontFamily={'Arch'} fontWeight={700} fontSize={'16px'}>
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
