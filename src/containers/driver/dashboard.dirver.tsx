import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground } from 'react-native';
import { VStack, Text, Box, Center, Image, ScrollView, Fab, Icon } from 'native-base';
import { AuthParamList, UserParamList, UserStackParamList } from '../../@types/navigationTypes';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import DefaultHeader from '../header/header.default';
import MainHeader from '../header/header.main';
import CustomTabView from '../../components/tab.view';
import TabDriver from '../../components/tab.driver';
import ProgressCircle from 'react-native-progress-circle';
import DriverHeader from '../header/driver.header';
import { collectionTypes } from '../../@types/collection.types';
import useAxiosServices from '../../hooks/axiosHooks';
const BackGroundImage = require('../../assets/background/background1.png');
const MoneyFlow = require('../../assets/icons/moneyFlow.png');

const { width, height } = Dimensions.get('window');
const DashBoardDriver = () => {
    const { axiosService } = useAxiosServices();
    const navigation = useNavigation<NavigationProp<UserParamList>>();
    const [readyList, setReadyList] = useState<collectionTypes[]>([]);
    const [comList, setComList] = useState<collectionTypes[]>([]);

    useEffect(() => {
        const un = navigation.addListener('focus', async () => {
            await getFetch();
        });
        return un;
    }, []);

    const getFetch = async () => {
        try {
            const api = await axiosService.post('/pick/driver/list');
            const { status, readyList, comList } = api.data;
            console.log(api.data);
            if (status) {
                setReadyList([...readyList]);
                setComList([...comList]);
            }
        } catch (e) {}
    };
    return (
        <>
            <Image w={width} h={height / 1.5} source={BackGroundImage} position={'absolute'} zIndex={1} />
            <Box safeArea flex={1} m={3} px={2} zIndex={2} bg={'rgba(255,255,255,0)'}>
                <DriverHeader navigation={navigation} />
                <Box
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    flexDirection={'row'}
                    p={8}
                    py={6}
                    bg={'white.100'}
                    my={8}
                    borderRadius={18}
                >
                    <Box>
                        <Text fontSize={'14px'} fontFamily={'Lato'} fontWeight={700} color={'gray.200'}>
                            Goals progress
                        </Text>
                        <Text mt={2} fontSize={'18px'} fontFamily={'Arch'} fontWeight={600} color={'blue.200'}>
                            {`Schedule\n` + 'Goals'}
                        </Text>
                        {readyList.length + comList.length !== 0 ? (
                            <Text mt={2} fontSize={'14px'} fontFamily={'Arch'} fontWeight={600} color={'blue.200'}>
                                {`${comList.length} / ${readyList.length + comList.length}`}
                            </Text>
                        ) : (
                            <Text mt={2} fontSize={'14px'} fontFamily={'Arch'} fontWeight={600} color={'blue.200'}>
                                No Schedule
                            </Text>
                        )}
                    </Box>

                    <ProgressCircle
                        percent={
                            Number.isNaN(comList.length / comList.length + readyList.length)
                                ? 0
                                : Number((comList.length / (comList.length + readyList.length)) * 100)
                        }
                        radius={50}
                        borderWidth={8}
                        color="#00FF57"
                        shadowColor="#F3F3F3"
                        bgColor="#fff"
                    >
                        <Text fontSize={'24px'} fontFamily={'Lato'} fontWeight={500} color={'black.100'}>
                            {comList.length}
                        </Text>
                    </ProgressCircle>
                </Box>
                <TabDriver comList={comList} readyList={readyList} />
                {/*<Center bg={'#00ff0000'} p={2}>*/}
                {/*    <Fab*/}
                {/*        backgroundColor={'blue.200'}*/}
                {/*        _pressed={{ opacity: 0.7 }}*/}
                {/*        _text={{*/}
                {/*            fontFamily: 'Arch',*/}
                {/*            fontSize: 20,*/}
                {/*            fontWeight: 500,*/}
                {/*            color: 'white.100',*/}
                {/*        }}*/}
                {/*        w={'60px'}*/}
                {/*        h={'60px'}*/}
                {/*        label={'1'}*/}
                {/*        bottom={10}*/}
                {/*        size="sm"*/}
                {/*    />*/}
                {/*</Center>*/}
            </Box>
        </>
    );
};

export default DashBoardDriver;
