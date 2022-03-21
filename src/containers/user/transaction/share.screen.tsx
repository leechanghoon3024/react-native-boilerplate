import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { collectionTypes } from '../../../@types/collection.types';
import useAxiosServices from '../../../hooks/axiosHooks';
import { ArrowUpIcon, Box, Button, CheckIcon, HStack, Pressable, ScrollView, Select, Text } from 'native-base';
import HeaderOnlyBack from '../../header/header.onBack';
import TableDashboard from '../../commons/table.dashboard';
import TableTrans from '../../commons/table.trans';
import { TransactionListTypes } from '../../../@types/transaction.types';
import { Ar15B, Ar15R, Ar17R, Ar18SbBlack, Ar22M, Ar36B } from '../../../themes/font.style';
import DefaultHeader from '../../header/header.default';
import ArrowDown from '../../../assets/icons/arrow.down';
import ArrowUp from '../../../assets/icons/arrow.up';
import SortDropDown from '../../../components/dropdown/sort.dropdown';
import { TransactionSortCase } from '../../../etc/bookStatusCase';
import ShareText from '../../../assets/icons/share.text';
import ShareFeed from '../../../assets/icons/share.feed';
import ShareLink from '../../../assets/icons/share.link';
import ShareMore from '../../../assets/icons/share.more';
import { Linking, Platform, StatusBar } from 'react-native';
import Share from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const typeSwitch = (type) => {
    switch (type) {
        case 0:
            return ['com.apple.mobilenotes.PostToFacebook', 'com.apple.reminders.RemindersEditorExtension'];
        case 1:
            return ['com.apple.reminders.RemindersEditorExtension'];
        case 2:
            return ['com.apple.mobilenotes.PostToFacebook'];
        case 3:
            return ['com.apple.mobilenotes.PostToFacebook'];
    }
};

const ShareScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState<TransactionListTypes[]>([]);
    const { axiosService } = useAxiosServices();
    const [sort, setSort] = useState('1');
    const { user } = useSelector((state: RootState) => state.auth);

    const [copyLink, setCopyLink] = useState('');
    const [moreLink, setMoreLink] = useState('');
    const [textLink, setTextLink] = useState('');
    const [feedLink, setFeedLink] = useState('');

    const getAddress = async () => {
        const api = await axiosService.post('/statistics/setting/get');
        const { status, data } = api.data;
        if (status) {
            console.log(data);
            const { copyLink, feedLink, moreLink, textLink } = data;

            setCopyLink(copyLink);
            setFeedLink(feedLink);
            setTextLink(textLink);
            setMoreLink(moreLink);
        }
    };

    useEffect(() => {
        getAddress();
    }, []);
    const shareMessage = (text, type) => {
        //Here is the Share API
    };

    const shareFaceBook = async () => {
        const shareOptions = {
            social: Share.Social.FACEBOOK,
            message: feedLink,
            url: feedLink,
        };
        try {
            const ShareResponse = await Share.shareSingle(shareOptions);
            console.log(ShareResponse);
            await shareData(2);
        } catch (error) {
            console.log('Error =>', error);
        }
    };

    const shareSMS = async () => {
        const Divider = Platform.OS === 'ios' ? '&' : '?';
        const openUrl = `sms:${''}${Divider}body=${textLink}`;
        try {
            const ShareResponse = await Linking.openURL(openUrl);
            await shareData(1);
            console.log(ShareResponse);
        } catch (error) {
            console.log('Error =>', error);
        }
    };

    const shareData = async (type) => {
        try {
            const api = await axiosService.post('/statistics/share/add', { userIdx: user?.idx, type });
            const { status } = api.data;
            if (status) {
                console.log(status);
            }
        } catch (e) {}
    };

    const copyToClipboard = async () => {
        Clipboard.setString(copyLink);
        await shareData(3);
        Toast.show({
            type: 'info',
            text1: 'Copied!',
        });
    };

    const shareMore = async () => {
        const options = {
            title: 'Recan',
            message: moreLink,
        };

        try {
            await Share.open(options);
            await shareData(4);
        } catch (error) {
            console.log('Error =>', error);
        }
    };

    const shareContent = [
        { title: 'Text', onPress: shareSMS, type: 0, icon: <ShareText />, color: '#66D073' },
        { title: 'Feed', onPress: shareFaceBook, type: 1, icon: <ShareFeed />, color: '#1C6EBA' },
        { title: 'Copy Link', onPress: copyToClipboard, type: 2, icon: <ShareLink />, color: '#16A6DA' },
        { title: 'More', onPress: shareMore, type: 3, icon: <ShareMore />, color: '#A6A6A6' },
    ];

    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <DefaultHeader navigation={navigation} bg={'white.100'} />
            <Box safeAreaBottom p={2} px={4} flex={1} bg={'white.100'}>
                <Box p={2} />
                <Text mx={4} mb={0} mt={4} {...Ar36B} color={'blue.300'}>
                    Share RECAN
                </Text>
                <Text mx={4} mt={'-10px'} {...Ar36B} color={'blue.300'}>
                    with your friends
                </Text>
                <Text mx={4} {...Ar17R} color={'gray.200'}>
                    Invite your friends to join RECAN
                </Text>
                <HStack mx={4} mt={'48px'} space={'15px'}>
                    {shareContent.map((v) => (
                        <Pressable onPress={() => v.onPress()}>
                            <Box alignItems={'center'} justifyContent={'center'}>
                                <Box
                                    mb={'7px'}
                                    borderRadius={100}
                                    bg={v.color}
                                    w={'64px'}
                                    h={'64px'}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                >
                                    {v.icon}
                                </Box>
                                <Text {...Ar15R} color={'gray.300'}>
                                    {v.title}
                                </Text>
                            </Box>
                        </Pressable>
                    ))}
                </HStack>
            </Box>
        </>
    );
};
export default ShareScreen;
