import React, { forwardRef } from 'react';
import { Box, Input, IInputProps, TextArea } from 'native-base';

interface Props extends IInputProps {
    touched?: boolean | any;
    error?: string | any;
    value: any;
}

const TextAreaInput = forwardRef<typeof Input, Props>(({ value, touched, error, ...props }, ref) => {
    return (
        <Box
            flexDirection={'row'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            width={'100%'}
            borderWidth={1}
            borderRadius={18}
            borderColor={error && !touched ? 'red.100' : 'black.100'}
            px={2}
        >
            <TextArea
                fontSize={'14px'}
                placeholder={'e.g. Outside the front door /garage door'}
                h={40}
                backgroundColor={'#00ff0000'}
                value={value}
                borderWidth={0}
                isFullWidth
                width={'100%'}
                size="lg"
                {...{ ref }}
                {...props}
            />
        </Box>
    );
});

export default TextAreaInput;
