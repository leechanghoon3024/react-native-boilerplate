import React, { useRef } from 'react';
import { addressListType } from '../../@types/userTypes';
import { Box, Button, Image, Popover, Pressable, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addressChange } from '../../store/authReducer';
import DotHorizon from '../../assets/icons/dot.horizon';
import { Ar18M, Ar18SbBlack } from '../../themes/font.style';
import { useNavigation } from '@react-navigation/native';
import { addressNullCheck } from '../../utils/gup';

interface Props {
    address: addressListType;
    makeMain: (idx: number) => void;
    deleteAddress: (idx: number) => void;
    main?: boolean;
}
const marker = require('../../assets/icons/address-pin.png');
const dotHorizen = require('../../assets/icons/dotHorizon.png');
const checked = require('../../assets/icons/simpleCheck.png');
const AddressCard = ({ address, makeMain, deleteAddress, main }: Props) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigation = useNavigation();
    const goToAddressEdit = () => {
        navigation.navigate('AddressSearch' as never, { idx: address.idx } as never);
    };
    const dispatch = useDispatch();
    const [show, setShow] = React.useState<boolean>(false);
    return (
        <Box flexDirection={'row'} p={3} w={'100%'} justifyContent={'space-between'} alignItems={'center'}>
            <Box flexDirection={'row'} alignItems={'center'} w={'90%'}>
                <Image source={address.main === 0 ? marker : checked} alt={'title'} width={'27px'} height={'27px'} />
                <Box ml={'27px'} alignItems={'center'} w={'75%'}>
                    <Text w={'100%'} numberOfLines={1} {...Ar18SbBlack} color={'black.100'}>
                        {address.address}
                    </Text>
                    <Text w={'100%'} numberOfLines={1} {...Ar18M} color={'gray.300'}>
                        {address.addressMore}
                        {addressNullCheck(address.postcode)}
                    </Text>
                </Box>
            </Box>
            <Box>
                {main ? (
                    <Pressable onPress={() => goToAddressEdit()}>
                        <Text {...Ar18SbBlack} color={'blue.200'}>
                            Edit
                        </Text>
                    </Pressable>
                ) : (
                    <Popover
                        isOpen={show}
                        onClose={() => setShow(false)}
                        placement={'bottom right'}
                        trigger={(triggerProps) => {
                            return (
                                <Button
                                    {...triggerProps}
                                    onPress={() => setShow(true)}
                                    bg={'white.100'}
                                    _pressed={{ opacity: 0.5, bg: 'gray.100' }}
                                >
                                    <DotHorizon />
                                </Button>
                            );
                        }}
                    >
                        <Popover.Content bg={'white.100'} shadow={10} accessibilityLabel="Delete Customerd" w="100%">
                            <Popover.Body>
                                <VStack p={2} space={4}>
                                    <Box>
                                        <TouchableOpacity
                                            onPress={() => {
                                                makeMain(address.idx);
                                                setShow(false);
                                                if (address.main === 0) {
                                                    dispatch(addressChange({ addressCheck: 1 }));
                                                }
                                                if (address.main === 1) {
                                                    dispatch(addressChange({ addressCheck: 0 }));
                                                }
                                            }}
                                        >
                                            <Text fontSize={'16px'} fontWeight={600} fontFamily={'Arch'} color={'blue.200'}>
                                                {address.main === 0 ? 'Make this my pickup address' : 'UnMake list'}
                                            </Text>
                                        </TouchableOpacity>
                                    </Box>
                                    <Box>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setShow(false);
                                                goToAddressEdit();
                                            }}
                                        >
                                            <Text fontSize={'16px'} fontWeight={600} fontFamily={'Arch'} color={'blue.200'}>
                                                Edit
                                            </Text>
                                        </TouchableOpacity>
                                    </Box>
                                </VStack>
                            </Popover.Body>
                        </Popover.Content>
                    </Popover>
                )}
            </Box>
        </Box>
    );
};

export default AddressCard;
