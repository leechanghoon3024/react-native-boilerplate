import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Button, Center, Image, Modal, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const checkIcon = require('../../../assets/icons/checked.png');
const unCheckIcon = require('../../../assets/icons/unChecked.png');

const InfoModal = ({ open, setOpen }: Props) => {
    const user = useSelector((state: RootState) => state.auth.user);

    const navigation = useNavigation();
    return (
        <Modal isOpen={open} onClose={() => setOpen(false)}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Check your Info</Modal.Header>
                <Modal.Body>
                    <VStack space={2} mt={4} alignItems={'center'}>
                        <Text fontFamily={'Arch'} fontWeight={700} fontSize={'16px'}>
                            Please add your Information
                        </Text>
                        <Box w={'100%'} flexDirection={'row'} px={4} py={2} alignItems={'center'} justifyContent={'space-between'}>
                            <Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                <Image
                                    mr={2}
                                    w={'20px'}
                                    h={'20px'}
                                    resizeMode={'contain'}
                                    source={user?.profileCheck ? checkIcon : unCheckIcon}
                                    alt={'houseimage'}
                                />
                                <Text textAlign={'center'} fontFamily={'Arch'} fontWeight={700} fontSize={'16px'}>
                                    {'Profile'}
                                </Text>
                            </Box>
                            <TouchableOpacity
                                onPress={() => {
                                    setOpen(false);
                                    navigation.navigate('ProfileUser' as never);
                                }}
                            >
                                <Text color={'gray.200'} textAlign={'center'} fontFamily={'Arch'} fontWeight={700} fontSize={'12px'}>
                                    {'Edit'}
                                </Text>
                            </TouchableOpacity>
                        </Box>
                        <Box w={'100%'} flexDirection={'row'} px={4} py={2} alignItems={'center'} justifyContent={'space-between'}>
                            <Box flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                <Image
                                    mr={2}
                                    w={'20px'}
                                    h={'20px'}
                                    resizeMode={'contain'}
                                    source={user?.addressCheck ? checkIcon : unCheckIcon}
                                    alt={'houseimage'}
                                />
                                <Text textAlign={'center'} fontFamily={'Arch'} fontWeight={700} fontSize={'16px'}>
                                    {'Address'}
                                </Text>
                            </Box>
                            <TouchableOpacity
                                onPress={() => {
                                    setOpen(false);
                                    navigation.navigate('Address' as never);
                                }}
                            >
                                <Text color={'gray.200'} textAlign={'center'} fontFamily={'Arch'} fontWeight={700} fontSize={'12px'}>
                                    {'Edit'}
                                </Text>
                            </TouchableOpacity>
                        </Box>
                    </VStack>
                </Modal.Body>
                <Modal.Footer p={0}>
                    <Button.Group space={0}>
                        <Button
                            borderRadius={0}
                            bg={'blue.200'}
                            w={'100%'}
                            variant="basicButton"
                            onPress={() => {
                                setOpen(false);
                            }}
                        >
                            <Text fontFamily={'Arch'} fontWeight={700} fontSize={'16px'} color={'white.100'}>
                                next time
                            </Text>
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};

export default InfoModal;
