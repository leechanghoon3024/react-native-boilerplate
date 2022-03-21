import React from 'react';
import { Box, Center, Image, Text, VStack, WarningIcon } from 'native-base';
import { Dimensions } from 'react-native';
import { La15N, La15Sb, La28B } from '../../themes/font.style';
import WasteIcon from '../../assets/icons/waste.icon';

interface Props {
    Icon: any;
    value: string;
    subTitle: string;
}
const { width, height } = Dimensions.get('window');
const DashboardCard = ({ Icon, value, subTitle }: Props) => {
    return (
        <VStack w={'50%'} justifyContent={'flex-end'} alignItems={'center'}>
            <Icon />
            <Box justifyContent={'center'} alignItems={'center'}>
                <Text {...La28B} color={'gray.300'}>
                    {value}
                </Text>
                <Text {...La15Sb} numberOfLines={2} textAlign={'center'} color={'black.100'}>
                    {subTitle}
                </Text>
            </Box>
        </VStack>
    );
};

export default DashboardCard;
