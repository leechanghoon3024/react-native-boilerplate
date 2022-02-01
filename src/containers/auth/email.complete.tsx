import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Box, Button, Flex, Image, ScrollView, Text, useToast } from 'native-base';
import DefaultHeader from '../header/header.default';
import { AuthParamList } from '../../@types/navigationTypes';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LogoScreen from '../LogoScreen';
const Logo = require('../../assets/logo/recan-colour-logo.png');
const Checked = require('../../assets/icons/checked.png');
const EmailComplete = () => {
    const toast = useToast();
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<AuthParamList, 'EmailValidate'>>();
    const [code, setCode] = useState('');
    const [fulfilled, setFulfilled] = useState(false);
    const verifyCode = route.params?.verifyCode;

    const codeHandler = (codeInput) => {
        console.log(code);
        setCode(codeInput);
    };

    const verifyHandler = () => {
        setFulfilled(code.length === 6);
    };

    const goToVerify = () => {
        if (verifyCode === code) {
            toast.show({
                title: 'Please check the code.',
                placement: 'top',
            });
        } else {
        }
    };

    useEffect(() => {
        verifyHandler();
    }, [code]);

    return (
        <Box alignItems={'center'} bg={'white.100'} px={5} safeArea flexGrow={1} justifyContent={'space-between'}>
            <Image mt={6} source={Logo} alt="Alternate Text" width={123} height={34} />
            <ScrollView>
                <Box my={10} pt={10} alignItems={'center'} justifyContent={'center'}>
                    <Image source={Checked} alt="Alternate Text" width={170} height={170} />
                </Box>
                <Box my={10} alignItems={'center'} justifyContent={'center'}>
                    <Text mb={3} fontFamily={'Arch'} fontWeight={'700'} fontSize={'28'} color={'gray.300'}>
                        Successfully verified!
                    </Text>
                </Box>
            </ScrollView>
            <Flex mb={2} w={'100%'}>
                <Box justifyContent={'flex-end'}>
                    <Box justifyContent={'center'} alignItems={'center'} w={'100%'}>
                        <Button bg={'blue.200'} variant={'shadowBasic'} onPress={() => navigation.navigate('SingInScreen' as never)}>
                            <Text fontFamily={'Arch'} fontWeight={100} fontSize={22} color={'white.100'}>
                                OK
                            </Text>
                        </Button>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default EmailComplete;
