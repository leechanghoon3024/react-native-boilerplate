import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import ArrowDown from '../../assets/icons/arrow.down';
import ArrowUp from '../../assets/icons/arrow.up';
import { Box } from 'native-base';

interface Props {
    data: any[];
    sortHandler: (index: any) => void;
    switchAction: (type: any) => string;
    defaultValueByIndex?: number;
    defaultButtonText: string;
    style?: any;
}

const SortDropDown = ({ data, sortHandler, switchAction, defaultButtonText, style }: Props) => {
    return (
        <Box
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'200px'}
            borderWidth={1}
            borderRadius={100}
            borderColor={'blue.200'}
            bg={'white.100'}
            {...style}
        >
            <SelectDropdown
                defaultButtonText={defaultButtonText}
                buttonStyle={{
                    marginLeft: 10,
                    flex: 1,
                    backgroundColor: '#fff',
                    borderRadius: 100,
                    width: 300,
                }}
                buttonTextStyle={{
                    textAlign: 'left',
                    fontSize: 15,
                    fontFamily: 'Archivo-Regular',
                    color: '#000000',
                }}
                dropdownStyle={{
                    marginTop: 10,
                    borderRadius: 30,
                }}
                rowStyle={{
                    paddingHorizontal: 20,
                    backgroundColor: 'white',
                    borderWidth: 0,
                    borderBottomWidth: 0,
                }}
                rowTextStyle={{
                    textAlign: 'left',
                    fontSize: 15,
                    fontFamily: 'Archivo-Regular',
                    color: '#000000',
                }}
                data={data}
                onSelect={(selectedItem, i) => {
                    console.log(selectedItem);
                    sortHandler(selectedItem);
                }}
                renderDropdownIcon={(isOpened) => {
                    return <>{!isOpened ? <ArrowDown color={'#1C6EBA'} /> : <ArrowUp color={'#1C6EBA'} />}</>;
                }}
                buttonTextAfterSelection={(selectedItem, i) => switchAction(selectedItem)}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return switchAction(item);
                }}
            />
        </Box>
    );
};

export default SortDropDown;
