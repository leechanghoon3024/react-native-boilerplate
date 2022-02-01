import React, { Dispatch, SetStateAction, useState } from 'react';
import { Actionsheet, Text, Box, Heading, HStack, Button, Image } from 'native-base';
import { TouchableOpacity } from 'react-native';

interface Props {
    open: boolean;
    onHandler: Dispatch<SetStateAction<boolean>>;
    inputHandler: (type: 1 | 2) => void;
}

const feedbackImage = require('../../assets/icons/feedback.png');
const buildingImage = require('../../assets/icons/building.png');
const SelectAccountSheet = ({ open, onHandler, inputHandler }: Props) => {
    return (
        <Actionsheet isOpen={open} onClose={() => onHandler(false)}>
            <Actionsheet.Content>
                <Box p={2} pt={10} alignItems={'center'}>
                    <Heading fontFamily={'Arch'} fontWeight={500} fontSize={24} mb={10}>
                        Choose your Type
                    </Heading>
                    <HStack justifyContent={'space-between'} width={'100%'}>
                        <Button
                            onPress={() => inputHandler(1)}
                            borderRadius={12}
                            m={1}
                            flex={1}
                            borderWidth={1}
                            borderColor={'blue.200'}
                            backgroundColor={'white.100'}
                        >
                            <Box justifyContent={'center'} alignItems={'center'} p={3}>
                                <Image m={4} source={feedbackImage} alt={'feedbackImage'} />
                                <Text fontFamily={'Arch'} fontSize={'21'} fontWeight={'700'} color={'blue.200'}>
                                    Personal
                                </Text>
                            </Box>
                        </Button>
                        <Button
                            onPress={() => inputHandler(2)}
                            borderRadius={12}
                            m={1}
                            flex={1}
                            borderWidth={1}
                            borderColor={'blue.200'}
                            backgroundColor={'white.100'}
                        >
                            <Box justifyContent={'center'} alignItems={'center'} p={3}>
                                <Image m={4} source={buildingImage} alt={'buildingImage'} />
                                <Text fontFamily={'Arch'} fontSize={'21'} fontWeight={'700'} color={'blue.200'}>
                                    Company
                                </Text>
                            </Box>
                        </Button>
                    </HStack>
                </Box>
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default SelectAccountSheet;
