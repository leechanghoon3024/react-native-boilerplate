import React, { useEffect, useState } from 'react';
import { Box, Button, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import HeaderOnlyBack from '../../header/header.onBack';
import TabDriver from '../../../components/tab.driver';
import DriverPickList from './driver.pickList';
import useAxiosServices from '../../../hooks/axiosHooks';
import { codeListTypes, collectionTypes } from '../../../@types/collection.types';

const HistoryScreen = () => {
    const { axiosService } = useAxiosServices();
    const [list, setList] = useState<collectionTypes[]>([]);
    useEffect(() => {
        const un = navigation.addListener('focus', async () => {
            await getFetch();
        });
        return un;
    }, []);
    const getFetch = async () => {
        try {
            const api = await axiosService.post('/pick/driver/history');
            const { status, list } = api.data;
            if (status) {
                setList([...list]);
            }
        } catch (e) {}
    };

    const navigation = useNavigation();
    return (
        <Box safeArea p={4} flex={1}>
            <HeaderOnlyBack navigation={navigation} backOption={true} />
            <Box px={4} flex={1}>
                <Text mt={4} fontWeight={700} fontSize={'32px'} fontFamily={'Arch'}>
                    History
                </Text>
                <Box flex={1} mt={4}>
                    <DriverPickList list={list} />
                </Box>
                <Box
                    alignSelf={'center'}
                    justifyItems={'center'}
                    bg={'#00ff0000'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    bottom={5}
                    position={'absolute'}
                    p={6}
                >
                    <Button
                        _disabled={{ bg: 'gray.100' }}
                        width={'100%'}
                        variant={'basicButton'}
                        bg={'blue.200'}
                        onPress={() => getFetch()}
                    >
                        <Text fontSize={'18px'} fontWeight={100} fontFamily={'Arch'} color={'white.100'}>
                            More
                        </Text>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default HistoryScreen;
