import React, { useState } from 'react';
import { Text, Box, Center, Image, VStack, Pressable, StatusBar } from 'native-base';
import { Ar18M, Ar28Bold } from '../../../themes/font.style';
import WebSheet from '../../../components/bottomSheet/web.sheet';

const HouseImage = require('../../../assets/image/recycling.png');
const FirstContent = () => {
    const [openLink, setOpenLink] = useState(false);
    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <Center p={4}>
                <VStack justifyContent={'center'} alignItems={'center'} space={2}>
                    <Image w={'185px'} h={'185px'} resizeMode={'contain'} source={HouseImage} alt={'houseImage'} mb={10} />
                    <Box justifyContent={'center'} alignItems={'center'}>
                        <Text {...Ar28Bold} color={'black.100'}>
                            100 eligible containers
                        </Text>
                    </Box>
                    <Box justifyContent={'center'} alignItems={'center'}>
                        <Text {...Ar18M} textAlign={'center'} color={'gray.200'}>
                            Make sure your bag is full with more than 100 eligible containers (you can crush cans, plastic bottles and
                            poppers).
                        </Text>
                    </Box>
                    <Pressable onPress={() => setOpenLink(true)}>
                        <Box justifyContent={'center'} alignItems={'center'}>
                            <Text underline textAlign={'center'} color={'black.100'} fontFamily={'Arch'} fontWeight={700} fontSize={'12px'}>
                                Eligible locations
                            </Text>
                        </Box>
                    </Pressable>
                </VStack>
            </Center>

            <WebSheet open={openLink} setOpen={setOpenLink} url={'https://recan.co'} />
        </>
    );
};

export default FirstContent;
