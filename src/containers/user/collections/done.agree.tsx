import React from 'react';
import { Text, Box, Center, Image, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const CheckImage = require('../../../assets/icons/checked.png');
const DoneAgree = () => {
    const navigation = useNavigation();
    return (
        <Center p={4}>
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
                <Box justifyContent={'center'} alignItems={'center'}></Box>
            </VStack>
        </Center>
    );
};

export default DoneAgree;
