import React, { useEffect, useState } from 'react';
import DefaultHeader from '../../header/header.default';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Box, Heading, HStack, ScrollView, StatusBar, Text } from 'native-base';
import { BookStatusCase } from '../../../etc/bookStatusCase';
import { UserParamList } from '../../../@types/navigationTypes';
import useAxiosServices from '../../../hooks/axiosHooks';
import { collectionTypes, reportTypes } from '../../../@types/collection.types';
import { TouchableOpacity } from 'react-native';
import BackIcon from '../../../assets/icons/back.icon';
import { dateFormat, depotReportSelectCase } from '../../../utils/times';
import { Ar19B, Ar19N, Ar21B, Ar36B, La17N, La19N } from '../../../themes/font.style';
import { format } from 'date-fns';

const ReportCollection = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<UserParamList, 'ReportCollection'>>();
    const { idx } = route.params;
    const { axiosService } = useAxiosServices();
    const [detail, setDetail] = useState<null | reportTypes>(null);

    useEffect(() => {
        getData();
    }, [idx]);

    const getData = async () => {
        const api = await axiosService.post('/pick/app/report', { idx });
        const { status, data } = api.data;
        if (status) {
            console.log(data);
            setDetail({ ...data });
        }
    };

    return (
        <>
            <>
                <StatusBar barStyle={'dark-content'} />
                <Box bg={'white.100'} safeAreaTop mt={1} px={4}>
                    <HStack alignItems={'center'} justifyContent={'space-between'}>
                        <TouchableOpacity hitSlop={{ top: 30, left: 30, right: 30, bottom: 30 }} onPress={() => navigation.goBack()}>
                            <BackIcon />
                        </TouchableOpacity>
                    </HStack>
                </Box>
            </>
            <Box bg={'white.100'} flex={1} safeAreaBottom>
                <Box px={4} py={4}>
                    <Box px={4} pt={'20px'}>
                        <Heading {...Ar36B} color={'black.100'}>
                            Pickup report
                        </Heading>
                        <Box>
                            <Text fontFamily={'Arch'} fontWeight={500} fontSize={'14px'} color={'blue.100'}>
                                {`${BookStatusCase(detail?.status)} • `}
                                <Text fontFamily={'Arch'} fontWeight={100} fontSize={'14px'} color={'black.100'}>
                                    {`${detail?.driverTime ? format(new Date(detail?.driverTime ?? '2020-01-01'), 'dd MMM yyyy') : ''}`}
                                    {` at ${detail?.driverTime ? format(new Date(detail?.driverTime ?? '2020-01-01'), 'HH:mm a') : ''}`}
                                </Text>
                            </Text>
                            <Text {...Ar21B} color={'blue.200'}>
                                {`#AC-${idx}`}
                            </Text>
                        </Box>
                    </Box>
                </Box>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Box px={8}>
                        <Box w={'100%'} flexDirection={'row'} my={1} justifyContent={'space-between'}>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.200'}>
                                    Glass
                                </Text>
                            </Box>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                                    {detail?.glass ?? 0}
                                </Text>
                            </Box>
                        </Box>
                        <Box w={'100%'} flexDirection={'row'} my={1} justifyContent={'space-between'}>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.200'}>
                                    Clear plastic
                                </Text>
                            </Box>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                                    {detail?.clearPlastic ?? 0}
                                </Text>
                            </Box>
                        </Box>
                        <Box w={'100%'} flexDirection={'row'} my={1} justifyContent={'space-between'}>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.200'}>
                                    Aluminum
                                </Text>
                            </Box>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                                    {detail?.aluminium ?? 0}
                                </Text>
                            </Box>
                        </Box>
                        <Box w={'100%'} flexDirection={'row'} my={1} justifyContent={'space-between'}>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.200'}>
                                    Coloured Plastic
                                </Text>
                            </Box>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                                    {detail?.coloredPlastic ?? 0}
                                </Text>
                            </Box>
                        </Box>
                        <Box w={'100%'} flexDirection={'row'} my={1} justifyContent={'space-between'}>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.200'}>
                                    HDPE
                                </Text>
                            </Box>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                                    {detail?.hdpe ?? 0}
                                </Text>
                            </Box>
                        </Box>
                        <Box w={'100%'} flexDirection={'row'} my={1} justifyContent={'space-between'}>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.200'}>
                                    LPB
                                </Text>
                            </Box>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                                    {detail?.lpb ?? 0}
                                </Text>
                            </Box>
                        </Box>
                        <Box w={'100%'} flexDirection={'row'} my={1} justifyContent={'space-between'}>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.200'}>
                                    Steel
                                </Text>
                            </Box>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                                    {detail?.steel ?? 0}
                                </Text>
                            </Box>
                        </Box>
                        <Box w={'100%'} flexDirection={'row'} my={1} justifyContent={'space-between'}>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.200'}>
                                    Clear
                                </Text>
                            </Box>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                                    {detail?.clearPlastic ?? 0}
                                </Text>
                            </Box>
                        </Box>
                        <Box w={'100%'} flexDirection={'row'} my={1} justifyContent={'space-between'}>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'blue.200'}>
                                    Other
                                </Text>
                            </Box>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                                    {detail?.other ?? 0}
                                </Text>
                            </Box>
                        </Box>
                        <Box w={'100%'} flexDirection={'row'} my={1} justifyContent={'space-between'}>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'gray.200'}>
                                    Ineligible
                                </Text>
                            </Box>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'black.100'}>
                                    {`- ${detail?.other ?? 0}`}
                                </Text>
                            </Box>
                        </Box>
                        <Box mt={'50px'}>
                            <Box>
                                <Text {...Ar19B} color={'gray.300'}>
                                    Message
                                </Text>
                            </Box>
                            {detail?.depotReport &&
                                detail.depotReport.map((v) => (
                                    <Text mt={'10px'} {...La19N} color={'gray.300'}>
                                        {`${depotReportSelectCase(Number(v))}`}
                                    </Text>
                                ))}
                        </Box>
                        <Box mt={10} w={'100%'} flexDirection={'row'} my={1} justifyContent={'space-between'}>
                            <Box>
                                <Text fontSize={'24px'} fontFamily={'Arch'} color={'gray.200'}>
                                    Total
                                </Text>
                            </Box>
                            <Box>
                                <Text fontSize={'22px'} fontFamily={'Arch'} color={'#4C4C4C'}>
                                    {`${detail?.total ?? 0}`}
                                </Text>
                            </Box>
                        </Box>
                        <Box mt={3} mb={'30px'} w={'100%'} flexDirection={'row'} my={1} justifyContent={'space-between'}>
                            <Box>
                                <Text fontSize={'28px'} fontFamily={'Arch'} color={'blue.200'}>
                                    Credit
                                </Text>
                            </Box>
                            <Box>
                                <Text fontSize={'28px'} fontFamily={'Lato'} fontWeight={700} color={'blue.200'}>
                                    {`$ ${detail?.credit ?? 0}`}
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                </ScrollView>
            </Box>
        </>
    );
};

export default ReportCollection;
