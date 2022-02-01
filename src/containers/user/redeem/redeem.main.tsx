import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, useToast, Text, Image, Divider, Button } from 'native-base';
import HeaderBack from '../../header/header.back';
import HeaderOnlyBack from '../../header/header.onBack';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Dimensions, TouchableOpacity, Image as RNImage } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import RedeemCard from './redeem.card';
import { CharityListTypes } from '../../../@types/charity.types';
import useAxiosServices from '../../../hooks/axiosHooks';

const voucher = require('../../../assets/icons/voucher-icon.png');
const arrow = require('../../../assets/icons/back-gray.png');
const recanShop = require('../../../assets/recan-shop.png');
const sampleImage = require('../../../assets/sample-image.png');

const sampleData = [
    { title: 'Bottles for Brushies', image: sampleImage, subTitle: 'Queensland Trust for Nature' },
    { title: 'Bottles for Brushies', image: sampleImage, subTitle: 'Queensland Trust for Nature' },
    { title: 'Bottles for Brushies', image: sampleImage, subTitle: 'Queensland Trust for Nature' },
];
const { width } = Dimensions.get('window');

interface DataProps {
    item: CharityListTypes;
    index: number;
}

const RedeemMain = () => {
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.auth.user);
    const toast = useToast();
    const { axiosService } = useAxiosServices();
    const [data, setData] = useState<CharityListTypes[]>([]);

    useEffect(() => {
        getFetch();
    }, []);

    const getFetch = async () => {
        const api = await axiosService.post('/charity/list', { option: '2', skip: 0, take: 10 });
        const { list } = api.data;
        if (list) {
            setData([...list]);
        }
    };

    const renderItem = ({ item, index }: DataProps) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('CharityDetail', { idx: item.idx })}>
                <Box bg={'white.100'} borderRadius={18} overflow={'hidden'}>
                    <RNImage style={{ width: '100%', height: 150 }} alt={'recanShop'} source={{ uri: item.mainImage }} />
                    <Box p={4}>
                        <Text fontWeight={500} fontSize={'25px'} fontFamily={'Arch'} color={'black.100'}>
                            {item.title}
                        </Text>
                        <Text fontWeight={500} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                            {item.subTitle}
                        </Text>
                    </Box>
                    <Box
                        top={'50%'}
                        right={'10px'}
                        width={'50px'}
                        height={'50px'}
                        borderRadius={100}
                        position={'absolute'}
                        borderWidth={1}
                        borderColor={'black.100'}
                        overflow={'hidden'}
                    >
                        <Image
                            source={{ uri: item.logoImage }}
                            alt={'logoImage'}
                            style={{ width: 50, height: 50 }}
                            resizeMode={'stretch'}
                        />
                    </Box>
                </Box>
            </TouchableOpacity>
        );
    };

    return (
        <Box flex={1}>
            <Box bg={'blue.200'}>
                <Box safeArea p={2}>
                    <HeaderOnlyBack navigation={navigation} />
                    <Box px={6} w={'100%'} justifyContent={'flex-end'} alignItems={'flex-end'}>
                        <Text fontWeight={700} fontSize={'36px'} fontFamily={'Lato'} color={'white.100'}>
                            {`$ ${user?.credit ?? 0}`}
                        </Text>
                        <Text fontWeight={700} fontSize={'18px'} fontFamily={'Arch'} color={'white.100'}>
                            {`Credit Balance`}
                        </Text>
                    </Box>
                </Box>
            </Box>
            <Box px={6} my={4}>
                <RedeemCard type={user?.payType} navigation={navigation} />
                <Divider />
                <Box>
                    <TouchableOpacity>
                        <Image w={'400px'} h={'140px'} alt={'recanShop'} source={recanShop} />
                    </TouchableOpacity>
                </Box>
            </Box>
            <Box mt={'-20px'}>
                <Box mb={2} pr={6} justifyContent={'space-between'} flexDirection={'row'} mr={3}>
                    <Text ml={6} mb={2} fontWeight={700} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                        CHARITIES
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('RedeemCharitied')}>
                        <Image source={arrow} alt={'voucher'} />
                    </TouchableOpacity>
                </Box>

                <Carousel layout={'default'} data={data} renderItem={renderItem} sliderWidth={width} itemWidth={width - 80} />
            </Box>
            <Box flexDirection={'row'} w={'100%'} justifyContent={'space-between'} p={6}>
                <Button
                    onPress={() => navigation.navigate('PayoutDetail')}
                    _disabled={{ bg: 'gray.100' }}
                    width={'100%'}
                    variant={'basicButton'}
                    bg={'blue.200'}
                >
                    <Text fontSize={'18px'} fontWeight={100} fontFamily={'Arch'} color={'white.100'}>
                        Payout
                    </Text>
                </Button>
            </Box>
        </Box>
    );
};

export default RedeemMain;
