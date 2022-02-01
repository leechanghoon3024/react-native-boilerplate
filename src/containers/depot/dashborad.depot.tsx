import React from 'react';
import { ImageBackground } from 'react-native';
import { VStack, Text, Box, Image, Pressable } from 'native-base';
import { DepotStackParamList, DriverStackParamList } from '../../@types/navigationTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { logoutAction } from '../../store/authReducer';

const BackGroundImage = require('../../assets/background/background1.png');
const qrIcon = require('../../assets/depot/depot_qr_icon.png');
const idIcon = require('../../assets/depot/id_depot_icon.png');
const listIcon = require('../../assets/depot/list_depot_icon.png');
const setting = require('../../assets/depot/settings_depot_icon.png');

const DashboardDepot = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    return (
        <Box flex={1}>
            <Box bg={'blue.100'}>
                <Box safeArea p={2}>
                    <Box mt={2} px={6} w={'100%'} justifyContent={'center'} alignItems={'flex-end'}>
                        <Text fontWeight={700} fontSize={'22px'} fontFamily={'Arch'} color={'white.100'}>
                            {`${user?.userFirstName} Depot`}
                        </Text>
                        <Text fontWeight={700} fontSize={'30px'} fontFamily={'Arch'} color={'white.100'}>
                            {`ID: ${user?.userName}`}
                        </Text>
                    </Box>
                </Box>
            </Box>
            <VStack>
                <Box flexWrap={'wrap'} flexDirection={'row'} p={2}>
                    <Pressable
                        onPress={() => navigation.navigate('QrScanScreen')}
                        _pressed={{ opacity: 0.5 }}
                        m={2}
                        borderRadius={18}
                        borderColor={'blue.100'}
                        borderWidth={1}
                        w={['95%', '50%', '48%']}
                        h={['100px', 'auto']}
                        p={6}
                        flexDirection={['row', 'column']}
                        alignItems={'center'}
                    >
                        <Image source={qrIcon} mb={[0, 2]} mr={[10, 0]} w={['60px', '100px']} resizeMode={'contain'} />
                        <Text fontWeight={700} fontSize={['18px', '30px']} fontFamily={'Arch'} color={'blue.100'}>
                            Scan QR code
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('ScanFind')}
                        _pressed={{ opacity: 0.5 }}
                        m={2}
                        borderRadius={18}
                        borderColor={'blue.100'}
                        borderWidth={1}
                        w={['95%', '50%', '48%']}
                        h={['100px', 'auto']}
                        p={6}
                        flexDirection={['row', 'column']}
                        alignItems={'center'}
                    >
                        <Image source={idIcon} mb={[0, 2]} mr={[10, 0]} w={['60px', '100px']} resizeMode={'contain'} />
                        <Text fontWeight={700} fontSize={['18px', '30px']} fontFamily={'Arch'} color={'blue.100'}>
                            Search ID
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => navigation.navigate('DepotList')}
                        _pressed={{ opacity: 0.5 }}
                        m={2}
                        borderRadius={18}
                        borderColor={'blue.100'}
                        borderWidth={1}
                        w={['95%', '50%', '48%']}
                        h={['100px', 'auto']}
                        p={6}
                        flexDirection={['row', 'column']}
                        alignItems={'center'}
                    >
                        <Image source={listIcon} mb={[0, 2]} mr={[10, 0]} w={['60px', '100px']} resizeMode={'contain'} />
                        <Text fontWeight={700} fontSize={['18px', '30px']} fontFamily={'Arch'} color={'blue.100'}>
                            List
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() => navigation.navigate('Setting')}
                        _pressed={{ opacity: 0.5 }}
                        m={2}
                        borderRadius={18}
                        borderColor={'blue.100'}
                        borderWidth={1}
                        w={['95%', '50%', '48%']}
                        h={['100px', 'auto']}
                        p={6}
                        flexDirection={['row', 'column']}
                        alignItems={'center'}
                    >
                        <Image source={setting} mb={[0, 2]} mr={[10, 0]} w={['60px', '100px']} resizeMode={'contain'} />
                        <Text fontWeight={700} fontSize={['18px', '30px']} fontFamily={'Arch'} color={'blue.100'}>
                            Setting
                        </Text>
                    </Pressable>
                </Box>
            </VStack>
        </Box>
    );
};

export default DashboardDepot;
