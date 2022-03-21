import React, { useState } from 'react';
import { Box, Button, Center, Text, TextArea } from 'native-base';
import useAxiosServices from '../../hooks/axiosHooks';
import { useNavigation } from '@react-navigation/native';
import HeaderBack from '../header/header.back';
import { Ar17M, Ar17R, Ar22M, Ar36B } from '../../themes/font.style';
import LinearGradient from 'react-native-linear-gradient';
import ModalWrapper from '../commons/modal/modal.wrapper';

const Check = require('../../assets/icons/checked.png');

const FeedPage = () => {
    const { axiosService } = useAxiosServices();
    const naviagtion = useNavigation();
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const submit = async () => {
        if (text.length > 500) {
            return;
        }
        const api = await axiosService.post('users/feed/add', { text });
        const { status } = api.data;
        if (status) {
            setOpen(true);
        }
    };

    return (
        <>
            <Box flex={1} bg={'white.100'} safeAreaTop px={'20px'} pt={'20px'}>
                <HeaderBack navigation={naviagtion} noClose={true} />
                <Box mt={'70px'}>
                    <Text {...Ar36B} color={'blue.200'}>
                        How it works?
                    </Text>
                    <Text mt={'10px'} {...Ar17R} color={'gray.200'} mr={'0px'}>
                        Please let us know if you have any feedback or suggestions.
                    </Text>
                </Box>
                <Box
                    mt={'40px'}
                    justifyContent={'flex-start'}
                    width={'100%'}
                    borderWidth={1}
                    borderRadius={18}
                    borderColor={text.length > 500 ? 'red.100' : 'black.100'}
                    px={2}
                >
                    <TextArea
                        fontSize={'14px'}
                        placeholder={''}
                        h={40}
                        backgroundColor={'#00ff0000'}
                        value={text}
                        borderWidth={0}
                        isFullWidth
                        width={'100%'}
                        size="lg"
                        onChangeText={setText}
                    />
                    <Box pb={'14px'} pl={'20px'}>
                        <Text {...Ar17M} color={'gray.200'}>
                            {`${text.length}/500 Characters`}
                        </Text>
                    </Box>
                </Box>
                <Center
                    zIndex={11}
                    alignSelf={'center'}
                    backgroundColor={'red.100'}
                    w={'358px'}
                    maxW={'400px'}
                    m={2}
                    px={4}
                    height={'50px'}
                    bg={'#00ff0000'}
                    p={2}
                    mt={'40px'}
                >
                    <Button zIndex={30} onPress={() => submit()} colorScheme={'blue.200'} variant={'basicButton'} shadow={8}>
                        <Text {...Ar22M} color={'white.100'}>
                            Submit
                        </Text>
                    </Button>
                </Center>
            </Box>
            <ModalWrapper
                open={open}
                image={Check}
                title={'Great!'}
                content={'Thank you for your feedback.\n' + 'your feedback will help us create a better experience'}
                onClose={() => setOpen(false)}
                onHandler={[{ text: 'Got it!', onPress: () => naviagtion.goBack(), color: 'blue.200' }]}
            />
        </>
    );
};

export default FeedPage;
