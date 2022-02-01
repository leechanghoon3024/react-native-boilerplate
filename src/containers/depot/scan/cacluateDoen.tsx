import React, { useEffect, useState } from 'react';
import { Box, Button, Image, ScrollView, Text, useToast } from 'native-base';
import useAxiosServices from '../../../hooks/axiosHooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DepotParamList } from '../../../@types/navigationTypes';
import { Alert } from 'react-native';
const arrow = require('../../../assets/icons/LeftArrow.png');

const CacluateDoen = () => {
    const toast = useToast();
    const { axiosService } = useAxiosServices();
    const navigation = useNavigation();
    const route = useRoute<RouteProp<DepotParamList, 'CalculateDone'>>();
    const { color, clear, other, lpb, steel, hdpe, alu, code, ineli, glass } = route.params;
    const [driver, setDriver] = useState('');
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        getAccept();
    }, [code]);

    const getAccept = async () => {
        try {
            const api = await axiosService.post('/pick/depot/codeData', { code });
            const { status, data, user, driver } = api.data;
            if (status) {
                setDriver(driver);
                setCustomer(user);
            } else {
                Alert.alert(data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const doneAlert = () => {
        Alert.alert('Done', 'Do you want to complete the entry?', [{ text: 'ok', onPress: () => done() }, { text: 'cancel' }]);
    };

    const done = async () => {
        try {
            const dataParam = {
                code,
                glass,
                clear,
                alu,
                color,
                hdpe,
                steel,
                lpb,
                other,
                ineli,
            };
            const api = await axiosService.post('/pick/depot/credit', dataParam);
            const { status, data } = api.data;
            if (status) {
                toast.show({
                    placement: 'top',
                    description: 'Complete',
                    render: () => {
                        return (
                            <Box
                                justifyContent={'center'}
                                alignContent={'center'}
                                w={'200px'}
                                bg="blue.200"
                                px="2"
                                py="2"
                                rounded="sm"
                                mb={5}
                            >
                                <Text color={'white.100'} textAlign={'center'}>
                                    Comlete!
                                </Text>
                            </Box>
                        );
                    },
                });
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                });
            } else {
                toast.show({
                    placement: 'top',
                    description: 'Complete',
                    render: () => {
                        return (
                            <Box
                                justifyContent={'center'}
                                alignContent={'center'}
                                w={'200px'}
                                bg="blue.200"
                                px="2"
                                py="2"
                                rounded="sm"
                                mb={5}
                            >
                                <Text color={'white.100'} textAlign={'center'}>
                                    Error
                                </Text>
                            </Box>
                        );
                    },
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Box flex={1}>
            <Box px={6} pl={3} w={'100%'} bg={'blue.100'}>
                <Box safeArea safeAreaBottom={0} flexDirection={'row'} justifyContent={'space-between'}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={arrow} alt={'whiteArrow'} />
                    </TouchableOpacity>
                </Box>
                <Text alignSelf={'center'} fontSize={'30px'} fontFamily={'Arch'} color={'white.100'} fontWeight={700}>
                    {code}
                </Text>
            </Box>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box m={4}>
                    <Box my={2}>
                        <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.100'}>
                            BagType
                        </Text>
                        <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                            N/A
                        </Text>
                    </Box>
                    <Box w={'100%'} flexDirection={'row'} my={1}>
                        <Box width={'60%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.100'}>
                                Glass
                            </Text>
                        </Box>
                        <Box width={'40%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                                {glass}
                            </Text>
                        </Box>
                    </Box>
                    <Box w={'100%'} flexDirection={'row'} my={1}>
                        <Box width={'60%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.100'}>
                                Clear plastic
                            </Text>
                        </Box>
                        <Box width={'60%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                                {glass}
                            </Text>
                        </Box>
                    </Box>
                    <Box w={'100%'} flexDirection={'row'} my={1}>
                        <Box width={'60%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.100'}>
                                Aluminum
                            </Text>
                        </Box>
                        <Box width={'40%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                                {alu}
                            </Text>
                        </Box>
                    </Box>
                    <Box w={'100%'} flexDirection={'row'} my={1}>
                        <Box width={'60%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.100'}>
                                Coloured Plastic
                            </Text>
                        </Box>
                        <Box width={'40%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                                {color}
                            </Text>
                        </Box>
                    </Box>
                    <Box w={'100%'} flexDirection={'row'} my={1}>
                        <Box width={'60%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.100'}>
                                HDPE
                            </Text>
                        </Box>
                        <Box width={'40%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                                {hdpe}
                            </Text>
                        </Box>
                    </Box>
                    <Box w={'100%'} flexDirection={'row'} my={1}>
                        <Box width={'60%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.100'}>
                                LPB
                            </Text>
                        </Box>
                        <Box width={'40%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                                {lpb}
                            </Text>
                        </Box>
                    </Box>
                    <Box w={'100%'} flexDirection={'row'} my={1}>
                        <Box width={'60%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.100'}>
                                Steel
                            </Text>
                        </Box>
                        <Box width={'40%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                                {steel}
                            </Text>
                        </Box>
                    </Box>
                    <Box w={'100%'} flexDirection={'row'} my={1}>
                        <Box width={'60%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.100'}>
                                Clear
                            </Text>
                        </Box>
                        <Box width={'40%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                                {clear}
                            </Text>
                        </Box>
                    </Box>
                    <Box w={'100%'} flexDirection={'row'} my={1}>
                        <Box width={'60%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.100'}>
                                Other
                            </Text>
                        </Box>
                        <Box width={'40%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                                {other}
                            </Text>
                        </Box>
                    </Box>
                    <Box w={'100%'} flexDirection={'row'} my={1}>
                        <Box width={'60%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.100'}>
                                Ineligible
                            </Text>
                        </Box>
                        <Box width={'40%'}>
                            <Text fontSize={'22px'} fontFamily={'Arch'} color={'red .100'}>
                                {ineli}
                            </Text>
                        </Box>
                    </Box>
                    <Box my={2}>
                        <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.100'}>
                            Driver
                        </Text>
                        <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                            {`${driver}`}
                        </Text>
                    </Box>
                    <Box my={2}>
                        <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.100'}>
                            Customer
                        </Text>
                        <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                            {`${customer?.userName ?? ''}`}
                        </Text>
                    </Box>
                </Box>
            </ScrollView>
            <Box safeArea safeAreaTop={0}>
                <Button m={2} h={'60px'} bg={'#0AA06E'} onPress={() => doneAlert()}>
                    <Text fontWeight={400} fontSize={'20px'} fontFamily={'Arch'} color={'#fff'}>
                        DONE
                    </Text>
                </Button>
            </Box>
        </Box>
    );
};

export default CacluateDoen;
