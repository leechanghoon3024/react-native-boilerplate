import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Center, Text } from 'native-base';
import { Alert } from 'react-native';
import MainHeader from '../header/header.main';
import TableDriver from '../commons/table.driver';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { UserParamList } from '../../@types/navigationTypes';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import SelectAccountSheet from '../../components/bottomSheet/selectAccount.sheet';
import PickSheet from '../../components/bottomSheet/pick.sheet';
import useAxiosServices from '../../hooks/axiosHooks';
import { collectionTypes } from '../../@types/collection.types';
import polyline from '@mapbox/polyline';
import Geolocation from 'react-native-geolocation-service';

interface Props {
    idx: number;
}
const pin = require('../../assets/icons/address-pin.png');
const DriverMap = ({ idx }: Props) => {
    const navigation = useNavigation();
    const mapRef = useRef<MapView>(null);
    const { axiosService } = useAxiosServices();
    const [sheetOpen, setSheetOpen] = useState(false);
    const [list, setList] = useState<collectionTypes[]>([]);
    const [line, setLine] = useState([]);

    const [location, setLocation] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    });

    useEffect(() => {
        getGeo();
    }, []);

    const getGeo = async () => {
        await Geolocation.requestAuthorization('whenInUse');
        await Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({
                    latitude,
                    longitude,
                });
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    useEffect(() => {
        getData();
    }, [idx]);

    const getData = async () => {
        try {
            const api = await axiosService.post('/pick/driver/route/detail', { idx });
            const { status, pickList } = api.data;
            const poly = api.data.polyline;
            if (status) {
                setLine(polyline.decode(poly).map(([lat, lng], i) => ({ latitude: lat * 0.1, longitude: lng * 0.1 })));
                setList([...pickList]);
                if (pickList.length > 0) {
                    mapRef.current?.animateToRegion({
                        latitude: pickList[0].lat,
                        longitude: pickList[0].lot,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                }
            }
        } catch (e) {}
    };
    const modifyData = async () => {
        try {
            const api = await axiosService.post('/pick/driver/route/opti', { idx, lat: location.latitude, lot: location.longitude });
            const { status, data } = api.data;
            const poly = api.data.polyline;
            console.log(api.data);
            if (status) {
                setLine(polyline.decode(poly).map(([lat, lng], i) => ({ latitude: lat * 0.1, longitude: lng * 0.1 })));
                setList([...data]);
                if (data.length > 0) {
                    mapRef.current?.animateToRegion({
                        latitude: data[0].lat,
                        longitude: data[0].lot,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const openOpti = async () => {
        Alert.alert('Optimization', 'Do you want to optimize it based on your current location?', [
            { text: 'OK', onPress: () => modifyData() },
            { text: 'Cancel' },
        ]);
    };
    return (
        <>
            <Box flex={1} my={2}>
                <Box h={'100%'}>
                    {list.length > 0 && (
                        <MapView
                            ref={mapRef}
                            style={{ flex: 1 }}
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            // onRegionChange={(region) => {
                            //     setLocation({
                            //         latitude: region.latitude,
                            //         longitude: region.longitude,
                            //     });
                            // }}
                            // onRegionChangeComplete={(region) => {
                            //     setLocation({
                            //         latitude: region.latitude,
                            //         longitude: region.longitude,
                            //     });
                            // }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                }}
                                title={`Your location`}
                                description=""
                            />
                            {list.map((v, i) => (
                                <Marker
                                    coordinate={{
                                        latitude: v.lat,
                                        longitude: v.lot,
                                    }}
                                    title={`${v.address}`}
                                    description=""
                                    image={pin}
                                />
                            ))}

                            <Polyline coordinates={line} strokeColor={'#1C6EBA'} strokeWidth={2} />
                        </MapView>
                    )}
                </Box>
                <Box mt={10} position={'absolute'} bottom={5} w={'100%'} justifyContent={'center'} alignItems={'center'}>
                    <Button onPress={() => openOpti()} bg={'blue.200'} width={'320px'} variant={'basicButton'}>
                        <Text fontSize={'18'} fontFamily={'Arch'} fontWeight={700} color={'white.100'}>
                            Route Optimize
                        </Text>
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default DriverMap;
