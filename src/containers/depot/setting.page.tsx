import React from 'react';
import { ImageBackground } from 'react-native';
import { VStack, Text, Box, Image, Pressable } from 'native-base';
import { DepotStackParamList, DriverStackParamList } from '../../@types/navigationTypes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { logoutAction } from '../../store/authReducer';

const qrIcon = require('../../assets/depot/depot_qr_icon.png');
const idIcon = require('../../assets/depot/id_depot_icon.png');
const listIcon = require('../../assets/depot/list_depot_icon.png');
const setting = require('../../assets/depot/settings_depot_icon.png');
const rightArrow = require('../../assets/icons/back-gray.png');
const whiteArrow = require('../../assets/icons/back-white.png');
const SettingPage = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    return (
        <Box flex={1}>
            <Box bg={'blue.100'}>
                <Box safeArea p={2}>
                    <Box mt={2} px={6} pl={3} w={'100%'}>
                        <Box flexDirection={'row'} justifyContent={'space-between'}>
                            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen' as never)}>
                                <Image source={whiteArrow} alt={'whiteArrow'} />
                            </TouchableOpacity>
                            <Text fontWeight={700} fontSize={'22px'} fontFamily={'Arch'} color={'white.100'}>
                                {`${user?.userFirstName} Depot`}
                            </Text>
                        </Box>
                        <Text alignSelf={'flex-end'} fontWeight={700} fontSize={'30px'} fontFamily={'Arch'} color={'white.100'}>
                            {`ID: ${user?.userName}`}
                        </Text>
                    </Box>
                </Box>
            </Box>
            <VStack>
                <Box flexWrap={'wrap'} flexDirection={'row'} p={2}>
                    <Pressable
                        onPress={() => dispatch(logoutAction())}
                        _pressed={{ opacity: 0.5 }}
                        m={2}
                        borderRadius={18}
                        borderColor={'gray.200'}
                        borderBottomWidth={1}
                        w={['95%', '50%', '48%']}
                        h={['100px', 'auto']}
                        p={6}
                        flexDirection={['row']}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >
                        <Box>
                            <Text fontWeight={700} fontSize={['18px', '30px']} fontFamily={'Arch'} color={'black.100'}>
                                SignOut
                            </Text>
                        </Box>
                        <Box>
                            <Image source={rightArrow} alt={'rightArrow'} />
                        </Box>
                    </Pressable>
                </Box>
            </VStack>
        </Box>
    );
};

export default SettingPage;
