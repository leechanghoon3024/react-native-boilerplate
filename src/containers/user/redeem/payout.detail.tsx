import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Divider, Image, Input, Pressable, Text, useToast } from 'native-base';
import HeaderOnlyBack from '../../header/header.onBack';
import { Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { SceneMap, TabView } from 'react-native-tab-view';
import CharityList from './charity.list';
import RedeemCard2 from './redeem.card2';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useAxiosServices from '../../../hooks/axiosHooks';
import { loadingAction } from '../../../store/commonReducer';
import { creditChange, logoutAction } from '../../../store/authReducer';
const sampleImage = require('../../../assets/sample-image.png');
const sampleImage2 = require('../../../assets/sample2.png');
const checked = require('../../../assets/icons/checked.png');
const sampleData = [
    { title: 'Bottles for Brushies', image: sampleImage, subTitle: 'Queensland Trust for Nature' },
    { title: 'Bottles for Brushies', image: sampleImage, subTitle: 'Queensland Trust for Nature' },
    { title: 'Bottles for Brushies', image: sampleImage, subTitle: 'Queensland Trust for Nature' },
];

const sampleData2 = [{ title: 'Bottles for Brushies', image: sampleImage2, subTitle: 'Queensland Trust for Nature' }];
const voucher = require('../../../assets/icons/voucher-icon.png');
const PayoutDetail = () => {
    const dispatch = useDispatch();
    const { axiosService } = useAxiosServices();
    const toast = useToast();
    const navigation = useNavigation();
    const user = useSelector((state: RootState) => state.auth.user);
    const credit = user?.credit ?? 0;
    const [error, setError] = useState(false);
    const [input, setInput] = useState('0');

    const inputHandler = (text) => {
        const change = text.replace(/(^0+)/, '');
        const c = change.replace(/[^0-9]/g, '');
        if (Number(c) > credit) {
            setError(true);
        } else {
            setError(false);
        }
        setInput(c);
    };
    const payout = async () => {
        if (input === '0' && error) {
            toast.show({
                placement: 'top',
                description: 'Complete',
                render: () => {
                    return (
                        <Box justifyContent={'center'} alignContent={'center'} w={'200px'} bg="red.100" px="2" py="2" rounded="sm" mb={5}>
                            <Text color={'white.100'} textAlign={'center'}>
                                Error, Check payout
                            </Text>
                        </Box>
                    );
                },
            });
            return;
        }
        if (user?.payType === 0) {
            const numberInput = Number(input);
            console.log(numberInput % 5 !== 0);
            if (numberInput % 5 !== 0) {
                toast.show({
                    placement: 'top',
                    description: 'Complete',
                    render: () => {
                        return (
                            <Box
                                justifyContent={'center'}
                                alignContent={'center'}
                                w={'200px'}
                                bg="red.100"
                                px="2"
                                py="2"
                                rounded="sm"
                                mb={5}
                            >
                                <Text color={'white.100'} textAlign={'center'}>
                                    Gift Pay can be paid in units of 5$.
                                </Text>
                            </Box>
                        );
                    },
                });
            }
        }
        try {
            const api = await axiosService.post('/transaction/payout', { type: user?.payType, amount: Number(input) });
            const { status, data, message } = api.data;
            if (status) {
                dispatch(creditChange({ credit: data }));
                toast.show({
                    placement: 'top',
                    description: 'Complete',
                    render: () => {
                        return (
                            <Box
                                justifyContent={'center'}
                                alignContent={'center'}
                                w={'200px'}
                                bg="blue.200"
                                px="2"
                                py="2"
                                rounded="sm"
                                mb={5}
                            >
                                <Text color={'white.100'} textAlign={'center'}>
                                    {message}
                                </Text>
                            </Box>
                        );
                    },
                });
                navigation.goBack();
            } else {
                toast.show({
                    placement: 'top',
                    description: 'Complete',
                    render: () => {
                        return (
                            <Box
                                justifyContent={'center'}
                                alignContent={'center'}
                                w={'200px'}
                                bg="red.100"
                                px="2"
                                py="2"
                                rounded="sm"
                                mb={5}
                            >
                                <Text color={'white.100'} textAlign={'center'}>
                                    {message}
                                </Text>
                            </Box>
                        );
                    },
                });
            }
        } catch (e) {
            toast.show({
                placement: 'top',
                description: 'Complete',
                render: () => {
                    return (
                        <Box justifyContent={'center'} alignContent={'center'} w={'200px'} bg="red.100" px="2" py="2" rounded="sm" mb={5}>
                            <Text color={'white.100'} textAlign={'center'}>
                                Error
                            </Text>
                        </Box>
                    );
                },
            });
        }
    };

    return (
        <Box flex={1}>
            <Box bg={'blue.200'}>
                <Box safeArea p={2}>
                    <HeaderOnlyBack navigation={navigation} />
                    <Box mt={8} flexDirection={'row'} px={6} w={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                        <Text fontWeight={700} fontSize={'30px'} fontFamily={'Arch'} color={'white.100'}>
                            Payout
                        </Text>
                    </Box>
                </Box>
            </Box>
            <KeyboardAwareScrollView keyboardDismissMode={'interactive'}>
                <Box flex={1} p={4}>
                    <Box justifyContent={'center'} alignItems={'center'}>
                        <Box justifyContent={'center'} alignItems={'center'}>
                            <Text fontWeight={400} fontSize={'12px'} fontFamily={'Lato'} color={'black.100'}>
                                Credit Balance
                            </Text>
                            <Text fontWeight={500} fontSize={'30px'} fontFamily={'Lato'} color={'black.100'}>
                                ${`${user?.credit}`}
                            </Text>
                        </Box>
                    </Box>
                    <Box my={10} justifyContent={'center'} alignItems={'center'}>
                        <Box flexDirection={'row'} alignItems={'center'}>
                            <Text fontWeight={500} fontSize={'40px'} fontFamily={'Lato'} color={'blue.100'}>
                                $
                            </Text>
                            <Input
                                placeholder={'0'}
                                color={'blue.100'}
                                borderWidth={0}
                                fontSize={'40px'}
                                onChangeText={(text) => inputHandler(text)}
                                value={input}
                                keyboardType={'numeric'}
                            />
                        </Box>

                        {error && (
                            <Text fontWeight={500} fontSize={'10px'} fontFamily={'Lato'} color={'red.100'}>
                                Sorry, you don't have enough credit
                            </Text>
                        )}
                    </Box>
                    <Divider my={2} bg={'blue.200'} />
                    <RedeemCard2 type={user?.payType} navigation={navigation} />
                </Box>
            </KeyboardAwareScrollView>

            <Box flexDirection={'row'} w={'100%'} justifyContent={'space-between'} p={6}>
                <Button _disabled={{ bg: 'gray.100' }} width={'100%'} variant={'basicButton'} bg={'blue.200'} onPress={() => payout()}>
                    <Text fontSize={'18px'} fontWeight={100} fontFamily={'Arch'} color={'white.100'}>
                        Redeem
                    </Text>
                </Button>
            </Box>
        </Box>
    );
};

export default PayoutDetail;
