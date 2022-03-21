import React, { useEffect, useState } from 'react';
import { Box, Button, Image, Progress, ScrollView, Text, useToast } from 'native-base';
import HeaderOnlyBack from '../../header/header.onBack';
import { TabView } from 'react-native-tab-view';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BackHandler, Dimensions, ImageBackground } from 'react-native';
import { UserParamList } from '../../../@types/navigationTypes';
import { CharityListTypes } from '../../../@types/charity.types';
import useAxiosServices from '../../../hooks/axiosHooks';
import RenderHtml from 'react-native-render-html';
import { Ar20M, Ar22M, La15B, La15Sb, La31B } from '../../../themes/font.style';
import AutoHeightImage from 'react-native-auto-height-image';
import { profileSetting } from '../../../store/authReducer';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';

const sampleImage = require('../../../assets/sample-image.png');
const { width } = Dimensions.get('window');
const sampleImage2 = require('../../../assets/sample2.png');

interface PrograssCustome {
    value: number;
    total: number;
}

const PrograssCustome = ({ value, total }: PrograssCustome) => {
    const percent = (value / total) * 100;
    const result = Number.isNaN(percent) ? '0%' : `${percent > 100 ? 100 : percent}%`;
    return (
        <Box mt={'33px'} mb={'11px'} w={'100%'} h={'20px'} overflow={'hidden'} borderRadius={'30px'}>
            <Box zIndex={2} h={'20px'} bg={'blue.200'} w={result} position={'absolute'} alignItems={'flex-end'} pr={'4px'}>
                <Text {...La15B} color={'white.100'}>
                    {result}
                </Text>
            </Box>
            <Box h={'20px'} zIndex={1} w={'100%'} bg={'gray.100'} position={'absolute'}>
                <Text {...La15B} color={'white.100'} fontSize={'300px'}>
                    {'0%'}
                </Text>
            </Box>
        </Box>
    );
};

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
    const dispatch = useDispatch();
    const addressChangeProfileGet = async () => {
        const getProfile = await axiosService.post('/users/app/profile');
        const { data: profileData, status: profileStatus } = getProfile.data;
        if (profileStatus) {
            dispatch(profileSetting({ user: profileData, userRole: profileData.userRole }));
        }
    };

    const setAccect = async () => {
        const api = await axiosService.post('/charity/user/add', { idx });
        const { status, data } = api.data;
        if (status) {
            if (data === 'ok') {
                Toast.show({
                    type: 'info',
                    // @ts-ignore
                    text1: 'Done',
                });
            } else {
                toast.show({
                    placement: 'bottom',
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
            await addressChangeProfileGet();
        }
    };
    return (
        <Box flex={1} top={-1} bg={'white.100'}>
            <ImageBackground source={{ uri: detail?.mainImage ?? '' }} style={{ width, height: 277 }} resizeMode={'cover'}>
                <Box safeAreaTop>
                    <HeaderOnlyBack navigation={navigation} />
                </Box>
            </ImageBackground>
            <ScrollView flex={1} w={'100%'}>
                <Box flex={1} px={'30px'} py={'10px'} w={'100%'}>
                    <Text {...La31B} color={'black.100'}>
                        {detail?.title}
                    </Text>
                    <Text {...Ar20M} color={'blue.200'}>
                        {detail?.subTitle}
                    </Text>
                    <PrograssCustome value={detail?.userFund ?? 0} total={detail?.fund ?? 0} />
                    <Box flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Box>
                            <Text fontWeight={300} fontSize={'16px'} fontFamily={'Arch'} color={'black.100'}>
                                Funded so far
                            </Text>
                            <Text fontWeight={700} fontSize={'16px'} fontFamily={'Lato'} color={'blue.200'}>
                                ${detail?.userFund}
                            </Text>
                        </Box>
                        <Box alignItems={'flex-end'}>
                            <Text fontWeight={300} fontSize={'16px'} fontFamily={'Arch'} color={'black.100'}>
                                Funds Target
                            </Text>
                            <Text fontWeight={700} fontSize={'16px'} fontFamily={'Lato'} color={'blue.200'}>
                                ${detail?.fund}
                            </Text>
                        </Box>
                    </Box>
                    <Box w={'100%'} mt={6}>
                        <RenderHtml contentWidth={width} source={{ html: (detail?.content as string) ?? '' }} />
                    </Box>
                </Box>
            </ScrollView>
            <Box flexDirection={'row'} w={'100%'} justifyContent={'space-between'} p={6}>
                <Button
                    bottom={10}
                    _disabled={{ bg: 'gray.100' }}
                    width={'100%'}
                    variant={'basicButton'}
                    bg={'blue.200'}
                    onPress={() => setAccect()}
                    shadow={8}
                >
                    <Text {...Ar22M} color={'white.100'}>
                        Set as payout
                    </Text>
                </Button>
            </Box>
        </Box>
    );
};

export default CharityDetail;
