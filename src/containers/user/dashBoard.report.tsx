import React, { useState } from 'react';
import { Box, Center, HStack, Text, VStack } from 'native-base';
import DashboardCard from '../../components/card/Dashboard.card';
import WasteIcon from '../../assets/icons/waste.icon';
import EcoCarIcon from '../../assets/icons/EcoCar.icon';
import LightIcon from '../../assets/icons/Light.icon';
import BottleIcon from '../../assets/icons/bottle.icon';

const wastePlastic = require('../../assets/icons/waste-plastic.png');
const waste = require('../../assets/icons/waste.png');
const light = require('../../assets/icons/light-bulb.png');
const ecoCar = require('../../assets/icons/eco-car.png');

const DashBoardReport = () => {
    const value = { one: 0, two: 0, three: 0, four: 0 };
    return (
        <Box mt={'10px'} justifyContent={'center'} alignItems={'center'}>
            <VStack justifyContent={'space-between'} alignItems={'center'}>
                <HStack w={'100%'} h={'50%'} justifyContent={'space-between'} alignItems={'center'}>
                    <DashboardCard Icon={WasteIcon} value={`${value.one} mins`} subTitle={'Total recycling time\n' + 'landfills or the '} />
                    <DashboardCard Icon={EcoCarIcon} value={`${value.one} kg`} subTitle={'Greenhouse gas\n Avoiding 13 km of driving'} />
                </HStack>
                <HStack w={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                    <DashboardCard Icon={LightIcon} value={`${value.one} kWh`} subTitle={'50W light bulb on\n for 8,580 hours'} />
                    <DashboardCard
                        Icon={BottleIcon}
                        value={`${value.one} mins`}
                        subTitle={'Waste diverted from\n landfills or the oceans'}
                    />
                </HStack>
            </VStack>
        </Box>
    );
};

export default DashBoardReport;
