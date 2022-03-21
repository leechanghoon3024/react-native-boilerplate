import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { collectionTypes } from '../../../@types/collection.types';
import useAxiosServices from '../../../hooks/axiosHooks';
import { ArrowUpIcon, Box, Button, CheckIcon, ScrollView, Select, Text } from 'native-base';
import HeaderOnlyBack from '../../header/header.onBack';
import TableDashboard from '../../commons/table.dashboard';
import TableTrans from '../../commons/table.trans';
import { TransactionListTypes } from '../../../@types/transaction.types';
import { Ar15B, Ar18SbBlack, Ar22M } from '../../../themes/font.style';
import DefaultHeader from '../../header/header.default';
import ArrowDown from '../../../assets/icons/arrow.down';
import ArrowUp from '../../../assets/icons/arrow.up';
import SortDropDown from '../../../components/dropdown/sort.dropdown';
import { TransactionSortCase } from '../../../etc/bookStatusCase';
import { StatusBar } from 'react-native';

const TransActionList = () => {
    const navigation = useNavigation();
    const [data, setData] = useState<TransactionListTypes[]>([]);
    const { axiosService } = useAxiosServices();
    const [sort, setSort] = useState('1');

    useEffect(() => {
        const un = navigation.addListener('focus', async () => {
            await getList();
        });
        return un;
    }, [navigation, sort]);

    useEffect(() => {
        getList();
    }, [sort]);
    const getList = async () => {
        try {
            const api = await axiosService.post('/transaction/user/list', { sort, option: '1', skip: 0, take: 10 });
            const { status, list } = api.data;
            console.log(api.data);
            if (list && list.length > 0) {
                setData([...list]);
            }
        } catch (e) {
            console.log('error', e);
        }
    };
    console.log(sort);
    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <DefaultHeader navigation={navigation} bg={'white.100'} />
            <Box safeAreaBottom p={2} px={4} flex={1} bg={'white.100'}>
                <Box p={2} />
                <Text mx={4} mt={4} fontWeight={700} fontSize={'32px'} fontFamily={'Arch'}>
                    Transactions
                </Text>
                <Box my={4} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-end'}>
                    <Text {...Ar15B} color={'black.200'} mr={2}>
                        Sort By
                    </Text>
                    <SortDropDown
                        defaultButtonText={TransactionSortCase(sort)}
                        data={['1', '2']}
                        sortHandler={setSort}
                        switchAction={TransactionSortCase}
                    />
                </Box>

                <Box flex={1} width={'100%'}>
                    <TableTrans list={data} />
                </Box>
                {data.length > 0 && (
                    <Box flexDirection={'row'} w={'100%'} justifyContent={'space-between'} p={6}>
                        <Button
                            _disabled={{ bg: 'gray.100' }}
                            shadow={8}
                            width={'100%'}
                            variant={'basicButton'}
                            bg={'blue.200'}
                            onPress={() => getList()}
                        >
                            <Text {...Ar22M} color={'white.100'}>
                                Load more
                            </Text>
                        </Button>
                    </Box>
                )}
            </Box>
        </>
    );
};
export default TransActionList;
