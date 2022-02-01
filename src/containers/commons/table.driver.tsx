import React from 'react';
import { VStack, Box, HStack, Text, ScrollView } from 'native-base';
import { Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
const TableDriver = () => {
    const navigation = useNavigation();
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Box mt={8}>
                <VStack space={2}>
                    <HStack
                        borderBottomWidth={3}
                        borderColor={'blue.200'}
                        space={2}
                        w="100%"
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        p={2}
                    >
                        {['Status', 'ID', 'date', 'Bags'].map((v) => (
                            <Box alignItems={'center'} w={'25%'}>
                                <Text fontFamily={'Arch'} fontSize={15} fontWeight={900}>
                                    {v}
                                </Text>
                            </Box>
                        ))}
                    </HStack>
                    {[1, 2, 3, 4, 5, 6, 6, 7, 8, 9].map((v) => (
                        <HStack
                            borderBottomWidth={0.5}
                            borderColor={'gray.200'}
                            p={2}
                            py={4}
                            space={2}
                            w="100%"
                            alignItems={'center'}
                            justifyContent={'space-between'}
                        >
                            <TouchableOpacity
                                style={{ flexDirection: 'row', width: '100%' }}
                                onPress={() => navigation.navigate('DriverView' as never)}
                            >
                                {['Collected', 'EC-0168', '10 Mar 21', '3'].map((v) => (
                                    <Box alignItems={'center'} w={'25%'}>
                                        <Text fontFamily={'Arch'} fontSize={15} fontWeight={900}>
                                            {v}
                                        </Text>
                                    </Box>
                                ))}
                            </TouchableOpacity>
                        </HStack>
                    ))}
                </VStack>
            </Box>
        </ScrollView>
    );
};

export default TableDriver;
