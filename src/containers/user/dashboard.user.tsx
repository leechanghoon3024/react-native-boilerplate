import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, Linking, StatusBarIOS } from 'react-native';
import { VStack, Text, Box, Center, Image, ScrollView, Fab, Icon, Button, Pressable, useTheme, StatusBar } from 'native-base';
import { AuthParamList, UserParamList, UserStackParamList } from '../../@types/navigationTypes';
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
import DefaultHeader from '../header/header.default';
import MainHeader from '../header/header.main';
import CustomTabView from '../../components/tab.view';
import InfoModal from './confirm/info.modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import useAxiosServices from '../../hooks/axiosHooks';
import { collectionTypes } from '../../@types/collection.types';

import { Ar17M, Ar18M, Ar22M, La56Sb } from '../../themes/font.style';
import LinearGradient from 'react-native-linear-gradient';
import WebSheet from '../../components/bottomSheet/web.sheet';
import FcmUser from '../../components/fcm.user';

const BackGroundImage = require('../../assets/background/background1.png');
const MoneyFlow = require('../../assets/icons/moneyFlow.png');

const { width, height } = Dimensions.get('window');

const DashboardUser = () => {
    const theme = useTheme();
    const user = useSelector((state: RootState) => state.auth.user);
    const [list, setList] = useState<collectionTypes[]>([]);
    const navigation = useNavigation<NavigationProp<UserParamList>>();
    const { axiosService } = useAxiosServices();
    const dispatch = useDispatch();
    const [openInfo, setOpenInfo] = useState(false);
    const [credit, setCredit] = useState(10);
    const [loading, setLoading] = useState(true);
    const [init, setInit] = useState(false);

    const openCollection = () => {
        const check = user?.userType === 1 ? user?.profileCheck === 1 : user?.businessCheck === 1;
        if (check && user?.addressCheck === 1) {
            navigation.navigate('Collection' as never);
        } else {
            setOpenInfo(true);
        }
    };

    useEffect(() => {
        getList();
        getListStat();
        const un = navigation.addListener('focus', async () => {
            await getList();
        });

        return un;
    }, [navigation, user]);

    const getList = async () => {
        try {
            setCredit(0);
            const api = await axiosService.post('/pick/app/list');
            const { status, list } = api.data;
            console.log(list);
            if (status) {
                setList([...list]);
            }
        } catch (e) {
            console.log('error', e);
        } finally {
            setRefreshing(false);
            setCredit(user?.credit ?? 0);
            setLoading(false);
        }
    };

    const getListStat = async () => {
        try {
            setCredit(0);
            await axiosService.post('/pick/app/list');
        } catch (e) {
        } finally {
            userProfileAddressCheck();
        }
    };
    console.log('init', init);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await getList();
    };
    const [openLink, setOpenLink] = useState(false);
    const [graView, setGraView] = useState(0);

    const userProfileAddressCheck = () => {
        const check = user?.userType === 1 ? user?.profileCheck === 1 : user?.businessCheck === 1;
        const addressCheck = user?.addressCheck === 1;
        setTimeout(() => {
            if (!check) {
                navigation.navigate('ProfileUser' as never, { type: 'user' } as never);
                return;
            }
            if (!addressCheck) {
                navigation.navigate('Address' as never);
                return;
            }
        }, 10);
    };

    return (
        <>
            <StatusBar barStyle={'light-content'} />
            <Image w={width} h={height / 1.5} source={BackGroundImage} position={'absolute'} zIndex={1} />
            <Box safeArea flex={1} maxW={400} zIndex={2} bg={'rgba(255,255,255,0)'}>
                <MainHeader navigation={navigation} setOpenLink={setOpenLink} />
                <Box mx={'14px'} alignItems={'center'} pt={'24px'} pb={'26px'}>
                    <Text {...La56Sb} color={'white.100'}>
                        ${`${user?.credit}`}
                    </Text>
                    <Text {...Ar18M} color={'gray.300'}>
                        Credit Balance
                    </Text>
                    <Pressable _pressed={{ opacity: 0.5 }} onPress={() => navigation.navigate('RedeemScreen' as never)}>
                        <Box alignItems={'center'} flexDirection={'row'} mt={'36px'}>
                            <Image w={'35px'} h={'35px'} resizeMode={'contain'} source={MoneyFlow} alt={'moneyFloew'} mr={3} />
                            <Text {...Ar17M} color={'blue.200'}>
                                Redeem
                            </Text>
                        </Box>
                    </Pressable>
                </Box>
                <Box flex={1} mx={'14px'}>
                    <CustomTabView list={list} refreshing={refreshing} onRefresh={onRefresh} setView={setGraView} />
                </Box>

                <Center
                    zIndex={11}
                    alignSelf={'center'}
                    backgroundColor={'red.100'}
                    position={'absolute'}
                    bottom={'25px'}
                    w={'358px'}
                    maxW={'400px'}
                    m={2}
                    px={4}
                    height={'50px'}
                    bg={'#00ff0000'}
                    p={2}
                >
                    <Button zIndex={30} onPress={() => openCollection()} colorScheme={'blue.200'} variant={'basicButton'} shadow={8}>
                        <Text {...Ar22M} color={'white.100'}>
                            Book a Collection
                        </Text>
                    </Button>
                </Center>
                {graView === 1 && (
                    <LinearGradient
                        style={{ zIndex: 2, width: 500, height: 200, position: 'absolute', bottom: 0 }}
                        colors={['rgba(255,255,255,0)', 'rgba(248,248,248,0.67)', 'rgba(248,248,248,0.88)', 'rgb(255,255,255)']}
                    ></LinearGradient>
                )}
            </Box>
            <InfoModal open={openInfo} setOpen={setOpenInfo} />
            <WebSheet open={openLink} setOpen={setOpenLink} url={'https://recan.co'} />
        </>
    );
};

export default DashboardUser;
