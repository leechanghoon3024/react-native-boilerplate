import React, { useEffect } from 'react';
import { Box, Center, Pressable, Text } from 'native-base';
import { Dimensions, Animated, StatusBar } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import DashBoardReport from '../containers/user/dashBoard.report';
import TableDashboard from '../containers/commons/table.dashboard';
import { collectionTypes } from '../@types/collection.types';
import CustomeTab from './customeTab';
import { Ar16Sb } from '../themes/font.style';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
    list: collectionTypes[];
    onRefresh: () => void;
    setView: any;
    refreshing: boolean;
}

const CustomTabView = ({ list, onRefresh, refreshing, setView }: Props) => {
    const FirstRoute = () => <DashBoardReport />;

    const SecondRoute = () => <TableDashboard list={list} refreshing={refreshing} onRefresh={onRefresh} />;
    const initialLayout = { width: Dimensions.get('window').width > 400 ? 400 : Dimensions.get('window').width };

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const [index, setIndex] = React.useState(0);

    useEffect(() => {
        setView(index);
    }, [index]);

    const [routes] = React.useState([
        { key: 'first', title: 'Impact Report' },
        { key: 'second', title: 'Collections' },
    ]);
    const renderTabBar = (props: any) => {
        return (
            <TabBar
                {...props}
                style={{
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
                // @ts-ignore
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
    // <Box flexDirection="row" bg={'blue.200'} borderRadius={100}>
    //     {props.navigationState.routes.map((route: { title: React.ReactNode }, i: React.SetStateAction<number>) => {
    //         const color = index === i ? '#222' : '#fff';
    //         const bg = index === i ? 'white.100' : 'blue.200';
    //         return (
    //             <Box
    //                 bg={bg}
    //                 borderRadius={100}
    //                 borderWidth={3}
    //                 borderColor={'blue.200'}
    //                 flex={1}
    //                 alignItems="center"
    //                 p={1}
    //                 py={1}
    //                 cursor="pointer"
    //             >
    //                 <Pressable
    //                     onPress={() => {
    //                         console.log(i);
    //                         setIndex(i);
    //                     }}
    //                 >
    //                     <Text fontSize={'15px'} fontFamily={'Arch'} fontWeight={400} color={color}>
    //                         {route.title}
    //                     </Text>
    //                 </Pressable>
    //             </Box>
    //         );
    //     })}
    // </Box>
    return (
        <>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                style={{ paddingTop: 1, marginHorizontal: 20 }}
            />
        </>
    );
};

export default CustomTabView;
