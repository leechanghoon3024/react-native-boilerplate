import React from 'react';
import { Box, Center, Pressable, Text } from 'native-base';
import { Dimensions, Animated, StatusBar, ImageBackground } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import DriverMap from './driver.map';
import TableDriver from '../commons/table.driver';
import MainHeader from '../header/header.main';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DriverParamList, UserParamList } from '../../@types/navigationTypes';
import InMapList from './inMapList';
import HeaderOnlyBack from '../header/header.onBack';
const BackGroundImage = require('../../assets/background/background1.png');

const DriverView = () => {
    const navigation = useNavigation<NavigationProp<UserParamList>>();
    const route = useRoute<RouteProp<DriverParamList, 'DriverView'>>();
    const idx = route.params?.idx;
    const FirstRoute = () => <DriverMap idx={idx} />;
    const SecondRoute = () => <InMapList navigation={navigation} idx={idx} />;
    const initialLayout = { width: Dimensions.get('window').width };
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'MAP' },
        { key: 'second', title: 'LIST' },
    ]);
    const renderTabBar = (props) => {
        return (
            <Box mt={5} flexDirection="row" bg={'blue.200'} borderRadius={100}>
                {props.navigationState.routes.map((route: { title: React.ReactNode }, i: React.SetStateAction<number>) => {
                    const color = index === i ? '#222' : '#fff';
                    const bg = index === i ? 'white.100' : 'blue.200';
                    return (
                        <Box bg={bg} borderWidth={3} borderColor={'blue.200'} flex={1} alignItems="center" p="2" cursor="pointer">
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
        <ImageBackground source={BackGroundImage} style={{ flex: 1 }}>
            <Box safeArea flex={1} m={2}>
                <HeaderOnlyBack navigation={navigation} />
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                    style={{ marginTop: StatusBar.currentHeight }}
                />
            </Box>
        </ImageBackground>
    );
};

export default DriverView;
