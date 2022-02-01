import React, { useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DepotParamList } from '../../../@types/navigationTypes';
import { Box, Button, Image, Input, Pressable, Text, VStack } from 'native-base';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useAxiosServices from '../../../hooks/axiosHooks';
import { Alert } from 'react-native';
const whiteArrow = require('../../../assets/icons/back-white.png');
const arrow = require('../../../assets/icons/back-gray.png');
const searchIcon = require('../../../assets/icons/search.png');
const ScanFind = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const route = useRoute<RouteProp<DepotParamList, 'BagScanScreen'>>();
    const navigation = useNavigation();
    const [list, setList] = useState([{ code: '' }]);
    const [text, setText] = useState('');
    const [finding, setFinding] = useState(false);
    const [code, setCode] = useState('');
    const { axiosService } = useAxiosServices();
    const getAccept = async () => {
        try {
            const api = await axiosService.post('/pick/depot/codeCheck', { code: text });
            const { status, data } = api.data;
            if (status) {
                setFinding(true);
                setList([...[{ code: text }]]);
            } else {
                Alert.alert(data);
            }
        } catch (e) {
            console.log(e);
        }
    };

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
            <Box p={2} px={4} flexDirection={'row'} justifyContent={'space-between'}>
                <Box py={2} px={2} flexDirection={'row'} borderBottomWidth={1} borderColor={'blue.100'}>
                    <Image source={searchIcon} alt={'serac'} mr={2} />
                    <Input
                        placeholder={'Search'}
                        px={2}
                        width={'90%'}
                        borderWidth={0}
                        value={text}
                        onChangeText={setText}
                        fontWeight={400}
                        fontSize={'16px'}
                        fontFamily={'Arch'}
                        color={'black.100'}
                    />
                </Box>
            </Box>
            {finding ? (
                <>
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
                </>
            ) : (
                <Button m={2} bg={'blue.100'} onPress={() => getAccept()}>
                    <Text fontWeight={400} fontSize={'16px'} fontFamily={'Arch'} color={'white.100'}>
                        FIND
                    </Text>
                </Button>
            )}
        </Box>
    );
};

export default ScanFind;
