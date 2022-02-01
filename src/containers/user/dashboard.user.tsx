import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, Linking } from 'react-native';
import { VStack, Text, Box, Center, Image, ScrollView, Fab, Icon, Button, Pressable } from 'native-base';
import { AuthParamList, UserParamList, UserStackParamList } from '../../@types/navigationTypes';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import DefaultHeader from '../header/header.default';
import MainHeader from '../header/header.main';
import CustomTabView from '../../components/tab.view';
import InfoModal from './confirm/info.modal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import useAxiosServices from '../../hooks/axiosHooks';
import { collectionTypes } from '../../@types/collection.types';
import polyline from '@mapbox/polyline';

const BackGroundImage = require('../../assets/background/background1.png');
const MoneyFlow = require('../../assets/icons/moneyFlow.png');

const { width, height } = Dimensions.get('window');
const DashboardUser = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [list, setList] = useState<collectionTypes[]>([]);
    const navigation = useNavigation<NavigationProp<UserParamList>>();
    const { axiosService } = useAxiosServices();
    const [openInfo, setOpenInfo] = useState(false);
    const openCollection = () => {
        if (user?.profileCheck === 1 && user?.addressCheck === 1) {
            navigation.navigate('Collection' as never);
        } else {
            setOpenInfo(true);
        }
    };

    useEffect(() => {
        getList();
        const un = navigation.addListener('focus', async () => {
            await getList();
        });
        return un;
    }, [navigation]);

    const getList = async () => {
        try {
            const api = await axiosService.post('/pick/app/list');
            const { status, list } = api.data;
            console.log(list);
            if (status) {
                setList([...list]);
            }
        } catch (e) {
            console.log('error', e);
        }
    };

    return (
        <>
            <ImageBackground source={BackGroundImage} style={{ flex: 1, alignItems: 'center' }}>
                <Box safeArea flex={1} m={3} maxW={400}>
                    <MainHeader navigation={navigation} />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Center py={'20px'}>
                            <Text fontSize={'56px'} fontFamily={'Lato'} fontWeight={700} color={'white.100'}>
                                ${` ${user?.credit ?? 0}`}
                            </Text>
                            <Text fontSize={'18px'} fontFamily={'Arch'} fontWeight={600} color={'gray.300'}>
                                Credit Balance
                            </Text>
                            <Pressable _pressed={{ opacity: 0.5 }} onPress={() => navigation.navigate('RedeemScreen')}>
                                <Box alignItems={'center'} flexDirection={'row'} my={8}>
                                    <Image source={MoneyFlow} alt={'moneyFloew'} mr={3} />
                                    <Text fontSize={'18px'} fontFamily={'Arch'} fontWeight={600} color={'blue.200'}>
                                        Redeem
                                    </Text>
                                </Box>
                            </Pressable>
                        </Center>
                        <CustomTabView list={list} />
                    </ScrollView>
                    <Center position={'absolute'} bottom={3} w={'100%'} m={2} height={'50px'} bg={'#00ff0000'} p={2}>
                        <Button onPress={() => openCollection()} colorScheme={'blue.200'} variant={'basicButton'}>
                            <Text color={'white.100'} fontSize={'20px'} fontWeight={500} fontFamily={'Arch'}>
                                Book a Collection
                            </Text>
                        </Button>
                    </Center>
                </Box>
            </ImageBackground>
            <InfoModal open={openInfo} setOpen={setOpenInfo} />
        </>
    );
};

export default DashboardUser;
