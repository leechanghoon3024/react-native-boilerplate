import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, useToast, Text, Image, Divider, Button, StatusBar } from 'native-base';
import HeaderBack from '../../header/header.back';
import HeaderOnlyBack from '../../header/header.onBack';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Dimensions, TouchableOpacity, Image as RNImage } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import RedeemCard from './redeem.card';
import { CharityListTypes } from '../../../@types/charity.types';
import useAxiosServices, { shopUrl } from '../../../hooks/axiosHooks';
import BackGray from '../../../assets/icons/back.gray';
import { Ar18M, Ar18SbBlack, Ar22M, Ar25NBlack, Ar25SbBlack, La15Sb, La40Sb } from '../../../themes/font.style';
import WebSheet from '../../../components/bottomSheet/web.sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        getToken();
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
            <TouchableOpacity
                style={{
                    right: 0,
                    marginBottom: 5,
                    shadowColor: '#00000026',
                    shadowOffset: {
                        width: 0,
                        height: 8,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 4.65,

                    elevation: 8,
                }}
                onPress={() => navigation.navigate('CharityDetail' as never, { idx: item.idx } as never)}
            >
                <Box bg={'white.100'} borderRadius={18} overflow={'hidden'} h={'220px'} mr={'10px'}>
                    <RNImage
                        style={{ width: '100%', height: 120 }}
                        source={{ uri: item.mainImage }}
                        loadingIndicatorSource={require('../../../assets/icons/CplaceHolder.png')}
                    />
                    <Box p={4}>
                        <Text {...Ar25NBlack} color={'black.100'}>
                            {item.title}
                        </Text>
                        <Text {...La15Sb} color={'black.100'}>
                            {item.subTitle}
                        </Text>
                    </Box>
                    <Box
                        top={'43%'}
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

    const [openShop, setOpenShop] = useState(false);
    const [token, setToken] = useState('');
    const getToken = async () => {
        const tokens = await AsyncStorage.getItem('accessToken');
        setToken(tokens);
    };
    return (
        <>
            <StatusBar barStyle={'light-content'} />
            <Box flex={1} bg={'white.100'}>
                <Box bg={'blue.200'}>
                    <Box safeAreaTop p={2} pb={4}>
                        <HeaderOnlyBack navigation={navigation} />
                        <Box pt={1} px={6} w={'100%'} justifyContent={'flex-end'} alignItems={'flex-end'}>
                            <Text {...La40Sb} color={'white.100'}>
                                {`$ ${user?.credit ?? 0}`}
                            </Text>
                            <Text {...Ar18M} color={'white.100'}>
                                {`Credit Balance`}
                            </Text>
                        </Box>
                    </Box>
                </Box>
                <Box px={'35px'} my={2}>
                    <RedeemCard type={user?.payType as any} navigation={navigation} />
                    <Divider />
                    <Box w={'100%'} shadow={0} mt={'10px'} mb={'18px'}>
                        <TouchableOpacity onPress={() => setOpenShop(true)}>
                            <Image borderRadius={15} w={'100%'} h={'110px'} resizeMode={'contain'} alt={'recanShop'} source={recanShop} />
                        </TouchableOpacity>
                    </Box>
                </Box>
                <Box mt={'-20px'} px={'35px'} flex={1}>
                    <Box mb={2} justifyContent={'space-between'} alignItems={'center'} flexDirection={'row'}>
                        <Text mb={'11px'} {...Ar18SbBlack} letterSpacing={'2'}>
                            CHARITIES
                        </Text>
                        <Box mb={'11px'}>
                            <TouchableOpacity onPress={() => navigation.navigate('RedeemCharitied' as any)}>
                                <BackGray />
                            </TouchableOpacity>
                        </Box>
                    </Box>
                    <Box right={'30px'} flex={1}>
                        <Carousel inactiveSlideScale={1} data={data} renderItem={renderItem} sliderWidth={width} itemWidth={width - 60} />
                    </Box>
                </Box>
                <Box position={'absolute'} bottom={'30px'} px={'35px'} flexDirection={'row'} w={'100%'} justifyContent={'center'}>
                    <Button
                        shadow={8}
                        w={'358px'}
                        onPress={() => navigation.navigate('PayoutDetail' as any)}
                        _disabled={{ bg: 'gray.100' }}
                        variant={'basicButton'}
                        bg={'blue.200'}
                    >
                        <Text {...Ar22M} color={'white.100'}>
                            Payout
                        </Text>
                    </Button>
                </Box>
            </Box>
            <WebSheet option={true} open={openShop} setOpen={setOpenShop} url={`${shopUrl}${token}`} />
        </>
    );
};

export default RedeemMain;
