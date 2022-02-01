import React, { forwardRef } from 'react';
import { Box, Input, IInputProps, Text, useTheme } from 'native-base';
import RNMASKINPUT from 'react-native-mask-input';
import ErrorIcon from '../../assets/icons/error.icon';
interface Props extends IInputProps {
    label: string;
    touched?: boolean | any;
    error?: string | any;
    value: any;
    type: any[];
    setFieldValue: any;
}

const MaskInput = forwardRef<typeof RNMASKINPUT, Props>(
    ({ setFieldValue, type, label, value, setValue, touched, error, ...props }, ref) => {
        const theme = useTheme();
        return (
            <>
                <Box
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    width={'100%'}
                    borderWidth={1}
                    borderRadius={100}
                    borderColor={error && touched ? 'red.100' : 'black.100'}
                    px={2}
                >
                    <Box w={'100%'} p={1}>
                        <Box px={2} position={'absolute'} left={3} top={-14} bg={'gray.100'}>
                            <Text fontFamily={'Arch'} fontWeight={400} fontSize={17} color={'blue.200'}>
                                {label}
                            </Text>
                        </Box>
                        <Box px={2}>
                            <RNMASKINPUT
                                keyboardType="numeric"
                                mask={type}
                                value={value}
                                showObfuscatedValue
                                onChangeText={(masked, unmasked, obfuscated) => {
                                    // assuming you typed "1234123412341234":

                                    console.log(masked); // "1234 1234 1234 1234"
                                    console.log(unmasked); // "1234123412341234"
                                    console.log(obfuscated); // "1234 #### #### 1234"
                                    setFieldValue('mobile', masked);
                                }}
                                style={{
                                    backgroundColor: '#00ff0000',
                                    width: '100%',
                                    height: 50,
                                }}
                                {...{ ref }}
                                {...props}
                            />
                        </Box>
                    </Box>
                </Box>
                {touched && error && (
                    <Box mt={1} key={`${label}_help_texrt`} flexDirection={'row'} alignItems={'center'}>
                        <ErrorIcon color={theme.colors.gray[200]} />
                        <Text color={'red.100'} ml={1} fontSize={14} fontFamily={'Arch'} fontWeight={100}>
                            {error}
                        </Text>
                    </Box>
                )}
            </>
        );
    }
);

export default MaskInput;
