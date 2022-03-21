import React, { useEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Box, Button, Center, Flex, Image, Modal, ScrollView, Text, useToast, VStack } from 'native-base';
import DefaultHeader from '../header/header.default';
import { AuthParamList } from '../../@types/navigationTypes';
import OTPInputView from '../../components/otpInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import useAxiosServices from '../../hooks/axiosHooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ar17RBlack, Ar18M, Ar18SbBlack, Ar22M, Ar25SbBlack, Ar28BoldBlack } from '../../themes/font.style';
const mailIcon = require('../../assets/icons/sendMail.png');
const PasswordValidate = () => {
    const toast = useToast();
    const { axiosService } = useAxiosServices();
    const navigation = useNavigation<StackNavigationProp<AuthParamList>>();
    const route = useRoute<RouteProp<AuthParamList, 'EmailValidate'>>();
    const [code, setCode] = useState('');
    const [fulfilled, setFulfilled] = useState(false);
    const [verifyCode, setVerifyCode] = useState(route.params?.code);
    const email = route.params?.email;
    console.log(verifyCode);

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

    const reSendCode = async () => {
        try {
            const api = await axiosService.post('users/re/email', { email: route.params?.email });
            const { status, data } = api.data;
            if (!status) {
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
                                    {data}
                                </Text>
                            </Box>
                        );
                    },
                });
            } else {
                setModalOpen(true);
                setVerifyCode(data);
            }
        } catch (e) {
            toast.show({
                placement: 'top',
                description: 'Complete',
                render: () => {
                    return (
                        <Box justifyContent={'center'} alignContent={'center'} w={'200px'} bg="blue.200" px="2" py="2" rounded="sm" mb={5}>
                            <Text color={'white.100'} textAlign={'center'}>
                                Error.
                            </Text>
                        </Box>
                    );
                },
            });
        }
    };

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <DefaultHeader navigation={navigation} bg={'white.100'} />
            <Box bg={'white.100'} px={'34px'} safeAreaBottom flexGrow={1} justifyContent={'space-between'}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <Box mt={12} pt={0}>
                        <Text mb={3} textAlign={'left'} {...Ar28BoldBlack}>
                            Verify your Email
                        </Text>
                        <Text {...Ar18M}>We sent the verification code to</Text>
                        <Text {...Ar18M}>
                            <Text {...Ar18SbBlack} color={'blue.100'}>
                                {route.params?.email ?? 'test@naver.com'}
                            </Text>
                        </Text>
                        <Text {...Ar18M}>{`Which expires in 15 minutes.\nPlease enter it below.`}</Text>
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
                </KeyboardAwareScrollView>
                <Flex mb={2}>
                    <Box justifyContent={'flex-end'}>
                        <Box justifyContent={'center'} alignItems={'center'}>
                            <TouchableOpacity onPress={() => reSendCode()}>
                                <Text {...Ar22M} mb={3} color={'#4C4C4C'}>
                                    Send Code again
                                </Text>
                            </TouchableOpacity>
                            <Button
                                h={'56px'}
                                onPress={() => goToVerify()}
                                disabled={!fulfilled}
                                bg={fulfilled ? 'blue.200' : 'gray.200'}
                                variant={'shadowBasic'}
                            >
                                <Text {...Ar22M} color={'white.100'}>
                                    Continue
                                </Text>
                            </Button>
                        </Box>
                    </Box>
                </Flex>
            </Box>
            <Modal p={0} isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.Body>
                        <Center mt={10}>
                            <Image w={'100px'} h={'100px'} resizeMode={'contain'} source={mailIcon} alt={'houseimage'} />
                            <VStack space={2} mt={4} alignItems={'center'}>
                                <Text {...Ar25SbBlack}>Check your email</Text>
                                <Text {...Ar17RBlack} textAlign={'center'}>
                                    {'check your email\n' + 'instruction to reset your password.\n'}
                                </Text>
                            </VStack>
                        </Center>
                    </Modal.Body>
                    <Modal.Footer p={0} bg={'blue.200'}>
                        <Button.Group>
                            <Button
                                borderRadius={0}
                                bg={'blue.200'}
                                w={'100%'}
                                variant="basicButton"
                                onPress={() => {
                                    setModalOpen(false);
                                }}
                            >
                                <Text textAlign={'center'} {...Ar25SbBlack} color={'white.100'}>
                                    Got it!
                                </Text>
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    );
};

export default PasswordValidate;
