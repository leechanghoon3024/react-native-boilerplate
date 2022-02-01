import React, { Dispatch, SetStateAction, useState } from 'react';
import { Actionsheet, Text, Box, Heading, HStack, Button, Image } from 'native-base';
import { TouchableOpacity } from 'react-native';
import DriverList from '../../containers/driver/driver.List';
import TableDriver from '../../containers/commons/table.driver';
import InMapList from '../../containers/driver/inMapList';

interface Props {
    open: boolean;
    onHandler: Dispatch<SetStateAction<boolean>>;
    getAccept: any;
    code: string;
}

const CheckSheet = ({ open, onHandler, getAccept, code }: Props) => {
    return (
        <Actionsheet isOpen={open} onClose={() => onHandler(false)}>
            <Actionsheet.Content>
                <Box p={2} pt={10} alignItems={'center'}>
                    <Heading fontFamily={'Arch'} fontWeight={500} fontSize={24} mb={3}>
                        {code}
                    </Heading>
                </Box>
                <HStack w={'100%'} m={2} p={2} justifyContent={'space-between'}>
                    <Button onPress={() => getAccept()} mr={15} w={'30%'} variant={'basicButton'} bg={'blue.200'}>
                        <Text fontFamily={'Arch'} fontWeight={'700'} fontSize={'16'} color={'white.100'}>
                            Next
                        </Text>
                    </Button>
                    <Button onPress={() => onHandler(false)} w={'30%'} variant={'basicButton'} bg={'gray.200'}>
                        <Text fontFamily={'Arch'} fontWeight={'700'} fontSize={'16'} color={'black.100'}>
                            Close
                        </Text>
                    </Button>
                </HStack>
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default CheckSheet;
