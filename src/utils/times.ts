import { format } from 'date-fns';

export const dateFormat = (date: Date) => {
    return format(date, 'yyyy-MM-dd');
};

export function timeFind(time: string) {
    const timeEx = [
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
    const filter = timeEx.filter((v) => v.hour === time);
    if (filter.length > 0) {
        return `${filter[0].time} ${filter[0].ap}`;
    } else {
        return `${timeEx[0].time} ${timeEx[0].ap}`;
    }
}
