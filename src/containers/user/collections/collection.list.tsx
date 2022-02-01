import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAxiosServices from '../../../hooks/axiosHooks';
import { collectionTypes } from '../../../@types/collection.types';
import { Box, Text } from 'native-base';
import HeaderOnlyBack from '../../header/header.onBack';
import TableDashboard from '../../commons/table.dashboard';

const CollectionList = () => {
    const navigation = useNavigation();
    const [list, setList] = useState<collectionTypes[]>([]);
    const { axiosService } = useAxiosServices();

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
        <Box safeArea p={2}>
            <Box p={2}>
                <HeaderOnlyBack navigation={navigation} optional={true} />
                <Text mt={4} fontWeight={700} fontSize={'32px'} fontFamily={'Arch'}>
                    Collection
                </Text>
            </Box>
            <TableDashboard list={list} />
        </Box>
    );
};
export default CollectionList;
