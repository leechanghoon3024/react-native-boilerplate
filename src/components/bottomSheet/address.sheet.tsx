import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Actionsheet, Text, Box, Heading, HStack, Button, Image, VStack, Divider } from 'native-base';
import { TouchableOpacity } from 'react-native';
import DriverList from '../../containers/driver/driver.List';
import TableDriver from '../../containers/commons/table.driver';
import InMapList from '../../containers/driver/inMapList';
import { addressListType } from '../../@types/userTypes';
import useAxiosServices from '../../hooks/axiosHooks';
import AddressCard from '../card/address.card';
import MiniAddressCard from '../card/miniAddress.card';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    addressChange: (v: addressListType) => void;
}

const AddressSheet = ({ open, setOpen, addressChange }: Props) => {
    const [mainList, setMainList] = useState<addressListType[]>([]);
    const [subList, setSubList] = useState<addressListType[]>([]);
    const { axiosService } = useAxiosServices();
    useEffect(() => {
        getAddressList();
    }, []);
    const getAddressList = async () => {
        try {
            const api = await axiosService.post('/users/app/address/list');
            const { status, main, sub } = api.data;
            if (status) {
                console.log(main);
                setMainList([...main]);
                setSubList([...sub]);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const mainSelect = async (value: any) => {
        try {
            addressChange(value);
            setOpen(false);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Actionsheet isOpen={open} onClose={() => setOpen(false)}>
            <Actionsheet.Content>
                <KeyboardAwareScrollView>
                    <Box p={2} flex={1} pt={4}>
                        <VStack flex={1}>
                            {mainList.map((v, i) => (
                                <MiniAddressCard makeMain={mainSelect} key={`address_card_${i}`} address={v} />
                            ))}
                        </VStack>
                        <Divider />
                        <VStack>
                            {subList.map((v, i) => (
                                <MiniAddressCard makeMain={mainSelect} key={`address_card_${i}`} address={v} />
                            ))}
                        </VStack>
                    </Box>
                </KeyboardAwareScrollView>
            </Actionsheet.Content>
        </Actionsheet>
    );
};

export default AddressSheet;
