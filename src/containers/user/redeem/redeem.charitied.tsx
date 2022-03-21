import React, { useEffect, useState } from 'react';
import { Box, Divider, Image, Pressable, Text } from 'native-base';
import HeaderOnlyBack from '../../header/header.onBack';
import { Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import CharityList from './charity.list';
import useAxiosServices from '../../../hooks/axiosHooks';
import { CharityListTypes } from '../../../@types/charity.types';
import CustomeTab from '../../../components/customeTab';
import { Ar16Sb } from '../../../themes/font.style';
const sampleImage = require('../../../assets/sample-image.png');
const sampleImage2 = require('../../../assets/sample2.png');

const sampleData = [
    { title: 'Bottles for Brushies', image: sampleImage, subTitle: 'Queensland Trust for Nature' },
    { title: 'Bottles for Brushies', image: sampleImage, subTitle: 'Queensland Trust for Nature' },
    { title: 'Bottles for Brushies', image: sampleImage, subTitle: 'Queensland Trust for Nature' },
];

const sampleData2 = [{ title: 'Bottles for Brushies', image: sampleImage2, subTitle: 'Queensland Trust for Nature' }];

const RedeemCharitied = () => {
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.auth.user);
    const FirstRoute = () => <CharityList list={myData} my={true} />;
    const SecondRoute = () => <CharityList list={data} />;
    const initialLayout = { width: Dimensions.get('window').width };
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'My Charity' },
        { key: 'second', title: 'All Charities' },
    ]);

    const { axiosService } = useAxiosServices();
    const [data, setData] = useState<CharityListTypes[]>([]);
    const [myData, setMyData] = useState<CharityListTypes[]>([]);

    useEffect(() => {
        const unscribe = navigation.addListener('focus', async () => {
            getFetch();
            getMyFetch();
        });
        return unscribe;
    }, []);

    const getFetch = async () => {
        const api = await axiosService.post('/charity/list', { option: '1', skip: 0, take: 10 });
        const { list } = api.data;
        if (list) {
            setData([...list]);
        }
    };

    const getMyFetch = async () => {
        const api = await axiosService.post('/charity/user/list', { option: '2', skip: 0, take: 10 });
        const { list } = api.data;
        console.log(list);
        if (list) {
            setMyData([...list]);
        }
    };

    const renderTabBar = (props: any) => {
        return (
            <TabBar
                {...props}
                style={{
                    marginHorizontal: 8,
                    borderRadius: 100,
                    height: 38,
                    shadowOffset: { height: 0, width: 0 },
                    shadowColor: '#1C6EBA',
                    backgroundColor: '#1C6EBA',
                }}
                tabStyle={{
                    shadowOffset: { height: 0, width: 0 },
                    shadowColor: '#1C6EBA',
                    borderWidth: 0,
                }}
                pressColor={'#1C6EBA'}
                //@ts-ignore
                renderIndicator={(props) => <CustomeTab {...props} />}
                renderLabel={({ route, focused }) => (
                    <Box flex={1} bottom={0.5}>
                        <Text {...Ar16Sb} alignSelf={'center'} color={focused ? 'gray.300' : '#fff'}>
                            {route.title}
                        </Text>
                    </Box>
                )}
            />
        );
    };

    return (
        <Box flex={1} bg={'white.100'}>
            <StatusBar barStyle={'light-content'} />
            <Box bg={'blue.200'}>
                <Box safeAreaTop p={2} pb={4}>
                    <HeaderOnlyBack navigation={navigation} />
                    <Box mt={8} flexDirection={'row'} px={6} w={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                        <Text fontWeight={700} fontSize={'30px'} fontFamily={'Lato'} color={'white.100'}>
                            Charities
                        </Text>
                        <Text fontWeight={700} fontSize={'14px'} fontFamily={'Arch'} color={'white.100'}>
                            {data.length} campaigns
                        </Text>
                    </Box>
                </Box>
            </Box>
            <Box flex={1} p={4} px={4}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                    style={{ paddingTop: 1 }}
                />
            </Box>
        </Box>
    );
};

export default RedeemCharitied;
