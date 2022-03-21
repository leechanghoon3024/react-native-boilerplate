import React, { useEffect, useState } from 'react';
import { Box, Button, Image, ScrollView, Text, useToast } from 'native-base';
import useAxiosServices from '../../../hooks/axiosHooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DepotParamList } from '../../../@types/navigationTypes';
import { Alert } from 'react-native';
import { collectionTypes } from '../../../@types/collection.types';
const arrow = require('../../../assets/icons/LeftArrow.png');

const DepotDetail = () => {
    const toast = useToast();
    const { axiosService } = useAxiosServices();
    const navigation = useNavigation();
    const route = useRoute<RouteProp<DepotParamList, 'DepotDetail'>>();
    const { code } = route.params;
    const [driver, setDriver] = useState('');
    const [customer, setCustomer] = useState(null);
    const [detail, setDetail] = useState<collectionTypes | null>(null);
    useEffect(() => {
        getAccept();
    }, [code]);

    const getAccept = async () => {
        try {
            const api = await axiosService.post('/pick/depot/detail', { code });
            const { status, data, driver, user } = api.data;
            if (status) {
                setDetail({ ...data });
                setDriver(driver);
                setCustomer({ ...user });
            } else {
                Alert.alert(data);
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
                                {detail?.glass ?? 0}
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
                                {detail?.clearPlastic ?? 0}
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
                                {detail?.aluminium ?? 0}
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
                                {detail?.coloredPlastic ?? 0}
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
                                {detail?.hdpe ?? 0}
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
                                {detail?.lpb ?? 0}
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
                                {detail?.steel ?? 0}
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
                                {detail?.clearPlastic ?? 0}
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
                                {detail?.other ?? 0}
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
                            {/*@ts-ignore*/}
                            {`${customer?.userName ?? ''}`}
                        </Text>
                    </Box>
                </Box>
            </ScrollView>
        </Box>
    );
};

export default DepotDetail;
