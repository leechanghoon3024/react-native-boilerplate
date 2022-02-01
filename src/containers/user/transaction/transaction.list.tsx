import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { collectionTypes } from '../../../@types/collection.types';
import useAxiosServices from '../../../hooks/axiosHooks';
import { Box, Button, ScrollView, Text } from 'native-base';
import HeaderOnlyBack from '../../header/header.onBack';
import TableDashboard from '../../commons/table.dashboard';
import TableTrans from '../../commons/table.trans';
import { TransactionListTypes } from '../../../@types/transaction.types';

const TransActionList = () => {
    const navigation = useNavigation();
    const [data, setData] = useState<TransactionListTypes[]>([]);
    const { axiosService } = useAxiosServices();

    useEffect(() => {
        const un = navigation.addListener('focus', async () => {
            await getList();
        });
        return un;
    }, [navigation]);
    const getList = async () => {
        try {
            const api = await axiosService.post('/transaction/user/list', { option: '1', skip: 0, take: 10 });
            const { status, list } = api.data;
            console.log(api.data);
            if (list && list.length > 0) {
                setData([...list]);
            }
        } catch (e) {
            console.log('error', e);
        }
    };
    return (
        <Box safeArea p={2} flex={1}>
            <Box p={2}>
                <HeaderOnlyBack navigation={navigation} optional={true} />
            </Box>
            <Text mx={2} mt={4} fontWeight={700} fontSize={'32px'} fontFamily={'Arch'}>
                Transactions
            </Text>
            <ScrollView flex={1} width={'100%'}>
                <TableTrans list={data} />
            </ScrollView>
            <Box flexDirection={'row'} w={'100%'} justifyContent={'space-between'} p={6}>
                <Button _disabled={{ bg: 'gray.100' }} width={'100%'} variant={'basicButton'} bg={'blue.200'} onPress={() => getList()}>
                    <Text fontSize={'18px'} fontWeight={100} fontFamily={'Arch'} color={'white.100'}>
                        Load more
                    </Text>
                </Button>
            </Box>
        </Box>
    );
};
export default TransActionList;
