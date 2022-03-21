import React, { Dispatch, SetStateAction, useState } from 'react';
import { Actionsheet, Text, Box, Heading, HStack, Button, Image } from 'native-base';
import { TouchableOpacity } from 'react-native';
import DriverList from '../../containers/driver/driver.List';
import TableDriver from '../../containers/commons/table.driver';
import InMapList from '../../containers/driver/inMapList';

interface Props {
    open: boolean;
    onHandler: Dispatch<SetStateAction<boolean>>;
    navigation: any;
}

const PickSheet = ({ open, onHandler, navigation }: Props) => {
    return (
        <Actionsheet isOpen={open} onClose={() => onHandler(false)}>
            <Actionsheet.Content>
                <Box p={2} pt={10} alignItems={'center'}>
                    <Heading fontFamily={'Arch'} fontWeight={500} fontSize={24} mb={3}>
                        List
                    </Heading>
                </Box>
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default PickSheet;
