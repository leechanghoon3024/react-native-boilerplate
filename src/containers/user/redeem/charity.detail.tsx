import React, { useEffect, useState } from 'react';
import { Box, Button, Progress, ScrollView, Text, useToast } from 'native-base';
import HeaderOnlyBack from '../../header/header.onBack';
import { TabView } from 'react-native-tab-view';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BackHandler, Dimensions, ImageBackground } from 'react-native';
import { UserParamList } from '../../../@types/navigationTypes';
import { CharityListTypes } from '../../../@types/charity.types';
import useAxiosServices from '../../../hooks/axiosHooks';
import RenderHtml from 'react-native-render-html';

const sampleImage = require('../../../assets/sample-image.png');
const { width } = Dimensions.get('window');
const sampleImage2 = require('../../../assets/sample2.png');
const CharityDetail = () => {
    const toast = useToast();
    const navigation = useNavigation();
    const route = useRoute<RouteProp<UserParamList, 'CharityDetail'>>();
    const idx = route.params?.idx;
    const { axiosService } = useAxiosServices();
    const [detail, setDetail] = useState<CharityListTypes | null>(null);

    useEffect(() => {
        getDetail();
    }, [idx]);

    const getDetail = async () => {
        const api = await axiosService.post('/charity/detail', { idx });
        const { status, data } = api.data;
        if (status) {
            setDetail({ ...data });
        }
    };

    const setAccect = async () => {
        const api = await axiosService.post('/charity/user/add', { idx });
        const { status, data } = api.data;
        if (status) {
            if (data === 'ok') {
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
                                    Add!
                                </Text>
                            </Box>
                        );
                    },
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
                                    excluded!
                                </Text>
                            </Box>
                        );
                    },
                });
            }
        }
    };
    console.log(Number((detail?.userFund ?? 0 / detail?.fund) * 100));
    return (
        <Box flex={1}>
            <ImageBackground source={{ uri: detail?.mainImage }} style={{ width, height: 300 }} resizeMode={'cover'}>
                <Box safeArea>
                    <HeaderOnlyBack navigation={navigation} />
                </Box>
            </ImageBackground>
            <ScrollView flex={1}>
                <Box flex={1} p={4}>
                    <Text fontWeight={700} fontSize={'30px'} fontFamily={'Lato'} color={'black.100'}>
                        {detail?.title}
                    </Text>
                    <Text fontWeight={700} fontSize={'18px'} fontFamily={'Lato'} color={'blue.200'}>
                        {detail?.subTitle}
                    </Text>
                    <Progress
                        colorScheme="primary"
                        size="md"
                        _filledTrack={{ bg: 'blue.300' }}
                        bg="gray.200"
                        mb={4}
                        value={Number((detail?.userFund / detail?.fund) * 100)}
                        mt={4}
                    />
                    <Box flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Box>
                            <Text fontWeight={300} fontSize={'14px'} fontFamily={'Arch'} color={'black.100'}>
                                Funded so far
                            </Text>
                            <Text fontWeight={700} fontSize={'14px'} fontFamily={'Lato'} color={'blue.300'}>
                                ${detail?.userFund}
                            </Text>
                        </Box>
                        <Box alignItems={'flex-end'}>
                            <Text fontWeight={300} fontSize={'14px'} fontFamily={'Arch'} color={'black.100'}>
                                Funds Target
                            </Text>
                            <Text fontWeight={700} fontSize={'14px'} fontFamily={'Lato'} color={'blue.300'}>
                                ${detail?.fund}
                            </Text>
                        </Box>
                    </Box>
                    <Box w={'100%'} mt={6}>
                        <RenderHtml contentWidth={width} source={{ html: detail?.content }} />
                    </Box>
                </Box>
            </ScrollView>
            <Box flexDirection={'row'} w={'100%'} justifyContent={'space-between'} p={6}>
                <Button _disabled={{ bg: 'gray.100' }} width={'100%'} variant={'basicButton'} bg={'blue.200'} onPress={() => setAccect()}>
                    <Text fontSize={'18px'} fontWeight={100} fontFamily={'Arch'} color={'white.100'}>
                        Set as payout
                    </Text>
                </Button>
            </Box>
        </Box>
    );
};

export default CharityDetail;
