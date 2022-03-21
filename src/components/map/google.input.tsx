import React, { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle, Text } from 'react-native';
import { Box, FlatList, Image, View, Input, ScrollView } from 'native-base';
import { PredictionType } from './google.search';
import SearchIcon from '../../assets/icons/search.icon';
import { Ar18SbBlack } from '../../themes/font.style';

interface Props {
    value: string;
    style?: ViewStyle | ViewStyle[];
    onChangeText: (text: string) => void;
    predictions: PredictionType[];
    showPredictions: boolean;
    onPredictionTapped: (placeId: string, description: string) => void;
    onFocus: Dispatch<SetStateAction<boolean>>;
}
const sIcon = require('../../assets/icons/search.png');
const mIcon = require('../../assets/icons/address-pin.png');
const GoogleInput: FunctionComponent<Props> = (props) => {
    const [inputSize, setInputSize] = useState({ width: 0, height: 0 });

    const { value, style, onChangeText, onPredictionTapped, predictions, showPredictions, onFocus } = props;
    const [focus, setFocus] = useState(false);
    const { container, inputStyle } = styles;
    const passedStyles = Array.isArray(style) ? Object.assign({}, ...style) : style;
    const inputBottomRadius = showPredictions
        ? {
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
          }
        : {
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
          };

    const _renderPredictions = (predictions: PredictionType[]) => {
        const { predictionsContainer, predictionRow } = styles;
        const calculatedStyle = {
            width: inputSize.width,
        };
        return (
            <>
                <FlatList
                    mt={2}
                    data={predictions}
                    contentContainerStyle={{ height: 500 }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={predictionRow} onPress={() => onPredictionTapped(item.place_id, item.description)}>
                                <Image mr={4} w={30} h={30} source={mIcon} alt={'mIcon'} />
                                <Box
                                    flex={1}
                                    py={6}
                                    flexDirection={'row'}
                                    alignItems={'center'}
                                    borderBottomWidth={0.5}
                                    borderColor={'C4C4C4'}
                                >
                                    <Box>
                                        <Text numberOfLines={2}>{item.description}</Text>
                                    </Box>
                                </Box>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item) => item.place_id}
                    keyboardShouldPersistTaps="handled"
                    style={[predictionsContainer]}
                />
                <Box mb={400} />
            </>
        );
    };

    return (
        <View style={[container, { ...passedStyles }]}>
            <Box w={'100%'} bg={'whtie.100'} flexDirection={'row'} style={[inputStyle, inputBottomRadius]}>
                <SearchIcon />
                <Input
                    {...Ar18SbBlack}
                    ml={2}
                    w={'90%'}
                    numberOfLines={2}
                    borderWidth={0}
                    placeholder="Enter an address"
                    placeholderTextColor="gray.200"
                    value={value}
                    onChangeText={onChangeText}
                    returnKeyType="search"
                    onLayout={(event) => {
                        const { height, width } = event.nativeEvent.layout;
                        setInputSize({ height, width });
                    }}
                    onKeyPress={() => onFocus(true)}
                />
            </Box>
            {showPredictions && _renderPredictions(predictions)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    inputStyle: {
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 30,
        color: 'black',
        fontSize: 16,
    },
    predictionsContainer: {},
    predictionRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
});
export default GoogleInput;
