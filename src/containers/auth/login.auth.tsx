import React from 'react';
import { Box, Flex, Text, Center, Input, Stack, IconButton, Button, HStack, Divider, ScrollView, Image, Heading } from 'native-base';
import PasswordViewIcon from '../../assets/icons/passwordView.icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GoogleIcon from '../../assets/icons/google.icon';
import FaceBookIcon from '../../assets/icons/facebook.icon';
import AppleIcon from '../../assets/icons/apple.icon';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CustomInput from '../../components/customInput/defaultInput';
import ErrorHelp from '../../components/customInput/error.help';

const SingInSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email').min(4, `Password Too short`).required(`Please enter your email`),
    password: Yup.string().min(4, `Password Too short`).required(`Please enter your password`),
});

const LoginAuth = () => {
    const { handleChange, handleBlur, handleSubmit, errors, touched, initialValues, resetForm, values } = useFormik({
        validationSchema: SingInSchema,
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (value) => {
            console.log(value);
        },
    });
    return (
        <Box px={5} safeArea flexGrow={1} justifyContent={'space-between'}>
            <ScrollView>
                <Box pb="20" alignItems={'center'} mt={20}>
                    <Center>
                        <Heading fontFamily={'Arch'} fontWeight={700} fontSize={36}>
                            Sign in
                        </Heading>
                    </Center>
                </Box>
                <Center>
                    <Stack space={4} width={'100%'}>
                        <ErrorHelp errors={errors} />
                        <CustomInput
                            value={values.email}
                            error={errors.email}
                            touched={touched.email}
                            onChangeText={handleChange('email')}
                            InputRightElement={
                                <IconButton _pressed={{ bg: 'transfer', opacity: 0.5 }} icon={<PasswordViewIcon color={'#ACACAC'} />} />
                            }
                            placeholder="Email"
                        />
                        <CustomInput
                            value={values.password}
                            error={errors.password}
                            touched={touched.password}
                            onChangeText={handleChange('password')}
                            InputRightElement={
                                <IconButton _pressed={{ bg: 'transfer', opacity: 0.5 }} icon={<PasswordViewIcon color={'#ACACAC'} />} />
                            }
                            placeholder="Password"
                        />
                        <Box alignItems={'flex-end'}>
                            <TouchableOpacity>
                                <Text fontFamily={'Arch'} fontWeight={'700'} underline>
                                    Forgot your password?
                                </Text>
                            </TouchableOpacity>
                        </Box>
                    </Stack>
                </Center>
                <Center mt={12}>
                    <Stack space={4} width={'100%'}>
                        <Button my={2} colorScheme={'blue.200'} onPress={() => console.log('ddd')} variant={'basicButton'}>
                            <HStack alignItems={'center'}>
                                <Box alignItems={'center'} width={'100%'}>
                                    <Text color={'white.100'} fontFamily={'Arch'} fontWeight={'700'} fontSize={21}>
                                        Sign in
                                    </Text>
                                </Box>
                            </HStack>
                        </Button>
                        <Box flexDirection={'row'} alignItems={'center'} justifyContent={'center'} width={'100%'}>
                            <Divider bg={'black.100'} mx="1" orientation={'horizontal'} width={'30%'} />
                            <Box>
                                <Text fontFamily={'Arch'} fontWeight={400} fontSize={17}>
                                    Or Sign in with
                                </Text>
                            </Box>
                            <Divider bg={'black.100'} mx="1" orientation={'horizontal'} width={'30%'} />
                        </Box>
                        <Stack space={4} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
                            <Button w={'30%'} my={2} colorScheme={'blue.200'} onPress={() => console.log('ddd')} variant={'basicButton'}>
                                <HStack alignItems={'center'}>
                                    <GoogleIcon />
                                </HStack>
                            </Button>
                            <Button w={'30%'} my={2} colorScheme={'blue.300'} onPress={() => console.log('ddd')} variant={'basicButton'}>
                                <HStack alignItems={'center'}>
                                    <FaceBookIcon />
                                </HStack>
                            </Button>
                            <Button w={'30%'} my={2} colorScheme={'black.100'} onPress={() => console.log('ddd')} variant={'basicButton'}>
                                <HStack alignItems={'center'}>
                                    <AppleIcon />
                                </HStack>
                            </Button>
                        </Stack>
                    </Stack>
                </Center>
            </ScrollView>
            <Flex>
                <Box justifyContent={'flex-end'}>
                    <Box justifyContent={'center'} alignContent={'center'} flexDirection={'row'}>
                        <Text fontFamily={'Arch'} fontWeight={'100'} fontSize={'17'}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity>
                            <Text fontFamily={'Arch'} fontWeight={'700'} fontSize={'17'} ml={1}>
                                Sign up
                            </Text>
                        </TouchableOpacity>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default LoginAuth;
