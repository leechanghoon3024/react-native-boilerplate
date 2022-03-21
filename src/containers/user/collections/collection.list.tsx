import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import useAxiosServices from '../../../hooks/axiosHooks';
import { collectionTypes } from '../../../@types/collection.types';
import { Box, Button, CheckIcon, Select, StatusBar, Text } from 'native-base';
import HeaderOnlyBack from '../../header/header.onBack';
import TableDashboard from '../../commons/table.dashboard';
import HeaderBack from '../../header/header.back';
import DefaultHeader from '../../header/header.default';
import { Ar14Sb, Ar15B, Ar18SbBlack, Ar22M } from '../../../themes/font.style';
import ArrowDown from '../../../assets/icons/arrow.down';
import ArrowUp from '../../../assets/icons/arrow.up';
import SortDropDown from '../../../components/dropdown/sort.dropdown';
import { TransactionSortCase } from '../../../etc/bookStatusCase';

const CollectionList = () => {
    const navigation = useNavigation();
    const [list, setList] = useState<collectionTypes[]>([]);
    const { axiosService } = useAxiosServices();
    const [refresh, setRefresh] = useState(false);
    const [sort, setSort] = useState('1');
    useEffect(() => {
        getList();
        const un = navigation.addListener('focus', async () => {
            await getList();
        });
        return un;
    }, [navigation, sort]);

    const getList = async () => {
        try {
            const api = await axiosService.post('/pick/app/list', { sort });
            const { status, list } = api.data;
            console.log(list);
            if (status) {
                setList([...list]);
            }
        } catch (e) {
            console.log('error', e);
        } finally {
            setRefresh(false);
        }
    };

    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <DefaultHeader navigation={navigation} bg={'white.100'} />
            <Box flex={1} safeAreaBottom px={'38px'} bg={'white.100'}>
                <Box p={2}>
                    <Text mt={4} fontWeight={700} fontSize={'32px'} fontFamily={'Arch'}>
                        Collection
                    </Text>
                </Box>
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

                <Box flex={1}>
                    <TableDashboard list={list} refreshing={refresh} onRefresh={getList} />
                </Box>
                <Box flexDirection={'row'} w={'100%'} justifyContent={'center'}>
                    <Button
                        width={'358px'}
                        _disabled={{ bg: 'gray.100' }}
                        shadow={8}
                        variant={'basicButton'}
                        bg={'blue.200'}
                        onPress={() => getList()}
                    >
                        <Text {...Ar22M} color={'white.100'}>
                            Load more
                        </Text>
                    </Button>
                </Box>
            </Box>
        </>
    );
};
export default CollectionList;
