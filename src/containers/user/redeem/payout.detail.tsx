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
import { Ar14Sb, Ar17R, Ar18SbBlack, Ar36B, La17N, La31B, La56Sb } from '../../../themes/font.style';
import ErrorIcon from '../../../assets/icons/error.icon';
import Toast from 'react-native-toast-message';
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

    const inputHandler = (text: any) => {
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
            Toast.show({
                type: 'error',
                text1: '  Error, Check payout',
            });

            return;
        }
        if (user?.payType === 0) {
            const numberInput = Number(input);
            console.log(numberInput % 5 !== 0);
            if (numberInput % 5 !== 0) {
                Toast.show({
                    type: 'error',
                    text1: 'Gift Pay can be paid in units of 5$',
                });
            }
            return;
        }
        try {
            const api = await axiosService.post('/transaction/payout', { type: user?.payType, amount: Number(input) });
            const { status, data, message } = api.data;
            if (status) {
                dispatch(creditChange({ credit: data }));
                Toast.show({
                    type: 'info',
                    text1: message,
                });
                navigation.goBack();
            } else {
                Toast.show({
                    type: 'info',
                    text1: message,
                });
            }
        } catch (e) {
            toast.show({
                placement: 'bottom',
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
        <Box flex={1} bg={'white.100'}>
            <StatusBar barStyle={'light-content'} />
            <Box bg={'blue.200'}>
                <Box safeAreaTop p={2} pb={4}>
                    <HeaderOnlyBack navigation={navigation} />
                    <Box mt={8} flexDirection={'row'} px={6} w={'100%'} justifyContent={'space-between'} alignItems={'center'}>
                        <Text {...Ar36B} color={'white.100'}>
                            Payout
                        </Text>
                    </Box>
                </Box>
            </Box>
            <KeyboardAwareScrollView keyboardDismissMode={'interactive'}>
                <Box flex={1} px={'35px'} pt={'22px'}>
                    <Box justifyContent={'center'} alignItems={'center'}>
                        <Box justifyContent={'center'} alignItems={'center'}>
                            <Text {...La17N} color={'black.100'}>
                                Credit Balance
                            </Text>
                            <Text {...La31B} color={'black.100'}>
                                ${`${user?.credit}`}
                            </Text>
                        </Box>
                    </Box>
                    <Box pt={'22px'} pb={'44px'} justifyContent={'center'} alignItems={'center'}>
                        {error && (
                            <Box flexDirection={'row'} alignItems={'center'}>
                                <ErrorIcon color={'#ACACAC'} />
                                <Text ml={1} {...Ar14Sb} color={'red.100'}>
                                    Sorry, you don't have enough credit
                                </Text>
                            </Box>
                        )}
                        <Box flexDirection={'row'} alignItems={'center'}>
                            <Text {...La56Sb} color={'blue.200'}>
                                $
                            </Text>
                            <Input
                                {...La56Sb}
                                placeholder={'0'}
                                color={'blue.200'}
                                borderWidth={0}
                                onChangeText={(text) => inputHandler(text)}
                                value={input}
                                keyboardType={'numeric'}
                            />
                        </Box>
                    </Box>
                    <Divider my={2} bg={'blue.200'} />
                    <RedeemCard2 type={user?.payType as number} navigation={navigation} />
                    <Divider my={2} mb={'2px'} bg={'blue.200'} />
                    <Box my={1} alignItems={'flex-end'}>
                        <TouchableOpacity onPress={() => navigation.navigate('RedeemSelectScreen' as never)}>
                            <Text {...Ar18SbBlack} color={'blue.200'}>
                                EDIT
                            </Text>
                        </TouchableOpacity>
                    </Box>
                    <Box mt={'40px'} alignItems={'flex-end'} right={2}>
                        <Text {...Ar17R} color={'gray.200'} textAlign={'center'}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua.
                        </Text>
                    </Box>
                </Box>
                <Box mb={'200px'} />
            </KeyboardAwareScrollView>

            <Box flexDirection={'row'} w={'100%'} justifyContent={'center'} px={'35px'} bottom={'40px'}>
                <Button
                    shadow={6}
                    _disabled={{ bg: 'gray.100' }}
                    width={'358px'}
                    variant={'basicButton'}
                    bg={'blue.200'}
                    onPress={() => payout()}
                >
                    <Text fontSize={'18px'} fontWeight={100} fontFamily={'Arch'} color={'white.100'}>
                        Redeem
                    </Text>
                </Button>
            </Box>
        </Box>
    );
};

export default PayoutDetail;
