import React from 'react';
import { Box, Button, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import HeaderOnlyBack from '../../header/header.onBack';
import TabDriver from '../../../components/tab.driver';

const DriverPickScreen = () => {
    const navigation = useNavigation();
    return (
        <Box safeArea p={4} flex={1}>
            <HeaderOnlyBack navigation={navigation} optional={true} />
            <Text mt={4} fontWeight={700} fontSize={'32px'} fontFamily={'Arch'}>
                Collections
            </Text>

            <Box
                alignSelf={'center'}
                justifyItems={'center'}
                bg={'#00ff0000'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                bottom={5}
                position={'absolute'}
                p={6}
            >
                <Button
                    _disabled={{ bg: 'gray.100' }}
                    width={'100%'}
                    variant={'basicButton'}
                    bg={'blue.200'}
                    onPress={() => navigation.goBack()}
                >
                    <Text fontSize={'18px'} fontWeight={100} fontFamily={'Arch'} color={'white.100'}>
                        More
                    </Text>
                </Button>
            </Box>
        </Box>
    );
};

export default DriverPickScreen;
