import React, { forwardRef } from 'react';
import { Box, Input, IInputProps, Text, FormControl, VStack, useTheme } from 'native-base';
import ErrorHelp from './error.help';
import ErrorIcon from '../../assets/icons/error.icon';

interface Props extends IInputProps {
    touched?: boolean | any;
    error?: string | any;
    value: any;
    label: string;
}

const LabelInput = forwardRef<typeof Input, Props>(({ label, value, touched, error, ...props }, ref) => {
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
                    <Box>
                        <Input
                            backgroundColor={'#00ff0000'}
                            value={value}
                            borderWidth={0}
                            isFullWidth
                            width={'100%'}
                            height={'50px'}
                            size="lg"
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
});

export default LabelInput;
