import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import ArrowDown from '../../assets/icons/arrow.down';
import ArrowUp from '../../assets/icons/arrow.up';
import { Box } from 'native-base';

interface Props {
    data: any[];
    value?: any;
    index: number;
    bagValueHandler: (index: any, type: any) => void;
    switchAction: (type: any) => string;
    defaultValueByIndex?: number;
    defaultButtonText: string;
    style?: any;
}

const DefaultDown = ({ data, value, bagValueHandler, index, switchAction, defaultValueByIndex, defaultButtonText, style }: Props) => {
    console.log('defaultButtonText', value);
    return (
        <Box
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'100%'}
            borderWidth={1}
            borderRadius={100}
            borderColor={'black.100'}
            mb={4}
            pr={4}
            pl={2}
            bg={'white.100'}
            {...style}
        >
            <SelectDropdown
                defaultButtonText={defaultButtonText}
                buttonStyle={{
                    flex: 1,
                    backgroundColor: '#fff',
                    borderRadius: 100,
                    width: 300,
                }}
                buttonTextStyle={{
                    fontSize: 16,
                    fontFamily: 'Archivo-SemiBold',
                    color: value === 5 ? '#ACACAC' : '#000000',
                    textAlign: 'left',
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
                    fontSize: 16,
                    fontFamily: 'Archivo-SemiBold',
                    color: '#000000',
                }}
                data={data}
                onSelect={(selectedItem, i) => {
                    bagValueHandler(index, selectedItem);
                }}
                renderDropdownIcon={(isOpened) => {
                    return <>{!isOpened ? <ArrowDown color={'#4C4C4C'} /> : <ArrowUp color={'#4C4C4C'} />}</>;
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

export default DefaultDown;
