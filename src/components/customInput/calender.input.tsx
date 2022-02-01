import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Actionsheet, Box, Button, Image, Text, useDisclose } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface Props {
    date?: any;
    calnderHandler: (v: string) => void;
}
const left = require('../../assets/icons/leftArrow-blue.png');
const right = require('../../assets/icons/rightArrow-blue.png');

const minusIcon = require('../../assets/icons/minus-white.png');
const reIcon = require('../../assets/icons/datepicker.png');
const CalenderInput = ({ date, calnderHandler }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclose();
    const [day, setDay] = useState<any>({});
    useEffect(() => {
        markDay(date);
    }, [date]);
    const markDay = (dayString: string) => {
        if (!dayString) return;
        calnderHandler(dayString);
        let i: any = {};
        i[dayString] = { selected: true };
        setDay({ ...i });
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
                >
                    <Box px={4} py={2} width={'100%'} alignItems={'center'} flexDirection={'row'}>
                        <Box w={'15%'}>
                            <Image source={reIcon} alt={'reIcon'} />
                        </Box>
                        <Box w={'75%'} pl={2}>
                            <Text fontFamily={'Arch'} fontWeight={500} fontSize={'14px'} color={date ? 'black.100' : 'gray.200'}>
                                {date ?? 'Show available pickup date'}
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </TouchableOpacity>

            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content backgroundColor={'#fff'}>
                    <Box w={'90%'}>
                        <Calendar
                            current={date}
                            markedDates={day}
                            onDayPress={(day) => {
                                markDay(day.dateString);
                            }}
                            monthFormat={'yyyy MM'}
                            // Handler which gets executed when visible month changes in calendar. Default = undefined
                            onMonthChange={(month) => {
                                console.log('month changed', month);
                            }}
                            renderArrow={(direction) =>
                                direction === 'left' ? <Image source={left} alt={'left'} /> : <Image source={right} alt={'right'} />
                            }
                            hideExtraDays={true}
                            // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                            // day from another month that is visible in calendar page. Default = false
                            disableMonthChange={true}
                            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                            firstDay={7}
                            hideArrows={false}
                            // Hide day names. Default = false
                            hideDayNames={false}
                            // Show week numbers to the left. Default = false
                            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                            onPressArrowLeft={(subtractMonth) => subtractMonth()}
                            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                            onPressArrowRight={(addMonth) => addMonth()}
                            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                            disableAllTouchEventsForDisabledDays={true}
                            // Replace default month and year title with custom one. the function receive a date as parameter
                            // Enable the option to swipe between months. Default = false
                            enableSwipeMonths={true}
                        />
                    </Box>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    );
};

export default CalenderInput;
