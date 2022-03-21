import { format } from 'date-fns';

export const dateFormat = (date: Date) => {
    return format(date, 'dd MMM yyyy HH:mm a');
};

export const dateFormatNotTime = (date: Date) => {
    return format(date, 'dd MMM yyyy');
};
export const dateFormatDays = (date: string | null) => {
    try {
        const convert = new Date(date ?? '');
        return format(convert, 'dd MMM yy');
    } catch (e) {
        const convert = new Date();
        return format(convert, 'dd MMM yy');
    }
};

export const dateFormatDays2 = (date: string | null) => {
    try {
        const convert = new Date(date ?? '');
        return format(convert, 'EEE, MMM dd, yyyy');
    } catch (e) {
        const convert = new Date();
        return format(convert, 'EEE, MMM dd, yyyy');
    }
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

export const depotReportSelectCase = (type) => {
    switch (type) {
        case 1:
            return 'Bag ripped - has containers';
        case 2:
            return 'Bag ripped - no containers';
        case 3:
            return 'Bag without RECAN ID';
        case 4:
            return 'Bag contains rubbish / hazardous material';
        case 5:
            return 'Contains ineligible containers';
        case 6:
            return 'Lids on containers';
    }
};
