import React, { useEffect, useRef } from 'react';
import { Box, Button, Text } from 'native-base';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

interface Props {
    marker: { lat: number; lot: number }[];
}

const GoogleMarker = ({ marker }: Props) => {
    const mapRef = useRef<MapView>(null);
    console.log(marker);

    useEffect(() => {
        mapChnage();
    }, [marker]);

    const mapChnage = () => {
        const latitude = marker[0].lat;
        const longitude = marker[0].lot;
        mapRef.current?.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    };

    if (marker.length > 0) {
        return (
            <>
                <Box flex={1} my={2}>
                    <Box h={'100%'}>
                        <MapView
                            ref={mapRef}
                            style={{ flex: 1 }}
                            provider={PROVIDER_GOOGLE}
                            minZoomLevel={15}
                            maxZoomLevel={16}
                            zoomControlEnabled={false}
                            zoomTapEnabled={false}
                            rotateEnabled={false}
                            scrollEnabled={false}
                            pitchEnabled={false}
                            loadingEnabled={true}
                            toolbarEnabled={false}
                            initialRegion={{
                                latitude: marker[0].lat,
                                longitude: marker[0].lot,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            // initialCamera={{
                            //     altitude: 0,
                            //     center: {
                            //         latitude: marker[0].lat,
                            //         longitude: marker[0].lot,
                            //     },
                            //     pitch: 0,
                            //     heading: 0,
                            //     zoom: 15,
                            // }}
                            // camera={{
                            //     altitude: 0,
                            //     center: {
                            //         latitude: marker[0].lat,
                            //         longitude: marker[0].lot,
                            //     },
                            //     pitch: 0,
                            //     heading: 0,
                            //     zoom: 15,
                            // }}
                        >
                            {marker.map(({ lat, lot }) => (
                                <Marker coordinate={{ latitude: lat, longitude: lot }} title="Here" description="" />
                            ))}
                        </MapView>
                    </Box>
                </Box>
            </>
        );
    } else {
        return <Text>Loading</Text>;
    }
};
export default GoogleMarker;
