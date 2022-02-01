import React, { useEffect, useState } from 'react';
import { VStack, Box, HStack, Text, ScrollView } from 'native-base';
import { Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DetailSheet from '../../components/bottomSheet/detail.sheet';
import { collectionTypes } from '../../@types/collection.types';
import useAxiosServices from '../../hooks/axiosHooks';
import DriverPickList from './pick/driver.pickList';
const { width, height } = Dimensions.get('window');

interface Props {
    idx: number;
    navigation: any;
}

const InMapList = ({ navigation, idx }: Props) => {
    const [sheetOpen, setSheetOpen] = useState(false);
    const [list, setList] = useState<collectionTypes[]>([]);
    const { axiosService } = useAxiosServices();
    useEffect(() => {
        getData();
    }, [idx]);

    const getData = async () => {
        try {
            const api = await axiosService.post('/pick/driver/route/detail', { idx });
            const { status, pickList } = api.data;
            if (status) {
                setList([...pickList]);
            }
        } catch (e) {}
    };

    return <DriverPickList list={list} />;
};

export default InMapList;
