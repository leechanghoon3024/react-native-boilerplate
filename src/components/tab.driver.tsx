import React, { useEffect } from 'react';
import { Box, Center, Pressable, Text } from 'native-base';
import { Dimensions, Animated, StatusBar } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import DashBoardReport from '../containers/user/dashBoard.report';
import TableDashboard from '../containers/commons/table.dashboard';
import TableDriver from '../containers/commons/table.driver';
import DriverPickList from '../containers/driver/pick/driver.pickList';
import { collectionTypes } from '../@types/collection.types';

interface Props {
    readyList: collectionTypes[];
    comList: collectionTypes[];
}

const TabDriver = ({ readyList, comList }: Props) => {
    const FirstRoute = () => <DriverPickList list={readyList} />;
    const SecondRoute = () => <DriverPickList list={comList} />;
    const initialLayout = { width: Dimensions.get('window').width };
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const [index, setIndex] = React.useState(0);
    const [routes, setRoute] = React.useState([
        { key: 'first', title: `Waiting (${readyList.length})` },
        { key: 'second', title: `Complete (${comList.length})` },
    ]);

    useEffect(() => {
        setRoute([
            ...[
                { key: 'first', title: `Waiting (${readyList.length})` },
                { key: 'second', title: `Complete (${comList.length})` },
            ],
        ]);
    }, [readyList, comList]);

    const renderTabBar = (props) => {
        return (
            <Box flexDirection="row" bg={'blue.200'} borderRadius={100} mb={4}>
                {props.navigationState.routes.map((route: { title: React.ReactNode }, i: React.SetStateAction<number>) => {
                    const color = index === i ? '#222' : '#fff';
                    const bg = index === i ? 'white.100' : 'blue.200';

                    return (
                        <Box
                            bg={bg}
                            borderRadius={100}
                            borderWidth={3}
                            borderColor={'blue.200'}
                            flex={1}
                            alignItems="center"
                            p="2"
                            cursor="pointer"
                        >
                            <Pressable
                                onPress={() => {
                                    console.log(i);
                                    setIndex(i);
                                }}
                            >
                                <Text fontSize={16} fontFamily={'Arch'} fontWeight={400} color={color}>
                                    {route.title}
                                </Text>
                            </Pressable>
                        </Box>
                    );
                })}
            </Box>
        );
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            style={{ paddingTop: 1, marginTop: StatusBar.currentHeight }}
        />
    );
};

export default TabDriver;
