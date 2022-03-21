export const BookStatusCase = (status: number | undefined) => {
    switch (status) {
        case 1:
            return 'Booked';
        case 2:
            return 'Assigned';
        case 3:
            return 'Collected';
        case 4:
            return 'Delivered';
        case 5:
            return 'Credited';
        default:
            return '';
    }
};

export const BookDepotStatusCase = (status: number) => {
    switch (status) {
        case 1:
            return 'Continuing';
        case 2:
            return 'Continuing';
        case 3:
            return 'Continuing';
        case 4:
            return 'Continuing';
        case 5:
            return 'Complete';
        default:
            return '';
    }
};

export const TransactionStatusCase = (status: number) => {
    switch (status) {
        case 1:
            return 'Wait';
        case 2:
            return 'Proceed';
        default:
            return '';
    }
};

export const TransactionTypeCase = (status: number) => {
    switch (status) {
        case 0:
            return 'GiftPay';
        case 1:
            return 'Paypal';
        case 2:
            return 'Donate';
        case 3:
            return 'Bank';
        default:
            return '';
    }
};

export const TransactionBagCase = (status: number) => {
    switch (status) {
        case 1:
            return 'Recan bags';
        case 2:
            return 'Non Recan bags';
        case 3:
            return 'Wheelie Bin';
        case 4:
            return 'Bulk Bag';
        default:
            return 'Type of bags';
    }
};

export const TransactionPickupCase = (status: number) => {
    console.log('TTTTTT, ', status);
    switch (status) {
        case 1:
            return 'Every week';
        case 2:
            return 'Every fortnight';
        case 3:
            return 'Every monthly';
        default:
            return '';
    }
};

export const TransactionBusinessCase = (status: any) => {
    switch (status) {
        case '1':
            return 'Commercial';
        case '2':
            return 'School';
        case '3':
            return 'Charity';
        default:
            return 'Business type';
    }
};

export const TransactionBusinessCase2 = (status: any) => {
    switch (status) {
        case '1':
            return 'Commercial';
        case '2':
            return 'School';
        case '3':
            return 'Charity';
        default:
            return ' ';
    }
};

export const TransactionAddress = (status: number) => {
    switch (status) {
        case 1:
            return 'House';
        case 2:
            return 'Townhouse';
        case 3:
            return 'Apartment';
        default:
            return '';
    }
};

export const TransactionBAddress = (status: number) => {
    switch (status) {
        case 1:
            return 'Private Business';
        case 2:
            return 'Warehouse';
        case 3:
            return 'Service office';
        default:
            return '';
    }
};

export const TransactionSortCase = (status: string) => {
    switch (status) {
        case '1':
            return 'Oldest to newest';
        case '2':
            return 'Newest to oldest';
        default:
            return 'Oldest to newest';
    }
};
