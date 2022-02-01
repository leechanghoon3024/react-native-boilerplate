import React, { useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DepotParamList } from '../../../@types/navigationTypes';
import { Box, Image, VStack, Text, Button } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CalculateCard from '../card/Calculate.card';
const arrow = require('../../../assets/icons/LeftArrow.png');
//
// const CSchema = Yup.object().shape({
//     glass: Yup.string().required(``),
//     clear: Yup.string().required(``),
//     alu: Yup.string().required(``),
//     color: Yup.string().required(``),
//     hdpe: Yup.string().required(``),
//     lpb: Yup.string().required(``),
//     steel: Yup.string().required(``),
//     other: Yup.string().required(``),
//     ineligible: Yup.string().required(``),
// });

const CalculateScreen = () => {
    const route = useRoute<RouteProp<DepotParamList, 'CalculateScreen'>>();
    const code = route.params?.code ?? 'A1001';
    const navigation = useNavigation();

    const [glass, setGlass] = useState(0);
    const [clear, setClear] = useState(0);
    const [alu, setAlu] = useState(0);
    const [color, setColor] = useState(0);

    const [hdpe, setHdpe] = useState(0);
    const [lpb, setLpb] = useState(0);
    const [steel, setSteel] = useState(0);

    const [other, setOther] = useState(0);
    const [ineligible, setIneligible] = useState(0);

    const goToNext = () => {
        navigation.navigate('CalculateDone', { glass, clear, alu, color, hdpe, lpb, steel, other, ineli: ineligible, code });
    };

    return (
        <Box flex={1}>
            <Box px={6} pl={3} w={'100%'} bg={'blue.100'}>
                <Box safeArea safeAreaBottom={0} flexDirection={'row'} justifyContent={'space-between'}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={arrow} alt={'whiteArrow'} />
                    </TouchableOpacity>
                </Box>
                <Text alignSelf={'center'} fontSize={'30px'} fontFamily={'Arch'} color={'white.100'} fontWeight={700}>
                    {code}
                </Text>
            </Box>
            <KeyboardAwareScrollView>
                <Box flexDirection={'row'} flexWrap={'wrap'}>
                    <CalculateCard label={'Glass'} value={glass} setValue={setGlass} />
                    <CalculateCard label={'Clear plastic'} value={clear} setValue={setClear} />
                    <CalculateCard label={'Aluminum'} value={alu} setValue={setAlu} />
                    <CalculateCard label={'Coloured Plastic'} value={color} setValue={setColor} />
                    <CalculateCard label={'HDPE'} value={hdpe} setValue={setHdpe} />
                    <CalculateCard label={'LPB'} value={lpb} setValue={setLpb} />
                    <CalculateCard label={'Steel'} value={steel} setValue={setSteel} />
                    <CalculateCard label={'Other'} value={other} setValue={setOther} />
                    <CalculateCard label={'Ineligible'} red={true} value={ineligible} setValue={setIneligible} />
                </Box>
            </KeyboardAwareScrollView>
            <Box safeArea safeAreaTop={0}>
                <Button m={2} h={'60px'} bg={'blue.100'} onPress={() => goToNext()}>
                    <Text fontWeight={400} fontSize={'20px'} fontFamily={'Arch'} color={'white.100'}>
                        Continue
                    </Text>
                </Button>
            </Box>
        </Box>
    );
};

export default CalculateScreen;
