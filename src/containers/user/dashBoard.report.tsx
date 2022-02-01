import React, { useState } from 'react';
import { Box, Center, HStack, Text, VStack } from 'native-base';
import DashboardCard from '../../components/card/Dashboard.card';

const wastePlastic = require('../../assets/icons/waste-plastic.png');
const waste = require('../../assets/icons/waste.png');
const light = require('../../assets/icons/light-bulb.png');
const ecoCar = require('../../assets/icons/eco-car.png');

const DashBoardReport = () => {
    const value = { one: 0, two: 0, three: 0, four: 0 };
    return (
        <Box mt={8} justifyContent={'center'} alignItems={'center'}>
            <VStack space={10} justifyContent={'space-between'} alignItems={'center'}>
                <HStack my={5} justifyContent={'center'} alignItems={'flex-end'}>
                    <DashboardCard image={waste} value={`${value.one} mins`} subTitle={'Total recycling time\n' + 'landfills or the '} />
                    <DashboardCard image={ecoCar} value={`${value.one} kg`} subTitle={'Greenhouse gas\n Avoiding 13 km of driving'} />
                </HStack>
                <HStack justifyContent={'center'} alignItems={'flex-end'}>
                    <DashboardCard image={light} value={`${value.one} mins`} subTitle={'50W light bulb on\n for 8,580 hours'} />
                    <DashboardCard
                        image={wastePlastic}
                        value={`${value.one} mins`}
                        subTitle={'Waste diverted from\n landfills or the oceans'}
                    />
                </HStack>
            </VStack>
        </Box>
    );
};

export default DashBoardReport;
