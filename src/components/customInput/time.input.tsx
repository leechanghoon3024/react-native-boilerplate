import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Actionsheet, Box, Button, Image, KeyboardAvoidingView, Text, TextArea, useDisclose } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ar17R, Ar18M, Ar21Sb } from '../../themes/font.style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
    time?: any;
    timeHandler: (value: any) => void;
}
const reIcon = require('../../assets/icons/Clock.png');
const TimeInput = ({ time, timeHandler }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclose();
    const makeTime = () => {
        return [
            { time: '09:00', ap: 'am', hour: '0900' },
            { time: '10:00', ap: 'am', hour: '1000' },
            { time: '10:30', ap: 'am', hour: '1030' },
            { time: '11:00', ap: 'am', hour: '1100' },
            { time: '11:30', ap: 'am', hour: '1130' },
            { time: '01:30', ap: 'pm', hour: '1330' },
            { time: '02:00', ap: 'pm', hour: '1400' },
            { time: '02:30', ap: 'pm', hour: '1430' },
            { time: '03:00', ap: 'pm', hour: '1500' },
            { time: '03:30', ap: 'pm', hour: '1530' },
        ];
    };
    const [timeRange, setTimeRange] = useState<{ time: string; ap: string; hour: string }[]>(makeTime);

    const timePress = (timeObj: { time: string; ap: string; hour: string }) => {
        timeHandler(timeObj);
        onClose();
    };

    return (
        <>
            <TouchableOpacity onPress={() => onOpen()}>
                <Box
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    width={'100%'}
                    borderWidth={1}
                    borderRadius={100}
                    borderColor={'black.100'}
                    px={2}
                    h={'56px'}
                    bg={'white.100 '}
                >
                    <Box px={2} py={2} width={'100%'} alignItems={'center'} flexDirection={'row'}>
                        <Box w={'15%'}>
                            <Image w={'30px'} h={'30px'} resizeMode={'contain'} source={reIcon} alt={'reIcon'} />
                        </Box>
                        <Box w={'75%'} pl={2}>
                            <Text
                                numberOfLines={1}
                                fontFamily={'Arch'}
                                fontWeight={500}
                                fontSize={'14px'}
                                color={time ? 'black.100' : 'gray.200'}
                            >
                                {time ? time : 'Time'}
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </TouchableOpacity>

            <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator={true}>
                <Actionsheet.Content backgroundColor={'#fff'} px={'28px'} py={'31px'}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                        <Box alignItems={'center'}>
                            <Text mb={'57.34px'} {...Ar21Sb}>
                                Pickup time
                            </Text>
                            <Box mb={'50px'}>
                                <Text mb={4} textAlign={'left'} {...Ar18M} color={'blue.100'}>
                                    On pick up days, RECAN driver will come to you between 8 am - 5 pm.
                                </Text>
                                <Text mb={4} textAlign={'left'} {...Ar18M} color={'blue.100'}>
                                    Please make sure that our driver has an access to your site to collect containers.
                                </Text>
                            </Box>
                        </Box>

                        <Box>
                            <Box
                                flexDirection={'row'}
                                justifyContent={'flex-start'}
                                alignItems={'center'}
                                width={'100%'}
                                borderWidth={1}
                                borderRadius={18}
                                borderColor={'black.100'}
                                px={2}
                            >
                                <TextArea
                                    placeholder={'If above time is not possible please make a note.'}
                                    h={40}
                                    backgroundColor={'#00ff0000'}
                                    value={time}
                                    borderWidth={0}
                                    isFullWidth
                                    width={'100%'}
                                    size="lg"
                                    onChangeText={timeHandler}
                                    {...Ar17R}
                                    fontSize={'14px'}
                                />
                            </Box>
                        </Box>
                    </KeyboardAwareScrollView>

                    <Box mt={'50px'} flexDirection={'row'} w={'100%'} justifyContent={'space-between'}>
                        <Button
                            h={'58px'}
                            onPress={() => onClose(23)}
                            _disabled={{ bg: 'gray.100' }}
                            width={'100%'}
                            variant={'basicButton'}
                            bg={'blue.200'}
                        >
                            <Text fontSize={'18px'} fontWeight={100} fontFamily={'Arch'} color={'white.100'}>
                                Next
                            </Text>
                        </Button>
                    </Box>
                </Actionsheet.Content>
            </Actionsheet>

            {/*<Actionsheet isOpen={isOpen} onClose={onClose}>*/}
            {/*    <Actionsheet.Content backgroundColor={'#fff'} p={3}>*/}
            {/*        <Text mb={4} fontSize="18px" color="black.100" fontWeight={600} fontFamily={'Arch'}>*/}
            {/*            Pickup time*/}
            {/*        </Text>*/}
            {/*        <Text mb={4} textAlign={'center'} fontSize="14px" color="blue.100" fontWeight={400} fontFamily={'Arch'}>*/}
            {/*            Pick-up time can vary depending on various situations. Time is used for reference.*/}
            {/*        </Text>*/}
            {/*        <Box w={'90%'} flexWrap={'wrap'} flexDirection={'row'} justifyContent={'center'}>*/}
            {/*            {timeRange.map((v, i) => {*/}
            {/*                const check = time && v.hour === time.hour;*/}
            {/*                return (*/}
            {/*                    <Button*/}
            {/*                        onPress={() => timePress(v)}*/}
            {/*                        h={'40px'}*/}
            {/*                        borderWidth={1}*/}
            {/*                        borderColor={check ? 'blue.100' : 'gray.200'}*/}
            {/*                        backgroundColor={'#fff'}*/}
            {/*                        w={'40 %'}*/}
            {/*                        m={2}*/}
            {/*                        variant={'basicButton'}*/}
            {/*                    >*/}
            {/*                        <Text fontFamily={'Arch'} fontSize={'14px'} fontWeight={400} color={check ? 'blue.100' : 'gray.200'}>*/}
            {/*                            {`${v.time} ${v.ap}`}*/}
            {/*                        </Text>*/}
            {/*                    </Button>*/}
            {/*                );*/}
            {/*            })}*/}
            {/*        </Box>*/}
            {/*    </Actionsheet.Content>*/}
            {/*</Actionsheet>*/}
        </>
    );
};

export default TimeInput;
