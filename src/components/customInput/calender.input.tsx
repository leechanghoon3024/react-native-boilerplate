import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Actionsheet, Box, Button, HStack, Image, Pressable, Text, useDisclose } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { dateFormatDays, dateFormatDays2 } from '../../utils/times';
import { addDays, format, getUnixTime } from 'date-fns';
import { Ar18M, Ar19N, Ar21Sb } from '../../themes/font.style';
import BackIcon from '../../assets/icons/back.icon';
interface Props {
    date?: any;
    weekNo: string[];
    dateNo: string[];
    calnderHandler: (v: string) => void;
}
const left = require('../../assets/icons/leftArrow-blue.png');
const right = require('../../assets/icons/rightArrow-blue.png');

const minusIcon = require('../../assets/icons/minus-white.png');
const reIcon = require('../../assets/icons/datepicker.png');
const CalenderInput = ({ date, calnderHandler, weekNo, dateNo }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclose();
    const [day, setDay] = useState<any>({});
    const weekFormat = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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

    const dateDisabled = (dateString) => {
        const defaultDay = new Date(dateString as any);
        const dayWeekNumber = format(defaultDay, 'EE');
        const weekNumber = weekFormat.indexOf(dayWeekNumber);
        const disabledWeek = weekNo[weekNumber] === '1';
        const todayTimeDiff = getUnixTime(defaultDay) < getUnixTime(addDays(new Date(), 1));
        const formattedDate = format(defaultDay, 'yyyy-MM-dd');
        const disabledDate = dateNo.includes(formattedDate);
        if (disabledWeek) {
            return true;
        }
        if (todayTimeDiff) {
            return true;
        }
        if (disabledDate) {
            return true;
        }
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
                    h={'56px'}
                    px={2}
                    bg={'white.100'}
                >
                    <Box px={2} py={2} width={'100%'} alignItems={'center'} flexDirection={'row'}>
                        <Box w={'15%'}>
                            <Image w={'30px'} h={'30px'} resizeMode={'contain'} source={reIcon} alt={'reIcon'} />
                        </Box>
                        <Box w={'75%'} pl={2}>
                            <Text fontFamily={'Arch'} fontWeight={500} fontSize={'14px'} color={date ? 'black.100' : 'gray.200'}>
                                {date ? dateFormatDays2(date) : 'Schedule Pickup'}
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
                            dayComponent={(props) => {
                                const { date, marking, onPress } = props;
                                const dateString = date?.dateString;
                                const disabledWeek = dateDisabled(dateString);
                                return (
                                    <Pressable
                                        w={'40px'}
                                        h={'40px'}
                                        alignItems={'center'}
                                        justifyContent={'center'}
                                        onPress={() => (disabledWeek ? null : onPress(date))}
                                        borderRadius={100}
                                        bg={marking ? 'blue.100' : 'whtie.100'}
                                    >
                                        <Text {...Ar19N} color={marking ? 'white.100' : disabledWeek ? 'gray.200' : 'black.100'}>
                                            {date.day}
                                        </Text>
                                    </Pressable>
                                );
                            }}
                            onDayPress={(day) => {
                                markDay(day.dateString);
                            }}
                            monthFormat={'MMM yyyy'}
                            // Handler which gets executed when visible month changes in calendar. Default = undefined
                            onMonthChange={(month) => {
                                console.log('month changed', month);
                            }}
                            customHeader={(props) => {
                                console.log(props);
                                const { month } = props;
                                const addMonth = () => props.addMonth(1);
                                const subMonth = () => props.addMonth(-1);
                                return (
                                    <>
                                        <Box w={'100%'} justifyContent={'space-between'} alignItems={'center'} flexDirection={'row'}>
                                            <Pressable hitSlop={{ top: 20, bottom: 20, left: 30, right: 30 }} onPress={() => subMonth()}>
                                                <BackIcon color={'#1C6EBA'} />
                                            </Pressable>
                                            <Text {...Ar21Sb}>{format(new Date(month), 'MMMM yyyy')}</Text>
                                            <Pressable onPress={() => addMonth()} style={{ transform: [{ rotate: '180deg' }] }}>
                                                <BackIcon color={'#1C6EBA'} />
                                            </Pressable>
                                        </Box>
                                        <HStack mt={'35px'} mb={'19px'} w={'100%'} flexDirection={'row'} mx={'0px'} space={'14px'}>
                                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((v) => (
                                                <Box>
                                                    <Text {...Ar18M} color={'gray.200'}>
                                                        {v}
                                                    </Text>
                                                </Box>
                                            ))}
                                        </HStack>
                                    </>
                                );
                            }}
                            hideExtraDays={true}
                            // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                            // day from another month that is visible in calendar page. Default = false
                            disableMonthChange={true}
                            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                            firstDay={0}
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
                            disabledDaysIndexes={[1, 6]}
                            theme={{
                                selectedDayBackgroundColor: '#1C6EBA',
                                dayTextColor: '#000000',
                                textSectionTitleDisabledColor: '#A6A6A6',
                                textDayFontFamily: 'Archivo-Medium',
                            }}
                        />
                    </Box>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    );
};

export default CalenderInput;
