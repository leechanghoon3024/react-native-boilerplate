import React from 'react';
import { addressListType } from '../../@types/userTypes';
import { Box, Button, Image, Popover, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addressChange } from '../../store/authReducer';

interface Props {
    address: addressListType;
    makeMain: (idx: number) => void;
}
const marker = require('../../assets/icons/address-pin.png');
const dotHorizen = require('../../assets/icons/dotHorizon.png');
const checked = require('../../assets/icons/checked.png');
const AddressCard = ({ address, makeMain }: Props) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    return (
        <Box flexDirection={'row'} p={3} w={'100%'} justifyContent={'space-between'} alignItems={'center'}>
            <Box flexDirection={'row'} alignItems={'center'} w={'90%'}>
                <Image source={address.main === 0 ? marker : checked} alt={'title'} width={'30px'} height={'30px'} />
                <Box ml={4} alignItems={'center'} w={'80%'}>
                    <Text w={'100%'} numberOfLines={2} fontSize={'14px'} fontWeight={700} fontFamily={'Arch'} color={'black.100'}>
                        {address.address}
                    </Text>
                </Box>
            </Box>
            <Box>
                <Popover
                    placement={'bottom right'}
                    trigger={(triggerProps) => {
                        return (
                            <Button bg={'gray.100'} {...triggerProps} _pressed={{ opacity: 0.5, bg: 'gray.100' }}>
                                <Image source={dotHorizen} alt={'title'} />
                            </Button>
                        );
                    }}
                >
                    <Popover.Content accessibilityLabel="Delete Customerd" w="100%">
                        <Popover.Body>
                            <VStack p={2} space={4}>
                                <Box>
                                    <TouchableOpacity
                                        onPress={() => {
                                            makeMain(address.idx);
                                            if (address.main === 0) {
                                                dispatch(addressChange({ addressCheck: 1 }));
                                            }
                                            if (address.main === 1) {
                                                dispatch(addressChange({ addressCheck: 0 }));
                                            }
                                        }}
                                    >
                                        <Text fontSize={'16px'} fontWeight={600} fontFamily={'Arch'} color={'blue.100'}>
                                            {address.main === 0 ? 'Make this my pickup address' : 'UnMake list'}
                                        </Text>
                                    </TouchableOpacity>
                                </Box>
                                <Box>
                                    <TouchableOpacity>
                                        <Text fontSize={'16px'} fontWeight={600} fontFamily={'Arch'} color={'blue.100'}>
                                            Edit
                                        </Text>
                                    </TouchableOpacity>
                                </Box>
                            </VStack>
                        </Popover.Body>
                    </Popover.Content>
                </Popover>
            </Box>
        </Box>
    );
};

export default AddressCard;
