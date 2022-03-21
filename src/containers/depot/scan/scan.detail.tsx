import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DepotParamList } from '../../../@types/navigationTypes';
import { Box, Button, Image, Input, Pressable, Text, VStack } from 'native-base';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import useAxiosServices from '../../../hooks/axiosHooks';
import { collectionTypes } from '../../../@types/collection.types';
import { timeFind } from '../../../utils/times';
const whiteArrow = require('../../../assets/icons/back-white.png');
const arrow = require('../../../assets/icons/LeftArrow.png');
const searchIcon = require('../../../assets/icons/search.png');

const ScanDetail = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const route = useRoute<RouteProp<DepotParamList, 'ScanDetail'>>();
    const code = route.params?.code ?? 'AAA0001';
    const navigation = useNavigation();
    const [list, setList] = useState<collectionTypes[]>([]);
    const [driver, setDriver] = useState('');
    const [customer, setCustomer] = useState(null);

    const [finding, setFinding] = useState(false);
    const { axiosService } = useAxiosServices();
    // const [data, setData] = useState<collectionTypes | null>(null);

    useEffect(() => {
        getAccept();
    }, [code]);

    const getAccept = async () => {
        try {
            const api = await axiosService.post('/pick/depot/codeData', { code });
            const { status, data, user, driver } = api.data;
            if (status) {
                setList([...[data]]);
                setDriver(driver);
                setCustomer(user);
            } else {
                Alert.alert(data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Box safeArea flex={1}>
            <Box mt={2} px={6} pl={3} w={'100%'}>
                <Box flexDirection={'row'} justifyContent={'space-between'}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen' as any)}>
                        <Image source={arrow} alt={'whiteArrow'} />
                    </TouchableOpacity>
                </Box>
            </Box>
            <Box p={2} px={4} my={2} alignItems={'flex-start'}>
                <Text fontWeight={400} fontSize={'30px'} fontFamily={'Arch'} color={'black.100'}>
                    {`${code}`}
                </Text>
            </Box>
            <>
                <VStack mx={4}>
                    {list.map((v, i) => (
                        <>
                            <Box
                                mb={4}
                                borderBottomWidth={1}
                                borderColor={'gray.200'}
                                flexDirection={'row'}
                                p={2}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Box mb={2}>
                                    <Text fontWeight={700} fontSize={'16px'} fontFamily={'Arch'} color={'blue.100'}>
                                        {`Bag Type`}
                                    </Text>
                                    <Text fontWeight={700} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                        {`N/A`}
                                    </Text>
                                </Box>
                            </Box>

                            <Box
                                mb={4}
                                borderBottomWidth={1}
                                borderColor={'gray.200'}
                                flexDirection={'row'}
                                p={2}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Box mb={2}>
                                    <Text fontWeight={700} fontSize={'16px'} fontFamily={'Arch'} color={'blue.100'}>
                                        {`Pickup date`}
                                    </Text>
                                    <Text fontWeight={700} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                        {v.pickDate} {timeFind(v.pickTime)}
                                    </Text>
                                </Box>
                            </Box>
                            <Box
                                mb={4}
                                borderBottomWidth={1}
                                borderColor={'gray.200'}
                                flexDirection={'row'}
                                p={2}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Box mb={2}>
                                    <Text fontWeight={700} fontSize={'16px'} fontFamily={'Arch'} color={'blue.100'}>
                                        {`Driver`}
                                    </Text>
                                    <Text fontWeight={700} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                        {`${driver}`}
                                    </Text>
                                </Box>
                            </Box>
                            <Box
                                mb={4}
                                borderBottomWidth={1}
                                borderColor={'gray.200'}
                                flexDirection={'row'}
                                p={2}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Box mb={2}>
                                    <Text fontWeight={700} fontSize={'16px'} fontFamily={'Arch'} color={'blue.100'}>
                                        {`Customer`}
                                    </Text>
                                    <Text fontWeight={700} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                        {/*@ts-ignore*/}
                                        {`${customer?.userName ?? ''}`}
                                    </Text>
                                </Box>
                            </Box>
                            <Box
                                mb={4}
                                borderBottomWidth={1}
                                borderColor={'gray.200'}
                                flexDirection={'row'}
                                p={2}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Box mb={2}>
                                    <Text fontWeight={700} fontSize={'16px'} fontFamily={'Arch'} color={'blue.100'}>
                                        {`Customer ID`}
                                    </Text>
                                    <Text fontWeight={700} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                        {/*@ts-ignore*/}
                                        {`${customer?.userEmail ?? ''}`}
                                    </Text>
                                </Box>
                            </Box>
                        </>
                    ))}
                </VStack>
            </>
            {/*@ts-ignore*/}
            <Button m={2} h={'80px'} bg={'blue.100'} onPress={() => navigation.navigate('CalculateScreen', { code })}>
                <Text fontWeight={400} fontSize={'30px'} fontFamily={'Arch'} color={'white.100'}>
                    SELECT
                </Text>
            </Button>
        </Box>
    );
};

export default ScanDetail;
