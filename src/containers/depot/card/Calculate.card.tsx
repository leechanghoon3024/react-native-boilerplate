import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Pressable, Text } from 'native-base';
import { CalculatorInput } from 'react-native-calculator';
interface Props {
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
    label: string;
    red?: boolean;
}

const CalculateCard = ({ value, setValue, label, red }: Props) => {
    const [oepn, setOpen] = useState(false);

    const valueHandler = (type: 'up' | 'down') => {
        if (type === 'up') {
            setValue((p) => p + 1);
        } else {
            if (value > 0) {
                setValue((p) => p - 1);
            }
        }
    };

    return (
        <Box
            w={['100%', '50%']}
            borderBottomWidth={1}
            borderColor={'blue.100'}
            p={4}
            px={8}
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
        >
            <Box>
                <Text fontSize={'50px'} fontFamily={'Arch'} color={'black.100'}>
                    <CalculatorInput
                        onChange={(v, t) => setValue(v)}
                        fieldContainerStyle={{ height: 40, borderWidth: 0 }}
                        value={value}
                        fieldTextStyle={{ borderWidth: 0, fontSize: 40 }}
                    />
                </Text>
                <Text fontSize={'20px'} fontFamily={'Arch'} color={red ? 'red.100' : 'blue.100'} fontWeight={700}>
                    {label}
                </Text>
            </Box>
            <Box flexDirection={'row'}>
                <Pressable
                    onPress={() => valueHandler('down')}
                    _pressed={{ opacity: 0.5 }}
                    borderWidth={2}
                    alignItems={'center'}
                    justifyContent={'center'}
                    h={'50px'}
                    w={'50px'}
                    borderRadius={100}
                    borderColor={'blue.100'}
                    mr={4}
                >
                    <Text fontSize={'30px'} fontWeight={700} color={'blue.100'}>
                        一
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => valueHandler('up')}
                    _pressed={{ opacity: 0.5 }}
                    borderWidth={2}
                    alignItems={'center'}
                    justifyContent={'center'}
                    h={'50px'}
                    w={'50px'}
                    borderRadius={100}
                    borderColor={'blue.100'}
                >
                    <Text fontSize={'30px'} bottom={0.5} fontWeight={700} color={'blue.100'}>
                        +
                    </Text>
                </Pressable>
            </Box>
        </Box>
    );
};

export default CalculateCard;
