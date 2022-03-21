import React, { forwardRef } from 'react';
import { Box, Input, IInputProps, Text, FormControl, VStack, useTheme, Select, CheckIcon } from 'native-base';
import ErrorHelp from './error.help';
import ErrorIcon from '../../assets/icons/error.icon';
import { Ar18SbBlack } from '../../themes/font.style';
import ArrowDown from '../../assets/icons/arrow.down';
import ArrowUp from '../../assets/icons/arrow.up';

interface Props extends IInputProps {
    touched?: boolean | any;
    error?: string | any;
    value: any;
    label: string;
    setFieldValue: any;
    valueName: any;
    selectData: { value: string; label: string }[];
}

const SelectInput2 = forwardRef<typeof Input, Props>(
    ({ selectData, valueName, setFieldValue, label, value, touched, error, ...props }, ref) => {
        const theme = useTheme();
        return (
            <>
                <Box
                    mt={4}
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
                        <VStack alignItems="flex-start" space={4}>
                            <Select
                                {...Ar18SbBlack}
                                dropdownCloseIcon={
                                    <Box mr={'10px'}>
                                        <ArrowDown />
                                    </Box>
                                }
                                dropdownOpenIcon={
                                    <Box mr={'10px'}>
                                        <ArrowUp />
                                    </Box>
                                }
                                selectedValue={String(value)}
                                minWidth="200"
                                accessibilityLabel="Choose Gender"
                                placeholder={props.placeholder}
                                borderWidth={0}
                                width={'100%'}
                                height={50}
                                px={4}
                                _selectedItem={{
                                    bg: 'gray.100',
                                    endIcon: <CheckIcon size="5" color={'#1C6EBA'} />,
                                }}
                                onValueChange={(itemValue) => setFieldValue(valueName, itemValue)}
                            >
                                {selectData.map((v, i) => (
                                    <Select.Item label={v.label} value={v.value} />
                                ))}
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
    }
);

export default SelectInput2;
