import React from 'react';
import { Box, Center, Image, Text, VStack } from 'native-base';
import { Dimensions } from 'react-native';

interface Props {
    image: any;
    value: string;
    subTitle: string;
}
const { width, height } = Dimensions.get('window');
const DashboardCard = ({ image, value, subTitle }: Props) => {
    return (
        <VStack w={'50%'} height={120} space={2} justifyContent={'flex-end'} alignItems={'center'}>
            <Image source={image} alt={'value'} />
            <Box justifyContent={'center'} alignItems={'center'}>
                <Text fontSize={'24px'} fontWeight={'700'} fontFamily={'Lato'} color={'black.100'}>
                    {value}
                </Text>
                <Text textAlign={'center'} fontSize={'12px'} fontWeight={'500'} fontFamily={'Lato'} color={'gray.300'}>
                    {subTitle}
                </Text>
            </Box>
        </VStack>
    );
};

export default DashboardCard;
