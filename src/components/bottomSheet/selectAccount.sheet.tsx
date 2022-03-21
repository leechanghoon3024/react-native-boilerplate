import React, { Dispatch, SetStateAction, useState } from 'react';
import { Actionsheet, Text, Box, Heading, HStack, Button, Image } from 'native-base';
import { TouchableOpacity } from 'react-native';

interface Props {
    open: boolean;
    onHandler: Dispatch<SetStateAction<boolean>>;
    inputHandler: (type: 1 | 2) => void;
    value: string;
}

const feedbackImage = require('../../assets/icons/feedback.png');
const buildingImage = require('../../assets/icons/building.png');
const SelectAccountSheet = ({ value, open, onHandler, inputHandler }: Props) => {
    console.log(';Number(value)', Number(value));
    const select = value === 'Personal' ? 1 : value === 'Company' ? 2 : 0;
    return (
        <Actionsheet isOpen={open} onClose={() => onHandler(false)}>
            <Actionsheet.Content>
                <Box p={2} pt={8} alignItems={'center'}>
                    <Heading fontFamily={'Arch'} fontWeight={500} fontSize={24} mb={12}>
                        Choose your Type
                    </Heading>
                    <HStack justifyContent={'space-between'} width={'100%'}>
                        <Button
                            onPress={() => inputHandler(1)}
                            borderRadius={12}
                            m={1}
                            mx={2}
                            flex={1}
                            borderWidth={1}
                            borderColor={'blue.200'}
                            backgroundColor={select === 1 ? 'blue.200' : 'white.100'}
                        >
                            <Box justifyContent={'center'} alignItems={'center'} p={3}>
                                <Image width={'70px'} height={'70px'} m={4} source={feedbackImage} alt={'feedbackImage'} />
                                <Text
                                    fontFamily={'Arch'}
                                    fontSize={'21'}
                                    fontWeight={'700'}
                                    color={select === 1 ? 'white.100' : 'blue.200'}
                                >
                                    Personal
                                </Text>
                            </Box>
                        </Button>
                        <Button
                            onPress={() => inputHandler(2)}
                            borderRadius={12}
                            m={1}
                            mx={2}
                            flex={1}
                            borderWidth={1}
                            borderColor={'blue.200'}
                            backgroundColor={select === 2 ? 'blue.200' : 'white.100'}
                        >
                            <Box justifyContent={'center'} alignItems={'center'} p={3}>
                                <Image width={'70px'} height={'70px'} m={4} source={buildingImage} alt={'buildingImage'} />
                                <Text
                                    fontFamily={'Arch'}
                                    fontSize={'21'}
                                    fontWeight={'700'}
                                    color={select === 2 ? 'white.100' : 'blue.200'}
                                >
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
