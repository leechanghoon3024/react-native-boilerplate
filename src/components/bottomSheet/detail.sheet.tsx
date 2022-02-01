import React, { Dispatch, SetStateAction, useState } from 'react';
import { Actionsheet, Text, Box, Heading, HStack, Button, Image, VStack, useToast, Input } from 'native-base';
import { TouchableOpacity } from 'react-native';
import DriverList from '../../containers/driver/driver.List';
import TableDriver from '../../containers/commons/table.driver';
import InMapList from '../../containers/driver/inMapList';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../customInput/defaultInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Props {
    open: boolean;
    onHandler: Dispatch<SetStateAction<boolean>>;
    navigation: any;
}

const commentSchema = Yup.object().shape({
    comment: Yup.string(),
});

const DetailSheet = ({ open, onHandler, navigation }: Props) => {
    const toast = useToast();

    const { handleChange, handleBlur, handleSubmit, errors, touched, initialValues, resetForm, values } = useFormik({
        validationSchema: commentSchema,
        initialValues: {
            comment: '',
        },
        onSubmit: async (value) => {
            console.log(value);
        },
    });

    const pickResult = () => {
        navigation.goBack();
        toast.show({
            placement: 'top',
            description: 'Complete',
            render: () => {
                return (
                    <Box justifyContent={'center'} alignContent={'center'} w={'200px'} bg="blue.200" px="2" py="2" rounded="sm" mb={5}>
                        <Text color={'white.100'} textAlign={'center'}>
                            Complete!
                        </Text>
                    </Box>
                );
            },
        });
    };
    return (
        <Actionsheet isOpen={open} onClose={() => onHandler(false)}>
            <Actionsheet.Content>
                <KeyboardAwareScrollView>
                    <Box p={2} pt={10} alignItems={'center'}>
                        <Heading fontFamily={'Arch'} fontWeight={500} fontSize={24} mb={3}>
                            AE-002
                        </Heading>
                        <Box maxW={'100%'} px={2}>
                            <VStack w={'100%'}>
                                <HStack w={'100%'} m={2} p={2}>
                                    <Box w={'30%'}>
                                        <Text fontFamily={'Arch'} fontWeight={'700'} fontSize={'16'} color={'blue.100'}>
                                            Customer
                                        </Text>
                                    </Box>
                                    <Box w={'70%'}>
                                        <Text fontFamily={'Arch'} fontWeight={'700'} fontSize={'16'} color={'black.100'}>
                                            John
                                        </Text>
                                    </Box>
                                </HStack>
                                <HStack w={'100%'} m={2} p={2}>
                                    <Box w={'30%'}>
                                        <Text fontFamily={'Arch'} fontWeight={'700'} fontSize={'16'} color={'blue.100'}>
                                            Address
                                        </Text>
                                    </Box>
                                    <Box w={'70%'}>
                                        <Text fontFamily={'Arch'} fontWeight={'700'} fontSize={'16'} color={'black.100'}>
                                            12-10 Address Test Address
                                        </Text>
                                    </Box>
                                </HStack>
                                <HStack w={'100%'} m={2} p={2}>
                                    <Box w={'30%'}>
                                        <Text fontFamily={'Arch'} fontWeight={'700'} fontSize={'16'} color={'blue.100'}>
                                            Bag
                                        </Text>
                                    </Box>
                                    <Box w={'70%'}>
                                        <Text fontFamily={'Arch'} fontWeight={'700'} fontSize={'16'} color={'black.100'}>
                                            2ea
                                        </Text>
                                    </Box>
                                </HStack>
                                <HStack w={'100%'} m={2} p={2}>
                                    <Box w={'30%'}>
                                        <Text fontFamily={'Arch'} fontWeight={'700'} fontSize={'16'} color={'blue.100'}>
                                            Commnet
                                        </Text>
                                    </Box>
                                    <Box w={'65%'}>
                                        <Input
                                            value={values.comment}
                                            onBlur={handleBlur('comment')}
                                            touched={touched.comment}
                                            onChangeText={handleChange('comment')}
                                            placeholder="comment"
                                        />
                                    </Box>
                                </HStack>
                                <HStack w={'100%'} m={2} p={2} justifyContent={'space-between'}>
                                    <Button onPress={() => pickResult()} mr={15} w={'30%'} variant={'basicButton'} bg={'blue.200'}>
                                        <Text fontFamily={'Arch'} fontWeight={'700'} fontSize={'16'} color={'white.100'}>
                                            Pick
                                        </Text>
                                    </Button>
                                    <Button onPress={() => onHandler(false)} w={'30%'} variant={'basicButton'} bg={'gray.200'}>
                                        <Text fontFamily={'Arch'} fontWeight={'700'} fontSize={'16'} color={'black.100'}>
                                            Close
                                        </Text>
                                    </Button>
                                </HStack>
                            </VStack>
                        </Box>
                    </Box>
                </KeyboardAwareScrollView>
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default DetailSheet;
