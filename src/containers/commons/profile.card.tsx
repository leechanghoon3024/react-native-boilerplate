import React from 'react';
import { Box, IInputProps, Input, Text } from 'native-base';
import { Ar18M, Ar18SbBlack } from '../../themes/font.style';

interface Props extends IInputProps {
    value: any;
    label: string;
}

const ProfileCard = ({ value, label }: Props) => {
    return (
        <Box
            pt={'19px'}
            pb={'24px'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'100%'}
            borderColor={'gray.100'}
            borderBottomWidth={0.5}
        >
            <Box w={'100%'}>
                <Box position={'absolute'} top={-14} bg={'white.100     '}>
                    <Text {...Ar18M} color={'blue.200'}>
                        {label}
                    </Text>
                </Box>
                <Box mt={'10px'}>
                    <Text {...Ar18SbBlack} color={'black.100'}>
                        {value !== '' || value ? value : label}
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default ProfileCard;
