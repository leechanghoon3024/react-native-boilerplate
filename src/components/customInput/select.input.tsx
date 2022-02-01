import React, { forwardRef } from 'react';
import { Box, Input, IInputProps, Text, FormControl, VStack, useTheme, Select, CheckIcon } from 'native-base';
import ErrorHelp from './error.help';
import ErrorIcon from '../../assets/icons/error.icon';

interface Props extends IInputProps {
    touched?: boolean | any;
    error?: string | any;
    value: any;
    setFieldValue: any;
    valueName: string;
}

const SelectInput = forwardRef<typeof Input, Props>(({ valueName, setFieldValue, label, value, touched, error, ...props }, ref) => {
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
                borderColor={error && !touched ? 'red.100' : 'black.100'}
                px={2}
            >
                <Box w={'100%'} p={1}>
                    <Box px={2} position={'absolute'} left={3} top={-14} bg={'gray.100'}>
                        <Text fontFamily={'Arch'} fontWeight={400} fontSize={17} color={'blue.200'}>
                            {label}
                        </Text>
                    </Box>
                    <VStack alignItems="flex-start" space={4}>
                        <Select
                            selectedValue={String(value)}
                            minWidth="200"
                            accessibilityLabel="Choose Gender"
                            placeholder="Choose Gender"
                            borderWidth={0}
                            width={'100%'}
                            height={50}
                            px={2}
                            _selectedItem={{
                                bg: 'blue.100',
                                endIcon: <CheckIcon size="5" />,
                            }}
                            mt={1}
                            onValueChange={(itemValue) => setFieldValue(valueName, itemValue)}
                        >
                            <Select.Item label="Female" value="2" />
                            <Select.Item label="Male" value="1" />
                            <Select.Item label="Non-binary" value="3" />
                        </Select>
                    </VStack>
                </Box>
            </Box>
            {error && (
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

export default SelectInput;
