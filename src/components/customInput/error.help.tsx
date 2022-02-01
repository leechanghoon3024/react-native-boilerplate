import React, { useEffect, useState } from 'react';
import { Box, Text } from 'native-base';
import ErrorIcon from '../../assets/icons/error.icon';

interface Props {
    errors?: object;
}

const ErrorHelp = ({ errors }: Props) => {
    const [errorText, setErrorText] = useState<any[]>([]);
    useEffect(() => {
        errorHandler(errors);
    }, [errors]);

    const errorHandler = (er: object | undefined) => {
        const errorObject = Object.values(er ?? {});
        if (errorObject.length > 0) {
            setErrorText([...[errorObject[0]]]);
        } else {
            setErrorText([...[]]);
        }
    };

    return (
        <>
            {errorText.length > 0 &&
                errorText.map((v, index) => (
                    <Box key={`${index}_help_texrt`} flexDirection={'row'} alignItems={'center'}>
                        <ErrorIcon />
                        <Text underline color={'gray.200'} ml={1} fontSize={14} fontFamily={'Arch'} fontWeight={100}>
                            {v}
                        </Text>
                    </Box>
                ))}
        </>
    );
};

export default ErrorHelp;
