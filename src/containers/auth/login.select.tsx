import React from 'react';
import { Box, VStack, Text, Image, Button, HStack, Center, ScrollView, useToast } from 'native-base';
import GoogleIcon from '../../assets/icons/google.icon';
import FaceBookIcon from '../../assets/icons/facebook.icon';
import AppleIcon from '../../assets/icons/apple.icon';
import EmailIcon from '../../assets/icons/Email.icon';
import { AuthParamList } from '../../@types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
const Logo = require('../../assets/logo/recan-colour-logo.png');
const payPal = require('../../assets/icons/paypal.png');
const LoginSelectScreen = () => {
    const toast = useToast();
    const { navigate } = useNavigation();
    // const { navigation } = useNavigation<AuthStackParamList<'LoginSelect'>>();
    const readyForService = () => {
        toast.show({
            placement: 'top',
            description: 'Complete',
            render: () => {
                return (
                    <Box justifyContent={'center'} alignContent={'center'} w={'200px'} bg="blue.200" px="2" py="2" rounded="sm" mb={5}>
                        <Text color={'white.100'} textAlign={'center'}>
                            Sorry, Ready for service
                        </Text>
                    </Box>
                );
            },
        });
    };
    return (
        <Box flex="1" flexGrow={1} justifyContent={'space-between'} safeArea alignItems="center" bg={'white.100'}>
            <ScrollView w={'100%'} showsVerticalScrollIndicator={false}>
                <Center w={'100%'} mt={'100px'}>
                    <Box pt={'10'} pb={'20'} alignItems={'center'}>
                        <Image source={Logo} alt="Alternate Text" left={1} width={210} height={60} />
                    </Box>
                    <VStack w={'100%'} px={5} alignItems={'center'}>
                        <Button my={2} colorScheme={'blue.200'} onPress={() => readyForService()} variant={'basicButton'}>
                            <HStack alignItems={'center'}>
                                <Box position={'absolute'} width={'100%'} ml={2}>
                                    <GoogleIcon />
                                </Box>
                                <Box alignItems={'center'} width={'100%'}>
                                    <Text color={'white.100'} fontFamily={'Arch'} fontWeight={'700'} fontSize={18}>
                                        Continue with Google
                                    </Text>
                                </Box>
                            </HStack>
                        </Button>

                        <Button my={2} colorScheme={'blue.300'} onPress={() => readyForService()} variant={'basicButton'}>
                            <HStack alignItems={'center'}>
                                <Box position={'absolute'} width={'100%'} ml={2} top={0.5}>
                                    <Image source={payPal} alt={'paypal'} />
                                </Box>
                                <Box alignItems={'center'} width={'100%'}>
                                    <Text color={'white.100'} fontFamily={'Arch'} fontWeight={'700'} fontSize={18}>
                                        Continue with Paypal
                                    </Text>
                                </Box>
                            </HStack>
                        </Button>
                        <Button my={2} colorScheme={'black.100'} onPress={() => readyForService()} variant={'basicButton'}>
                            <HStack alignItems={'center'}>
                                <Box position={'absolute'} width={'100%'} ml={2}>
                                    <AppleIcon />
                                </Box>
                                <Box alignItems={'center'} width={'100%'}>
                                    <Text color={'white.100'} fontFamily={'Arch'} fontWeight={'700'} fontSize={18}>
                                        Continue with Apple
                                    </Text>
                                </Box>
                            </HStack>
                        </Button>
                        <Button my={2} colorScheme={'blue.100'} onPress={() => navigate('SingUpScreen')} variant={'basicButton'}>
                            <HStack alignItems={'center'}>
                                <Box position={'absolute'} width={'100%'} ml={2}>
                                    <EmailIcon />
                                </Box>
                                <Box alignItems={'center'} width={'100%'}>
                                    <Text color={'white.100'} fontFamily={'Arch'} fontWeight={'700'} fontSize={18}>
                                        Sign up with Email
                                    </Text>
                                </Box>
                            </HStack>
                        </Button>
                        <Box flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                            <Text color={'gray.300'} fontFamily={'Arch'} fontWeight={'100'} fontSize={10}>
                                By signing up, you agree to our
                            </Text>
                            <TouchableOpacity
                                style={{
                                    marginHorizontal: 4,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text underline color={'gray.300'} fontFamily={'Arch'} fontWeight={'100'} fontSize={10}>
                                    Terms
                                </Text>
                            </TouchableOpacity>
                            <Text color={'gray.300'} fontFamily={'Arch'} fontWeight={'100'} fontSize={10}>
                                of Service and
                            </Text>
                            <TouchableOpacity
                                style={{
                                    marginHorizontal: 4,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text underline color={'gray.300'} fontFamily={'Arch'} fontWeight={'100'} fontSize={10}>
                                    Privacy Policy
                                </Text>
                            </TouchableOpacity>
                        </Box>
                    </VStack>
                </Center>
                <Box mt={10} alignItems={'center'} w={'100%'} my={1} px={4} bottom={0} safeArea>
                    <Text color={'gray.300'} fontFamily={'Arch'} fontWeight={'100'} fontSize={15}>
                        Have an account?
                    </Text>
                    <Button mt={1} my={2} colorScheme={'gray.100'} onPress={() => navigate('SingInScreen')} variant={'basicButton'}>
                        <HStack alignItems={'center'}>
                            <Box alignItems={'center'} width={'100%'}>
                                <Text color={'black.100'} fontFamily={'Arch'} fontWeight={'700'} fontSize={20}>
                                    Sign in
                                </Text>
                            </Box>
                        </HStack>
                    </Button>
                </Box>
            </ScrollView>
        </Box>
    );
};

export default LoginSelectScreen;
