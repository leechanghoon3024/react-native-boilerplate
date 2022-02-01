import React, { useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DepotParamList } from '../../../@types/navigationTypes';
import { Box, Image, Pressable, Text, VStack } from 'native-base';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { TouchableOpacity } from 'react-native-gesture-handler';

const arrow = require('../../../assets/icons/back-gray.png');
const whiteArrow = require('../../../assets/icons/back-white.png');
const BagScanScreen = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const route = useRoute<RouteProp<DepotParamList, 'BagScanScreen'>>();
    const code = route.params?.code ?? 'AAA0001';
    const navigation = useNavigation();
    const [list, seList] = useState([{ code }]);

    return (
        <Box flex={1}>
            <Box bg={'blue.100'}>
                <Box safeArea p={2}>
                    <Box mt={2} px={6} pl={3} w={'100%'}>
                        <Box flexDirection={'row'} justifyContent={'space-between'}>
                            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
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
            <Box p={2} px={4} alignItems={'flex-end'}>
                <Text fontWeight={400} fontSize={'16px'} fontFamily={'Arch'} color={'black.100'}>
                    {`${list.length} Result`}
                </Text>
            </Box>
            <VStack>
                {list.map((v, i) => (
                    <Pressable flexDirection={'row'} p={2} px={4} justifyContent={'space-between'} alignItems={'center'}>
                        <Box m={3}>
                            <Text fontWeight={700} fontSize={'16px'} fontFamily={'Arch'} color={'blue.100'}>
                                {`Bag Number`}
                            </Text>
                            <Text fontWeight={700} fontSize={'18px'} fontFamily={'Arch'} color={'black.100'}>
                                {`${v.code}`}
                            </Text>
                        </Box>
                        <Box>
                            <TouchableOpacity onPress={() => navigation.navigate('ScanDetail', { code: v.code })}>
                                <Image source={arrow} alt={'arrow'} />
                            </TouchableOpacity>
                        </Box>
                    </Pressable>
                ))}
            </VStack>
        </Box>
    );
};

export default BagScanScreen;
