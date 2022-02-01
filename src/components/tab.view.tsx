import React from 'react';
import { Box, Center, Pressable, Text } from 'native-base';
import { Dimensions, Animated, StatusBar } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import DashBoardReport from '../containers/user/dashBoard.report';
import TableDashboard from '../containers/commons/table.dashboard';
import { collectionTypes } from '../@types/collection.types';

interface Props {
    list: collectionTypes[];
}

const CustomTabView = ({ list }: Props) => {
    const FirstRoute = () => <DashBoardReport />;

    const SecondRoute = () => <TableDashboard list={list} />;
    const initialLayout = { width: Dimensions.get('window').width > 400 ? 400 : Dimensions.get('window').width };
    console.log(initialLayout);
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Impact Report' },
        { key: 'second', title: 'Collections' },
    ]);
    const renderTabBar = (props) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return (
            <Box flexDirection="row" bg={'blue.200'} borderRadius={100}>
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

export default CustomTabView;
