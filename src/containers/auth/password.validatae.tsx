import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Box, Button, Flex, ScrollView, Text, useToast } from 'native-base';
import DefaultHeader from '../header/header.default';
import { AuthParamList } from '../../@types/navigationTypes';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import useAxiosServices from '../../hooks/axiosHooks';

const PasswordValidate = () => {
    const toast = useToast();
    const { axiosService } = useAxiosServices();
    const navigation = useNavigation<StackNavigationProp<AuthParamList>>();
    const route = useRoute<RouteProp<AuthParamList, 'EmailValidate'>>();
    const [code, setCode] = useState('');
    const [fulfilled, setFulfilled] = useState(false);
    const verifyCode = route.params?.code;
    const email = route.params?.email;
    console.log(verifyCode);
    const codeHandler = (codeInput) => {
        setCode(codeInput);
    };

    const codeDiff = async () => {};

    const verifyHandler = () => {
        setFulfilled(code.length === 6);
    };

    const goToVerify = async () => {
        console.log(verifyCode);
        console.log(code);
        if (String(verifyCode) !== String(code)) {
            toast.show({
                title: 'Please check the code.',
                placement: 'top',
            });
        } else {
            await goToPasswordChange();
        }
    };

    const goToPasswordChange = async () => {
        navigation.navigate('PasswordChange', { email });
    };

    useEffect(() => {
        verifyHandler();
    }, [code]);

    return (
        <Box bg={'white.100'} px={5} safeArea flexGrow={1} justifyContent={'space-between'}>
            <DefaultHeader navigation={navigation} />
            <ScrollView>
                <Box pb="20" mt={10} pt={10}>
                    <Text mb={3} textAlign={'left'} fontFamily={'Arch'} fontWeight={'500'} fontSize={28}>
                        Verify your Email
                    </Text>
                    <Text fontFamily={'Arch'} fontWeight={'400'} fontSize={16}>
                        We sent the verification code to
                    </Text>
                    <Text fontFamily={'Arch'} fontWeight={'400'} fontSize={16}>
                        <Text color={'blue.100'} fontFamily={'Arch'} fontWeight={'400'} fontSize={18}>
                            {route.params?.email ?? 'test@naver.com'}
                        </Text>
                    </Text>
                    <Text fontFamily={'Arch'} fontWeight={'400'} fontSize={16}>
                        Which expires in 15 minutes. Please enter it below.
                    </Text>
                </Box>
                <OTPInputView
                    style={{ width: '100%', height: 200 }}
                    pinCount={6}
                    placeholderTextColor={'#222'}
                    codeInputFieldStyle={{ borderWidth: 0, borderBottomWidth: 2, color: '#16A6DA' }}
                    codeInputHighlightStyle={{ borderBottomColor: '#16A6DA', borderBottomWidth: 2 }}
                    code={code}
                    onCodeChanged={(codeInput) => setCode(codeInput)}
                    onCodeFilled={() => console.log(code)}
                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    // onCodeChanged = {code => { this.setState({code})}}
                    autoFocusOnLoad
                />
            </ScrollView>
            <Flex mb={2}>
                <Box justifyContent={'flex-end'}>
                    <Box justifyContent={'center'} alignItems={'center'}>
                        <Text mb={3} fontFamily={'Arch'} fontWeight={'100'} fontSize={'17'} color={'gray.300'}>
                            Send Code again
                        </Text>
                        <Button
                            onPress={() => goToVerify()}
                            disabled={!fulfilled}
                            bg={fulfilled ? 'blue.200' : 'gray.200'}
                            variant={'shadowBasic'}
                        >
                            <Text fontFamily={'Arch'} fontWeight={100} fontSize={22} color={'white.100'}>
                                Continue
                            </Text>
                        </Button>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default PasswordValidate;
