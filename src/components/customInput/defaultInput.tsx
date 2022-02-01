import React, { forwardRef } from 'react';
import { Box, Input, IInputProps } from 'native-base';

interface Props extends IInputProps {
    touched?: boolean | any;
    error?: string | any;
    value: any;
}

const CustomInput = forwardRef<typeof Input, Props>(({ value, touched, error, ...props }, ref) => {
    return (
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
    );
});

export default CustomInput;
